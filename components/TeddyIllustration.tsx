"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { AudioSynth } from "./MusicControl";

// CUTE TEDDY ILLUSTRATION COMPONENT
export function TeddyCharacter({ 
  pose, 
  speechBubble 
}: { 
  pose: "peeking" | "celebrating" | "album" | "carrying-gift" | "envelope" | "together";
  speechBubble?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Speech bubble */}
      {speechBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute -top-16 bg-white dark:bg-zinc-900 border border-burgundy/10 dark:border-rose-gold/20 text-burgundy dark:text-rose-gold px-4 py-2 rounded-2xl shadow-md text-xs font-semibold whitespace-nowrap z-30"
        >
          {speechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-burgundy/10 dark:border-rose-gold/20 rotate-45" />
        </motion.div>
      )}

      {/* SVG Teddy Body */}
      {pose === "peeking" && (
        <motion.div
          initial={{ x: -80, rotate: -20 }}
          animate={{ x: 0, rotate: -10 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="w-24 h-24"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Ears */}
            <circle cx="25" cy="30" r="12" fill="#D3A27F" />
            <circle cx="25" cy="30" r="7" fill="#E8C4A0" />
            <circle cx="75" cy="30" r="12" fill="#D3A27F" />
            <circle cx="75" cy="30" r="7" fill="#E8C4A0" />
            {/* Head */}
            <circle cx="50" cy="55" r="28" fill="#D3A27F" />
            {/* Snout */}
            <ellipse cx="50" cy="62" rx="12" ry="8" fill="#FAF8F5" />
            {/* Nose */}
            <polygon points="46,58 54,58 50,63" fill="#4A3425" />
            {/* Eyes */}
            <circle cx="40" cy="48" r="3.5" fill="#4A3425" />
            <circle cx="40.5" cy="46.5" r="1" fill="#FFF" />
            <circle cx="60" cy="48" r="3.5" fill="#4A3425" />
            <circle cx="60.5" cy="46.5" r="1" fill="#FFF" />
            {/* Blush */}
            <circle cx="33" cy="55" r="4.5" fill="#FFA5A5" opacity="0.6" />
            <circle cx="67" cy="55" r="4.5" fill="#FFA5A5" opacity="0.6" />
            {/* Cute smile */}
            <path d="M46,65 Q50,68 54,65" fill="none" stroke="#4A3425" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {pose === "celebrating" && (
        <motion.div
          animate={{ y: [0, -15, 0], scaleY: [1, 0.9, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-28 h-28"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Ears */}
            <circle cx="25" cy="25" r="12" fill="#D3A27F" />
            <circle cx="25" cy="25" r="7" fill="#E8C4A0" />
            <circle cx="75" cy="25" r="12" fill="#D3A27F" />
            <circle cx="75" cy="25" r="7" fill="#E8C4A0" />
            {/* Arms (Up) */}
            <motion.path 
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              d="M15,45 Q5,30 10,25" fill="none" stroke="#D3A27F" strokeWidth="10" strokeLinecap="round" 
            />
            <motion.path 
              animate={{ rotate: [0, -20, 20, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              d="M85,45 Q95,30 90,25" fill="none" stroke="#D3A27F" strokeWidth="10" strokeLinecap="round" 
            />
            {/* Body */}
            <rect x="32" y="55" width="36" height="30" rx="15" fill="#D3A27F" />
            {/* Head */}
            <circle cx="50" cy="45" r="25" fill="#D3A27F" />
            {/* Snout */}
            <ellipse cx="50" cy="50" rx="10" ry="7" fill="#FAF8F5" />
            <polygon points="47,47 53,47 50,51" fill="#4A3425" />
            {/* Eyes */}
            <circle cx="42" cy="38" r="3" fill="#4A3425" />
            <circle cx="58" cy="38" r="3" fill="#4A3425" />
            {/* Blush */}
            <circle cx="35" cy="44" r="4" fill="#FFA5A5" opacity="0.6" />
            <circle cx="65" cy="44" r="4" fill="#FFA5A5" opacity="0.6" />
            {/* Smile */}
            <path d="M47,53 Q50,56 53,53" fill="none" stroke="#4A3425" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {pose === "album" && (
        <div className="w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="28" cy="35" r="10" fill="#D3A27F" />
            <circle cx="72" cy="35" r="10" fill="#D3A27F" />
            <rect x="35" y="60" width="30" height="25" rx="10" fill="#D3A27F" />
            <circle cx="50" cy="50" r="22" fill="#D3A27F" />
            <ellipse cx="50" cy="55" rx="9" ry="6" fill="#FAF8F5" />
            <polygon points="48,53 52,53 50,56" fill="#4A3425" />
            <circle cx="43" cy="44" r="2.5" fill="#4A3425" />
            <circle cx="57" cy="44" r="2.5" fill="#4A3425" />
            {/* Little book/album */}
            <rect x="40" y="70" width="20" height="15" rx="2" fill="#5C2526" />
            <line x1="50" y1="70" x2="50" y2="85" stroke="#D8B48F" strokeWidth="1.5" />
            <circle cx="45" cy="77" r="1.5" fill="#E3B7A8" />
            <circle cx="55" cy="77" r="1.5" fill="#E3B7A8" />
          </svg>
        </div>
      )}

      {pose === "carrying-gift" && (
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-24 h-24 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="30" cy="35" r="10" fill="#D3A27F" />
            <circle cx="70" cy="35" r="10" fill="#D3A27F" />
            <circle cx="50" cy="50" r="20" fill="#D3A27F" />
            <ellipse cx="50" cy="54" rx="8" ry="5" fill="#FAF8F5" />
            <circle cx="44" cy="44" r="2.5" fill="#4A3425" />
            <circle cx="56" cy="44" r="2.5" fill="#4A3425" />
            {/* Big gift box carrying */}
            <motion.rect 
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 1 }}
              x="30" y="62" width="40" height="28" rx="4" fill="#D8B48F" 
            />
            <rect x="28" y="59" width="44" height="6" rx="2" fill="#5C2526" />
            <line x1="50" y1="59" x2="50" y2="90" stroke="#5C2526" strokeWidth="3" />
          </svg>
        </motion.div>
      )}

      {pose === "envelope" && (
        <div className="w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="28" cy="35" r="10" fill="#D3A27F" />
            <circle cx="72" cy="35" r="10" fill="#D3A27F" />
            <circle cx="50" cy="50" r="22" fill="#D3A27F" />
            <ellipse cx="50" cy="55" rx="9" ry="6" fill="#FAF8F5" />
            <circle cx="43" cy="44" r="2.5" fill="#4A3425" />
            <circle cx="57" cy="44" r="2.5" fill="#4A3425" />
            {/* Envelope */}
            <path d="M30,68 L70,68 L70,88 L30,88 Z" fill="#F6F3EC" stroke="#5C2526" strokeWidth="2" />
            <path d="M30,68 L50,78 L70,68" fill="none" stroke="#5C2526" strokeWidth="2" />
          </svg>
        </div>
      )}

      {pose === "together" && (
        <div className="w-32 h-24 flex gap-1">
          {/* Sibling 1 (Jii) */}
          <svg viewBox="0 0 100 100" className="w-16 h-full">
            <circle cx="30" cy="35" r="8" fill="#E8C4A0" />
            <circle cx="70" cy="35" r="8" fill="#E8C4A0" />
            <circle cx="50" cy="48" r="18" fill="#E8C4A0" />
            {/* Cute pink bow */}
            <circle cx="35" cy="22" r="3" fill="#E76161" />
            <polygon points="35,22 41,18 41,26" fill="#E76161" />
            <polygon points="35,22 29,18 29,26" fill="#E76161" />
            <ellipse cx="50" cy="52" rx="7" ry="5" fill="#FAF8F5" />
            <circle cx="44" cy="43" r="2" fill="#4A3425" />
            <circle cx="56" cy="43" r="2" fill="#4A3425" />
          </svg>
          {/* Sibling 2 (Brother) */}
          <svg viewBox="0 0 100 100" className="w-16 h-full">
            <circle cx="30" cy="35" r="8" fill="#D3A27F" />
            <circle cx="70" cy="35" r="8" fill="#D3A27F" />
            <circle cx="50" cy="48" r="18" fill="#D3A27F" />
            <ellipse cx="50" cy="52" rx="7" ry="5" fill="#FAF8F5" />
            <circle cx="44" cy="43" r="2" fill="#4A3425" />
            <circle cx="56" cy="43" r="2" fill="#4A3425" />
            {/* Sibling hug line */}
            <path d="M25,75 Q32,60 38,70" fill="none" stroke="#D3A27F" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

// BIRTHDAY CAKE & CANDLE BLOWING SCENE
export function BirthdayCakeScene({ onFinished }: { onFinished: () => void }) {
  const [isBlown, setIsBlown] = useState(false);
  const [celebrateText, setCelebrateText] = useState("Tap the candle or button to blow it out! 🕯️");

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);
    AudioSynth.playSuccess();
    setCelebrateText("🎉 YAAAY! Happy Birthday Jii 🤍🧿! 🎂✨");

    setTimeout(() => {
      onFinished();
    }, 2000);
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center relative select-none">
      {/* Speech / Instruction Bubble */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 bg-white px-4 py-2 rounded-2xl shadow-md border border-rose-gold/30 text-burgundy font-medium text-xs md:text-sm text-center"
      >
        {celebrateText}
      </motion.div>

      {/* SVG Interactive Birthday Cake */}
      <div 
        onClick={handleBlow}
        className="cursor-pointer relative w-64 h-64 flex items-center justify-center group"
      >
        {/* Glow backdrop */}
        <div className={`absolute inset-0 bg-radial from-rose-gold/30 to-transparent rounded-full blur-2xl transition-all duration-700 ${isBlown ? "scale-150 opacity-40" : "scale-100 opacity-70"}`} />

        <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
          <defs>
            <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="50%" stopColor="#FF8C42" />
              <stop offset="100%" stopColor="#FF3C38" />
            </radialGradient>
            <linearGradient id="cakeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8F0" />
              <stop offset="100%" stopColor="#F4E8DB" />
            </linearGradient>
            <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E38B29" />
              <stop offset="100%" stopColor="#5C2526" />
            </linearGradient>
          </defs>

          {/* Cake Stand / Plate */}
          <ellipse cx="100" cy="175" rx="75" ry="12" fill="#EAD8C0" />
          <ellipse cx="100" cy="173" rx="70" ry="10" fill="#FAF8F5" stroke="#D8B48F" strokeWidth="1.5" />

          {/* Bottom Cake Layer */}
          <rect x="45" y="125" width="110" height="42" rx="6" fill="url(#cakeGrad1)" stroke="#D8B48F" strokeWidth="1" />
          {/* Bottom Frosting drips */}
          <path d="M45,125 Q55,138 65,125 Q75,140 85,125 Q95,138 105,125 Q115,140 125,125 Q135,138 145,125 Q150,135 155,125 L155,122 L45,122 Z" fill="#E76161" opacity="0.85" />

          {/* Strawberries on bottom tier */}
          <circle cx="58" cy="122" r="4" fill="#E76161" />
          <circle cx="100" cy="122" r="4" fill="#E76161" />
          <circle cx="142" cy="122" r="4" fill="#E76161" />

          {/* Top Cake Layer */}
          <rect x="65" y="90" width="70" height="34" rx="5" fill="#FAF8F5" stroke="#D8B48F" strokeWidth="1" />
          {/* Top Frosting drips */}
          <path d="M65,90 Q75,102 85,90 Q95,104 105,90 Q115,102 125,90 Q130,98 135,90 L135,88 L65,88 Z" fill="#D8B48F" />

          {/* Candle */}
          <rect x="97" y="58" width="6" height="30" rx="2" fill="#FFF" stroke="#E76161" strokeWidth="1" />
          {/* Candle stripes */}
          <line x1="97" y1="65" x2="103" y2="69" stroke="#E76161" strokeWidth="1.5" />
          <line x1="97" y1="74" x2="103" y2="78" stroke="#E76161" strokeWidth="1.5" />
          {/* Wick */}
          <line x1="100" y1="58" x2="100" y2="52" stroke="#4A3425" strokeWidth="1" />

          {/* Candle Flame (Interactive / Animated) */}
          {!isBlown ? (
            <motion.g
              animate={{
                scale: [1, 1.1, 0.95, 1],
                rotate: [-2, 3, -3, 0],
                y: [0, -1, 1, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              transform-origin="100 45"
            >
              {/* Outer flame glow */}
              <circle cx="100" cy="45" r="10" fill="#FF8C42" opacity="0.3" filter="blur(2px)" />
              {/* Main Flame teardrop */}
              <path
                d="M 100,32 C 96,40 94,44 94,48 C 94,52 97,55 100,55 C 103,55 106,52 106,48 C 106,44 104,40 100,32 Z"
                fill="url(#flameGrad)"
              />
              <ellipse cx="100" cy="48" rx="2.5" ry="4" fill="#FFF275" />
            </motion.g>
          ) : (
            /* Smoke Wisp on extinguish */
            <motion.g
              initial={{ opacity: 0.8, y: 0 }}
              animate={{ opacity: 0, y: -25, scale: 1.5 }}
              transition={{ duration: 1.5 }}
            >
              <path
                d="M 100,50 Q 96,42 102,35 Q 98,28 100,20"
                fill="none"
                stroke="#D3D3D3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 2"
              />
            </motion.g>
          )}

          {/* Happy Sibling Teddies next to the cake */}
          {/* Left Teddy */}
          <circle cx="28" cy="140" r="14" fill="#D3A27F" />
          <circle cx="20" cy="128" r="5" fill="#E8C4A0" />
          {/* Left party hat */}
          <polygon points="28,116 22,130 34,130" fill="#E76161" />
          <circle cx="28" cy="115" r="2" fill="#FAF8F5" />
          <circle cx="24" cy="138" r="1.5" fill="#4A3425" />
          <circle cx="32" cy="138" r="1.5" fill="#4A3425" />

          {/* Right Teddy */}
          <circle cx="172" cy="140" r="14" fill="#E8C4A0" />
          <circle cx="180" cy="128" r="5" fill="#D3A27F" />
          {/* Right party hat */}
          <polygon points="172,116 166,130 178,130" fill="#D8B48F" />
          <circle cx="172" cy="115" r="2" fill="#5C2526" />
          <circle cx="168" cy="138" r="1.5" fill="#4A3425" />
          <circle cx="176" cy="138" r="1.5" fill="#4A3425" />
        </svg>
      </div>

      {/* Blow Button */}
      <motion.button
        onClick={handleBlow}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-8 py-3 bg-burgundy text-[#FAF8F5] rounded-full text-xs md:text-sm font-bold tracking-widest uppercase cursor-pointer shadow-lg hover:bg-burgundy/90 transition-all flex items-center gap-2"
      >
        {isBlown ? "Wish Granted! ✨" : "Blow The Candle 🎂💨"}
      </motion.button>
    </div>
  );
}

// RAKHI TYING CINEMATIC SCENE (Preserved for compatibility)
export function RakhiTyingScene({ onFinished }: { onFinished: () => void }) {
  return <BirthdayCakeScene onFinished={onFinished} />;
}
