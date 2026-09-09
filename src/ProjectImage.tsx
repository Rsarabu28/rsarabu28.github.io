import { asset, type Project } from "./content";

type Photo = NonNullable<Project["photos"]>[number];

export default function ProjectImage({
  photo,
  preview = false,
  decorative = false,
}: {
  photo: Photo;
  preview?: boolean;
  decorative?: boolean;
}) {
  const image = (
    <img
      src={asset(photo.src)}
      alt={decorative ? "" : photo.alt}
      loading="lazy"
      decoding="async"
      style={{
        objectPosition: photo.position,
        objectFit: preview ? (photo.previewFit ?? "cover") : photo.fit,
      }}
    />
  );
  return (
    <span className={`project-image ${photo.framing ?? ""}`}>
      {photo.framing ? <span className="concept-crop">{image}</span> : image}
    </span>
  );
}
