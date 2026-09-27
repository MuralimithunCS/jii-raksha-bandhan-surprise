"use client";

import React from "react";
import { motion } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { Sparkles, Heart } from "lucide-react";

interface LetterRevealProps {
  onComplete: () => void;
}

export default function LetterReveal({ onComplete }: LetterRevealProps) {
  const data = surpriseData.letter;

  const handleNext = () => {
    AudioSynth.playFirework();
    onComplete();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.18,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="page-container aurora-bg text-[#FAF8F5] p-4 md:p-6 overflow-y-auto select-none relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-start w-full max-w-lg mx-auto py-6">
        
        {/* Screen Intro */}
        <div className="text-center mb-6 flex flex-col items-center justify-center">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-xs uppercase tracking-widest text-[#FFD166] font-semibold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            From The Heart
          </span>
          <h2 className="text-2xl md:text-3xl font-serif-display font-extrabold text-white mt-1">
            A Birthday Letter For Jii 🤍🧿
          </h2>
          <p className="text-xs text-purple-200/80 font-sans-clean mt-0.5">
            Some thoughts I saved especially for tonight...
          </p>
        </div>

        {/* Golden Scroll Glass Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full birthday-glass-card px-6 py-8 md:px-10 md:py-10 rounded-3xl border border-amber-300/40 shadow-2xl relative overflow-hidden flex flex-col gap-5"
        >
          {/* Golden ribbon tag at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-1 bg-gradient-to-r from-amber-400 to-pink-500 rounded-b-xl text-[10px] font-bold uppercase tracking-widest text-black shadow-md">
            ROYAL SISTERHOOD SCROLL ✨
          </div>

          {/* Letter Head */}
          <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-white/10 pb-3 mt-2">
            <h4 className="text-2xl md:text-3xl font-handwritten text-[#FFD166] font-bold">
              {data.title}
            </h4>
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </motion.div>

          {/* Letter Body Paragraphs */}
          <div className="flex flex-col gap-3.5 text-purple-100/90 text-sm md:text-base leading-relaxed font-sans-clean max-h-[340px] overflow-y-auto pr-3 custom-scrollbar">
            {data.paragraphs.map((para, index) => (
              <motion.p 
                key={index}
                variants={itemVariants}
                className={index === 3 ? "text-amber-200 font-medium bg-amber-400/10 p-3 rounded-2xl border border-amber-300/30" : ""}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Letter Signature */}
          <motion.div 
            variants={itemVariants}
            className="pt-3 border-t border-white/10 flex flex-col items-end"
          >
            <span className="text-[11px] uppercase tracking-wider text-purple-300/70 font-sans-clean font-semibold">Forever & Always,</span>
            <span className="text-2xl font-handwritten text-[#FFD166] font-bold mt-0.5">
              {data.signature}
            </span>
          </motion.div>
        </motion.div>

        {/* Transition button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 z-30"
        >
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white rounded-full font-bold tracking-widest text-xs uppercase cursor-pointer shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
          >
            Launch The Midnight Fireworks 🎆✨
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
