import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Stethoscope, UserCheck, Users, Video } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  activeSection: string;
  onTelehealthClick: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onPageChange,
  activeSection,
  onTelehealthClick,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
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
  }, [lastScrollY, isVisible]);
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
    {
      id: 'reception-team',
      label: 'Team',
      icon: Users,
      section: 'reception-team',
    },
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

  const isActive = (item: typeof navItems[0]) => {
    if (currentPage === 'home') {
      return activeSection === item.section;
    }
    return currentPage === item.id;
  };


  return (
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
          {navItems.map((item, index) => {
            const active = isActive(item);
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300 haptic-feedback relative overflow-hidden ${
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
                  minWidth: '60px'
                } : { minWidth: '60px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <item.icon className="w-4 h-4 mb-0.5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-xs font-medium truncate max-w-[10ch]">
                  {item.label}
                </span>
              </motion.button>
            );
          })}

          {/* Telehealth Button - Accent Color with Liquid Glass */}
          <motion.button
            onClick={handleTelehealthClick}
            className="flex flex-col items-center justify-center px-3 py-2 rounded-xl text-emerald-600 hover:text-emerald-700 transition-all duration-300 haptic-feedback relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.15) 100%)',
              backdropFilter: 'blur(10px) saturate(150%)',
              WebkitBackdropFilter: 'blur(10px) saturate(150%)',
              border: '1px solid rgba(16,185,129,0.3)',
              boxShadow: '0 4px 16px rgba(16,185,129,0.2), inset 0 1px 0 rgba(255,255,255,0.6)',
              minWidth: '60px'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Video className="w-4 h-4 mb-0.5" strokeWidth={2.5} />
            <span className="text-xs font-medium truncate max-w-[10ch]">
              Telehealth
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
  );
};

export default BottomNavigation;