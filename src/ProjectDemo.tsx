import { ArrowUpRight } from "lucide-react";
import { asset, type Project } from "./content";

export default function ProjectDemo({ project }: { project: Project }) {
  if (!project.demo) return null;
  const demo = project.demo;
  return (
    <section
      className="project-demo"
      aria-label={`${project.name} video demonstration`}
    >
      <figure className="project-demo-player">
        <video
          key={demo.video}
          controls
          playsInline
          preload="none"
          poster={asset(demo.poster)}
          style={{ aspectRatio: demo.aspectRatio }}
          aria-label={`${project.name}: original hardware demonstration, ${demo.duration}, silent`}
        >
          <source src={asset(demo.video)} type="video/mp4" />
          Your browser does not support this video.{" "}
          <a href={asset(demo.video)}>Open the recording</a>.
        </video>
        <figcaption>{demo.caption}</figcaption>
      </figure>
      <div className="project-demo-notes">
        <p className="eyebrow">HARDWARE DEMO · {demo.duration}</p>
        <h2>{demo.title}</h2>
        {demo.observations.map((observation) => (
          <div className="demo-observation" key={observation.title}>
            <h3>{observation.title}</h3>
            <p>{observation.text}</p>
          </div>
        ))}
        <a
          className="text-link"
          href={asset(demo.fullVideo || demo.video)}
          target="_blank"
          rel="noreferrer"
        >
          {demo.fullVideo ? "Full recording + board setup" : "Open video"}{" "}
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
