import {
  CircuitBoard,
  Cpu,
  ScanEye,
  Compass,
  Activity,
  Zap,
  Play,
  Satellite,
  Wrench,
} from "lucide-react";
import { asset, type Project } from "./content";
import TechnicalDiagram from "./TechnicalDiagram";

const diagrams = {
  exo: {
    label: "WEARABLE ROBOTICS",
    nodes: ["Sense", "Control", "Actuate"],
    icon: Activity,
    caption: "Embedded control architecture",
  },
  usar: {
    label: "SEARCH & RESCUE",
    nodes: ["Camera", "Vision", "Motion"],
    icon: ScanEye,
    caption: "Vision-assisted teleoperation",
  },
  arm: {
    label: "PLANAR MANIPULATION",
    nodes: ["Target", "IK solver", "Joints"],
    icon: Compass,
    caption: "Configuration-space planning schematic",
  },
  balance: {
    label: "FEEDBACK CONTROL",
    nodes: ["IMU", "Estimate", "PID"],
    icon: Activity,
    caption: "The balance control loop",
  },
  pong: {
    label: "DIGITAL DESIGN",
    nodes: ["Game FSM", "VGA", "HDMI"],
    icon: CircuitBoard,
    caption: "Ball state machine · Simplified",
  },
  ev: {
    label: "PERSONAL BUILDS",
    nodes: ["Battery", "Controller", "Motor"],
    icon: Zap,
    caption: "Ray’s Builds · Electric vehicles",
  },
  argus: {
    label: "VISION-BASED ORBIT DETERMINATION",
    nodes: ["Frame", "Retrieve", "Fix"],
    icon: Satellite,
    caption: "Localization pipeline · Simplified",
  },
  capstone: {
    label: "BIMANUAL MANIPULATION",
    nodes: ["Unpack", "Identify", "Repack"],
    icon: Wrench,
    caption: "Handling pipeline · Simplified",
  },
};

export default function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const diagram = diagrams[project.visual];
  const Icon = diagram.icon;
  if (project.photos?.length) {
    const photo = project.photos[0];
    return (
      <div className="project-visual media-preview photo-preview">
        <div className="media-preview-frame">
          <img
            src={asset(photo.src)}
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.position }}
          />
        </div>
        <div className="media-preview-label">
          <span>THE LAB BUILD</span>
          <span>{project.photos.length} hardware views ↗</span>
        </div>
      </div>
    );
  }
  if (project.demo)
    return (
      <div className="project-visual media-preview project-demo-poster">
        <div className="media-preview-frame">
          <img
            src={asset(project.demo.cardPoster || project.demo.poster)}
            alt={project.demo.alt}
            loading="lazy"
            style={{ objectPosition: project.demo.posterPosition }}
          />
        </div>
        <div className="media-preview-label">
          <span>
            <Play size={12} fill="currentColor" /> HARDWARE DEMO
          </span>
          <span>{project.demo.duration} · Watch ↗</span>
        </div>
      </div>
    );
  if (project.visual === "ev")
    return (
      <div
        className={`project-visual visual-ev ${large ? "visual-large" : ""}`}
      >
        <img
          src={asset("images/trike-hero.jpg")}
          alt="Welding the custom frame for Ray’s electric trike"
          loading="lazy"
        />
        <div className="image-caption">
          <span>RAY’S BUILDS</span>
          <span>From my build video ↗</span>
        </div>
      </div>
    );
  return (
    <div
      className={`project-visual visual-${project.visual} ${large ? "visual-large" : ""}`}
    >
      <div className="visual-topline">
        <span>{diagram.label}</span>
        <Icon size={18} strokeWidth={1.4} />
      </div>
      {project.visual === "arm" ||
      project.visual === "balance" ||
      project.visual === "pong" ||
      project.visual === "argus" ||
      project.visual === "capstone" ? (
        <TechnicalDiagram kind={project.visual} />
      ) : (
        <div className="schematic">
          <div className="schematic-track" />
          {diagram.nodes.map((node, i) => (
            <div className="schematic-node" key={node}>
              <div className={`node-icon node-${i}`}>
                {i === 0 ? (
                  <Icon size={24} strokeWidth={1.25} />
                ) : i === 1 ? (
                  <Cpu size={24} strokeWidth={1.25} />
                ) : (
                  <span className="node-cross">+</span>
                )}
              </div>
              <span>{node}</span>
            </div>
          ))}
        </div>
      )}
      <div className="visual-bottomline">
        <span>{diagram.caption}</span>
        <span>↗</span>
      </div>
    </div>
  );
}
