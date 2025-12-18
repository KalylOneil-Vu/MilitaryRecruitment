import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Package, Radio, Plane, Heart, Target, X } from 'lucide-react';
import HUDFrame from './ui/HUDFrame';
import GlowButton from './ui/GlowButton';
import MediaGallery from './ui/MediaGallery';
import { MOSOption } from '../types';
import { MOS_OPTIONS } from '../constants';
import ArmyLogo from './united-states-army-2023-seeklogo.png';
import AviationBg from './ui/army-aviation-pilot_lg.jpg';
import MedicalBg from './ui/army-medical-training_lg.jpg';
import InfantryBg from './ui/infantry.jpg';
import LogisticsBg from './ui/logistics-active-duty-soldiers-laptop_lg.jpg';
import SignalBg from './ui/signal-army-cyber-tech-command_lg.jpg';
import MechanicsBg from './ui/active-duty-tank_lg.jpg';

interface MOSSelectionProps {
  onSelect: (mos: MOSOption) => void;
  onCardClick?: () => void;
  onModalSelect?: () => void;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Wrench,
  Package,
  Radio,
  Plane,
  Heart,
  Target,
};

const backgroundImageMap: { [key: string]: string } = {
  aviation: AviationBg,
  medical: MedicalBg,
  infantry: InfantryBg,
  logistics: LogisticsBg,
  signal: SignalBg,
  mechanics: MechanicsBg,
};

const MOSSelection: React.FC<MOSSelectionProps> = ({ onSelect, onCardClick, onModalSelect }) => {
  const [selectedMOS, setSelectedMOS] = useState<MOSOption | null>(null);
  const [infoMOS, setInfoMOS] = useState<MOSOption | null>(null);

  const handleConfirm = () => {
    if (selectedMOS) {
      onSelect(selectedMOS);
    }
  };

  const handleOpenModal = (mos: MOSOption) => {
    // Play card swipe sound and fade music
    onCardClick?.();
    setInfoMOS(mos);
  };

  const handleCloseModal = () => {
    setInfoMOS(null);
  };

  const handleSelectFromModal = () => {
    if (infoMOS) {
      // Play selection sound
      onModalSelect?.();
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
      <HUDFrame className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="text-center space-y-3 md:space-y-4 pt-8 md:pt-4">
          {/* Army Logo */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <img src={ArmyLogo} alt="U.S. Army" className="h-12 md:h-14 w-auto mx-auto" />
          </motion.div>
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-lg md:text-xl text-army-gold uppercase tracking-widest mb-1">
              Military Occupational Specialty
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
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
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-3">
            {MOS_OPTIONS.map((mos, index) => {
              const Icon = iconMap[mos.icon];
              const isSelected = selectedMOS?.id === mos.id;
              const bgImage = backgroundImageMap[mos.id];

              return (
                <motion.div
                  key={mos.id}
                  className={`group relative cursor-pointer ${isSelected ? 'scale-[1.02]' : ''}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenModal(mos)}
                >
                  <div
                    className={`relative overflow-hidden border-2 p-3 md:p-4 transition-all h-full flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-white shadow-2xl shadow-army-gold/30'
                        : 'border-army-gold/70 hover:border-army-gold'
                    } ${!bgImage ? 'bg-gradient-to-b from-army-dark to-army-black' : ''}`}
                  >
                    {/* Background Image */}
                    {bgImage && (
                      <>
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${bgImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                      </>
                    )}
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
                    <div className="relative z-10 flex justify-center mb-3">
                      <div className="relative">
                        <Icon className="w-10 h-10 text-army-gold drop-shadow-lg" />
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
                    <h3 className="relative z-10 text-lg font-bold text-white uppercase mb-0.5 drop-shadow-lg">
                      {mos.shortTitle}
                    </h3>

                    {/* Full Title */}
                    <p className="relative z-10 text-xs text-army-gold drop-shadow-md">
                      {mos.title}
                    </p>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-army-gold z-10" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-army-gold z-10" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-army-gold z-10" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-army-gold z-10" />
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
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
              Step 2 of 4 • Specialty Selection
            </p>
          </motion.div>
        </div>
      </HUDFrame>

      {/* Info Modal */}
      <AnimatePresence>
        {infoMOS && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative bg-gradient-to-b from-army-dark to-army-black border-2 border-army-gold p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {(() => {
                      const Icon = iconMap[infoMOS.icon];
                      return (
                        <div className="w-16 h-16 bg-army-gold/10 border border-army-gold/50 flex items-center justify-center">
                          <Icon className="w-10 h-10 text-army-gold" />
                        </div>
                      );
                    })()}
                  </div>

                  {/* Title and Description */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white uppercase">
                      {infoMOS.shortTitle}
                    </h2>
                    <p className="text-army-gold mt-1">{infoMOS.title}</p>
                    <p className="text-gray-300 text-sm leading-relaxed mt-3">
                      {infoMOS.detailedDescription}
                    </p>
                  </div>
                </div>

                {/* Media Gallery */}
                <div>
                  <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                    Gallery
                  </h3>
                  <MediaGallery items={infoMOS.media} />
                </div>

                {/* Stats */}
                <div>
                  <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                    Specialty Attributes
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Strategy</p>
                      <div className="h-2 bg-gray-700">
                        <motion.div
                          className="h-full bg-army-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${infoMOS.stats.strategy}%` }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-army-gold mt-1">{infoMOS.stats.strategy}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Technology</p>
                      <div className="h-2 bg-gray-700">
                        <motion.div
                          className="h-full bg-army-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${infoMOS.stats.technology}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </div>
                      <p className="text-xs text-army-gold mt-1">{infoMOS.stats.technology}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Leadership</p>
                      <div className="h-2 bg-gray-700">
                        <motion.div
                          className="h-full bg-army-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${infoMOS.stats.leadership}%` }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        />
                      </div>
                      <p className="text-xs text-army-gold mt-1">{infoMOS.stats.leadership}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Endurance</p>
                      <div className="h-2 bg-gray-700">
                        <motion.div
                          className="h-full bg-army-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${infoMOS.stats.endurance}%` }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        />
                      </div>
                      <p className="text-xs text-army-gold mt-1">{infoMOS.stats.endurance}%</p>
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
