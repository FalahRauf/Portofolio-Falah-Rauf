'use client';

import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  const repeated = [...items, ...items, ...items, ...items];

  // Measure only on mount + resize. Never inside the animation loop:
  // reading scrollWidth every frame forced a synchronous layout on 4 instances.
  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const half = el.scrollWidth / 2;
      if (half > 0) setDuration(half / speed);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [speed, items.length]);

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-neutral-950 py-4 md:py-6 select-none z-20">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{
          width: 'max-content',
          // Pure CSS keyframes run on the compositor: zero JS per frame.
          animation: duration
            ? `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${duration}s linear infinite`
            : undefined,
        }}
      >
        {repeated.map((item, i) => (
          // Spacing lives on the child (margin) instead of the container (gap)
          // so that translating -50% lands on an exact whole unit -> seamless.
          <span
            key={i}
            className="flex items-center gap-8 md:gap-14 mr-8 md:mr-14 text-2xl md:text-5xl font-bold tracking-tighter"
          >
            <span className="text-white/90">{item}</span>
            <span className="text-neutral-600">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
