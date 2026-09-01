'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, ArrowRight, Sparkles } from 'lucide-react';
import { BlurFadeIn } from './motion-primitives';

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="about" className="w-full bg-neutral-950 text-white py-24 md:py-36 flex items-center justify-center relative z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          {/* Section Marker */}
          <BlurFadeIn className="mb-6">
            <p className="text-xs md:text-sm tracking-[0.3em] text-neutral-500 font-mono uppercase">
              [001]
            </p>
          </BlurFadeIn>

          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-14 items-start">
            {/* ================= LEFT COLUMN: Title + Line + ID Badge ================= */}
            <BlurFadeIn delay={0.1} className="flex flex-col items-start">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
                ABOUT
              </h2>

              {/* Vertical connecting line */}
              <div className="relative pl-6 flex flex-col items-start my-1">
                <div className="size-2 rounded-full border border-neutral-500 bg-neutral-950 -ml-[3px] mb-1" />
                <div className="w-px h-24 md:h-32 bg-neutral-700 ml-[0.5px]" />
              </div>

              {/* ID Badge Card */}
              <div className="w-full max-w-[190px] rounded-2xl border border-white/10 bg-neutral-900/90 p-5 flex flex-col items-center text-center shadow-xl backdrop-blur-md">
                <div className="size-14 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 mb-3 shadow-inner">
                  <User className="size-6 text-neutral-300" />
                </div>
                <h3 className="font-bold text-sm tracking-wider text-white uppercase font-mono">
                  FALAH
                </h3>
                <p className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mt-0.5">
                  DEVELOPER
                </p>
              </div>
            </BlurFadeIn>

            {/* ================= RIGHT COLUMN: Typography & Read Full Version ================= */}
            <div className="pt-2 flex flex-col justify-between">
              {/* Mission Statement Headline */}
              <BlurFadeIn delay={0.15}>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-tight mb-8 text-white">
                  I&apos;m a{' '}
                  <span className="italic font-serif font-normal text-neutral-300">
                    Full Stack Developer
                  </span>{' '}
                  focused on building{' '}
                  <span className="font-bold text-white">
                    clean and sustainable systems.
                  </span>
                </p>
              </BlurFadeIn>

              {/* Bio Paragraph */}
              <BlurFadeIn delay={0.25}>
                <p className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed mb-8">
                  I&apos;m someone who loves{' '}
                  <span className="text-white font-semibold">learning new things</span> and
                  constantly tries to put what I learn into practice. I develop{' '}
                  <span className="italic font-serif text-neutral-200">web</span> and{' '}
                  <span className="italic font-serif text-neutral-200">desktop</span>{' '}
                  applications. I enjoy working with simple,{' '}
                  <span className="text-white font-semibold">practical</span>, and{' '}
                  <span className="text-white font-semibold">sustainable</span> tools.
                </p>
              </BlurFadeIn>

              {/* Additional Highlights Row */}
              <BlurFadeIn delay={0.35}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Major</p>
                    <p className="text-sm font-semibold text-white mt-1">XI PPLG 4</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">School</p>
                    <p className="text-sm font-semibold text-white mt-1">SMK Telkom</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Focus</p>
                    <p className="text-sm font-semibold text-white mt-1">Web & Systems</p>
                  </div>
                </div>
              </BlurFadeIn>

              {/* "Read Full Version" Button */}
              <BlurFadeIn delay={0.4}>
                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group inline-flex items-center gap-2 text-sm md:text-base font-semibold tracking-wide text-white hover:text-neutral-300 transition-colors pb-1 border-b border-white cursor-pointer"
                  >
                    <span>Read Full Version</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </BlurFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODAL FULL VERSION ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 size-9 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 text-white mb-6">
                <Sparkles className="size-5 text-indigo-400" />
                <h3 className="text-2xl font-bold tracking-tight">
                  About
                </h3>
              </div>

              {/* Modal Body Content */}
              <div className="space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                <p>
                  Hi, I&apos;m <span className="text-white font-bold">Falah</span>; my full name is{' '}
                  <span className="text-white font-bold">Falah Rauf Alvaro Waradana</span>. I am a student
                  at SMK Telkom Purwokerto majoring in Software Engineering (PPLG), actively learning and building modern web applications.
                </p>

                <p>
                  I mainly work on web development, using technologies like{' '}
                  <span className="italic font-serif text-white">React</span>,{' '}
                  <span className="italic font-serif text-white">Next.js</span>,{' '}
                  <span className="italic font-serif text-white">Tailwind CSS</span>,{' '}
                  <span className="italic font-serif text-white">TypeScript</span>,{' '}
                  <span className="italic font-serif text-white">PHP / Laravel</span>, and{' '}
                  <span className="italic font-serif text-white">MySQL / Firebase</span>. Along with these, I develop interactive game applications and explore modern UI patterns with passion.
                </p>

                <p>
                  Whenever I see a new technology, animation library, or UI pattern, I immediately start experimenting with it; I love learning, which constantly drives me to explore new frontend and system engineering paradigms.
                </p>

                <p>
                  I pay great attention to making my projects as{' '}
                  <span className="text-white font-bold">clean, understandable, and sustainable</span> as possible. I care deeply about micro-interactions, layout precision, and fluid motion physics.
                </p>

                <p>
                  My current goal is to specialize in{' '}
                  <span className="text-white font-bold">modern full-stack web architecture and motion design</span>, taking projects from concept to highly polished, production-ready digital experiences.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
