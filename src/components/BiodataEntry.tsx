import React from 'react';
import { motion } from 'framer-motion';
import HUDFrame from './ui/HUDFrame';
import { BiologicalSex } from '../types';
import ArmyLogo from './united-states-army-2023-seeklogo.png';

interface BiodataEntryProps {
  onSelect: (sex: BiologicalSex) => void;
}

const BiodataEntry: React.FC<BiodataEntryProps> = ({ onSelect }) => {
  return (
    <motion.div
      className="h-full w-full flex items-center justify-center bg-army-black tactical-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HUDFrame className="w-full max-w-5xl mx-auto p-12">
        <div className="text-center space-y-8">
          {/* Army Logo */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <img src={ArmyLogo} alt="U.S. Army" className="h-20 w-auto mx-auto" />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl text-army-gold uppercase tracking-widest mb-2">
              Biometric Intake
            </h2>
            <h1 className="text-5xl font-bold text-white">
              INITIALIZING PROFILE
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
            <div className="w-12 h-1 bg-gray-600" />
            <div className="w-12 h-1 bg-gray-600" />
            <div className="w-12 h-1 bg-gray-600" />
          </motion.div>

          {/* Instructions */}
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Select gender profile for accurate uniform generation
          </motion.p>

          {/* Selection Cards */}
          <div className="grid grid-cols-2 gap-8 mt-12">
            {/* Male Option */}
            <motion.button
              onClick={() => onSelect('male')}
              className="group relative"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative bg-gradient-to-b from-army-dark to-army-black border-2 border-army-gold px-12 py-6 card-hover">
                {/* Label */}
                <h3 className="text-2xl font-bold text-white uppercase">
                  Male
                </h3>
                <p className="text-army-gold mt-1 text-sm uppercase tracking-wider">
                  Profile Alpha
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-30"
                  initial={false}
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-army-gold" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-army-gold" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-army-gold" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-army-gold" />
              </div>
            </motion.button>

            {/* Female Option */}
            <motion.button
              onClick={() => onSelect('female')}
              className="group relative"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative bg-gradient-to-b from-army-dark to-army-black border-2 border-army-gold px-12 py-6 card-hover">
                {/* Label */}
                <h3 className="text-2xl font-bold text-white uppercase">
                  Female
                </h3>
                <p className="text-army-gold mt-1 text-sm uppercase tracking-wider">
                  Profile Bravo
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-30"
                  initial={false}
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-army-gold" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-army-gold" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-army-gold" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-army-gold" />
              </div>
            </motion.button>
          </div>

          {/* Bottom Status */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest">
              Step 1 of 4 • Biometric Configuration
            </p>
          </motion.div>
        </div>
      </HUDFrame>
    </motion.div>
  );
};

export default BiodataEntry;