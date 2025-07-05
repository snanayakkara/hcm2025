import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Video, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileHeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  onNavigate, 
  currentSection
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About Us', icon: '💙' },
    { id: 'services', label: 'Services', icon: '🩺' },
    { id: 'doctors', label: 'Our Doctors', icon: '👨‍⚕️' },
    { id: 'reception-team', label: 'Reception Team', icon: '👥' },
    { id: 'patients', label: 'Patient Info', icon: '📋' },
    { id: 'contact', label: 'Contact', icon: '📞' },
  ];

  const getCurrentSectionLabel = () => {
    const currentItem = navItems.find(item => item.id === currentSection);
    return currentItem ? currentItem.label : 'Heart Clinic Melbourne';
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
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
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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

          {/* Current Section Display */}
          <div className="hidden min-[360px]:block">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-gray-200/50"
            >
              {getCurrentSectionLabel()}
            </motion.div>
          </div>

          {/* Hamburger Menu */}
          <motion.button
            className="p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Slide-in Navigation Sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Navigation Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {/* Navigation Items */}
                <nav className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        currentSection === item.id
                          ? 'bg-teal-50 text-teal-600 border-l-4 border-teal-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <motion.button
                    onClick={() => window.open('https://doxy.me/hcm21', '_blank')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center space-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Video className="w-5 h-5" />
                    <span>Start Telehealth</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleNavClick('patients')}
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Appointment
                  </motion.button>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Contact Us
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 Cabrini Hospital, Malvern</p>
                    <p>📞 (03) 9508 1800</p>
                    <p>✉️ admin@heartclinicmelbourne.com.au</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;