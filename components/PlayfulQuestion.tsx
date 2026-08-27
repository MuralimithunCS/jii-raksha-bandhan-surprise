"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surpriseData } from "@/data/surpriseData";
import { AudioSynth } from "./MusicControl";
import { TeddyCharacter } from "./TeddyIllustration";

interface PlayfulQuestionProps {
  onComplete: () => void;
}

export default function PlayfulQuestion({ onComplete }: PlayfulQuestionProps) {
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [playfulIndex, setPlayfulIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  
  // Game states
  const [showGame, setShowGame] = useState(false);
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost" | "draw">("playing");
  const [banter, setBanter] = useState("Your move, Didi! Try to beat me. 😉");

  const data = surpriseData.playfulQuestion;

  const handleNoInteraction = () => {
    AudioSynth.playClick();
    const range = 120;
    const rx = (Math.random() - 0.5) * range * 2;
    const ry = (Math.random() - 0.5) * range * 1.5;
    setNoButtonOffset({ x: rx, y: ry });
    setClickCount((prev) => prev + 1);
    setPlayfulIndex((prev) => (prev + 1) % data.playfulAlerts.length);
    setShowWarning(true);
  };

  const handleYes = () => {
    AudioSynth.playSuccess();
    setShowGame(true);
  };

  // Tic-Tac-Toe Logic
  const checkWinCondition = (tempBoard: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]            // diagonals
    ];
    for (const [a, b, c] of lines) {
      if (tempBoard[a] && tempBoard[a] === tempBoard[b] && tempBoard[a] === tempBoard[c]) {
        return tempBoard[a];
      }
    }
    if (tempBoard.every((cell) => cell !== null)) {
      return "draw";
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || !isUserTurn || gameStatus !== "playing") return;

    AudioSynth.playClick();
    const newBoard = [...board];
    newBoard[index] = "❤️"; // Jii is hearts
    setBoard(newBoard);

    const winner = checkWinCondition(newBoard);
    if (winner) {
      handleGameEnd(winner);
      return;
    }

    setIsUserTurn(false);
    setBanter("Thinking of my counter-attack... 🤔");
  };

  // Brother's turn AI
  useEffect(() => {
    if (isUserTurn || gameStatus !== "playing" || !showGame) return;

    const timer = setTimeout(() => {
      const emptyCells = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
      if (emptyCells.length === 0) return;

      // Sibling AI: Block Jii if she's about to win, otherwise pick random
      let chosenMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      
      // Look for winning or blocking moves
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      
      // Try to find a block or win
      for (const player of ["😂", "❤️"]) {
        for (const [a, b, c] of lines) {
          const cells = [board[a], board[b], board[c]];
          const count = cells.filter((c) => c === player).length;
          const empty = cells.filter((c) => c === null).length;
          if (count === 2 && empty === 1) {
            const index = [a, b, c].find((idx) => board[idx] === null) as number;
            chosenMove = index;
            break;
          }
        }
      }

      const newBoard = [...board];
      newBoard[chosenMove] = "😂"; // Brother is funny face
      setBoard(newBoard);
      AudioSynth.playClick();

      const winner = checkWinCondition(newBoard);
      if (winner) {
        handleGameEnd(winner);
      } else {
        setIsUserTurn(true);
        const banters = [
          "Nice try, Didi! Blocked! 🛡️",
          "Calculated... but incorrect 😂",
          "You can't beat your annoying brother!",
          "Make your move, Jii 🤍🧿!",
        ];
        setBanter(banters[Math.floor(Math.random() * banters.length)]);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [isUserTurn, board, gameStatus, showGame]);

  const handleGameEnd = (winner: string) => {
    if (winner === "❤️") {
      setGameStatus("won");
      setBanter("Okay... you got lucky Jii 🤍🧿! You win. 🏆❤️");
      AudioSynth.playSuccess();
    } else if (winner === "😂") {
      setGameStatus("lost");
      setBanter("Victory is mine! Mwahaha! 😂🏆");
      AudioSynth.playSuccess();
    } else {
      setGameStatus("draw");
      setBanter("It's a draw! Sibling powers balanced. 🤝");
      AudioSynth.playChime();
    }
  };

  const resetGame = () => {
    AudioSynth.playClick();
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
    setGameStatus("playing");
    setBanter("Round two! Show me what you got. 🔥");
  };

  return (
    <div className="page-container bg-[#F6F3EC] paper-texture text-foreground p-4">
      <div className="absolute inset-0 bg-[#D8B48F]/5 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center max-w-md w-full px-6 text-center select-none">
        
        {!showGame ? (
          <>
            {/* Stage 1: Yes/No Question */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-serif-display font-bold text-burgundy mb-6 leading-tight"
            >
              {data.question}
            </motion.h2>

            {/* Dynamic funny speech bubble */}
            <div className="h-16 mb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showWarning && (
                  <motion.div
                    key={playfulIndex}
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -5 }}
                    className="bg-white px-5 py-2.5 rounded-2xl shadow-md border border-blush/30 text-burgundy font-medium text-sm relative"
                  >
                    {data.playfulAlerts[playfulIndex]}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-blush/30 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Buttons Grid */}
            <div className="flex flex-col items-center justify-center w-full px-12 relative min-h-[140px]">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                {/* YES Button */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto min-w-[130px] px-8 py-4 bg-burgundy text-[#FAF8F5] rounded-full font-bold tracking-widest text-sm uppercase cursor-pointer hover:bg-burgundy/90 shadow-lg z-20 transition-colors"
                >
                  {data.yesOptions[clickCount % data.yesOptions.length]}
                </motion.button>

                {/* PLAYFUL NO BUTTON */}
                <motion.button
                  onMouseEnter={handleNoInteraction}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleNoInteraction();
                  }}
                  animate={{
                    x: noButtonOffset.x,
                    y: noButtonOffset.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                  className="w-full sm:w-auto min-w-[130px] px-8 py-4 bg-white text-burgundy/60 border border-burgundy/20 rounded-full font-medium tracking-widest text-sm uppercase shadow-sm cursor-pointer z-10 hover:bg-burgundy/5 select-none"
                >
                  {data.noOptions[clickCount % data.noOptions.length]}
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          /* Stage 2: Sibling Tic-Tac-Toe Game */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full flex flex-col items-center gap-5"
          >
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest font-semibold text-burgundy/60">Mini Game</span>
              <h3 className="text-2xl font-serif-display text-burgundy font-bold mt-0.5">Beat Brother AI! 🎮</h3>
            </div>

            {/* Banter bubble */}
            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-blush/30 text-burgundy text-xs font-semibold max-w-[260px] min-h-[40px] flex items-center justify-center relative">
              {banter}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-blush/30 rotate-45" />
            </div>

            {/* 3x3 Grid Board */}
            <div className="grid grid-cols-3 gap-2 bg-burgundy/10 p-2.5 rounded-2xl w-60 h-60 md:w-64 md:h-64 mt-2">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  className={`bg-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-sm border border-transparent transition-all cursor-pointer select-none ${
                    !cell && isUserTurn && gameStatus === "playing" ? "hover:border-burgundy/30 hover:bg-burgundy/5" : ""
                  }`}
                >
                  {cell && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      {cell}
                    </motion.span>
                  )}
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-4 mt-2">
              {gameStatus !== "playing" && (
                <button
                  onClick={resetGame}
                  className="px-5 py-2.5 bg-white border border-burgundy/20 text-burgundy rounded-full text-xs font-semibold uppercase tracking-widest shadow-sm hover:bg-burgundy/5 transition-colors cursor-pointer"
                >
                  Replay 🔄
                </button>
              )}
              
              <button
                onClick={onComplete}
                className="px-6 py-2.5 bg-burgundy text-[#FAF8F5] rounded-full text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-burgundy/90 transition-colors cursor-pointer"
              >
                {gameStatus !== "playing" ? "Continue ➡️" : "Skip Game ➡️"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Heart doodles background */}
        <div className="absolute -bottom-16 opacity-10 pointer-events-none text-9xl text-burgundy font-handwritten">
          ❤️
        </div>
      </div>
    </div>
  );
}
