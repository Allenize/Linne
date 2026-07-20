"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, X, Layers, Palette, Sparkles, ShieldCheck, Image as ImageIcon, Rocket } from "lucide-react";

const GitHubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const socialLinks = [
  { icon: <GitHubIcon size={14} />, href: "https://github.com/Allenize", label: "GitHub" },
  { icon: <LinkedInIcon size={14} />, href: "https://www.linkedin.com/in/guerra-john-allen-a-0765743ba/", label: "LinkedIn" },
  { icon: <FacebookIcon size={14} />, href: "https://www.facebook.com/johnallen.guerra.20", label: "Facebook" },
];

const buildDetails = [
  {
    icon: <Layers size={16} />,
    heading: "Framework & Language",
    items: [
      "Next.js (App Router) for routing, layouts, and static/server rendering.",
      "TypeScript throughout for type safety across components and data.",
      "React function components with hooks (no class components).",
    ],
  },
  {
    icon: <Palette size={16} />,
    heading: "Styling & Design",
    items: [
      "Tailwind CSS for utility-first styling and responsive breakpoints.",
      "A soft, glassmorphism-inspired look: frosted white/translucent cards, backdrop blur, and subtle inset highlights.",
      "A warm, neutral \"stone\" color palette paired with a serif display font for headings and a clean sans-serif for body text.",
      "A recurring \"technical blueprint\" motif — corner tick marks on photos, faint grid backgrounds — to give the site a drafting-table feel.",
    ],
  },
  {
    icon: <Sparkles size={16} />,
    heading: "Animation & Interaction",
    items: [
      "Framer Motion for scroll-triggered fade/slide-ins, page transitions, and the education/certification card flip states.",
      "A custom magnetic-hover effect on buttons that gently pulls them toward the cursor.",
      "A fixed-size role rotator under the name that slides vertically between titles without shifting any surrounding layout.",
    ],
  },
  {
    icon: <ShieldCheck size={16} />,
    heading: "Contact Form & Spam Protection",
    items: [
      "EmailJS to send messages directly from the browser without a custom backend.",
      "An invisible reCAPTCHA v2 challenge, a honeypot field, and a minimum fill-time check to filter out bots.",
      "A client-side cooldown to prevent rapid repeat submissions from the same browser.",
    ],
  },
  {
    icon: <ImageIcon size={16} />,
    heading: "Icons & Assets",
    items: [
      "lucide-react for most UI icons, with a few custom inline SVGs (GitHub, LinkedIn, Facebook) to match the brand marks exactly.",
    ],
  },
  {
    icon: <Rocket size={16} />,
    heading: "Deployment",
    items: [
      "Hosted on Vercel, built directly from the Next.js project for automatic builds and previews.",
    ],
  },
];

function BuildModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-stone-50/90 backdrop-blur-2xl backdrop-saturate-150"
    >
      {/* Decorative blurred glow for the glassy backdrop — neutral stone
          tones only, no warm amber/orange glow */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-stone-200/40 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-stone-300/30 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 left-1/4 w-[420px] h-[420px] rounded-full bg-stone-200/40 blur-3xl" />
      {/* Faint technical grid, consistent with the rest of the site */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative min-h-screen px-5 sm:px-8 py-10 sm:py-16 max-w-4xl mx-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="fixed top-5 right-5 sm:top-8 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center text-stone-500 bg-white/60 backdrop-blur-xl border border-white/70 hover:bg-white/90 hover:text-stone-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_16px_rgba(28,25,23,0.08)] transition-all duration-200"
        >
          <X size={18} />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-stone-400 mb-4">
            <Code2 size={13} /> Behind the site
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 leading-tight mb-3">
            How I built this.
          </h2>
          <p className="text-stone-500 leading-relaxed max-w-lg mb-12">
            A breakdown of the stack, design decisions, and small details
            behind this portfolio — from the framework it runs on to the
            way it keeps spam out of the contact form.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {buildDetails.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: "easeOut" as const }}
              className="p-6 sm:p-7 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_24px_rgba(28,25,23,0.06)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center flex-shrink-0">
                  {section.icon}
                </div>
                <h3 className="text-xs tracking-[0.15em] uppercase text-stone-500">
                  {section.heading}
                </h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-sm text-stone-600 leading-relaxed flex gap-2">
                    <span className="text-stone-300 mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Footer() {
  const [showBuildModal, setShowBuildModal] = useState(false);

  return (
    <footer className="border-t border-stone-100 py-10 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg text-stone-900">John Allen A. Guerra</span>
            <button
              suppressHydrationWarning
              onClick={() => setShowBuildModal(true)}
              aria-label="How I built this"
              title="How I built this"
              className="w-6 h-6 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <Code2 size={13} />
            </button>
          </div>
          <span className="text-xs text-stone-400">
            © {new Date().getFullYear()} · San Pablo, Laguna · johnallenguerra@gmail.com
          </span>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-400 transition-all duration-200"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showBuildModal && <BuildModal onClose={() => setShowBuildModal(false)} />}
      </AnimatePresence>
    </footer>
  );
}