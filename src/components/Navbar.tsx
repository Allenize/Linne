"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-white/90 backdrop-blur-xl border-b border-stone-100 shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            suppressHydrationWarning
            onClick={() => scrollTo("#hero")}
            className="font-serif text-3xl tracking-tight text-stone-900 hover:text-stone-600 transition-colors"
          >
            Linne
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                suppressHydrationWarning
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative px-4 py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            suppressHydrationWarning
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-stone-100 shadow-lg md:hidden"
          >
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  suppressHydrationWarning
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="px-8 py-3 text-left text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}