'use client';

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

/**
 * Shares the pointer position as MotionValues instead of React state.
 *
 * This is the whole reason the effect can run at pointer-event rate without
 * tanking the page: writing to a MotionValue does NOT trigger a React render.
 * If this were useState, every mouse move would re-render the provider and
 * every consumer below it — on a page that already runs Lenis smooth scroll.
 *
 * Consumers read mouseX/mouseY in a useAnimationFrame / useTransform and write
 * straight to the DOM via motion style, so React never re-renders at all.
 */
interface PointerContextValue {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  /** True while the pointer is actually over the window. */
  active: MotionValue<number>;
}

const PointerContext = createContext<PointerContextValue | null>(null);

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const active = useMotionValue(0);

  useEffect(() => {
    // Touch / coarse pointers have no hover position to track.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      active.set(1);
    };
    const onLeave = () => active.set(0);
    const onEnter = () => active.set(1);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [mouseX, mouseY, active]);

  const value = useMemo(() => ({ mouseX, mouseY, active }), [mouseX, mouseY, active]);

  return <PointerContext.Provider value={value}>{children}</PointerContext.Provider>;
}

export function usePointer(): PointerContextValue {
  const ctx = useContext(PointerContext);
  // Fall back to inert values so the dots component still works if it's ever
  // dropped outside the provider (e.g. the /demo page).
  const fallbackX = useMotionValue(-9999);
  const fallbackY = useMotionValue(-9999);
  const fallbackActive = useMotionValue(0);
  const fallback = useMemo(
    () => ({ mouseX: fallbackX, mouseY: fallbackY, active: fallbackActive }),
    [fallbackX, fallbackY, fallbackActive]
  );
  return ctx ?? fallback;
}

/** Convenience: run a callback on every animation frame with the pointer state. */
export function usePointerFrame(
  callback: (x: number, y: number, active: boolean) => void
) {
  const { mouseX, mouseY, active } = usePointer();
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      cb.current(mouseX.get(), mouseY.get(), active.get() === 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mouseX, mouseY, active]);
}
