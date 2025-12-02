import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity } from 'lucide-react';
import { PROCESSING_MESSAGES } from '../constants';
import { UserData, GeneratedImages } from '../types';
import { generateDualPortraits } from '../services/replicate';

// Default video for processing
const DEFAULT_PROCESSING_VIDEO = '/Media/I AM AN AMERICAN SOLDIER  BE ALL YOU CAN BE  GOARMY.mp4';

// MOS-specific processing videos
const MOS_PROCESSING_VIDEOS: { [key: string]: string } = {
  'signal': '/Media/SO EARLY  DECIDE TO LEAD  ARMY OFFICER.mp4',
  // Add more MOS-specific videos here
  // 'mechanics': '/Media/mechanics-processing.mp4',
  // 'aviation': '/Media/aviation-processing.mp4',
};

interface ProcessingScreenProps {
  userData: UserData;
  onComplete: (generatedImages: GeneratedImages) => void;
}

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ userData, onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedGeneration = useRef(false);

  // Start video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  // Process messages cycling
  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < PROCESSING_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 4000);

    return () => clearInterval(messageTimer);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev < 95 && isGenerating) {
          return prev + 1;
        }
        if (!isGenerating && prev < 100) {
          return 100;
        }
        return prev;
      });
    }, 420);

    return () => clearInterval(progressTimer);
  }, [isGenerating]);

  // API call - only runs ONCE on mount
  useEffect(() => {
    // Prevent duplicate calls
    if (hasStartedGeneration.current) {
      return;
    }
    hasStartedGeneration.current = true;

    const generateImages = async () => {
      try {
        if (!userData.capturedImage || !userData.sex || !userData.selectedMOS) {
          throw new Error('Missing user data');
        }

        console.log('Starting generation with sex:', userData.sex);

        // Generate TWO images in parallel
        const images = await generateDualPortraits(
          userData.capturedImage,
          userData.sex,
          userData.selectedMOS
        );

        setGeneratedImages(images);
        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating images:', error);
        // Fallback images on error
        setGeneratedImages({
          portrait: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?w=800&q=80',
          field: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?w=800&q=80',
        });
        setIsGenerating(false);
      }
    };

    generateImages();
  }, [userData]);

  // Handle video end or generation complete
  const handleVideoEnd = () => {
    if (generatedImages) {
      onComplete(generatedImages);
    }
  };

  // If generation is done and video ended, proceed
  useEffect(() => {
    if (!isGenerating && generatedImages && progress >= 100) {
      // Give a moment for the progress bar to show 100%
      const timer = setTimeout(() => {
        onComplete(generatedImages);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, generatedImages, progress, onComplete]);

  return (
    <motion.div
      className="h-full w-full bg-army-black overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Video - MOS specific or default */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={userData.selectedMOS ? (MOS_PROCESSING_VIDEOS[userData.selectedMOS.id] || DEFAULT_PROCESSING_VIDEO) : DEFAULT_PROCESSING_VIDEO}
          className="w-full h-full object-cover"
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-12 left-8 w-24 h-24 border-t-2 border-l-2 border-army-gold opacity-70" />
        <div className="absolute top-12 right-8 w-24 h-24 border-t-2 border-r-2 border-army-gold opacity-70" />
        <div className="absolute bottom-32 left-8 w-24 h-24 border-b-2 border-l-2 border-army-gold opacity-70" />
        <div className="absolute bottom-32 right-8 w-24 h-24 border-b-2 border-r-2 border-army-gold opacity-70" />

      </div>

      {/* Top HUD Info */}
      <div className="absolute top-16 left-12 z-10">
        <div className="flex items-center space-x-3 mb-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-red-500 font-hud text-sm">PROCESSING</span>
        </div>
        <div className="text-hud-green font-hud text-xs space-y-1">
          <p>SYS: NEURAL_NET_ACTIVE</p>
          <p>MODEL: NANO-BANANA-PRO</p>
          <p>STATUS: {isGenerating ? 'GENERATING' : 'COMPLETE'}</p>
        </div>
      </div>

      {/* Top Right HUD */}
      <div className="absolute top-16 right-12 z-10 text-right">
        <div className="text-army-gold font-hud text-sm mb-2">
          {userData.selectedMOS?.shortTitle || 'MOS'}
        </div>
        <div className="text-hud-green font-hud text-xs space-y-1">
          <p>PROFILE: {userData.sex?.toUpperCase()}</p>
          <p>RANK: OFFICER</p>
        </div>
      </div>

      {/* Center Processing Info */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          {/* Animated Processing Icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-army-gold/30 rounded-full" />
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-army-gold rounded-full" />
              <Cpu className="absolute inset-0 m-auto w-8 h-8 text-army-gold" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl font-bold text-white mb-2 glow-text-subtle"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GENERATING PROFILE
          </motion.h1>

          {/* Status Message */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              className="text-lg text-hud-green font-hud"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {PROCESSING_MESSAGES[currentMessage]?.text || ''}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Progress Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Data Visualization Row */}
        <div className="flex justify-center gap-6 mb-4 px-8">
          {/* Face Mapping */}
          <div className="bg-black/60 border border-army-gold/50 p-3 w-48">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-3 h-3 text-army-gold" />
              <span className="text-xs text-army-gold uppercase font-hud">Face Mapping</span>
            </div>
            <div className="h-12 relative overflow-hidden">
              <svg className="w-full h-full">
                <motion.polyline
                  points="0,24 15,12 30,30 45,18 60,27 75,15 90,24"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2"
                  animate={{ x: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
            </div>
          </div>

          {/* Neural Activity */}
          <div className="bg-black/60 border border-army-gold/50 p-3 w-48">
            <div className="flex items-center space-x-2 mb-2">
              <Cpu className="w-3 h-3 text-army-gold" />
              <span className="text-xs text-army-gold uppercase font-hud">Neural Activity</span>
            </div>
            <div className="grid grid-cols-12 gap-0.5">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3 bg-army-gold"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.5, delay: i * 0.04, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          {/* Data Stream */}
          <div className="bg-black/60 border border-army-gold/50 p-3 w-48">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-3 h-3 text-army-gold" />
              <span className="text-xs text-army-gold uppercase font-hud">Data Stream</span>
            </div>
            <div className="h-12 overflow-hidden">
              <motion.div
                className="text-[10px] text-hud-green font-hud space-y-0.5"
                animate={{ y: [0, -60] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <p>0x7F3A: Processing...</p>
                <p>0x8B2C: Mapping...</p>
                <p>0x9D4E: Rendering...</p>
                <p>0xAF60: Optimizing...</p>
                <p>0xC182: Finalizing...</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-black/80 border-t border-army-gold/30 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between text-xs text-army-gold font-hud mb-2">
              <span>AI TRANSFORMATION</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 bg-army-dark border border-army-gold/50 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-army-olive via-army-gold to-hud-green"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-center mt-2 text-xs text-gray-500 font-hud">
              {isGenerating ? 'PLEASE WAIT • AI GENERATION IN PROGRESS' : 'GENERATION COMPLETE • PREPARING RESULTS'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessingScreen;
