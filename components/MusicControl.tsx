"use client";

import React, { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

// Safe singleton helper for Web Audio API synthesis
export class AudioSynth {
  private static ctx: AudioContext | null = null;

  private static init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Soft high-end button click
  public static playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {
      console.warn("AudioSynth click error:", e);
    }
  }

  // Crisp balloon pop burst
  public static playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn("AudioSynth pop error:", e);
    }
  }

  // Fireworks whistle and celebratory explosion
  public static playFirework() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Whistle up
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.22);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);

      // Boom burst
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boomOsc.type = "sine";
      boomOsc.frequency.setValueAtTime(160, now + 0.22);
      boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.6);
      boomGain.gain.setValueAtTime(0.2, now + 0.22);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boomOsc.start(now + 0.22);
      boomOsc.stop(now + 0.65);
    } catch (e) {
      console.warn("AudioSynth firework error:", e);
    }
  }

  // Sparkling transition chime
  public static playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const scale = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5, D5, E5, G5, A5
      
      scale.forEach((freq, index) => {
        const time = now + index * 0.06;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.04, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(time);
        osc.stop(time + 0.5);
      });
    } catch (e) {
      console.warn("AudioSynth chime error:", e);
    }
  }

  // Cinematic Gift Box open sound (Whoosh + chime)
  public static playGiftOpen() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Base sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.5);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);

      // 2. Chime sequence
      const chimeScale = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      chimeScale.forEach((freq, index) => {
        const t = now + 0.15 + index * 0.08;
        const o = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.05, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        o.connect(g);
        g.connect(this.ctx!.destination);
        o.start(t);
        o.stop(t + 0.7);
      });
    } catch (e) {
      console.warn("AudioSynth gift open error:", e);
    }
  }

  // Soft success confirmation chime
  public static playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, index) => {
        const t = now + index * 0.05;
        const o = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.03, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        o.connect(g);
        g.connect(this.ctx!.destination);
        o.start(t);
        o.stop(t + 0.4);
      });
    } catch (e) {
      console.warn("AudioSynth success error:", e);
    }
  }
}

interface MusicControlProps {
  isPlayingMusic: boolean;
  setIsPlayingMusic: (val: boolean) => void;
}

export default function MusicControl({ isPlayingMusic, setIsPlayingMusic }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate background audio element
    const audio = new Audio("/music/background.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingMusic) {
      audio.play().catch((err) => {
        console.warn("Autoplay blocked or audio missing:", err);
        // Turn off toggle if it fails to play completely
        setIsPlayingMusic(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlayingMusic, setIsPlayingMusic]);

  const toggleMusic = () => {
    AudioSynth.playClick();
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        className="w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md flex items-center justify-center text-burgundy dark:text-rose-gold border border-burgundy/10 dark:border-white/10 shadow-md hover:scale-105 hover:bg-white dark:hover:bg-black transition-all cursor-pointer"
        aria-label="Toggle Background Music"
      >
        {isPlayingMusic ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 opacity-70" />
        )}
      </button>
    </div>
  );
}
