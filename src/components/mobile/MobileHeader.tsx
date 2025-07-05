import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Video, Menu } from 'lucide-react';

interface MobileHeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
  onTelehealthClick: () => void;
  onCallClick: () => void;
  onDirectionsClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  onNavigate,
  onTelehealthClick,
  onCallClick,
  onDirectionsClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    onNavigate('home');
  };

  const handleMoreMenuToggle = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const moreMenuItems = [
    { label: 'About Us', onClick: () => { onNavigate('about'); setShowMoreMenu(false); } },
    { label: 'Services', onClick: () => { onNavigate('services'); setShowMoreMenu(false); } },
    { label: 'Our Doctors', onClick: () => { onNavigate('doctors'); setShowMoreMenu(false); } },
    { label: 'Reception Team', onClick: () => { onNavigate('reception-team'); setShowMoreMenu(false); } },
    { label: 'Patient Info', onClick: () => { onNavigate('patients'); setShowMoreMenu(false); } },
    { label: 'Contact', onClick: () => { onNavigate('contact'); setShowMoreMenu(false); } },
  ];

  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(6);
    }
  };

  return (
    <>
      {/* Fixed Header - Frosted Glass */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.85) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          boxShadow: isScrolled 
            ? '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)' 
            : '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-4 h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              // Initial State - Logo and Text
              <motion.div
                key="logo-text"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <div className="flex items-center space-x-3">
                  <motion.img
                    src="/images/hcm3d2.png"
                    alt="Heart Clinic Melbourne Logo"
                    className="w-8 h-8 object-contain"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div>
                    <h1 className="text-base font-semibold text-gray-800 leading-tight">
                      Heart Clinic
                    </h1>
                    <p className="text-base font-semibold text-gray-800 leading-tight -mt-1">
                      Melbourne
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Scrolled State - Navigation Bar
              <motion.div
                key="navigation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-around w-full max-w-md"
              >
                {/* Logo Button (replaces Home) */}
                <motion.button
                  onClick={() => { vibrate(); handleLogoClick(); }}
                  className="flex flex-col items-center justify-center px-2 py-2 transition-all duration-300 text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    src="/images/hcm3d2.png"
                    alt="Heart Clinic Melbourne Logo"
                    className="w-5 h-5 mb-0.5"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-xs font-medium">
                    Home
                  </span>
                </motion.button>

                {/* Call Button */}
                <motion.button
                  onClick={() => { vibrate(); onCallClick(); }}
                  className="flex flex-col items-center justify-center px-2 py-2 transition-all duration-300 text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
                  <span className="text-xs font-medium">
                    Call
                  </span>
                </motion.button>

                {/* Directions Button */}
                <motion.button
                  onClick={() => { vibrate(); onDirectionsClick(); }}
                  className="flex flex-col items-center justify-center px-2 py-2 transition-all duration-300 text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
                  <span className="text-xs font-medium">
                    Directions
                  </span>
                </motion.button>

                {/* Video/Telehealth Button */}
                <motion.button
                  onClick={() => { vibrate(); onTelehealthClick(); }}
                  className="flex flex-col items-center justify-center px-2 py-2 transition-all duration-300 text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
                  <span className="text-xs font-medium">
                    Video
                  </span>
                </motion.button>

                {/* More Menu Button */}
                <motion.button
                  onClick={() => { vibrate(); handleMoreMenuToggle(); }}
                  className="flex flex-col items-center justify-center px-2 py-2 transition-all duration-300 text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: showMoreMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
                  </motion.div>
                  <span className="text-xs font-medium">
                    More
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* More Menu Dropdown */}
      <AnimatePresence>
        {showMoreMenu && isScrolled && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreMenu(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              className="fixed top-16 right-4 z-50 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="py-2">
                {moreMenuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={item.onClick}
                    className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-gray-700 font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;