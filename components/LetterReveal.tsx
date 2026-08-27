"use client";

import React from "react";
import { motion } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { TeddyCharacter } from "./TeddyIllustration";

interface LetterRevealProps {
  onComplete: () => void;
}

export default function LetterReveal({ onComplete }: LetterRevealProps) {
  const data = surpriseData.letter;

  const handleNext = () => {
    AudioSynth.playChime();
    onComplete();
  };

  // Standard container layout
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.25,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="page-container bg-[#F6F3EC] paper-texture text-foreground p-4 md:p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-[#D8B48F]/5 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-start w-full max-w-lg mx-auto py-8">
        
        {/* Screen Intro */}
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <div className="mb-1">
            <TeddyCharacter pose="envelope" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xs uppercase tracking-widest font-semibold text-burgundy"
          >
            A Sibling Message
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-serif-display italic text-burgundy mt-1"
          >
            Okay Jii... one last thing.
          </motion.h3>
        </div>

        {/* Physical Paper Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full bg-[#FAF8F5] px-6 py-8 md:px-10 md:py-12 rounded-lg shadow-xl border border-black/5 relative overflow-hidden flex flex-col gap-6 rotate-[0.5deg]"
        >
          {/* Sibling tape decoration at the top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 scrapbook-tape z-30 opacity-80" />

          {/* Letter Head */}
          <motion.h4 
            variants={itemVariants}
            className="text-3xl font-handwritten text-burgundy font-bold border-b border-burgundy/10 pb-2"
          >
            {data.title}
          </motion.h4>

          {/* Letter Body Paragraphs */}
          <div className="flex flex-col gap-4 text-burgundy/90 text-sm md:text-base leading-relaxed font-light font-sans-clean max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {data.paragraphs.map((para, index) => (
              <motion.p 
                key={index}
                variants={itemVariants}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Letter Signature */}
          <motion.div 
            variants={itemVariants}
            className="mt-4 pt-4 border-t border-burgundy/10 flex flex-col items-end align-bottom"
          >
            <span className="text-xs italic text-burgundy/50 font-sans-clean font-semibold uppercase">Always,</span>
            <span className="text-xl font-handwritten text-burgundy font-bold mt-1">
              {data.signature}
            </span>
          </motion.div>
        </motion.div>

        {/* Transition button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-8 z-30"
        >
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-burgundy text-[#FAF8F5] rounded-full font-bold tracking-widest text-xs uppercase cursor-pointer shadow-lg hover:bg-burgundy/90 transition-all"
          >
            Close Letter & Finish ❤️
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
