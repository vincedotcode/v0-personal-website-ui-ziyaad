'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  initGlobalLoadingTracker,
  subscribeToGlobalLoading,
} from '@/lib/loading-indicator';

export function GlobalLoadingOverlay() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    initGlobalLoadingTracker();
    return subscribeToGlobalLoading(setIsLoading);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isLoading}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="relative flex flex-col items-center gap-6 text-white">
        <div className="relative flex items-center justify-center">
          <div className="h-28 w-28 rounded-full border border-white/20" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-400 opacity-80 blur-sm animate-[spin_1.6s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-black/40 to-black/80" />
          <div className="absolute inset-6 rounded-full border border-white/10 bg-black/70 backdrop-blur flex items-center justify-center text-[0.65rem] uppercase tracking-[0.4em]">
            Loading
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-sm text-white/80">
          <p className="uppercase tracking-[0.3em] text-xs text-purple-200">
            Calibrating signal
          </p>
          <div className="flex gap-2">
            <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce [animation-delay:-0.2s]" />
            <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce [animation-delay:0.2s]" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

