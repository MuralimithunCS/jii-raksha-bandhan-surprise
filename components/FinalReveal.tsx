"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { TeddyCharacter } from "./TeddyIllustration";
import { Heart, Sparkles } from "lucide-react";

export default function FinalReveal() {
  const [step, setStep] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const data = surpriseData.finalMessage;

  useEffect(() => {
    // Cinematic timeline reveals
    const timer1 = setTimeout(() => setStep(1), 1800);  // Thank you for being my sister
    const timer2 = setTimeout(() => setStep(2), 3800);  // I may not say it every day...
    const timer3 = setTimeout(() => setStep(3), 5600);  // But I love you more than you know
    const timer4 = setTimeout(() => setStep(4), 8000);  // Happy Raksha Bandhan Jii
    const timer5 = setTimeout(() => {
      setStep(5);
      AudioSynth.playSuccess(); // play success celebration sound
    }, 9800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleEasterEgg = () => {
    AudioSynth.playChime();
    setShowEasterEgg(true);
  };

  return (
    <div className="page-container bg-[#161212] text-[#FAF8F5] select-none text-center px-6">
      {/* Dark warm radial vignette overlay */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--color-burgundy)_0%,_transparent_75%] opacity-35 z-0" />
      <div className="absolute inset-0 cinematic-vignette-dark z-0 pointer-events-none" />

      {/* Main message card flow */}
      <div className="relative z-20 max-w-xl flex flex-col items-center justify-center min-h-[350px] gap-6 px-4">
        
        {/* Together Teddy Character illustration */}
        <div className="mb-2">
          <TeddyCharacter pose="together" />
        </div>

        {/* Recipient Header */}
        <motion.span
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-5xl font-serif-display text-rose-gold italic tracking-wide"
        >
          {surpriseData.nickname}...
        </motion.span>

        {/* Phase 1: Thank you */}
        {step >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-xl md:text-2xl font-light text-[#F6F3EC] font-sans-clean leading-relaxed"
          >
            {data.title}
          </motion.h2>
        )}

        {/* Phase 2: Sibling confession */}
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
            className="text-xs md:text-sm tracking-widest uppercase text-blush font-semibold mt-1"
          >
            {data.subtitle}
          </motion.p>
        )}

        {/* Phase 3: Love you climax */}
        {step >= 3 && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-extrabold text-rose-gold tracking-wide leading-tight px-2"
          >
            {data.highlight}
          </motion.h1>
        )}

        {/* Phase 4: Main greeting wrap */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 flex flex-col items-center gap-1"
          >
            <span className="text-xl md:text-2xl font-serif-display font-medium text-white/90">
              {data.closing}
            </span>
          </motion.div>
        )}

        {/* Phase 5: Author signature */}
        {step >= 5 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-handwritten text-rose-gold/80 text-xl mt-4"
          >
            {data.author}
          </motion.span>
        )}
      </div>

      {/* EASTER EGG INDICATOR */}
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          onClick={handleEasterEgg}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-30 flex flex-col items-center gap-1 group hover:scale-115 transition-transform"
        >
          <Heart className="w-5 h-5 text-rose-gold fill-rose-gold/20 group-hover:fill-rose-gold" />
          <span className="text-[10px] text-rose-gold/50 tracking-wider font-sans-clean uppercase">Secret Tap</span>
        </motion.div>
      )}

      {/* Easter Egg Overlay Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white text-burgundy p-6 w-full max-w-sm rounded-2xl shadow-2xl text-center border border-[#FAF8F5]/10 flex flex-col items-center gap-4 relative"
            >
              {/* Ribbon deco */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-gold via-burgundy to-rose-gold" />
              
              <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold mb-1 mt-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display font-bold text-xl">The Birthday Sibling Guarantee 📜🎂</h3>
              <p className="text-sm text-burgundy/80 leading-relaxed font-sans-clean px-2">
                &ldquo;By blowing out your birthday candles today, you unlock unlimited sibling love, zero complaints (strictly for today 😂), free snacks, and a lifetime brother protection pass! Happy Birthday Didi! 🎂❤️&rdquo;
              </p>
              <button
                onClick={() => setShowEasterEgg(false)}
                className="mt-4 px-6 py-2 bg-burgundy text-white rounded-full text-xs font-semibold uppercase tracking-widest cursor-pointer shadow-md hover:bg-burgundy/90 transition-colors"
              >
                Deal! 😉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric peaceful ambient background elements */}
      <div className="absolute bottom-10 left-10 w-6 h-6 border-b border-l border-rose-gold/10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-6 h-6 border-b border-r border-rose-gold/10 pointer-events-none" />
      <div className="absolute top-10 left-10 w-6 h-6 border-t border-l border-rose-gold/10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-6 h-6 border-t border-r border-rose-gold/10 pointer-events-none" />
    </div>
  );
}
