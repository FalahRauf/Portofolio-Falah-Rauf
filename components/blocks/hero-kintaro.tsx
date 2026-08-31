'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Info } from 'lucide-react';

interface HeroKintaroProps {
  portraitsCol1: string[];
  portraitsCol2: string[];
}

export default function HeroKintaro({
  portraitsCol1,
  portraitsCol2,
}: HeroKintaroProps) {
  // Triple arrays so the infinite vertical translateY marquee never has empty gaps
  const col1Images = [...portraitsCol1, ...portraitsCol1, ...portraitsCol1, ...portraitsCol1];
  const col2Images = [...portraitsCol2, ...portraitsCol2, ...portraitsCol2, ...portraitsCol2];

  // Starfield subtle background particles
  const stars = Array.from({ length: 45 }, (_, i) => ({
    x: `${(i * 19) % 100}%`,
    y: `${(i * 29) % 100}%`,
    size: (i % 2) + 1,
    opacity: ((i % 5) + 3) * 0.1,
  }));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white flex items-center">
      {/* Background Starfield Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Main Container: 2-Column Split (Left: Content, Right: Looping Vertical Cards) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center h-full">
        {/* ================= LEFT AREA: Title, Subtitle, CTAs ================= */}
        <div className="flex flex-col justify-center pt-8 md:pt-0">
          {/* Decorative Angled Slashes */}
          <div className="flex items-center gap-1.5 text-neutral-600 mb-3 font-mono text-sm tracking-widest select-none">
            <span>/</span>
            <span>/</span>
            <span>/</span>
            <span>/</span>
          </div>

          {/* Big Bold Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-bold tracking-tighter leading-[0.92] mb-5 text-white"
          >
            FALAH
            <br />
            <span className="text-white/90">PORTFOLIO</span>
          </motion.h1>

          {/* Subtitle / Bio Paragraph with stylized inline words */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-lg leading-relaxed mb-6"
          >
            I&apos;m someone who loves{' '}
            <span className="text-white font-semibold">learning new things</span> and
            constantly tries to put what I learn into practice. I develop{' '}
            <span className="italic font-serif text-neutral-200">web</span> and{' '}
            <span className="italic font-serif text-neutral-200">desktop</span> applications.
            I enjoy working with simple,{' '}
            <span className="text-white font-semibold">practical</span>, and{' '}
            <span className="text-white font-semibold">sustainable</span> tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>Contact Me</span>
              <ArrowRight className="size-3.5" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
            >
              <Info className="size-3.5" />
              <span>Explore Projects</span>
            </a>
          </motion.div>
        </div>

        {/* ================= RIGHT AREA: 2-Column Infinite Vertical Marquee ================= */}
        <div className="relative hidden md:flex items-center justify-center h-[85vh] overflow-hidden">
          {/* Top & Bottom Gradient Masks for seamless fade out */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-20 pointer-events-none" />

          {/* 2-Column Grid of Cards */}
          <div className="grid grid-cols-2 gap-4 lg:gap-5 w-full max-w-[420px] lg:max-w-[460px] h-full">
            {/* Column 1: Infinite Scroll UP */}
            <div className="relative h-full overflow-hidden">
              <motion.div
                animate={{ y: ['0%', '-50%'] }}
                transition={{
                  duration: 22,
                  ease: 'linear',
                  repeat: Infinity,
                }}
                className="flex flex-col gap-4 lg:gap-5 will-change-transform"
              >
                {col1Images.map((src, i) => (
                  <div
                    key={`col1-${i}`}
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0"
                  >
                    <Image
                      src={src}
                      alt={`portrait ${i}`}
                      fill
                      className="object-cover grayscale contrast-125 hover:grayscale-0 transition-[filter] duration-500"
                      sizes="(max-width: 1024px) 200px, 230px"
                      priority={i < 4}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 2: Infinite Scroll DOWN */}
            <div className="relative h-full overflow-hidden">
              <motion.div
                animate={{ y: ['-50%', '0%'] }}
                transition={{
                  duration: 24,
                  ease: 'linear',
                  repeat: Infinity,
                }}
                className="flex flex-col gap-4 lg:gap-5 will-change-transform"
              >
                {col2Images.map((src, i) => (
                  <div
                    key={`col2-${i}`}
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0"
                  >
                    <Image
                      src={src}
                      alt={`portrait ${i}`}
                      fill
                      className="object-cover grayscale contrast-125 hover:grayscale-0 transition-[filter] duration-500"
                      sizes="(max-width: 1024px) 200px, 230px"
                      priority={i < 4}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
