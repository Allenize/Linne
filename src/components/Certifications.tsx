"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { certifications } from "@/data";
import type { Certification } from "@/types";

type Phase = "front" | "info" | "image";

function CertCard({ cert, index, isInView }: { cert: Certification; index: number; isInView: boolean }) {
  const [phase, setPhase] = useState<Phase>("front");
  const hasImage = Boolean(cert.image);

  const cyclePhase = () => {
    if (!hasImage) return;
    setPhase((p) => (p === "front" ? "info" : p === "info" ? "image" : "front"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: "easeOut" as const }}
      onMouseEnter={() => hasImage && setPhase("info")}
      onMouseLeave={() => hasImage && setPhase("front")}
      onClick={cyclePhase}
      className={`relative w-64 h-64 flex-shrink-0 snap-start rounded-2xl border border-stone-100 overflow-hidden shadow-sm select-none ${
        hasImage ? "cursor-pointer" : ""
      }`}
    >
      {/* Front face — thumbnail, title, issuer */}
      <div
        className={`absolute inset-0 bg-white flex flex-col transition-opacity duration-300 ${
          phase === "front" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-36 flex-shrink-0 bg-stone-100 overflow-hidden">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover grayscale"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-100">
              <span className="text-stone-300 text-xs">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-stone-700 shadow-sm">
            {cert.date}
          </span>
        </div>

        <div className="px-5 py-4 flex-1 min-h-0 flex flex-col">
          <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug mb-1 line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-xs text-stone-400 line-clamp-1">{cert.issuer}</p>

          {cert.credentialId && (
            <div className="mt-auto pt-3 border-t border-stone-50">
              <p className="text-[10px] font-mono text-stone-300 truncate">
                {cert.credentialId}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Back face — full photo, glassy blur behind the info */}
      {hasImage && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            phase === "front" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Glassy/blurred overlay, only while showing info */}
          <div
            className={`absolute inset-0 bg-stone-900/45 transition-opacity duration-300 ${
              phase === "info" ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Info text, only while showing info — tapping again clears it */}
          <div
            className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${
              phase === "info" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1 line-clamp-1">
              {cert.date} · {cert.issuer}
            </p>
            <h3 className="font-serif text-white text-base leading-snug mb-1 line-clamp-2">
              {cert.title}
            </h3>
            {cert.credentialId && (
              <p className="text-white/70 text-[10px] font-mono truncate">
                {cert.credentialId}
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {/* Fixed-size cards, wraps naturally — same footprint on every device */}
      <div className="flex overflow-x-auto sm:flex-wrap sm:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 pb-2 sm:pb-0 gap-5 justify-start">
        {certifications.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}