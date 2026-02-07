// src/lib/motion.ts
export const DEFAULT_VIEWPORT = { once: false, amount: 0.2 };

// Mobile-specific viewport with fallbacks for iOS Safari
export const MOBILE_VIEWPORT = { 
  once: true, 
  amount: 0.1,
  margin: "0px 0px -50px 0px"
};
