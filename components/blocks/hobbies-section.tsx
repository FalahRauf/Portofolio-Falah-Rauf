'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BlurFadeIn } from './motion-primitives';

interface SongItem {
  id: string;
  title: string;
  artist: string;
  coverSrc: string;
  audioSrc: string;
  genre: string;
  discTheme: 'laufey' | 'oasis' | 'mac';
}

const favoriteSongs: SongItem[] = [
  {
    id: 'laufey',
    title: 'Beautiful Stranger',
    artist: 'Laufey',
    coverSrc: '/assets/laufey-album.webp',
    audioSrc: '/assets/beautiful-stranger-full.mp3',
    genre: 'Jazz / Bossa',
    discTheme: 'laufey',
  },
  {
    id: 'oasis',
    title: 'Champagne Supernova',
    artist: 'Oasis',
    coverSrc: '/assets/oasis-cover.webp',
    audioSrc: '/assets/champagne-supernova.mp3',
    genre: 'Britpop / Rock',
    discTheme: 'oasis',
  },
  {
    id: 'mac',
    title: 'Moonlight on the River',
    artist: 'Mac DeMarco',
    coverSrc: '/assets/mac-cover.webp',
    audioSrc: '/assets/moonlight-on-the-river.mp3',
    genre: 'Indie Rock / Lo-fi',
    discTheme: 'mac',
  },
];

