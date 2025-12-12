export function playDropSound(audioContext: AudioContext) {
  const now = audioContext.currentTime;

  // Create two oscillators for a richer sound
  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Exciting ascending then descending "bing-bong" sound
  osc1.type = "sine";
  osc2.type = "sine";

  // First note - ascending
  osc1.frequency.setValueAtTime(440, now);
  osc1.frequency.exponentialRampToValueAtTime(660, now + 0.08);

  // Second oscillator adds harmony
  osc2.frequency.setValueAtTime(554, now);
  osc2.frequency.exponentialRampToValueAtTime(880, now + 0.08);

  // Volume envelope - quick attack, gentle decay
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.4, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  osc1.start(now);
  osc1.stop(now + 0.15);
  osc2.start(now);
  osc2.stop(now + 0.15);
}
