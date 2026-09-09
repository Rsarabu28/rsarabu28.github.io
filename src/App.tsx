import { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDot,
  CookingPot,
  Copy,
  FileText,
  MapPin,
  Dumbbell,
  Mail,
  Menu,
  Music2,
  Play,
  Satellite,
  Users,
  Volleyball,
  Wrench,
  X,
} from "lucide-react";
import ArmDemo from "./ArmDemo";
import {
  GithubIcon,
  LinkedinIcon,
  LinkIcon,
  OrganizationIcon,
  ProjectIcon,
} from "./Icons";
import ProjectVisual from "./ProjectVisual";
import ProjectDemo from "./ProjectDemo";
import ProjectGallery from "./ProjectGallery";
import TechnicalDiagram from "./TechnicalDiagram";
import {
  asset,
  currentProjects,
  experience,
  profile,
  projects,
  type Project,
} from "./content";

function ContactLinks({
  labels = false,
  showEmail = true,
}: {
  labels?: boolean;
  showEmail?: boolean;
}) {
  return (
    <div className="contact-links">
      {profile.github && (
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GithubIcon size={18} />
          {labels && "GitHub"}
          {labels && <ArrowUpRight size={14} />}
        </a>
      )}
      {profile.linkedin && (
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={18} />
          {labels && "LinkedIn"}
          {labels && <ArrowUpRight size={14} />}
        </a>
      )}
      {showEmail && (
        <a href={`mailto:${profile.email}`} aria-label="Email Ray">
          <Mail size={18} />
          {labels && "Email"}
          {labels && <ArrowUpRight size={14} />}
        </a>
      )}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="wordmark" aria-label="Ray Sarabu home">
          ray<span>.</span>
        </Link>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {[
            ["/", "Home"],
            ["/projects", "Projects"],
            ["/experience", "Experience"],
            ["/about", "About"],
          ].map(([url, label]) => (
            <NavLink key={url} to={url} end={url === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <a
          href={asset("resume.pdf")}
          target="_blank"
          rel="noreferrer"
          className="resume-link"
        >
          <FileText size={15} /> Résumé <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link to="/" className="wordmark">
          ray<span>.</span>
        </Link>
        <p>Thanks for checking out my work!</p>
        <ContactLinks />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ray Sarabu</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function ProjectCard({
  project,
  index,
  title = project.name,
  summary = project.summary,
}: {
  project: Project;
  index: number;
  title?: string;
  summary?: string;
}) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card group">
      <ProjectVisual project={project} />
      <div className="project-card-copy">
        <div className="project-meta">
          <span>
            <ProjectIcon visual={project.visual} size={14} /> {project.category}
          </span>
          <span>{project.year}</span>
        </div>
        <div className="project-title-line">
          <h3>{title}</h3>
          <span className="project-arrow">
            <ArrowUpRight size={22} />
          </span>
        </div>
        <p>{summary}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <span className="project-index">0{index + 1}</span>
        </div>
      </div>
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  to,
  link,
}: {
  eyebrow: string;
  title: string;
  to?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {to && (
        <Link className="text-link" to={to}>
          {link} <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}

function CurrentList() {
  return (
    <div className="current-list">
      {currentProjects.map((project) => (
        <article className="current-row" key={project.title}>
          <span className="current-number">{project.number}</span>
          <div className="current-icon">
            {project.icon === "satellite" ? (
              <Satellite strokeWidth={1.4} size={25} />
            ) : (
              <Wrench strokeWidth={1.4} size={24} />
            )}
          </div>
          <div className="current-copy">
            <span className="eyebrow">{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <span className="status-label">
            <span className="live-dot" /> In progress
          </span>
        </article>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="hero-intro">I’m Ray Sarabu!</p>
          <h1>
            What I’ve been
            <br />
            <span>working on.</span>
          </h1>
          <p className="hero-description">
            I’m an ECE and Robotics student at Carnegie Mellon. Take a look
            around for photos, demos, and details about how each of my projects
            came together.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="button-primary">
              View my projects <ArrowUpRight size={18} />
            </Link>
            <ContactLinks />
          </div>
          <div className="hero-meta">
            <div className="hero-location">
              <MapPin size={12} aria-hidden="true" /> Pittsburgh, PA{" "}
              <span className="location-divider">/</span> Class of 2027
            </div>
            <span className="availability">
              <span className="live-dot" /> Open to work
            </span>
          </div>
        </div>
      </section>
      <div className="hero-baseline">
        <a
          href="#selected-work"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("selected-work")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          See my work <ArrowDown size={14} />
        </a>
      </div>
      <section id="selected-work" className="page-section">
        <SectionHeading eyebrow="01 / PROJECTS" title="In progress" />
        <CurrentList />
      </section>
      <section className="home-previous-projects">
        <SectionHeading
          eyebrow="PREVIOUS PROJECTS"
          title="A couple of past projects"
          to="/projects"
          link="All projects"
        />
        <div className="project-grid">
          {projects
            .filter((p) =>
              ["knee-exoskeleton", "electric-vehicles"].includes(p.slug),
            )
            .map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                title={project.visual === "ev" ? "Electric Trike" : project.name}
                summary={
                  project.visual === "ev"
                    ? "An enclosed electric trike I designed and built, from the frame and drivetrain to the electronics."
                    : project.summary
                }
              />
            ))}
        </div>
      </section>
      <section className="page-section">
        <SectionHeading
          eyebrow="02 / EXPERIENCE"
          title="Where I’ve worked"
          to="/experience"
          link="Experience details"
        />
        <div className="experience-preview">
          {experience.map((entry) => (
            <Link
              to="/experience"
              className="experience-preview-row"
              key={entry.organization}
            >
              <span className="organization-mark" aria-label={entry.organization}>
                <OrganizationIcon shortName={entry.shortName} />
              </span>
              <div>
                <h3>{entry.organization}</h3>
                <p>{entry.role}</p>
              </div>
              <span className="experience-date">{entry.dates}</span>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>
      <section className="home-about">
        <img
          src={asset("images/ray-and-dog.jpg")}
          alt="Ray outdoors with his dog"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">03 / ABOUT ME</p>
          <h2>Get to know me</h2>
          <p>A little about my background and what I’m into outside of work.</p>
          <Link to="/about" className="text-link">
            Learn more <ArrowUpRight size={17} />
          </Link>
        </div>
        <ArrowDownRight className="about-accent" size={60} strokeWidth={1} />
      </section>
    </>
  );
}

function Projects() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">RESEARCH · COURSEWORK · PERSONAL BUILDS</p>
        <h1>
          Projects<span>.</span>
        </h1>
        <p>
          These are projects I’ve worked on through research, classes, and on my
          own. Each page covers the build and some of the engineering behind it.
        </p>
      </section>
      <section
        className="in-progress-section"
        aria-labelledby="in-progress-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT I’M WORKING ON NOW</p>
            <h2 id="in-progress-heading">In progress</h2>
          </div>
        </div>
        <CurrentList />
      </section>
      <section
        className="past-projects"
        aria-labelledby="past-projects-heading"
      >
        <div className="section-heading">
          <div>
            <h2 id="past-projects-heading">Previous projects</h2>
          </div>
          <span className="section-aside">2023 to 2026</span>
        </div>
        <div className="project-grid project-grid-index">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}

function Experience() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">INDUSTRY + RESEARCH</p>
        <h1>
          Experience<span>.</span>
        </h1>
        <p>
          I’ve worked on vehicle sensor systems at General Motors and wearable
          robotics in CMU’s MetaMobility Lab.
        </p>
      </section>
      <div className="experience-list">
        {experience.map((entry) => (
          <article className="experience-entry" key={entry.organization}>
            <div className="experience-identity">
              <span className="organization-mark" aria-label={entry.organization}>
                <OrganizationIcon shortName={entry.shortName} />
              </span>
              <p className="eyebrow">{entry.category}</p>
              <h2>{entry.organization}</h2>
              <p className="experience-role">{entry.role}</p>
              <p className="experience-date">{entry.dates}</p>
              {entry.project && (
                <Link
                  to={`/projects/${entry.project.slug}`}
                  className="text-link"
                >
                  {entry.project.label} <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
            <div className="experience-work">
              <p className="experience-summary">{entry.summary}</p>
              {entry.contributions.map((item) => (
                <section key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </section>
              ))}
              <div className="project-tags">
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="next-section-link">
        <p>You can find more of my work in Projects.</p>
        <Link to="/projects" className="text-link">
          Explore projects <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}

function About() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <>
      <section className="page-intro about-intro">
        <p className="eyebrow">RAY SARABU</p>
        <h1>
          About me<span>.</span>
        </h1>
      </section>
      <section className="about-layout">
        <div className="portrait-wrap">
          <img
            src={asset("images/ray-and-dog.jpg")}
            alt="Ray Sarabu with his dog outside in a garden"
          />
          <div className="portrait-caption">
            <span>ME AND MY DOG</span>
            <span>↗</span>
          </div>
        </div>
        <div className="about-story">
          <h2>Hey, I’m Ray.</h2>
          <p>
            I’m studying Electrical & Computer Engineering and Robotics at
            Carnegie Mellon, graduating in 2027.
          </p>
          <p>
            One of my favorite parts of working on a project is having a reason
            to learn something new. It might be a tool I haven’t used before or
            a concept I’ve only seen in class. I love being able to take an idea,
            work through the parts I don’t understand yet, and eventually see it
            come to life.
          </p>
          <p>
            That’s a big part of why I’m interested in robotics. I want to use
            what I’m learning to build robots that do useful things in the real
            world. I’m looking for a team where I can contribute and learn
            from people who are doing that work.
          </p>
          <a
            href={asset("resume.pdf")}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            View my résumé <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="off-duty" aria-labelledby="hobbies-heading">
        <div className="section-heading">
          <div>
            <h2 id="hobbies-heading">Outside of engineering</h2>
          </div>
        </div>
        <ul className="hobby-list" aria-label="My interests">
          <li>
            <Music2 size={22} aria-hidden="true" />
            <span>Dance</span>
          </li>
          <li>
            <Volleyball size={22} aria-hidden="true" />
            <span>Volleyball</span>
          </li>
          <li>
            <Dumbbell size={22} aria-hidden="true" />
            <span>Lifting</span>
          </li>
          <li>
            <CircleDot size={22} aria-hidden="true" />
            <span>Pickleball</span>
          </li>
          <li>
            <CookingPot size={22} aria-hidden="true" />
            <span>Cooking</span>
          </li>
          <li>
            <Users size={22} aria-hidden="true" />
            <span>Phi Delta Theta Fraternity</span>
          </li>
        </ul>
      </section>
      <section className="contact-section">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h2>Get in touch</h2>
          <p>
            I’m open to robotics internships and other opportunities to work
            on a team. If you think I could be a good fit, I’d love to hear from you.
          </p>
        </div>
        <div className="contact-details">
          <div className="email-row">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              onClick={copy}
              aria-label={copied ? "Email copied" : "Copy email address"}
            >
              {copied ? <Check size={19} /> : <Copy size={19} />}
            </button>
          </div>
          <span className="copy-status" role="status">
            {copied ? "Email copied to clipboard." : ""}
          </span>
          <ContactLinks labels showEmail={false} />
        </div>
      </section>
    </>
  );
}

function TrikeMedia() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="trike-media">
      <h2>Building the trike</h2>
      <p>
        I documented the trike build on YouTube. These stills show the CAD model
        and drivetrain, and the video shows the finished prototype driving.
      </p>
      <div className="build-gallery">
        <figure>
          <img
            src={asset("images/trike-cad.jpg")}
            alt="The trike design in Autodesk Inventor, captured from the original build video"
            loading="lazy"
          />
          <figcaption>The frame design in Autodesk Inventor.</figcaption>
        </figure>
        <figure>
          <img
            src={asset("images/trike-drivetrain.jpg")}
            alt="Rear-wheel drivetrain and electronics during a trike bench test"
            loading="lazy"
          />
          <figcaption>
            A bench test of the drivetrain and electronics.
          </figcaption>
        </figure>
      </div>
      <div className="video-embed">
        {playing ? (
          <iframe
            title="Electric Reverse Trike Prototype Complete: Testing Montage by Ray’s Builds"
            src="https://www.youtube-nocookie.com/embed/Dt7nSeGx84Q?autoplay=1"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button className="video-launch" onClick={() => setPlaying(true)}>
            <Play size={32} strokeWidth={1.5} />
            <span>Watch the finished trike</span>
            <small>61 seconds · Ray’s Builds</small>
          </button>
        )}
      </div>
      <a
        className="text-link"
        href="https://www.youtube.com/watch?v=Dt7nSeGx84Q"
        target="_blank"
        rel="noreferrer"
      >
        <LinkIcon url="https://www.youtube.com" /> Open video on YouTube{" "}
        <ArrowUpRight size={15} />
      </a>
    </section>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="project-detail">
      <Link to="/projects" className="back-link">
        <ArrowLeft size={16} /> All projects
      </Link>
      <header className="detail-header">
        <p className="eyebrow">
          {project.category} {project.year && <span>/ {project.year}</span>}
        </p>
        <h1>
          {project.name}
          <span>.</span>
        </h1>
        <p>{project.summary}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </header>
      {project.demo ? (
        <ProjectDemo project={project} />
      ) : project.photos ? (
        <ProjectGallery key={project.slug} project={project} />
      ) : project.visual === "arm" ? (
        <div className="detail-arm">
          <ArmDemo />
          <div>
            <p className="eyebrow">INTERACTIVE DEMO</p>
            <h2>Try moving the arm</h2>
            <p>
              Choose two, three, or four links, then click a target. You can
              add blocks and drag them around to change the route.
            </p>
            <small>
              The class project was a working two-link robot. I was curious
              about how it would behave with more links, so I expanded the
              simulation to three and four links and added movable obstacles.
            </small>
          </div>
        </div>
      ) : (
        <ProjectVisual project={project} large />
      )}
      <div className="detail-body">
        <aside>
          <p className="eyebrow">PROJECT CONTEXT</p>
          <p>{project.context}</p>
          {project.facts.map((fact) => (
            <div className="project-fact" key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
          {project.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              <LinkIcon url={link.url} /> {link.label}{" "}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </aside>
        <div className="detail-story">
          <section>
            <h2>About the project</h2>
            <p>{project.overview}</p>
          </section>
          {project.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          {project.visual === "ev" && <TrikeMedia />}
          {project.visual === "exo" && (
            <section className="electronics-gallery">
              <h2>A closer look at the PCBs</h2>
              <div className="pcb-grid">
                <figure>
                  <div className="pcb-image-frame">
                    <img
                      src={asset("images/knee-controller-fusion.png")}
                      alt="Fusion render of the custom knee control PCB with Teensy 4.1, buck converter, CAN interfaces, and power connectors"
                      loading="lazy"
                    />
                  </div>
                  <figcaption>
                    <strong>Knee control board</strong>
                    <span>Fusion render of a later design revision.</span>
                    <a
                      href={asset("images/knee-controller-fusion.png")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open render <ArrowUpRight size={14} />
                    </a>
                  </figcaption>
                </figure>
                <figure>
                  <div className="pcb-image-frame shank-image-frame">
                    <img
                      src={asset("images/knee-shank-layout.png")}
                      alt="PCB layout of the ICM-20948 shank sensor board with regulator, level shifting, and SPI connections"
                      loading="lazy"
                    />
                  </div>
                  <figcaption>
                    <strong>Shank sensor board</strong>
                    <span>
                      ICM-20948 sensor and SPI connection to the controller.
                    </span>
                    <a
                      href={asset("images/knee-shank-layout.png")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open layout <ArrowUpRight size={14} />
                    </a>
                  </figcaption>
                </figure>
              </div>
            </section>
          )}
          {project.demo && project.visual === "pong" && (
            <section className="supporting-diagram">
              <h2>The ball state machine</h2>
              <p>
                This simplified diagram shows the ball’s serving and movement
                states.
              </p>
              <TechnicalDiagram kind="pong" />
            </section>
          )}
          {project.demo && project.visual === "balance" && (
            <section className="supporting-diagram balance-diagram">
              <h2>The feedback loop</h2>
              <p>
                The controller uses an estimate of the robot’s tilt to adjust
                the wheel motors.
              </p>
              <TechnicalDiagram kind="balance" />
            </section>
          )}
          {!project.demo && !project.photos && (
            <div className="detail-pending">
              <span className="eyebrow">COMING SOON</span>
              <p>
                {project.visual === "ev"
                  ? "I’ll add drift cart photos and build details here."
                  : project.visual === "exo"
                    ? "I’ll add photos of the exoskeleton here."
                    : "I’ll add footage of the original arm project here."}
              </p>
            </div>
          )}
        </div>
      </div>
      <Link to={`/projects/${next.slug}`} className="next-project">
        <div>
          <p className="eyebrow">NEXT PROJECT</p>
          <h2>{next.name}</h2>
        </div>
        <ArrowRight size={30} strokeWidth={1.5} />
      </Link>
    </article>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>This page doesn’t exist.</h1>
      <Link to="/projects" className="button-primary">
        Explore projects <ArrowRight size={18} />
      </Link>
    </section>
  );
}

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const project = projects.find((p) => pathname === `/projects/${p.slug}`);
    const title =
      project?.name ||
      (
        {
          "/": "Robotics & Engineering",
          "/projects": "Projects",
          "/experience": "Experience",
          "/about": "About",
        } as Record<string, string>
      )[pathname] ||
      "Page not found";
    document.title = `${title} | Ray Sarabu`;
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <div id="top" />
      <RouteEffects />
      <Header />
      <main id="main" className="site-main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route
            path="/current"
            element={<Navigate to="/projects" replace />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/projects/memo-exoskeleton"
            element={<Navigate to="/projects/knee-exoskeleton" replace />}
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
