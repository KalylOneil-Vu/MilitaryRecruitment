import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw } from 'lucide-react';
import HUDFrame from './ui/HUDFrame';
import GlowButton from './ui/GlowButton';
import { UserData } from '../types';
import ArmyLogo from './united-states-army-2023-seeklogo.png';

interface RevealScreenProps {
  userData: UserData;
  onRestart: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({ userData, onRestart }) => {
  return (
    <motion.div
      className="h-full w-full flex items-center justify-center bg-army-black tactical-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HUDFrame className="w-full max-w-7xl mx-auto p-8">
        <div className="text-center space-y-4">
          {/* Army Logo */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <img src={ArmyLogo} alt="U.S. Army" className="h-16 w-auto mx-auto" />
          </motion.div>

          {/* Success Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex justify-center mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <CheckCircle className="w-12 h-12 text-hud-green" />
              </motion.div>
            </div>
            <h2 className="text-xl text-hud-green uppercase tracking-widest mb-1">
              Transformation Complete
            </h2>
            <h1 className="text-4xl font-bold text-white">
              YOUR FUTURE AWAITS
            </h1>
          </motion.div>

          {/* MOS Info */}
          {userData.selectedMOS && (
            <motion.div
              className="text-army-gold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="uppercase tracking-wider">
                {userData.selectedMOS.title}
              </p>
            </motion.div>
          )}

          {/* Two Generated Images Side by Side */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Official Portrait */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="relative">
                <div className="relative aspect-[3/4] bg-black border-2 border-army-gold overflow-hidden">
                  {userData.generatedImages?.portrait ? (
                    <img
                      src={userData.generatedImages.portrait}
                      alt="Official Portrait"
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
                        'inset 0 0 40px rgba(212, 175, 55, 0)',
                        'inset 0 0 40px rgba(212, 175, 55, 0.15)',
                        'inset 0 0 40px rgba(212, 175, 55, 0)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-army-gold" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-army-gold" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-army-gold" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-army-gold" />

                  {/* Label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <p className="text-sm text-army-gold uppercase tracking-wider">
                      U.S. Army Sergeant
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Field Action Shot */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="relative">
                <div className="relative aspect-[3/4] bg-black border-2 border-hud-green overflow-hidden shadow-2xl shadow-army-gold/30">
                  {userData.generatedImages?.field ? (
                    <img
                      src={userData.generatedImages.field}
                      alt="Field Action"
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
                        'inset 0 0 50px rgba(0, 255, 65, 0)',
                        'inset 0 0 50px rgba(0, 255, 65, 0.15)',
                        'inset 0 0 50px rgba(0, 255, 65, 0)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />

                  {/* Corner accents with glow */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-hud-green" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-hud-green" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-hud-green" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-hud-green" />

                  {/* Label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <p className="text-sm text-hud-green uppercase tracking-wider">
                      {userData.selectedMOS?.shortTitle || 'In Action'}
                    </p>
                  </div>

                  {/* "AI Enhanced" badge */}
                  <motion.div
                    className="absolute top-3 right-3 bg-hud-green text-black px-2 py-1 text-xs font-bold uppercase"
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

          {/* Action Button */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
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
            className="mt-6 p-4 bg-gradient-to-r from-army-dark to-transparent border-l-4 border-army-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p className="text-lg text-white mb-1">
              Ready to make this vision a reality?
            </p>
            <p className="text-army-gold">
              Visit GOARMY.COM to learn more about becoming a U.S. Army Soldier
            </p>
          </motion.div>

          {/* Bottom Status */}
          <motion.div
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2 }}
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Experience Complete • Share Your Transformation
            </p>
          </motion.div>
        </div>
      </HUDFrame>
    </motion.div>
  );
};

export default RevealScreen;
