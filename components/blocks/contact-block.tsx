'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Github, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';
import { BlurFadeIn } from './motion-primitives';

interface ContactBlockProps {
  email: string;
  phone: string;
  github: string;
  instagram: string;
  whatsapp?: string;
}

export default function ContactBlock({
  email,
  phone,
  github,
  instagram,
  whatsapp = 'https://wa.me/6282211882448',
}: ContactBlockProps) {
  const socialIcons = [
    {
      name: 'Email',
      label: email,
      href: `mailto:${email}`,
      icon: Mail,
      color: 'hover:text-red-400 hover:border-red-400/50',
    },
    {
      name: 'WhatsApp',
      label: phone,
      href: whatsapp,
      icon: MessageCircle,
      color: 'hover:text-emerald-400 hover:border-emerald-400/50',
    },
    {
      name: 'Instagram',
      label: '@sumbulheker',
      href: instagram,
      icon: Instagram,
      color: 'hover:text-pink-400 hover:border-pink-400/50',
    },
    {
      name: 'GitHub',
      label: '@FalahRauf',
      href: github,
      icon: Github,
      color: 'hover:text-white hover:border-white/50',
    },
  ];

  return (
    <div id="contact" className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-36 border-t border-white/10 bg-neutral-950">
      <BlurFadeIn className="mb-14">
        <p className="text-xs md:text-sm tracking-[0.3em] text-neutral-500 font-mono uppercase mb-4">
          [005]
        </p>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          MARI TERHUBUNG
        </h2>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
          Mau ngobrol soal musik, game, kolaborasi proyek, atau software engineering? Hubungi saya lewat tombol kontak di bawah.
        </p>
      </BlurFadeIn>

      {/* Modern Icon-Only Floating Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {socialIcons.map((item, idx) => (
          <BlurFadeIn key={item.name} delay={idx * 0.1}>
            <motion.a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener' : undefined}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className={`group relative rounded-2xl border border-white/10 bg-neutral-900/80 p-8 flex flex-col items-center justify-center text-center shadow-lg transition-all backdrop-blur-md ${item.color}`}
            >
              <div className="size-16 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white transition-all shadow-inner mb-4">
                <item.icon className="size-7 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-bold text-base text-white tracking-tight flex items-center gap-1">
                <span>{item.name}</span>
                <ArrowUpRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-1 truncate max-w-full">
                {item.label}
              </p>
            </motion.a>
          </BlurFadeIn>
        ))}
      </div>
    </div>
  );
}
