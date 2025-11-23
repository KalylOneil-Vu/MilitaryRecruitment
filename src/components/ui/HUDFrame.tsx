import React from 'react';
import { motion } from 'framer-motion';

interface HUDFrameProps {
  children: React.ReactNode;
  className?: string;
}

const HUDFrame: React.FC<HUDFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 64 64">
          <path
            d="M 0 20 L 0 0 L 20 0"
            stroke="#d4af37"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 64 64">
          <path
            d="M 44 0 L 64 0 L 64 20"
            stroke="#d4af37"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 64 64">
          <path
            d="M 0 44 L 0 64 L 20 64"
            stroke="#d4af37"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 64 64">
          <path
            d="M 44 64 L 64 64 L 64 44"
            stroke="#d4af37"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Animated border lines */}
      <motion.div
        className="absolute top-0 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-army-gold to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-army-gold to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default HUDFrame;