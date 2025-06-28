import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, FileText, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'doctors', 'reception-team', 'patients', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setShowMegaMenu(false);
    }
  };

  const handleReferralClick = () => {
    window.open('mailto:referrals@heartclinicmelbourne.com.au?subject=Patient Referral&body=Dear Heart Clinic Melbourne Team,%0D%0A%0D%0AI would like to refer a patient for cardiac consultation.%0D%0A%0D%0APatient Details:%0D%0AName: %0D%0ADate of Birth: %0D%0AMedicare Number: %0D%0AContact Number: %0D%0A%0D%0AReason for Referral:%0D%0A%0D%0AClinical History:%0D%0A%0D%0ACurrent Medications:%0D%0A%0D%0AUrgency: [ ] Routine [ ] Semi-urgent [ ] Urgent%0D%0A%0D%0APreferred Location: [ ] Malvern [ ] Pakenham [ ] Clyde [ ] Berwick%0D%0A%0D%0AThank you,%0D%0A%0D%0ADr. [Your Name]%0D%0A[Practice Name]%0D%0A[Contact Details]');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { 
      id: 'services', 
      label: 'Services',
      hasSubmenu: true,
      submenu: [
        { id: 'services', label: 'All Services', description: 'Complete range of cardiac services' },
        { id: 'consultation', label: 'Consultations', description: 'Expert cardiac assessments' },
        { id: 'imaging', label: 'Cardiac Imaging', description: 'Advanced diagnostic imaging' },
        { id: 'procedures', label: 'Procedures', description: 'Interventional treatments' }
      ]
    },
    { id: 'doctors', label: 'Doctors' },
    { id: 'reception-team', label: 'Our Team' },
    { id: 'patients', label: 'Patients' },
    { id: 'education', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const headerVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const logoVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 group cursor-pointer" 
            onClick={() => scrollToSection('home')}
            variants={logoVariants}
            whileHover="hover"
          >
            <div className="relative">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Heart Clinic
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block font-medium">Melbourne</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <motion.button
                  onClick={() => item.hasSubmenu ? setShowMegaMenu(!showMegaMenu) : scrollToSection(item.id)}
                  onMouseEnter={() => item.hasSubmenu && setShowMegaMenu(true)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-200 relative ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.label}</span>
                  {item.hasSubmenu && (
                    <motion.div
                      animate={{ rotate: showMegaMenu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  )}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {item.hasSubmenu && showMegaMenu && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 p-6 z-50"
                      onMouseLeave={() => setShowMegaMenu(false)}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-3">
                        {item.submenu?.map((subItem) => (
                          <motion.button
                            key={subItem.id}
                            onClick={() => scrollToSection(subItem.id)}
                            className="w-full text-left p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                            whileHover={{ x: 5 }}
                          >
                            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {subItem.label}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {subItem.description}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <motion.button
                onClick={handleReferralClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4" />
                <span>Send Referral</span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
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
                  <X className="w-6 h-6 text-blue-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-2xl mt-4">
                <nav className="px-6 py-6 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left py-4 px-4 rounded-xl font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  
                  {/* Mobile Action Buttons */}
                  <div className="pt-4 space-y-3 border-t border-gray-200">
                    <motion.button
                      onClick={handleReferralClick}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText className="w-5 h-5" />
                      <span>Send Referral</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Schedule Consultation
                    </motion.button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;