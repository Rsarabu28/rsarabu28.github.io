import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { asset, type Project } from "./content";

export default function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const photos = project.photos;
  if (!photos?.length) return null;
  const photo = photos[selected];
  return (
    <section
      className={`project-gallery ${project.visual === "exo" ? "gallery-wearable" : ""}`}
      aria-label={`${project.name} hardware photos`}
    >
      <figure className="hardware-photo">
        <div className="hardware-photo-frame" id="hardware-photo-view">
          <img
            src={asset(photo.src)}
            alt={photo.alt}
            style={{ objectPosition: photo.position, objectFit: photo.fit }}
          />
        </div>
        <figcaption>
          <span>
            0{selected + 1} / 0{photos.length} · LAB PHOTOGRAPHY
          </span>
          <a href={asset(photo.src)} target="_blank" rel="noreferrer">
            Full photo <ArrowUpRight size={14} />
          </a>
        </figcaption>
      </figure>
      <div className="gallery-notes">
        <p className="eyebrow">A CLOSER LOOK</p>
        <h2>The hardware</h2>
        <div className="gallery-views" aria-label="Choose a hardware view">
          {photos.map((item, index) => (
            <button
              key={item.src}
              aria-pressed={selected === index}
              aria-controls="hardware-photo-view"
              onClick={() => setSelected(index)}
            >
              <img
                src={asset(item.src)}
                alt=""
                loading="lazy"
                style={{ objectPosition: item.position }}
              />
              <span>
                <small>0{index + 1}</small>
                {item.title}
              </span>
            </button>
          ))}
        </div>
        <p className="gallery-caption" aria-live="polite">
          {photo.caption}
        </p>
      </div>
    </section>
  );
}
