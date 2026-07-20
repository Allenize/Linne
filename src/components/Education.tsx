"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { education } from "@/data";
import type { Education as EducationEntry } from "@/types";

type Phase = "front" | "info";

function EduCard({ edu, index, isInView }: { edu: EducationEntry; index: number; isInView: boolean }) {
  const [phase, setPhase] = useState<Phase>("front");
  const backImage = edu.images[1] ?? edu.images[0];

  const togglePhase = () => {
    setPhase((p) => (p === "front" ? "info" : "front"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: "easeOut" as const }}
      onMouseEnter={() => setPhase("info")}
      onMouseLeave={() => setPhase("front")}
      onClick={togglePhase}
      className="relative w-64 h-64 flex-shrink-0 snap-start rounded-2xl sm:border sm:border-stone-100 overflow-hidden shadow-sm cursor-pointer select-none"
    >
      {/* Front face — period, degree, institution */}
      <div
        className={`absolute inset-0 bg-white flex flex-col transition-opacity duration-300 ${
          phase === "front" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-36 flex-shrink-0 overflow-hidden px-4 flex items-center justify-center">
          <img
            src={edu.images[0]}
            alt={`${edu.institution}`}
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/55" />
          <span className="relative font-serif text-white text-3xl leading-none tracking-tight text-center">
            {edu.period}
          </span>
        </div>
        <div className="px-5 py-4 flex-1 min-h-0 flex flex-col">
          <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug mb-1 line-clamp-2">
            {edu.degree}
          </h3>
          <p className="text-xs text-stone-400 line-clamp-2">{edu.institution}</p>
        </div>
      </div>

      {/* Back face — second photo, glassy blur behind the description */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          phase === "front" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img
          src={backImage}
          alt={`${edu.institution} photo`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Glassy/blurred overlay, only while showing info */}
        <div className="absolute inset-0 backdrop-blur-md bg-stone-900/45" />
        {/* Description text, only while showing info — tapping again clears it */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${
            phase === "info" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h3 className="font-serif text-white text-base leading-snug mb-1 line-clamp-2">
            {edu.degree}
          </h3>
          <p className="text-white/60 text-[11px] mb-2 line-clamp-1">{edu.institution}</p>
          <p className="text-white/85 text-xs leading-relaxed line-clamp-4">
            {edu.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* Fixed-size cards, wraps naturally — same footprint as Certifications on every device */}
      <div className="flex overflow-x-auto sm:flex-wrap sm:overflow-visible snap-x snap-mandatory scrollbar-hide overscroll-x-contain -mx-4 sm:mx-0 px-4 sm:px-0 pb-2 sm:pb-0 gap-5 justify-start">
        {education.map((edu, i) => (
          <EduCard key={edu.id} edu={edu} index={i} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}