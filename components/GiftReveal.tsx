"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";

interface GiftRevealProps {
  onComplete: () => void;
}

export default function GiftReveal({ onComplete }: GiftRevealProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const data = surpriseData.giftBox;

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);
    AudioSynth.playGiftOpen();

    // Staggered reveal of text after gift lid flies away
    setTimeout(() => {
      setShowMessage(true);
      AudioSynth.playChime();
    }, 1000);
  };

  return (
    <div className="page-container bg-background paper-texture text-foreground transition-all duration-1000">
      <div className="absolute inset-0 bg-[#E3B7A8]/5 mix-blend-multiply pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center max-w-md w-full px-6 text-center select-none">
        
        {/* Stage 1: Tap to open message */}
        <AnimatePresence>
          {!isOpened && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-xl font-medium tracking-wide text-burgundy/80 uppercase font-sans-clean mb-12"
            >
              {data.initialPrompt}
            </motion.p>
          )}
        </AnimatePresence>

        {/* 3D Gift Box Container */}
        <div 
          onClick={handleOpenGift}
          className="relative w-48 h-48 md:w-56 md:h-56 cursor-pointer flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Glowing pedestal light */}
          <div className={`absolute bottom-0 w-36 h-8 bg-burgundy/10 rounded-full blur-xl transition-all duration-1000 ${isOpened ? "scale-150 bg-rose-gold/30 blur-2xl" : "scale-100"}`} />

          <motion.div
            animate={isOpened ? "opened" : "closed"}
            whileHover={!isOpened ? { scale: 1.05, rotateY: 10 } : {}}
            whileTap={!isOpened ? { scale: 0.95 } : {}}
            className="relative w-36 h-36 md:w-44 md:h-44 transform-style-3d"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* GIFT BOX LID */}
            <motion.div
              variants={{
                closed: { y: 0, rotateX: 0, rotateY: 0 },
                opened: { y: -140, rotateX: -45, rotateY: 30, opacity: 0, scale: 0.8 }
              }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="absolute top-0 left-0 w-full h-10 bg-burgundy border-b-2 border-rose-gold rounded-t-lg z-30 flex items-center justify-center shadow-lg"
            >
              {/* Gold ribbon ribbon cross */}
              <div className="absolute w-6 h-full bg-rose-gold" />
              {/* Bow */}
              <div className="absolute -top-4 w-12 h-6 bg-rose-gold rounded-full shadow-md flex justify-between px-1">
                <div className="w-4 h-4 bg-rose-gold rounded-full border-r border-burgundy/25" />
                <div className="w-4 h-4 bg-rose-gold rounded-full border-l border-burgundy/25" />
              </div>
            </motion.div>

            {/* GIFT BOX BODY */}
            <div className="absolute top-8 left-0 w-full h-[calc(100%-32px)] bg-burgundy rounded-b-lg z-20 overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Vertical Ribbon */}
              <div className="absolute w-6 h-full bg-rose-gold flex items-center justify-center" />
              {/* Horizontal Ribbon */}
              <div className="absolute w-full h-6 bg-rose-gold" />
              
              {/* Inner magic glow (revealed when opened) */}
              <AnimatePresence>
                {isOpened && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-radial from-rose-gold via-white to-transparent blur-md z-10"
                    transition={{ duration: 1.5 }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating magic spark particles emitting from inside */}
          {isOpened && (
            <div className="absolute z-10 w-full h-full flex items-center justify-center pointer-events-none">
              <span className="absolute animate-ping w-24 h-24 rounded-full bg-rose-gold/20" />
            </div>
          )}
        </div>

        {/* Stage 2: Message reveal */}
        <div className="h-32 mt-12 flex flex-col items-center justify-center">
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.h2
                  initial={{ filter: "blur(4px)", y: 10 }}
                  animate={{ filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl md:text-3xl font-serif-display italic text-burgundy"
                >
                  {data.openedText}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-3xl md:text-4xl font-extrabold text-burgundy tracking-wide font-sans-clean"
                >
                  {data.subText}
                </motion.p>

                {/* Continue button */}
                <motion.button
                  onClick={onComplete}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2.5 bg-burgundy text-[#FAF8F5] rounded-full text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all hover:bg-burgundy/90 shadow-md"
                >
                  {data.continueText}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
