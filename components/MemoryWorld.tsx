"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData, PolaroidMemory } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { TeddyCharacter } from "./TeddyIllustration";
import { X } from "lucide-react";

interface MemoryWorldProps {
  onComplete: () => void;
}

export default function MemoryWorld({ onComplete }: MemoryWorldProps) {
  const [activePhoto, setActivePhoto] = useState<PolaroidMemory | null>(null);
  const memories = surpriseData.memories;

  const handlePhotoClick = (photo: PolaroidMemory) => {
    AudioSynth.playChime();
    setActivePhoto(photo);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    AudioSynth.playClick();
    setActivePhoto(null);
  };

  return (
    <div className="page-container bg-[#F6F3EC] paper-texture text-foreground p-4">
      {/* Decorative Scrapbook overlay elements */}
      <div className="absolute inset-0 bg-[#E3B7A8]/5 pointer-events-none" />

      {/* Scrapbook Header */}
      <div className="relative z-20 text-center mb-6 max-w-md mt-6 flex flex-col items-center justify-center">
        <div className="mb-1">
          <TeddyCharacter pose="album" />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-widest text-burgundy/60 font-semibold"
        >
          Our Sibling Album
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-serif-display italic text-burgundy font-semibold mt-1"
        >
          Scrapbook of Memories
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-burgundy/80 mt-1 font-sans-clean"
        >
          (Hold and drag them around! Tap to open 💫)
        </motion.p>
      </div>

      {/* Album Board */}
      <div className="relative w-full max-w-md h-[400px] md:h-[450px] flex items-center justify-center mb-8">
        {memories.map((mem, index) => {
          // Absolute coordinates scattered in the container frame
          const topPercent = 15 + (index % 2) * 35 + (index * 5) % 15;
          const leftPercent = 10 + (index * 22) % 60;

          return (
            <motion.div
              key={mem.id}
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.05, zIndex: 40 }}
              initial={{ 
                opacity: 0, 
                scale: 0.8, 
                rotate: mem.rotation * 3,
                x: (index - 1.5) * 50,
                y: (index - 1.5) * 30
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: mem.rotation,
                x: 0,
                y: 0
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: index * 0.2 
              }}
              onClick={() => handlePhotoClick(mem)}
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
              }}
              className="absolute w-36 h-44 md:w-44 md:h-52 bg-white p-3 shadow-md rounded-sm border border-black/5 flex flex-col justify-between cursor-pointer select-none z-20 group hover:shadow-xl hover:-translate-y-1 transition-shadow"
            >
              {/* Paper Washi Tape design */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 scrapbook-tape z-30" />

              {/* Photo Canvas */}
              <div className="w-full h-32 md:h-36 bg-zinc-100 overflow-hidden relative rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mem.image}
                  alt={mem.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>

              {/* Caption Line */}
              <div className="w-full flex items-center justify-between mt-2 px-1">
                <span className="text-[10px] text-burgundy/50 font-sans-clean font-semibold uppercase">{mem.date}</span>
                <span className="text-[9px] text-rose-gold font-handwritten">Jii & Me</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Proceed Button */}
      <motion.button
        onClick={onComplete}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-30 px-8 py-3.5 bg-burgundy text-[#FAF8F5] rounded-full font-bold tracking-widest text-xs uppercase cursor-pointer shadow-lg hover:bg-burgundy/90 transition-all mb-6"
      >
        I have a surprise... 👀
      </motion.button>

      {/* Polaroid detail popup */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, rotate: 2 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-5 md:p-6 w-full max-w-sm rounded-lg shadow-2xl border border-black/10 flex flex-col items-center gap-4 relative"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Taped overlay */}
              <div className="absolute -top-4 w-24 h-6 scrapbook-tape" />

              {/* Picture frame */}
              <div className="w-full h-64 bg-zinc-100 overflow-hidden relative rounded-md border border-zinc-200/50 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activePhoto.image}
                  alt={activePhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details & Caption */}
              <div className="w-full flex flex-col gap-2 text-center px-1">
                <span className="text-xs uppercase tracking-widest text-rose-gold font-bold">{activePhoto.date}</span>
                <p className="font-handwritten text-2xl md:text-3xl text-burgundy mt-1 leading-normal">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
