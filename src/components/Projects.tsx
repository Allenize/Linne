"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Monitor, Smartphone, Tablet, ChevronLeft, ChevronRight, Check } from "lucide-react";

function GitHubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
import { projects } from "@/data";

function DeviceShowcase({ src, alt, mobileSrc, images, mobileImages, landscapeMobile, tabletMobile }: {
  src: string;
  alt: string;
  mobileSrc?: string;
  images?: string[];
  mobileImages?: string[];
  landscapeMobile?: boolean;
  tabletMobile?: boolean;
}) {
  const desktopSlides = images && images.length > 1 ? images : null;
  const mobileSlides = mobileImages && mobileImages.length > 1 ? mobileImages : null;
  const [dIdx, setDIdx] = useState(0);
  const [mIdx, setMIdx] = useState(0);

  useEffect(() => {
    if (!desktopSlides) return;
    const t = setInterval(() => setDIdx(i => (i + 1) % desktopSlides.length), 2500);
    return () => clearInterval(t);
  }, [desktopSlides]);

  useEffect(() => {
    if (!mobileSlides) return;
    const t = setInterval(() => setMIdx(i => (i + 1) % mobileSlides.length), 3000);
    return () => clearInterval(t);
  }, [mobileSlides]);

  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const currentDesktop = desktopSlides ? desktopSlides[dIdx] : src;
  const currentMobile = mobileSlides ? mobileSlides[mIdx] : (mobileSrc ?? src);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end select-none gap-2 pb-3">
      <div className="relative flex-1 w-full flex items-end justify-center overflow-visible min-h-0">
        <div
          className="relative flex items-end gap-0 flex-shrink-0 origin-bottom"
          style={{
            transform: "scale(clamp(0.35, min(1, (100vw - 32px) / 480px), 1))",
            transformOrigin: "bottom center",
          }}
        >
          {/* Phone / Tablet mockup */}
          {tabletMobile ? (
            /* Tablet mockup */
            <div className="relative z-20 w-[130px] mb-[20px] mr-[-50px]">
              <div
                className="relative shadow-[0_28px_56px_rgba(0,0,0,0.45)]"
                style={{
                  borderRadius: "14px",
                  padding: "6px",
                  background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                  border: "1px solid #3d3d3d",
                }}
              >
                <div className="absolute -left-[3px] top-[30px] w-[3px] h-[20px] rounded-l-full bg-[#3a3a3a]" />
                <div className="absolute -left-[3px] top-[58px] w-[3px] h-[30px] rounded-l-full bg-[#3a3a3a]" />
                <div className="absolute -right-[3px] top-[40px] w-[3px] h-[36px] rounded-r-full bg-[#3a3a3a]" />
                <div className="relative bg-black overflow-hidden" style={{ borderRadius: "10px" }}>
                  <div className="absolute top-[5px] left-1/2 -translate-x-1/2 z-10 w-[5px] h-[5px] rounded-full bg-[#1a1a1a]" />
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", borderRadius: "10px" }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={mIdx}
                        src={currentMobile}
                        alt={alt}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ) : landscapeMobile ? (
            <div className="relative z-20 self-center" style={{ width: "210px", marginRight: "-120px", marginBottom: "18px" }}>
              <div
                className="relative shadow-[0_28px_56px_rgba(0,0,0,0.45)]"
                style={{
                  borderRadius: "13px",
                  padding: "5px",
                  background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                  border: "1px solid #3d3d3d",
                }}
              >
                <div className="absolute -top-[3px] left-[48px] h-[3px] w-[16px] rounded-t-full bg-[#3a3a3a]" />
                <div className="absolute -top-[3px] left-[72px] h-[3px] w-[26px] rounded-t-full bg-[#3a3a3a]" />
                <div className="absolute -bottom-[3px] left-[60px] h-[3px] w-[32px] rounded-b-full bg-[#3a3a3a]" />
                <div className="relative bg-black overflow-hidden" style={{ borderRadius: "9px" }}>
                  <div className="absolute left-[6px] top-1/2 -translate-y-1/2 z-10 h-[26px] w-[6px] rounded-full bg-black" />
                  <div className="relative overflow-hidden" style={{ aspectRatio: "19.5/9", borderRadius: "9px" }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={mIdx}
                        src={currentMobile}
                        alt={alt}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
          <div className="relative z-20 w-[112px] mb-[20px] mr-[-50px]">
            <div
              className="relative shadow-[0_28px_56px_rgba(0,0,0,0.45)]"
              style={{
                borderRadius: "13px",
                padding: "5px",
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                border: "1px solid #3d3d3d",
              }}
            >
              <div className="absolute -left-[3px] top-[48px] w-[3px] h-[16px] rounded-l-full bg-[#3a3a3a]" />
              <div className="absolute -left-[3px] top-[72px] w-[3px] h-[26px] rounded-l-full bg-[#3a3a3a]" />
              <div className="absolute -right-[3px] top-[60px] w-[3px] h-[32px] rounded-r-full bg-[#3a3a3a]" />
              <div className="relative bg-black overflow-hidden" style={{ borderRadius: "9px" }}>
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-10 w-[26px] h-[6px] rounded-full bg-black" />
                <div className="relative overflow-hidden" style={{ aspectRatio: "9/19.5", borderRadius: "9px" }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={mIdx}
                      src={currentMobile}
                      alt={alt}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Laptop */}
          <div className="relative w-[370px] flex-shrink-0">
            <div className="relative bg-[#1a1a1a] rounded-t-[14px] rounded-b-[2px] pt-[11px] px-[11px] pb-[4px] shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
              <div className="absolute top-[4px] left-1/2 -translate-x-1/2">
                <div className="w-[5px] h-[5px] rounded-full bg-[#3a3a3a]" />
              </div>
              <div className="relative overflow-hidden rounded-[4px] bg-black aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={dIdx}
                    src={currentDesktop}
                    alt={alt}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.06] pointer-events-none" />
              </div>
            </div>
            <div className="h-[2px] bg-[#2a2a2a]" />
            <div
              className="relative h-[12px] rounded-b-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              style={{ background: "linear-gradient(to bottom, #c8c8c8, #b0b0b0)" }}
            >
              <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[40px] h-[4px] rounded-full bg-black/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="flex items-center gap-1 text-[9px] text-stone-400 font-medium">
          <Monitor size={9} /> Desktop
        </span>
        <span className="flex items-center gap-1 text-[9px] text-stone-400 font-medium">
          {tabletMobile ? <Tablet size={9} /> : <Smartphone size={9} />} {tabletMobile ? "Tablet" : "Mobile"}
        </span>
      </div>
    </div>
  );
}

function MobileOnlyShowcase({ src, alt, src2, images }: { src: string; alt: string; src2?: string; images?: string[] }) {
  const slides = images && images.length > 1 ? images : null;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (!slides) return;
    const t = setInterval(() => {
      setDir(1);
      setIdx(i => (i + 1) % slides.length);
    }, 2500);
    return () => clearInterval(t);
  }, [slides]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const Phone = ({ image, small }: { image: string; small?: boolean }) => (
    <div
      className="relative flex-shrink-0"
      style={{ width: src2 ? (small ? "clamp(65px, 22vw, 95px)" : "clamp(75px, 26vw, 110px)") : "clamp(80px, 30vw, 115px)" }}
    >
      <div
        className="relative shadow-[0_24px_48px_rgba(0,0,0,0.38)]"
        style={{
          borderRadius: `calc(${src2 ? (small ? "clamp(65px,22vw,95px)" : "clamp(75px,26vw,110px)") : "clamp(80px,30vw,115px)"} * 0.12)`,
          padding: `calc(${src2 ? (small ? "clamp(65px,22vw,95px)" : "clamp(75px,26vw,110px)") : "clamp(80px,30vw,115px)"} * 0.046)`,
          background: "linear-gradient(145deg, #3a2f3f, #221b28)",
          border: "1.5px solid #4d4055",
        }}
      >
        <div className="absolute -left-[3px] top-[14%] w-[3px] h-[8%] rounded-l-full" style={{ background: "linear-gradient(to right, #3a2f3f, #4a3f50)" }} />
        <div className="absolute -left-[3px] top-[26%] w-[3px] h-[14%] rounded-l-full" style={{ background: "linear-gradient(to right, #3a2f3f, #4a3f50)" }} />
        <div className="absolute -right-[3px] top-[20%] w-[3px] h-[18%] rounded-r-full" style={{ background: "linear-gradient(to left, #3a2f3f, #4a3f50)" }} />
        <div
          className="relative bg-black overflow-hidden"
          style={{ borderRadius: `calc(${src2 ? (small ? "clamp(65px,22vw,95px)" : "clamp(75px,26vw,110px)") : "clamp(80px,30vw,115px)"} * 0.08)` }}
        >
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-10 w-[30%] h-[6px] rounded-full bg-black" />
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "9/19.5",
              borderRadius: `calc(${src2 ? (small ? "clamp(65px,22vw,95px)" : "clamp(75px,26vw,110px)") : "clamp(80px,30vw,115px)"} * 0.08)`,
            }}
          >
            {slides ? (
              <AnimatePresence custom={dir} mode="wait">
                <motion.img
                  key={idx}
                  src={slides[idx]}
                  alt={`${alt} screen ${idx + 1}`}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
            ) : (
              <img src={image} alt={alt} className="w-full h-full object-contain" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end select-none gap-3 pb-3">
      <div className="relative flex-1 w-full flex items-end justify-center min-h-0 gap-3">
        <Phone image={src} />
        {src2 && <Phone image={src2} small />}
      </div>
      <div className="flex items-center gap-1 text-[9px] text-stone-400 font-medium flex-shrink-0">
        <Smartphone size={9} /> Mobile
      </div>
    </div>
  );
}

function DesktopOnlyShowcase({ src, alt, images }: { src: string; alt: string; images?: string[] }) {
  const slides = images && images.length > 1 ? images : null;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!slides) return;
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 2500);
    return () => clearInterval(t);
  }, [slides]);

  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const current = slides ? slides[idx] : src;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end select-none gap-2 pb-3">
      <div className="relative flex-1 w-full flex items-end justify-center overflow-visible min-h-0">
        <div
          className="relative flex-shrink-0 origin-bottom"
          style={{
            transform: "scale(clamp(0.4, min(1, (100vw - 32px) / 385px), 1))",
            transformOrigin: "bottom center",
          }}
        >
          <div className="relative w-[370px]">
            <div className="relative bg-[#1a1a1a] rounded-t-[14px] rounded-b-[2px] pt-[11px] px-[11px] pb-[4px] shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
              <div className="absolute top-[4px] left-1/2 -translate-x-1/2">
                <div className="w-[5px] h-[5px] rounded-full bg-[#3a3a3a]" />
              </div>
              <div className="relative overflow-hidden rounded-[4px] bg-black aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={idx}
                    src={current}
                    alt={alt}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.06] pointer-events-none" />
              </div>
            </div>
            <div className="h-[2px] bg-[#2a2a2a]" />
            <div
              className="relative h-[12px] rounded-b-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              style={{ background: "linear-gradient(to bottom, #c8c8c8, #b0b0b0)" }}
            >
              <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[40px] h-[4px] rounded-full bg-black/10" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[9px] text-stone-400 font-medium flex-shrink-0">
        <Monitor size={9} /> Desktop
      </div>
    </div>
  );
}

