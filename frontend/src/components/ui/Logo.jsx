import React from 'react';

export const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 bg-pulse-orange rounded-xl blur-md opacity-50 animate-pulse-slow"></div>
        
        {/* Main Logo Container */}
        <div className="relative w-full h-full bg-gradient-to-br from-navy-800 to-navy-950 border border-pulse-orange/40 rounded-xl flex items-center justify-center p-1.5 shadow-glow-orange">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Dark grid background inside logo */}
            <path d="M5 20H35" stroke="#1D2A44" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* Dynamic Pulse Wave & Arrow */}
            <path 
              d="M4 22L11 22L15 11L21 29L26 18L29 22L36 22" 
              stroke="url(#pulse-grad)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Glowing Accent Arrow Head */}
            <path 
              d="M31 17L36 22L31 27" 
              stroke="#FF5722" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            <defs>
              <linearGradient id="pulse-grad" x1="4" y1="20" x2="36" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.5" stopColor="#FF5722" />
                <stop offset="1" stopColor="#FF8A65" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-extrabold tracking-tight text-white ${textSizes[size]}`}>
            PROJECT<span className="text-pulse-orange drop-shadow-[0_0_8px_rgba(255,87,34,0.5)]">PULSE</span>
          </div>
          {size !== 'sm' && (
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
              Predictive Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
