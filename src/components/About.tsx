"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-16">
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
                I&apos;m John Allen A. Guerra, an Information Technology
                graduate majoring in Web and Game Development.
              </p>
              <p>
                I build web applications and interactive experiences, from
                full-stack platforms to game prototypes, with a strong
                foundation in modern web technologies, UI development, and
                software design.
              </p>
              <p>
                My work spans community platforms, management systems, mobile
                apps, and games. I bring that range to every project I take on.
              </p>
            </motion.div>
          </div>

          {/* Right: Stats + Goal */}
          <div className="space-y-6">
            {/* Career goals card */}
            <motion.div
              {...fadeUp(0.3)}
              className="p-8 rounded-2xl bg-stone-50 border border-stone-100"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">
                Career Goals
              </h3>
              <p className="text-stone-700 leading-relaxed">
                To grow as a web and game developer by taking on real
                technical challenges, building applications along the way,
                and delivering work that makes a measurable impact on the
                team and product.
              </p>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...fadeUp(0.35 + i * 0.05)}
                  className="p-5 rounded-xl border border-stone-100 bg-white"
                >
                  <div className="font-serif text-3xl text-stone-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}