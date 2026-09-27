"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData, BirthdayBalloon } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { Trophy, Sparkles, PartyPopper } from "lucide-react";

interface PlayfulQuestionProps {
  onComplete: () => void;
}

export default function PlayfulQuestion({ onComplete }: PlayfulQuestionProps) {
  const gameData = surpriseData.balloonPopGame;
  const [poppedIds, setPoppedIds] = useState<number[]>([]);
  const [activeReward, setActiveReward] = useState<BirthdayBalloon | null>(null);
  const [grandUnlocked, setGrandUnlocked] = useState(false);
  const [banter, setBanter] = useState("Tap any floating balloon to pop it, Jii 🤍🧿! 🎈");

  const banters = [
    "Boom! Look at those popping reflexes! 💅",
    "Pop pop! Sibling power activated! ✨",
    "Warning: Brother cannot handle this much grace! 😂",
    "Award claimed! Didi is unstoppable! 🏆",
    "Almost there! The grand finale balloon awaits! 🌟"
  ];

  const handlePop = (balloon: BirthdayBalloon) => {
    if (poppedIds.includes(balloon.id)) return;

    AudioSynth.playPop();
    const updated = [...poppedIds, balloon.id];
    setPoppedIds(updated);
    setActiveReward(balloon);
    setBanter(banters[Math.min(updated.length - 1, banters.length - 1)]);

    if (updated.length === gameData.balloons.length) {
      setTimeout(() => {
        setGrandUnlocked(true);
        AudioSynth.playChime();
        setBanter("🎉 ALL BALLOONS POPPED! Tap the Grand Balloon to proceed!");
      }, 1000);
    }
  };

  const handleGrandPop = () => {
    AudioSynth.playFirework();
    AudioSynth.playSuccess();
    setBanter("✨ HAPPY BIRTHDAY JII! Entering the celebration! 🎂");
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="page-container aurora-bg text-[#FAF8F5] select-none flex flex-col justify-between items-center px-4 py-8 text-center relative overflow-hidden">
      
      {/* Header & Banter Box */}
      <div className="relative z-20 max-w-md w-full flex flex-col items-center gap-2 mt-2">
        <span className="px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
          <PartyPopper className="w-3.5 h-3.5 text-pink-300" />
          Mini Game Arcade
        </span>
        <h2 className="text-2xl md:text-3xl font-serif-display font-extrabold text-white">
          {gameData.title}
        </h2>
        
        {/* Dynamic Banter Bubble */}
        <motion.div
          key={banter}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs md:text-sm text-amber-200 font-medium shadow-md mt-1"
        >
          {banter}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-48 bg-white/10 rounded-full h-2 mt-2 overflow-hidden border border-white/20">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-amber-400 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(poppedIds.length / gameData.balloons.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-[10px] text-purple-300/70 font-mono">
          {poppedIds.length} / {gameData.balloons.length} Popped
        </span>
      </div>

      {/* Floating Interactive Balloons Area */}
      <div className="relative z-20 w-full max-w-md my-4 flex-1 flex flex-wrap items-center justify-center gap-4 md:gap-6 min-h-[300px]">
        {!grandUnlocked ? (
          gameData.balloons.map((balloon, index) => {
            const isPopped = poppedIds.includes(balloon.id);

            return (
              <motion.div
                key={balloon.id}
                animate={
                  !isPopped
                    ? {
                        y: [0, -14, 0],
                        rotate: [-2, 3, -2],
                      }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 2.8 + index * 0.4,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {!isPopped ? (
                  <motion.button
                    onClick={() => handlePop(balloon)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    className={`w-24 h-32 md:w-28 md:h-36 rounded-[50%] bg-gradient-to-b ${balloon.color} shadow-lg relative flex flex-col items-center justify-center p-2 cursor-pointer transition-transform border border-white/30`}
                    style={{
                      borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                    }}
                  >
                    {/* Balloon shine highlight */}
                    <div className="absolute top-3 left-4 w-4 h-6 bg-white/35 rounded-full rotate-[-20deg]" />

                    {/* Balloon Label */}
                    <span className={`text-[11px] md:text-xs font-bold ${balloon.textColor} text-center leading-tight drop-shadow-md px-1`}>
                      {balloon.label}
                    </span>

                    {/* Balloon knot */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-inherit border-t border-black/10 rounded-b-sm" />
                    {/* Balloon string */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-white/40" />
                  </motion.button>
                ) : (
                  /* Popped placeholder icon */
                  <div className="w-24 h-32 md:w-28 md:h-36 flex items-center justify-center opacity-30">
                    <Sparkles className="w-8 h-8 text-amber-300" />
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          /* Grand Celebration Balloon */
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.08, 1], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <motion.button
              onClick={handleGrandPop}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-40 h-52 rounded-[50%] bg-gradient-to-b from-amber-300 via-yellow-400 to-rose-500 shadow-[0_0_60px_rgba(255,209,102,0.8)] border-2 border-white flex flex-col items-center justify-center p-4 cursor-pointer relative"
              style={{
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              }}
            >
              <div className="absolute top-4 left-6 w-6 h-10 bg-white/50 rounded-full rotate-[-20deg]" />
              <Sparkles className="w-8 h-8 text-zinc-900 mb-2 animate-spin" />
              <span className="text-sm font-extrabold text-zinc-900 text-center tracking-wide leading-tight">
                GRAND BIRTHDAY BALLOON 👑
              </span>
              <span className="text-[10px] text-amber-950 font-bold bg-white/80 px-2 py-0.5 rounded-full mt-2">
                TAP TO POP! 💥
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Pop-up Sisterhood Award Card */}
      <AnimatePresence>
        {activeReward && (
          <motion.div
            key={activeReward.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative z-30 w-full max-w-sm birthday-glass-card rounded-2xl p-4 border border-amber-300/40 shadow-xl flex items-start gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[#FFD166] shrink-0 mt-0.5">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs uppercase tracking-wider text-amber-200 font-bold">
                {activeReward.label}
              </h4>
              <p className="text-xs text-white/90 font-medium mt-0.5 leading-snug">
                {activeReward.reward}
              </p>
              <p className="text-[11px] text-pink-300 italic mt-1 font-sans-clean">
                &ldquo;{activeReward.compliment}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip/Continue button */}
      <div className="relative z-20 mt-4">
        <button
          onClick={onComplete}
          className="text-xs text-purple-300/60 hover:text-white underline cursor-pointer tracking-wider font-sans-clean transition-colors"
        >
          {grandUnlocked ? "Continue to Birthday Cake ➡️" : "Skip Game ➡️"}
        </button>
      </div>
    </div>
  );
}
