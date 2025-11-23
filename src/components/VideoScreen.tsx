import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoScreenProps {
  videoSrc: string;
  onComplete: () => void;
  title?: string;
}

const VideoScreen: React.FC<VideoScreenProps> = ({ videoSrc, onComplete, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playing when component mounts
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing video:', error);
        // If autoplay fails, skip to next screen
        onComplete();
      }
    };

    playVideo();

    // Update progress bar
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    // Handle video end
    const handleEnded = () => {
      setIsPlaying(false);
      onComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  };

  return (
    <motion.div
      className="h-full w-full bg-black flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Video Container */}
      <div className="flex-1 relative overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted={false}
        />

        {/* Title Overlay */}
        {title && (
          <motion.div
            className="absolute top-8 left-0 right-0 text-center z-10"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider glow-text-subtle">
              {title}
            </h2>
          </motion.div>
        )}

        {/* HUD Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-army-gold opacity-50" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-army-gold opacity-50" />
          <div className="absolute bottom-20 left-4 w-16 h-16 border-b-2 border-l-2 border-army-gold opacity-50" />
          <div className="absolute bottom-20 right-4 w-16 h-16 border-b-2 border-r-2 border-army-gold opacity-50" />

          {/* Recording indicator */}
          <div className="absolute top-4 right-24 flex items-center space-x-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-white font-hud">BRIEFING</span>
          </div>
        </div>

        {/* Skip Button */}
        <motion.button
          onClick={handleSkip}
          className="absolute bottom-24 right-8 z-20 bg-army-dark/80 border border-army-gold px-6 py-2 text-army-gold uppercase tracking-wider hover:bg-army-gold hover:text-black transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip →
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-army-dark">
        <motion.div
          className="h-full bg-gradient-to-r from-army-gold to-army-olive"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="h-12 bg-army-black/90 border-t border-army-gold/30 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4 text-sm text-army-gold font-hud">
          <span>MOS BRIEFING</span>
          <span className="text-hud-green">●</span>
          <span>{isPlaying ? 'PLAYING' : 'LOADING'}</span>
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(progress)}% COMPLETE
        </div>
      </div>
    </motion.div>
  );
};

export default VideoScreen;
