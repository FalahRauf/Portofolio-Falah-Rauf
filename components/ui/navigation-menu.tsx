"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Navigation, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Hobi", href: "#hobbies" },
  { name: "Stack", href: "#stack" },
  { name: "Projects", href: "#projects" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Contact", href: "#contact" },
];

const EXPAND_SCROLL_THRESHOLD = 60;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 20, stiffness: 300 },
      opacity: { duration: 0.2 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3.2rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, rotate: -180, transition: { duration: 0.2 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -15, scale: 0.95, transition: { duration: 0.15 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.1,
    },
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    // Scroll Down -> Collapse to a compact circle button
    if (isExpanded && latest > previous && latest > 120) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    }
    // Scroll Up -> Re-expand
    else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.08 } : {}}
        whileTap={!isExpanded ? { scale: 0.94 } : {}}
        onClick={handleNavClick}
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-white/20 bg-neutral-950/85 text-white shadow-2xl backdrop-blur-xl h-12 px-1",
          !isExpanded && "cursor-pointer justify-center !px-0"
        )}
      >
        {/* Navigation Compass Logo */}
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center font-semibold pl-3 pr-2 text-white"
        >
          <Navigation className="h-4 w-4" />
        </motion.div>

        {/* Navigation Items */}
        <motion.div
          className={cn(
            "flex items-center gap-1 sm:gap-3 pr-4",
            !isExpanded && "pointer-events-none"
          )}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono tracking-wider text-neutral-300 hover:text-white transition-colors px-2.5 py-1 rounded-full hover:bg-white/10"
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Collapsed Center Hamburger Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="text-white"
          >
            <Menu className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}

export default AnimatedNavFramer;
