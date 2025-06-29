import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ChevronDown, Video, Search, BookOpen, Mic, Camera } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTelehealthTooltip, setShowTelehealthTooltip] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Update active section based on scroll position (only on homepage)
      if (location.pathname === '/') {
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
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
    setShowMegaMenu(false);
  };

  const handleReferralClick = () => {
    window.open('mailto:reception@heartclinicmelbourne.com.au?subject=Patient Referral&body=Dear Heart Clinic Melbourne Team,%0D%0A%0D%0AI would like to refer a patient for cardiac consultation.%0D%0A%0D%0APatient Details:%0D%0AName: %0D%0ADate of Birth: %0D%0AMedicare Number: %0D%0AContact Number: %0D%0A%0D%0AReason for Referral:%0D%0A%0D%0AClinical History:%0D%0A%0D%0ACurrent Medications:%0D%0A%0D%0AUrgency: [ ] Routine [ ] Semi-urgent [ ] Urgent%0D%0A%0D%0APreferred Location: [ ] Malvern [ ] Pakenham [ ] Clyde [ ] Berwick%0D%0A%0D%0AThank you,%0D%0A%0D%0ADr. [Your Name]%0D%0A[Practice Name]%0D%0A[Contact Details]');
  };

  const handleTelehealthClick = () => {
    window.open('https://doxy.me/hcm21', '_blank');
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
        { id: 'services', label: 'Consultations', description: 'Expert cardiac assessments', filter: 'consultation' },
        { id: 'services', label: 'Cardiac Imaging', description: 'Advanced diagnostic imaging', filter: 'imaging' },
        { id: 'services', label: 'Procedures', description: 'Interventional treatments', filter: 'interventional' }
      ]
    },
    { id: 'doctors', label: 'Doctors' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleSubmenuClick = (subItem: any) => {
    scrollToSection('services');
    // Trigger filter change after navigation
    setTimeout(() => {
      if (subItem.filter) {
        const event = new CustomEvent('filterServices', { detail: subItem.filter });
        window.dispatchEvent(event);
      }
    }, 500);
  };

  return (
    <>
      {/* Enhanced Floating Telehealth Button */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="relative">
          <motion.button
            onClick={handleTelehealthClick}
            onMouseEnter={() => setShowTelehealthTooltip(true)}
            onMouseLeave={() => setShowTelehealthTooltip(false)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group relative overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -2, 2, 0],
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 8px 25px rgba(16, 185, 129, 0.3)",
                "0 12px 30px rgba(16, 185, 129, 0.4)",
                "0 8px 25px rgba(16, 185, 129, 0.3)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              hover: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
          >
            {/* Animated background pulse */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex items-center space-x-2">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  rotate: [0, 10, -10, 0],
                  scale: 1.2,
                  transition: { duration: 0.5, repeat: Infinity }
                }}
              >
                <Video className="w-5 h-5" />
              </motion.div>
              <motion.span 
                className="font-semibold"
                whileHover={{
                  x: [0, 2, -2, 0],
                  transition: { duration: 0.3, repeat: Infinity }
                }}
              >
                Join Telehealth
              </motion.span>
            </div>

            {/* Enhanced shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-0"
              whileHover={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.1, 1],
                transition: { duration: 0.6, repeat: Infinity }
              }}
            />
          </motion.button>

          {/* Enhanced Tooltip - Now positioned below */}
          <AnimatePresence>
            {showTelehealthTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="absolute top-full right-0 mt-3 w-72 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-4 z-60"
              >
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span>Telehealth Consultation</span>
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Please ensure your device has permission to use microphone and camera for the best consultation experience.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Mic className="w-3 h-3" />
                      <span>Microphone</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Camera className="w-3 h-3" />
                      <span>Camera</span>
                    </div>
                  </div>
                </div>
                {/* Arrow pointing up */}
                <div className="absolute bottom-full right-6 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white/95"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-4">
        <motion.header 
          className={`mx-auto max-w-7xl transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-xl shadow-lg border border-secondary-200/50 rounded-2xl' 
              : 'bg-white/80 backdrop-blur-sm border border-secondary-100/30 rounded-2xl'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-18">
              {/* Logo with Simple Heart */}
              <motion.div 
                className="flex items-center space-x-3 group cursor-pointer" 
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <motion.div 
                    className="bg-gradient-to-br from-primary-400 to-primary-500 p-2.5 rounded-xl shadow-sm overflow-hidden"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 8px 25px rgba(100, 116, 139, 0.25)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.img
                      src="/images/hcm3d2.png"
                      alt="Heart Clinic Melbourne Logo"
                      className="w-8 h-8"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.5, repeat: Infinity }
                      }}
                    />
                  </motion.div>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-secondary-800">
                    Heart Clinic
                  </h1>
                  <p className="text-xs text-secondary-500 hidden sm:block">Melbourne</p>
                </div>
              </motion.div>

              {/* Search Bar - Desktop */}
              <div className="hidden lg:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search services, doctors, or information..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-secondary-50/80 border border-secondary-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <motion.button
                      onClick={() => item.hasSubmenu ? setShowMegaMenu(!showMegaMenu) : scrollToSection(item.id)}
                      onMouseEnter={() => item.hasSubmenu && setShowMegaMenu(true)}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                        activeSection === item.id && location.pathname === '/'
                          ? 'text-primary-600 bg-primary-50/80'
                          : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.label}</span>
                      {item.hasSubmenu && (
                        <motion.div
                          animate={{ rotate: showMegaMenu ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {item.hasSubmenu && showMegaMenu && (
                        <motion.div 
                          className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-secondary-200/50 p-4 z-50"
                          onMouseLeave={() => setShowMegaMenu(false)}
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="space-y-2">
                            {item.submenu?.map((subItem, idx) => (
                              <motion.button
                                key={idx}
                                onClick={() => handleSubmenuClick(subItem)}
                                className="w-full text-left p-3 rounded-lg hover:bg-primary-50/80 transition-all duration-200 group"
                                whileHover={{ x: 4 }}
                              >
                                <div className="font-medium text-secondary-800 group-hover:text-primary-600 transition-colors text-sm">
                                  {subItem.label}
                                </div>
                                <div className="text-xs text-secondary-500 mt-1">
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

                {/* Learning Library Link */}
                <motion.button
                  onClick={() => navigate('/learning-library')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/learning-library'
                      ? 'text-primary-600 bg-primary-50/80'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Learning Library</span>
                </motion.button>
              </nav>
              
              {/* Action Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <motion.button
                  onClick={handleReferralClick}
                  className="flex items-center space-x-2 text-accent-600 hover:text-accent-700 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-4 h-4" />
                  <span>Send Referral</span>
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(100, 116, 139, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Consultation
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 rounded-xl hover:bg-secondary-100/80 transition-all duration-200"
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
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5 text-secondary-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5 text-secondary-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden overflow-hidden border-t border-secondary-200/50 mt-4"
                >
                  <nav className="py-4 space-y-1">
                    {/* Mobile Search */}
                    <div className="px-4 pb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-secondary-50/80 border border-secondary-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeSection === item.id && location.pathname === '/'
                            ? 'bg-primary-50/80 text-primary-600'
                            : 'text-secondary-600 hover:bg-primary-50/50 hover:text-primary-600'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}

                    {/* Mobile Learning Library Link */}
                    <motion.button
                      onClick={() => {
                        navigate('/learning-library');
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        location.pathname === '/learning-library'
                          ? 'bg-primary-50/80 text-primary-600'
                          : 'text-secondary-600 hover:bg-primary-50/50 hover:text-primary-600'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Learning Library</span>
                    </motion.button>
                    
                    {/* Mobile Action Buttons */}
                    <div className="pt-4 space-y-2 border-t border-secondary-200/50">
                      <motion.button
                        onClick={handleTelehealthClick}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 rounded-lg font-semibold shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Telehealth Call</span>
                      </motion.button>

                      <motion.button
                        onClick={handleReferralClick}
                        className="w-full flex items-center justify-center space-x-2 text-accent-600 hover:text-accent-700 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FileText className="w-4 h-4" />
                        <span>Send Referral</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => scrollToSection('contact')}
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Consultation
                      </motion.button>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default Header;