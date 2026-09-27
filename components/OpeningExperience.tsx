"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { Sparkles, Ticket, Star, CheckCircle2 } from "lucide-react";

interface OpeningExperienceProps {
  onComplete: () => void;
  startMusic: () => void;
}

export default function OpeningExperience({ onComplete, startMusic }: OpeningExperienceProps) {
  const [isValidating, setIsValidating] = useState(false);
  const data = surpriseData.vipPass;

  const handleValidate = () => {
    if (isValidating) return;
    setIsValidating(true);
    AudioSynth.playGiftOpen();
    startMusic();

    setTimeout(() => {
      AudioSynth.playSuccess();
      onComplete();
    }, 1200);
  };

  return (
    <div className="page-container aurora-bg text-[#FAF8F5] select-none flex flex-col justify-center items-center px-4 py-8 text-center relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Intro Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 flex flex-col items-center gap-2 mb-6"
      >
        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-xs font-semibold uppercase tracking-widest text-[#FFD166] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166] animate-spin" />
          {data.badge}
        </span>
        <h1 className="text-3xl md:text-5xl font-serif-display font-extrabold text-white tracking-wide mt-1">
          For Jii 🤍🧿
        </h1>
        <p className="text-xs md:text-sm text-purple-200/80 font-sans-clean max-w-sm">
          An exclusive all-access pass to your personal birthday celebration.
        </p>
      </motion.div>

      {/* Holographic VIP Birthday Ticket */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.2 }}
        className={`relative z-20 w-full max-w-md birthday-glass-card rounded-3xl p-6 md:p-8 flex flex-col gap-5 border border-amber-300/40 shadow-2xl transition-all duration-700 ${
          isValidating ? "scale-105 border-[#06D6A0] shadow-[0_0_50px_rgba(6,214,160,0.5)]" : ""
        }`}
      >
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[#FFD166]">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-200/70 font-semibold block">VIP ACCESS</span>
              <h3 className="text-base font-bold text-white font-sans-clean leading-none mt-0.5">Birthday Gala 2026</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-purple-300/70 font-mono block">PASS ID</span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">{data.ticketNumber.substring(0, 12)}</span>
          </div>
        </div>

        {/* Guest Info */}
        <div className="text-left bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] uppercase tracking-widest text-purple-300 font-semibold">GUEST OF HONOR</span>
            <div className="flex text-amber-400 gap-0.5">
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold font-serif-display text-white tracking-wide">
            {data.guestOfHonor}
          </p>
        </div>

        {/* Exclusive Perks List */}
        <div className="flex flex-col gap-2 text-left">
          <span className="text-[10px] uppercase tracking-widest text-amber-200/60 font-semibold">UNLOCKED SISTERHOOD PERKS</span>
          <div className="grid grid-cols-1 gap-2">
            {data.perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-purple-100/90 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#06D6A0] shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Barcode & Hologram Stamp */}
        <div className="border-t border-dashed border-white/20 pt-4 flex items-center justify-between">
          <div className="text-left">
            <div className="font-mono text-xs tracking-widest text-white/40">|||| | ||||| || |||||| | |||</div>
            <span className="text-[9px] text-white/40 font-mono">NON-TRANSFERABLE • VALID FOREVER</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-[10px] font-bold uppercase tracking-wider">
            Verified Sister 🤍
          </span>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleValidate}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-4 mt-1 rounded-2xl font-sans-clean font-bold text-sm tracking-widest uppercase cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 ${
            isValidating
              ? "bg-[#06D6A0] text-black shadow-[0_0_30px_rgba(6,214,160,0.6)]"
              : "bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white hover:brightness-110 shadow-[0_0_25px_rgba(255,92,141,0.4)]"
          }`}
        >
          {isValidating ? "ACCESS GRANTED! 🎉" : data.buttonPrompt}
        </motion.button>
      </motion.div>
    </div>
  );
}
