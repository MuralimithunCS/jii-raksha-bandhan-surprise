"use client";

import React, { useEffect, useRef } from "react";
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

// RAKHI TYING CINEMATIC SCENE
export function RakhiTyingScene({ onFinished }: { onFinished: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const centerpieceRef = useRef<SVGGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Tying timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onFinished, 1500);
      }
    });

    // Reset styles
    gsap.set(pathRef.current, { strokeDasharray: 200, strokeDashoffset: 200 });
    gsap.set(centerpieceRef.current, { scale: 0, opacity: 0 });
    gsap.set(glowRef.current, { scale: 0.1, opacity: 0 });

    // Step 1: Thread wraps wrist (animate dashoffset)
    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.inOut",
    });

    // Step 2: Centerpiece drops down & bounces
    tl.to(centerpieceRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.8)",
    }, "-=0.3");

    // Step 3: Sparkles burst & light expand
    tl.to(glowRef.current, {
      scale: 5,
      opacity: 0.8,
      duration: 1.2,
      ease: "power3.out",
      onStart: () => {
        AudioSynth.playSuccess();
      }
    }, "-=0.2");

    tl.to(glowRef.current, {
      opacity: 0,
      duration: 0.5
    });

  }, [onFinished]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-sm h-64 md:h-72 relative flex items-center justify-center overflow-hidden bg-transparent select-none"
    >
      {/* Golden spotlight background glow */}
      <div 
        ref={glowRef}
        className="absolute w-24 h-24 bg-radial-gradient from-rose-gold/80 to-transparent rounded-full blur-xl z-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D8B48F 0%, transparent 70%)" }}
      />

      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="rakhiThreadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E76161" />
            <stop offset="50%" stopColor="#E38B29" />
            <stop offset="100%" stopColor="#FAF8F5" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Brother's Wrist (Horizontal cylinder block) */}
        <motion.rect 
          initial={{ x: -10, opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          x="30" y="80" width="140" height="40" rx="10" fill="#D3A27F" opacity="0.9" 
        />
        {/* Sleeve */}
        <rect x="25" y="75" width="25" height="50" rx="2" fill="#5C2526" />

        {/* Rakhi Thread path wrap (curves wrapping around the center of the wrist) */}
        <path 
          ref={pathRef}
          d="M 100,50 Q 80,100 100,150 Q 120,100 100,50 Q 75,95 100,95 Q 125,95 100,50" 
          fill="none" 
          stroke="url(#rakhiThreadGrad)" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />

        {/* Sibling hands illustration (Stylized) */}
        {/* Jii's Hand tying (reaches from top right) */}
        <motion.path 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          d="M170,30 Q140,55 110,65" fill="none" stroke="#E8C4A0" strokeWidth="8" strokeLinecap="round" 
        />
        {/* Sibling fingers */}
        <circle cx="110" cy="65" r="4.5" fill="#E8C4A0" />

        {/* CENTERPIECE RAKHI (Beautiful flower bead shape settling in) */}
        <g ref={centerpieceRef} transform="translate(100,98)">
          {/* Red petals */}
          <circle cx="0" cy="0" r="16" fill="#E76161" filter="url(#glow)" />
          {/* Gold flower frame */}
          <polygon points="0,-14 4,-4 14,-4 6,2 9,12 0,6 -9,12 -6,2 -14,-4 -4,-4" fill="#D8B48F" />
          {/* Tiny beads */}
          <circle cx="-10" cy="0" r="2.5" fill="#FFF" />
          <circle cx="10" cy="0" r="2.5" fill="#FFF" />
          {/* Center emerald bead */}
          <circle cx="0" cy="0" r="5" fill="#5C2526" />
          <circle cx="0" cy="0" r="2" fill="#EAD8C0" />
        </g>
      </svg>
    </div>
  );
}
