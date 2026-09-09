import assert from "node:assert/strict";

export function verifyPlanner(k) {
  const box = { id: "test", x: -12, y: 125, width: 24, height: 24 };
  const distanceToBox = (p, b) =>
    Math.hypot(
      Math.max(b.x - p.x, 0, p.x - b.x - b.width),
      Math.max(b.y - p.y, 0, p.y - b.y - b.height),
    );
  // Independent geometric check: derive endpoints and densely sample the thick links.
  const inspectPose = (q, lengths, obstacles) => {
    let heading = 0;
    let point = { x: 0, y: 0 };
    q.forEach((angle, i) => {
      assert.ok(Number.isFinite(angle));
      heading += angle;
      const end = {
        x: point.x + lengths[i] * Math.cos(heading),
        y: point.y + lengths[i] * Math.sin(heading),
      };
      assert.ok(end.y >= 7, "non-base joints stay above the floor");
      const steps = Math.ceil(lengths[i] * 2);
      for (let step = 0; step <= steps; step++) {
        const p = {
          x: point.x + ((end.x - point.x) * step) / steps,
          y: point.y + ((end.y - point.y) * step) / steps,
        };
        obstacles.forEach((obstacle) =>
          assert.ok(
            distanceToBox(p, obstacle) > 6.99,
            "the full thick link clears the obstacle",
          ),
        );
      }
      point = end;
    });
    return point;
  };
  let checkedPlans = 0;
  for (const count of [2, 3, 4]) {
    const lengths = k.linkLengths(count);
    const start = [Math.PI / 6, Math.PI / 3, ...Array(count - 2).fill(0)];
    const goal = [(5 * Math.PI) / 6, -Math.PI / 3, ...Array(count - 2).fill(0)];
    const target = k.forwardKinematics(goal, lengths).at(-1);
    assert.ok(k.configurationValid(start, lengths, [box]));
    assert.ok(k.configurationValid(goal, lengths, [box]));
    assert.equal(
      k.edgeValid(start, goal, lengths, [box]),
      false,
      "clear endpoints still need swept collision checks",
    );
    const result = k.planArmMotion({
      lengths,
      start,
      target,
      obstacles: [box],
      seed: 34871,
    });
    assert.equal(
      result.status,
      "ok",
      `${count} links find a route around the block`,
    );
    assert.deepEqual(
      result.path[0],
      start,
      "the route starts at the actual pose",
    );
    assert.equal(result.tipPath.length, result.path.length);
    const end = inspectPose(result.path.at(-1), lengths, [box]);
    assert.ok(
      Math.hypot(end.x - target.x, end.y - target.y) < 0.8,
      "the route reaches its requested target",
    );
    result.path.forEach((q, i) => {
      inspectPose(q, lengths, [box]);
      if (!i) return;
      assert.ok(
        k.angleDistance(result.path[i - 1], q) <= 0.025001,
        "playback has no joint jumps",
      );
      assert.ok(k.edgeValid(result.path[i - 1], q, lengths, [box]));
      for (const t of [0.25, 0.5, 0.75])
        inspectPose(k.interpolateAngles(result.path[i - 1], q, t), lengths, [
          box,
        ]);
    });
    checkedPlans++;
    const outside = k.planArmMotion({
      lengths,
      start,
      target: { x: 240, y: 50 },
      obstacles: [],
    });
    assert.deepEqual(outside, { status: "blocked", reason: "outside-reach" });
    const occupied = k.planArmMotion({
      lengths,
      start,
      target: { x: 0, y: 135 },
      obstacles: [box],
    });
    assert.deepEqual(occupied, { status: "blocked", reason: "target-blocked" });
    const overlap = { id: "overlap", x: 0, y: 0, width: 50, height: 40 };
    assert.deepEqual(
      k.planArmMotion({ lengths, start, target, obstacles: [overlap] }),
      { status: "blocked", reason: "invalid-start" },
    );
  }
  const lengths = k.linkLengths(2);
  const wall = { id: "wall", x: 40, y: 0, width: 20, height: 230 };
  assert.equal(
    k.planArmMotion({
      lengths,
      start: [2.4, 0.1],
      target: { x: 150, y: 100 },
      obstacles: [wall],
    }).status,
    "blocked",
    "a wall across the workspace cannot be crossed",
  );
  assert.equal(
    k.edgeValid([Math.PI / 2, 2.9], [Math.PI / 2, -2.9], lengths, []),
    false,
    "wrapped joints cannot jump through the excluded folded configuration",
  );
  const crossing = [Math.PI / 6, (2 * Math.PI) / 3, (5 * Math.PI) / 6];
  assert.ok(
    k
      .forwardKinematics(crossing, [100, 100, 100])
      .slice(1)
      .every((p) => p.y > 7),
  );
  assert.equal(
    k.configurationValid(crossing, [100, 100, 100], []),
    false,
    "nonadjacent links cannot cross",
  );
  const skinny = { id: "skinny", x: 9.99, y: -1, width: 0.02, height: 2 };
  assert.equal(
    k.segmentRectangleDistance({ x: 0, y: 0 }, { x: 20, y: 0 }, skinny),
    0,
    "thin obstacles intersecting the middle of a link are detected",
  );
  assert.equal(
    k.segmentRectangleDistance(
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { id: "touch", x: 10, y: 0, width: 5, height: 5 },
    ),
    0,
    "boundary contact is a collision",
  );
  assert.throws(
    () =>
      k.planArmMotion({
        lengths,
        start: [1, 1],
        target: { x: NaN, y: 100 },
        obstacles: [],
      }),
    RangeError,
  );
  assert.equal(
    k.planArmMotion({
      lengths,
      start: k.homeAngles(2),
      target: { x: 0, y: 8 },
      obstacles: [],
    }).reason,
    "outside-reach",
    "inner unreachable targets are not silently clamped",
  );
  console.log(
    `Verified ${checkedPlans} obstacle detours with independent swept-link checks, unreachable targets, blocked scenes, and self-collision.`,
  );
}
