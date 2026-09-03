'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for cursor position
  const springConfig = { damping: 28, stiffness: 450, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Perf: the old handler called target.closest() on EVERY mousemove. With Lenis
  // smooth-scroll running, mousemove fires constantly, and closest() walks up the
  // DOM tree each time — that's a layout-adjacent query at pointer-event rate.
  // Now we cache the last hit target and only re-run the query when the element
  // under the pointer actually changes.
  const lastTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target || target === lastTargetRef.current) return;
      lastTargetRef.current = target;

      const isInteractive = Boolean(
        target.closest('a, button, [role="button"], input, textarea, .cursor-pointer, .group')
      );
      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="hidden md:flex pointer-events-none fixed top-0 left-0 z-[9999] items-center justify-center will-change-transform"
    >
      {/* Outer Follower Ring */}
      <motion.div
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.75 : 1,
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.35)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{
          scale: { type: 'spring', damping: 20, stiffness: 350 },
          borderColor: { duration: 0.15 },
          backgroundColor: { duration: 0.15 },
        }}
        className="size-8 rounded-full border border-white/35 flex items-center justify-center"
      >
        {/* Inner Pointer Dot — Concentric exactly at center */}
        <motion.div
          animate={{
            scale: isClicked ? 0.5 : isHovered ? 1.3 : 1,
            opacity: isClicked ? 0.6 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="size-1.5 rounded-full bg-white"
        />
      </motion.div>
    </motion.div>
  );
}
