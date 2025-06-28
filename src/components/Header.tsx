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
      setIsScrolled(window.scrollY > 20);
      
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
        { id: 'services', label: 'Consultations', description: 'Expert cardiac assessments', filter: 'consultation' },
        { id: 'services', label: 'Cardiac Imaging', description: 'Advanced diagnostic imaging', filter: 'imaging' },
        { id: 'services', label: 'Procedures', description: 'Interventional treatments', filter: 'interventional' }
      ]
    },
    { id: 'doctors', label: 'Doctors' },
    { id: 'reception-team', label: 'Our Team' },
    { id: 'patients', label: 'Patients' },
    { id: 'education', label: 'Resources' },
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
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.header 
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200/50 rounded-2xl' 
            : 'bg-white/60 backdrop-blur-sm border border-slate-100/30 rounded-2xl'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer" 
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <motion.div 
                  className="bg-gradient-to-br from-rose-400 to-pink-500 p-2.5 rounded-xl shadow-sm"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 8px 25px rgba(244, 63, 94, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-800">
                  Heart Clinic
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">Melbourne</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <motion.button
                    onClick={() => item.hasSubmenu ? setShowMegaMenu(!showMegaMenu) : scrollToSection(item.id)}
                    onMouseEnter={() => item.hasSubmenu && setShowMegaMenu(true)}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                      activeSection === item.id
                        ? 'text-rose-600 bg-rose-50/80'
                        : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
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
                        className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/50 p-4 z-50"
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
                              className="w-full text-left p-3 rounded-lg hover:bg-rose-50/80 transition-all duration-200 group"
                              whileHover={{ x: 4 }}
                            >
                              <div className="font-medium text-slate-800 group-hover:text-rose-600 transition-colors text-sm">
                                {subItem.label}
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
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
            </nav>
            
            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.button
                onClick={handleReferralClick}
                className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-4 h-4" />
                <span>Send Referral</span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(244, 63, 94, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Book Consultation
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100/80 transition-all duration-200"
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
                    <X className="w-5 h-5 text-slate-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5 text-slate-600" />
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
                className="lg:hidden overflow-hidden border-t border-slate-200/50 mt-4"
              >
                <nav className="py-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-rose-50/80 text-rose-600'
                          : 'text-slate-600 hover:bg-rose-50/50 hover:text-rose-600'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  
                  {/* Mobile Action Buttons */}
                  <div className="pt-4 space-y-2 border-t border-slate-200/50">
                    <motion.button
                      onClick={handleReferralClick}
                      className="w-full flex items-center justify-center space-x-2 text-pink-600 hover:text-pink-700 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
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
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-sm"
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
  );
};

export default Header;