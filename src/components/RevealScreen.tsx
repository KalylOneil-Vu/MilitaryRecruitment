import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw, Download } from 'lucide-react';
import HUDFrame from './ui/HUDFrame';
import GlowButton from './ui/GlowButton';
import { UserData } from '../types';

interface RevealScreenProps {
  userData: UserData;
  onRestart: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({ userData, onRestart }) => {
  const handleDownload = () => {
    if (userData.generatedImage) {
      const link = document.createElement('a');
      link.href = userData.generatedImage;
      link.download = `future-soldier-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <motion.div
      className="h-full w-full flex items-center justify-center bg-army-black tactical-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HUDFrame className="w-full max-w-7xl mx-auto p-12">
        <div className="text-center space-y-6">
          {/* Success Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <CheckCircle className="w-16 h-16 text-hud-green" />
              </motion.div>
            </div>
            <h2 className="text-2xl text-hud-green uppercase tracking-widest mb-2">
              Transformation Complete
            </h2>
            <h1 className="text-5xl font-bold text-white">
              RECRUIT IDENTIFIED
            </h1>
          </motion.div>

          {/* MOS Info */}
          {userData.selectedMOS && (
            <motion.div
              className="text-army-gold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="uppercase tracking-wider">
                {userData.selectedMOS.title}
              </p>
            </motion.div>
          )}

          {/* Image Comparison */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Before */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="relative">
                <h3 className="text-2xl text-army-gold uppercase mb-4">Before</h3>
                <div className="relative aspect-[3/4] bg-black border-2 border-army-gold overflow-hidden">
                  {userData.capturedImage ? (
                    <img
                      src={userData.capturedImage}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No image captured
                    </div>
                  )}

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white opacity-50" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white opacity-50" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white opacity-50" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white opacity-50" />

                  {/* Label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">
                      Civilian
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="relative">
                <h3 className="text-2xl text-hud-green uppercase mb-4">After</h3>
                <div className="relative aspect-[3/4] bg-black border-2 border-hud-green overflow-hidden shadow-2xl shadow-army-gold/30">
                  {userData.generatedImage ? (
                    <img
                      src={userData.generatedImage}
                      alt="Transformed"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Generation failed
                    </div>
                  )}

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      boxShadow: [
                        'inset 0 0 50px rgba(212, 175, 55, 0)',
                        'inset 0 0 50px rgba(212, 175, 55, 0.2)',
                        'inset 0 0 50px rgba(212, 175, 55, 0)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />

                  {/* Corner accents with glow */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-hud-green" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-hud-green" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-hud-green" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-hud-green" />

                  {/* Label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-sm text-hud-green uppercase tracking-wider">
                      U.S. Army Officer
                    </p>
                    {userData.selectedMOS && (
                      <p className="text-xs text-army-gold">
                        {userData.selectedMOS.shortTitle}
                      </p>
                    )}
                  </div>

                  {/* "NEW" badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-hud-green text-black px-3 py-1 text-sm font-bold uppercase"
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2, type: 'spring' }}
                  >
                    AI Enhanced
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Display */}
          {userData.selectedMOS && (
            <motion.div
              className="grid grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              {Object.entries(userData.selectedMOS.stats).map(([stat, value]) => (
                <div key={stat} className="bg-army-dark border border-army-gold p-3">
                  <p className="text-xs text-gray-500 uppercase">{stat}</p>
                  <p className="text-2xl font-bold text-army-gold">{value}%</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex justify-center space-x-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <GlowButton
              onClick={handleDownload}
              variant="secondary"
              size="large"
            >
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Image</span>
              </div>
            </GlowButton>

            <GlowButton
              onClick={onRestart}
              variant="primary"
              size="large"
            >
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5" />
                <span>Start Over</span>
              </div>
            </GlowButton>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-army-dark to-transparent border-l-4 border-army-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p className="text-xl text-white mb-2">
              Ready to make this vision a reality?
            </p>
            <p className="text-army-gold">
              Visit GOARMY.COM to learn more about becoming a U.S. Army Officer
            </p>
          </motion.div>

          {/* Bottom Status */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2 }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest">
              Experience Complete • Share Your Transformation
            </p>
          </motion.div>
        </div>
      </HUDFrame>
    </motion.div>
  );
};

export default RevealScreen;