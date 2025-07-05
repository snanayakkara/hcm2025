import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Stethoscope, UserCheck, Users, Video, Phone, MapPin, Menu, X } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  activeSection: string;
  onTelehealthClick: () => void;
  onCallClick: () => void;
  onDirectionsClick: () => void;
  onNavigate?: (section: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onPageChange,
  activeSection,
  onTelehealthClick,
  onCallClick,
  onDirectionsClick,
  onNavigate,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isDevTools, setIsDevTools] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Detect Chrome DevTools and initialize
  useEffect(() => {
    // Detect Chrome DevTools (device simulation)
    const isChrome = /chrome/i.test(navigator.userAgent);
    const isDevToolsOpen = window.outerHeight - window.innerHeight > 200 || 
                          window.outerWidth - window.innerWidth > 200 ||
                          /mobile/i.test(navigator.userAgent) && isChrome;
    
    setIsDevTools(isDevToolsOpen);
    setHasInitialized(true);
    
    // Always show initially, especially for DevTools
    setIsVisible(true);
    
  }, []);

  useEffect(() => {
    // Skip complex scroll logic for DevTools to ensure visibility
    if (isDevTools || !hasInitialized) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      
      
      // Show navbar when scrolling up or at the top
      if (scrollingUp || currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down and past initial scroll
      else if (scrollingDown && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isVisible, isDevTools, hasInitialized]);
  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(6);
    }
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      section: 'home',
    },
    {
      id: 'services',
      label: 'Services',
      icon: Stethoscope,
      section: 'services',
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: UserCheck,
      section: 'doctors',
    },
  ];

  const actionItems = [
    {
      id: 'call',
      label: 'Call',
      icon: Phone,
      onClick: onCallClick,
      color: 'text-emerald-600',
    },
    {
      id: 'directions',
      label: 'Directions',
      icon: MapPin,
      onClick: onDirectionsClick,
      color: 'text-orange-600',
    },
  ];

  const moreMenuItems = [
    { label: 'About Us', onClick: () => handleQuickNavigate('about') },
    { label: 'Reception Team', onClick: () => handleQuickNavigate('reception-team') },
    { label: 'Patient Info', onClick: () => handleQuickNavigate('patients') },
    { label: 'Contact', onClick: () => handleQuickNavigate('contact') },
    { label: 'Book Appointment', onClick: () => window.location.href = 'mailto:reception@heartclinicmelbourne.com' },
    { label: 'Emergency Info', onClick: () => window.location.href = 'tel:000' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    vibrate();
    if (currentPage === 'home') {
      // If on home page, scroll to section
      const element = document.getElementById(item.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on different page, navigate to home first
      onPageChange('home');
      setTimeout(() => {
        const element = document.getElementById(item.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleTelehealthClick = () => {
    vibrate();
    onTelehealthClick();
  };

  const handleQuickNavigate = (section: string) => {
    vibrate();
    if (onNavigate) {
      onNavigate(section);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setShowMoreMenu(false);
  };

  const handleActionClick = (action: typeof actionItems[0]) => {
    vibrate();
    action.onClick();
  };

  const handleMoreMenuToggle = () => {
    vibrate();
    setShowMoreMenu(!showMoreMenu);
  };

  const isActive = (item: typeof navItems[0]) => {
    if (currentPage === 'home') {
      return activeSection === item.section;
    }
    return currentPage === item.id;
  };



  return (
    <>
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        duration: 0.4
      }}
      className="fixed bottom-0 left-0 right-0 z-[100] safe-area-inset-bottom"
      style={{
        // Force visibility for debugging in DevTools
        ...(isDevTools && { 
          transform: 'translateY(0px) translateZ(0)',
          opacity: 1,
          visibility: 'visible'
        })
      }}
    >
      {/* Liquid Glass Effect Container */}
      <div className="relative">
        {/* Glass Background with Liquid Glass Effects */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/80 backdrop-blur-2xl backdrop-saturate-200"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,253,250,0.8) 25%, rgba(236,254,255,0.85) 50%, rgba(240,253,250,0.8) 75%, rgba(255,255,255,0.9) 100%)',
            backdropFilter: 'blur(20px) saturate(180%) brightness(110%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(110%)',
            borderTop: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.1), 0 -1px 0 rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.9)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 px-3 py-4" style={{ minHeight: '68px' }}>
        <div className="flex items-center justify-around h-full">
          {/* Navigation Items */}
          {navItems.map((item, index) => {
            const active = isActive(item);
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all duration-300 haptic-feedback relative overflow-hidden ${
                  active
                    ? 'text-teal-600'
                    : 'text-gray-700 hover:text-teal-600'
                }`}
                style={active ? {
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 4px 16px rgba(20,184,166,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                  minWidth: '50px'
                } : { minWidth: '50px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <item.icon className="w-4 h-4 mb-0.5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-xs font-medium truncate max-w-[8ch]">
                  {item.label}
                </span>
              </motion.button>
            );
          })}

          {/* Action Items */}
          {actionItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleActionClick(item)}
              className={`flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all duration-300 haptic-feedback relative overflow-hidden ${item.color} hover:opacity-80`}
              style={{
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px) saturate(150%)',
                WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
                minWidth: '50px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (navItems.length + index) }}
            >
              <item.icon className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
              <span className="text-xs font-medium truncate max-w-[8ch]">
                {item.label}
              </span>
            </motion.button>
          ))}

          {/* Telehealth Button - Accent Color with Liquid Glass */}
          <motion.button
            onClick={handleTelehealthClick}
            className="flex flex-col items-center justify-center px-2 py-2 rounded-xl text-emerald-600 hover:text-emerald-700 transition-all duration-300 haptic-feedback relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.15) 100%)',
              backdropFilter: 'blur(10px) saturate(150%)',
              WebkitBackdropFilter: 'blur(10px) saturate(150%)',
              border: '1px solid rgba(16,185,129,0.3)',
              boxShadow: '0 4px 16px rgba(16,185,129,0.2), inset 0 1px 0 rgba(255,255,255,0.6)',
              minWidth: '50px'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (navItems.length + actionItems.length) }}
          >
            <Video className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
            <span className="text-xs font-medium truncate max-w-[8ch]">
              Video
            </span>
          </motion.button>

          {/* More Menu Button */}
          <motion.button
            onClick={handleMoreMenuToggle}
            className="flex flex-col items-center justify-center px-2 py-2 rounded-xl text-gray-700 hover:text-gray-900 transition-all duration-300 haptic-feedback relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px) saturate(150%)',
              WebkitBackdropFilter: 'blur(10px) saturate(150%)',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
              minWidth: '50px'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (navItems.length + actionItems.length + 1) }}
          >
            <motion.div
              animate={{ rotate: showMoreMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
            </motion.div>
            <span className="text-xs font-medium truncate max-w-[8ch]">
              More
            </span>
          </motion.button>
        </div>
        </div>
      </div>
      
      {/* iOS-style home indicator with Liquid Glass */}
      <div 
        className="pb-2 ios-safe-bottom"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)'
        }}
      >
        <div className="flex justify-center pt-1">
          <div 
            className="w-32 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(148,163,184,0.4) 0%, rgba(100,116,139,0.6) 50%, rgba(148,163,184,0.4) 100%)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
    </motion.div>

    {/* More Menu Overlay */}
    <AnimatePresence>
      {showMoreMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMoreMenu(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]"
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
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[95] w-80 max-w-[calc(100vw-2rem)]"
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
                  <button
                    onClick={() => setShowMoreMenu(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {moreMenuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      item.onClick();
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/50 transition-all duration-200 text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="font-medium text-gray-800 text-base">{item.label}</span>
                    <div className="w-3 h-3 bg-teal-500 rounded-full" />
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

export default BottomNavigation;