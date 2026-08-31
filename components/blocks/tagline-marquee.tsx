'use client';

import { useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

interface TaglineMarqueeProps {
  items: string[];
  separator?: string;
  speed?: number; // px per second
  direction?: 'left' | 'right';
}

export default function TaglineMarquee({
  items,
  separator = '✦',
  speed = 40,
  direction = 'left',
}: TaglineMarqueeProps) {
  const x = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const repeated = [...items, ...items, ...items, ...items];

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;
    const half = containerRef.current.scrollWidth / 2;

    if (direction === 'left') {
      // Scrolls right-to-left
      x.current -= delta * (speed / 1000);
      if (-x.current >= half) x.current = 0;
    } else {
      // Scrolls left-to-right
      x.current += delta * (speed / 1000);
      if (x.current >= 0) x.current = -half;
    }

    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-neutral-950 py-4 md:py-6 select-none z-20">
      <div
        ref={containerRef}
        className="flex gap-8 md:gap-14 whitespace-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 md:gap-14 text-2xl md:text-5xl font-bold tracking-tighter"
          >
            <span className="text-white/90">{item}</span>
            <span className="text-neutral-600">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
