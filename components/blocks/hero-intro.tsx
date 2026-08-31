'use client';

import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface HeroIntroProps {
  name: string;
  role: string;
  tagline: string;
  portraitsTop: string[]; // left column - scrolls BOTTOM to TOP
  portraitsBottom: string[]; // right column - scrolls TOP to BOTTOM
}

/**
 * Inner hero content. Wrapped by StackedPanel (parent) which handles
 * scroll progress, sticky positioning, blur, scale.
 *
 * Image loops:
 * - Left column (portraitsTop): scrolls from BOTTOM to TOP
 * - Right column (portraitsBottom): scrolls from TOP to BOTTOM
 */
export default function HeroIntro({
  name,
  role,
  tagline,
  portraitsTop,
  portraitsBottom,
}: HeroIntroProps) {
  const leftLoop = [...portraitsTop, ...portraitsTop, ...portraitsTop];
  const rightLoop = [...portraitsBottom, ...portraitsBottom, ...portraitsBottom];

  return (
    <div className='h-screen w-full overflow-hidden bg-neutral-950 text-white relative'>
      {/* grid: name LEFT, looping portraits RIGHT */}
      <div className='absolute inset-0 grid grid-cols-1 md:grid-cols-[1fr_55%] gap-0'>
        {/* LEFT: name + role + tagline */}
        <div className='flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4'
          >
            {role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className='text-6xl md:text-[9rem] lg:text-[12rem] font-bold tracking-tighter leading-[0.85] mb-6'
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='text-lg md:text-xl text-neutral-300 max-w-md leading-relaxed'
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.8 }}
            className='mt-12 flex items-center gap-3'
          >
            <span className='inline-block size-2 rounded-full bg-white animate-pulse' />
            <p className='text-xs tracking-[0.3em] uppercase'>Scroll to focus</p>
          </motion.div>
        </div>

        {/* RIGHT: two columns of looping portraits */}
        <div className='relative hidden md:grid grid-cols-2 gap-2 p-4 h-full overflow-hidden'>
          <LoopingColumn images={leftLoop} direction='up' />
          <LoopingColumn images={rightLoop} direction='down' />
        </div>
      </div>
    </div>
  );
}

/* ============================================
   LoopingColumn — infinite vertical scroll for portrait grid
   direction='up'   = scrolls BOTTOM to TOP (left column)
   direction='down' = scrolls TOP to BOTTOM (right column)
   ============================================ */
function LoopingColumn({
  images,
  direction,
}: {
  images: string[];
  direction: 'up' | 'down';
}) {
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const speed = 0.04; // px/ms

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;
    const halfHeight = containerRef.current.scrollHeight / 3;
    const current = y.get();
    if (direction === 'down') {
      const next = current + delta * speed;
      y.set(next >= halfHeight ? 0 : next);
    } else {
      const next = current - delta * speed;
      y.set(-next >= halfHeight ? 0 : next);
    }
  });

  return (
    <div className='relative h-full overflow-hidden'>
      <motion.div
        ref={containerRef}
        style={{ y, willChange: 'transform' }}
        className='flex flex-col gap-2'
      >
        {images.map((src, i) => (
          <div
            key={i}
            className='relative w-full aspect-[3/4] overflow-hidden rounded-md bg-neutral-800'
          >
            <Image
              src={src}
              alt={`loop ${i}`}
              fill
              className='object-cover grayscale hover:grayscale-0 transition-[filter] duration-500'
              sizes='20vw'
              priority={i < 3}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}