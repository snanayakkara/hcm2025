import { useEffect, useRef, useState, useCallback } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
  enabled?: boolean;
  refreshingTimeout?: number;
}

interface PullToRefreshState {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  canRefresh: boolean;
}

const usePullToRefresh = (options: UsePullToRefreshOptions) => {
  const {
    onRefresh,
    threshold = 80,
    resistance = 2.5,
    enabled = true,
    refreshingTimeout = 2000
  } = options;

  const [state, setState] = useState<PullToRefreshState>({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    canRefresh: false
  });

  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const refreshTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const updateState = useCallback((updates: Partial<PullToRefreshState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!enabled || state.isRefreshing) return;
    
    // Only start if we're at the top of the page
    if (window.scrollY > 0) return;

    startY.current = event.touches[0].clientY;
    isDragging.current = true;
    
    updateState({ isPulling: true });
  }, [enabled, state.isRefreshing, updateState]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDragging.current || !enabled || state.isRefreshing) return;

    currentY.current = event.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    // Only pull down
    if (deltaY < 0) return;

    // Apply resistance
    const pullDistance = Math.min(deltaY / resistance, threshold * 1.5);
    const canRefresh = pullDistance >= threshold;

    updateState({
      pullDistance,
      canRefresh
    });

    // Prevent default scroll behavior when pulling
    if (deltaY > 10) {
      event.preventDefault();
    }

    // Haptic feedback when threshold is reached
    if (canRefresh && !state.canRefresh && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [enabled, state.isRefreshing, state.canRefresh, threshold, resistance, updateState]);

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current || !enabled) return;

    isDragging.current = false;

    if (state.canRefresh && !state.isRefreshing) {
      updateState({
        isRefreshing: true,
        isPulling: false,
        pullDistance: threshold
      });

      try {
        await onRefresh();
      } catch (error) {
        console.error('Pull to refresh error:', error);
      }

      // Ensure minimum refresh time for better UX
      refreshTimeoutId.current = setTimeout(() => {
        updateState({
          isRefreshing: false,
          pullDistance: 0,
          canRefresh: false
        });
      }, refreshingTimeout);
    } else {
      updateState({
        isPulling: false,
        pullDistance: 0,
        canRefresh: false
      });
    }
  }, [enabled, state.canRefresh, state.isRefreshing, threshold, onRefresh, refreshingTimeout, updateState]);

  // Clean up timeout
  useEffect(() => {
    return () => {
      if (refreshTimeoutId.current) {
        clearTimeout(refreshTimeoutId.current);
      }
    };
  }, []);

  // Add event listeners
  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Calculate progress percentage
  const progress = Math.min((state.pullDistance / threshold) * 100, 100);

  // Generate CSS transform for pull indicator
  const indicatorTransform = `translateY(${Math.max(0, state.pullDistance - 20)}px)`;

  return {
    ...state,
    progress,
    indicatorTransform,
    threshold
  };
};

export default usePullToRefresh;