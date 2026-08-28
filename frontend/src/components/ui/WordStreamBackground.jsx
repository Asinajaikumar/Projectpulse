import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  'PROJECTPULSE', 'PROJECT', 'TASK', 'PROGRESS', 
  'DEADLINE', 'ON TRACK', 'AT RISK', 'DELAYED', 
  'GITHUB', 'TEAM', 'ANALYTICS', 'PREDICTION',
  'RISK BUFFER', 'WHAT-IF', 'COMMIT VELOCITY', 'PULL REQUEST',
  'SPRINT CAPACITIY', 'CRITICAL PATH', 'ESTIMATED COMPLETION'
];

export const WordStreamBackground = () => {
  // Generate random positioning and animations for floating terms
  const wordNodes = useMemo(() => {
    return Array.from({ length: 22 }).map((_, index) => {
      const word = WORDS[index % WORDS.length];
      const isHorizontal = index % 2 === 0;
      const startX = (index * 4.5 + (index % 5) * 3) % 95;
      const startY = (index * 4.2 + (index % 7) * 4) % 90;
      const duration = 18 + (index % 10) * 4; // slow drift 18s - 54s
      const delay = (index % 6) * 2;
      const opacity = 0.03 + (index % 4) * 0.015; // low opacity between 0.03 and 0.075

      return {
        id: index,
        word,
        isHorizontal,
        style: {
          left: `${startX}%`,
          top: `${startY}%`,
        },
        duration,
        delay,
        opacity,
        fontSize: index % 3 === 0 ? 'text-xs' : index % 3 === 1 ? 'text-sm font-semibold' : 'text-base font-bold',
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dark background base layer */}
      <div className="absolute inset-0 bg-navy-950" />
      
      {/* Subtle radial glowing spots */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pulse-orange/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Floating Terminology Stream */}
      {wordNodes.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute text-slate-400/40 uppercase tracking-widest font-mono ${item.fontSize}`}
          style={item.style}
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={
            item.isHorizontal
              ? {
                  opacity: [0, item.opacity, item.opacity * 1.5, item.opacity, 0],
                  x: [0, 80, 160, 240, 320],
                }
              : {
                  opacity: [0, item.opacity, item.opacity * 1.8, item.opacity, 0],
                  y: [0, -60, -120, -180, -240],
                }
          }
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay,
          }}
        >
          {item.word}
        </motion.div>
      ))}

      {/* Top subtle fade gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-950 to-transparent opacity-80" />
      {/* Bottom subtle fade gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950 to-transparent opacity-80" />
    </div>
  );
};

export default WordStreamBackground;
