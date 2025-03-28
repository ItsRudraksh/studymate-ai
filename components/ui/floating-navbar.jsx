"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();

  // Add spring physics to make the animation smoother
  const scrollYProgressSmooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const [visible, setVisible] = useState(false);
  // Add throttling to prevent rapid state changes
  const [lastScrollTime, setLastScrollTime] = useState(0);

  useEffect(() => {
    // Show navbar when page loads if we're not at the top
    if (window.scrollY > window.innerHeight * 0.1) {
      setVisible(true);
    }
  }, []);

  useMotionValueEvent(scrollYProgressSmooth, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const now = Date.now();
      // Throttle updates to prevent choppy animations
      if (now - lastScrollTime < 100) return;
      setLastScrollTime(now);

      const previous = scrollYProgress.getPrevious() || 0;
      let direction = current - previous;

      if (scrollYProgressSmooth.get() < 0.05) {
        setVisible(false);
      } else {
        // More reliable direction detection with threshold
        if (direction < -0.01) {
          setVisible(true);
        } else if (direction > 0.01) {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 1,
          duration: 0.4,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] dark:border-white/[0.2] rounded-full dark:bg-black/80 bg-zinc-950/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}>
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-50 dark:hover:text-neutral-300 hover:text-neutral-300 transition-colors duration-200"
            )}>
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <Link href="/dashboard">
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200">
            <span>Get Started</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
