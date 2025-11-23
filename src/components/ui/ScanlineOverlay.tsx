import React from 'react';
import { motion } from 'framer-motion';

interface ScanlineOverlayProps {
  intensity?: 'light' | 'medium' | 'heavy';
}

const ScanlineOverlay: React.FC<ScanlineOverlayProps> = ({ intensity = 'medium' }) => {
  const opacities = {
    light: 'opacity-10',
    medium: 'opacity-20',
    heavy: 'opacity-30',
  };

  return (
    <>
      {/* Static scanlines */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 ${opacities[intensity]}`}
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />

      {/* Moving scanline */}
      <motion.div
        className="fixed left-0 right-0 h-1 pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.3), transparent)',
          height: '100px',
        }}
        animate={{
          y: ['-100px', 'calc(100vh + 100px)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* CRT effect corners */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, transparent 65%, rgba(0, 0, 0, 0.4) 100%)
            `,
          }}
        />
      </div>

      {/* Flicker effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-30 bg-white"
        animate={{
          opacity: [0, 0.01, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 5,
        }}
      />
    </>
  );
};

export default ScanlineOverlay;