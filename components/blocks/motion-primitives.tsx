'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

/* ============================================
   Blur-to-Focus Motion Variants
   Initial: blur(12px), opacity: 0, translateY: 25px
   InView:  blur(0px),  opacity: 1, translateY: 0px
   ============================================ */

export const blurFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(12px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function BlurFadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={blurFadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-60px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
