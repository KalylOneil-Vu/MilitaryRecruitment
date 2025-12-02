import { useRef, useCallback } from 'react';

// Sound file imports - these will be loaded from public folder
const SOUNDS = {
  mosExploring: '/sounds/MOS-Exploring.wav',
  backgroundMusic: '/sounds/Dangerous Military Weapons - Version 1 (mp3).mp3',
  cardSwipe: '/sounds/Menu UI Swipes Cute High Digital Rise Simple.wav',
  mosSelection: '/sounds/MOS-selection.wav',
};

export const useAudio = () => {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play a one-shot sound effect
  const playSound = useCallback((soundKey: keyof typeof SOUNDS) => {
    const audio = new Audio(SOUNDS[soundKey]);
    audio.play().catch(console.error);
  }, []);

  // Start background music at low volume
  const startMusic = useCallback((volume: number = 0.15) => {
    if (!musicRef.current) {
      musicRef.current = new Audio(SOUNDS.backgroundMusic);
      musicRef.current.loop = true;
    }
    musicRef.current.volume = volume;
    musicRef.current.play().catch(console.error);
  }, []);

  // Fade music to a target volume
  const fadeMusic = useCallback((targetVolume: number, duration: number = 500) => {
    if (!musicRef.current) return;

    // Clear any existing fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = musicRef.current.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = volumeDiff / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (musicRef.current) {
        musicRef.current.volume = Math.max(0, Math.min(1, startVolume + volumeStep * currentStep));
      }

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, stepDuration);
  }, []);

  // Stop music completely
  const stopMusic = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
      musicRef.current = null;
    }
  }, []);

  // Set music volume directly
  const setMusicVolume = useCallback((volume: number) => {
    if (musicRef.current) {
      musicRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    playSound,
    startMusic,
    fadeMusic,
    stopMusic,
    setMusicVolume,
  };
};

export default useAudio;
