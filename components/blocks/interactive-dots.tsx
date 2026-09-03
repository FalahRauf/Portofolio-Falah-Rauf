'use client';

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { usePointer } from './pointer-context';

interface InteractiveDotsProps {
  count?: number;
  /** Distance in px at which a dot starts reacting. */
  radius?: number;
  /** How far a dot is pushed away at the centre of the field, in px. */
  strength?: number;
  className?: string;
}

interface Dot {
  id: number;
  xPct: number;
  yPct: number;
  size: number;
  opacity: number;
}

/* Spring feel: quick to react, settles without ringing. */
const SPRING = { stiffness: 180, damping: 18, mass: 0.5 };

/**
 * A single dot.
 *
 * It has to be its own component because useMotionValue/useSpring are hooks:
 * calling them inside a .map() or a useMemo would put a variable number of hook
 * calls inside one component and break the rules of hooks. One component per
 * dot gives each a stable, isolated hook identity.
 */
function DotItem({ dot }: { dot: Dot }) {
  // Target values, written by the shared RAF loop. Plain MotionValues: writing
  // to them mutates the value and schedules a transform update without
  // re-rendering React.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);

  // Springs smooth the jumps between RAF frames.
  const x = useSpring(targetX, SPRING);
  const y = useSpring(targetY, SPRING);
  const scale = useSpring(targetScale, SPRING);

  // Register this dot's raw targets so the parent's single RAF loop can drive
  // it. Context-scoped, so it lands in this field's registry only.
  const registry = useContext(RegistryContext);
  useEffect(() => {
    if (!registry) return;
    registry.set(dot.id, { x: targetX, y: targetY, scale: targetScale });
    return () => {
      registry.delete(dot.id);
    };
  }, [registry, dot.id, targetX, targetY, targetScale]);

  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={{
        left: `${dot.xPct}%`,
        top: `${dot.yPct}%`,
        width: dot.size,
        height: dot.size,
        opacity: dot.opacity,
        x,
        y,
        scale,
      }}
    />
  );
}

/* Per-instance registry the RAF loop writes into.
   Scoped to one <InteractiveDots> via context rather than module-level, so two
   instances on the same page (hero + a section) never share dot state. */
type DotTargets = {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  scale: ReturnType<typeof useMotionValue<number>>;
};
const RegistryContext = createContext<Map<number, DotTargets> | null>(null);

/**
 * Star field that reacts to the cursor: dots within `radius` are pushed
 * radially outward and grow slightly, then spring back when it leaves.
 *
 * Performance — this sits on a page that also runs Lenis smooth scroll, so it
 * is built to do zero React work while the mouse moves:
 *   1. Pointer position comes from a shared MotionValue, never from state.
 *   2. One RAF loop for the whole field, not one per dot.
 *   3. Each dot's centre is measured on mount/resize/scroll only. Calling
 *      getBoundingClientRect() per dot per frame is what makes effects like
 *      this stutter.
 *   4. Dots outside the viewport skip the maths entirely.
 */
export default function InteractiveDots({
  count = 45,
  radius = 130,
  strength = 26,
  className = '',
}: InteractiveDotsProps) {
  const { mouseX, mouseY, active } = usePointer();
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Deterministic scatter. No Math.random(): it would produce different values
  // on the server and the client and cause a hydration mismatch.
  const dots = useMemo<Dot[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        xPct: ((i * 19) % 97) + 1.5,
        yPct: ((i * 29) % 93) + 3,
        size: (i % 2) + 1,
        opacity: ((i % 5) + 3) * 0.1,
      })),
    [count]
  );

  // One registry per field instance. Created with useRef so it's stable across
  // renders, and populated by each DotItem on mount.
  const registry = useRef<Map<number, DotTargets>>(new Map()).current;

  // Measured centres, in viewport coordinates, refreshed on resize/scroll only.
  const centres = useRef<{ x: number; y: number }[]>([]);

  const measure = useRef(() => {});
  measure.current = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    centres.current = dots.map((dot) => ({
      x: rect.left + (dot.xPct / 100) * rect.width,
      y: rect.top + (dot.yPct / 100) * rect.height,
    }));
  };

  useEffect(() => {
    const onMeasure = () => measure.current();
    onMeasure();
    window.addEventListener('resize', onMeasure);
    window.addEventListener('scroll', onMeasure, { passive: true });
    return () => {
      window.removeEventListener('resize', onMeasure);
      window.removeEventListener('scroll', onMeasure);
    };
  }, [dots]);

  useEffect(() => {
    if (reduceMotion) {
      // Honour reduced motion: hold every dot at rest.
      registry.forEach((t) => {
        t.x.set(0);
        t.y.set(0);
        t.scale.set(1);
      });
      return;
    }

    let raf = 0;
    const tick = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      const isActive = active.get() === 1;
      const viewH = window.innerHeight;
      const viewW = window.innerWidth;

      for (let i = 0; i < dots.length; i++) {
        const centre = centres.current[i];
        const targets = registry.get(dots[i].id);
        if (!centre || !targets) continue;

        const offscreen =
          centre.y < -radius || centre.y > viewH + radius || mx < -radius || mx > viewW + radius;

        if (!isActive || offscreen) {
          targets.x.set(0);
          targets.y.set(0);
          targets.scale.set(1);
          continue;
        }

        const dx = centre.x - mx;
        const dy = centre.y - my;
        const dist = Math.hypot(dx, dy);

        if (dist >= radius || dist === 0) {
          targets.x.set(0);
          targets.y.set(0);
          targets.scale.set(1);
          continue;
        }

        // Squared falloff: full push at the cursor, nothing at the field edge.
        // The curve makes it read as a soft magnetic repel, not a hard shove.
        const t = 1 - dist / radius;
        const falloff = t * t;
        const push = falloff * strength;

        targets.x.set((dx / dist) * push);
        targets.y.set((dy / dist) * push);
        targets.scale.set(1 + falloff * 0.9);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dots, mouseX, mouseY, active, radius, strength, reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-[1] pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <RegistryContext.Provider value={registry}>
        {dots.map((dot) => (
          <DotItem key={dot.id} dot={dot} />
        ))}
      </RegistryContext.Provider>
    </div>
  );
}
