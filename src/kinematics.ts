export type Point = { x: number; y: number };

export type Obstacle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
export type PlanRequest = {
  lengths: number[];
  start: number[];
  target: Point;
  obstacles: Obstacle[];
  seed?: number;
  iterations?: number;
};
export type PlanResult =
  | { status: "ok"; path: number[][]; tipPath: Point[] }
  | {
      status: "blocked";
      reason:
        "outside-reach" | "invalid-start" | "target-blocked" | "search-limit";
    };

export const LINK_RADIUS = 5;
const CLEARANCE = 2;
const BEND_LIMIT = Math.PI - 0.18;
const TAU = 2 * Math.PI;

export function linkLengths(count: number): number[] {
  if (count === 2) return [110, 100];
  if (count === 3) return [76, 72, 62];
  if (count === 4) return [60, 56, 50, 44];
  throw new RangeError("Choose two, three, or four links.");
}

export function homeAngles(count: number) {
  return count === 2
    ? [Math.PI / 2, -Math.PI / 3]
    : count === 3
      ? [Math.PI / 2, -0.75, -0.55]
      : [Math.PI / 2, -0.6, -0.45, -0.35];
}

export const wrapAngle = (a: number) =>
  ((((a + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
export const angleDistance = (a: number[], b: number[]) =>
  Math.hypot(...a.map((q, i) => wrapAngle(b[i] - q)));
export const interpolateAngles = (a: number[], b: number[], t: number) =>
  a.map((q, i) => wrapAngle(q + wrapAngle(b[i] - q) * t));

export function forwardKinematics(
  angles: number[],
  lengths: number[],
): Point[] {
  const points: Point[] = [{ x: 0, y: 0 }];
  let heading = 0;
  for (let i = 0; i < lengths.length; i++) {
    heading += angles[i];
    points.push({
      x: points[i].x + lengths[i] * Math.cos(heading),
      y: points[i].y + lengths[i] * Math.sin(heading),
    });
  }
  return points;
}

function pointSegmentDistance(p: Point, a: Point, b: Point) {
  const dx = b.x - a.x,
    dy = b.y - a.y;
  const t = Math.max(
    0,
    Math.min(
      1,
      ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1),
    ),
  );
  return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
}

function segmentDistance(a: Point, b: Point, c: Point, d: Point) {
  const cross = (u: Point, v: Point, w: Point) =>
    (v.x - u.x) * (w.y - u.y) - (v.y - u.y) * (w.x - u.x);
  const abC = cross(a, b, c),
    abD = cross(a, b, d),
    cdA = cross(c, d, a),
    cdB = cross(c, d, b);
  if (
    ((abC > 0 && abD < 0) || (abC < 0 && abD > 0)) &&
    ((cdA > 0 && cdB < 0) || (cdA < 0 && cdB > 0))
  )
    return 0;
  return Math.min(
    pointSegmentDistance(a, c, d),
    pointSegmentDistance(b, c, d),
    pointSegmentDistance(c, a, b),
    pointSegmentDistance(d, a, b),
  );
}

export function segmentRectangleDistance(a: Point, b: Point, box: Obstacle) {
  const inside = (p: Point) =>
    p.x >= box.x &&
    p.x <= box.x + box.width &&
    p.y >= box.y &&
    p.y <= box.y + box.height;
  if (inside(a) || inside(b)) return 0;
  const corners = [
    { x: box.x, y: box.y },
    { x: box.x + box.width, y: box.y },
    { x: box.x + box.width, y: box.y + box.height },
    { x: box.x, y: box.y + box.height },
  ];
  return Math.min(
    ...corners.map((p, i) => segmentDistance(a, b, p, corners[(i + 1) % 4])),
  );
}

/** Clearance in display units, with the fixed base allowed to touch the floor. */
export function configurationClearance(
  q: number[],
  lengths: number[],
  obstacles: Obstacle[],
) {
  if (q.length !== lengths.length || !q.every(Number.isFinite))
    return -Infinity;
  if (
    q[0] < 0.04 ||
    q[0] > Math.PI - 0.04 ||
    q.slice(1).some((a) => Math.abs(a) >= BEND_LIMIT)
  )
    return -Infinity;
  const points = forwardKinematics(q, lengths);
  let clearance = Math.min(
    (q[0] - 0.04) * lengths[0],
    (Math.PI - 0.04 - q[0]) * lengths[0],
  );
  for (let i = 1; i < q.length; i++)
    clearance = Math.min(
      clearance,
      (BEND_LIMIT - Math.abs(q[i])) * Math.min(...lengths),
    );
  for (let i = 0; i < lengths.length; i++) {
    clearance = Math.min(clearance, points[i + 1].y - LINK_RADIUS - CLEARANCE);
    for (const obstacle of obstacles)
      clearance = Math.min(
        clearance,
        segmentRectangleDistance(points[i], points[i + 1], obstacle) -
          LINK_RADIUS -
          CLEARANCE,
      );
    for (let j = i + 2; j < lengths.length; j++)
      clearance = Math.min(
        clearance,
        (segmentDistance(points[i], points[i + 1], points[j], points[j + 1]) -
          2 * LINK_RADIUS -
          CLEARANCE) /
          2,
      );
  }
  return clearance;
}

export const configurationValid = (
  q: number[],
  lengths: number[],
  obstacles: Obstacle[],
) => configurationClearance(q, lengths, obstacles) > 0;

/** Certify the swept motion using a conservative displacement bound, subdividing when necessary. */
export function edgeValid(
  a: number[],
  b: number[],
  lengths: number[],
  obstacles: Obstacle[],
): boolean {
  if (
    !configurationValid(a, lengths, obstacles) ||
    !configurationValid(b, lengths, obstacles)
  )
    return false;
  const check = (from: number[], to: number[], depth: number): boolean => {
    const mid = interpolateAngles(from, to, 0.5);
    const clearance = configurationClearance(mid, lengths, obstacles);
    if (clearance <= 0) return false;
    let accumulated = 0,
      bound = 0;
    for (let i = 0; i < lengths.length; i++) {
      accumulated += Math.abs(wrapAngle(to[i] - from[i])) / 2;
      bound += lengths[i] * accumulated;
    }
    if (clearance > bound + 1e-7) return true;
    if (depth >= 16) return false;
    return check(from, mid, depth + 1) && check(mid, to, depth + 1);
  };
  return check(a, b, 0);
}

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomConfiguration(count: number, random: () => number) {
  return Array.from({ length: count }, (_, i) =>
    i === 0
      ? 0.04 + random() * (Math.PI - 0.08)
      : (random() * 2 - 1) * BEND_LIMIT,
  );
}

function goalConfigurations(
  target: Point,
  lengths: number[],
  start: number[],
  obstacles: Obstacle[],
  random: () => number,
) {
  const goals: number[][] = [];
  const add = (q: number[]) => {
    const tip = forwardKinematics(q, lengths).at(-1)!;
    if (
      Math.hypot(tip.x - target.x, tip.y - target.y) > 0.8 ||
      !configurationValid(q, lengths, obstacles)
    )
      return;
    if (goals.every((g) => angleDistance(g, q) > 0.12)) goals.push(q);
  };
  if (lengths.length === 2) {
    const c =
      (target.x ** 2 + target.y ** 2 - lengths[0] ** 2 - lengths[1] ** 2) /
      (2 * lengths[0] * lengths[1]);
    if (Math.abs(c) <= 1)
      for (const direction of [1, -1]) {
        const elbow = direction * Math.acos(c);
        const shoulder =
          Math.atan2(target.y, target.x) -
          Math.atan2(
            lengths[1] * Math.sin(elbow),
            lengths[0] + lengths[1] * Math.cos(elbow),
          );
        add([wrapAngle(shoulder), elbow]);
      }
  } else {
    for (let attempt = 0; attempt < 100 && goals.length < 18; attempt++) {
      const q =
        attempt === 0
          ? [...start]
          : attempt === 1
            ? homeAngles(lengths.length)
            : randomConfiguration(lengths.length, random);
      for (let iteration = 0; iteration < 140; iteration++) {
        for (let joint = q.length - 1; joint >= 0; joint--) {
          const points = forwardKinematics(q, lengths),
            pivot = points[joint],
            tip = points.at(-1)!;
          const correction = wrapAngle(
            Math.atan2(target.y - pivot.y, target.x - pivot.x) -
              Math.atan2(tip.y - pivot.y, tip.x - pivot.x),
          );
          q[joint] = wrapAngle(
            q[joint] + Math.max(-0.55, Math.min(0.55, correction)),
          );
        }
        const tip = forwardKinematics(q, lengths).at(-1)!;
        if (Math.hypot(tip.x - target.x, tip.y - target.y) <= 0.6) break;
      }
      add(q);
    }
  }
  return goals.sort(
    (a, b) => angleDistance(start, a) - angleDistance(start, b),
  );
}

export function findHomeConfiguration(count: number, obstacles: Obstacle[]) {
  const lengths = linkLengths(count),
    home = homeAngles(count);
  if (configurationValid(home, lengths, obstacles)) return home;
  const random = seededRandom(713);
  for (let attempt = 0; attempt < 800; attempt++) {
    const candidate = randomConfiguration(count, random);
    if (configurationValid(candidate, lengths, obstacles)) return candidate;
  }
  return null;
}

function finishPath(
  route: number[][],
  lengths: number[],
  obstacles: Obstacle[],
  random: () => number,
): PlanResult {
  const shortened = route.map((q) => [...q]);
  for (let attempt = 0; attempt < 90 && shortened.length > 2; attempt++) {
    const a = Math.floor(random() * (shortened.length - 2));
    const b = a + 2 + Math.floor(random() * (shortened.length - a - 2));
    if (edgeValid(shortened[a], shortened[b], lengths, obstacles))
      shortened.splice(a + 1, b - a - 1);
  }
  const path = [shortened[0]];
  for (let i = 1; i < shortened.length; i++) {
    const steps = Math.max(
      1,
      Math.ceil(angleDistance(shortened[i - 1], shortened[i]) / 0.025),
    );
    for (let j = 1; j <= steps; j++)
      path.push(interpolateAngles(shortened[i - 1], shortened[i], j / steps));
  }
  return {
    status: "ok",
    path,
    tipPath: path.map((q) => forwardKinematics(q, lengths).at(-1)!),
  };
}

export function planArmMotion(request: PlanRequest): PlanResult {
  const { lengths, start, target, obstacles } = request;
  if (
    lengths.length < 2 ||
    lengths.length > 4 ||
    lengths.some((l) => !Number.isFinite(l) || l <= 0) ||
    ![target.x, target.y].every(Number.isFinite) ||
    obstacles.some(
      (o) =>
        ![o.x, o.y, o.width, o.height].every(Number.isFinite) ||
        o.width <= 0 ||
        o.height <= 0,
    )
  )
    throw new RangeError("Invalid arm scene.");
  const radius = Math.hypot(target.x, target.y),
    reach = lengths.reduce((a, b) => a + b, 0);
  if (
    radius > reach ||
    radius < Math.max(0, 2 * Math.max(...lengths) - reach) ||
    target.y <= LINK_RADIUS + CLEARANCE
  )
    return { status: "blocked", reason: "outside-reach" };
  if (!configurationValid(start, lengths, obstacles))
    return { status: "blocked", reason: "invalid-start" };
  if (
    obstacles.some(
      (o) =>
        segmentRectangleDistance(target, target, o) <= LINK_RADIUS + CLEARANCE,
    )
  )
    return { status: "blocked", reason: "target-blocked" };
  const random = seededRandom(request.seed ?? 34871);
  const goals = goalConfigurations(target, lengths, start, obstacles, random);
  if (!goals.length) return { status: "blocked", reason: "search-limit" };
  for (const goal of goals)
    if (edgeValid(start, goal, lengths, obstacles))
      return finishPath([start, goal], lengths, obstacles, random);

  type Node = { q: number[]; parent: number };
  type Tree = { nodes: Node[]; fromStart: boolean };
  let a: Tree = { nodes: [{ q: start, parent: -1 }], fromStart: true };
  let b: Tree = {
    nodes: goals.map((q) => ({ q, parent: -1 })),
    fromStart: false,
  };
  const nearest = (tree: Tree, q: number[]) => {
    let best = 0,
      distance = Infinity;
    tree.nodes.forEach((node, i) => {
      const d = angleDistance(node.q, q);
      if (d < distance) {
        distance = d;
        best = i;
      }
    });
    return best;
  };
  const extend = (
    tree: Tree,
    targetQ: number[],
    fromIndex = nearest(tree, targetQ),
  ) => {
    const from = tree.nodes[fromIndex].q,
      distance = angleDistance(from, targetQ);
    if (distance < 1e-8) return fromIndex;
    const q = interpolateAngles(from, targetQ, Math.min(1, 0.3 / distance));
    if (!edgeValid(from, q, lengths, obstacles)) return -1;
    tree.nodes.push({ q, parent: fromIndex });
    return tree.nodes.length - 1;
  };
  const trace = (tree: Tree, index: number) => {
    const route: number[][] = [];
    while (index >= 0) {
      route.push(tree.nodes[index].q);
      index = tree.nodes[index].parent;
    }
    return route.reverse();
  };
  for (
    let iteration = 0;
    iteration < (request.iterations ?? 3200);
    iteration++
  ) {
    const sample =
      random() < 0.18
        ? b.nodes[Math.floor(random() * b.nodes.length)].q
        : randomConfiguration(lengths.length, random);
    const added = extend(a, sample);
    if (added >= 0) {
      const meet = a.nodes[added].q;
      let other = nearest(b, meet);
      for (let step = 0; step < 30; step++) {
        const next = extend(b, meet, other);
        if (next < 0) break;
        other = next;
        if (angleDistance(b.nodes[other].q, meet) < 1e-7) {
          const first = trace(a, added),
            second = trace(b, other);
          const route = a.fromStart
            ? [...first, ...second.reverse().slice(1)]
            : [...second, ...first.reverse().slice(1)];
          return finishPath(route, lengths, obstacles, random);
        }
      }
    }
    [a, b] = [b, a];
  }
  return { status: "blocked", reason: "search-limit" };
}

/** Analytical two-link IK for the illustrative homepage diagram, in display units. */
export function solveArm(target: Point, l1 = 118, l2 = 112) {
  if (
    ![target.x, target.y, l1, l2].every(Number.isFinite) ||
    l1 <= 0 ||
    l2 <= 0
  ) {
    throw new RangeError(
      "Arm geometry and target must be finite; link lengths must be positive.",
    );
  }
  const radius = Math.hypot(target.x, target.y);
  const clampedRadius = Math.max(
    Math.abs(l1 - l2) + 0.001,
    Math.min(l1 + l2 - 0.001, radius),
  );
  const end =
    radius > 0
      ? {
          x: (target.x * clampedRadius) / radius,
          y: (target.y * clampedRadius) / radius,
        }
      : { x: clampedRadius, y: 0 };
  const a2 = Math.acos(
    Math.max(
      -1,
      Math.min(
        1,
        (end.x ** 2 + end.y ** 2 - l1 ** 2 - l2 ** 2) / (2 * l1 * l2),
      ),
    ),
  );
  const a1 =
    Math.atan2(end.y, end.x) -
    Math.atan2(l2 * Math.sin(a2), l1 + l2 * Math.cos(a2));
  return { end, elbow: { x: l1 * Math.cos(a1), y: l1 * Math.sin(a1) }, a1, a2 };
}
