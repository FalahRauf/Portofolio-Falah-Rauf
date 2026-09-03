"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Was: 36 <motion.path> per instance x2 instances = 72 nodes whose `pathLength`,
// `opacity` and `pathOffset` Framer Motion rewrote every single frame. Each write
// dirties the SVG and forces a re-render + repaint of the whole subtree, forever,
// even while scrolling.
//
// Now: identical 36 paths, identical `d`, identical strokeWidth/strokeOpacity, but
// the draw + fade is a pure CSS animation on stroke-dasharray/offset. No React in
// the loop. Durations are deterministic (not Math.random(), which also caused a
// hydration mismatch on every SSR render).

function FloatingPaths({ position, seedOffset }: { position: number; seedOffset: number }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
        // Deterministic spread across 28-42s, mirroring the old random range.
        duration: 28 + ((i * 7 + seedOffset * 3) % 14),
        delay: -((i * 11 + seedOffset * 5) % 20),
      })),
    [position, seedOffset]
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            pathLength={1}
            className="animate-float-path"
            style={{
              strokeOpacity: 0.1 + path.id * 0.03,
              animationDuration: `${path.duration}s`,
              animationDelay: `${path.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
}: {
  title?: string;
}) {
  const words = title.split(" ");

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <FloatingPaths position={1} seedOffset={0} />
        <FloatingPaths position={-1} seedOffset={7} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-4 last:mr-0"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                        dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

export default BackgroundPaths;
