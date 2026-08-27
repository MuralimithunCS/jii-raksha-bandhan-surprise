"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData, SecretGift } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { TeddyCharacter } from "./TeddyIllustration";
import { X, Gift } from "lucide-react";

interface GiftCollectionProps {
  onComplete: () => void;
}

export default function GiftCollection({ onComplete }: GiftCollectionProps) {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [activeGift, setActiveGift] = useState<SecretGift | null>(null);
  
  const gifts = surpriseData.secretGifts;

  const handleOpenGift = (gift: SecretGift) => {
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts((prev) => [...prev, gift.id]);
    }
    
    // Play sound based on gift type
    if (gift.giftType === "hearts") {
      AudioSynth.playSuccess();
    } else if (gift.giftType === "spotlight") {
      AudioSynth.playChime();
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
    <div className="page-container bg-background paper-texture text-foreground p-4">
      <div className="absolute inset-0 bg-[#5C2526]/5 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center max-w-lg w-full px-6 text-center select-none">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="mb-1">
            <TeddyCharacter pose="carrying-gift" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xs uppercase tracking-widest font-semibold text-burgundy"
          >
            Just a few more things...
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-serif-display italic text-burgundy mt-1"
          >
            But Jii... I have a few secret gifts for you.
          </motion.h3>
          <p className="text-xs text-burgundy/60 mt-1">Tap each to reveal what is inside</p>
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
          {gifts.map((gift) => {
            const isOpened = openedGifts.includes(gift.id);
            return (
              <motion.button
                key={gift.id}
                onClick={() => handleOpenGift(gift)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 p-4 cursor-pointer relative shadow-sm border transition-all ${
                  isOpened 
                    ? "bg-[#F6F3EC]/50 border-burgundy/10 text-burgundy/40" 
                    : "bg-white border-blush/30 text-burgundy hover:border-burgundy/30 hover:shadow-md"
                }`}
              >
                {/* Ribbon wrapped visual */}
                <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-rose-gold/10 pointer-events-none ${isOpened ? "opacity-20" : "opacity-100"}`} />
                <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-rose-gold/10 pointer-events-none ${isOpened ? "opacity-20" : "opacity-100"}`} />

                <motion.div
                  animate={isOpened ? { rotate: [0, 5, -5, 0] } : { y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: isOpened ? 4 : 2, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Gift className={`w-10 h-10 ${isOpened ? "text-burgundy/20" : "text-burgundy"}`} />
                </motion.div>
                <span className="text-xs font-semibold tracking-wider uppercase relative z-10 font-sans-clean mt-1">
                  {isOpened ? "Opened" : `Gift #${gift.id}`}
                </span>
                <span className="text-[10px] italic text-burgundy/50 max-w-[85px] leading-tight truncate">
                  {gift.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Continue to letter */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence>
            {isAllOpened && (
              <motion.button
                onClick={onComplete}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-burgundy text-[#FAF8F5] rounded-full font-bold tracking-widest text-xs uppercase cursor-pointer shadow-lg hover:bg-burgundy/90 transition-all"
              >
                Okay, one last thing... 💌
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Gift reveal custom overlay */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetail}
            className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${
              activeGift.giftType === "spotlight" 
                ? "bg-black/85 transition-colors duration-1000" 
                : "bg-black/60 backdrop-blur-sm"
            }`}
          >
            {/* Spotlight element */}
            {activeGift.giftType === "spotlight" && (
              <div className="absolute inset-0 spotlight-radial opacity-60 pointer-events-none" />
            )}

            {/* Main card */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              // Distinct entrance animations per gift type
              variants={{
                initial: { 
                  opacity: 0, 
                  scale: activeGift.giftType === "joke" ? 0.7 : 0.95,
                  y: activeGift.giftType === "spotlight" ? 100 : 20,
                  rotate: activeGift.giftType === "joke" ? 10 : 0
                },
                animate: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  rotate: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: activeGift.giftType === "joke" ? 300 : 150, 
                    damping: activeGift.giftType === "joke" ? 15 : 20 
                  }
                },
                exit: { 
                  opacity: 0, 
                  scale: 0.9, 
                  y: 10 
                }
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white p-6 w-full max-w-sm rounded-2xl shadow-2xl border border-black/5 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Decorative cross pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-gold/5 rounded-full -mr-8 -mt-8 pointer-events-none" />

              <button
                onClick={handleCloseDetail}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-xs uppercase tracking-widest text-rose-gold font-bold">
                  {activeGift.sub}
                </span>
                
                {/* Photo Gift Render */}
                {activeGift.giftType === "photo" && activeGift.image && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full h-44 rounded-lg overflow-hidden border border-zinc-200 shadow-inner mt-2 mb-1"
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
                    transition={{ delay: 0.3 }}
                    className="w-full h-44 rounded-lg overflow-hidden border border-zinc-200 shadow-inner mt-2 mb-1 bg-black"
                  >
                    <video 
                      src={activeGift.video} 
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                )}

                {/* Heart animation particles floating in card */}
                {activeGift.giftType === "hearts" && (
                  <div className="relative w-16 h-16 flex items-center justify-center my-1">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-4xl text-rose-500"
                    >
                      ❤️
                    </motion.div>
                  </div>
                )}

                <p className="text-burgundy text-lg leading-relaxed mt-2 font-medium">
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
