import { useId } from "react";

export default function TechnicalDiagram({
  kind,
}: {
  kind: "arm" | "balance" | "pong";
}) {
  const patternId = useId();
  if (kind === "pong")
    return (
      <svg
        className="technical-diagram"
        viewBox="0 0 400 160"
        role="img"
        aria-label="Simplified ball state machine with center, upper-left, upper-right, lower-left, and lower-right motion states"
      >
        <g className="diagram-connectors">
          <path d="M75 47H166M234 47H325M75 113H166M234 113H325M75 47V113M325 47V113M200 47V113" />
        </g>
        {[
          { x: 45, y: 27, t: "UL" },
          { x: 170, y: 27, t: "CENTER" },
          { x: 295, y: 27, t: "UR" },
          { x: 45, y: 93, t: "DL" },
          { x: 295, y: 93, t: "DR" },
        ].map((node) => (
          <g key={node.t}>
            <rect
              x={node.x}
              y={node.y}
              width="60"
              height="40"
              rx="6"
              className={
                node.t === "CENTER" ? "diagram-box active-box" : "diagram-box"
              }
            />
            <text
              x={node.x + 30}
              y={node.y + 24}
              textAnchor="middle"
              className="diagram-node-label"
            >
              {node.t}
            </text>
          </g>
        ))}
        <text
          x="200"
          y="118"
          textAnchor="middle"
          className="diagram-annotation"
        >
          COLLISION / SERVE
        </text>
      </svg>
    );
  if (kind === "balance")
    return (
      <svg
        className="technical-diagram"
        viewBox="0 0 400 160"
        role="img"
        aria-label="Feedback control schematic: IMU measurements enter a Kalman estimator, then tilt control produces a motor command, with feedback returning to the sensor"
      >
        <path d="M67 62H336V124H67V84" className="diagram-connectors" />
        {[
          { x: 34, t: "IMU", sub: "measure" },
          { x: 160, t: "KALMAN", sub: "estimate" },
          { x: 286, t: "PD / PID", sub: "correct" },
        ].map((node) => (
          <g key={node.t}>
            <rect
              x={node.x}
              y="35"
              width="80"
              height="51"
              rx="8"
              className={
                node.t === "KALMAN" ? "diagram-box active-box" : "diagram-box"
              }
            />
            <text
              x={node.x + 40}
              y="58"
              textAnchor="middle"
              className="diagram-node-label"
            >
              {node.t}
            </text>
            <text
              x={node.x + 40}
              y="75"
              textAnchor="middle"
              className="diagram-annotation"
            >
              {node.sub}
            </text>
          </g>
        ))}
        <rect x="154" y="112" width="105" height="23" fill="#F4F4F4" />
        <text
          x="207"
          y="128"
          textAnchor="middle"
          className="diagram-annotation"
        >
          TILT FEEDBACK
        </text>
        <path d="M62 92L67 84L72 92" className="diagram-arrow" />
      </svg>
    );
  return (
    <svg
      className="technical-diagram"
      viewBox="0 0 400 160"
      role="img"
      aria-label="Illustrative planning diagram showing waypoints around blocked regions in a two-joint configuration space"
    >
      <defs>
        <pattern
          id={patternId}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0V20"
            fill="none"
            stroke="#111111"
            strokeOpacity=".13"
            strokeWidth=".5"
          />
        </pattern>
      </defs>
      <rect x="40" y="5" width="320" height="140" fill={`url(#${patternId})`} />
      <path d="M40 5V145H360" className="diagram-connectors" />
      <rect
        x="142"
        y="65"
        width="55"
        height="64"
        rx="3"
        fill="#DCDCDC"
        stroke="#8A8A8A"
        strokeWidth=".7"
      />
      <rect
        x="244"
        y="18"
        width="46"
        height="56"
        rx="3"
        fill="#DCDCDC"
        stroke="#8A8A8A"
        strokeWidth=".7"
      />
      <path
        d="M65 120L104 90L124 47L207 47L226 90L302 103L335 35"
        fill="none"
        stroke="#111111"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      {[
        [65, 120],
        [104, 90],
        [124, 47],
        [207, 47],
        [226, 90],
        [302, 103],
        [335, 35],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3" fill="#111111" />
      ))}
      <circle
        cx="335"
        cy="35"
        r="8"
        fill="none"
        stroke="#8A8A8A"
        strokeWidth="1"
      />
      <text x="368" y="148" className="diagram-annotation">
        θ₁
      </text>
      <text x="25" y="15" className="diagram-annotation">
        θ₂
      </text>
    </svg>
  );
}
