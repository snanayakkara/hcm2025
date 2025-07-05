import React, { useState, useEffect } from 'react';
import { Phone, Video, MapPin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalType, setModalType] = useState<null | 'menu'>(null);
  const [showFloatingFooter, setShowFloatingFooter] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { isMobile } = useMobileDetection();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isMobile) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show footer when user starts scrolling
      if (scrollY > 100) {
        setShowFloatingFooter(true);
      } else {
        setShowFloatingFooter(false);
      }
      
      // Detect if user is actively scrolling
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobile]);

  const handleCall = () => {
    window.location.href = 'tel:+61395095009';
  };

  const handleTelehealth = () => {
    window.open('https://doxy.me/hcm21', '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=183+Wattletree+Rd+Malvern+VIC+3144', '_blank');
  };

  const handleMenuToggle = () => {
    setModalType(modalType === 'menu' ? null : 'menu');
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About Us', icon: '💙' },
    { id: 'services', label: 'Services', icon: '🩺' },
    { id: 'doctors', label: 'Our Doctors', icon: '👨‍⚕️' },
    { id: 'reception-team', label: 'Reception Team', icon: '👥' },
    { id: 'patients', label: 'Patient Info', icon: '📋' },
    { id: 'contact', label: 'Contact', icon: '📞' },
  ];

  // Only show on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Mobile Floating Capsule Footer */}
      <AnimatePresence>
        {showFloatingFooter && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.4 
            }}
            className="fixed bottom-8 left-0 right-0 z-[300] flex justify-center"
          >
            {/* Liquid Glass Capsule */}
            <motion.div
              animate={{
                scale: isScrolling ? 0.95 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Glass Background */}
              <div 
                className="absolute inset-0 rounded-3xl backdrop-blur-2xl backdrop-saturate-200 border border-white/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 25%, rgba(241,245,249,0.85) 50%, rgba(248,250,252,0.9) 75%, rgba(255,255,255,0.95) 100%)',
                  backdropFilter: 'blur(24px) saturate(200%) brightness(110%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(110%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center space-x-3 px-4 py-3">
                {/* Call Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCall}
                  className="flex flex-col items-center space-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #0891b2 100%)',
                      boxShadow: '0 4px 16px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    <Phone className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Call</span>
                </motion.button>

                {/* Telehealth Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleTelehealth}
                  className="flex flex-col items-center space-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
                      boxShadow: '0 4px 16px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    <Video className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Video</span>
                </motion.button>

                {/* Directions Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDirections}
                  className="flex flex-col items-center space-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
                      boxShadow: '0 4px 16px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    <MapPin className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Directions</span>
                </motion.button>

                {/* Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMenuToggle}
                  className="flex flex-col items-center space-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #4b5563 0%, #1f2937 100%)',
                      boxShadow: '0 4px 16px rgba(75,85,99,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    <Menu className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Menu</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Menu Modal */}
      <AnimatePresence>
        {modalType === 'menu' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[250]"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.3 
              }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[260] w-80 max-w-[calc(100vw-2rem)]"
            >
              <div 
                className="relative rounded-3xl backdrop-blur-2xl backdrop-saturate-200 border border-white/30 p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 25%, rgba(241,245,249,0.85) 50%, rgba(248,250,252,0.9) 75%, rgba(255,255,255,0.95) 100%)',
                  backdropFilter: 'blur(24px) saturate(200%) brightness(110%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(110%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        if (onNavigate) onNavigate(item.id);
                        scrollToSection(item.id);
                        setModalType(null);
                      }}
                      className="w-full flex items-center space-x-3 p-3 rounded-2xl text-left hover:bg-white/50 transition-all duration-200 group"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-gray-800 group-hover:text-gray-900">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;