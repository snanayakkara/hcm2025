import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import MobileHeader from './MobileHeader';
import AddToCalendar from './AddToCalendar';
import PWAInstallBanner from './PWAInstallBanner';
import QuickActionsCard from './QuickActionsCard';
import LocationOverlay from './LocationOverlay';
import CallModal from './CallModal';
import MobileReferralForm from './MobileReferralForm';
import { MOBILE_VIEWPORT } from '../../lib/motion';

const MobileServiceCardsSection = lazy(() => import('./MobileServiceCards'));
const MobileDoctorCarouselSection = lazy(() => import('./MobileDoctorCarousel'));
const MinimalistHeroSection = lazy(() => import('../MinimalistHero'));
const AboutSection = lazy(() => import('../About'));
const ServicesSection = lazy(() => import('../Services'));
const DoctorsSection = lazy(() => import('../Doctors'));
const ReceptionTeamSection = lazy(() => import('../ReceptionTeam'));
const PatientInfoSection = lazy(() => import('../PatientInfo'));
const FAQSection = lazy(() => import('../FAQ'));
const ContactSection = lazy(() => import('../Contact'));

interface MobileLayoutProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

interface CalendarEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees?: string[];
  organizer?: {
    name: string;
    email: string;
  };
}

interface DeferredSectionProps {
  id: string;
  className?: string;
  placeholderMinHeight?: number;
  children: React.ReactNode;
}

const DeferredSection: React.FC<DeferredSectionProps> = ({
  id,
  className,
  placeholderMinHeight = 260,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isMounted) return;

    if (!('IntersectionObserver' in window)) {
      setIsMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMounted]);

  return (
    <section id={id} ref={sectionRef} className={className}>
      {isMounted ? (
        children
      ) : (
        <div style={{ minHeight: placeholderMinHeight }} aria-hidden="true" />
      )}
    </section>
  );
};

