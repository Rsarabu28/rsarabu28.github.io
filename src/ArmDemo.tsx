import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AlertTriangle, Plus, Trash2, X } from "lucide-react";
import {
  angleDistance,
  configurationValid,
  findHomeConfiguration,
  forwardKinematics,
  homeAngles,
  interpolateAngles,
  linkLengths,
  type Obstacle,
  type PlanResult,
  type Point,
} from "./kinematics";

const origin = { x: 235, y: 260 };
const blockSize = 32;
const initialBlocks: Obstacle[] = [
  { id: "first-block", x: -82, y: 75, width: blockSize, height: blockSize },
];
type Drag = {
  anchor: Point;
  original: Obstacle;
};
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function ArmDemo({ compact = false }: { compact?: boolean }) {
  const gridId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [count, setCount] = useState(2);
  const lengths = linkLengths(count);
  const [angles, setAngles] = useState(homeAngles(2));
  const anglesRef = useRef(angles);
  const [obstacles, setObstacles] = useState(initialBlocks);
  const [target, setTarget] = useState<Point | null>(null);
  const [tipPath, setTipPath] = useState<Point[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "planning" | "moving">("idle");
  const [warning, setWarning] = useState("");
  const [placeMode, setPlaceMode] = useState(false);
  const [blockCursor, setBlockCursor] = useState<Point>({ x: -130, y: 150 });
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Obstacle | null>(null);
  const draftRef = useRef<Obstacle | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const frameRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const revision = useRef(0);
  const blockId = useRef(0);

  const cancel = () => {
    revision.current++;
    workerRef.current?.terminate();
    workerRef.current = null;
    cancelAnimationFrame(frameRef.current);
    clearTimeout(timerRef.current);
  };
  useEffect(() => () => cancel(), []);
  const setPose = (q: number[]) => {
    anglesRef.current = q;
    setAngles(q);
  };
  const clearPath = () => {
    setTipPath([]);
    setProgress(0);
    setPhase("idle");
  };

  const planTo = (point: Point, scene = obstacles) => {
    cancel();
    const requestId = revision.current;
    setTarget(point);
    setWarning("");
    setTipPath([]);
    setProgress(0);
    setPhase("planning");
    const fail = (message: string) => {
      setPhase("idle");
      setWarning(message);
    };
    try {
      const worker = new Worker(
        new URL("./planner.worker.ts", import.meta.url),
        { type: "module" },
      );
      workerRef.current = worker;
      timerRef.current = setTimeout(() => {
        if (revision.current !== requestId) return;
        worker.terminate();
        workerRef.current = null;
        fail(
          "No path found within the search limit. Try another target or move an obstacle.",
        );
      }, 7000);
      worker.onerror = () => {
        if (revision.current !== requestId) return;
        clearTimeout(timerRef.current);
        worker.terminate();
        workerRef.current = null;
        fail("The planner couldn’t start. Try clicking the target again.");
      };
      worker.onmessage = (
        event: MessageEvent<PlanResult | { status: "error" }>,
      ) => {
        if (revision.current !== requestId) return;
        clearTimeout(timerRef.current);
        worker.terminate();
        workerRef.current = null;
        const result = event.data;
        if (result.status !== "ok") {
          const reason = result.status === "blocked" ? result.reason : "error";
          fail(
            reason === "outside-reach"
              ? "No path found. That point is outside the arm’s reach."
              : reason === "target-blocked"
                ? "No path found. The target is too close to an obstacle."
                : reason === "invalid-start"
                  ? "No path found. Move the obstacle that overlaps the arm."
                  : reason === "error"
                    ? "The planner ran into a problem. Try another target."
                    : "No path found within the search limit. Try another target or move an obstacle.",
          );
          return;
        }
        setTipPath(result.tipPath);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setPose(result.path.at(-1)!);
          setProgress(result.path.length - 1);
          setPhase("idle");
          return;
        }
        const distance = result.path.reduce(
          (sum, q, i) => (i ? sum + angleDistance(result.path[i - 1], q) : 0),
          0,
        );
        if (distance < 0.001) {
          setPose(result.path.at(-1)!);
          setPhase("idle");
          return;
        }
        const duration = clamp(distance * 1400, 2600, 6500);
        let started: number | undefined;
        setPhase("moving");
        const tick = (time: number) => {
          if (revision.current !== requestId) return;
          started ??= time;
          const t = clamp((time - started - 200) / duration, 0, 1);
          const index = t * t * (3 - 2 * t) * (result.path.length - 1);
          const i = Math.min(Math.floor(index), result.path.length - 2);
          setPose(
            interpolateAngles(result.path[i], result.path[i + 1], index - i),
          );
          setProgress(index);
          if (t < 1) frameRef.current = requestAnimationFrame(tick);
          else setPhase("idle");
        };
        frameRef.current = requestAnimationFrame(tick);
      };
      worker.postMessage({
        lengths,
        start: [...anglesRef.current],
        target: point,
        obstacles: scene,
      });
    } catch {
      fail(
        "The planner couldn’t start in this browser. Try refreshing the page.",
      );
    }
  };

  const chooseLinks = (value: number) => {
    if (value === count) return;
    const pose = findHomeConfiguration(value, obstacles);
    if (!pose) {
      setWarning("Move or remove an obstacle to make room for the new arm.");
      return;
    }
    cancel();
    clearPath();
    setWarning("");
    setTarget(null);
    setCount(value);
    setPose(pose);
    setDraft(null);
    draftRef.current = null;
    dragRef.current = null;
  };
  const worldPoint = (event: ReactPointerEvent) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: clamp(
        ((event.clientX - rect.left) / rect.width) * 470 - origin.x,
        -218,
        218,
      ),
      y: clamp(
        origin.y - ((event.clientY - rect.top) / rect.height) * 330,
        8,
        238,
      ),
    };
  };
  const updateDraft = (box: Obstacle | null) => {
    draftRef.current = box;
    setDraft(box);
  };
  const stopForEdit = () => {
    cancel();
    clearPath();
    setWarning("");
  };
  const commitBlock = (box: Obstacle) => {
    const scene = [...obstacles.filter((o) => o.id !== box.id), box];
    if (!configurationValid(anglesRef.current, lengths, scene)) {
      setWarning("That obstacle overlaps the arm. Place it in a clear spot.");
      return;
    }
    setObstacles(scene);
    setSelected(box.id);
    setPlaceMode(false);
    if (target) planTo(target, scene);
  };
  const placeBlock = (point: Point) => {
    if (obstacles.length >= 6) {
      setWarning("Use up to six obstacles. Remove one to add another.");
      return;
    }
    stopForEdit();
    commitBlock({
      id: `block-${++blockId.current}`,
      x: clamp(point.x - blockSize / 2, -215, 215 - blockSize),
      y: clamp(point.y - blockSize / 2, 10, 238 - blockSize),
      width: blockSize,
      height: blockSize,
    });
  };
  const removeBlock = (id: string) => {
    stopForEdit();
    const scene = obstacles.filter((o) => o.id !== id);
    setObstacles(scene);
    setSelected(null);
    if (target) planTo(target, scene);
  };
  const startDrag = (event: ReactPointerEvent, original: Obstacle) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();
    stopForEdit();
    setPlaceMode(false);
    dragRef.current = { original, anchor: worldPoint(event) };
    setSelected(original.id);
    updateDraft(original);
    svgRef.current!.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: ReactPointerEvent) => {
    const drag = dragRef.current;
    if (!drag && !placeMode) return;
    const point = worldPoint(event);
    if (!drag) {
      setBlockCursor({
        x: clamp(point.x, -215 + blockSize / 2, 215 - blockSize / 2),
        y: clamp(point.y, 10 + blockSize / 2, 238 - blockSize / 2),
      });
      return;
    }
    const o = drag.original;
    updateDraft({
      ...o,
      x: clamp(o.x + point.x - drag.anchor.x, -215, 215 - blockSize),
      y: clamp(o.y + point.y - drag.anchor.y, 10, 238 - blockSize),
    });
  };
  const finishDrag = (event: ReactPointerEvent) => {
    if (!dragRef.current) return;
    const box = draftRef.current;
    dragRef.current = null;
    updateDraft(null);
    if (svgRef.current?.hasPointerCapture(event.pointerId))
      svgRef.current.releasePointerCapture(event.pointerId);
    if (box) commitBlock(box);
  };
  const points = forwardKinematics(angles, lengths),
    tip = points.at(-1)!;
  const svgPath = (p: Point[]) =>
    p
      .map((v, i) => `${i ? "L" : "M"}${origin.x + v.x} ${origin.y - v.y}`)
      .join(" ");
  const traced = tipPath.length
    ? [...tipPath.slice(0, Math.floor(progress) + 1), tip]
    : [];
  const visibleBlocks = draft
    ? [...obstacles.filter((o) => o.id !== draft.id), draft]
    : obstacles;
  const traceStart = tipPath[0];

  return (
    <div className={`arm-demo ${compact ? "arm-demo-compact" : ""}`}>
      <div className="demo-heading">
        <span>
          <span className="live-dot" /> KINEMATICS PLAYGROUND
        </span>
        <span>{count} DOF</span>
      </div>
      <div className="planner-toolbar">
        <div
          className="link-count-control"
          role="group"
          aria-label="Number of arm links"
        >
          <span>Arm links</span>
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              aria-pressed={count === n}
              onClick={() => chooseLinks(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <button
          className={`block-tool ${placeMode ? "active" : ""}`}
          aria-pressed={placeMode}
          onClick={() => {
            setPlaceMode(!placeMode);
            setWarning("");
            svgRef.current?.focus();
          }}
        >
          <Plus size={14} /> Add obstacle
        </button>
        <button
          className="remove-block"
          aria-label="Remove selected obstacle"
          disabled={!selected}
          onClick={() => selected && removeBlock(selected)}
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className={`planner-plot ${placeMode ? "placing-block" : ""}`}>
        <svg
          ref={svgRef}
          viewBox="0 0 470 330"
          className="arm-svg"
          role="group"
          tabIndex={0}
          aria-label="Robot arm playground. Click to set a target, or use arrow keys. Add obstacles to plan around."
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            if (placeMode) placeBlock(worldPoint(event));
            else {
              setSelected(null);
              planTo(worldPoint(event));
            }
          }}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={() => {
            dragRef.current = null;
            updateDraft(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setPlaceMode(false);
              setSelected(null);
              dragRef.current = null;
              updateDraft(null);
              setWarning("");
              return;
            }
            const steps: Record<string, Point> = {
              ArrowLeft: { x: -12, y: 0 },
              ArrowRight: { x: 12, y: 0 },
              ArrowUp: { x: 0, y: 12 },
              ArrowDown: { x: 0, y: -12 },
            };
            const step = steps[event.key];
            if (placeMode && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              placeBlock(blockCursor);
            } else if (step) {
              event.preventDefault();
              if (placeMode)
                setBlockCursor((p) => ({
                  x: clamp(p.x + step.x, -199, 199),
                  y: clamp(p.y + step.y, 26, 222),
                }));
              else {
                const from = target ?? tip;
                planTo({
                  x: clamp(from.x + step.x, -218, 218),
                  y: clamp(from.y + step.y, 8, 238),
                });
              }
            }
          }}
        >
          <defs>
            <pattern
              id={gridId}
              width="23.5"
              height="23.5"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="1"
                cy="1"
                r="0.8"
                fill="currentColor"
                opacity="0.26"
              />
            </pattern>
          </defs>
          <rect width="470" height="330" fill={`url(#${gridId})`} />
          <path d="M20 260H450" className="plot-axis" />
          <path
            d="M25 260A210 210 0 0 1 445 260"
            fill="none"
            className="reach-boundary"
          />
          <text x="28" y="310" className="plot-label">
            {placeMode
              ? "CLICK TO PLACE AN OBSTACLE"
              : phase === "planning"
                ? "FINDING A PATH…"
                : "CLICK TO SET A TARGET"}
          </text>
          {placeMode && !draft && (
            <rect
              className="block-cursor"
              x={origin.x + blockCursor.x - blockSize / 2}
              y={origin.y - blockCursor.y - blockSize / 2}
              width={blockSize}
              height={blockSize}
              rx="3"
              pointerEvents="none"
            />
          )}
          {visibleBlocks.map((box, i) => (
            <g
              key={box.id}
              role="button"
              tabIndex={0}
              aria-label={`Obstacle ${i + 1}. Drag to move, use arrow keys, or press Delete to remove.`}
              className={`planner-obstacle ${selected === box.id || draft?.id === box.id ? "selected" : ""}`}
              onPointerDown={(event) => startDrag(event, box)}
              onFocus={() => setSelected(box.id)}
              onKeyDown={(event) => {
                if (["Delete", "Backspace"].includes(event.key)) {
                  event.preventDefault();
                  event.stopPropagation();
                  removeBlock(box.id);
                  return;
                }
                const steps: Record<string, Point> = {
                  ArrowLeft: { x: -5, y: 0 },
                  ArrowRight: { x: 5, y: 0 },
                  ArrowUp: { x: 0, y: 5 },
                  ArrowDown: { x: 0, y: -5 },
                };
                const step = steps[event.key];
                if (!step) return;
                event.preventDefault();
                event.stopPropagation();
                stopForEdit();
                commitBlock({
                  ...box,
                  x: clamp(box.x + step.x, -215, 215 - blockSize),
                  y: clamp(box.y + step.y, 10, 238 - blockSize),
                });
              }}
            >
              <rect
                x={origin.x + box.x}
                y={origin.y - box.y - box.height}
                width={box.width}
                height={box.height}
                rx="3"
              />
            </g>
          ))}
          <g pointerEvents="none">
            <path d={svgPath(tipPath)} className="planned-tip-path" />
            <path d={svgPath(traced)} className="traced-tip-path" />
            {traceStart && (
              <circle
                cx={origin.x + traceStart.x}
                cy={origin.y - traceStart.y}
                r="5"
                className="trace-start-point"
              />
            )}
            {lengths.map((_, i) => (
              <g key={i}>
                <path
                  d={svgPath([points[i], points[i + 1]])}
                  className={`arm-link ${i % 2 ? "arm-link-two" : "arm-link-one"}`}
                />
                <circle
                  cx={origin.x + points[i].x}
                  cy={origin.y - points[i].y}
                  r={i ? 7 : 11}
                  className="arm-joint"
                />
              </g>
            ))}
            <circle cx={origin.x} cy={origin.y} r="3" fill="#111111" />
            {target && (
              <circle
                cx={origin.x + target.x}
                cy={origin.y - target.y}
                r="12"
                className={`target-ring ${warning ? "blocked-target" : ""}`}
              />
            )}
            <circle
              cx={origin.x + tip.x}
              cy={origin.y - tip.y}
              r="5"
              fill="#111111"
            />
            {lengths.map((_, i) => {
              const mx = origin.x + (points[i].x + points[i + 1].x) / 2;
              const my = origin.y - (points[i].y + points[i + 1].y) / 2;
              // Always offset to the same side: a side that depended on the
              // link's angle would flip as the arm swings through vertical.
              // Shortened on short links so the label clears the joint dots.
              const span = Math.hypot(
                points[i + 1].x - points[i].x,
                points[i + 1].y - points[i].y,
              );
              const offset = Math.min(11, Math.max(7, span * 0.24));
              return (
                <text
                  key={i}
                  x={mx + offset}
                  y={my}
                  className="link-label"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  L{i + 1}
                </text>
              );
            })}
          </g>
        </svg>
        {warning && (
          <div className="planner-warning" role="alert">
            <AlertTriangle size={16} />
            <span>{warning}</span>
            <button onClick={() => setWarning("")} aria-label="Dismiss warning">
              <X size={14} />
            </button>
          </div>
        )}
      </div>
      <div className="planner-readout">
        <div className="trajectory-legend">
          <span>Planned</span>
          <span>Traced</span>
        </div>
        <div className="joint-readout">
          {angles.map((q, i) => (
            <span key={i}>
              θ{i + 1} <b>{Math.round((q * 180) / Math.PI)}°</b>
            </span>
          ))}
        </div>
      </div>
      <p className="planner-hint">
        {placeMode
          ? "Click to place an obstacle. Arrow keys and Enter work too."
          : selected
            ? "Drag the obstacle to move it, or use the bin to remove it."
            : "Click a target. Add an obstacle to give the arm a detour."}
      </p>
    </div>
  );
}
