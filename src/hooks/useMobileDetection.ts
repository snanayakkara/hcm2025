import { useState, useEffect } from 'react';

interface MobileDetection {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  devicePixelRatio: number;
}

export const useMobileDetection = (): MobileDetection => {
  const [detection, setDetection] = useState<MobileDetection>(() => {
    // Initial detection on server-side render or first load
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouchDevice: false,
        screenWidth: 1024,
        screenHeight: 768,
        orientation: 'landscape',
        devicePixelRatio: 1,
      };
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const userAgent = navigator.userAgent.toLowerCase();
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Device type detection based on screen width and user agent
    const isMobile = screenWidth < 768 || /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = (screenWidth >= 768 && screenWidth < 1024) || /tablet|ipad/i.test(userAgent);
    const isDesktop = screenWidth >= 1024 && !isMobile && !isTablet;
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      isTouchDevice,
      screenWidth,
      screenHeight,
      orientation: screenWidth > screenHeight ? 'landscape' : 'portrait',
      devicePixelRatio: window.devicePixelRatio || 1,
    };
  });

  useEffect(() => {
    const updateDetection = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const userAgent = navigator.userAgent.toLowerCase();
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Device type detection
      const isMobile = screenWidth < 768 || /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = (screenWidth >= 768 && screenWidth < 1024) || /tablet|ipad/i.test(userAgent);
      const isDesktop = screenWidth >= 1024 && !isMobile && !isTablet;
      
      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice,
        screenWidth,
        screenHeight,
        orientation: screenWidth > screenHeight ? 'landscape' : 'portrait',
        devicePixelRatio: window.devicePixelRatio || 1,
      });
    };

    // Update on resize and orientation change
    window.addEventListener('resize', updateDetection);
    window.addEventListener('orientationchange', updateDetection);
    
    // Initial update
    updateDetection();

    return () => {
      window.removeEventListener('resize', updateDetection);
      window.removeEventListener('orientationchange', updateDetection);
    };
  }, []);

  return detection;
};

export default useMobileDetection;