"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, ExternalLink, Maximize2, X } from "lucide-react";
import { projects } from "@/data";

const wrapIndex = (index: number) => (index + projects.length) % projects.length;
const GitHubMark = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.77c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const active = projects[current];
  const gallery = (active.images?.length ? active.images : [active.image]).slice(0, 7);
  const previous = useCallback(() => { setSelectedImage(null); setCurrent((index) => wrapIndex(index - 1)); }, []);
  const next = useCallback(() => { setSelectedImage(null); setCurrent((index) => wrapIndex(index + 1)); }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedImage && event.key === "Escape") return setSelectedImage(null);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, previous, selectedImage]);

  return (
    <section className="overview-projects relative min-h-[100svh] overflow-hidden px-3 pb-10 pt-24 sm:px-5 sm:pt-28">
      <AnimatePresence mode="popLayout">
        <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="project-backdrop absolute inset-0" style={{ backgroundImage: `url(${active.image})` }} aria-hidden="true" />
      </AnimatePresence>
      <div className="overview-backdrop-shade absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[92rem] flex-col">
        <div className="overview-identity mb-2 flex items-center justify-between rounded-full px-4 py-2 text-[10px] tracking-[0.12em] text-white/70 sm:px-5 sm:text-xs">
          <span>John Allen Guerra</span><span>{String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.38 }} className="text-center text-white">
            <p className="mt-3 text-[10px] font-medium tracking-[0.28em] text-white/55 uppercase sm:text-xs">{active.type}</p>
            <h1 className="overview-title mt-1 font-serif text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[.82] tracking-[-.045em] uppercase">{active.title}</h1>
            <p className="mt-2 text-sm text-white/72 sm:text-xl">{active.technologies.join(" · ")}</p>
          </motion.div>
        </AnimatePresence>

        <div className="overview-gallery relative mt-4 flex min-h-[23rem] flex-1 items-center justify-center sm:mt-5 sm:min-h-[22rem]">
          <AnimatePresence mode="popLayout">
            <motion.div key={active.id} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }} className="overview-gallery-track absolute inset-0 flex items-center justify-center">
              {gallery.map((image, index) => {
                const center = (gallery.length - 1) / 2;
                const offset = index - center;
                const distance = Math.abs(offset);
                return (
                  <motion.button
                    type="button" key={image} onClick={() => setSelectedImage(image)} aria-label={`Expand ${active.title} screen ${index + 1}`}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, x: `${offset * 62}%`, y: distance * 12, scale: 1 - distance * .055, rotateZ: offset * 1.6, zIndex: 20 - Math.round(distance) }}
                    transition={{ delay: index * .045, type: "spring", stiffness: 145, damping: 23 }}
                    className={`overview-screen group absolute overflow-hidden rounded-[1.2rem] ${distance < .6 ? "overview-screen-main" : ""}`}
                  >
                    <img src={image} alt={`${active.title} interface ${index + 1}`} className="h-full w-full object-contain" />
                    <span className="overview-expand absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"><Maximize2 size={13} /></span>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="overview-controls mx-auto mt-1 flex w-full max-w-3xl items-center justify-between gap-2 rounded-[1.6rem] px-3 py-2.5 text-white sm:mt-3 sm:px-4 sm:py-3">
          <button type="button" onClick={previous} className="project-round-control" aria-label="Previous project"><ArrowLeft size={17} /></button>
          <div className="min-w-0 flex-1 text-center"><p className="truncate text-xs text-white/55 sm:text-sm">{active.description}</p></div>
          <div className="hidden items-center gap-2 sm:flex">
            {active.githubUrl ? <a href={active.githubUrl} target="_blank" rel="noreferrer" className="overview-action"><GitHubMark /> GitHub</a> : null}
            {active.liveUrl ? <a href={active.liveUrl} target="_blank" rel="noreferrer" className="overview-action"><ExternalLink size={13} /> Live</a> : null}
            {active.downloadUrl ? <a href={active.downloadUrl} target="_blank" rel="noreferrer" className="overview-action"><Download size={13} /> Download</a> : null}
          </div>
          <button type="button" onClick={next} className="project-round-control" aria-label="Next project"><ArrowRight size={17} /></button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5" aria-label="Choose project">
          {projects.map((project, index) => <button type="button" key={project.id} onClick={() => setCurrent(index)} aria-label={`View ${project.title}`} className={`h-1.5 rounded-full transition-all ${index === current ? "w-9 bg-white/85" : "w-1.5 bg-white/35 hover:bg-white/60"}`} />)}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-2xl" onClick={() => setSelectedImage(null)}>
            <button type="button" onClick={() => setSelectedImage(null)} aria-label="Close image" className="project-round-control absolute right-5 top-5"><X size={17} /></button>
            <motion.img initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .96, opacity: 0 }} src={selectedImage} alt={`${active.title} expanded interface`} onClick={(event) => event.stopPropagation()} className="max-h-[88vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
