"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const GitHubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GITHUB_USERNAME = "Allenize";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

// Grayscale only — no GitHub green, kept consistent with the site's
// black / white / stone palette.
const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-stone-100 border border-stone-200/80",
  1: "bg-stone-300",
  2: "bg-stone-500",
  3: "bg-stone-700",
  4: "bg-stone-900",
};

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function buildWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];

  days.forEach((day) => {
    const dow = new Date(`${day.date}T00:00:00`).getDay(); // 0 = Sun
    if (week.length === 0 && dow > 0) {
      for (let i = 0; i < dow; i++) week.push(null);
    }
    week.push(day);
    if (dow === 6) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GithubContributionsClient({
  days,
  error,
}: {
  days: ContributionDay[] | null;
  error: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const weeks = days ? buildWeeks(days) : [];

  // Which weeks should get a month label above them (first week that
  // introduces a new month).
  const monthMarkers: { index: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.find((d) => d !== null);
    if (!firstDay) return;
    const month = new Date(`${firstDay.date}T00:00:00`).getMonth();
    if (month !== lastMonth) {
      monthMarkers.push({ index: i, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
  });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <section className="pt-3 pb-10 sm:pt-4 sm:pb-14 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-4 flex justify-end">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-stone-600 bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/70 hover:text-stone-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(28,25,23,0.05)] transition-all duration-300"
          >
            <GitHubIcon size={15} />
            @{GITHUB_USERNAME}
          </a>
        </motion.div>

        <TiltCard
          {...fadeUp(0.1)}
          max={2}
          className="rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_24px_rgba(28,25,23,0.06)] p-4 sm:p-6"
        >
          {error && (
            <p className="text-sm text-stone-400 text-center py-8">
              Couldn&apos;t load GitHub activity right now — check back later.
            </p>
          )}

          {!error && !days && (
            <div className="flex items-center justify-center py-8">
              <div className="w-5 h-5 rounded-full border-2 border-stone-300 border-t-stone-700 animate-spin" />
            </div>
          )}

          {!error && days && (
            <>
              <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
                <div className="inline-block min-w-full">
                  {/* Month labels */}
                  <div className="flex gap-[3px] mb-1.5 pl-[26px]">
                    {weeks.map((_, i) => {
                      const marker = monthMarkers.find((m) => m.index === i);
                      return (
                        <div
                          key={i}
                          className="w-[11px] text-[10px] text-stone-400 shrink-0"
                        >
                          {marker ? marker.label : ""}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-[3px]">
                    {/* Day-of-week labels */}
                    <div className="flex flex-col gap-[3px] pr-1.5 shrink-0">
                      {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                        <div
                          key={i}
                          className="h-[11px] w-[20px] text-[9px] leading-[11px] text-stone-400 text-right"
                        >
                          {label}
                        </div>
                      ))}
                    </div>

                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px] shrink-0">
                        {week.map((day, di) =>
                          day ? (
                            <div
                              key={di}
                              title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                              className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[day.level]} hover:ring-2 hover:ring-stone-400/60 transition-all`}
                            />
                          ) : (
                            <div key={di} className="w-[11px] h-[11px]" />
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 justify-end text-[10px] text-stone-400">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div key={lvl} className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_CLASSES[lvl]}`} />
                ))}
                <span>More</span>
              </div>
            </>
          )}
        </TiltCard>
      </div>
    </section>
  );
}