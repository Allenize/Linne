"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Check, Expand, X } from "lucide-react";

function GitHubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

import { projects } from "@/data";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import type { Project } from "@/types";

/** Desktop screenshots only — mobile shots are intentionally excluded. */
function getGalleryImages(p: Project): string[] {
  return p.images && p.images.length > 0 ? p.images : [p.image];
}

/** Logo cover for a project. Instead of a cropped screenshot, this shows
 *  the app's actual logo mark centered on a soft neutral card — clicking
 *  it opens the full screenshot gallery. */
function ProjectImage({ logo, alt, count, onOpen }: { logo: string; alt: string; count: number; onOpen: () => void }) {
  return (
    <button
      suppressHydrationWarning
      onClick={onOpen}
      aria-label={`View all photos of ${alt}`}
      className="group relative flex items-center justify-center w-full h-full overflow-hidden cursor-zoom-in"
      style={{ background: "linear-gradient(145deg, #faf9f7, #efece6)" }}
    >
      <img
        src={logo}
        alt={`${alt} logo`}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      {count > 1 && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-stone-800 text-[11px] font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
          <Expand size={12} /> View all {count} photos
        </span>
      )}
    </button>
  );
}

/** Full-screen album lightbox — opened by clicking a project's image. */
function Lightbox({
  images,
  index,
  alt,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        suppressHydrationWarning
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close gallery"
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
      >
        <X size={18} />
      </button>

      <span className="absolute top-6 left-6 text-white/70 text-xs font-mono tabular-nums z-10">
        {alt} — {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>

      {images.length > 1 && (
        <>
          <button
            suppressHydrationWarning
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            suppressHydrationWarning
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={alt}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div
          className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-1.5 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              suppressHydrationWarning
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === index ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/** Type + counter badges floating over the image, with a scrim so they
 *  stay legible over any screenshot. */
function StageBadges({ type }: { type: string; current: number; total: number }) {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 sm:p-5">
        <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm text-white">
          {type}
        </span>
      </div>
    </>
  );
}

/** Description, features, stack and action buttons for the current
 *  project. `stacked` renders everything in a single column (used for
 *  the narrower portrait split-card); otherwise it's a two-column
 *  case-study layout. */
function InfoPanel({
  project,
  expanded,
  setExpanded,
  siblingGroup,
  onSelectSibling,
}: {
  project: Project;
  expanded: boolean;
  setExpanded: (fn: (v: boolean) => boolean) => void;
  siblingGroup: number[] | null;
  onSelectSibling: (id: number) => void;
}) {
  return (
    <div className="flex flex-col h-full justify-between gap-6">
      {/* Title, description, features */}
      <div>
        <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-3 leading-snug">
          {project.title}
        </h3>

        <p className={`text-sm text-stone-500 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
          {project.description}
        </p>
        <button
          suppressHydrationWarning
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-[11px] font-medium text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>

        <div className="mt-6">
          <p className="text-[10px] tracking-widest uppercase text-stone-300 mb-3">Key Features</p>
          <ul className="grid grid-cols-1 gap-x-4 gap-y-2">
            {project.features.slice(0, 6).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-stone-500">
                <Check size={11} className="text-stone-300 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech stack + actions */}
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-stone-300 mb-3">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[10px] font-medium text-stone-600 bg-white/60 backdrop-blur-sm border border-stone-200/70 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2.5 flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap">
            {project.githubUrl ? (
              <Magnetic strength={0.2}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-full text-xs font-medium hover:bg-stone-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <GitHubIcon size={12} /> GitHub
                </a>
              </Magnetic>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 text-stone-400 rounded-full text-xs font-medium cursor-not-allowed select-none">
                <GitHubIcon size={12} /> No Public Repo
              </span>
            )}
            {project.liveUrl && (
              <Magnetic strength={0.2}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white text-stone-700 rounded-full text-xs font-medium border border-stone-200 hover:border-stone-400 hover:text-stone-900 transition-all duration-200"
                >
                  <ExternalLink size={12} /> Live Demo
                </a>
              </Magnetic>
            )}
          </div>

          {siblingGroup && (
            <SiblingProjectDock group={siblingGroup} activeId={project.id} onSelect={onSelectSibling} />
          )}
        </div>
      </div>
    </div>
  );
}

// Swipe threshold in pixels
const SWIPE_THRESHOLD = 50;

/** Groups related mini-projects under a primary project. The primary
 *  keeps its full slot in the sidebar/mobile nav; the children are
 *  hidden from that nav and instead surface as small icon buttons in
 *  the bottom-right corner of the image, on the primary card and on
 *  each other's cards, so you can hop between the family of apps. */
const PROJECT_GROUPS: Record<number, number[]> = {
  4: [5, 9, 7], // Reshelve -> Sunflower, Plate, Barly
  1: [6],       // Artistic Vision -> Sejour
  3: [8],       // PLSP DMS -> OrgHub
};

const GROUPED_CHILD_IDS = new Set(Object.values(PROJECT_GROUPS).flat());

/** Returns the full sibling group (primary id first, then children) for
 *  a given project id, or null if that project isn't part of a group. */
function getProjectGroup(id: number): number[] | null {
  if (PROJECT_GROUPS[id]) return [id, ...PROJECT_GROUPS[id]];
  for (const [primary, kids] of Object.entries(PROJECT_GROUPS)) {
    if (kids.includes(id)) return [Number(primary), ...kids];
  }
  return null;
}

/** Small cluster of sibling-project icon buttons anchored to a corner
 *  of the image, letting you switch between a primary project and its
 *  related mini-apps without them cluttering the main nav. */
function SiblingProjectDock({
  group,
  activeId,
  onSelect,
}: {
  group: number[];
  activeId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {group.map((gid) => {
        const gp = projects.find((p) => p.id === gid);
        if (!gp) return null;
        const isActive = gid === activeId;
        return (
          <button
            suppressHydrationWarning
            key={gid}
            type="button"
            onClick={(e) => { e.stopPropagation(); onSelect(gid); }}
            aria-label={`View ${gp.title}`}
            aria-current={isActive}
            title={gp.title}
            className={`w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center p-1.5 ring-2 transition-all duration-300 ${
              isActive ? "ring-stone-900 scale-105" : "ring-transparent hover:ring-stone-300 hover:scale-105"
            }`}
          >
            {gp.navIcon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gp.navIcon}
                alt=""
                aria-hidden="true"
                className={`w-full h-full object-contain transition-all duration-300 ${
                  isActive ? "opacity-100 brightness-100" : "opacity-90 brightness-0 hover:opacity-100 hover:brightness-100"
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prev = () => { setDirection(-1); setExpanded(false); setLightboxOpen(false); setCurrent((c) => (c - 1 + projects.length) % projects.length); };
  const next = () => { setDirection(1);  setExpanded(false); setLightboxOpen(false); setCurrent((c) => (c + 1) % projects.length); };
  const goTo = (i: number) => { setDirection(i > current ? 1 : -1); setExpanded(false); setLightboxOpen(false); setCurrent(i); };

  const project = projects[current];
  const galleryImages = getGalleryImages(project);

  // Keyboard navigation: arrow keys browse the lightbox album when it's
  // open, otherwise they switch between projects.
  useEffect(() => {
    if (!isInView) return;
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % galleryImages.length);
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
        return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, current, lightboxOpen, galleryImages.length]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const slideVariants = {
    enter:  { opacity: 0 },
    center: { opacity: 1 },
    exit:   { opacity: 0 },
  };

  return (
    <section id="projects" className="py-24 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-stone-400">03 / Projects</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" as const }}
          className="mb-10 md:mb-14"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-stone-900 leading-tight">
            Selected work.
          </h2>
          <p className="text-sm text-stone-400 mt-2 max-w-md">
            A collection of platforms, apps, and tools I&apos;ve designed and built — spanning school, work, and personal projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-10">

          {/* Index nav — desktop only, sticky project list */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:flex flex-col gap-0.5 sticky top-28 self-start"
          >
            {projects
              .map((p, i) => ({ p, i }))
              .filter(({ p }) => !GROUPED_CHILD_IDS.has(p.id))
              .map(({ p, i }) => (
              <button
                suppressHydrationWarning
                key={p.id}
                onClick={() => goTo(i)}
                className="group relative flex items-center gap-3 py-2.5 text-left"
              >
                <span
                  className={`relative w-7 h-7 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                    i === current ? "scale-105" : ""
                  }`}
                >
                  {p.navIcon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.navIcon}
                      alt=""
                      aria-hidden="true"
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        i === current ? "opacity-100 brightness-100" : "opacity-90 brightness-0 group-hover:opacity-100 group-hover:brightness-100"
                      }`}
                    />
                  )}
                </span>
                <span className="flex flex-col">
                  <span
                    className={`text-sm leading-tight transition-colors duration-300 ${
                      i === current ? "text-stone-900 font-medium" : "text-stone-400 group-hover:text-stone-700"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span
                    className={`text-[10px] font-medium transition-all duration-300 overflow-hidden ${
                      i === current
                        ? "max-h-6 mt-1 px-2 py-0.5 rounded-full border border-stone-200/70 bg-white/60 backdrop-blur-sm text-stone-500 inline-block w-fit"
                        : "max-h-0 text-stone-300"
                    }`}
                  >
                    {p.type}
                  </span>
                </span>
              </button>
            ))}
          </motion.nav>

          {/* Mobile index — horizontal scroll chips */}
          <div className="flex lg:hidden gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
            {projects
              .map((p, i) => ({ p, i }))
              .filter(({ p }) => !GROUPED_CHILD_IDS.has(p.id))
              .map(({ p, i }) => (
              <button
                suppressHydrationWarning
                key={p.id}
                onClick={() => goTo(i)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                  i === current
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Main stage */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          >
            <div
              className="touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
            <TiltCard max={2.5} className="block">
              <div
                className="relative bg-white rounded-[2rem] border border-stone-100 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500"
                style={{
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  maskImage: "radial-gradient(white, black)",
                }}
              >
              {/* Split layout — image gallery left, info right, for every project */}
              <div className="grid md:grid-cols-2 md:h-[560px]">
                <div className="relative h-[380px] sm:h-[460px] md:h-full">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0 z-10"
                    >
                      <ProjectImage
                        logo={galleryImages[0]}
                        alt={project.title}
                        count={galleryImages.length}
                        onOpen={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <StageBadges type={project.type} current={current + 1} total={projects.length} />
                </div>

                <div className="border-t md:border-t-0 md:border-l border-stone-100 md:h-full md:overflow-y-auto">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="h-full p-6 sm:p-8 lg:p-10"
                    >
                      <InfoPanel
                        project={project}
                        expanded={expanded}
                        setExpanded={setExpanded}
                        siblingGroup={getProjectGroup(project.id)}
                        onSelectSibling={(id) => {
                          const idx = projects.findIndex((p) => p.id === id);
                          if (idx !== -1) goTo(idx);
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              </div>
            </TiltCard>
            </div>
          </motion.div>
        </div>

      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={galleryImages}
            index={lightboxIndex}
            alt={project.title}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
            onNext={() => setLightboxIndex((i) => (i + 1) % galleryImages.length)}
            onSelect={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
} 