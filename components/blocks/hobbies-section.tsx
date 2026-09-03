'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Music2, Guitar, Piano, Drum, AudioWaveform } from 'lucide-react';
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

/* Instruments.
   One icon system for all three: stroke-based, currentColor, identical optical
   weight. The previous version mixed two detailed skeuomorphic illustrations
   with a hand-positioned pile of <div>s for the piano, which read as three
   unrelated components sitting next to each other. */
const instruments = [
  {
    id: 'strings',
    label: 'Strings',
    accent: 'amber',
    Icon: Guitar,
    title: 'Gitar Akustik & Elektrik',
    desc: 'Menemukan progresi akord dan melodi pengiring saat istirahat.',
    ring: 'group-hover:border-amber-400/40',
    icon: 'text-amber-300',
    glow: 'group-hover:shadow-[0_0_40px_-12px_rgba(251,191,36,0.45)]',
  },
  {
    id: 'percussion',
    label: 'Percussion',
    accent: 'blue',
    Icon: Drum,
    title: 'Drum & Beat',
    desc: 'Menjaga tempo, dinamika ritmis, dan sinkronisasi beat lagu.',
    ring: 'group-hover:border-sky-400/40',
    icon: 'text-sky-300',
    glow: 'group-hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.45)]',
  },
  {
    id: 'keys',
    label: 'Keys',
    accent: 'purple',
    Icon: Piano,
    title: 'Keyboard & Piano',
    desc: 'Harmonisasi akord dan melodi tuts piano untuk aransemen santai.',
    ring: 'group-hover:border-violet-400/40',
    icon: 'text-violet-300',
    glow: 'group-hover:shadow-[0_0_40px_-12px_rgba(167,139,250,0.45)]',
  },
];

