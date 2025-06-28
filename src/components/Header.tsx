import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, FileText } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
    }
  };

  const handleReferralClick = () => {
    // This could open a modal, navigate to a form, or open an email
    window.open('mailto:referrals@heartclinicmelbourne.com.au?subject=Patient Referral&body=Dear Heart Clinic Melbourne Team,%0D%0A%0D%0AI would like to refer a patient for cardiac consultation.%0D%0A%0D%0APatient Details:%0D%0AName: %0D%0ADate of Birth: %0D%0AMedicare Number: %0D%0AContact Number: %0D%0A%0D%0AReason for Referral:%0D%0A%0D%0AClinical History:%0D%0A%0D%0ACurrent Medications:%0D%0A%0D%0AUrgency: [ ] Routine [ ] Semi-urgent [ ] Urgent%0D%0A%0D%0APreferred Location: [ ] Malvern [ ] Pakenham [ ] Clyde [ ] Berwick%0D%0A%0D%0AThank you,%0D%0A%0D%0ADr. [Your Name]%0D%0A[Practice Name]%0D%0A[Contact Details]');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'reception-team', label: 'Our Team' },
    { id: 'patients', label: 'Patients' },
    { id: 'education', label: 'Learning Library' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Heart Clinic
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">Melbourne</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-200 relative ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
            
            {/* GP Referral Button */}
            <button
              onClick={handleReferralClick}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
            >
              <FileText className="w-4 h-4" />
              <span>Send Referral</span>
            </button>
            
            {/* Book Appointment Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
            >
              Book Appointment
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="w-6 h-6 text-blue-600" /> : 
              <Menu className="w-6 h-6 text-blue-600" />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-gray-200 rounded-b-2xl shadow-lg">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile GP Referral Button */}
              <button
                onClick={handleReferralClick}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 mt-4 font-semibold"
              >
                <FileText className="w-4 h-4" />
                <span>Send Referral</span>
              </button>
              
              {/* Mobile Book Appointment Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
              >
                Book Appointment
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;