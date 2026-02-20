import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessCelebrationProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
  subMessage?: string;
}

/**
 * Animated success celebration overlay with confetti-like particles
 * and a morphing checkmark. Plays for ~2.5s then calls onComplete.
 */
const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  show,
  onComplete,
  message = 'Sent Successfully!',
  subMessage = 'Your email client will open shortly.',
}) => {
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (i / 24) * 360,
      distance: 60 + Math.random() * 80,
      size: 4 + Math.random() * 6,
      color: [
        '#148792', // primary
        '#3BD7D6', // accent
        '#6BA368', // sage
        '#F5ECD7', // cream
        '#0E5E66', // primary dark
        '#2ABFBF', // accent light
      ][i % 6],
      delay: Math.random() * 0.3,
    }))
  );

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 2800);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center">
            {/* Confetti particles */}
            {particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const tx = Math.cos(rad) * p.distance;
              const ty = Math.sin(rad) * p.distance;
              return (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: tx,
                    y: ty,
                    opacity: [1, 1, 0],
                    scale: [0, 1.2, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + p.delay,
                    ease: 'easeOut',
                  }}
                />
              );
            })}

            {/* Checkmark circle */}
            <motion.div
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
            >
              {/* Animated checkmark SVG */}
              <svg
                className="w-10 h-10 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                />
              </svg>

              {/* Ring pulse */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent-400"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Text below */}
            <motion.p
              className="mt-6 text-lg font-semibold text-secondary-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              {message}
            </motion.p>
            <motion.p
              className="mt-2 text-sm text-secondary-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              {subMessage}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessCelebration;
