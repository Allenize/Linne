"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { certifications } from "@/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [flipped, setFlipped] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-cert-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="certifications" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-stone-400">
            05 / Certifications
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" as const }}
          className="flex items-end justify-between mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-stone-900">
            Verified credentials.
          </h2>

          {/* Chevron controls — mobile only */}
          <div className="flex items-center gap-2 sm:hidden">
            <Magnetic strength={0.3}>
              <button
                suppressHydrationWarning
                onClick={() => scrollByCard(-1)}
                aria-label="Previous"
                className="w-9 h-9 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-white/70 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(28,25,23,0.06)]"
              >
                <ChevronLeft size={16} />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                suppressHydrationWarning
                onClick={() => scrollByCard(1)}
                aria-label="Next"
                className="w-9 h-9 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-white/70 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(28,25,23,0.06)]"
              >
                <ChevronRight size={16} />
              </button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Mobile: single-row horizontal scroll. sm+: grid */}
        <div
          ref={scrollRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scrollbar-hide"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              data-cert-card
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: "easeOut" as const,
              }}
              className="relative flex-shrink-0 w-[78%] sm:w-auto snap-start"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setFlipped(cert.id)}
              onMouseLeave={() => setFlipped(null)}
            >
              {/* Card flip container */}
              <motion.div
                animate={{ rotateY: flipped === cert.id ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full"
              >
                {/* ── FRONT ── */}
                <div
                  className="relative bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Certificate image */}
                  <div className="relative h-36 bg-stone-100 overflow-hidden">
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

                  {/* Text content */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug mb-1.5">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-stone-400">{cert.issuer}</p>

                    {cert.credentialId && (
                      <div className="mt-4 pt-4 border-t border-stone-50">
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
                    <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">
                      {cert.date} · {cert.issuer}
                    </p>
                    <h3 className="font-serif text-lg font-medium text-white leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}