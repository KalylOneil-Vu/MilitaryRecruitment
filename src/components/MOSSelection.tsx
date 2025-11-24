import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Package, Radio, Plane, Heart, Target, Info, X } from 'lucide-react';
import HUDFrame from './ui/HUDFrame';
import GlowButton from './ui/GlowButton';
import { MOSOption } from '../types';
import { MOS_OPTIONS } from '../constants';
import ArmyLogo from './united-states-army-2023-seeklogo.png';

interface MOSSelectionProps {
  onSelect: (mos: MOSOption) => void;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Wrench,
  Package,
  Radio,
  Plane,
  Heart,
  Target,
};

const MOSSelection: React.FC<MOSSelectionProps> = ({ onSelect }) => {
  const [selectedMOS, setSelectedMOS] = useState<MOSOption | null>(null);
  const [infoMOS, setInfoMOS] = useState<MOSOption | null>(null);

  const handleSelect = (mos: MOSOption) => {
    setSelectedMOS(mos);
  };

  const handleConfirm = () => {
    if (selectedMOS) {
      onSelect(selectedMOS);
    }
  };

  const handleLearnMore = (e: React.MouseEvent, mos: MOSOption) => {
    e.stopPropagation();
    setInfoMOS(mos);
  };

  const handleCloseModal = () => {
    setInfoMOS(null);
  };

  const handleSelectFromModal = () => {
    if (infoMOS) {
      setSelectedMOS(infoMOS);
      setInfoMOS(null);
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
        <div className="text-center space-y-8">
          {/* Army Logo */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <img src={ArmyLogo} alt="U.S. Army" className="h-16 w-auto mx-auto" />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl text-army-gold uppercase tracking-widest mb-2">
              Military Occupational Specialty
            </h2>
            <h1 className="text-5xl font-bold text-white">
              SELECT YOUR PATH
            </h1>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-12 h-1 bg-army-gold" />
            <div className="w-12 h-1 bg-army-gold" />
            <div className="w-12 h-1 bg-gray-600" />
            <div className="w-12 h-1 bg-gray-600" />
          </motion.div>

          {/* MOS Cards - 6 options in 2 rows of 3 */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {MOS_OPTIONS.map((mos, index) => {
              const Icon = iconMap[mos.icon];
              const isSelected = selectedMOS?.id === mos.id;

              return (
                <motion.div
                  key={mos.id}
                  className={`group relative cursor-pointer ${isSelected ? 'scale-[1.02]' : ''}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(mos)}
                >
                  <div
                    className={`relative bg-gradient-to-b from-army-dark to-army-black border-2 p-4 transition-all h-full flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-white shadow-2xl shadow-army-gold/30'
                        : 'border-army-gold/70 hover:border-army-gold'
                    }`}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute -top-3 -right-3 bg-army-gold text-black px-2 py-0.5 text-xs font-bold uppercase z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        Selected
                      </motion.div>
                    )}

                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        <Icon className="w-10 h-10 text-army-gold" />
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 bg-army-gold opacity-30 blur-xl"
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white uppercase mb-0.5">
                      {mos.shortTitle}
                    </h3>

                    {/* Full Title */}
                    <p className="text-xs text-army-gold mb-3">
                      {mos.title}
                    </p>

                    {/* Learn More Button */}
                    <button
                      onClick={(e) => handleLearnMore(e, mos)}
                      className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-army-gold px-2 py-1 rounded"
                    >
                      <Info className="w-3 h-3" />
                      <span>Learn More</span>
                    </button>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-army-gold" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-army-gold" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-army-gold" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-army-gold" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Confirm Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedMOS ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          >
            <GlowButton
              onClick={handleConfirm}
              disabled={!selectedMOS}
              variant="primary"
              size="huge"
            >
              Confirm Selection
            </GlowButton>
          </motion.div>

          {/* Bottom Status */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest">
              Step 2 of 4 • Specialty Selection
            </p>
          </motion.div>
        </div>
      </HUDFrame>

      {/* Info Modal */}
      <AnimatePresence>
        {infoMOS && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative bg-gradient-to-b from-army-dark to-army-black border-2 border-army-gold p-8 max-w-lg mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                  {(() => {
                    const Icon = iconMap[infoMOS.icon];
                    return <Icon className="w-16 h-16 text-army-gold" />;
                  })()}
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase">
                    {infoMOS.shortTitle}
                  </h2>
                  <p className="text-army-gold mt-1">{infoMOS.title}</p>
                </div>

                {/* Detailed Description */}
                <p className="text-gray-300 text-left leading-relaxed">
                  {infoMOS.detailedDescription}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Strategy</p>
                    <div className="h-2 bg-gray-700 mt-1">
                      <div
                        className="h-full bg-army-gold"
                        style={{ width: `${infoMOS.stats.strategy}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Technology</p>
                    <div className="h-2 bg-gray-700 mt-1">
                      <div
                        className="h-full bg-army-gold"
                        style={{ width: `${infoMOS.stats.technology}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Leadership</p>
                    <div className="h-2 bg-gray-700 mt-1">
                      <div
                        className="h-full bg-army-gold"
                        style={{ width: `${infoMOS.stats.leadership}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Endurance</p>
                    <div className="h-2 bg-gray-700 mt-1">
                      <div
                        className="h-full bg-army-gold"
                        style={{ width: `${infoMOS.stats.endurance}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-2">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors uppercase text-sm font-bold"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSelectFromModal}
                    className="flex-1 px-4 py-3 bg-army-gold text-black hover:bg-yellow-400 transition-colors uppercase text-sm font-bold"
                  >
                    Select This Specialty
                  </button>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-army-gold" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-army-gold" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-army-gold" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-army-gold" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MOSSelection;
