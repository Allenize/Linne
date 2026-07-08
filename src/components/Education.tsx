"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { education } from "@/data";
import { GraduationCap } from "lucide-react";

const fanPositions = [
  { rotate: -8,  x: 0,  y: 0,  zIndex: 1 },
  { rotate:  0,  x: 52, y: 0,  zIndex: 2 },
  { rotate:  8,  x: 104, y: 0, zIndex: 3 },
];

function EducationCard({ edu, index, isInView }: {
  edu: typeof education[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.15, ease: "easeOut" as const }}
      className="relative flex gap-4 sm:gap-8 pl-10 sm:pl-16"
    >
      {/* Timeline node */}
      <div className="absolute left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-stone-200 text-stone-600 flex items-center justify-center shadow-sm">
        <GraduationCap size={14} className="sm:hidden" />
        <GraduationCap size={18} className="hidden sm:block" />
      </div>

      <div className="flex-1 min-w-0 relative">

        {/* Fanned images — hidden at rest, fan right on hover (desktop only) */}
        <AnimatePresence>
          {hovered && (
            <div className="absolute top-0 bottom-0 -right-48 hidden sm:flex items-center pointer-events-none" style={{ width: 180 }}>
              {edu.images.slice(0, 3).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20, rotate: 0 }}
                  animate={{ opacity: 1, x: fanPositions[i].x, rotate: fanPositions[i].rotate }}
                  exit={{ opacity: 0, x: -20, rotate: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: fanPositions[i].zIndex, position: 'absolute', left: 0 }}
                  className="w-24 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
                >
                  <img
                    src={img}
                    alt={`${edu.institution} photo ${i + 1}`}
                    className="w-full h-full object-cover grayscale"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Pill card on top */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setHovered((prev) => !prev)}
          className="relative z-10 bg-white rounded-2xl p-4 sm:p-7 border border-stone-100 shadow-sm cursor-pointer sm:cursor-default"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="min-w-0">
              <h3 className="font-serif text-stone-900 text-base sm:text-xl leading-snug">{edu.degree}</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-0.5">{edu.institution}</p>
            </div>
            <span className="self-start inline-flex items-center px-2.5 py-1 text-xs text-stone-400 bg-stone-50 border border-stone-100 rounded-full whitespace-nowrap flex-shrink-0">
              {edu.period}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">{edu.description}</p>
        </div>

        {/* Mobile: tap-to-reveal side-scrollable image strip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="sm:hidden overflow-hidden"
            >
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pt-3 pb-1 -mx-1 px-1 snap-x snap-mandatory">
                {edu.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-24 h-32 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-md snap-start"
                  >
                    <img
                      src={img}
                      alt={`${edu.institution} photo ${i + 1}`}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-16 sm:py-32 px-4 sm:px-6 bg-stone-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-stone-400">
            04 / Education
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" as const }}
          className="font-serif text-4xl md:text-5xl font-normal text-stone-900 mb-16"
        >
          Academic background.
        </motion.h2>

        <div className="relative max-w-4xl">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" as const }}
            style={{ originY: 0 }}
            className="absolute left-4 sm:left-6 top-6 bottom-6 w-px bg-stone-200"
          />

          <div className="space-y-10">
            {education.map((edu, i) => (
              <EducationCard key={edu.id} edu={edu} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 