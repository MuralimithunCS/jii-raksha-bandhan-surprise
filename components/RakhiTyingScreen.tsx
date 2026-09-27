"use client";

import React from "react";
import { motion } from "framer-motion";
import { BirthdayCakeScene } from "./TeddyIllustration";
import { surpriseData } from "@/data/surpriseData";
import { Sparkles } from "lucide-react";

interface RakhiTyingScreenProps {
  onComplete: () => void;
}

export default function RakhiTyingScreen({ onComplete }: RakhiTyingScreenProps) {
  const cakeData = surpriseData.birthdayCake;

  return (
    <div className="page-container aurora-bg text-[#FAF8F5] select-none flex flex-col justify-center items-center px-4 py-8 text-center relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-20 max-w-md w-full flex flex-col items-center gap-4">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-xs uppercase tracking-widest text-[#FFD166] font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166] animate-pulse" />
          Midnight Birthday Ceremony
        </motion.span>
        
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-4xl font-serif-display font-extrabold text-white leading-tight"
        >
          {cakeData.heading}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3 }}
          className="text-xs md:text-sm text-purple-200/80 font-sans-clean max-w-xs"
        >
          {cakeData.subheading}
        </motion.p>

        {/* Birthday Cake Scene Container */}
        <div className="my-2 w-full flex justify-center">
          <BirthdayCakeScene onFinished={onComplete} />
        </div>
      </div>
    </div>
  );
}
