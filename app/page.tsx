"use client";

import { useGame, GameMode } from "./_hooks/useGame";
import { useEffect, useRef, useState } from "react";
import { playDropSound } from "./_utils/sound";
import { WaitingState } from "./_components/WaitingState";
import { PlayingState } from "./_components/PlayingState";
import { WonState } from "./_components/WonState";
import { LostState } from "./_components/LostState";

export default function Game() {
  const [delay, setDelay] = useState(3000);
  const [mode, setMode] = useState<GameMode>("multiplication");
  const game = useGame({ delay, mode });
  const audioContextRef = useRef<AudioContext | null>(null);
  const prevExpressionCountRef = useRef(0);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Play sound when new expression is added
  useEffect(() => {
    if (
      game.status === "playing" &&
      game.expressions.length > prevExpressionCountRef.current &&
      audioContextRef.current
    ) {
      playDropSound(audioContextRef.current);
    }
    prevExpressionCountRef.current = game.expressions.length;
  }, [game.expressions.length, game.status]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <h1 className="absolute top-6 left-6 text-2xl font-bold text-gray-700 z-10">
        Times Table Bingo
      </h1>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {game.status === "waiting" && (
          <WaitingState
            onPlay={game.play}
            delay={delay}
            mode={mode}
            onDelayChange={setDelay}
            onModeChange={setMode}
          />
        )}

        {game.status === "playing" && (
          <PlayingState
            expressions={game.expressions}
            onBingo={game.bingo}
            onReset={game.reset}
          />
        )}

        {game.status === "won" && (
          <WonState expressions={game.expressions} onPlayAgain={game.reset} />
        )}

        {game.status === "lost" && (
          <LostState expressions={game.expressions} onPlayAgain={game.reset} />
        )}
      </main>
    </div>
  );
}
