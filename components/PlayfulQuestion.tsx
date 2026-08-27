"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { TeddyCharacter } from "./TeddyIllustration";

interface PlayfulQuestionProps {
  onComplete: () => void;
}

export default function PlayfulQuestion({ onComplete }: PlayfulQuestionProps) {
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [playfulIndex, setPlayfulIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const data = surpriseData.playfulQuestion;

  const handleNoInteraction = () => {
    AudioSynth.playClick();
    
    // Calculate a random offset to move the "No" button away
    const range = 120;
    const rx = (Math.random() - 0.5) * range * 2;
    const ry = (Math.random() - 0.5) * range * 1.5;
    
    setNoButtonOffset({ x: rx, y: ry });
    setClickCount((prev) => prev + 1);
    setPlayfulIndex((prev) => (prev + 1) % data.playfulAlerts.length);
    setShowWarning(true);
  };

  const handleYes = () => {
    AudioSynth.playSuccess();
    setShowCelebration(true);
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  return (
    <div className="page-container bg-[#F6F3EC] paper-texture text-foreground">
      <div className="absolute inset-0 bg-[#D8B48F]/5 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center max-w-md w-full px-6 text-center select-none">
        
        {/* Question Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-serif-display font-bold text-burgundy mb-6 leading-tight"
        >
          {data.question}
        </motion.h2>

        {/* Dynamic funny speech bubble */}
        <div className="h-16 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {showWarning && (
              <motion.div
                key={playfulIndex}
                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white px-5 py-2.5 rounded-2xl shadow-md border border-blush/30 text-burgundy font-medium text-sm relative"
              >
                {data.playfulAlerts[playfulIndex]}
                {/* Speech bubble arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-blush/30 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons Grid or Celebration */}
        <div className="flex flex-col items-center justify-center w-full px-12 relative min-h-[140px]">
          {showCelebration ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center"
            >
              <TeddyCharacter pose="celebrating" speechBubble="I knew you'd say yes 😂❤️" />
            </motion.div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              {/* YES Button */}
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto min-w-[130px] px-8 py-4 bg-burgundy text-[#FAF8F5] rounded-full font-bold tracking-widest text-sm uppercase cursor-pointer hover:bg-burgundy/90 shadow-lg z-20 transition-colors"
              >
                {data.yesOptions[clickCount % data.yesOptions.length]}
              </motion.button>

              {/* PLAYFUL NO BUTTON */}
              <motion.button
                onMouseEnter={handleNoInteraction}
                onTouchStart={(e) => {
                  e.preventDefault(); // prevent triggering click event on mobile
                  handleNoInteraction();
                }}
                animate={{
                  x: noButtonOffset.x,
                  y: noButtonOffset.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="w-full sm:w-auto min-w-[130px] px-8 py-4 bg-white text-burgundy/60 border border-burgundy/20 rounded-full font-medium tracking-widest text-sm uppercase shadow-sm cursor-pointer z-10 hover:bg-burgundy/5 select-none"
              >
                {data.noOptions[clickCount % data.noOptions.length]}
              </motion.button>
            </div>
          )}
        </div>

        {/* Heart doodles background */}
        <div className="absolute -bottom-16 opacity-10 pointer-events-none text-9xl text-burgundy font-handwritten">
          ❤️
        </div>
      </div>
    </div>
  );
}
