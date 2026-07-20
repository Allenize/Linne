"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data";
import type { JSX } from "react";
import TiltCard from "./TiltCard";

import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiPython,
  SiCplusplus, SiPhp, SiReact, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiTailwindcss, SiMysql, SiGit, SiGithub,
  SiVscodium, SiFigma, SiPostman, SiOnlyoffice,
  SiGo, SiFlutter, SiAngular, SiFirebase, SiVercel,
} from "react-icons/si";

const skillMeta: Record<string, { icon: JSX.Element; color: string }> = {
  HTML:             { icon: <SiHtml5 />,            color: "#E34F26" },
  CSS:              { icon: <SiCss />,             color: "#1572B6" },
  JavaScript:       { icon: <SiJavascript />,       color: "#F7DF1E" },
  TypeScript:       { icon: <SiTypescript />,       color: "#3178C6" },
  Python:           { icon: <SiPython />,           color: "#3776AB" },
  Go:               { icon: <SiGo />,             color: "#00ACD7" },
  "C++":            { icon: <SiCplusplus />,        color: "#00599C" },
  PHP:              { icon: <SiPhp />,              color: "#777BB4" },
  React:            { icon: <SiReact />,            color: "#61DAFB" },
  "Next.js":        { icon: <SiNextdotjs />,        color: "#000000" },
  "Node.js":        { icon: <SiNodedotjs />,        color: "#339933" },
  Flutter:          { icon: <SiFlutter />,          color: "#02569B" },
  Angular:          { icon: <SiAngular />,          color: "#DD0031" },
  PostgreSQL:       { icon: <SiPostgresql />,       color: "#4169E1" },
  "Tailwind CSS":   { icon: <SiTailwindcss />,      color: "#06B6D4" },
  MySQL:            { icon: <SiMysql />,            color: "#4479A1" },
  Git:              { icon: <SiGit />,              color: "#F05032" },
  GitHub:           { icon: <SiGithub />,           color: "#181717" },
  "VS Code":        { icon: <SiVscodium />,         color: "#007ACC" },
  "Microsoft Office":{ icon: <SiOnlyoffice />,      color: "#D83B01" },
  Figma:            { icon: <SiFigma />,            color: "#F24E1E" },
  Postman:          { icon: <SiPostman />,          color: "#FF6C37" },
  Firebase:         { icon: <SiFirebase />,         color: "#FFCA28" },
  Vercel:           { icon: <SiVercel />,           color: "#000000" },
};

const categoryConfig = {
  language:   { label: "Programming Languages", number: "01" },
  technology: { label: "Technologies & Frameworks", number: "02" },
  tool:       { label: "Tools & Software", number: "03" },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const grouped = {
    language:   skills.filter((s) => s.category === "language"),
    technology: skills.filter((s) => s.category === "technology"),
    tool:       skills.filter((s) => s.category === "tool"),
  };

  return (
    <div ref={ref}>
      <div className="flex overflow-x-auto md:flex-wrap md:overflow-visible snap-x snap-mandatory scrollbar-hide overscroll-x-contain -mx-4 md:mx-0 px-4 md:px-0 pb-2 md:pb-0 gap-4 md:grid md:grid-cols-3 md:gap-8">
        {(Object.entries(grouped) as [keyof typeof grouped, typeof skills][]).map(
          ([category, items], colIdx) => (
            <TiltCard
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + colIdx * 0.12,
                ease: "easeOut" as const,
              }}
              max={5}
              className="shrink-0 w-[80%] sm:w-[60%] md:w-auto md:shrink snap-start bg-white/40 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-7 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_24px_rgba(28,25,23,0.06)]"
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4 md:mb-7">
                <h3 className="font-serif text-sm md:text-base font-normal text-stone-800 tracking-wide">
                  {categoryConfig[category].label}
                </h3>
                <span className="text-xs font-mono text-stone-300">
                  {categoryConfig[category].number}
                </span>
              </div>

              {/* Skills grid — same 2 columns on every screen size now,
                  so mobile no longer squeezes 3 cramped columns (which was
                  overflowing and made the borders/icons look denser and
                  darker than on desktop). */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {items.map((skill, i) => {
                  const meta = skillMeta[skill.name];
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.35,
                        delay: 0.4 + colIdx * 0.1 + i * 0.04,
                      }}
                      className="group flex flex-row items-center gap-2 md:gap-2.5 p-2 md:p-2.5 rounded-lg md:rounded-xl md:border md:border-stone-100 md:hover:border-stone-200 hover:shadow-sm transition-all duration-200 cursor-default text-left"
                    >
                      {/* Icon */}
                      <div
                        className="w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center text-sm md:text-base flex-shrink-0 transition-all duration-200"
                        style={{
                          backgroundColor: "#f5f5f4",
                          color: "#1c1917",
                        }}
                      >
                        {meta?.icon}
                      </div>
                      {/* Name */}
                      <span className="text-[10px] md:text-xs font-medium text-stone-600 group-hover:text-stone-900 transition-colors leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </TiltCard>
          )
        )}
      </div>
    </div>
  );
}