"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-neutral-950">
      <div className="pt-32 px-4">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1400&q=80"
            alt="Ocean waves at sunset — Unsplash"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <section className="max-w-5xl mx-auto px-6 pb-32 text-neutral-300">
        <h2 className="text-3xl font-semibold text-white mb-6">How this works</h2>
        <p className="text-lg leading-relaxed mb-4">
          This is the Aceternity UI <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-100">ContainerScroll</code> component,
          ported into the shadcn-friendly structure. As you scroll through the 80rem container,
          three Framer Motion transforms interpolate against the scroll position:
        </p>
        <ul className="space-y-2 text-lg leading-relaxed list-disc list-inside">
          <li><strong className="text-white">rotateX</strong> — tilts the card from 20° down to 0° (3D perspective parent)</li>
          <li><strong className="text-white">scale</strong> — zooms from 1.05× to 1× on desktop, 0.7× → 0.9× on mobile</li>
          <li><strong className="text-white">translateY</strong> — pushes the header upward as the card grows</li>
        </ul>
        <p className="text-lg leading-relaxed mt-6">
          The image inside uses <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-100">next/image</code>{" "}
          for automatic WebP/AVIF optimization — drop any Unsplash URL with a{" "}
          <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-100">?w=1400&amp;q=80</code> suffix and you get a
          responsive, lazy-loaded image for free.
        </p>
        <div className="mt-12 flex gap-4">
          <a
            href="/"
            className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition"
          >
            ← Back to portfolio
          </a>
          <a
            href="https://ui.aceternity.com/components/container-scroll-animation"
            target="_blank"
            rel="noopener"
            className="px-6 py-3 rounded-full border border-neutral-700 text-white hover:bg-neutral-800 transition"
          >
            View original →
          </a>
        </div>
      </section>
    </div>
  );
}