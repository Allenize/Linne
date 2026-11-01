"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, Menu, Plus, X } from "lucide-react";
import { navItems } from "@/data";

const routeLabels: Record<string, string> = { "/": "Home", "/about": "About", "/projects": "Projects", "/contact": "Contact" };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const pageLabel = routeLabels[pathname] ?? "Portfolio";

  return (
    <>
      <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="browser-nav mx-auto flex h-14 w-full max-w-5xl items-center gap-2 rounded-[1.35rem] px-2.5 sm:h-[4.15rem] sm:gap-3 sm:rounded-[1.75rem] sm:px-3">
          <Link href="/" aria-label="Home" className="browser-control hidden sm:grid"><ArrowLeft size={16} /></Link>
          <Link href="/" className="browser-address group flex min-w-0 flex-1 items-center justify-between rounded-[1rem] px-4 py-2.5 sm:rounded-[1.25rem] sm:px-5">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="font-serif text-lg leading-none text-stone-950 sm:text-xl">Linne</span>
              <span className="hidden h-4 w-px bg-stone-500/25 sm:block" />
              <span className="truncate text-[11px] tracking-[0.14em] text-stone-600 uppercase sm:text-xs">{pageLabel}</span>
            </span>
            <ChevronDown size={14} className="text-stone-500 transition-transform group-hover:translate-y-0.5" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return <Link key={item.href} href={item.href} className={`rounded-full px-3.5 py-2 text-xs transition-all ${active ? "bg-white/70 text-stone-950 shadow-sm" : "text-stone-600 hover:bg-white/35 hover:text-stone-950"}`}>{item.label}</Link>;
            })}
          </nav>
          <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen((open) => !open)} className="browser-control grid md:hidden">{mobileOpen ? <X size={17} /> : <Menu size={17} />}</button>
          <span className="browser-control hidden lg:grid" aria-hidden="true"><Plus size={17} /></span>
        </div>
      </motion.header>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.22 }} className="browser-mobile-menu fixed left-3 right-3 top-[4.65rem] z-40 flex flex-col gap-1 rounded-[1.5rem] p-2 md:hidden">
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-2xl px-5 py-3 text-sm text-stone-700 hover:bg-white/45">Home</Link>
            {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`rounded-2xl px-5 py-3 text-sm ${pathname === item.href ? "bg-white/65 text-stone-950" : "text-stone-700 hover:bg-white/45"}`}>{item.label}</Link>)}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
