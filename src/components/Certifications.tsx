"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { certifications } from "@/data";

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div ref={ref}>
      {/* Fixed-size cards, wraps naturally — same footprint on every device */}
      <div className="flex overflow-x-auto sm:flex-wrap sm:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 pb-2 sm:pb-0 gap-5 justify-start">
        {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: "easeOut" as const,
              }}
              className="relative w-64 flex-shrink-0 snap-start"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setFlipped(cert.id)}
              onMouseLeave={() => setFlipped(null)}
            >
              {/* Card flip container */}
              <motion.div
                animate={{ rotateY: flipped === cert.id ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-64"
              >
                {/* ── FRONT ── */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm flex flex-col"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Certificate image */}
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
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Year badge on image */}
                    <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-stone-700 shadow-sm">
                      {cert.date}
                    </span>
                  </div>

                  {/* Text content — fixed height, long text gets compacted */}
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

                {/* ── BACK ── */}
                <div
                  className="absolute inset-0 bg-stone-900 rounded-2xl overflow-hidden shadow-xl flex flex-col"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Full certificate image */}
                  {cert.image && (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  )}
                  {/* Overlay with info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1 line-clamp-1">
                      {cert.date} · {cert.issuer}
                    </p>
                    <h3 className="font-serif text-lg font-medium text-white leading-snug line-clamp-2">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
        ))}
      </div>
    </div>
  );
}