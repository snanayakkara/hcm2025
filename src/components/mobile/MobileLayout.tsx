import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MobileHeader from './MobileHeader';
import AddToCalendar from './AddToCalendar';
import PWAInstallBanner from './PWAInstallBanner';
import QuickActionsCard from './QuickActionsCard';
import MobileServiceCards from './MobileServiceCards';
import MobileDoctorCarousel from './MobileDoctorCarousel';
import LocationOverlay from './LocationOverlay';
import CallModal from './CallModal';
import MobileReferralForm from './MobileReferralForm';
import MinimalistHero from '../MinimalistHero';
import About from '../About';
import Services from '../Services';
import Doctors from '../Doctors';
import ReceptionTeam from '../ReceptionTeam';
import PatientInfo from '../PatientInfo';
import FAQ from '../FAQ';
import Contact from '../Contact';
import { DEFAULT_VIEWPORT, MOBILE_VIEWPORT } from '../../lib/motion';

interface MobileLayoutProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ currentPage }) => {
  const [showLocationOverlay, setShowLocationOverlay] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showMobileReferralForm, setShowMobileReferralForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [calendarEvent] = useState<any>(null);


  useEffect(() => {
    // Track scroll position for active section
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'doctors', 'reception-team', 'patients', 'contact'];
      
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

  const handleTelehealthClick = () => {
    window.open('https://doxy.me/hcm21', '_blank');
  };

  const handleCallClick = () => {
    setShowCallModal(true);
  };

  const handleDirectionsClick = () => {
    setShowLocationOverlay(true);
  };

  const handleQuickReferralClick = () => {
    setShowMobileReferralForm(true);
  };

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="pb-8">
            {/* Mobile-optimised hero with rich desktop-style background */}
            <section id="home" className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-white to-primary-50/20">
              
              {/* Enhanced Mobile Background Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Floating Particles - Mobile Optimized */}
                <div className="opacity-60">
                  <motion.div 
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400/70 rounded-full shadow-sm"
                    animate={{
                      y: [0, -15, 0],
                      x: [0, 8, 0],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent-400/60 rounded-full shadow-sm"
                    animate={{
                      y: [0, 12, 0],
                      x: [0, -6, 0],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-sage-400/50 rounded-full shadow-sm"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </div>

                {/* Soft Bokeh Effects - Mobile Optimized */}
                <div className="opacity-20">
                  <motion.div
                    className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-primary-200/40 to-accent-200/30 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-r from-sage-200/30 to-primary-200/25 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.15, 0.35, 0.15],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 4,
                    }}
                  />
                </div>
              </div>
              
              {/* Clean Mobile Hero Content - Center Aligned */}
              <div className="relative z-10 text-center px-4 pb-8">
                <motion.div className="space-y-6 max-w-md mx-auto">
                  {/* Prominent Pulsing Heart Logo */}
                  <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.img
                      src="/images/hcm3d2.png"
                      alt="Heart Clinic Melbourne Logo"
                      className="w-16 h-16 object-contain animate-heartbeat"
                      style={{
                        filter: 'hue-rotate(160deg) saturate(1.2) brightness(1.1)', // Green teal color
                      }}
                    />
                  </motion.div>
                  
                  {/* Welcome Message - Main Title */}
                  <motion.h1 
                    className="mobile-text-2xl font-bold text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    Welcome to Heart Clinic Melbourne
                  </motion.h1>
                  
                  {/* Subtitle */}
                  <motion.p 
                    className="mobile-text-lg text-gray-600 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Expert Cardiac Care in Melbourne
                  </motion.p>
                </motion.div>
              </div>
              
              {/* Enhanced Scroll Indicator - Cleaner Animation */}
              <motion.div
                className="mobile-scroll-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <motion.div
                  className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer border border-white/40"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    y: [0, 8, 0],
                    boxShadow: [
                      '0 8px 32px rgba(0, 0, 0, 0.15)',
                      '0 12px 40px rgba(20, 184, 166, 0.2)',
                      '0 8px 32px rgba(0, 0, 0, 0.15)'
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg
                      className="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </section>

            {/* Quick Actions Card - Immediately after hero for maximum visibility */}
            <section className="py-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <QuickActionsCard 
                  onCallClick={handleCallClick}
                  onTelehealthClick={handleTelehealthClick}
                  onDirectionsClick={handleDirectionsClick}
                  onQuickReferralClick={handleQuickReferralClick}
                />
              </motion.div>
            </section>

            {/* Mobile-optimised sections with enhanced spacing and better viewport handling */}
            <section id="about" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_VIEWPORT}
                transition={{ duration: 0.6 }}
                // iOS Safari fallback - trigger after timeout if intersection observer fails
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 2, duration: 0.6 } 
                }}
              >
                <About />
              </motion.div>
            </section>

            <section id="services" className="pt-8 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_VIEWPORT}
                transition={{ duration: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 2.5, duration: 0.6 } 
                }}
              >
                <MobileServiceCards />
              </motion.div>
            </section>

            <section id="doctors" className="pt-8 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_VIEWPORT}
                transition={{ duration: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 3, duration: 0.6 } 
                }}
              >
                <MobileDoctorCarousel />
              </motion.div>
            </section>

            <section id="reception-team" className="pt-8 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_VIEWPORT}
                transition={{ duration: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 3.5, duration: 0.6 } 
                }}
              >
                <ReceptionTeam />
              </motion.div>
            </section>

            <section id="patients" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_VIEWPORT}
                transition={{ duration: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 4, duration: 0.6 } 
                }}
              >
                <PatientInfo />
              </motion.div>
            </section>

            <section id="faq" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_VIEWPORT}
                transition={{ duration: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 4.5, duration: 0.6 } 
                }}
              >
                <FAQ />
              </motion.div>
            </section>

            <section id="contact" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_VIEWPORT}
                transition={{ duration: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 5, duration: 0.6 } 
                }}
              >
                <Contact />
              </motion.div>
            </section>
          </div>
        );
      case 'services':
        return (
          <div className="pb-24">
            <Services />
          </div>
        );
      case 'doctors':
        return (
          <div className="pb-24">
            <Doctors />
          </div>
        );
      case 'faq':
        return (
          <div className="pb-24">
            <FAQ />
          </div>
        );
      case 'contact':
        return (
          <div className="pb-24">
            <Contact />
          </div>
        );
      default:
        return (
          <div className="pb-24">
            <MinimalistHero />
            <About />
            <Services />
            <Doctors />
            <ReceptionTeam />
            <PatientInfo />
            <FAQ />
            <Contact />
          </div>
        );
    }
  };

  return (
    <>
      {/* Mobile Header - Fixed position outside main container */}
      <MobileHeader 
        onNavigate={handleNavigate}
        currentSection={activeSection}
        onTelehealthClick={handleTelehealthClick}
        onCallClick={handleCallClick}
        onDirectionsClick={handleDirectionsClick}
      />

      {/* Main content container */}
      <div className="min-h-screen relative overflow-x-hidden ios-vh-fix safe-area-inset-bottom">
          {/* Animated Light Background */}
          <div className="fixed inset-0 -z-10">
            {/* Base light gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f8f6f4] animate-gradient-shift" 
                 style={{ backgroundSize: '400% 400%' }} />
            
            {/* Subtle floating orbs */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary-100/30 to-accent-100/20 rounded-full blur-3xl animate-float-slow" 
                 style={{ animationDelay: '0s', animationDuration: '8s' }} />
            <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-sage-100/25 to-primary-100/15 rounded-full blur-2xl animate-float-slow" 
                 style={{ animationDelay: '2s', animationDuration: '12s' }} />
            <div className="absolute bottom-60 left-1/4 w-48 h-48 bg-gradient-to-br from-accent-100/20 to-cream-100/30 rounded-full blur-3xl animate-float-slow" 
                 style={{ animationDelay: '4s', animationDuration: '10s' }} />
            <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-cream-100/35 to-sage-100/25 rounded-full blur-xl animate-float-slow" 
                 style={{ animationDelay: '6s', animationDuration: '14s' }} />
            
            {/* Gentle wave patterns */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full animate-gentle-wave"
                   style={{
                     backgroundImage: `
                       radial-gradient(circle at 20% 80%, rgba(8, 145, 178, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                       radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
                     `,
                   }} />
            </div>
            
            {/* Ultra-subtle grid for texture */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full"
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(8, 145, 178, 0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(8, 145, 178, 0.1) 1px, transparent 1px)
                     `,
                     backgroundSize: '80px 80px'
                   }} />
            </div>
          </div>
          
          <main className="pt-20 safe-area-inset-left safe-area-inset-right">
            {renderPageContent()}
          </main>


          {/* PWA Install Banner */}
          <PWAInstallBanner />

          {/* Overlays and Modals */}
          <LocationOverlay
            isOpen={showLocationOverlay}
            onClose={() => setShowLocationOverlay(false)}
          />

          <CallModal
            isOpen={showCallModal}
            onClose={() => setShowCallModal(false)}
          />

          {/* Add to Calendar Modal */}
          {calendarEvent && (
            <AddToCalendar
              isOpen={showCalendarModal}
              onClose={() => setShowCalendarModal(false)}
              event={calendarEvent}
            />
          )}

          {/* Mobile Referral Form */}
          <MobileReferralForm
            isOpen={showMobileReferralForm}
            onClose={() => setShowMobileReferralForm(false)}
          />
        </div>
    </>
  );
};

export default MobileLayout;