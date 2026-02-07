import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Video, Menu } from 'lucide-react';
import { SCROLL_THRESHOLD } from '../../constants';

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
    let ticking = false;
    let observer: IntersectionObserver | null = null;
    let sentinel: HTMLDivElement | null = null;
    
    const updateScrollState = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrolled = currentScrollY > SCROLL_THRESHOLD;
      setIsScrolled(scrolled);
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use Intersection Observer as primary method for reliable detection
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px 0px 0px',
      threshold: 0
    };

    try {
      const IntersectionObserverImpl =
        window.IntersectionObserver ?? globalThis.IntersectionObserver;

      if (typeof IntersectionObserverImpl === 'function') {
        observer = new IntersectionObserverImpl((entries) => {
          entries.forEach((entry) => {
            setIsScrolled(!entry.isIntersecting);
          });
        }, observerOptions);

        // Create a sentinel element at the top
        sentinel = document.createElement('div');
        sentinel.style.position = 'absolute';
        sentinel.style.top = '0';
        sentinel.style.height = '1px';
        sentinel.style.width = '100%';
        sentinel.style.pointerEvents = 'none';
        sentinel.style.zIndex = '-1';
        document.body.appendChild(sentinel);

        if (typeof observer.observe === 'function') {
          observer.observe(sentinel);
        }
      }
    } catch (error) {
      console.error('MobileHeader intersection observer setup failed:', error);
    }

    // Standard scroll events for all devices
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Force initial check
    const initialTimeoutId = setTimeout(updateScrollState, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
      if (sentinel && document.body.contains(sentinel)) {
        document.body.removeChild(sentinel);
      }
      clearTimeout(initialTimeoutId);
    };
  }, []);

  const handleLogoClick = () => {
    onNavigate('home');
  };

  const handleMoreMenuToggle = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const runSafely = (callback: () => void) => {
    try {
      callback();
    } catch (error) {
      console.error('MobileHeader action failed:', error);
    }
  };

  const moreMenuItems = [
    { label: 'About Us', onClick: () => { runSafely(() => onNavigate('about')); setShowMoreMenu(false); } },
    { label: 'Services', onClick: () => { runSafely(() => onNavigate('services')); setShowMoreMenu(false); } },
    { label: 'Our Doctors', onClick: () => { runSafely(() => onNavigate('doctors')); setShowMoreMenu(false); } },
    { label: 'Reception Team', onClick: () => { runSafely(() => onNavigate('reception-team')); setShowMoreMenu(false); } },
    { label: 'Patient Information', onClick: () => { runSafely(() => onNavigate('patients')); setShowMoreMenu(false); } },
    { label: 'Contact', onClick: () => { runSafely(() => onNavigate('contact')); setShowMoreMenu(false); } },
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset-top"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
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
              // Initial State - Logo and Navigation
              <motion.div
                key="logo-nav"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between w-full max-w-md"
              >
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <motion.img
                    src="/images/hcm3d2.webp"
                    alt="Heart Clinic Melbourne Logo"
                    className="w-6 h-6 object-contain"
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
                    <h1 className="text-sm font-semibold text-gray-800 leading-tight">
                      Heart Clinic Melbourne
                    </h1>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center space-x-1">
                  <motion.button
                    onClick={() => { vibrate(); runSafely(onCallClick); }}
                    className="flex flex-col items-center justify-center px-2 py-1 transition-all duration-300 text-teal-600 hover:text-teal-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Call Heart Clinic Melbourne"
                  >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    <span className="text-xs font-medium">Call</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => { vibrate(); runSafely(handleMoreMenuToggle); }}
                    className="flex flex-col items-center justify-center px-2 py-1 transition-all duration-300 text-teal-600 hover:text-teal-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={showMoreMenu ? "Close menu" : "Open menu"}
                    aria-expanded={showMoreMenu}
                    aria-controls="more-menu"
                  >
                    <motion.div
                      animate={{ rotate: showMoreMenu ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-4 h-4" strokeWidth={2.5} />
                    </motion.div>
                    <span className="text-xs font-medium">Menu</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              // Scrolled State - Full Navigation Bar
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
                  onClick={() => { vibrate(); runSafely(handleLogoClick); }}
                  className="flex flex-col items-center justify-center px-2 py-2 transition-all duration-300 text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    src="/images/hcm3d2.webp"
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
                  onClick={() => { vibrate(); runSafely(onCallClick); }}
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
                  onClick={() => { vibrate(); runSafely(onDirectionsClick); }}
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
                  onClick={() => { vibrate(); runSafely(onTelehealthClick); }}
                  className="flex flex-col items-center justify-center px-2 py-2 transition-all duration-300 text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
                  <span className="text-xs font-medium">
                    Telehealth
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
        {showMoreMenu && (
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
