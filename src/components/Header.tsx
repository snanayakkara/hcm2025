import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Search, BookOpen, Video } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMobileDetection } from '../hooks/useMobileDetection';
import ReferralForm from './ReferralForm';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchPopover, setShowSearchPopover] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [isReferralFormOpen, setIsReferralFormOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobileDetection();

  // Search data - all searchable content
  const searchData = [
    // Services - All services from Services.tsx
    { type: 'service', title: 'Consultation', description: 'Comprehensive cardiac assessment and specialist consultation', section: 'services', keywords: ['doctor', 'appointment', 'consultation', 'assessment', 'cardiac', 'specialist'] },
    { type: 'service', title: 'Echocardiography', description: 'Resting and stress echocardiography for detailed cardiac imaging', section: 'services', keywords: ['echo', 'ultrasound', 'imaging', 'heart scan', 'cardiac imaging'] },
    { type: 'service', title: 'Stress Echocardiography', description: 'Exercise or pharmacological stress testing with echocardiography', section: 'services', keywords: ['stress echo', 'exercise test', 'treadmill', 'cardiac stress', 'stress testing'] },
    { type: 'service', title: '24 Hour Holter Monitoring', description: 'Continuous cardiac rhythm monitoring over 24 hours', section: 'services', keywords: ['holter', 'monitor', 'rhythm', 'arrhythmia', '24 hour', 'heart monitor'] },
    { type: 'service', title: 'Coronary Angiography', description: 'Advanced imaging of coronary arteries to detect blockages', section: 'services', keywords: ['angiogram', 'catheter', 'coronary', 'arteries', 'stent', 'angioplasty', 'intervention'] },
    { type: 'service', title: 'Transoesophageal Echocardiography (TOE)', description: 'Advanced cardiac imaging via esophageal probe for detailed assessment', section: 'services', keywords: ['toe', 'transoesophageal', 'echo', 'advanced imaging', 'valve assessment'] },
    { type: 'service', title: 'TOE-Guided Cardioversion', description: 'Electrical cardioversion with TOE guidance for atrial fibrillation', section: 'services', keywords: ['cardioversion', 'dcr', 'atrial fibrillation', 'rhythm', 'toe guided'] },
    { type: 'service', title: 'Atrial Fibrillation Ablation', description: 'Advanced catheter ablation including Pulsed Field Ablation (PFA)', section: 'services', keywords: ['ablation', 'af ablation', 'atrial fibrillation', 'pfa', 'pulsed field', 'electrophysiology'] },
    { type: 'service', title: 'TAVI', description: 'Transcatheter Aortic Valve Implantation - minimally invasive valve replacement', section: 'services', keywords: ['tavi', 'transcatheter', 'aortic valve', 'valve replacement', 'minimally invasive'] },
    { type: 'service', title: 'Mitral TEER', description: 'Mitral Transcatheter Edge-to-Edge Repair using MitraClip technology', section: 'services', keywords: ['mteer', 'mitraclip', 'mitral valve', 'valve repair', 'transcatheter'] },
    { type: 'service', title: 'Pacemaker Insertion', description: 'Permanent pacemaker implantation for heart rhythm disorders', section: 'services', keywords: ['pacemaker', 'device', 'implant', 'bradycardia', 'heart rhythm'] },
    
    // Doctors
    { type: 'doctor', title: 'Dr Mark Freilich', description: 'Interventional Cardiologist', section: 'doctors', keywords: ['freilich', 'interventional', 'cardiologist', 'angioplasty'] },
    { type: 'doctor', title: 'Dr Phillip Ngu', description: 'Non-Invasive Imaging Cardiologist', section: 'doctors', keywords: ['ngu', 'general', 'cardiologist', 'heart failure'] },
    { type: 'doctor', title: 'A/Prof Alex Voskoboinik', description: 'Electrophysiologist', section: 'doctors', keywords: ['voskoboinik', 'electrophysiology', 'arrhythmia', 'ablation'] },
    { type: 'doctor', title: 'Dr Shane Nanayakkara', description: 'Interventional, Structural and Heart Failure Cardiologist', section: 'doctors', keywords: ['nanayakkara', 'heart failure', 'cardiomyopathy'] },
    
    // Locations
    { type: 'location', title: 'Cabrini Hospital, Malvern', description: 'Main clinic location', section: 'contact', keywords: ['malvern', 'cabrini', 'location', 'address', 'clinic'] },
    { type: 'location', title: 'Heart Clinic Pakenham', description: 'Southeastern location', section: 'contact', keywords: ['pakenham', 'location', 'address', 'clinic'] },
    { type: 'location', title: 'Casey Medical Centre, Clyde', description: 'Southeastern location', section: 'contact', keywords: ['clyde', 'casey', 'location', 'address', 'clinic'] },
    
    // General pages
    { type: 'page', title: 'About Us', description: 'Learn about Heart Clinic Melbourne', section: 'about', keywords: ['about', 'history', 'team', 'mission'] },
    { type: 'page', title: 'Book Appointment', description: 'Schedule your consultation', section: 'contact', keywords: ['book', 'appointment', 'schedule', 'consultation'] },
    { type: 'page', title: 'Patient Information', description: 'Important information for patients', section: 'patients', keywords: ['patient', 'information', 'preparation', 'what to bring'] },
    { type: 'page', title: 'Emergency Contact', description: 'Emergency cardiac care information', section: 'patients', keywords: ['emergency', 'urgent', 'after hours', 'contact'] },
    { type: 'page', title: 'Telehealth', description: 'Virtual consultations', section: 'services', keywords: ['telehealth', 'video', 'online', 'virtual', 'remote'] },
    { type: 'page', title: 'Referrals', description: 'Information for referring doctors', section: 'contact', keywords: ['referral', 'referring', 'doctor', 'GP'] },
    { type: 'page', title: 'FAQ', description: 'Frequently asked questions', section: 'faq', keywords: ['faq', 'questions', 'answers', 'help', 'frequently asked'] }
  ];

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const results = searchData.filter(item => {
      const searchableText = [
        item.title.toLowerCase(),
        item.description.toLowerCase(),
        ...item.keywords
      ].join(' ');

      return searchTerms.some(term => 
        searchableText.includes(term) && term.length > 1
      );
    });

    // Sort by relevance (exact title matches first, then description matches)
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      return bTitle - aTitle;
    });

    setSearchResults(results.slice(0, 6)); // Limit to 6 results
    setShowSearchResults(true);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
    setSelectedResultIndex(-1); // Reset selection when query changes
  };

  // Handle keyboard navigation in search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResultIndex(prev => 
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResultIndex(prev => 
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedResultIndex >= 0 && searchResults[selectedResultIndex]) {
        handleSearchResultClick(searchResults[selectedResultIndex]);
        handleSearchPopoverClose();
      }
    } else if (e.key === 'Escape') {
      handleSearchPopoverClose();
    }
  };

  // Handle search result click
  const handleSearchResultClick = (result: any) => {
    scrollToSection(result.section);
    setSearchQuery('');
    setShowSearchResults(false);
    setIsMenuOpen(false);
  };

  // Handle search input focus/blur
  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  // Handle search icon click for popover
  const handleSearchIconClick = () => {
    setShowSearchPopover(true);
  };

  const handleSearchPopoverClose = () => {
    setShowSearchPopover(false);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Get icon for search result type
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'doctor': return '👨‍⚕️';
      case 'service': return '🏥';
      case 'location': return '📍';
      case 'page': return '📄';
      default: return '🔍';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Track if user has scrolled at all
      if (currentScrollY > 0 && !hasScrolled) {
        console.log('User has scrolled - enabling logo pulse animation');
        setHasScrolled(true);
      }
      
      // Update active section based on scroll position (only on homepage)
      if (location.pathname === '/') {
        const sections = ['home', 'about', 'services', 'doctors', 'team', 'reception-team', 'patients', 'education', 'contact'];
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
  }, [location.pathname, hasScrolled]);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const handleReferralClick = () => {
    setIsReferralFormOpen(true);
  };


  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'team', label: 'Our Team' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <>

      <div className="fixed top-0 left-0 right-0 z-40 pt-4">
        <div className="mx-auto max-w-7xl relative px-4">
          {/* Floating Logo Image - Positioned relative to header */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 flex items-center z-50"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          >
            <motion.div 
              className="cursor-pointer" 
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="/images/hcm3d2.png"
                alt="Heart Clinic Melbourne Logo"
                className="w-32 h-32 object-contain"
                animate={hasScrolled ? {
                  scale: [1, 1.3, 1],
                } : {
                  scale: 1
                }}
                transition={hasScrolled ? {
                  duration: 1.2, // 50 pulses per minute = 1.2 seconds per pulse
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
                  filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))"
                }}
              />
            </motion.div>
          </motion.div>

          <motion.header 
            className={`transition-all duration-500 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-xl shadow-lg border border-secondary-200/50 rounded-2xl' 
                : 'bg-white/80 backdrop-blur-sm border border-secondary-100/30 rounded-2xl'
            }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
          <div className="px-6 lg:px-8">
            <div className="flex items-center h-16 lg:h-18">
              {/* Text logo - positioned normally in header */}
              <motion.div 
                className="flex items-center cursor-pointer flex-shrink-0" 
                onClick={() => scrollToSection('home')}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="ml-28"> {/* Further increased margin for better spacing */}
                  <h1 className="text-base font-semibold bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
                    Heart Clinic Melbourne
                  </h1>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center justify-center space-x-3 flex-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-1 px-2 py-2 rounded-xl text-xs font-medium transition-all duration-200 relative whitespace-nowrap ${
                      activeSection === item.id && location.pathname === '/'
                        ? 'text-primary-600 bg-primary-50/80'
                        : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{item.label}</span>
                  </motion.button>
                ))}

                {/* Search Icon Button - Now positioned in navigation */}
                <motion.button
                  onClick={handleSearchIconClick}
                  className="flex items-center space-x-1 px-2 py-2 rounded-xl text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-3 h-3" />
                  <span className="text-xs font-medium">Search</span>
                </motion.button>

                {/* Library Link */}
                <motion.button
                  onClick={() => navigate('/learning-library')}
                  className={`flex items-center space-x-1 px-2 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    location.pathname === '/learning-library'
                      ? 'text-primary-600 bg-primary-50/80'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Library</span>
                </motion.button>
              </nav>

              {/* Search Popover - Triggered by search icon click */}
              <AnimatePresence>
                {showSearchPopover && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
                    onClick={handleSearchPopoverClose}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-secondary-200/50 p-6 w-full max-w-2xl mx-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search for services, doctors, locations, or information..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          onKeyDown={handleSearchKeyDown}
                          onFocus={() => {
                            if (searchQuery.trim()) {
                              setShowSearchResults(true);
                            }
                          }}
                          autoFocus
                          className="w-full pl-12 pr-12 py-4 bg-secondary-50/80 border border-secondary-200 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        />
                        <button
                          onClick={handleSearchPopoverClose}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Popover Search Results */}
                      <AnimatePresence>
                        {searchQuery && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {searchResults.length > 0 ? (
                              <div className="space-y-2 max-h-80 overflow-y-auto">
                                {searchResults.map((result, index) => (
                                  <motion.button
                                    key={index}
                                    onClick={() => {
                                      handleSearchResultClick(result);
                                      handleSearchPopoverClose();
                                    }}
                                    className={`w-full text-left p-4 transition-all duration-200 flex items-start space-x-3 group rounded-xl ${
                                      index === selectedResultIndex
                                        ? 'bg-primary-100/80 border border-primary-200'
                                        : 'hover:bg-primary-50/80'
                                    }`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                    onMouseEnter={() => setSelectedResultIndex(index)}
                                  >
                                    <span className="text-xl mt-0.5 flex-shrink-0">
                                      {getResultIcon(result.type)}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-secondary-800 group-hover:text-primary-600 transition-colors text-base">
                                        {result.title}
                                      </div>
                                      <div className="text-sm text-secondary-500 mt-1">
                                        {result.description}
                                      </div>
                                      <div className="text-sm text-primary-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Go to {result.type} →
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-secondary-500">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-base">No results found for "{searchQuery}"</p>
                                <p className="text-sm mt-2">Try searching for services, doctors, or locations</p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!searchQuery && (
                        <div className="text-center py-8 text-secondary-500">
                          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-base mb-2">Search our services and information</p>
                          <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {['Consultations', 'Echocardiography', 'Doctors', 'Locations'].map((term) => (
                              <button
                                key={term}
                                onClick={() => {
                                  setSearchQuery(term);
                                  performSearch(term);
                                  setSelectedResultIndex(-1);
                                }}
                                className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm hover:bg-primary-100 transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Action Buttons */}
              <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
                <motion.button
                  onClick={handleReferralClick}
                  className="flex items-center space-x-1 text-accent-600 hover:text-accent-700 px-2 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-3 h-3" />
                  <span>Referral</span>
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('patients')}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-2 rounded-xl text-xs font-medium shadow-sm whitespace-nowrap"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(100, 116, 139, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book
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
                    {/* Enhanced Mobile Search */}
                    <div className="px-4 pb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          onFocus={handleSearchFocus}
                          onBlur={handleSearchBlur}
                          className="w-full pl-10 pr-4 py-2 bg-secondary-50/80 border border-secondary-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        
                        {/* Mobile Search Results */}
                        <AnimatePresence>
                          {showSearchResults && searchResults.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-secondary-200/50 py-2 z-50 max-h-60 overflow-y-auto"
                            >
                              {searchResults.map((result, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSearchResultClick(result)}
                                  className="w-full text-left px-3 py-2 hover:bg-primary-50/80 transition-all duration-200 flex items-center space-x-2"
                                >
                                  <span className="text-sm">{getResultIcon(result.type)}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-secondary-800 text-sm truncate">
                                      {result.title}
                                    </div>
                                    <div className="text-xs text-secondary-500 truncate">
                                      {result.description}
                                    </div>
                                  </div>
                                </button>
                              ))}
                              
                              {searchQuery && searchResults.length === 0 && (
                                <div className="px-3 py-4 text-center text-secondary-500">
                                  <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm">No results found</p>
                                  <p className="text-xs mt-1">Try different keywords</p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
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

                    {/* Mobile Library Link */}
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
                      <span>Library</span>
                    </motion.button>
                    
                    {/* Mobile Action Buttons */}
                    <div className="pt-4 space-y-2 border-t border-secondary-200/50">

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
                        onClick={() => scrollToSection('patients')}
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
      </div>

      {/* Floating Telehealth Button - Desktop Only */}
      {!isMobile && (
        <div className="fixed top-6 right-6 z-50">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 300 }}
          >
            {/* Tooltip */}
            <div className="absolute top-full left-0 mt-2 -ml-32 bg-white text-gray-800 text-sm px-4 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20 shadow-xl border border-gray-100">
              <div className="text-teal-600 font-semibold text-xs mb-1">Camera & Microphone</div>
              <div className="text-gray-600 text-xs">Allow permissions when prompted</div>
              <div className="absolute -top-2 left-8 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
            </div>

          <motion.button
            onClick={() => {
              window.open('https://doxy.me/hcm21', '_blank');
            }}
            className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Curved Text */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 80 80"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <path
                  id="circle-path"
                  d="M 40 40 m -30 0 a 30 30 0 1 1 60 0 a 30 30 0 1 1 -60 0"
                />
              </defs>
              <text className="fill-white text-[7px] font-semibold">
                <textPath href="#circle-path" startOffset="0%">
                  JOIN TELEHEALTH • JOIN TELEHEALTH • 
                </textPath>
              </text>
            </svg>

            {/* Center Video Icon */}
            <motion.div
              className="relative z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Video className="w-7 h-7" />
            </motion.div>

            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-2 border-2 border-white/30 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
          </motion.div>
        </div>
      )}

      {/* Referral Form Modal */}
      <ReferralForm
        isOpen={isReferralFormOpen}
        onClose={() => setIsReferralFormOpen(false)}
      />
    </>
  );
};

export default Header;