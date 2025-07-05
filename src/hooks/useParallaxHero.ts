import { useState, useEffect, useRef, useCallback } from 'react';

interface DeviceOrientationData {
  alpha: number | null; // Z-axis rotation (0-360 degrees)
  beta: number | null;  // X-axis rotation (-180 to 180 degrees)
  gamma: number | null; // Y-axis rotation (-90 to 90 degrees)
}

interface ParallaxTransform {
  translateX: number;
  translateY: number;
  scale: number;
  opacity: number;
}

interface UseParallaxHeroOptions {
  maxTranslate?: number;
  sensitivity?: number;
  enableOnDesktop?: boolean;
  enableOnMobile?: boolean;
  respectReducedMotion?: boolean;
}

const useParallaxHero = (options: UseParallaxHeroOptions = {}) => {
  const {
    maxTranslate = 10,
    sensitivity = 0.5,
    enableOnDesktop = true,
    enableOnMobile = true,
    respectReducedMotion = true
  } = options;

  const [transform, setTransform] = useState<ParallaxTransform>({
    translateX: 0,
    translateY: 0,
    scale: 1,
    opacity: 1
  });

  const [isSupported, setIsSupported] = useState(false);
  const [permissionState, setPermissionState] = useState<'granted' | 'denied' | 'default'>('default');
  const [error, setError] = useState<string | null>(null);
  
  const rafId = useRef<number | null>(null);
  const lastUpdate = useRef<number>(0);
  const isActive = useRef(false);

  // Check if device orientation is supported
  useEffect(() => {
    const checkSupport = () => {
      const hasDeviceOrientation = 'DeviceOrientationEvent' in window;
      const hasPermissionAPI = 'permissions' in navigator;
      setIsSupported(hasDeviceOrientation);
      return hasDeviceOrientation;
    };

    checkSupport();
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (!respectReducedMotion) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, [respectReducedMotion]);

  // Check if we're on mobile
  const isMobileDevice = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  // Throttled update function
  const updateTransform = useCallback((event: DeviceOrientationEvent) => {
    if (!isActive.current || prefersReducedMotion()) return;

    const now = performance.now();
    if (now - lastUpdate.current < 16) return; // ~60fps throttling

    lastUpdate.current = now;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const { beta, gamma } = event;
      
      if (beta === null || gamma === null) return;

      // Normalize the values (-1 to 1)
      const normalizedX = Math.max(-1, Math.min(1, gamma / 30)) * sensitivity;
      const normalizedY = Math.max(-1, Math.min(1, (beta - 45) / 30)) * sensitivity;

      // Calculate transform values
      const translateX = normalizedX * maxTranslate;
      const translateY = normalizedY * maxTranslate;
      const scale = 1 + Math.abs(normalizedX * 0.02); // Subtle scale effect
      const opacity = 1 - Math.abs(normalizedX * 0.1); // Subtle opacity effect

      setTransform({
        translateX,
        translateY,
        scale,
        opacity: Math.max(0.8, opacity)
      });
    });
  }, [maxTranslate, sensitivity, prefersReducedMotion]);

  // Request permission for iOS 13+
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      setError('Device orientation not supported');
      return false;
    }

    try {
      // Check if permission is needed (iOS 13+)
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        setPermissionState(permission);
        
        if (permission !== 'granted') {
          setError('Permission denied for device orientation');
          return false;
        }
      } else {
        setPermissionState('granted');
      }

      return true;
    } catch (err) {
      setError(`Permission request failed: ${err}`);
      setPermissionState('denied');
      return false;
    }
  }, [isSupported]);

  // Start parallax effect
  const startParallax = useCallback(async () => {
    if (!isSupported) return false;
    if (prefersReducedMotion()) return false;
    if (!enableOnMobile && isMobileDevice()) return false;
    if (!enableOnDesktop && !isMobileDevice()) return false;

    // Request permission if needed
    const hasPermission = await requestPermission();
    if (!hasPermission) return false;

    isActive.current = true;
    window.addEventListener('deviceorientation', updateTransform, { passive: true });
    
    return true;
  }, [isSupported, updateTransform, requestPermission, enableOnMobile, enableOnDesktop, isMobileDevice, prefersReducedMotion]);

  // Stop parallax effect
  const stopParallax = useCallback(() => {
    isActive.current = false;
    window.removeEventListener('deviceorientation', updateTransform);
    
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    // Reset transform
    setTransform({
      translateX: 0,
      translateY: 0,
      scale: 1,
      opacity: 1
    });
  }, [updateTransform]);

  // Auto-start effect
  useEffect(() => {
    let mounted = true;

    const initParallax = async () => {
      if (mounted) {
        await startParallax();
      }
    };

    initParallax();

    return () => {
      mounted = false;
      stopParallax();
    };
  }, [startParallax, stopParallax]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopParallax();
      } else if (isActive.current) {
        startParallax();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startParallax, stopParallax]);

  // Generate CSS transform string
  const cssTransform = `translate3d(${transform.translateX}px, ${transform.translateY}px, 0) scale(${transform.scale})`;

  // Generate inline styles
  const styles = {
    transform: cssTransform,
    opacity: transform.opacity,
    transition: isActive.current ? 'none' : 'all 0.3s ease-out',
    willChange: isActive.current ? 'transform, opacity' : 'auto'
  };

  return {
    transform,
    cssTransform,
    styles,
    isSupported,
    isActive: isActive.current,
    permissionState,
    error,
    startParallax,
    stopParallax,
    requestPermission
  };
};

export default useParallaxHero;