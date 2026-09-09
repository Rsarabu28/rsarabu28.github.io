import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { asset, type Project } from "./content";
import ProjectImage from "./ProjectImage";

export default function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const photos = project.photos;
  if (!photos?.length) return null;
  const photo = photos[selected];
  return (
    <section
      className={`project-gallery gallery-${project.visual} ${project.visual === "exo" ? "gallery-wearable" : ""}`}
      aria-label={`${project.name} images`}
    >
      <figure className="hardware-photo">
        <div className="hardware-photo-frame" id="hardware-photo-view">
          <ProjectImage photo={photo} />
        </div>
        <figcaption>
          <span>
            0{selected + 1} / 0{photos.length} · {project.gallery?.label ?? "LAB PHOTOGRAPHY"}
          </span>
          <a href={asset(photo.src)} target="_blank" rel="noreferrer">
            {photo.framing ? "Full brief" : "Full image"} <ArrowUpRight size={14} />
          </a>
        </figcaption>
      </figure>
      <div className="gallery-notes">
        <p className="eyebrow">A CLOSER LOOK</p>
        <h2>{project.gallery?.title ?? "The hardware"}</h2>
        {photos.length > 1 && <div className="gallery-views" aria-label="Choose an image">
          {photos.map((item, index) => (
            <button
              key={item.src}
              aria-pressed={selected === index}
              aria-controls="hardware-photo-view"
              onClick={() => setSelected(index)}
            >
              <ProjectImage photo={item} preview decorative />
              <span>
                <small>0{index + 1}</small>
                {item.title}
              </span>
            </button>
          ))}
        </div>}
        <p className="gallery-caption" aria-live="polite">
          {photo.caption}
        </p>
        {photo.source && (
          <a className="text-link gallery-source" href={photo.source.url} target="_blank" rel="noreferrer">
            {photo.source.label} <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </section>
  );
}
