'use client';

import { motion } from 'framer-motion';

interface StackGroup {
  number: string;
  title: string;
  items: { name: string; icon?: string }[];
}

interface StackGridProps {
  groups: StackGroup[];
}

export default function StackGrid({ groups }: StackGridProps) {
  return (
    <div className='max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
        {groups.map((g, gi) => (
          <motion.div
            key={g.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: gi * 0.1 }}
          >
            <div className='flex items-baseline gap-3 mb-2'>
              <span className='text-2xl md:text-3xl font-bold tracking-tighter'>{g.number}</span>
            </div>
            <h3 className='text-lg font-semibold mb-6 text-neutral-300'>{g.title}</h3>
            <ul className='space-y-2'>
              {g.items.map((it) => (
                <li
                  key={it.name}
                  className='text-base md:text-lg text-neutral-400 hover:text-white transition-colors'
                >
                  {it.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}