const MobileLayout: React.FC<MobileLayoutProps> = ({ currentPage }) => {
  const [showLocationOverlay, setShowLocationOverlay] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showMobileReferralForm, setShowMobileReferralForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [calendarEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'doctors', 'reception-team', 'patients', 'contact'];

      const currentSection = sections.find((section) => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const smoothScrollToElement = (element: HTMLElement) => {
    if (typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      smoothScrollToElement(element);
    }
  };

  const renderPageContent = () => {
    const revealMotionProps = {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: MOBILE_VIEWPORT,
      transition: { duration: 0.55 },
    };

    switch (currentPage) {
      case 'home':
        return (
          <div className="pb-8">
            <section id="home" className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-white to-primary-50/20">
              <div className="absolute inset-0 pointer-events-none">
                <div className="opacity-60">
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400/70 rounded-full shadow-sm"
                    animate={{
                      y: [0, -15, 0],
                      x: [0, 8, 0],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent-400/60 rounded-full shadow-sm"
                    animate={{
                      y: [0, 12, 0],
                      x: [0, -6, 0],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-sage-400/50 rounded-full shadow-sm"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2,
                    }}
                  />
                </div>

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
                      ease: 'easeInOut',
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
                      ease: 'easeInOut',
                      delay: 4,
                    }}
                  />
                </div>
              </div>

              <div className="relative z-10 text-center px-4 pb-8">
                <motion.div className="space-y-6 max-w-md mx-auto">
                  <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <motion.img
                      src="/images/hcm3d2.webp"
                      alt="Heart Clinic Melbourne Logo"
                      className="w-16 h-16 object-contain animate-heartbeat"
                      style={{
                        filter: 'hue-rotate(160deg) saturate(1.2) brightness(1.1)',
                      }}
                    />
                  </motion.div>

                  <motion.h1
                    className="mobile-text-2xl font-bold text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                  >
                    Welcome to Heart Clinic Melbourne
                  </motion.h1>

                  <motion.p
                    className="mobile-text-lg text-gray-600 font-medium"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.45 }}
                  >
                    Expert Cardiac Care in Melbourne
                  </motion.p>
                </motion.div>
              </div>

              <motion.div
                className="mobile-scroll-indicator"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.45 }}
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    smoothScrollToElement(aboutSection);
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
                    scale: 1.08,
                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, 8, 0],
                    boxShadow: [
                      '0 8px 32px rgba(0, 0, 0, 0.15)',
                      '0 12px 40px rgba(20, 184, 166, 0.2)',
                      '0 8px 32px rgba(0, 0, 0, 0.15)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <section className="py-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.45 }}
              >
                <QuickActionsCard
                  onCallClick={handleCallClick}
                  onTelehealthClick={handleTelehealthClick}
                  onDirectionsClick={handleDirectionsClick}
                  onQuickReferralClick={handleQuickReferralClick}
                />
              </motion.div>
            </section>

            <DeferredSection id="about" className="py-8" placeholderMinHeight={380}>
              <Suspense fallback={<div className="h-24" />}>
                <motion.div {...revealMotionProps}>
                  <AboutSection />
                </motion.div>
              </Suspense>
            </DeferredSection>

            <DeferredSection id="services" className="pt-8 pb-16" placeholderMinHeight={520}>
              <Suspense fallback={<div className="h-24" />}>
                <motion.div {...revealMotionProps}>
                  <MobileServiceCardsSection />
                </motion.div>
              </Suspense>
            </DeferredSection>

            <DeferredSection id="doctors" className="pt-8 pb-16" placeholderMinHeight={520}>
              <Suspense fallback={<div className="h-24" />}>
                <motion.div {...revealMotionProps}>
                  <MobileDoctorCarouselSection />
                </motion.div>
              </Suspense>
            </DeferredSection>

            <DeferredSection id="reception-team" className="pt-8 pb-16" placeholderMinHeight={440}>
              <Suspense fallback={<div className="h-24" />}>
                <motion.div {...revealMotionProps}>
                  <ReceptionTeamSection />
                </motion.div>
              </Suspense>
            </DeferredSection>

            <DeferredSection id="patients" className="py-8" placeholderMinHeight={440}>
              <Suspense fallback={<div className="h-24" />}>
                <motion.div {...revealMotionProps}>
                  <PatientInfoSection />
                </motion.div>
              </Suspense>
            </DeferredSection>

            <DeferredSection id="faq" className="py-8" placeholderMinHeight={360}>
              <Suspense fallback={<div className="h-24" />}>
                <motion.div {...revealMotionProps}>
                  <FAQSection />
                </motion.div>
              </Suspense>
            </DeferredSection>

            <DeferredSection id="contact" className="py-8" placeholderMinHeight={420}>
              <Suspense fallback={<div className="h-24" />}>
                <motion.div {...revealMotionProps}>
                  <ContactSection />
                </motion.div>
              </Suspense>
            </DeferredSection>
          </div>
        );
      case 'services':
        return (
          <div className="pb-24">
            <Suspense fallback={<div className="h-32" />}>
              <ServicesSection />
            </Suspense>
          </div>
        );
      case 'doctors':
        return (
          <div className="pb-24">
            <Suspense fallback={<div className="h-32" />}>
              <DoctorsSection />
            </Suspense>
          </div>
        );
      case 'faq':
        return (
          <div className="pb-24">
            <Suspense fallback={<div className="h-32" />}>
              <FAQSection />
            </Suspense>
          </div>
        );
      case 'contact':
        return (
          <div className="pb-24">
            <Suspense fallback={<div className="h-32" />}>
              <ContactSection />
            </Suspense>
          </div>
        );
      default:
        return (
          <div className="pb-24">
            <Suspense fallback={<div className="h-32" />}>
              <MinimalistHeroSection />
              <AboutSection />
              <ServicesSection />
              <DoctorsSection />
              <ReceptionTeamSection />
              <PatientInfoSection />
              <FAQSection />
              <ContactSection />
            </Suspense>
          </div>
        );
    }
  };

  return (
    <>
      <MobileHeader
        onNavigate={handleNavigate}
        currentSection={activeSection}
        onTelehealthClick={handleTelehealthClick}
        onCallClick={handleCallClick}
        onDirectionsClick={handleDirectionsClick}
      />

      <div className="min-h-screen relative overflow-x-hidden ios-vh-fix safe-area-inset-bottom">
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f8f6f4] animate-gradient-shift"
            style={{ backgroundSize: '400% 400%' }}
          />

          <div
            className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary-100/30 to-accent-100/20 rounded-full blur-3xl animate-float-slow"
            style={{ animationDelay: '0s', animationDuration: '8s' }}
          />
          <div
            className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-sage-100/25 to-primary-100/15 rounded-full blur-2xl animate-float-slow"
            style={{ animationDelay: '2s', animationDuration: '12s' }}
          />
          <div
            className="absolute bottom-60 left-1/4 w-48 h-48 bg-gradient-to-br from-accent-100/20 to-cream-100/30 rounded-full blur-3xl animate-float-slow"
            style={{ animationDelay: '4s', animationDuration: '10s' }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-cream-100/35 to-sage-100/25 rounded-full blur-xl animate-float-slow"
            style={{ animationDelay: '6s', animationDuration: '14s' }}
          />

          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full animate-gentle-wave"
              style={{
                backgroundImage: `
                       radial-gradient(circle at 20% 80%, rgba(8, 145, 178, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                       radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
                     `,
              }}
            />
          </div>

          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                       linear-gradient(rgba(8, 145, 178, 0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(8, 145, 178, 0.1) 1px, transparent 1px)
                     `,
                backgroundSize: '80px 80px',
              }}
            />
          </div>
        </div>

        <main className="pt-20 safe-area-inset-left safe-area-inset-right">{renderPageContent()}</main>

        <PWAInstallBanner />

        <LocationOverlay isOpen={showLocationOverlay} onClose={() => setShowLocationOverlay(false)} />

        <CallModal isOpen={showCallModal} onClose={() => setShowCallModal(false)} />

        {calendarEvent && (
          <AddToCalendar
            isOpen={showCalendarModal}
            onClose={() => setShowCalendarModal(false)}
            event={calendarEvent}
          />
        )}

        <MobileReferralForm isOpen={showMobileReferralForm} onClose={() => setShowMobileReferralForm(false)} />
      </div>
    </>
  );
};

export default MobileLayout;
