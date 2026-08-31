'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurFadeIn } from './motion-primitives';

interface TechItem {
  name: string;
  category: string;
  color: string;
  iconSvg: React.ReactNode;
}

interface CategoryRow {
  number: string;
  title: string;
  items: TechItem[];
}

export default function StackKintaro() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const categories: CategoryRow[] = [
    {
      number: '01',
      title: 'FRONTEND TECHNOLOGIES',
      items: [
        {
          name: 'React',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#61DAFB',
          iconSvg: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" className="size-5 fill-current">
              <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
              <g stroke="#61DAFB" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          ),
        },
        {
          name: 'Next.js',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#FFFFFF',
          iconSvg: (
            <svg viewBox="0 0 180 180" className="size-5 fill-current">
              <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0">
                <circle cx="90" cy="90" fill="white" r="90" />
              </mask>
              <g mask="url(#next-mask)">
                <circle cx="90" cy="90" fill="black" r="90" stroke="white" strokeWidth="6" />
                <path d="M149.508 157.438L69.147 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="white" />
                <rect fill="white" height="72" width="12" x="115" y="54" />
              </g>
            </svg>
          ),
        },
        {
          name: 'Tailwind CSS',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#38BDF8',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#38BDF8">
              <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
            </svg>
          ),
        },
        {
          name: 'Bootstrap',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#7952B3',
          iconSvg: (
            <svg viewBox="0 0 512 512" className="size-5 fill-current" fill="#7952B3">
              <path d="M416 32H96C60.65 32 32 60.65 32 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM294.6 345.5c-15.6 7.6-35.4 11.4-59.4 11.4h-55.8V155.1h55.8c24 0 43.8 3.8 59.4 11.4 15.6 7.6 23.4 20.4 23.4 38.4 0 11.4-3.6 21-10.8 28.8-7.2 7.8-17.4 13.2-30.6 16.2v1.2c16.2 3 28.2 8.4 36 16.2 7.8 7.8 11.7 18 11.7 30.6 0 20.4-8.7 35.1-26.1 44.1zm-75.9-63h27.9c10.8 0 19.2-2.1 25.2-6.3 6-4.2 9-10.5 9-18.9s-3-14.7-9-18.9c-6-4.2-14.4-6.3-25.2-6.3h-27.9v50.4zm0 29.7v54.9h32.4c12 0 21.3-2.4 27.9-7.2 6.6-4.8 9.9-12 9.9-21.6 0-9.6-3.3-16.8-9.9-21.6-6.6-4.8-15.9-4.5-27.9-4.5h-32.4z" />
            </svg>
          ),
        },
        {
          name: 'Framer Motion',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#0055FF',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#0055FF">
              <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
            </svg>
          ),
        },
        {
          name: 'TypeScript',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#3178C6',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#3178C6">
              <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.39.375-.09.146-.134.312-.134.5 0 .182.047.34.141.473.094.133.226.248.396.345.17.097.377.185.619.264.243.078.513.16.812.246.71.202 1.332.44 1.866.714.534.274.972.593 1.314.957.342.364.588.78.738 1.248.15.468.225.992.225 1.572 0 .832-.14 1.58-.42 2.244-.28.664-.678 1.225-1.194 1.684-.516.458-1.144.807-1.884 1.047-.74.24-1.575.36-2.505.36-.732 0-1.42-.062-2.064-.186a8.4 8.4 0 0 1-1.782-.57v-2.61a6.76 6.76 0 0 0 1.95.84 7.23 7.23 0 0 0 1.95.27c.36 0 .69-.033.99-.1.3-.067.556-.164.768-.29.212-.127.374-.283.486-.468.112-.185.168-.403.168-.654 0-.208-.046-.39-.138-.546-.092-.156-.226-.29-.402-.402a4.4 4.4 0 0 0-.672-.318 8.64 8.64 0 0 0-.948-.282c-.686-.188-1.29-.413-1.812-.676a4.2 4.2 0 0 1-1.308-.942 3.8 3.8 0 0 1-.762-1.284 4.8 4.8 0 0 1-.258-1.632c0-.793.136-1.513.408-2.16.272-.647.662-1.198 1.17-1.653.508-.455 1.127-.803 1.857-1.044.73-.24 1.554-.36 2.472-.36zm-11.4 0h7.58v2.328h-2.65v9.922h-2.28v-9.922H7.088z" />
            </svg>
          ),
        },
        {
          name: 'JavaScript',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#F7DF1E',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#F7DF1E">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M0 0h24v24H0V0z" fill="#F7DF1E" />
              <path d="M2.2 21.8c.8 0 1.5-.1 2.2-.4.7-.3 1.3-.8 1.8-1.4.5-.6.8-1.4 1-2.3.2-.9.3-2 .3-3.2v-7H5.2v7.1c0 .8-.1 1.5-.2 2-.1.5-.3 1-.6 1.3-.3.3-.6.6-1.1.8-.4.2-1 .2-1.6.2-.4 0-.8 0-1.2-.1-.4-.1-.7-.2-.9-.3l-.4 2.2c.4.2.9.4 1.4.5.6.3 1.2.3 1.6.3zm12.3 0c1.2 0 2.2-.2 3.1-.7.9-.5 1.7-1.1 2.2-2 .6-.8.9-1.8 1.1-3 .2-1.1.2-2.3 0-3.5-.2-1.1-.6-2.1-1.2-2.9-.6-.8-1.4-1.4-2.4-1.8-1-.4-2.2-.6-3.6-.6-1 0-1.9.1-2.7.4-.8.3-1.6.6-2.2 1.1l1.1 2c.5-.4 1.1-.7 1.7-.9.6-.2 1.3-.3 2-.3.8 0 1.5.1 2.1.4.6.3 1.1.7 1.4 1.2.3.5.5 1.1.6 1.7.1.6.1 1.3 0 2-.3-.4-.8-.7-1.4-.9-.6-.2-1.3-.3-2.1-.3-1 0-1.9.2-2.7.5-.8.3-1.4.8-1.9 1.4-.5.6-.8 1.3-1 2.1-.2.8-.2 1.7 0 2.6.2.8.6 1.5 1.1 2.1.5.6 1.2 1 2 1.3.7.4 1.6.5 2.5.5zm.7-2.1c-.5 0-1-.1-1.4-.3-.4-.2-.8-.4-1.1-.8-.3-.3-.5-.7-.6-1.2-.1-.5-.1-1 0-1.5.1-.5.3-.9.6-1.3.3-.4.7-.6 1.2-.8.5-.2 1-.3 1.6-.3.5 0 1 .1 1.4.2.4.1.8.3 1.1.6v2c-.1.7-.3 1.3-.6 1.8-.3.5-.7.9-1.2 1.2-.5.3-1.1.4-1.6.4z" fill="#000000" />
            </svg>
          ),
        },
        {
          name: 'HTML5',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#E34F26',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#E34F26">
              <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.9 6.2H6.9l.3 3.4h10.9l-.8 8.8-6.7 1.9-6.7-1.9-.4-5.1h3.4l.2 2.3 3.5.9 3.5-.9.4-4.5H5.8L4.9 3h14.1l-.6 3.2z" />
            </svg>
          ),
        },
        {
          name: 'CSS3',
          category: 'FRONTEND TECHNOLOGIES',
          color: '#1572B6',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#1572B6">
              <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.9 6.2H6.9l.3 3.4h10.9l-.8 8.8-6.7 1.9-6.7-1.9-.4-5.1h3.4l.2 2.3 3.5.9 3.5-.9.4-4.5H5.8L4.9 3h14.1l-.6 3.2z" />
            </svg>
          ),
        },
      ],
    },
    {
      number: '02',
      title: 'BACKEND TECHNOLOGIES',
      items: [
        {
          name: 'Node.js',
          category: 'BACKEND TECHNOLOGIES',
          color: '#339933',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#339933">
              <path d="M12 2L2 7.7v11.5L12 25l10-5.8V7.7L12 2zm-1 16.5c-2.8 0-4.5-1.5-4.5-4.2 0-2.8 1.8-4.3 4.5-4.3 1.8 0 3.2.7 3.8 1.7l-1.6 1.2c-.4-.7-1.2-1.1-2.2-1.1-1.7 0-2.6 1-2.6 2.5 0 1.5.9 2.5 2.6 2.5 1.1 0 1.9-.5 2.3-1.2l1.6 1.1c-.7 1.1-2.1 1.8-3.9 1.8z" />
            </svg>
          ),
        },
        {
          name: 'PHP',
          category: 'BACKEND TECHNOLOGIES',
          color: '#777BB4',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#777BB4">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-5.7 15.6h-2.1l2.4-7.2h2.7c1.8 0 2.7.9 2.4 2.7-.3 1.8-1.5 2.7-3.3 2.7h-1.5l-.6 1.8zm3.6-4.5c.3-1.2-.3-1.5-1.2-1.5h-1.2l-.6 1.8h1.2c.9 0 1.5-.3 1.8-.3zm8.4 4.5h-2.1l2.4-7.2h2.7c1.8 0 2.7.9 2.4 2.7-.3 1.8-1.5 2.7-3.3 2.7h-1.5l-.6 1.8zm3.6-4.5c.3-1.2-.3-1.5-1.2-1.5h-1.2l-.6 1.8h1.2c.9 0 1.5-.3 1.8-.3z" />
            </svg>
          ),
        },
        {
          name: 'Laravel',
          category: 'BACKEND TECHNOLOGIES',
          color: '#FF2D20',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#FF2D20">
              <path d="M21.2 5.8l-8.4-4.8c-.5-.3-1.1-.3-1.6 0L2.8 5.8c-.5.3-.8.8-.8 1.4v9.6c0 .6.3 1.1.8 1.4l8.4 4.8c.5.3 1.1.3 1.6 0l8.4-4.8c.5-.3.8-.8.8-1.4V7.2c0-.6-.3-1.1-.8-1.4zM12 3.1l6.7 3.9L12 10.8 5.3 7 12 3.1z" />
            </svg>
          ),
        },
        {
          name: 'ASP.NET',
          category: 'BACKEND TECHNOLOGIES',
          color: '#512BD4',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#512BD4">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2V11h2v5.5zm0-7.5h-2V7h2v2z" />
            </svg>
          ),
        },
        {
          name: 'Rust',
          category: 'BACKEND TECHNOLOGIES',
          color: '#DEA584',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#DEA584">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          ),
        },
        {
          name: 'C#',
          category: 'BACKEND TECHNOLOGIES',
          color: '#239120',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#239120">
              <path d="M12 0l10.4 6v12L12 24 1.6 18V6L12 0zm-1.8 15.6c2.8 0 4.5-1.5 4.5-4.2 0-2.8-1.8-4.3-4.5-4.3-1.8 0-3.2.7-3.8 1.7l1.6 1.2c.4-.7 1.2-1.1 2.2-1.1 1.7 0 2.6 1 2.6 2.5 0 1.5-.9 2.5-2.6 2.5-1.1 0-1.9-.5-2.3-1.2l-1.6 1.1c.7 1.1 2.1 1.8 3.9 1.8z" />
            </svg>
          ),
        },
        {
          name: 'Python',
          category: 'BACKEND TECHNOLOGIES',
          color: '#3776AB',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#3776AB">
              <path d="M11.9 0c-3.1 0-5.8.5-5.8 2.8v2.9h6v.9H4.3C1.9 6.6 0 8.5 0 11.8c0 3.2 1.7 5.1 4.1 5.1h2.2v-2.9c0-2.3 2-4.1 4.4-4.1h7.3v-2.8c0-2.5-2.2-4.1-6.1-4.1zm-3.2 1.7c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3.4 22.3c3.1 0 5.8-.5 5.8-2.8v-2.9h-6v-.9h7.8c2.4 0 4.3-1.9 4.3-5.2 0-3.2-1.7-5.1-4.1-5.1h-2.2v2.9c0 2.3-2 4.1-4.4 4.1H6.1v2.8c0 2.5 2.2 4.1 6.1 4.1zm3.2-1.7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          ),
        },
        {
          name: 'Discord.js',
          category: 'BACKEND TECHNOLOGIES',
          color: '#5865F2',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#5865F2">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          ),
        },
      ],
    },
    {
      number: '03',
      title: 'DATABASES & ORMS',
      items: [
        {
          name: 'PostgreSQL',
          category: 'DATABASES & ORMS',
          color: '#4169E1',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#4169E1">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2V11h2v5.5zm0-7.5h-2V7h2v2z" />
            </svg>
          ),
        },
        {
          name: 'MySQL',
          category: 'DATABASES & ORMS',
          color: '#4479A1',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#4479A1">
              <path d="M12 2L2 7.7v11.5L12 25l10-5.8V7.7L12 2zm0 4.2l6.7 3.9L12 14.2 5.3 10.3 12 6.2z" />
            </svg>
          ),
        },
        {
          name: 'MongoDB',
          category: 'DATABASES & ORMS',
          color: '#47A248',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#47A248">
              <path d="M12 0C11.5 0 11 .3 10.8.7L5.2 11.2c-.3.6-.3 1.3 0 1.9l5.6 10.2c.2.4.7.7 1.2.7s1-.3 1.2-.7l5.6-10.2c.3-.6.3-1.3 0-1.9L13.2.7C13 .3 12.5 0 12 0z" />
            </svg>
          ),
        },
        {
          name: 'Prisma',
          category: 'DATABASES & ORMS',
          color: '#2D3748',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#2D3748">
              <path d="M12 2L1 21h22L12 2zm0 4.5l7 12.5H5l7-12.5z" />
            </svg>
          ),
        },
        {
          name: 'Neon',
          category: 'DATABASES & ORMS',
          color: '#00E5FF',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#00E5FF">
              <path d="M12 2L2 22h20L12 2zm0 6l5 10H7l5-10z" />
            </svg>
          ),
        },
      ],
    },
    {
      number: '04',
      title: 'TOOLS & INFRASTRUCTURE',
      items: [
        {
          name: 'Git',
          category: 'TOOLS & INFRASTRUCTURE',
          color: '#F05032',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#F05032">
              <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.122 0L8.82 2.576l3.18 3.18a1.78 1.78 0 0 1 2.25 2.25l3.06 3.06a1.78 1.78 0 1 1-.99 1.01l-2.83-2.83v5.07a1.78 1.78 0 1 1-1.42 0V9.28a1.78 1.78 0 0 1-.97-2.33L7.96 3.77.454 11.278a1.5 1.5 0 0 0 0 2.122l10.48 10.48a1.5 1.5 0 0 0 2.12 0l10.49-10.49a1.5 1.5 0 0 0 0-2.12z" />
            </svg>
          ),
        },
        {
          name: 'Vercel',
          category: 'TOOLS & INFRASTRUCTURE',
          color: '#FFFFFF',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#FFFFFF">
              <path d="M12 1L24 22H0L12 1z" />
            </svg>
          ),
        },
        {
          name: 'Tauri',
          category: 'TOOLS & INFRASTRUCTURE',
          color: '#FFC131',
          iconSvg: (
            <svg viewBox="0 0 24 24" className="size-5 fill-current" fill="#FFC131">
              <circle cx="8" cy="12" r="5" fill="none" stroke="#FFC131" strokeWidth="2" />
              <circle cx="16" cy="12" r="5" fill="none" stroke="#FFC131" strokeWidth="2" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <section id="stack" className="relative bg-neutral-950 text-white py-24 md:py-36 z-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Section Marker */}
        <BlurFadeIn className="mb-6">
          <p className="text-xs md:text-sm tracking-[0.3em] text-neutral-500 font-mono uppercase">
            [002]
          </p>
        </BlurFadeIn>

        {/* Section Title */}
        <BlurFadeIn delay={0.1} className="mb-16">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
            STACK
          </h2>
        </BlurFadeIn>

        {/* Categories Rows */}
        <div className="space-y-16">
          {categories.map((cat, rowIdx) => (
            <BlurFadeIn
              key={cat.number}
              delay={0.15 + rowIdx * 0.1}
              className="border-b border-white/5 pb-12 last:border-b-0"
            >
              {/* Category Header */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-sm font-mono text-neutral-500 font-bold tracking-widest">
                  {cat.number}
                </span>
                <h3 className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase font-semibold">
                  {cat.title}
                </h3>
              </div>

              {/* Technology Icon/Badge Items (Horizontal Flex Row) */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {cat.items.map((tech) => {
                  const isHovered = hoveredTech?.name === tech.name;
                  return (
                    <div
                      key={tech.name}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="relative group flex items-center gap-2.5 py-2 cursor-pointer transition-colors"
                    >
                      {/* Floating Tooltip Card (Shown on Hover, like Kintaro Screenshot 1) */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.92, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: -8, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 10, scale: 0.92, filter: 'blur(8px)' }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none w-48 rounded-xl border border-white/20 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center"
                          >
                            <div className="size-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center mb-2.5 shadow-inner">
                              {tech.iconSvg}
                            </div>
                            <h4 className="font-bold text-xs tracking-wider uppercase text-white">
                              {tech.name}
                            </h4>
                            <p className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase mt-0.5">
                              {tech.category}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Icon */}
                      <div
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{
                          color: isHovered ? tech.color : '#888888',
                        }}
                      >
                        {tech.iconSvg}
                      </div>

                      {/* Name */}
                      <span className="text-sm md:text-base font-medium tracking-tight text-neutral-400 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </BlurFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
