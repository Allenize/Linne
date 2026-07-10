"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import Magnetic from "./Magnetic";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const RESUME_VERSION = "3";

const ROLES = [
  "Web Developer", "Game Designer", "UI & UX Designer",
  "Full Stack Dev", "Creative Technologist", "Software Engineer",
];

function DynamicRole() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = ROLES[index];
    let t: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length)
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      else t = setTimeout(() => setTyping(false), 1800);
    } else {
      if (displayed.length > 0)
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      else { setIndex((i) => (i + 1) % ROLES.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, index]);

  return (
    <span className="inline-flex items-center gap-0.5">
      <span>{displayed}</span>
      <span className="inline-block w-0.5 h-4 bg-stone-400 animate-pulse ml-0.5" />
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-24 pb-16 sm:pt-32 md:pb-16 overflow-hidden"
    >
      {/* Technical grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-stone-100 blur-3xl opacity-60 pointer-events-none" />

      {/* ── Two columns, always side-by-side: info left, image + CTAs right ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-row items-start sm:items-center gap-5 sm:gap-10 md:gap-14">
        {/* ── LEFT: name, role, bio ── */}
        <div className="flex-1 min-w-0 text-left">
          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.1] sm:leading-[1.05] text-stone-900 mb-2 sm:mb-3"
          >
            John Allen A. Guerra
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-sm sm:text-base md:text-lg text-stone-500 uppercase tracking-widest mb-3 sm:mb-6 font-light min-h-[1.25rem] sm:min-h-[1.5rem]"
          >
            <DynamicRole /> · IT Graduate
          </motion.p>

          <motion.div
            {...fadeUp(0.5)}
            className="space-y-3 sm:space-y-4 text-stone-600 leading-relaxed text-sm sm:text-base md:text-lg text-left"
          >
            <p>
              I&apos;m an Information Technology graduate based in San Pablo,
              Laguna, Philippines, specializing in Web and Game Development. I
              care about clean architecture and thoughtful usability, and try
              to treat every project, big or small, with the same level of
              care.
            </p>
            <p>
              Right now I&apos;m focused on sharpening my craft, building
              full-stack projects and small games on my own time, and
              exploring new tools and frameworks that push me to write
              cleaner, more thoughtful code with every project I ship.
            </p>
            <p>
              I&apos;m completing my BSIT degree in 2026 and currently open
              to new opportunities where I can keep building software that
              makes a measurable difference for the people who rely on it.
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT: fixed-position portrait + CTAs, same on every device ── */}
        <div className="flex flex-col items-center shrink-0 w-28 sm:w-44 md:w-56 lg:w-64 mt-10 sm:mt-0">
          <motion.div {...fadeUp(0.3)} className="relative w-full aspect-[3/4] mb-3 sm:mb-6">
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xl">
              <img
                src="/profile.jpg"
                alt="John Allen A. Guerra"
                className="w-full h-full object-cover grayscale"
              />
              {/* Corner ticks, technical/blueprint accent */}
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 w-2.5 h-2.5 sm:w-4 sm:h-4 border-t-2 border-l-2 border-white/80" />
              <span className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-4 sm:h-4 border-t-2 border-r-2 border-white/80" />
              <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-2.5 h-2.5 sm:w-4 sm:h-4 border-b-2 border-l-2 border-white/80" />
              <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-2.5 h-2.5 sm:w-4 sm:h-4 border-b-2 border-r-2 border-white/80" />
            </div>
          </motion.div>

          {/* ── CTAs, directly under the image ── */}
          <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2.5 w-full">
            <Magnetic strength={0.25}>
              <a
                href={`/resume.pdf?v=${RESUME_VERSION}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-5 py-1.5 sm:py-2.5 bg-stone-900 text-white rounded-full text-[10px] sm:text-sm font-medium hover:bg-stone-700 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap w-full"
              >
                <FileText size={12} className="sm:w-[14px] sm:h-[14px]" /> Résumé
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-5 py-1.5 sm:py-2.5 bg-white/40 backdrop-blur-xl text-stone-700 rounded-full text-[10px] sm:text-sm font-medium border border-white/60 hover:bg-white/70 hover:text-stone-900 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_20px_rgba(28,25,23,0.06)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_28px_rgba(28,25,23,0.1)] whitespace-nowrap w-full"
              >
                <Mail size={12} className="sm:w-[14px] sm:h-[14px]" /> Contact
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
