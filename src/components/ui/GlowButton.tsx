import React from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large' | 'huge';
  className?: string;
  disabled?: boolean;
}

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'large',
  className = '',
  disabled = false,
}) => {
  const variants = {
    primary: 'bg-army-olive hover:bg-army-olive-light border-army-gold text-white',
    secondary: 'bg-army-dark hover:bg-army-black border-army-gold text-army-gold',
    danger: 'bg-red-900 hover:bg-red-800 border-red-500 text-white',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    huge: 'px-12 py-6 text-2xl',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        ${variants[variant]}
        ${sizes[size]}
        border-2
        font-bold font-tactical uppercase tracking-wider
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Glow effect */}
      {!disabled && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              boxShadow: [
                '0 0 20px rgba(212, 175, 55, 0)',
                '0 0 40px rgba(212, 175, 55, 0.3)',
                '0 0 20px rgba(212, 175, 55, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </>
      )}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white opacity-50" />

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GlowButton;