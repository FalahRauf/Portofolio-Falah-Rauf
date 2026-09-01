'use client';

import { useEffect } from 'react';
import CustomCursor from '@/components/blocks/custom-cursor';
import { AnimatedNavFramer } from '@/components/ui/navigation-menu';
import SmoothScrollProvider from '@/components/blocks/smooth-scroll-provider';
import HeroKintaro from '@/components/blocks/hero-kintaro';
import AboutSection from '@/components/blocks/about-section';
import HobbiesSection from '@/components/blocks/hobbies-section';
import StackKintaro from '@/components/blocks/stack-kintaro';
import ProjectsHorizontal from '@/components/blocks/projects-horizontal';
import TaglineMarquee from '@/components/blocks/tagline-marquee';
import SectionMarker from '@/components/blocks/section-marker';
import TimelineRoadmap from '@/components/blocks/timeline-roadmap';
import ContactBlock from '@/components/blocks/contact-block';
import { BlurFadeIn } from '@/components/blocks/motion-primitives';

const taglines = [
  'ARCHITECTURAL INTEGRITY',
  'FIRST PRINCIPLES THINKING',
  'PERFORMANCE WITHOUT COMPROMISE',
  'SCALABLE VISION',
  'RADICAL TRANSPARENCY',
  'INTENTIONAL MINIMALISM',
];

// Left column portraits (Scrolls UP infinitely) — local assets from Falah's photo archive
const portraitsLeft = [
  '/assets/hero/hero-1-building-night.jpg',
  '/assets/hero/hero-2-practice-studio.jpg',
  '/assets/hero/hero-3-tech-wave.jpg',
  '/assets/hero/hero-4-classmates.jpg',
  '/assets/hero/hero-9-cat.jpg',
];

// Right column portraits (Scrolls DOWN infinitely) — local assets from Falah's photo archive
const portraitsRight = [
  '/assets/hero/hero-5-headbands.jpg',
  '/assets/hero/hero-6-orangutan-meme.jpg',
  '/assets/hero/hero-7-building-nightscape.jpg',
  '/assets/hero/hero-8-hamburgur-meme.jpg',
  '/assets/hero/hero-10-classroom.jpg',
];

const projects = [
  {
    title: 'Raft Survival 2D',
    category: 'Game Design',
    year: '2024',
    imageSrc: '/assets/preview-raft.png',
    href: 'https://gd.games/sumbuldpk/raft-survival-2d',
    description:
      'Game survival laut bergaya pixel art: mengumpulkan sumber daya di atas rakit, crafting perlengkapan, dan menghindari hiu ganas.',
  },
  {
    title: 'Chroclock',
    category: 'E-Commerce Platform',
    year: '2026',
    imageSrc: '/assets/preview-chroclock.png',
    href: 'https://github.com/arbanyvolt/webPSAS',
    description:
      'Website e-commerce jam tangan luxury modern dengan autentikasi multi-user, katalog terstruktur, dan Midtrans Payment Gateway.',
  },
  {
    title: 'AsetKita',
    category: 'AI Finance Web App',
    year: '2025',
    imageSrc: '/assets/preview-asetkita.png',
    href: 'https://github.com/KiandrAHD/AsetKita',
    description:
      'Platform monitoring portofolio aset berbasis kecerdasan buatan, visualisasi market realtime, dan integrasi Firebase cloud database.',
  },
];

