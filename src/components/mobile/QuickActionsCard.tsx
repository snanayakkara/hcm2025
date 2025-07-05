import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, MapPin, Calendar, Clock } from 'lucide-react';

interface QuickActionsCardProps {
  onCallClick: () => void;
  onTelehealthClick: () => void;
  onDirectionsClick: () => void;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onCallClick,
  onTelehealthClick,
  onDirectionsClick,
}) => {
  const primaryActions = [
    {
      id: 'call',
      label: 'Call Now',
      subtitle: '(03) 9509 5009',
      icon: Phone,
      onClick: onCallClick,
      color: 'from-primary-500 to-primary-600',
      hoverColor: 'from-primary-600 to-primary-700',
      shadowColor: 'rgba(20, 135, 146, 0.4)',
    },
    {
      id: 'telehealth',
      label: 'Telehealth',
      subtitle: 'Video call',
      icon: Video,
      onClick: onTelehealthClick,
      color: 'from-accent-500 to-accent-600',
      hoverColor: 'from-accent-600 to-accent-700',
      shadowColor: 'rgba(59, 215, 214, 0.4)',
    },
    {
      id: 'directions',
      label: 'Directions',
      subtitle: '3 locations',
      icon: MapPin,
      onClick: onDirectionsClick,
      color: 'from-sage-500 to-sage-600',
      hoverColor: 'from-sage-600 to-sage-700',
      shadowColor: 'rgba(74, 120, 125, 0.4)',
    },
  ];

  const secondaryActions = [
    {
      id: 'book',
      label: 'Book Appointment',
      icon: Calendar,
      onClick: () => {
        const element = document.getElementById('patients');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'hours',
      label: 'Opening Hours',
      icon: Clock,
      onClick: () => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-secondary-200/50 p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-lg font-bold text-secondary-800 mb-1">
            Quick Actions
          </h3>
          <p className="text-sm text-secondary-600">
            Get started with our services
          </p>
        </div>

        {/* Primary Actions - Grid */}
        <div className="space-y-4 mb-8">
          {primaryActions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={action.onClick}
              className={`w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r ${action.color} hover:${action.hoverColor} text-white transition-all duration-300 group relative overflow-hidden`}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                boxShadow: `0 12px 30px ${action.shadowColor}`,
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-xl">
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-base">
                    {action.label}
                  </div>
                  <div className="text-sm text-white/80">
                    {action.subtitle}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </motion.div>

              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-2xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Secondary Actions - Horizontal */}
        <div className="flex space-x-4">
          {secondaryActions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={action.onClick}
              className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (0.1 * index) }}
            >
              <action.icon className="w-6 h-6 text-secondary-600 mb-3 group-hover:text-secondary-700 transition-colors" />
              <span className="text-sm font-medium text-secondary-700 text-center leading-tight">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActionsCard;