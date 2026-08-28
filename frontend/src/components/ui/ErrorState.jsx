import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import FireArrowButton from './FireArrowButton';

export const ErrorState = ({
  title = 'Unable to load data',
  message = 'Connection to server failed. Please check your connection or retry.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center glass-panel rounded-2xl border border-rose-500/30 bg-rose-950/10 my-4">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-4 shadow-glow-red">
        <AlertOctagon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-300 max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-white border border-slate-700 text-sm font-semibold transition-all hover:border-rose-500/50"
        >
          <RotateCcw className="w-4 h-4 text-pulse-orange" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
