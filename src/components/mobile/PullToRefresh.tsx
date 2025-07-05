import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ChevronDown } from 'lucide-react';
import usePullToRefresh from '../../hooks/usePullToRefresh';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  enabled?: boolean;
  threshold?: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  enabled = true,
  threshold = 80
}) => {
  const {
    isPulling,
    isRefreshing,
    pullDistance,
    canRefresh,
    progress,
    indicatorTransform
  } = usePullToRefresh({
    onRefresh,
    enabled,
    threshold
  });

  const getIndicatorText = () => {
    if (isRefreshing) return 'Refreshing...';
    if (canRefresh) return 'Release to refresh';
    return 'Pull to refresh';
  };

  const getIndicatorIcon = () => {
    if (isRefreshing) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-5 h-5" />
        </motion.div>
      );
    }
    
    if (canRefresh) {
      return (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      );
    }
    
    return <ChevronDown className="w-5 h-5" />;
  };

  return (
    <div className="relative">
      {/* Pull to Refresh Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-30 pull-to-refresh-indicator"
        style={{
          transform: indicatorTransform,
          opacity: isPulling || isRefreshing ? 1 : 0
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <div className="flex items-center justify-center py-4">
          <motion.div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transition-colors duration-200 ${
              canRefresh || isRefreshing
                ? 'bg-teal-100 text-teal-700 border border-teal-200'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
            animate={{
              scale: canRefresh || isRefreshing ? 1.05 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <div className={`transition-colors duration-200 ${
              canRefresh || isRefreshing ? 'text-teal-600' : 'text-gray-400'
            }`}>
              {getIndicatorIcon()}
            </div>
            <span className="text-sm font-medium">
              {getIndicatorText()}
            </span>
          </motion.div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
            style={{
              width: `${progress}%`
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          transform: isPulling || isRefreshing ? `translateY(${Math.min(pullDistance, threshold)}px)` : 'translateY(0)',
          transition: isPulling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;