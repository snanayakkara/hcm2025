import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MobileHeader from './MobileHeader';
import BottomNavigation from './BottomNavigation';
import SwipeDeck from './SwipeDeck';
import AddToCalendar from './AddToCalendar';
import PWAInstallBanner from './PWAInstallBanner';
import PullToRefresh from './PullToRefresh';
import QuickActionsCard from './QuickActionsCard';
import MobileServiceCards from './MobileServiceCards';
import MobileDoctorCarousel from './MobileDoctorCarousel';
import LocationOverlay from './LocationOverlay';
import CallModal from './CallModal';
import MinimalistHero from '../MinimalistHero';
import About from '../About';
import Services from '../Services';
import Doctors from '../Doctors';
import ReceptionTeam from '../ReceptionTeam';
import PatientInfo from '../PatientInfo';
import Contact from '../Contact';
import useParallaxHero from '../../hooks/useParallaxHero';

interface MobileLayoutProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ currentPage, onPageChange }) => {
  const [showLocationOverlay, setShowLocationOverlay] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [calendarEvent, setCalendarEvent] = useState<any>(null);

  // Parallax hero effect
  const parallax = useParallaxHero({
    maxTranslate: 10,
    enableOnMobile: true,
    enableOnDesktop: false
  });

  useEffect(() => {
    // Track scroll position for active section
    const handleScroll = () => {
      const scrollY = window.scrollY;
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

  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const handleBookingConfirm = (appointmentDetails: any) => {
    // Create calendar event
    const event = {
      title: `Heart Clinic Melbourne - ${appointmentDetails.type || 'Consultation'}`,
      description: `Appointment with ${appointmentDetails.doctor || 'Heart Clinic Melbourne'}`,
      startDate: new Date(appointmentDetails.date),
      endDate: new Date(new Date(appointmentDetails.date).getTime() + (30 * 60 * 1000)), // 30 min default
      location: 'Cabrini Hospital, 183 Wattletree Rd, Malvern VIC 3144',
      organizer: {
        name: 'Heart Clinic Melbourne',
        email: 'admin@heartclinicmelbourne.com.au'
      }
    };
    
    setCalendarEvent(event);
    setShowCalendarModal(true);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="pb-24">
            {/* Mobile-optimized hero with parallax */}
            <section id="home" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
              {/* No separate background - uses the unified light background */}
              
              {/* Parallax Heart Logo */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
                style={parallax.styles}
              >
                <div className="w-32 h-32 text-teal-600/20 text-8xl flex items-center justify-center">
                  ❤️
                </div>
              </motion.div>
              
              <div className="relative z-10 text-center px-4 pb-10 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <motion.h1 
                    className="mobile-text-2xl font-bold text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    Expert Cardiac Care in Melbourne
                  </motion.h1>
                  <motion.p 
                    className="mobile-text-lg text-gray-700 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Leading cardiology practice with telehealth, interventional procedures, and comprehensive heart care
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className=""
                  >
                    <QuickActionsCard 
                      onCallClick={handleCallClick}
                      onTelehealthClick={handleTelehealthClick}
                      onDirectionsClick={handleDirectionsClick}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Mobile-optimized sections with enhanced spacing */}
            <section id="about" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <About />
              </motion.div>
            </section>

            <section id="services" className="pt-8 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <MobileServiceCards />
              </motion.div>
            </section>

            <section id="doctors" className="pt-8 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <MobileDoctorCarousel />
              </motion.div>
            </section>

            <section id="reception-team" className="pt-8 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ReceptionTeam />
              </motion.div>
            </section>

            <section id="patients" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <PatientInfo />
              </motion.div>
            </section>

            <section id="contact" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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
            <Contact />
          </div>
        );
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen relative overflow-x-hidden ios-vh-fix safe-area-inset-top safe-area-inset-bottom">
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
        {/* New Mobile Header */}
        <MobileHeader 
          onNavigate={handleNavigate}
          currentSection={activeSection}
        />
        
        <main className="pt-16 safe-area-inset-left safe-area-inset-right">
          {renderPageContent()}
        </main>

        {/* Updated Bottom Navigation */}
        <BottomNavigation
          currentPage={currentPage}
          onPageChange={onPageChange}
          activeSection={activeSection}
          onTelehealthClick={handleTelehealthClick}
        />

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
      </div>
    </PullToRefresh>
  );
};

export default MobileLayout;