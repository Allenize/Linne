"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import TiltCard from "./TiltCard";
import Education from "./Education";
import Certifications from "./Certifications";
import Skills from "./Skills";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tab, setTab] = useState<"education" | "certifications">("education");

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  });

  const stats = [
    { value: "BSIT", label: "Degree Earned" },
    { value: "2026", label: "Year Graduated" },
    { value: "4+", label: "Certifications" },
    { value: "9+", label: "Projects Built" },
  ];

  return (
    <section id="about" className="pt-10 pb-20 sm:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-8 sm:mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-stone-400">
            01 / About
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Main text */}
          <div>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-serif text-4xl md:text-5xl font-normal text-stone-900 leading-tight mb-8"
            >
              Building technology that&nbsp;
              <span className="italic text-stone-400">makes a difference.</span>
            </motion.h2>

            <motion.div {...fadeUp(0.2)} className="space-y-5 text-stone-600 leading-relaxed">
              <p>
                My interest in tech didn&apos;t start with a five-year plan,
                it started with games. Growing up, I was endlessly curious
                about how the worlds I was playing in were actually built,
                and that curiosity slowly spread to every app and website I
                used, always wondering how it all worked underneath. That
                question is really what led me to pursue Information
                Technology.
              </p>
              <p>
                Outside of code, I&apos;ve always loved making things by
                hand. I&apos;ve been drawing and joining creative art
                contests since elementary school, and that same urge to
                build something out of nothing carries straight into my
                projects today. I also grew up playing online games and
                still do, not just for fun but for the logic behind them,
                the systems, the puzzles, the problem-solving that makes a
                good game, or a good piece of software, click.
              </p>
              <p>
                That mix of curiosity, a creative eye, and a love for
                working through logic is really what shapes how I approach
                web and game development today.
              </p>
            </motion.div>
          </div>

          {/* Right: Stats + Goal */}
          <div className="space-y-6">
            {/* Career goals card */}
            <TiltCard
              {...fadeUp(0.3)}
              max={5}
              className="p-8 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_24px_rgba(28,25,23,0.06)]"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">
                Career Goals
              </h3>
              <p className="text-stone-700 leading-relaxed">
                I&apos;m looking to start my career as a software or web
                developer, ideally somewhere I can keep learning while
                building things that are genuinely used, not just shipped.
                Long-term, I want to grow into a full-stack or game
                development role where I can take more ownership over how a
                product is designed, not just how it&apos;s built.
              </p>
            </TiltCard>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <TiltCard
                  key={stat.label}
                  {...fadeUp(0.35 + i * 0.05)}
                  max={6}
                  className="p-5 rounded-xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(28,25,23,0.05)]"
                >
                  <div className="font-serif text-3xl text-stone-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-400">{stat.label}</div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <motion.div {...fadeUp(0.4)} className="mt-24 sm:mt-32">
          <h3 className="font-serif text-3xl md:text-4xl font-normal text-stone-900 leading-tight mb-10 sm:mb-14">
            The tools of my trade.
          </h3>
          <Skills />
        </motion.div>

        {/* Education + Certifications — merged, switchable via tabs */}
        <motion.div {...fadeUp(0.4)} className="mt-24 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
            <h3 className="font-serif text-3xl md:text-4xl font-normal text-stone-900 leading-tight">
              {tab === "education" ? "Academic background." : "Verified credentials."}
            </h3>

            {/* Tab switcher */}
            <div className="inline-flex self-start sm:self-auto p-1 rounded-full bg-stone-100 border border-stone-200/70">
              <button
                suppressHydrationWarning
                onClick={() => setTab("education")}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  tab === "education"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                Education
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setTab("certifications")}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  tab === "certifications"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                Certifications
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "education" ? (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" as const }}
              >
                <Education />
              </motion.div>
            ) : (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" as const }}
              >
                <Certifications />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
} 