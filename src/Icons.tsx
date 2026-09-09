import type { SVGProps } from "react";
import {
  Activity,
  Bot,
  Car,
  FlaskConical,
  Gamepad2,
  Radar,
  Zap,
  type LucideProps,
} from "lucide-react";
import type { Project } from "./content";

type BrandProps = SVGProps<SVGSVGElement> & { size?: number };

function Brand({ size = 18, children, ...rest }: BrandProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function GithubIcon(props: BrandProps) {
  return (
    <Brand {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </Brand>
  );
}

export function LinkedinIcon(props: BrandProps) {
  return (
    <Brand {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </Brand>
  );
}

export function YoutubeIcon(props: BrandProps) {
  return (
    <Brand {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </Brand>
  );
}

/** General Motors square wordmark. */
export function GmIcon(props: BrandProps) {
  return (
    <Brand {...props}>
      <path d="M3.34 0A3.345 3.345 0 0 0 0 3.34v17.32A3.345 3.345 0 0 0 3.34 24h17.32A3.345 3.345 0 0 0 24 20.66V3.34C23.982 1.5 22.501 0 20.66 0zm0 1.535h17.32c.992 0 1.805.813 1.805 1.806v17.3c0 .993-.813 1.806-1.806 1.806H3.341a1.811 1.811 0 0 1-1.806-1.806v-17.3c0-.993.813-1.806 1.806-1.806zm2.98 4.677A1.877 1.877 0 0 0 4.442 8.09v4.569c0 1.03.85 1.86 1.879 1.878h1.552v.343c-.018.85-.505 1.337-1.679 1.355h-.74v1.535h.74c2.167 0 3.395-1.03 3.431-2.908v-8.65zm4.623 0v8.307h1.752V7.73h1.68v6.79h1.752V7.73h1.01c.362 0 .669.289.669.668v6.14h1.752V8.09c-.018-1.029-.85-1.878-1.879-1.878zM6.863 7.73h1.01v5.273h-1.01a.666.666 0 0 1-.669-.668V8.397c0-.36.29-.668.668-.668zm4.08 8.506v1.535h8.596v-1.535z" />
    </Brand>
  );
}

/** Icon for an organization by short name; falls back to the text mark. */
export function OrganizationIcon({
  shortName,
  size = 26,
}: {
  shortName: string;
  size?: number;
}) {
  if (shortName === "GM") return <GmIcon size={size} />;
  if (shortName === "MM") return <FlaskConical size={size} strokeWidth={1.5} />;
  return <>{shortName}</>;
}

/** Icon for an external link, picked from the URL host. */
export function LinkIcon({ url, size = 15 }: { url: string; size?: number }) {
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    host = "";
  }
  if (/youtube\.com|youtu\.be/.test(host)) return <YoutubeIcon size={size} />;
  if (/github\.com/.test(host)) return <GithubIcon size={size} />;
  return null;
}

const projectIcons: Record<Project["visual"], typeof Bot> = {
  exo: Activity,
  usar: Radar,
  arm: Bot,
  ev: Car,
  balance: Activity,
  pong: Gamepad2,
};

export function ProjectIcon({
  visual,
  ...props
}: { visual: Project["visual"] } & LucideProps) {
  const Icon = visual === "balance" ? Zap : projectIcons[visual];
  return <Icon strokeWidth={1.6} aria-hidden="true" {...props} />;
}
