"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A slim glass track fixed to the right edge of the viewport. Fills
 * top-down as the page is scrolled, using the same frosted-glass
 * language as the navbar.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:block"
      aria-hidden="true"
    >
      <div
        className="relative w-1.5 h-36 md:h-44 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 overflow-hidden"
        style={{
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.7), 0 4px 16px rgba(28,25,23,0.06)",
        }}
      >
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0 rounded-full bg-stone-900/70"
        />
      </div>
    </div>
  );
}
