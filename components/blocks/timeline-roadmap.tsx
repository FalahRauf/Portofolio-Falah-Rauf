'use client';

import { motion } from 'framer-motion';
import { BlurFadeIn } from './motion-primitives';

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  tags: string[];
}

interface TimelineRoadmapProps {
  entries: TimelineEntry[];
}

export default function TimelineRoadmap({ entries }: TimelineRoadmapProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-16 md:space-y-24">
          {entries.map((e, i) => (
            <BlurFadeIn
              key={e.year}
              delay={i * 0.15}
              className="relative pl-16 md:pl-32"
            >
              {/* Year marker dot */}
              <div className="absolute left-6 md:left-12 -translate-x-1/2 top-1 size-3 rounded-full bg-white shadow-lg" />
              <div className="absolute left-6 md:left-12 -translate-x-1/2 top-1 size-3 rounded-full bg-white animate-ping opacity-25" />

              <p className="text-3xl md:text-5xl font-bold tracking-tighter mb-3 text-white">
                {e.year}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-200">
                {e.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-5 max-w-2xl text-base sm:text-lg">
                {e.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3.5 py-1 rounded-full border border-white/15 text-neutral-300 bg-neutral-900/60 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </BlurFadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
