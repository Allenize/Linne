"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { education } from "@/data";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeEdu = education.find((e) => e.id === activeId) ?? null;

  return (
    <div ref={ref} className="relative">
      {/* Fixed-size cards, wraps naturally — same footprint as Certifications on every device */}
      <div className="flex overflow-x-auto sm:flex-wrap sm:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 pb-2 sm:pb-0 gap-5 justify-start">
        {education.map((edu, i) => {
          const isActive = activeId === edu.id;
          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: "easeOut" as const }}
              onClick={() => setActiveId(isActive ? null : edu.id)}
              className="relative w-64 flex-shrink-0 snap-start"
            >
              <div
                className={`w-full h-64 bg-white rounded-2xl border overflow-hidden shadow-sm cursor-pointer select-none transition-all duration-300 flex flex-col ${
                  isActive ? "border-stone-300 shadow-md" : "border-stone-100"
                }`}
              >
                {/* Period banner — same footprint as a cert's image area */}
                <div className="relative h-36 flex-shrink-0 bg-stone-50 flex items-center justify-center overflow-hidden px-4">
                  <span className="font-serif text-stone-900 text-3xl leading-none tracking-tight text-center">
                    {edu.period}
                  </span>
                </div>

                {/* Text content — fixed height, long text gets compacted */}
                <div className="px-5 py-4 flex-1 min-h-0 flex flex-col">
                  <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug mb-1 line-clamp-2">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2">{edu.institution}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded details panel */}
      <AnimatePresence mode="wait">
        {activeEdu && (
          <motion.div
            key={activeEdu.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(28,25,23,0.06)] px-5 sm:px-7 py-5 sm:py-6">
              <h3 className="font-serif text-stone-900 text-base sm:text-lg mb-1">
                {activeEdu.degree}
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mb-4">{activeEdu.institution}</p>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">
                {activeEdu.description}
              </p>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 snap-x snap-mandatory">
                {activeEdu.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden border-2 border-white/80 shadow-md snap-start"
                  >
                    <img
                      src={img}
                      alt={`${activeEdu.institution} photo ${i + 1}`}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
