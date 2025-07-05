import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface SwipeItem {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

interface SwipeDeckProps {
  items: SwipeItem[];
  onItemSelect?: (item: SwipeItem) => void;
  onLongPress?: (item: SwipeItem) => void;
  className?: string;
}

const SwipeDeck: React.FC<SwipeDeckProps> = ({ 
  items, 
  onItemSelect,
  onLongPress,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedItems, setSwipedItems] = useState<SwipeItem[]>([]);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);

  const currentItem = items[currentIndex];
  const hasNextItem = currentIndex < items.length - 1;
  const hasPrevItem = currentIndex > 0 || swipedItems.length > 0;

  const handleDragStart = () => {
    isDragging.current = true;
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      setDragDirection(info.offset.x > 0 ? 'right' : 'left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    const swipeThreshold = 100;
    const velocityThreshold = 500;
    
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > velocityThreshold) {
      if (info.offset.x > 0) {
        // Swiped right - go to previous
        handlePrevious();
      } else {
        // Swiped left - go to next
        handleNext();
      }
    }
    setDragDirection(null);
  };

  const handleNext = () => {
    if (hasNextItem) {
      if (currentItem) {
        setSwipedItems(prev => [...prev, currentItem]);
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (swipedItems.length > 0) {
      // Restore from undo stack
      const lastItem = swipedItems[swipedItems.length - 1];
      setSwipedItems(prev => prev.slice(0, -1));
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleUndo = () => {
    if (swipedItems.length > 0) {
      handlePrevious();
    }
  };

  const handleItemClick = () => {
    if (!isDragging.current && currentItem && onItemSelect) {
      onItemSelect(currentItem);
    }
  };

  const handleMouseDown = () => {
    pressTimer.current = setTimeout(() => {
      if (!isDragging.current && currentItem && onLongPress) {
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }
        onLongPress(currentItem);
      }
    }, 500);
  };

  const handleMouseUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleItemClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, swipedItems.length]);

  if (!currentItem) {
    return (
      <div className={`relative min-h-[26rem] ${className}`}>
        <div className="flex items-center justify-center min-h-[20rem] bg-gray-50 rounded-xl">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No more items</p>
            {swipedItems.length > 0 && (
              <button
                onClick={handleUndo}
                className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Undo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[26rem] ${className}`}>
      {/* Swipe Container */}
      <div className="relative w-full swipe-container overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onClick={handleItemClick}
            initial={{ x: 300, opacity: 0, scale: 0.8 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              scale: 1,
              rotate: dragDirection === 'left' ? -5 : dragDirection === 'right' ? 5 : 0
            }}
            exit={{ 
              x: dragDirection === 'left' ? -300 : 300, 
              opacity: 0, 
              scale: 0.8,
              rotate: dragDirection === 'left' ? -15 : 15
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              cursor: 'grab', 
              height: 'auto',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 25%, rgba(255,255,255,0.95) 50%, rgba(248,250,252,0.9) 75%, rgba(255,255,255,0.95) 100%)',
              backdropFilter: 'blur(20px) saturate(180%) brightness(105%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(105%)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.02)'
            }}
            className="flex flex-col rounded-2xl overflow-hidden w-full h-auto relative"
          >
            {currentItem.content}
            
            {/* Swipe Indicators */}
            {dragDirection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                  dragDirection === 'left' 
                    ? 'bg-red-500/20' 
                    : 'bg-green-500/20'
                }`}
              >
                <div className={`text-4xl font-bold ${
                  dragDirection === 'left' 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  {dragDirection === 'left' ? '←' : '→'}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next card preview */}
        {items[currentIndex + 1] && (
          <div className="absolute inset-0 -z-10 transform scale-95 opacity-50">
            <div className="w-full h-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              {items[currentIndex + 1].content}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button
          onClick={handlePrevious}
          disabled={!hasPrevItem}
          className="p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px) saturate(150%)',
            WebkitBackdropFilter: 'blur(10px) saturate(150%)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          {items.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'scale-125'
                  : 'scale-100'
              }`}
              style={index === currentIndex ? {
                background: 'linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)',
                boxShadow: '0 2px 8px rgba(20,184,166,0.4), inset 0 1px 0 rgba(255,255,255,0.5)'
              } : index < currentIndex ? {
                background: 'rgba(156,163,175,0.7)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              } : {
                background: 'rgba(229,231,235,0.8)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!hasNextItem}
          className="p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px) saturate(150%)',
            WebkitBackdropFilter: 'blur(10px) saturate(150%)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Undo Button */}
      {swipedItems.length > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={handleUndo}
          className="absolute top-4 right-4 p-2 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px) saturate(150%)',
            WebkitBackdropFilter: 'blur(10px) saturate(150%)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </motion.button>
      )}

      {/* Info Button */}
      <motion.button
        onClick={() => onLongPress && currentItem && onLongPress(currentItem)}
        className="absolute top-4 left-4 p-2 rounded-full transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px) saturate(150%)',
          WebkitBackdropFilter: 'blur(10px) saturate(150%)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Info className="w-4 h-4 text-gray-600" />
      </motion.button>

      {/* Swipe Instructions */}
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500">
          Swipe left/right • Tap for details • Long press for info
        </p>
      </div>
    </div>
  );
};

export default SwipeDeck;