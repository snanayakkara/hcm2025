import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProcedureButtonProps {
  procedure: {
    name: string;
    description: string;
    color: string;
    image?: string;
  };
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const EnhancedProcedureButton: React.FC<ProcedureButtonProps> = ({
  procedure,
  isSelected,
  onClick,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-500 transform hover:-translate-y-1 border group ${
        isSelected
          ? 'shadow-2xl scale-105 border-transparent ring-2 ring-primary-300 ring-opacity-50' 
          : 'shadow-sm hover:shadow-2xl border-secondary-200 hover:border-primary-300'
      }`}
      whileHover={{ 
        y: -6, 
        scale: 1.03,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }
      }}
      whileTap={{ 
        scale: 0.97,
        transition: { 
          type: "spring", 
          stiffness: 600, 
          damping: 30 
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-primary-400/20 rounded-2xl"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={isSelected ? { scale: [0, 1.2, 1], opacity: [0.5, 0.2, 0] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Blurred background image */}
      {procedure.image && (
        <div 
          className="absolute inset-0 rounded-2xl transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${procedure.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            imageRendering: '-webkit-optimize-contrast',
            filter: 'blur(2px)'
          }}
        />
      )}
      
      {/* Animated glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 to-accent-400 blur-xl"
        animate={isHovered ? { 
          opacity: [0, 0.3, 0],
          scale: [1, 1.1, 1] 
        } : { opacity: 0 }}
        transition={{ 
          duration: 2, 
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut" 
        }}
      />
      
      {/* Main backdrop filter overlay */}
      <motion.div 
        className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isSelected
            ? `bg-gradient-to-r ${procedure.color} opacity-90`
            : 'bg-white/70 hover:bg-white/85 group-hover:bg-gradient-to-br group-hover:from-white/80 group-hover:to-primary-50/50'
        }`} 
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
        animate={isHovered ? {
          background: isSelected 
            ? `linear-gradient(to right, ${procedure.color.replace('from-', '').replace('to-', '')})` 
            : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(var(--primary-50),0.6))'
        } : {}}
      />
      
      {/* Animated border gradient */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400"
        animate={isHovered ? {
          opacity: [0, 0.4, 0],
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5))',
            'linear-gradient(225deg, rgba(147, 51, 234, 0.5), rgba(236, 72, 153, 0.5))',
            'linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5))'
          ]
        } : { opacity: 0 }}
        transition={{ 
          duration: 3, 
          repeat: isHovered ? Infinity : 0,
          ease: "linear" 
        }}
        style={{ padding: '1px' }}
      >
        <div className="w-full h-full rounded-2xl bg-transparent" />
      </motion.div>
      
      {/* Selection indicator with enhanced animation */}
      {isSelected && (
        <motion.div 
          className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            delay: 0.1 
          }}
        >
          <motion.div 
            className="w-3 h-3 bg-primary-500 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0.4)',
                '0 0 0 8px rgba(59, 130, 246, 0)',
                '0 0 0 0 rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      )}
      
      {/* Content with enhanced microinteractions */}
      <div className="relative z-10 space-y-4 pointer-events-none">
        <motion.h4 
          className={`font-semibold text-lg leading-tight transition-colors duration-300 ${
            isSelected ? 'text-white' : 'text-secondary-900 group-hover:text-primary-700'
          }`}
          animate={isSelected ? { 
            scale: [1, 1.02, 1],
            textShadow: [
              '0 0 0 rgba(255,255,255,0)',
              '0 0 10px rgba(255,255,255,0.3)',
              '0 0 0 rgba(255,255,255,0)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {procedure.name}
        </motion.h4>
        
        <motion.p 
          className={`text-sm transition-colors duration-300 ${
            isSelected ? 'text-white/90' : 'text-secondary-600 group-hover:text-secondary-700'
          }`}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {procedure.description}
        </motion.p>
        
        {/* Floating particles on hover */}
        {isHovered && (
          <>
            <motion.div 
              className="absolute -top-2 -left-2 w-2 h-2 bg-primary-400 rounded-full"
              animate={{
                y: [-5, -15, -5],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0 
              }}
            />
            <motion.div 
              className="absolute top-4 -right-1 w-1 h-1 bg-accent-400 rounded-full"
              animate={{
                x: [0, 10, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5 
              }}
            />
            <motion.div 
              className="absolute -bottom-1 left-8 w-1.5 h-1.5 bg-primary-300 rounded-full"
              animate={{
                y: [0, -8, 0],
                x: [-3, 3, -3],
                opacity: [0, 1, 0],
                scale: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1 
              }}
            />
          </>
        )}
      </div>
      
      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={isHovered ? {
          x: [-100, 200],
          opacity: [0, 1, 0]
        } : { x: -100, opacity: 0 }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut",
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 2
        }}
        style={{ 
          transform: 'skewX(-20deg)',
          width: '30%'
        }}
      />
    </motion.button>
  );
};

export default EnhancedProcedureButton;