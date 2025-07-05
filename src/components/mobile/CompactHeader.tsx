import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Search } from 'lucide-react';

interface CompactHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const CompactHeader: React.FC<CompactHeaderProps> = ({ activeSection, onSectionChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSectionChange('home');
  };

  const handleMainCall = () => {
    window.location.href = 'tel:0395095009';
  };

  return (
    <>
      {/* Compact Header */}
      <motion.header
        className="fixed left-0 right-0 z-40 top-0 transition-all duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="mx-4 mt-2">
          <div className={`transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-xl shadow-lg border border-secondary-200/50 rounded-2xl' 
              : 'bg-white/80 backdrop-blur-sm border border-secondary-100/30 rounded-2xl'
          }`}>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between h-12">
                {/* Logo - Significantly smaller */}
                <motion.div 
                  className="flex items-center cursor-pointer" 
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <motion.img
                      src="/images/hcm3d2.png"
                      alt="Heart Clinic Melbourne"
                      className="w-12 h-12 object-contain"
                      animate={hasScrolled ? {
                        scale: [1, 1.2, 1],
                      } : {
                        scale: 1
                      }}
                      transition={hasScrolled ? {
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {
                        duration: 0.3
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                      style={{
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
                      }}
                    />
                    <div>
                      <h1 className="text-sm font-semibold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
                        Heart Clinic
                      </h1>
                      <p className="text-xs text-secondary-500 leading-tight">
                        Melbourne
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-2">
                  {/* Search Button */}
                  <motion.button
                    className="p-2 rounded-xl hover:bg-sage-50 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="w-5 h-5 text-sage-600" />
                  </motion.button>

                  {/* Main Call Button */}
                  <motion.button
                    onClick={handleMainCall}
                    className="p-2 rounded-xl bg-primary-50 hover:bg-primary-100 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-5 h-5 text-primary-600" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default CompactHeader;