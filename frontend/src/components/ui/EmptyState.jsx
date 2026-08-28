import React from 'react';
import { FolderOpen, CheckSquare, Bell, Github, Layers } from 'lucide-react';
import FireArrowButton from './FireArrowButton';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are no records matching your request right now.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-2xl border border-slate-800/80 my-4">
      <div className="w-16 h-16 rounded-2xl bg-navy-800/90 border border-slate-700/60 flex items-center justify-center text-pulse-orange mb-4 shadow-glow-orange/30">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <FireArrowButton onClick={onAction} size="md">
          {actionText}
        </FireArrowButton>
      )}
    </div>
  );
};

export default EmptyState;
