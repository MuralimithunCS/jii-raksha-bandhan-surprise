"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import ParticleBackground from "@/components/ParticleBackground";
import MusicControl from "@/components/MusicControl";
import OpeningExperience from "@/components/OpeningExperience";
import PlayfulQuestion from "@/components/PlayfulQuestion";
import RakhiTyingScreen from "@/components/RakhiTyingScreen";
import GreetingReveal from "@/components/GreetingReveal";
import MemoryWorld from "@/components/MemoryWorld";
import GiftCollection from "@/components/GiftCollection";
import LetterReveal from "@/components/LetterReveal";
import FinalReveal from "@/components/FinalReveal";

type Phase = 
  | "curious" 
  | "gift" 
  | "playful" 
  | "rakhi-tying"
  | "reveal" 
  | "scrapbook" 
  | "secret-gifts" 
  | "letter" 
  | "final";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("curious");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Transition variants for seamless screen switching
  const screenTransitionVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.98,
      filter: "blur(6px)"
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1] as const
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.02,
      filter: "blur(8px)",
      transition: { 
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] as const
      }
    }
  };

  const handleStartMusic = () => {
    setIsPlayingMusic(true);
  };

  const renderActiveScreen = () => {
    switch (phase) {
      case "curious":
        // Phase 1: VIP Birthday Pass
        return (
          <motion.div key="curious" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <OpeningExperience onComplete={() => setPhase("playful")} startMusic={handleStartMusic} />
          </motion.div>
        );
      case "playful":
        // Phase 2: Balloon Pop Challenge Arcade
        return (
          <motion.div key="playful" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <PlayfulQuestion onComplete={() => setPhase("rakhi-tying")} />
          </motion.div>
        );
      case "rakhi-tying":
        // Phase 3: Midnight Birthday Cake & Candle Blow Ceremony
        return (
          <motion.div key="rakhi-tying" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <RakhiTyingScreen onComplete={() => setPhase("reveal")} />
          </motion.div>
        );
      case "reveal":
        // Phase 4: Starlight Birthday Greeting Reveal
        return (
          <motion.div key="reveal" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <GreetingReveal onComplete={() => setPhase("scrapbook")} />
          </motion.div>
        );
      case "scrapbook":
        // Phase 5: 3D Floating Glass Birthday Story Carousel
        return (
          <motion.div key="scrapbook" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <MemoryWorld onComplete={() => setPhase("secret-gifts")} />
          </motion.div>
        );
      case "secret-gifts":
        // Phase 6: The Birthday Vault Gifts & Video
        return (
          <motion.div key="secret-gifts" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <GiftCollection onComplete={() => setPhase("letter")} />
          </motion.div>
        );
      case "letter":
        // Phase 7: The Golden Birthday Scroll
        return (
          <motion.div key="letter" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <LetterReveal onComplete={() => setPhase("final")} />
          </motion.div>
        );
      case "final":
        // Phase 8: Interactive Midnight Fireworks Finale
        return (
          <motion.div key="final" variants={screenTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <FinalReveal />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-midnight">
      {/* Floating Canvas particles */}
      <ParticleBackground phase={phase} />

      {/* Persistent Elegant Music control */}
      {phase !== "curious" && (
        <MusicControl isPlayingMusic={isPlayingMusic} setIsPlayingMusic={setIsPlayingMusic} />
      )}

      {/* Screen container with transition switchboard */}
      <div className="w-full h-full relative z-20">
        <AnimatePresence mode="wait">
          {renderActiveScreen()}
        </AnimatePresence>
      </div>
    </main>
  );
}
