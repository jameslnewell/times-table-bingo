import { useEffect, useRef } from "react";

export function useAudioContext() {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  return audioContextRef.current;
}
