'use client';

type LoadingListener = (isLoading: boolean) => void;

const listeners = new Set<LoadingListener>();
let activeRequests = 0;
let trackerInitialized = false;

const notify = () => {
  const state = activeRequests > 0;
  listeners.forEach((listener) => {
    try {
      listener(state);
    } catch (error) {
      console.error('[loading-indicator] listener error', error);
    }
  });
};

export function subscribeToGlobalLoading(listener: LoadingListener) {
  listeners.add(listener);
  listener(activeRequests > 0);
  return () => {
    listeners.delete(listener);
  };
}

export function beginGlobalLoading() {
  activeRequests += 1;
  notify();
}

export function endGlobalLoading() {
  activeRequests = Math.max(0, activeRequests - 1);
  notify();
}

export function trackWithGlobalLoading<T>(promise: Promise<T>) {
  beginGlobalLoading();
  return promise.finally(() => {
    endGlobalLoading();
  });
}

export function initGlobalLoadingTracker() {
  if (trackerInitialized || typeof window === 'undefined') {
    return;
  }
  trackerInitialized = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    beginGlobalLoading();
    try {
      return await originalFetch(...args);
    } finally {
      endGlobalLoading();
    }
  };

  if (typeof XMLHttpRequest !== 'undefined') {
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function patchedSend(...args) {
      beginGlobalLoading();
      this.addEventListener('loadend', () => endGlobalLoading(), { once: true });
      return originalSend.apply(this, args as any);
    };
  }

  window.addEventListener('beforeunload', beginGlobalLoading);
}

