"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={`w-full max-w-3xl flex items-center justify-between rounded-full pl-6 pr-2 py-2 transition-all duration-500 ${
            scrolled || mobileOpen
              ? "bg-white/50 backdrop-blur-2xl shadow-[0_8px_32px_rgba(28,25,23,0.08)] border border-white/60"
              : "bg-white/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(28,25,23,0.05)] border border-white/40"
          }`}
          style={{
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.6), 0 8px 32px rgba(28,25,23,0.06)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="font-serif text-2xl tracking-tight text-stone-900 hover:text-stone-600 transition-colors"
          >
            Linne
          </Link>

          {/* Desktop nav — glass pill */}
          <nav className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-md rounded-full p-1 border border-white/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 text-sm rounded-full transition-all duration-300 hover:text-stone-900 hover:bg-white/70 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(28,25,23,0.06)] ${
                  isActive(item.href)
                    ? "text-stone-900 bg-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(28,25,23,0.06)]"
                    : "text-stone-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle — glass button */}
          <Magnetic strength={0.3}>
            <button
              suppressHydrationWarning
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-stone-700 hover:bg-white/70 hover:text-stone-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-300"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </Magnetic>
        </div>
      </motion.header>

      {/* Mobile menu — glass panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(28,25,23,0.1)] overflow-hidden"
            style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6), 0 8px 32px rgba(28,25,23,0.1)" }}
          >
            <nav className="flex flex-col p-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-6 py-3 text-left text-sm rounded-2xl hover:bg-white/60 hover:text-stone-900 transition-colors ${
                    isActive(item.href) ? "text-stone-900 bg-white/60" : "text-stone-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}