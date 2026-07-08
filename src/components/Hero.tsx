"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Magnetic from "./Magnetic";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
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

// ─── Canvas: outlined name + flowing liquid profile fill ────────────────────
function NameCanvas({ hovered, onHoverChange }: { hovered: boolean; onHoverChange: (v: boolean) => void }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const profImg    = useRef<HTMLCanvasElement | null>(null);
  const built      = useRef(false);

  // Liquid fill progress: 0 = empty circle, 1 = fully revealed photo
  const fillLevel  = useRef(0);
  const animFrom   = useRef(0);
  const animTarget = useRef(0);
  const startTs    = useRef(0);

  const CW = 900;
  const CH = 330;
  const PROF = 180;
  const PROF_TOP = 0;
  const NAME_TOP = PROF + 18;
  const FONT = `400 112px 'Homenaje', Georgia, serif`;
  const DURATION = 600; // ms for a full fill or drain sweep

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  // Draws one frame: the profile circle is fully invisible until the photo
  // itself rises into view (no placeholder background, no border), and the
  // name's black fill "sips" out from the top down as it does, leaving a
  // thin outline behind.
  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, t: number, wavePhase: number) => {
    ctx.clearRect(0, 0, CW, CH);

    const left = (CW - PROF) / 2;
    const cx = left + PROF / 2;
    const cy = PROF_TOP + PROF / 2;
    const r  = PROF / 2;

    // ── Profile circle: flowing liquid fill ──────────────────────────────
    // No background tint here — the circle area stays completely invisible
    // until the photo itself rises into view; there's no visible "container."
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    if (profImg.current && t > 0.002) {
      // Wave amplitude peaks mid-transition and settles to ~0 at full/empty,
      // so the edge looks like liquid sloshing as it rises or drains,
      // and the photo ends up perfectly clean once fully filled.
      const amp = 5 * Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
      const baseY = PROF_TOP + PROF * (1 - t);

      ctx.beginPath();
      ctx.moveTo(left - 2, PROF_TOP + PROF + 2);
      for (let x = 0; x <= PROF; x += 4) {
        const waveY =
          baseY +
          Math.sin((x + wavePhase) * 0.09) * amp +
          Math.sin(x * 0.6 - wavePhase * 1.4) * amp * 0.5;
        ctx.lineTo(left + x, waveY);
      }
      ctx.lineTo(left + PROF + 2, PROF_TOP + PROF + 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(profImg.current, left, PROF_TOP);
    }
    ctx.restore();

    // ── Name: solid black when idle. As you hover, the black "sips" out of
    // the letters from the top down — same wavy liquid language as the
    // photo above it — leaving just the thin outline behind.
    ctx.font = FONT;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";

    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "#57534e";
    ctx.strokeText("John Allen Guerra", CW / 2, NAME_TOP);

    if (t < 0.999) {
      const NAME_H = 122; // generous glyph height, incl. descenders
      const nameAmp = 4 * Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
      const sipY = NAME_TOP + NAME_H * t;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, NAME_TOP + NAME_H + 4);
      for (let x = 0; x <= CW; x += 6) {
        const waveY =
          sipY +
          Math.sin((x + wavePhase) * 0.05) * nameAmp +
          Math.sin(x * 0.13 - wavePhase * 1.2) * nameAmp * 0.5;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(CW, NAME_TOP + NAME_H + 4);
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = "#1c1917";
      ctx.fillText("John Allen Guerra", CW / 2, NAME_TOP);
      ctx.restore();
    }
  }, []);

  const animate = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const elapsed = ts - startTs.current;
    const raw = Math.min(1, elapsed / DURATION);
    // easeOutCubic in both directions — fast off the start, smooth landing,
    // no hesitation when filling in or draining back out.
    const eased = easeOutCubic(raw);
    const value = animFrom.current + (animTarget.current - animFrom.current) * eased;
    fillLevel.current = value;

    drawFrame(ctx, value, elapsed * 0.18);

    if (raw < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [drawFrame]);

  const build = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || built.current) return;
    canvas.width = CW; canvas.height = CH;
    const ctx = canvas.getContext("2d")!;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/profile.jpg";
    img.onload = () => {
      const tmpOff = document.createElement("canvas");
      tmpOff.width = PROF; tmpOff.height = PROF;
      const tCtx = tmpOff.getContext("2d")!;
      tCtx.beginPath();
      tCtx.arc(PROF / 2, PROF / 2, PROF / 2, 0, Math.PI * 2);
      tCtx.clip();
      const sc = Math.max(PROF / img.width, PROF / img.height);
      tCtx.drawImage(img, (PROF - img.width * sc) / 2, (PROF - img.height * sc) / 2, img.width * sc, img.height * sc);

      // Grayscale, to match the site's monochrome aesthetic
      const imgPx = tCtx.getImageData(0, 0, PROF, PROF);
      for (let i = 0; i < imgPx.data.length; i += 4) {
        const luma = Math.round(0.299 * imgPx.data[i] + 0.587 * imgPx.data[i+1] + 0.114 * imgPx.data[i+2]);
        imgPx.data[i] = imgPx.data[i+1] = imgPx.data[i+2] = luma;
      }
      tCtx.putImageData(imgPx, 0, 0);
      profImg.current = tmpOff;
      built.current = true;
      drawFrame(ctx, fillLevel.current, 0);
    };
  }, [drawFrame]);

  useEffect(() => {
    document.fonts.ready.then(() => build());
  }, [build]);

  useEffect(() => {
    if (!built.current) return;
    cancelAnimationFrame(rafRef.current);

    animFrom.current = fillLevel.current;
    animTarget.current = hovered ? 1 : 0;
    startTs.current = performance.now();

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered, animate]);

  return (
    <canvas
      ref={canvasRef}
      width={CW}
      height={CH}
      onMouseMove={(e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scaleY = CH / rect.height;
        const canvasY = (e.clientY - rect.top) * scaleY;
        // Only the name text (below NAME_TOP) counts as "hovered" —
        // the circle/photo above it is not interactive.
        const overName = canvasY >= NAME_TOP;
        if (overName !== hovered) onHoverChange(overName);
      }}
      onMouseLeave={() => onHoverChange(false)}
      style={{ display: "block", width: "min(900px, 90vw)", height: "auto", cursor: hovered ? "pointer" : "default" }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [nameHovered, setNameHovered] = useState(false);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-stone-100 blur-3xl opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div {...fadeUp(0.1)} className="mb-2">
          <NameCanvas hovered={nameHovered} onHoverChange={setNameHovered} />
          <h1 className="sr-only">John Allen Guerra</h1>
        </motion.div>

        <motion.p
          {...fadeUp(0.4)}
          className="text-base md:text-lg text-stone-400 tracking-widest uppercase mb-8 font-light min-h-[1.75rem]"
        >
          <DynamicRole /> · IT Graduate
        </motion.p>

        <motion.p
          {...fadeUp(0.5)}
          className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-xl mb-12 font-light"
        >
          IT graduate specializing in Web and Game Development. I focus on
          building clean, functional, and thoughtful digital experiences.
        </motion.p>

        <motion.div {...fadeUp(0.6)} className="flex flex-col sm:flex-row items-center gap-3">
          <Magnetic strength={0.25}>
            <a
              href={`/resume.pdf?v=${RESUME_VERSION}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-7 py-3.5 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FileText size={15} /> View Résumé
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button
              suppressHydrationWarning
              onClick={() => scrollTo("#contact")}
              className="group flex items-center gap-2.5 px-7 py-3.5 bg-white/40 backdrop-blur-xl text-stone-700 rounded-full text-sm font-medium border border-white/60 hover:bg-white/70 hover:text-stone-900 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_20px_rgba(28,25,23,0.06)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_28px_rgba(28,25,23,0.1)]"
            >
              <Mail size={15} /> Get in Touch
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <motion.button
        suppressHydrationWarning
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => scrollTo("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 hover:text-stone-700 transition-colors group"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}