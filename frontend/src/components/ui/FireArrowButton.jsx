import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FireArrowButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  iconOnly = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 overflow-hidden group select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pulse-orange/50 active:scale-95";

  const variants = {
    primary: "bg-gradient-to-r from-pulse-orange to-pulse-orange-dark text-white shadow-glow-orange hover:shadow-glow-orange-lg border border-pulse-orange-light/30",
    secondary: "bg-navy-800/80 hover:bg-navy-750 text-white border border-slate-700/60 hover:border-pulse-orange/40 backdrop-blur-md",
    outline: "bg-transparent text-white border border-pulse-orange/60 hover:bg-pulse-orange/10 hover:border-pulse-orange shadow-sm",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-navy-800/50",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {/* Background Glow Pulse on Hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

      {/* Button Children Text */}
      <span className="relative z-10 font-semibold tracking-wide flex items-center gap-2">
        {children}
      </span>

      {/* Fire Arrow Icon & Effect Container */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Main Arrow */}
          <ArrowRight className="w-4 h-4 text-current transition-colors duration-300 group-hover:text-white" />

          {/* Fire Trail Particle & Glow Effects (Active on Hover) */}
          <AnimatePresence>
            {isHovered && (
              <>
                {/* Glowing Plasma Trail behind the Arrow */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0, x: 0 }}
                  animate={{ opacity: [0.8, 1, 0], scaleX: [0.5, 1.8, 2.2], x: [-12, -18, -24] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", repeat: Infinity }}
                  className="absolute right-3 w-6 h-1 bg-gradient-to-l from-pulse-orange via-amber-400 to-transparent rounded-full blur-[1px] pointer-events-none"
                />

                {/* Ember Particle 1 */}
                <motion.span
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 0.2, x: -14, y: -4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_#f59e0b] pointer-events-none"
                />

                {/* Ember Particle 2 */}
                <motion.span
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 0.3, x: -16, y: 5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-pulse-orange shadow-[0_0_6px_#ff5722] pointer-events-none"
                />

                {/* Ember Particle 3 */}
                <motion.span
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 0.2, x: -10, y: 2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                  className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_4px_#ffffff] pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </button>
  );
};

export default FireArrowButton;
