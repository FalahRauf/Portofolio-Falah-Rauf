'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface StackedPanelProps {
  children: React.ReactNode;
  /** Container height (in vh) controls how long the panel takes to scroll through.
   *  Bigger = slower reveal, more "settle" time before next panel covers. */
  scrollVh?: number;
  /** Blur the panel as the next one slides over it (e.g. ['blur(0px)', 'blur(8px)']) */
  blurRange?: [string, string];
  /** Fade the panel as the next one slides over it */
  opacityRange?: [number, number];
  /** Round the top corners (for the "card stacking" effect from the prompt) */
  rounded?: boolean;
}

/**
 * StackedPanel — strict stacked-scroll behavior:
 * - Panel stays sticky at top-0 with full h-screen, NEVER scrolls or shrinks
 * - As user scrolls, the next panel slides up over it
 * - When this panel starts getting covered, it can blur/fade for the transition
 * - Fully BIDIRECTIONAL: scrolling back up restores everything exactly
 *
 * Pattern matches the smooth-scroll prompt: sections are sticky h-screen,
 * each new section rounds its top corners and slides over the previous.
 */
export default function StackedPanel({
  children,
  scrollVh = 100,
  blurRange,
  opacityRange,
  rounded = true,
}: StackedPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const containerStyle = { height: `${scrollVh}vh` };
  const stickyStyle = rounded ? 'rounded-t-3xl' : '';

  return (
    <div ref={ref} className='relative' style={containerStyle}>
      <motion.div
        style={{
          filter: blurRange ? useTransform(scrollYProgress, [0.3, 0.9], blurRange) : undefined,
          opacity: opacityRange ? useTransform(scrollYProgress, [0.3, 0.9], opacityRange) : undefined,
        }}
        className={`sticky top-0 h-screen w-full overflow-hidden ${stickyStyle}`}
      >
        {children}
      </motion.div>
    </div>
  );
}