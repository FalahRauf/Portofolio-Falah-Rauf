'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ProjectItem {
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  href?: string;
  description?: string;
}

interface ProjectsHorizontalProps {
  projects: ProjectItem[];
}

export default function ProjectsHorizontal({ projects }: ProjectsHorizontalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);

  // Recalculate horizontal scroll width on resize or mount
  useEffect(() => {
    const calcDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total distance needed to scroll all the way to the end
        const distance = Math.max(0, trackWidth - viewportWidth + 60);
        setMaxScrollDistance(distance);
      }
    };

    calcDistance();
    window.addEventListener('resize', calcDistance);
    return () => window.removeEventListener('resize', calcDistance);
  }, [projects]);

  // Track vertical scroll progress through this pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform horizontal translation smoothly from 0 to -maxScrollDistance (bidirectional / full reverse)
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-neutral-950 text-white"
      style={{ height: '350vh' }}
    >
      {/* Pinned full-screen viewport while scrolling horizontally */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Animated Horizontal Track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-8 md:gap-14 px-6 md:px-20 will-change-transform"
        >
          {/* 1. INTRO PANEL (Starts in view, smoothly scrolls off to the left) */}
          <div className="shrink-0 w-[85vw] sm:w-[70vw] md:w-[480px] lg:w-[520px] flex flex-col justify-center pr-4">
            <p className="text-xs md:text-sm tracking-[0.3em] text-neutral-500 font-mono uppercase mb-6">
              [003]
            </p>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
              Projects
            </h2>
            <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed mb-12">
              A collection of{' '}
              <span className="italic font-serif text-neutral-200">experiments</span>,{' '}
              <span className="italic font-serif text-neutral-200">products</span>, and{' '}
              <span className="italic font-serif text-neutral-200">digital artifacts</span>{' '}
              forged in the{' '}
              <span className="font-bold text-white">void</span>.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-neutral-700" />
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase font-mono">
                Scroll to explore &rarr;
              </p>
            </div>
          </div>

          {/* 2. PROJECT CARDS (Full-size, right up to the edges) */}
          {projects.map((p, idx) => {
            const isLink = p.href && p.href !== '#';
            const Wrapper = isLink ? 'a' : 'div';
            return (
              <Wrapper
                key={p.title}
                href={isLink ? p.href : undefined}
                target={p.href?.startsWith('http') ? '_blank' : undefined}
                rel={p.href?.startsWith('http') ? 'noopener' : undefined}
                className="group relative shrink-0 w-[85vw] sm:w-[75vw] md:w-[680px] lg:w-[780px] h-[68vh] md:h-[76vh] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 flex flex-col justify-between p-6 md:p-10 transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_60px_rgba(255,255,255,0.06)] cursor-pointer"
              >
                {/* Background image preview */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950 contain-paint">
                  <Image
                    src={p.imageSrc}
                    alt={p.title}
                    fill
                    className="object-cover object-top opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 85vw, 780px"
                  />
                  {/* Dark gradient overlay for typography readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                </div>

                {/* Card Top Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border border-white/20 bg-black/60 backdrop-blur-md text-neutral-300">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono tracking-widest text-neutral-400">
                      {p.year}
                    </span>
                    <div className="size-9 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/50 transition-colors">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </div>

                {/* Card Bottom Header */}
                <div className="relative z-10">
                  <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase mb-2 font-mono">
                    0{idx + 1} / 0{projects.length}
                  </p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-3">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="text-sm md:text-base text-neutral-300 max-w-xl line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </div>
              </Wrapper>
            );
          })}

          {/* 3. END MARKER (Pure minimalist dark-charcoal display text, exactly like Kintaro) */}
          <div className="shrink-0 flex items-center justify-center pl-8 pr-32 md:pr-64 select-none">
            <span className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-bold tracking-tighter text-[#2a2a2a] leading-none">
              END
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
