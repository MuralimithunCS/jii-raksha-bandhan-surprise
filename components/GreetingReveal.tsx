"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";

interface GreetingRevealProps {
  onComplete: () => void;
}

export default function GreetingReveal({ onComplete }: GreetingRevealProps) {
  const data = surpriseData.greetingReveal;

  useEffect(() => {
    // Play a cinematic sweep on load
    AudioSynth.playChime();
  }, []);

  const handleClickScreen = () => {
    AudioSynth.playClick();
    onComplete();
  };

  // Staggered letters variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)", scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const textWords = data.heading.split(" ");

  return (
    <div 
      onClick={handleClickScreen}
      className="page-container bg-[#1E1919] text-[#FAF8F5] cursor-pointer select-none"
    >
      {/* Soft warm spotlight background */}
      <div className="absolute inset-0 spotlight-radial z-0 opacity-80" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--color-burgundy)_0%,_transparent_60%] opacity-20 z-0" />

      <div className="relative z-20 max-w-2xl px-6 text-center flex flex-col items-center justify-center gap-8">
        
        {/* Cinematic Staggered Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-4xl md:text-6xl font-serif-display font-extrabold tracking-wide text-rose-gold"
        >
          {textWords.map((word, wordIdx) => (
            <span key={wordIdx} className="flex whitespace-nowrap">
              {Array.from(word).map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>

        {/* Intro description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-base md:text-xl font-light text-[#F6F3EC]/80 font-sans-clean max-w-md leading-relaxed mt-4"
        >
          {data.introText}
        </motion.p>

        {/* Tap helper indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.2, 0.6] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 2.2,
          }}
          className="text-xs md:text-sm text-[#E3B7A8]/70 tracking-widest uppercase mt-8 border-t border-[#FAF8F5]/10 pt-4 px-6"
        >
          {data.subText}
        </motion.div>
      </div>

      {/* Decorative floral side vectors (simulated via CSS border curves) */}
      <div className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-rose-gold/30 to-transparent" />
      <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-rose-gold/30 to-transparent" />
    </div>
  );
}