const discThemes: Record<SongItem['discTheme'], string> = {
  laufey:
    'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), transparent 46%), conic-gradient(from 210deg, #f6ead8, #efc9c0, #fdf3e0, #d8c8a8, #f3d9d2, #c9b88f, #f8eee0, #b7a88a, #f2dcd3, #efc9c0, #f6ead8)',
  oasis:
    'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), transparent 46%), conic-gradient(from 210deg, #e2e8f0, #cbd5e1, #94a3b8, #cbd5e1, #f1f5f9, #94a3b8, #cbd5e1, #e2e8f0)',
  mac: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), transparent 46%), conic-gradient(from 210deg, #fef3c7, #fde68a, #f59e0b, #d97706, #fde68a, #fef3c7, #d97706, #fef3c7)',
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function HobbiesSection() {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const reduceMotion = useReducedMotion();

  // One interval for the active track rather than a `timeupdate` listener per
  // element — timeupdate fires 4x/sec each, and only one track can play at once.
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      const audio = currentId ? audioRefs.current[currentId] : null;
      if (!audio) return;
      setProgress(audio.currentTime);
      if (audio.duration && !Number.isNaN(audio.duration)) setDuration(audio.duration);
    }, 250);
    return () => window.clearInterval(id);
  }, [isPlaying, currentId]);

  const pauseAll = useCallback((except?: string) => {
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (!audio || id === except) return;
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  const togglePlay = useCallback(
    (id: string) => {
      const audio = audioRefs.current[id];
      if (!audio) return;

      if (currentId === id && isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      pauseAll(id);
      setCurrentId(id);
      setProgress(audio.currentTime);
      audio.play().catch(() => setIsPlaying(false));
    },
    [currentId, isPlaying, pauseAll]
  );

  const handleSeek = (id: string, event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRefs.current[id];
    if (!audio || !audio.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * audio.duration;
    setProgress(audio.currentTime);
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

        {/* 1. Instrument cards — one icon system, one layout rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24">
          {instruments.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <BlurFadeIn key={item.id} delay={0.15 + idx * 0.1} className="h-full">
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-7 flex flex-col transition-colors duration-300 ${item.ring} ${item.glow} focus-within:border-white/30`}
                >
                  {/* Accent wash — sits behind content, fades in on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(120% 80% at 50% 0%, currentColor 0%, transparent 60%)`,
                      color: 'transparent',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center justify-between mb-6">
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                      {item.label}
                    </span>
                    <Icon className={`size-5 ${item.icon}`} strokeWidth={1.5} aria-hidden="true" />
                  </div>

                  {/* Icon plate — same footprint for all three cards, so the
                      section reads as a set instead of three separate things */}
                  <div className="relative flex h-32 items-center justify-center mb-6">
                    <div
                      className={`absolute size-24 rounded-full border border-white/5 bg-white/[0.03] transition-transform duration-500 group-hover:scale-110 ${item.icon}`}
                      aria-hidden="true"
                    />
                    <Icon
                      className={`relative size-14 ${item.icon} transition-transform duration-500 group-hover:scale-105`}
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="relative mt-auto pt-5 border-t border-white/10">
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </BlurFadeIn>
            );
          })}
        </div>

        {/* 2. Favorite Music */}
        <div className="pt-10 border-t border-white/10">
          <BlurFadeIn delay={0.1} className="mb-12 flex items-center gap-3">
            <Music2 className="size-6 text-amber-300" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase font-mono">
              Favorite Music
            </h3>
          </BlurFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 items-start">
            {favoriteSongs.map((song, sIdx) => {
              const isActive = currentId === song.id;
              const activePlaying = isActive && isPlaying;
              const pct = duration ? (progress / duration) * 100 : 0;

              return (
                <BlurFadeIn
                  key={song.id}
                  delay={0.15 + sIdx * 0.1}
                  className="flex flex-col w-full"
                >
                  <audio
                    ref={(el) => {
                      audioRefs.current[song.id] = el;
                    }}
                    src={song.audioSrc}
                    preload="none"
                    onPlay={() => {
                      setCurrentId(song.id);
                      setIsPlaying(true);
                    }}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                      setIsPlaying(false);
                      setProgress(0);
                    }}
                    onLoadedMetadata={(e) => {
                      const d = e.currentTarget.duration;
                      if (Number.isFinite(d)) setDuration(d);
                    }}
                  />

                  {/* Album jacket + disc.
                      pr-6 / pb-6 reserves room for the overhanging disc so it
                      never gets clipped by the grid column edge — the old
                      -right-3/-bottom-3 pushed it outside the column and the
                      right-hand card's disc was cut off. */}
                  <div className="relative w-full aspect-square mb-5 pr-5 pb-5 sm:pr-6 sm:pb-6">
                    <div
                      className={`relative z-10 w-full h-full overflow-hidden rounded-2xl border bg-neutral-800 transition-all duration-300 ${
                        activePlaying
                          ? 'border-amber-400/60 shadow-[0_16px_44px_-8px_rgba(251,191,36,0.35)]'
                          : 'border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.7)]'
                      }`}
                    >
                      <Image
                        src={song.coverSrc}
                        alt={`${song.title} - ${song.artist}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 300px"
                      />

                      {/* Play overlay — the whole jacket is the hit area */}
                      <button
                        type="button"
                        onClick={() => togglePlay(song.id)}
                        aria-label={
                          activePlaying ? `Pause ${song.title}` : `Play ${song.title}`
                        }
                        aria-pressed={activePlaying}
                        className="group/play absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/45 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-amber-400"
                      >
                        <span
                          className={`flex size-16 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-2xl transition-all duration-300 ${
                            activePlaying
                              ? 'opacity-100 scale-100'
                              : 'opacity-0 scale-90 group-hover/play:opacity-100 group-hover/play:scale-100 group-focus-visible/play:opacity-100 group-focus-visible/play:scale-100'
                          }`}
                        >
                          {activePlaying ? (
                            <Pause className="size-6" strokeWidth={2} />
                          ) : (
                            // Nudge right so the triangle looks optically centred
                            <Play className="size-6 translate-x-0.5" strokeWidth={2} />
                          )}
                        </span>
                      </button>
                    </div>

                    {/* Vinyl disc */}
                    <motion.div
                      animate={activePlaying ? { rotate: 360 } : { rotate: 0 }}
                      transition={
                        activePlaying
                          ? { repeat: Infinity, duration: 2.2, ease: 'linear' }
                          : { duration: 0.4, ease: 'easeOut' }
                      }
                      style={{ transformOrigin: '50% 50%' }}
                      className="pointer-events-none absolute right-0 bottom-0 size-24 sm:size-28 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] z-20 flex items-center justify-center overflow-hidden border-2 border-white/30"
                      aria-hidden="true"
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: discThemes[song.discTheme] }}
                      />
                      <div className="absolute inset-[8%] rounded-full border border-black/15" />
                      <div className="absolute inset-[18%] rounded-full border border-black/15" />
                      <div className="absolute inset-[28%] rounded-full border border-black/15" />
                      <div className="absolute inset-[38%] rounded-full border border-black/15" />
                      <div className="size-7 sm:size-8 rounded-full bg-neutral-900 border-2 border-white/80 shadow-inner flex items-center justify-center">
                        <div className="size-2 rounded-full bg-neutral-950 border border-neutral-700" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Meta + transport */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-lg font-bold text-white tracking-tight leading-snug truncate">
                        {song.title}
                      </h4>
                      <p className="text-sm font-medium text-neutral-400 mt-0.5">{song.artist}</p>
                    </div>

                    {/* Equalizer — visible state for "this track is playing" */}
                    <div
                      className="flex shrink-0 items-end gap-[3px] h-5 pt-1"
                      aria-hidden="true"
                    >
                      {[0, 1, 2, 3].map((dotIdx) => (
                        <motion.span
                          key={dotIdx}
                          className={`w-[3px] rounded-full ${
                            activePlaying ? 'bg-amber-400' : 'bg-neutral-700'
                          }`}
                          style={{ originY: 1 }}
                          animate={
                            activePlaying
                              ? { height: ['20%', '100%', '45%', '80%', '20%'] }
                              : { height: '20%' }
                          }
                          transition={
                            activePlaying
                              ? {
                                  duration: 0.9,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: dotIdx * 0.12,
                                }
                              : { duration: 0.3, ease: 'easeOut' }
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                    {song.genre}
                  </p>

                  {/* Seek bar — only meaningful once the track is the active one */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div
                          onClick={(e) => handleSeek(song.id, e)}
                          role="slider"
                          tabIndex={0}
                          aria-label={`Seek ${song.title}`}
                          aria-valuemin={0}
                          aria-valuemax={Math.round(duration)}
                          aria-valuenow={Math.round(progress)}
                          aria-valuetext={`${formatTime(progress)} of ${formatTime(duration)}`}
                          onKeyDown={(e) => {
                            const audio = audioRefs.current[song.id];
                            if (!audio || !audio.duration) return;
                            if (e.key === 'ArrowRight') {
                              audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
                              setProgress(audio.currentTime);
                            } else if (e.key === 'ArrowLeft') {
                              audio.currentTime = Math.max(audio.currentTime - 5, 0);
                              setProgress(audio.currentTime);
                            }
                          }}
                          // 44px tall hit area — the visible bar is 4px, but the
                          // touch target has to be finger-sized.
                          className="group/seek mt-3 flex h-11 cursor-pointer items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 rounded"
                        >
                          <div className="relative h-1 w-full rounded-full bg-white/10">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-amber-400 transition-[width] duration-200 ease-linear"
                              style={{ width: `${pct}%` }}
                            />
                            <div
                              className="absolute top-1/2 size-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-amber-400 opacity-0 transition-opacity group-hover/seek:opacity-100"
                              style={{ left: `${pct}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between font-mono text-[10px] text-neutral-500 -mt-5">
                          <span>{formatTime(progress)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                      <AudioWaveform className="size-3" strokeWidth={1.5} aria-hidden="true" />
                      Klik sampul untuk memutar
                    </p>
                  )}
                </BlurFadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