const mobileOnlyProjects = ["Reshelve", "Sunflower", "Plate"];
const desktopOnlyProjects = ["PLSP DMS"];
const landscapeProjects = ["Adarna"];
const tabletProjects = ["Sejour"];

// Swipe threshold in pixels
const SWIPE_THRESHOLD = 50;

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prev = () => { setDirection(-1); setExpanded(false); setCurrent((c) => (c - 1 + projects.length) % projects.length); };
  const next = () => { setDirection(1);  setExpanded(false); setCurrent((c) => (c + 1) % projects.length); };
  const goTo = (i: number) => { setDirection(i > current ? 1 : -1); setExpanded(false); setCurrent(i); };

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

  const project = projects[current];

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
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
          className="flex items-end justify-between mb-8 md:mb-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-stone-900 leading-tight">
            Selected work.
          </h2>
          <span className="text-sm text-stone-400 hidden md:block tabular-nums">
            {current + 1} / {projects.length}
          </span>
        </motion.div>

        {/* Card — swipeable on touch devices */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Stack on mobile, side-by-side on lg+ */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] lg:h-[420px]">

            {/* Device showcase */}
            <div className="relative bg-gradient-to-br from-stone-50 to-stone-100 h-[320px] sm:h-[360px] lg:h-full p-3 sm:p-6 lg:p-8 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04] overflow-hidden rounded-tl-3xl rounded-tr-3xl lg:rounded-tr-none lg:rounded-bl-3xl"
                style={{
                  backgroundImage: "radial-gradient(circle, #78716c 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 w-full h-full"
                >
                  {mobileOnlyProjects.includes(project.title)
                    ? <MobileOnlyShowcase src={project.image} alt={project.title} src2={project.mobileImage} images={project.images} />
                    : desktopOnlyProjects.includes(project.title)
                    ? <DesktopOnlyShowcase src={project.image} alt={project.title} images={project.images} />
                    : <DeviceShowcase src={project.image} alt={project.title} mobileSrc={project.mobileImage} images={project.images} mobileImages={project.mobileImages} landscapeMobile={landscapeProjects.includes(project.title)} tabletMobile={tabletProjects.includes(project.title)} />
                  }
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Info panel */}
            <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-stone-100 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col h-full p-5 sm:p-6 lg:p-8"
                >
                  {/* Top */}
                  <div className="flex-1 overflow-hidden flex flex-col">
                    {/* Number + type */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-stone-300 tabular-nums">
                        {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-stone-200 bg-stone-50 text-stone-600">
                        {project.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-stone-900 mb-2 leading-snug">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <div className="mb-4">
                      <p className={`text-sm text-stone-500 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
                        {project.description}
                      </p>
                      <button suppressHydrationWarning
                        onClick={() => setExpanded((v) => !v)}
                        className="mt-1 text-[11px] font-medium text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2"
                      >
                        {expanded ? "Show less" : "Show more"}
                      </button>
                    </div>

                    {/* Key features */}
                    <div className="mb-4">
                      <p className="text-[10px] tracking-widest uppercase text-stone-300 mb-2">Key Features</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
                        {project.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-stone-500">
                            <Check size={11} className="text-stone-300 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-[10px] font-medium text-stone-500 bg-stone-50 border border-stone-100 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex-shrink-0 pt-4 mt-4 border-t border-stone-50 flex items-center gap-2.5 flex-wrap">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-full text-xs font-medium hover:bg-stone-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                      >
                        <GitHubIcon size={12} /> GitHub
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 text-stone-400 rounded-full text-xs font-medium cursor-not-allowed select-none">
                        <GitHubIcon size={12} /> No Public Repo
                      </span>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-white text-stone-700 rounded-full text-xs font-medium border border-stone-200 hover:border-stone-400 hover:text-stone-900 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <ExternalLink size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between mt-5 md:mt-6"
        >
          {/* Dots */}
          <div className="flex items-center gap-2 flex-wrap">
            {projects.map((_, i) => (
              <button suppressHydrationWarning
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? "w-6 h-2 bg-stone-900" : "w-2 h-2 bg-stone-200 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>

          {/* Chevrons */}
          <div className="flex items-center gap-2">
            <button suppressHydrationWarning
              onClick={prev}
              className="w-9 h-9 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <ChevronLeft size={16} />
            </button>
            <button suppressHydrationWarning
              onClick={next}
              className="w-9 h-9 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}