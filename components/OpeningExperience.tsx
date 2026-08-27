"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { TeddyCharacter } from "./TeddyIllustration";

interface OpeningExperienceProps {
  onComplete: () => void;
  startMusic: () => void;
}

export default function OpeningExperience({ onComplete, startMusic }: OpeningExperienceProps) {
  const [step, setStep] = useState(0);
  const data = surpriseData.opening;

  useEffect(() => {
    // Phase 0: "Jii..." (0 to 1.5s)
    // Phase 1: "I made something special for you." (1.5 to 3.5s)
    // Phase 2: "But..." (3.5 to 5s)
    // Phase 3: "you have to promise me you'll see it till the end." (5s+)
    const timer1 = setTimeout(() => setStep(1), 1800);
    const timer2 = setTimeout(() => setStep(2), 3800);
    const timer3 = setTimeout(() => setStep(3), 5600);
    const timer4 = setTimeout(() => setStep(4), 7800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleStart = () => {
    AudioSynth.playChime();
    startMusic();
    onComplete();
  };

  return (
    <div className="page-container bg-[#0E0B0B] text-[#FAF8F5] select-none flex flex-col justify-center items-center px-6 text-center">
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette-dark z-0" />

      <div className="relative z-20 max-w-lg flex flex-col items-center gap-6 min-h-[300px] justify-center">
        <AnimatePresence mode="wait">
          {step >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5 items-center"
            >
              {/* Cute peeking teddy illustration */}
              <div className="mb-2">
                <TeddyCharacter pose="peeking" speechBubble="Psst... Jii 👀" />
              </div>

              {/* Recipient Nickname */}
              <motion.h1
                initial={{ filter: "blur(8px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 2, delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif-display text-rose-gold italic tracking-wide"
              >
                {data.title}
              </motion.h1>

              {/* Subtitle */}
              {step >= 1 && (
                <motion.p
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2 }}
                  className="text-lg md:text-2xl font-light text-[#F6F3EC]/80 font-sans-clean leading-relaxed px-4"
                >
                  {data.subtitle}
                </motion.p>
              )}

              {/* Sibling playful disclaimer */}
              {step >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-burgundy dark:text-rose-gold/50 font-handwritten text-2xl md:text-3xl mt-2"
                >
                  {data.warning.split(" ")[0]}...
                </motion.p>
              )}

              {/* Full disclaimer */}
              {step >= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-sm md:text-base font-light text-[#E3B7A8] tracking-widest uppercase px-4 max-w-xs md:max-w-md leading-relaxed"
                >
                  {data.warning.substring(7)}
                </motion.p>
              )}

              {/* Playful Premium Button */}
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.3
                  }}
                  className="mt-8"
                >
                  <motion.button
                    onClick={handleStart}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(216, 180, 143, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-8 py-4 bg-transparent border border-rose-gold text-rose-gold rounded-full font-sans-clean font-medium text-sm md:text-base uppercase tracking-widest cursor-pointer overflow-hidden group transition-all"
                  >
                    {/* Glowing slide fill */}
                    <span className="absolute inset-0 bg-rose-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      {data.buttonText}
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-rose-gold/20" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-rose-gold/20" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-rose-gold/20" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-rose-gold/20" />
    </div>
  );
}
