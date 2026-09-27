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
  type: "sparkle" | "heart" | "confetti" | "balloon";
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
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Vibrant birthday gala colors
    const colors = {
      neon: ["#FF5C8D", "#FFD166", "#06D6A0", "#4CC9F0", "#C77DFF", "#FF85A1"],
      gold: ["#FFF8E7", "#FFD166", "#F4D06F", "#FAF0CA"],
      hearts: ["#FF5C8D", "#FF3366", "#FF758F", "#FF85A1"],
      stars: ["#FFFFFF", "#FFF9E6", "#FFE6A7", "#D8B4E2"]
    };

    // Helper to generate a new particle
    const createParticle = (x?: number, y?: number, typeOverride?: "sparkle" | "heart" | "confetti" | "balloon"): Particle => {
      const px = x ?? Math.random() * canvas.width;
      const py = y ?? Math.random() * canvas.height;
      
      let type: "sparkle" | "heart" | "confetti" | "balloon" = "sparkle";
      if (typeOverride) {
        type = typeOverride;
      } else if (phase === "final" || phase === "reveal") {
        const rng = Math.random();
        type = rng < 0.4 ? "confetti" : rng < 0.7 ? "heart" : "sparkle";
      } else if (phase === "playful" || phase === "scrapbook") {
        const rng = Math.random();
        type = rng < 0.35 ? "balloon" : rng < 0.65 ? "confetti" : "sparkle";
      } else {
        type = Math.random() < 0.25 ? "heart" : "sparkle";
      }

      let color = "";
      let size = 0;
      let vx = 0;
      let vy = 0;

      if (type === "sparkle") {
        color = colors.stars[Math.floor(Math.random() * colors.stars.length)];
        size = Math.random() * 2.5 + 0.8;
        vx = (Math.random() - 0.5) * 0.3;
        vy = -(Math.random() * 0.4 + 0.1);
      } else if (type === "heart") {
        color = colors.hearts[Math.floor(Math.random() * colors.hearts.length)];
        size = Math.random() * 5 + 3.5;
        vx = (Math.random() - 0.5) * 0.6;
        vy = -(Math.random() * 0.7 + 0.3);
      } else if (type === "balloon") {
        color = colors.neon[Math.floor(Math.random() * colors.neon.length)];
        size = Math.random() * 7 + 6; // balloon radius
        vx = (Math.random() - 0.5) * 0.5;
        vy = -(Math.random() * 0.9 + 0.5); // float up
      } else {
        // Confetti
        color = colors.neon[Math.floor(Math.random() * colors.neon.length)];
        size = Math.random() * 5 + 3;
        vx = (Math.random() - 0.5) * 0.8;
        vy = Math.random() * 0.8 + 0.5; // drift down
      }

      return {
        x: px,
        y: py,
        vx,
        vy,
        size,
        color,
        alpha: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.003 + 0.001,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        type,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulseTime: Math.random() * 100
      };
    };

    // Initial particles
    const initialCount = 45;
    for (let i = 0; i < initialCount; i++) {
      particles.push(createParticle());
    }

    // Heart shape helper
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

    // Balloon helper
    const drawBalloon = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      c.save();
      c.beginPath();
      c.ellipse(x, y, r * 0.8, r, 0, 0, Math.PI * 2);
      c.fill();
      // knot
      c.beginPath();
      c.moveTo(x - 2, y + r);
      c.lineTo(x + 2, y + r);
      c.lineTo(x, y + r + 3);
      c.closePath();
      c.fill();
      // tiny string
      c.strokeStyle = "rgba(255,255,255,0.4)";
      c.lineWidth = 0.8;
      c.beginPath();
      c.moveTo(x, y + r + 3);
      c.quadraticCurveTo(x + 3, y + r + 10, x - 1, y + r + 16);
      c.stroke();
      c.restore();
    };

    // Confetti helper
    const drawConfetti = (c: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.fillRect(-size / 2, -size / 4, size, size / 2);
      c.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxCount = 65;
      if (particles.length < maxCount && Math.random() < 0.15) {
        const spawnY = Math.random() < 0.5 ? canvas.height + 10 : -10;
        particles.push(createParticle(Math.random() * canvas.width, spawnY));
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation = (p.rotation || 0) + (p.rotationSpeed || 0.01);
        p.pulseTime = (p.pulseTime || 0) + (p.pulseSpeed || 0.03);

        // Alpha pulsation for sparkles
        let currentAlpha = p.alpha;
        if (p.type === "sparkle") {
          currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseTime));
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.fillStyle = p.color;

        if (p.type === "sparkle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size);
        } else if (p.type === "balloon") {
          drawBalloon(ctx, p.x, p.y, p.size);
        } else {
          drawConfetti(ctx, p.x, p.y, p.size, p.rotation || 0);
        }
        ctx.restore();

        // Screen wrap
        if (p.y < -30 || p.y > canvas.height + 30 || p.x < -30 || p.x > canvas.width + 30) {
          particles[idx] = createParticle(Math.random() * canvas.width, p.vy < 0 ? canvas.height + 10 : -10);
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
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
