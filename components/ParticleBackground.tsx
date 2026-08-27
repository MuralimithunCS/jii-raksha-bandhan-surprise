"use client";

import React, { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  phase: "curious" | "gift" | "playful" | "rakhi-tying" | "reveal" | "scrapbook" | "secret-gifts" | "letter" | "final";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay?: number;
  rotation?: number;
  rotationSpeed?: number;
  type: "sparkle" | "heart" | "petal";
  pulseSpeed?: number;
  pulseTime?: number;
}

export default function ParticleBackground({ phase }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Color definitions
    const colors = {
      gold: ["#F9F6F0", "#EAD8C0", "#D8B48F", "#F5E8C7"],
      heart: ["#E76161", "#F99B7D", "#E38B29", "#FF8E9E", "#E8A0BF"],
      petal: ["#FBD6D6", "#FFC6C6", "#FFABE1", "#FF85B3", "#FFE5EC"],
      softWhite: ["#FFFFFF", "#F9F6F0", "#ECEBE4", "#EAE2B7"]
    };

    // Helper to generate a new particle
    const createParticle = (x?: number, y?: number, typeOverride?: "sparkle" | "heart" | "petal"): Particle => {
      const px = x ?? Math.random() * canvas.width;
      const py = y ?? Math.random() * canvas.height;
      
      let type: "sparkle" | "heart" | "petal" = "sparkle";
      if (typeOverride) {
        type = typeOverride;
      } else if (phase === "final") {
        const rng = Math.random();
        type = rng < 0.4 ? "petal" : rng < 0.7 ? "heart" : "sparkle";
      } else if (phase === "reveal" || phase === "secret-gifts" || phase === "rakhi-tying") {
        type = Math.random() < 0.3 ? "heart" : "sparkle";
      }

      let color = "";
      let size = 0;
      let vx = 0;
      let vy = 0;

      if (type === "sparkle") {
        const pool = phase === "curious" ? colors.softWhite : colors.gold;
        color = pool[Math.floor(Math.random() * pool.length)];
        size = Math.random() * 2.5 + 0.5;
        vx = (Math.random() - 0.5) * 0.4;
        vy = -(Math.random() * 0.6 + 0.2); // upward
      } else if (type === "heart") {
        color = colors.heart[Math.floor(Math.random() * colors.heart.length)];
        size = Math.random() * 6 + 4;
        vx = (Math.random() - 0.5) * 0.8;
        vy = -(Math.random() * 0.8 + 0.4);
      } else {
        // Petal
        color = colors.petal[Math.floor(Math.random() * colors.petal.length)];
        size = Math.random() * 8 + 6;
        vx = (Math.random() - 0.3) * 0.8; // drift slightly right
        vy = Math.random() * 0.6 + 0.6; // fall down
      }

      return {
        x: px,
        y: py,
        vx,
        vy,
        size,
        color,
        alpha: Math.random() * 0.6 + 0.2,
        decay: Math.random() * 0.005 + 0.002,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulseTime: Math.random() * 100
      };
    };

    // Initialize initial particles
    const initialCount = phase === "final" ? 60 : phase === "curious" ? 30 : 40;
    for (let i = 0; i < initialCount; i++) {
      particles.push(createParticle());
    }

    // Drawing helper for hearts
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.moveTo(x, y + size / 4);
      c.quadraticCurveTo(x, y, x + size / 2, y);
      c.quadraticCurveTo(x + size, y, x + size, y + size / 3);
      c.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
      c.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
      c.quadraticCurveTo(x, y, x, y + size / 4);
      c.closePath();
      c.fill();
    };

    // Drawing helper for petals
    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(-size / 2, -size / 2, 0, -size);
      c.quadraticCurveTo(size / 2, -size / 2, 0, 0);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Draw / Update loop
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Max particle cap depends on phase
      const maxCount = phase === "final" ? 100 : phase === "curious" ? 40 : 65;

      // Add a particle periodically
      if (particles.length < maxCount && Math.random() < 0.1) {
        // Spawn from bottom for upward, or top for falling petals
        const spawnY = phase === "final" ? (Math.random() < 0.5 ? 0 : canvas.height) : canvas.height;
        particles.push(createParticle(Math.random() * canvas.width, spawnY));
      }

      particles.forEach((p, idx) => {
        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
          p.rotation += p.rotationSpeed;
        }
        if (p.pulseTime !== undefined && p.pulseSpeed !== undefined) {
          p.pulseTime += p.pulseSpeed;
        }

        // Mouse avoidance/interaction (simple vector distance push)
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.5; // push strength
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.8;
          p.vy += Math.sin(angle) * force * 0.8;
        }

        // Apply friction to mouse-induced speeds
        p.vx *= 0.98;
        if (p.type !== "petal") {
          p.vy = p.vy * 0.98 + (p.vy < 0 ? -0.01 : 0.01); // restore float
        }

        // Pulse alpha for sparkle
        let currentAlpha = p.alpha;
        if (p.type === "sparkle" && p.pulseTime) {
          currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseTime));
        }

        // Draw based on type
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);

        if (p.type === "sparkle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size);
        } else if (p.type === "petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation || 0);
        }

        // Wrap around screen edges or handle boundary reset
        let offScreen = false;
        if (p.type === "petal") {
          // Petals fall down
          if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) offScreen = true;
        } else {
          // Sparkles/Hearts float up
          if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) offScreen = true;
        }

        if (offScreen) {
          particles[idx] = createParticle(
            Math.random() * canvas.width,
            p.type === "petal" ? -10 : canvas.height + 10
          );
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
