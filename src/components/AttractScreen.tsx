import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ArmyLogo from './united-states-army-2023-seeklogo.png';

const ATTRACT_VIDEO = '/Media/FIRST PATCH  BE ALL YOU CAN BE  GOARMY.mp4';

interface AttractScreenProps {
  onStart: () => void;
}

const AttractScreen: React.FC<AttractScreenProps> = ({ onStart }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <motion.div
      className="h-full w-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={ATTRACT_VIDEO}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* HUD Corner Brackets */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-12 w-32 h-32 border-t-2 border-l-2 border-army-gold opacity-70" />
        <div className="absolute top-12 right-12 w-32 h-32 border-t-2 border-r-2 border-army-gold opacity-70" />
        <div className="absolute bottom-12 left-12 w-32 h-32 border-b-2 border-l-2 border-army-gold opacity-70" />
        <div className="absolute bottom-12 right-12 w-32 h-32 border-b-2 border-r-2 border-army-gold opacity-70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        <div className="text-center space-y-8">
          {/* Army Logo */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <img src={ArmyLogo} alt="U.S. Army" className="h-32 w-auto mx-auto mb-6" />
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-bold font-tactical text-army-gold glow-text-subtle">
              SEE YOUR
            </h1>
            <h1 className="text-7xl md:text-9xl font-black font-tactical text-white glow-text mt-2">
              FUTURE
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-2xl text-army-gold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            United States Army
          </motion.p>

          {/* Divider */}
          <motion.div
            className="w-32 h-1 bg-army-gold mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />

          {/* Description */}
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Experience your transformation into an elite U.S. Army Officer through advanced AI visualization
          </motion.p>

          {/* Touch to Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              onClick={onStart}
              className="relative group mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-army-gold"
                animate={{
                  scale: [1, 1.2, 1.2],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-army-gold"
                animate={{
                  scale: [1, 1.2, 1.2],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                }}
              />

              {/* Button content */}
              <div className="relative bg-army-olive/90 border-2 border-army-gold px-12 py-6 flex items-center space-x-4 backdrop-blur-sm">
                <span className="text-3xl font-bold text-white uppercase tracking-wider">
                  Touch to Start
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-8 h-8 text-army-gold" />
                </motion.div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
            </motion.button>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Recruitment Experience • AI Enhanced
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-army-gold to-transparent opacity-30 pointer-events-none"
        animate={{
          y: [0, window.innerHeight, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Bottom gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-army-olive via-army-gold to-army-olive opacity-80" />
    </motion.div>
  );
};

export default AttractScreen;
