import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, MapPin, MoreHorizontal } from 'lucide-react';

interface MobileActionBarProps {
  onCallClick: () => void;
  onTelehealthClick: () => void;
  onDirectionsClick: () => void;
}

const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onCallClick,
  onTelehealthClick,
  onDirectionsClick,
}) => {
  const [showMore, setShowMore] = React.useState(false);

  const actions = [
    {
      id: 'call',
      label: 'Call',
      icon: Phone,
      onClick: onCallClick,
      color: 'from-primary-500 to-primary-600',
      hoverColor: 'from-primary-600 to-primary-700',
    },
    {
      id: 'telehealth',
      label: 'Telehealth',
      icon: Video,
      onClick: onTelehealthClick,
      color: 'from-accent-500 to-accent-600',
      hoverColor: 'from-accent-600 to-accent-700',
    },
    {
      id: 'directions',
      label: 'Directions',
      icon: MapPin,
      onClick: onDirectionsClick,
      color: 'from-sage-500 to-sage-600',
      hoverColor: 'from-sage-600 to-sage-700',
    },
  ];

  const moreActions = [
    { label: 'Book Appointment', onClick: () => window.location.href = 'mailto:reception@heartclinicmelbourne.com' },
    { label: 'Patient Forms', onClick: () => {} },
    { label: 'Learning Library', onClick: () => {} },
    { label: 'Emergency Info', onClick: () => window.location.href = 'tel:000' },
  ];

  return (
    <>
      {/* Main Action Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+3.5rem)] left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex gap-4 bg-white shadow-xl rounded-3xl px-6 py-5 w-[380px] sm:w-[430px] overflow-visible">
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                onClick={action.onClick}
                className="flex flex-col items-center justify-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-xs leading-tight">{action.label}</span>
              </motion.button>
            ))}

            {/* More Button */}
            <motion.button
              onClick={() => setShowMore(!showMore)}
              className="flex flex-col items-center justify-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MoreHorizontal className="w-6 h-6" />
              </motion.div>
              <span className="text-xs leading-tight">More</span>
            </motion.button>
        </div>
      </motion.div>

      {/* More Actions Overlay */}
      {showMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setShowMore(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-40 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-secondary-200/50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-secondary-800 mb-4">Quick Actions</h3>
              {moreActions.map((action, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    action.onClick();
                    setShowMore(false);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary-50 transition-all duration-200 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="font-medium text-secondary-800 text-base">{action.label}</span>
                  <div className="w-3 h-3 bg-primary-500 rounded-full" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default MobileActionBar;