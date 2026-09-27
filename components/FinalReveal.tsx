"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { Heart, Sparkles, RotateCcw } from "lucide-react";

interface FireworkBurst {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function FinalReveal() {
  const [fireworks, setFireworks] = useState<FireworkBurst[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const data = surpriseData.finalFireworks;

  const colors = ["#FF5C8D", "#FFD166", "#06D6A0", "#4CC9F0", "#C77DFF", "#FF85A1"];

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    AudioSynth.playFirework();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBurst: FireworkBurst = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setFireworks((prev) => [...prev.slice(-12), newBurst]);
  };

  const handleEasterEgg = (e: React.MouseEvent) => {
    e.stopPropagation();
    AudioSynth.playChime();
    setShowEasterEgg(true);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    AudioSynth.playClick();
    window.location.reload();
  };

  return (
    <div 
      onClick={handleScreenClick}
      className="page-container aurora-bg text-[#FAF8F5] select-none text-center px-4 py-8 relative cursor-crosshair overflow-hidden"
    >
      {/* Background starlight glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Dynamic Interactive Fireworks Bursts */}
      {fireworks.map((fw) => (
        <motion.div
          key={fw.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 2.5, 3.5], opacity: [1, 0.8, 0] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ left: fw.x, top: fw.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
        >
          {/* Central Burst */}
          <div 
            className="w-12 h-12 rounded-full blur-sm"
            style={{ backgroundColor: fw.color, boxShadow: `0 0 40px 15px ${fw.color}` }}
          />
          {/* Spark rays */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: 45 }}
                transition={{ duration: 0.6 }}
                style={{
                  transform: `rotate(${angle}deg) translateX(25px)`,
                  backgroundColor: fw.color
                }}
                className="h-1 rounded-full shadow-[0_0_8px_white]"
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Main Glass Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="relative z-20 max-w-lg w-full birthday-glass-card p-8 md:p-10 rounded-3xl border border-amber-300/40 shadow-2xl flex flex-col items-center gap-5 my-auto"
      >
        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-xs uppercase tracking-widest text-[#FFD166] font-semibold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          GRAND FINALE
        </span>

        {/* Highlight Title */}
        <h1 className="text-3xl md:text-5xl font-serif-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-200 tracking-wide leading-tight drop-shadow-[0_2px_15px_rgba(255,209,102,0.4)]">
          {data.title}
        </h1>

        <p className="text-sm md:text-base text-purple-100/90 font-sans-clean max-w-sm leading-relaxed">
          {data.closing}
        </p>

        {/* Fireworks tap prompt */}
        <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs text-amber-200 font-medium animate-pulse mt-2">
          {data.subtitle}
        </div>

        {/* Author signature */}
        <span className="text-sm font-handwritten text-purple-200/80 text-xl mt-3">
          {data.author}
        </span>

        {/* Action Controls */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 w-full justify-center">
          <button
            onClick={handleReplay}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay Gala 🔄
          </button>

          <button
            onClick={handleEasterEgg}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-xs font-semibold uppercase tracking-wider text-white transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            Secret Tap 🎁
          </button>
        </div>
      </motion.div>

      {/* Easter Egg Overlay Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 select-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="birthday-glass-card text-white p-7 w-full max-w-sm rounded-3xl shadow-2xl text-center border border-amber-300/40 flex flex-col items-center gap-4 relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-[#FFD166] mb-1">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display font-bold text-2xl text-white">The Birthday Sibling Guarantee 📜🎂</h3>
              <p className="text-sm text-purple-100/90 leading-relaxed font-sans-clean">
                &ldquo;By blowing out your birthday candles today, you unlock unlimited sibling love, zero complaints (strictly for today 😂), free snacks, and a lifetime brother protection pass! Happy Birthday Didi! 🎂❤️&rdquo;
              </p>
              <button
                onClick={() => setShowEasterEgg(false)}
                className="mt-2 px-8 py-3 bg-gradient-to-r from-amber-400 to-pink-500 text-black font-bold rounded-full text-xs uppercase tracking-widest cursor-pointer shadow-lg hover:brightness-110 transition-all"
              >
                Deal! 😉❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
