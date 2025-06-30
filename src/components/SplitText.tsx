import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = "", 
  style = {},
  delay = 0,
  duration = 0.05
}) => {
  const letters = Array.from(children);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: duration, 
        delayChildren: delay,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", ...style }}
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          variants={child}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default SplitText;
