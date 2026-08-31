'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  href?: string;
  index: number;
}

export default function ProjectCard({
  title,
  category,
  year,
  imageSrc,
  href,
  index,
}: ProjectCardProps) {
  const Wrapper = href ? motion.a : motion.div;
  return (
    <Wrapper
      href={href || '#'}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener' : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className='group block bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden'
    >
      <div className='aspect-[4/3] relative overflow-hidden bg-neutral-800'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className='absolute inset-0'
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </motion.div>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
      </div>
      <div className='p-6 md:p-10'>
        <div className='flex items-baseline justify-between mb-3'>
          <p className='text-xs tracking-[0.2em] text-neutral-500 uppercase'>{category}</p>
          <p className='text-xs tracking-[0.2em] text-neutral-500 uppercase'>{year}</p>
        </div>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-2xl md:text-4xl font-bold tracking-tighter'>{title}</h3>
          <ArrowUpRight className='size-6 text-neutral-400 shrink-0 mt-1 group-hover:text-white transition-colors' />
        </div>
      </div>
    </Wrapper>
  );
}