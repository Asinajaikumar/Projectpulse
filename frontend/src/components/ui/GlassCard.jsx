import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  variant = 'default',
  onClick,
}) => {
  const variants = {
    default: 'glass-panel',
    orange: 'glass-card-orange',
    subtle: 'bg-navy-900/60 border border-slate-800/80 backdrop-blur-md',
    solid: 'bg-navy-900 border border-slate-800',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 ${variants[variant]} ${
        hoverEffect ? 'glass-panel-hover' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