// Riwayat Pendidikan asli Falah
const educationRoadmap = [
  {
    year: '2021 — 2024',
    title: 'SMP Telkom Purwokerto',
    description:
      'Awal perjalanan menempa dasar akademik dan mulai mengenal dunia teknologi, algoritma, serta komputer.',
    tags: ['Junior High School', 'Basic Computing', 'Logic'],
  },
  {
    year: '2024 — Sekarang',
    title: 'SMK Telkom Purwokerto — Kelas XI PPLG 4',
    description:
      'Sedang mendalami pengembangan perangkat lunak dan gim (PPLG), arsitektur web modern (React, Next.js, TypeScript, PHP/MySQL), sambil terus menekuni hobi musik dan game.',
    tags: ['Software Engineering', 'Web Development', 'Full-Stack Ecosystem', 'Game Design'],
  },
];

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
        {/* Interactive Custom Concentric Mouse Follower */}
        <CustomCursor />

        {/* Floating Animated Pill Navbar */}
        <AnimatedNavFramer />

        {/* ============================================================
            HOME & ABOUT STACKED SLIDE (Direct Slide-Up, No Marquee between them)
            Pattern: Home stays pinned at sticky top-0, About slides directly
            up over Home with rounded-t-3xl card styling.
            ============================================================ */}
        <article className="relative">
          {/* PANEL 1: HOME / HERO (Sticky) */}
          <span id="hero" />
          <section className="sticky top-0 h-screen w-full bg-neutral-950 overflow-hidden z-10">
            <HeroKintaro
              portraitsCol1={portraitsLeft}
              portraitsCol2={portraitsRight}
            />
          </section>

          {/* PANEL 2: ABOUT (Dark card slides up over Home) */}
          <div
            id="about"
            className="relative z-20 bg-neutral-950 rounded-t-3xl border-t border-white/10 shadow-[0_-30px_80px_rgba(0,0,0,0.85)]"
          >
            <AboutSection />
          </div>
        </article>

        {/* Tagline Marquee Separator between About & Hobby (Direction: Kiri ke Kanan / 'right') */}
        <TaglineMarquee items={taglines} direction="right" speed={38} />

        {/* ============================================================
            3. HOBBIES & MUSIC PLAYER
            ============================================================ */}
        <div id="hobbies" className="relative z-20 bg-neutral-950">
          <HobbiesSection />
        </div>

        {/* Tagline Marquee Separator (Direction: Kanan ke Kiri / 'left') */}
        <TaglineMarquee items={taglines} direction="left" />

        {/* ============================================================
            4. SKILLS (Interactive Category Grid with Brand Hover Tooltips)
            ============================================================ */}
        <StackKintaro />

        {/* Tagline Marquee Separator (Direction: Kiri ke Kanan / 'right') */}
        <TaglineMarquee items={taglines} direction="right" speed={35} />

        {/* ============================================================
            5. PROJECTS (Horizontal Pinned Scroll Gallery - 3 Projects + END)
            Pinned full-screen viewport. Scrolls right-to-left till END.
            ============================================================ */}
        <ProjectsHorizontal projects={projects} />

        {/* Tagline Marquee Separator (Direction: Kanan ke Kiri / 'left') */}
        <TaglineMarquee items={taglines} direction="left" />

        {/* ============================================================
            6. ROADMAP (Riwayat Pendidikan Falah)
            ============================================================ */}
        <section id="roadmap" className="py-24 md:py-36 bg-neutral-950">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <BlurFadeIn className="mb-4">
              <p className="text-xs md:text-sm tracking-[0.3em] text-neutral-500 font-mono uppercase">
                [004]
              </p>
            </BlurFadeIn>
            <BlurFadeIn delay={0.1} className="mb-6">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
                Roadmap
              </h2>
            </BlurFadeIn>
            <BlurFadeIn delay={0.2} className="mb-14">
              <p className="text-lg md:text-xl text-neutral-400 max-w-3xl leading-relaxed">
                Riwayat perjalanan akademik dan eksplorasi teknologi yang saya tekuni.
              </p>
            </BlurFadeIn>
          </div>
          <TimelineRoadmap entries={educationRoadmap} />
        </section>

        {/* ============================================================
            7. CONTACT (Logo Icon Only) & FOOTER
            ============================================================ */}
        <ContactBlock
          email="falahraufaw@gmail.com"
          phone="+62 822-1188-2448"
          github="https://github.com/FalahRauf"
          instagram="https://instagram.com/sumbulheker"
        />

        <footer className="max-w-6xl mx-auto px-6 md:px-12 pb-14 text-center text-xs font-mono text-neutral-600 border-t border-white/10 pt-8 tracking-widest uppercase bg-neutral-950">
          &copy; 2026 FALAH RAUF ALVARO WARADANA. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
