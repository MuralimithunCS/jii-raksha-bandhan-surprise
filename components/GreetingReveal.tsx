"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { Sparkles, PartyPopper } from "lucide-react";

interface GreetingRevealProps {
  onComplete: () => void;
}

export default function GreetingReveal({ onComplete }: GreetingRevealProps) {
  const data = surpriseData.greetingReveal;

  useEffect(() => {
    AudioSynth.playChime();
  }, []);

  const handleClickScreen = () => {
    AudioSynth.playClick();
    onComplete();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)", scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 140,
        damping: 12,
      },
    },
  };

  const textWords = data.heading.split(" ");

  return (
    <div 
      onClick={handleClickScreen}
      className="page-container aurora-bg text-[#FAF8F5] cursor-pointer select-none px-4 py-8 relative overflow-hidden"
    >
      {/* Soft spotlight radial */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_rgba(255,209,102,0.15)_0%,_transparent_65%] pointer-events-none" />

      <div className="relative z-20 max-w-2xl px-6 text-center flex flex-col items-center justify-center gap-6">
        
        {/* Floating Crown / Party Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-pink-500 p-0.5 shadow-[0_0_30px_rgba(255,209,102,0.5)] mb-2"
        >
          <div className="w-full h-full bg-[#120A2A] rounded-[22px] flex items-center justify-center text-amber-300">
            <PartyPopper className="w-8 h-8 text-[#FFD166] animate-bounce" />
          </div>
        </motion.div>

        {/* Cinematic Staggered Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-4xl md:text-6xl font-serif-display font-extrabold tracking-wide"
        >
          {textWords.map((word: string, wordIdx: number) => (
            <span key={wordIdx} className="flex whitespace-nowrap">
              {word.split("").map((char: string, charIdx: number) => (
                <motion.span
                  key={charIdx}
                  variants={letterVariants}
                  className="inline-block bg-gradient-to-r from-amber-200 via-pink-300 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(255,209,102,0.4)]"
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
          transition={{ duration: 1, delay: 1.2 }}
          className="text-base md:text-xl font-light text-purple-100/90 font-sans-clean max-w-md leading-relaxed mt-2"
        >
          {data.introText}
        </motion.p>

        {/* Tap helper indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1.8,
          }}
          className="text-xs md:text-sm text-amber-300 tracking-widest uppercase mt-6 flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-amber-300/30 backdrop-blur-md shadow-md"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          {data.subText}
        </motion.div>
      </div>
    </div>
  );
}
