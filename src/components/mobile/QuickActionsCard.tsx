import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, MapPin, Calendar, Clock, FileText } from 'lucide-react';

interface QuickActionsCardProps {
  onCallClick: () => void;
  onTelehealthClick: () => void;
  onDirectionsClick: () => void;
  onQuickReferralClick: () => void;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onCallClick,
  onTelehealthClick,
  onDirectionsClick,
  onQuickReferralClick,
}) => {

  const primaryActions = [
    {
      id: 'call',
      label: 'Call',
      subtitle: '(03) 9509 5009',
      icon: Phone,
      onClick: onCallClick,
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-white',
    },
    {
      id: 'telehealth',
      label: 'Video',
      subtitle: 'Telehealth',
      icon: Video,
      onClick: onTelehealthClick,
      color: 'from-primary-500 to-primary-600',
      textColor: 'text-white',
    },
    {
      id: 'directions',
      label: 'Locations',
      subtitle: '3 clinics',
      icon: MapPin,
      onClick: onDirectionsClick,
      color: 'from-sage-500 to-sage-600',
      textColor: 'text-white',
    },
  ];

  const secondaryActions = [
    {
      id: 'book',
      label: 'Book',
      icon: Calendar,
      onClick: () => {
        const element = document.getElementById('patients');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'quickReferral',
      label: 'Refer',
      icon: FileText,
      onClick: onQuickReferralClick,
    },
    {
      id: 'hours',
      label: 'Hours',
      icon: Clock,
      onClick: () => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  ];


  // Original card layout (kept for compatibility)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-secondary-200/50 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-bold text-secondary-800 mb-1">
            Quick Actions
          </h3>
          <p className="text-sm text-secondary-600">
            Get started with our services
          </p>
        </div>

        {/* Primary Actions - Grid */}
        <div className="space-y-3 mb-6">
          {primaryActions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={action.onClick}
              className={`w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${action.color} ${action.textColor} transition-all duration-300 group relative overflow-hidden shadow-lg`}
              whileHover={{ 
                scale: 1.02,
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center space-x-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl">
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">
                    {action.label}
                  </div>
                  <div className="text-xs text-white/80">
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
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
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

        {/* Secondary Actions - Grid */}
        <div className="grid grid-cols-3 gap-2">
          {secondaryActions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={action.onClick}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (0.1 * index) }}
            >
              <action.icon className="w-5 h-5 text-secondary-600 mb-2 group-hover:text-secondary-700 transition-colors" />
              <span className="text-xs font-medium text-secondary-700 text-center leading-tight">
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