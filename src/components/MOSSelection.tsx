import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Package, Radio, Plane, Heart, Target } from 'lucide-react';
import HUDFrame from './ui/HUDFrame';
import GlowButton from './ui/GlowButton';
import { MOSOption } from '../types';
import { MOS_OPTIONS } from '../constants';

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

  const handleSelect = (mos: MOSOption) => {
    setSelectedMOS(mos);
  };

  const handleConfirm = () => {
    if (selectedMOS) {
      onSelect(selectedMOS);
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
                <motion.button
                  key={mos.id}
                  onClick={() => handleSelect(mos)}
                  className={`group relative ${isSelected ? 'scale-[1.02]' : ''}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    className={`relative bg-gradient-to-b from-army-dark to-army-black border-2 p-4 transition-all ${
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
                        <Icon className="w-12 h-12 text-army-gold" />
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
                    <p className="text-xs text-army-gold mb-2">
                      {mos.title}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-400 mb-3 min-h-[40px] line-clamp-2">
                      {mos.description}
                    </p>

                    {/* Stats - Compact */}
                    <div className="space-y-1">
                      {Object.entries(mos.stats).map(([stat, value]) => (
                        <div key={stat} className="flex items-center space-x-1">
                          <span className="text-[10px] text-gray-500 uppercase w-16 text-left">
                            {stat}
                          </span>
                          <div className="flex-1 h-1.5 bg-army-dark border border-army-gold/30">
                            <motion.div
                              className="h-full bg-gradient-to-r from-army-gold to-army-gold-light"
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ delay: 0.6 + index * 0.08, duration: 0.8 }}
                            />
                          </div>
                          <span className="text-[10px] text-army-gold w-8 text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-army-gold" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-army-gold" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-army-gold" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-army-gold" />
                  </div>
                </motion.button>
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
    </motion.div>
  );
};

export default MOSSelection;