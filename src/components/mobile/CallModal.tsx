import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Clock, MapPin, Heart } from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const mainContact = {
    title: "Heart Clinic Melbourne",
    subtitle: "Main Reception",
    phone: "(03) 9509 5009",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    description: "General inquiries, appointments, and patient support",
    color: "from-primary-500 to-primary-600",
  };

  const hospitals = [
    {
      name: "Cabrini Hospital, Malvern",
      phone: "(03) 9508 1222",
      address: "183 Wattletree Rd, Malvern",
      hours: "24/7 Emergency",
      type: "Main Location",
    },
    {
      name: "The Alfred Hospital",
      phone: "(03) 9076 2000",
      address: "55 Commercial Rd, Melbourne",
      hours: "24/7 Emergency",
      type: "Public Hospital",
    },
  ];

  const handleCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    window.location.href = `tel:${cleanNumber}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-xl">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary-800">Call Us</h2>
                  <p className="text-secondary-600 text-sm">Choose the right contact</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
              >
                <X className="w-6 h-6 text-secondary-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Main Contact */}
              <motion.button
                onClick={() => handleCall(mainContact.phone)}
                className={`w-full p-4 rounded-2xl bg-gradient-to-br ${mainContact.color} text-white transition-all duration-300 shadow-lg`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg mb-1">{mainContact.title}</h3>
                    <p className="text-white/90 text-sm mb-2">{mainContact.subtitle}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span className="font-mono text-lg">{mainContact.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-white/80 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{mainContact.hours}</span>
                  </div>
                  <span>{mainContact.description}</span>
                </div>
              </motion.button>

              {/* Hospital Contacts */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-secondary-700 px-2">
                  Hospital Direct Lines
                </h4>
                {hospitals.map((hospital, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleCall(hospital.phone)}
                    className="w-full p-4 bg-secondary-50 hover:bg-secondary-100 rounded-xl transition-all duration-300 border border-secondary-200"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-secondary-200 rounded-lg">
                        <MapPin className="w-4 h-4 text-secondary-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-secondary-800 text-sm">
                          {hospital.name}
                        </h4>
                        <p className="text-secondary-600 text-xs mb-1">
                          {hospital.address}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-secondary-700 font-mono text-sm">
                            {hospital.phone}
                          </span>
                          <span className="text-xs text-secondary-500">
                            {hospital.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Info Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-blue-800 text-xs text-center">
                  💡 For non-urgent inquiries, you can also email us at{' '}
                  <span className="font-medium">reception@heartclinicmelbourne.com</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallModal;