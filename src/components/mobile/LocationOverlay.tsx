import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Phone, Clock, Car, Train } from 'lucide-react';

interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationOverlay: React.FC<LocationOverlayProps> = ({ isOpen, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [userAddress, setUserAddress] = useState('');

  const locations = [
    {
      name: "Cabrini Hospital, Malvern",
      address: "Suite 21, 183 Wattletree Rd, Malvern VIC 3144",
      phone: "(03) 9509 5009",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM",
      description: "Our main clinic location with full cardiac services",
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8!2d145.0456!3d-37.8234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6682b5b6b6b1b%3A0x5017d681632ccc55!2s183%20Wattletree%20Rd%2C%20Malvern%20VIC%203144%2C%20Australia!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau",
      color: "from-primary-500 to-primary-600",
    },
    {
      name: "Heart Clinic Pakenham",
      address: "44 Main Street, Pakenham VIC 3810",
      phone: "(03) 9509 5009",
      hours: "Wed: 9:00 AM - 5:00 PM",
      description: "Convenient southeastern location for cardiac consultations",
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8!2d145.4856!3d-38.0734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad7b9b1b5b6b6b1%3A0x5017d681632ccc55!2s44%20Main%20St%2C%20Pakenham%20VIC%203810%2C%20Australia!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau",
      color: "from-sage-500 to-sage-600",
    },
    {
      name: "Casey Medical Centre, Clyde",
      address: "1 Morison Rd, Clyde VIC 3978",
      phone: "(03) 9509 5009",
      hours: "Fri: 9:00 AM - 5:00 PM",
      description: "Modern medical facility in the growing Casey area",
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8!2d145.3456!3d-38.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad7b9b1b5b6b6b1%3A0x5017d681632ccc55!2s1%20Morison%20Rd%2C%20Clyde%20VIC%203978%2C%20Australia!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau",
      color: "from-accent-500 to-accent-600",
    },
  ];

  const handleGetDirections = (transportMode: 'driving' | 'transit') => {
    if (userAddress.trim()) {
      const destination = encodeURIComponent(locations[selectedLocation].address);
      const origin = encodeURIComponent(userAddress);
      const mode = transportMode === 'transit' ? 'transit' : 'driving';
      const url = `https://www.google.com/maps/dir/${origin}/${destination}?travelmode=${mode}`;
      window.open(url, '_blank');
    } else {
      // Open Google Maps to the location
      const destination = encodeURIComponent(locations[selectedLocation].address);
      const url = `https://www.google.com/maps/search/${destination}`;
      window.open(url, '_blank');
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${locations[selectedLocation].phone.replace(/\D/g, '')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-100">
              <div>
                <h2 className="text-xl font-bold text-secondary-800">Our Locations</h2>
                <p className="text-secondary-600 text-sm">Find directions to our clinics</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
              >
                <X className="w-6 h-6 text-secondary-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Location Selector */}
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-3">
                  {locations.map((location, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedLocation(index)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedLocation === index
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-secondary-200 bg-white hover:border-secondary-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${location.color} text-white`}>
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-secondary-800 mb-1">
                            {location.name}
                          </h3>
                          <p className="text-sm text-secondary-600 mb-2">
                            {location.address}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-secondary-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{location.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Selected Location Details */}
              <div className="mb-6">
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${locations[selectedLocation].color} text-white`}>
                  <h3 className="text-lg font-bold mb-2">
                    {locations[selectedLocation].name}
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    {locations[selectedLocation].description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{locations[selectedLocation].address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{locations[selectedLocation].phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{locations[selectedLocation].hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Your Address (Optional)
                </label>
                <input
                  type="text"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="Enter your starting address..."
                  className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Direction Buttons */}
              <div className="space-y-3 mb-6">
                <motion.button
                  onClick={() => handleGetDirections('driving')}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Car className="w-5 h-5" />
                  <span>Get Driving Directions</span>
                  <Navigation className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={() => handleGetDirections('transit')}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-sage-500 to-sage-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Train className="w-5 h-5" />
                  <span>Get Public Transport Directions</span>
                  <Navigation className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={handleCall}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Call This Location</span>
                </motion.button>
              </div>

              {/* Embedded Map */}
              <div className="rounded-2xl overflow-hidden border border-secondary-200">
                <iframe
                  src={locations[selectedLocation].googleMapsEmbed}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${locations[selectedLocation].name}`}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationOverlay;