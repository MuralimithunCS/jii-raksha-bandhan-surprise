"use client";

import React from "react";
import { motion } from "framer-motion";
import { RakhiTyingScene } from "./TeddyIllustration";
import { surpriseData } from "@/data/surpriseData";

interface RakhiTyingScreenProps {
  onComplete: () => void;
}

export default function RakhiTyingScreen({ onComplete }: RakhiTyingScreenProps) {
  return (
    <div className="page-container bg-[#161212] text-[#FAF8F5] select-none flex flex-col justify-center items-center px-6 text-center">
      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--color-burgundy)_0%,_transparent_75%] opacity-35 z-0" />
      <div className="absolute inset-0 cinematic-vignette-dark z-0 pointer-events-none" />

      <div className="relative z-20 max-w-md w-full flex flex-col items-center gap-6">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-xs uppercase tracking-widest text-rose-gold font-semibold"
        >
          A Sacred Thread
        </motion.span>
        
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-serif-display italic text-[#FAF8F5] leading-tight"
        >
          Connecting us across any distance...
        </motion.h3>

        {/* Cinematic SVG Animation Container */}
        <div className="my-2 w-full flex justify-center">
          <RakhiTyingScene onFinished={onComplete} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-xs text-[#E3B7A8]/70 font-sans-clean mt-2"
        >
          Tying Rakhi onto brother&apos;s wrist... ❤️
        </motion.p>
      </div>

      {/* Traditional corners */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-rose-gold/10" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-rose-gold/10" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-rose-gold/10" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-rose-gold/10" />
    </div>
  );
}