export default function HobbiesSection() {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const togglePlay = (id: string) => {
    // Pause previous audio if switching
    if (currentPlaying && currentPlaying !== id) {
      const prevAudio = audioRefs.current[currentPlaying];
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    const currentAudio = audioRefs.current[id];
    if (!currentAudio) return;

    if (currentPlaying === id) {
      currentAudio.pause();
      setCurrentPlaying(null);
    } else {
      currentAudio.play().catch((e) => console.log('Playback error:', e));
      setCurrentPlaying(id);
    }
  };

  return (
    <section id="hobbies" className="w-full bg-neutral-950 text-white py-24 md:py-36 relative z-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Section Tag */}
        <BlurFadeIn className="mb-4">
          <p className="text-xs md:text-sm tracking-[0.3em] text-neutral-400 font-mono uppercase">
            [002]
          </p>
        </BlurFadeIn>

        {/* Section Heading */}
        <BlurFadeIn delay={0.1} className="mb-14">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-3 uppercase">
            Hobby
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Eksplorasi musikalitas, irama instrumen, dan lagu pengiring fokus ngoding.
          </p>
        </BlurFadeIn>

        {/* 1. Interactive Instrument Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* GITAR CARD */}
          <BlurFadeIn delay={0.15}>
            <div className="group rounded-3xl border border-white/10 bg-neutral-900/80 p-7 flex flex-col justify-between shadow-2xl hover:border-amber-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Strings</span>
                <span className="text-xs font-mono text-amber-400">Acoustic</span>
              </div>
              {/* Guitar Illustration SVG */}
              <div className="h-36 flex items-center justify-center my-3 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-32 w-auto" viewBox="0 0 200 270" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="88" y="2" width="26" height="30" rx="6" fill="#5c381e" />
                  <circle cx="94" cy="10" r="2.5" fill="#fcd34d" />
                  <circle cx="101" cy="10" r="2.5" fill="#fcd34d" />
                  <circle cx="108" cy="10" r="2.5" fill="#fcd34d" />
                  <rect x="93" y="30" width="15" height="105" rx="3" fill="#784824" />
                  <circle cx="100" cy="168" r="46" fill="#b45309" />
                  <circle cx="100" cy="212" r="60" fill="#d97706" />
                  <circle cx="100" cy="172" r="21" fill="#451a03" />
                  <circle cx="100" cy="172" r="17" fill="#1c1917" />
                  <rect x="78" y="240" width="44" height="9" rx="3" fill="#451a03" />
                  <line x1="96" y1="34" x2="96" y2="242" stroke="#fef3c7" strokeWidth="1.5" />
                  <line x1="100.5" y1="34" x2="100.5" y2="242" stroke="#fef3c7" strokeWidth="1.5" />
                  <line x1="105" y1="34" x2="105" y2="242" stroke="#fef3c7" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <h3 className="text-xl font-bold text-white tracking-tight">Gitar Akustik &amp; Elektrik</h3>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">Menemukan progresi akord dan melodi pengiring saat istirahat.</p>
              </div>
            </div>
          </BlurFadeIn>

          {/* DRUM CARD */}
          <BlurFadeIn delay={0.25}>
            <div className="group rounded-3xl border border-white/10 bg-neutral-900/80 p-7 flex flex-col justify-between shadow-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Percussion</span>
                <span className="text-xs font-mono text-blue-400">Rhythm</span>
              </div>
              {/* Drum Illustration SVG */}
              <div className="h-36 flex items-center justify-center my-3 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-32 w-auto" viewBox="0 0 220 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="62" y="92" width="96" height="66" rx="10" fill="#1e3a8a" />
                  <rect x="58" y="150" width="104" height="12" rx="6" fill="#172554" />
                  <line x1="82" y1="96" x2="82" y2="148" stroke="#3b82f6" strokeWidth="3" />
                  <line x1="110" y1="96" x2="110" y2="148" stroke="#3b82f6" strokeWidth="3" />
                  <line x1="138" y1="96" x2="138" y2="148" stroke="#3b82f6" strokeWidth="3" />
                  <ellipse cx="110" cy="92" rx="54" ry="16" fill="#1e40af" />
                  <ellipse cx="110" cy="89" rx="48" ry="12.5" fill="#f8fafc" />
                  <line x1="38" y1="38" x2="96" y2="84" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="96" cy="84" r="4.5" fill="#b45309" />
                  <line x1="182" y1="38" x2="124" y2="84" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="124" cy="84" r="4.5" fill="#b45309" />
                </svg>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <h3 className="text-xl font-bold text-white tracking-tight">Drum &amp; Beat</h3>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">Menjaga tempo, dinamika ritmis, dan sinkronisasi beat lagu.</p>
              </div>
            </div>
          </BlurFadeIn>

          {/* PIANO CARD */}
          <BlurFadeIn delay={0.35}>
            <div className="group rounded-3xl border border-white/10 bg-neutral-900/80 p-7 flex flex-col justify-between shadow-2xl hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Keys</span>
                <span className="text-xs font-mono text-purple-400">Harmony</span>
              </div>
              {/* Piano Keys Visual */}
              <div className="h-36 flex items-center justify-center my-3 group-hover:scale-105 transition-transform duration-300">
                <div className="flex bg-neutral-950 p-2.5 rounded-xl border border-white/15 shadow-2xl relative">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
                    <div
                      key={k}
                      className="w-5 sm:w-6 h-20 bg-white border-r border-neutral-300 rounded-b-sm first:rounded-bl-md last:rounded-br-md last:border-r-0 shadow-sm"
                    />
                  ))}
                  {/* Black Keys */}
                  <div className="absolute left-[28px] top-2.5 w-3.5 h-12 bg-neutral-950 rounded-b-sm shadow-md" />
                  <div className="absolute left-[52px] top-2.5 w-3.5 h-12 bg-neutral-950 rounded-b-sm shadow-md" />
                  <div className="absolute left-[100px] top-2.5 w-3.5 h-12 bg-neutral-950 rounded-b-sm shadow-md" />
                  <div className="absolute left-[124px] top-2.5 w-3.5 h-12 bg-neutral-950 rounded-b-sm shadow-md" />
                  <div className="absolute left-[148px] top-2.5 w-3.5 h-12 bg-neutral-950 rounded-b-sm shadow-md" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <h3 className="text-xl font-bold text-white tracking-tight">Keyboard &amp; Piano</h3>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">Harmonisasi akord dan melodi tuts piano untuk aransemen santai.</p>
              </div>
            </div>
          </BlurFadeIn>
        </div>

        {/* 2. Favorite Music Section — Exact 3-Card Layout matching Screenshot */}
        <div className="pt-10 border-t border-white/10">
          <BlurFadeIn delay={0.1} className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase font-mono">
              Favorite Music
            </h3>
          </BlurFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14 items-start">
            {favoriteSongs.map((song, sIdx) => {
              const isPlaying = currentPlaying === song.id;
              return (
                <BlurFadeIn key={song.id} delay={0.15 + sIdx * 0.1} className="flex flex-col items-center text-center w-full">
                  {/* Audio Element */}
                  <audio
                    ref={(el) => {
                      audioRefs.current[song.id] = el;
                    }}
                    src={song.audioSrc}
                    onEnded={() => setCurrentPlaying(null)}
                    preload="none"
                  />

                  {/* Album Cover with Overlapping CD Disc */}
                  <div
                    onClick={() => togglePlay(song.id)}
                    className="relative w-[240px] sm:w-[260px] h-[240px] sm:h-[260px] mb-6 cursor-pointer select-none group"
                  >
                    {/* Front Album Jacket Cover */}
                    <div className="relative z-10 w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-neutral-800 shadow-[0_12px_36px_rgba(0,0,0,0.7)]">
                      <Image
                        src={song.coverSrc}
                        alt={`${song.title} - ${song.artist}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-102"
                        sizes="280px"
                      />
                    </div>

                    {/* Realistic Spinning CD Vinyl Disc on top of album (z-20) */}
                    <motion.div
                      animate={{
                        rotate: isPlaying ? 360 : 0,
                      }}
                      transition={{
                        rotate: { repeat: Infinity, duration: 2.2, ease: 'linear' },
                      }}
                      className="absolute -right-4 -bottom-4 size-28 sm:size-32 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.6)] z-20 flex items-center justify-center overflow-hidden border-2 border-white/30 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background:
                          song.discTheme === 'laufey'
                            ? 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), transparent 46%), conic-gradient(from 210deg, #f6ead8, #efc9c0, #fdf3e0, #d8c8a8, #f3d9d2, #c9b98f, #f8eee0, #b7a88a, #f2dcd3, #efc9c0, #f6ead8)'
                            : song.discTheme === 'oasis'
                            ? 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), transparent 46%), conic-gradient(from 210deg, #e2e8f0, #cbd5e1, #94a3b8, #cbd5e1, #f1f5f9, #94a3b8, #cbd5e1, #e2e8f0)'
                            : 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), transparent 46%), conic-gradient(from 210deg, #fef3c7, #fde68a, #f59e0b, #d97706, #fde68a, #fef3c7, #d97706, #fef3c7)',
                      }}
                    >
                      {/* CD Concentric Grooves */}
                      <div className="absolute inset-2.5 rounded-full border border-black/15" />
                      <div className="absolute inset-5 rounded-full border border-black/15" />
                      <div className="absolute inset-7.5 rounded-full border border-black/15" />
                      <div className="absolute inset-10 rounded-full border border-black/15" />

                      {/* CD Center Spindle Hub */}
                      <div className="size-8 sm:size-9 rounded-full bg-neutral-900 border-2 border-white/80 shadow-inner flex items-center justify-center">
                        <div className="size-2.5 rounded-full bg-neutral-950 border border-neutral-700" />
                      </div>
                    </motion.div>
                  </div>

                  {/* 4 Amber / Gold Dots (Exactly like screenshot) */}
                  <div className="flex items-center justify-center gap-2 mb-3 mt-1">
                    <span className={`size-1.5 rounded-full transition-colors ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-amber-500'}`} />
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    <span className="size-1.5 rounded-full bg-amber-500" />
                  </div>

                  {/* Track Title (Bold) */}
                  <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                    {song.title}
                  </h4>

                  {/* Artist Name (Muted) */}
                  <p className="text-sm font-medium text-neutral-400 mt-1">
                    {song.artist}
                  </p>
                </BlurFadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
