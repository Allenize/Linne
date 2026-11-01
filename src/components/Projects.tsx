"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Expand, ExternalLink, X } from "lucide-react";
import { projects } from "@/data";

const wrapIndex = (index: number) => (index + projects.length) % projects.length;
const GitHubMark = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.77c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const active = projects[current];
  const previous = useCallback(() => { setDetailsOpen(false); setCurrent((index) => wrapIndex(index - 1)); }, []);
  const next = useCallback(() => { setDetailsOpen(false); setCurrent((index) => wrapIndex(index + 1)); }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
      if (event.key === "Escape") setDetailsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, previous]);

  return (
    <section className="cinematic-projects relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-10 pt-28 sm:pt-32">
      <AnimatePresence mode="popLayout">
        <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.65 }} className="project-backdrop absolute inset-0" style={{ backgroundImage: `url(${active.image})` }} aria-hidden="true" />
      </AnimatePresence>
      <div className="project-backdrop-shade absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="mb-4 flex items-center gap-3 text-white/75 sm:mb-6"><span className="h-px w-8 bg-white/40" /><span className="text-[10px] font-medium tracking-[0.28em] uppercase">Selected projects</span><span className="h-px w-8 bg-white/40" /></div>
        <div className="project-coverflow relative h-[29rem] w-full sm:h-[34rem] lg:h-[37rem]">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index = wrapIndex(current + offset);
            const project = projects[index];
            const isActive = offset === 0;
            return (
              <motion.button type="button" key={`${project.id}-${offset}`} onClick={() => isActive ? setDetailsOpen(true) : setCurrent(index)} aria-label={isActive ? `Open details for ${project.title}` : `Select ${project.title}`}
                animate={{ x: `${offset * 58}%`, scale: isActive ? 1 : 0.86 - Math.abs(offset) * 0.04, opacity: Math.abs(offset) === 2 ? 0.58 : isActive ? 1 : 0.82, rotateY: offset * -8, zIndex: 10 - Math.abs(offset) }} transition={{ type: "spring", stiffness: 150, damping: 22 }}
                className={`project-cover-card absolute left-1/2 top-1/2 h-[25rem] w-[min(78vw,25rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] text-left sm:h-[30rem] sm:w-[min(56vw,29rem)] sm:rounded-[2.5rem] lg:h-[33rem] ${isActive ? "cursor-zoom-in" : "cursor-pointer"}`}>
                <img src={project.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/20" />
                {isActive ? <><span className="project-expand-pill absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-full px-3.5 py-2 text-[11px] text-white/90"><Expand size={13} /> Explore</span><div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><p className="mb-2 text-[10px] tracking-[0.2em] text-white/55 uppercase">{active.type}</p><h1 className="font-serif text-4xl leading-none sm:text-5xl">{active.title}</h1><p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/72 sm:text-sm">{active.description}</p></div></> : null}
              </motion.button>
            );
          })}
        </div>

        <div className="project-dock mt-3 flex items-center gap-3 rounded-[1.6rem] px-3 py-2.5 text-white sm:mt-5 sm:gap-5 sm:px-4 sm:py-3">
          <button type="button" onClick={previous} className="project-round-control" aria-label="Previous project"><ArrowLeft size={17} /></button>
          <div className="flex min-w-0 items-center gap-3 sm:min-w-[16rem]">
            {active.navIcon ? <img src={active.navIcon} alt="" className="h-10 w-10 rounded-full bg-white/75 object-contain p-2 sm:h-12 sm:w-12" /> : null}
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{active.title}</p><p className="truncate text-[10px] text-white/55">{active.technologies.join(" · ")}</p></div>
          </div>
          <span className="text-[10px] tabular-nums text-white/55">{String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <button type="button" onClick={next} className="project-round-control" aria-label="Next project"><ArrowRight size={17} /></button>
        </div>
        <div className="mt-4 flex items-center gap-1.5" aria-label="Choose project">
          {projects.map((project, index) => <button type="button" key={project.id} onClick={() => setCurrent(index)} aria-label={`View ${project.title}`} className={`h-1.5 rounded-full transition-all ${index === current ? "w-9 bg-white/80" : "w-1.5 bg-white/35 hover:bg-white/60"}`} />)}
        </div>
      </div>

      <AnimatePresence>
        {detailsOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-black/55 p-4 backdrop-blur-xl" onClick={() => setDetailsOpen(false)}>
            <motion.article initial={{ y: 28, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 220, damping: 24 }} onClick={(event) => event.stopPropagation()} className="project-detail-modal relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] md:grid-cols-[1.05fr_.95fr]">
              <button type="button" onClick={() => setDetailsOpen(false)} aria-label="Close details" className="project-round-control absolute right-4 top-4 z-10"><X size={17} /></button>
              <img src={active.image} alt={active.title} className="h-64 w-full object-cover md:h-full md:min-h-[34rem]" />
              <div className="flex flex-col justify-between bg-stone-100/90 p-7 text-stone-900 backdrop-blur-3xl sm:p-9">
                <div><p className="text-[10px] tracking-[0.2em] text-stone-500 uppercase">{active.type}</p><h2 className="mt-3 font-serif text-4xl leading-none sm:text-5xl">{active.title}</h2><p className="mt-5 text-sm leading-relaxed text-stone-600">{active.description}</p><div className="mt-7 flex flex-wrap gap-2">{active.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/70 bg-white/50 px-3 py-1.5 text-[10px]">{technology}</span>)}</div></div>
                <div className="mt-8 flex flex-wrap gap-2">{active.githubUrl ? <a href={active.githubUrl} target="_blank" rel="noreferrer" className="project-action"><GitHubMark /> GitHub</a> : null}{active.liveUrl ? <a href={active.liveUrl} target="_blank" rel="noreferrer" className="project-action"><ExternalLink size={14} /> Live demo</a> : null}{active.downloadUrl ? <a href={active.downloadUrl} target="_blank" rel="noreferrer" className="project-action"><Download size={14} /> Download</a> : null}</div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
