"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData, BirthdayVaultGift } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { X, Gift, Sparkles, Heart, Film } from "lucide-react";

interface GiftCollectionProps {
  onComplete: () => void;
}

export default function GiftCollection({ onComplete }: GiftCollectionProps) {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [activeGift, setActiveGift] = useState<BirthdayVaultGift | null>(null);
  
  const gifts = surpriseData.vaultGifts;

  const handleOpenGift = (gift: BirthdayVaultGift) => {
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts((prev) => [...prev, gift.id]);
    }
    
    if (gift.giftType === "video") {
      AudioSynth.playFirework();
    } else if (gift.giftType === "jukebox") {
      AudioSynth.playSuccess();
    } else {
      AudioSynth.playGiftOpen();
    }

    setActiveGift(gift);
  };

  const handleCloseDetail = () => {
    AudioSynth.playClick();
    setActiveGift(null);
  };

  const isAllOpened = openedGifts.length === gifts.length;

  return (
    <div className="page-container aurora-bg text-[#FAF8F5] select-none flex flex-col justify-between items-center px-4 py-8 text-center relative overflow-hidden">
      
      {/* Header */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-md w-full mt-2">
        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-xs uppercase tracking-widest text-[#FFD166] font-semibold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          Exclusive Unlocks
        </span>
        <h2 className="text-2xl md:text-4xl font-serif-display font-extrabold text-white mt-1">
          The Birthday Vault 🎁
        </h2>
        <p className="text-xs text-purple-200/80 mt-1 font-sans-clean">
          Tap each mystery box to unlock what is inside!
        </p>
      </div>

      {/* Gifts 2x2 Grid */}
      <div className="relative z-20 grid grid-cols-2 gap-4 w-full max-w-sm my-6">
        {gifts.map((gift) => {
          const isOpened = openedGifts.includes(gift.id);
          return (
            <motion.button
              key={gift.id}
              onClick={() => handleOpenGift(gift)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 p-4 cursor-pointer relative shadow-xl border transition-all ${
                isOpened 
                  ? "bg-white/5 border-white/10 text-white/40 shadow-inner" 
                  : "birthday-glass-card border-amber-300/40 text-white hover:border-amber-300 hover:shadow-[0_0_25px_rgba(255,209,102,0.4)]"
              }`}
            >
              {/* Ribbon Wrapped Accent */}
              <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-amber-400/10 pointer-events-none ${isOpened ? "opacity-20" : "opacity-100"}`} />
              <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-amber-400/10 pointer-events-none ${isOpened ? "opacity-20" : "opacity-100"}`} />

              <motion.div
                animate={isOpened ? { rotate: [0, 5, -5, 0] } : { y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: isOpened ? 4 : 2, ease: "easeInOut" }}
                className="relative z-10"
              >
                {gift.giftType === "video" ? (
                  <Film className={`w-10 h-10 ${isOpened ? "text-white/20" : "text-pink-400 animate-pulse"}`} />
                ) : (
                  <Gift className={`w-10 h-10 ${isOpened ? "text-white/20" : "text-amber-300"}`} />
                )}
              </motion.div>
              
              <span className="text-xs font-bold tracking-wider uppercase relative z-10 font-sans-clean mt-1">
                {isOpened ? "Unlocked" : `Gift #${gift.id}`}
              </span>
              <span className="text-[10px] text-purple-200/70 max-w-[100px] leading-tight truncate">
                {gift.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom CTA to open Letter */}
      <div className="relative z-20 h-14 flex items-center justify-center">
        <AnimatePresence>
          {isAllOpened && (
            <motion.button
              onClick={onComplete}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white rounded-full font-bold tracking-widest text-xs uppercase cursor-pointer shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
            >
              The Golden Birthday Letter 💌✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Gift Detail Modal */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetail}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="birthday-glass-card p-6 w-full max-w-sm rounded-3xl border border-amber-300/50 shadow-2xl flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDetail}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center gap-2 mt-1">
                <span className="text-[11px] uppercase tracking-widest text-amber-300 font-bold">
                  {activeGift.sub}
                </span>
                
                {/* Photo Gift Render */}
                {activeGift.giftType === "photo" && activeGift.image && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-52 rounded-2xl overflow-hidden border border-white/20 shadow-inner mt-2 mb-1"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={activeGift.image} 
                      alt="Special Memory" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}

                {/* Video Gift Render */}
                {activeGift.giftType === "video" && activeGift.video && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-52 rounded-2xl overflow-hidden border border-white/20 shadow-inner mt-2 mb-1 bg-black"
                  >
                    <video 
                      src={activeGift.video} 
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                )}

                {/* Sibling Jukebox Gift Render */}
                {activeGift.giftType === "jukebox" && activeGift.songs && (
                  <div className="w-full flex flex-col gap-2 my-2">
                    {activeGift.songs.map((song, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="bg-white/10 p-3 rounded-2xl border border-white/15 flex items-center justify-between text-left hover:bg-white/15 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block leading-tight">{song.title}</span>
                            <span className="text-[11px] text-purple-200/80">{song.subtitle}</span>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 font-semibold uppercase tracking-wider shrink-0 border border-amber-300/30">
                          {song.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="text-xl font-bold font-serif-display text-white mt-1">
                  {activeGift.title}
                </h3>

                <p className="text-sm text-purple-100/90 leading-relaxed font-sans-clean mt-1">
                  {activeGift.message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
