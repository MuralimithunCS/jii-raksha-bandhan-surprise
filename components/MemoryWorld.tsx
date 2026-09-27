"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData, BirthdayStoryMemory } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";

interface MemoryWorldProps {
  onComplete: () => void;
}

export default function MemoryWorld({ onComplete }: MemoryWorldProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const memories = surpriseData.memories;
  const currentMem = memories[currentIndex];

  const handleNext = () => {
    AudioSynth.playClick();
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    AudioSynth.playClick();
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleProceed = () => {
    AudioSynth.playSuccess();
    onComplete();
  };

  return (
    <div className="page-container aurora-bg text-[#FAF8F5] select-none flex flex-col justify-between items-center px-4 py-8 text-center relative overflow-hidden">
      
      {/* Header */}
      <div className="relative z-20 max-w-md w-full flex flex-col items-center gap-1.5 mt-2">
        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-xs uppercase tracking-widest text-[#FFD166] font-semibold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          Birthday Starlight Gallery
        </span>
        <h2 className="text-2xl md:text-4xl font-serif-display font-extrabold text-white">
          Our Favorite Moments 📸✨
        </h2>
        <p className="text-xs text-purple-200/80 font-sans-clean">
          Swipe or tap arrows to explore our sweetest sibling chapters
        </p>
      </div>

      {/* 3D Glass Carousel Card */}
      <div className="relative z-20 w-full max-w-md my-4 flex items-center justify-center">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Memory"
          className="absolute -left-2 md:-left-5 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer shadow-lg transition-transform active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Story Card */}
        <div className="w-full px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMem.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="birthday-glass-card rounded-3xl p-5 border border-amber-300/40 shadow-2xl flex flex-col gap-4 text-left relative overflow-hidden"
            >
              {/* Floating Emoji Badge */}
              <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/50 backdrop-blur-md flex items-center justify-center text-xl shadow-lg">
                {currentMem.sticker}
              </div>

              {/* Photo Canvas */}
              <div className="w-full h-64 md:h-72 rounded-2xl overflow-hidden bg-black/40 relative border border-white/10 shadow-inner group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentMem.image}
                  alt={currentMem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle gradient vignette at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Badge Tag */}
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                  {currentMem.date}
                </span>
              </div>

              {/* Memory Details */}
              <div className="flex flex-col gap-1 px-1">
                <h3 className="text-lg md:text-xl font-bold font-serif-display text-white tracking-wide">
                  {currentMem.title}
                </h3>
                <p className="text-xs md:text-sm text-purple-100/85 font-sans-clean leading-relaxed">
                  {currentMem.caption}
                </p>
              </div>

              {/* Sibling signature line */}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-pink-300">
                <span className="flex items-center gap-1 font-medium">
                  <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                  Jii & Brother Forever
                </span>
                <span className="font-mono text-purple-300/60">
                  {currentIndex + 1} of {memories.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Memory"
          className="absolute -right-2 md:-right-5 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer shadow-lg transition-transform active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="relative z-20 flex items-center justify-center gap-2 mb-2">
        {memories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              AudioSynth.playClick();
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "w-8 bg-gradient-to-r from-amber-400 to-pink-500 shadow-[0_0_10px_rgba(255,209,102,0.8)]"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Proceed CTA */}
      <div className="relative z-20 mt-2">
        <motion.button
          onClick={handleProceed}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-bold text-xs md:text-sm tracking-widest uppercase cursor-pointer shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
        >
          Unlock The Birthday Vault 🎁✨
        </motion.button>
      </div>
    </div>
  );
}
