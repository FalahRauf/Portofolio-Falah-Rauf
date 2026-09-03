"use client";

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Info } from 'lucide-react';
import { BackgroundPaths } from '@/components/ui/background-paths';

interface HeroKintaroProps {
  portraitsCol1: string[];
  portraitsCol2: string[];
}

export default function HeroKintaro({
  portraitsCol1,
  portraitsCol2,
}: HeroKintaroProps) {
  const reduceMotion = useReducedMotion();
  // Two copies is the minimum for a seamless -50% loop. The original four
  // rendered 40 <Image> nodes (decode + memory) to show the same 10 photos.
  const col1Images = [...portraitsCol1, ...portraitsCol1];
  const col2Images = [...portraitsCol2, ...portraitsCol2];
  const stars = Array.from({ length: 45 }, (_, i) => ({
    x: `${(i * 19) % 100}%`,
    y: `${(i * 29) % 100}%`,
    size: (i % 2) + 1,
    opacity: ((i % 5) + 3) * 0.1,
  }));

  return (
    <div className="relative h-screen min-h-[720px] w-full overflow-hidden bg-neutral-950 text-white">
      {/* Existing animated background, kept subtle behind the new composition. */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35">
        <BackgroundPaths title="" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Left editorial hero content. Navbar remains independent from this layout. */}
      <div className="relative z-10 h-full w-full px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex h-full max-w-[760px] flex-col justify-end pb-12 pt-32 sm:pb-14 lg:pb-16 lg:pt-[30vh] xl:pb-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex items-center gap-1.5 font-mono text-sm tracking-widest text-neutral-600 select-none"
            aria-hidden="true"
          >
            <span>/</span><span>/</span><span>/</span><span>/</span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-[clamp(4.25rem,8.25vw,8.25rem)] font-bold leading-[0.82] tracking-[-0.075em] text-white"
          >
            FALAH
            <br />
            <span className="text-white/80">PORTFOLIO</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 max-w-[39rem] text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg md:leading-8"
          >
            I&apos;m someone who loves <span className="font-semibold text-white">learning new things</span> and constantly tries to put what I learn into practice. I develop{' '}
            <span className="font-serif italic text-neutral-200">web</span> and <span className="font-serif italic text-neutral-200">desktop</span> applications. I enjoy working with simple,{' '}
            <span className="font-semibold text-white">practical</span>, and <span className="font-semibold text-white">sustainable</span> tools.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black shadow-lg transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span>Contact Me</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Info className="size-3.5" aria-hidden="true" />
              <span>Explore Projects</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Existing moving images, resized and repositioned as a staggered right-side collage. */}
      <div className="pointer-events-none absolute inset-y-0 right-[8%] z-[2] hidden w-[min(29vw,29rem)] overflow-hidden md:block xl:right-[10.5%]" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-neutral-950 via-neutral-950/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent" />
        <div className="grid h-[116vh] grid-cols-2 gap-4 lg:gap-5">
          <div className="relative h-full overflow-hidden pt-[21vh]">
            <motion.div
              animate={reduceMotion ? { y: 0 } : { y: ['0%', '-50%'] }}
              transition={{ duration: 40, ease: 'linear', repeat: reduceMotion ? 0 : Infinity }}
              className="flex flex-col gap-4 lg:gap-5 will-change-transform"
            >
              {col1Images.map((src, i) => (
                <div key={`col1-${i}`} className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-neutral-900">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 1279px) 170px, 225px"
                    priority={i === 0}
                    className="object-cover grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative h-full overflow-hidden pt-[7vh]">
            <motion.div
              animate={reduceMotion ? { y: 0 } : { y: ['-50%', '0%'] }}
              transition={{ duration: 42, ease: 'linear', repeat: reduceMotion ? 0 : Infinity }}
              className="flex flex-col gap-4 lg:gap-5 will-change-transform"
            >
              {col2Images.map((src, i) => (
                <div key={`col2-${i}`} className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-neutral-900">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 1279px) 170px, 225px"
                    priority={i === 0}
                    className="object-cover grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-neutral-950/85 to-transparent" />
      </div>
    </div>
  );
}
