'use client';

import { motion } from 'framer-motion';

interface SectionMarkerProps {
  number: string;
}

export default function SectionMarker({ number }: SectionMarkerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className='max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20'
    >
      <p className='text-xs md:text-sm tracking-[0.3em] text-neutral-500 uppercase'>
        [{number}]
      </p>
    </motion.div>
  );
}