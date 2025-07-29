import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMobileDetection } from './hooks/useMobileDetection';
import Header from './components/Header';
import MinimalistHero from './components/MinimalistHero';
import MinimalistHeroWithRemotion from './components/MinimalistHeroWithRemotion';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Doctors = lazy(() => import('./components/Doctors'));
const ReceptionTeam = lazy(() => import('./components/ReceptionTeam'));
const PatientInfo = lazy(() => import('./components/PatientInfo'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const MobileLayout = lazy(() => import('./components/mobile/MobileLayout'));

function HomePage() {
  const { isMobile } = useMobileDetection();
  
  // Feature flag for Remotion enhancement - can be controlled via URL param (default: false for clean design)
  const [useRemotionHero] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('remotion') === 'true';
  });

  useEffect(() => {
    // Enhanced smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    // Advanced scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          // Add staggered animation for child elements
          const children = entry.target.querySelectorAll('.stagger-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-fade-in-up');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Enhanced parallax effect for hero section and other elements (desktop only)
    // Cleanup for simplified design
    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Return mobile layout for mobile devices
  if (isMobile) {
    return null; // Mobile layout will be handled in the main App component
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Clean Subtle Background */}
      <div className="fixed inset-0 z-0">
        {/* Simple cream gradient background to match hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-white to-primary-50/20" />
      </div>
      
      <main className="relative z-10">
        {useRemotionHero ? <MinimalistHeroWithRemotion /> : <MinimalistHero />}
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <Services />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <Doctors />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <ReceptionTeam />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <PatientInfo />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <Contact />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  const { isMobile } = useMobileDetection();
  const [currentPage, setCurrentPage] = useState('home');
  

  // If mobile, use MobileLayout exclusively
  if (isMobile) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
              <MobileLayout 
                currentPage={currentPage} 
                onPageChange={setCurrentPage} 
              />
            </Suspense>
          } />
        </Routes>
      </Router>
    );
  }

  // Desktop layout
  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 z-0">
          {/* Base gradient with animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#fcdfbe] via-[#fef3e2] to-[#ffd3c2] animate-gradient-shift" 
               style={{ backgroundSize: '400% 400%' }} />
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full blur-xl animate-floating-orbs" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-sage-200/15 to-primary-200/15 rounded-full blur-lg animate-floating-orbs" 
               style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-accent-200/10 to-cream-200/20 rounded-full blur-2xl animate-floating-orbs" 
               style={{ animationDelay: '4s' }} />
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-cream-200/25 to-sage-200/15 rounded-full blur-md animate-floating-orbs" 
               style={{ animationDelay: '6s' }} />
          
          {/* Liquid flowing shapes */}
          <div className="absolute top-32 right-40 w-64 h-64 bg-gradient-to-br from-primary-100/10 to-accent-100/10 animate-liquid-flow blur-xl" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-sage-100/8 to-cream-100/12 animate-liquid-flow blur-lg" 
               style={{ animationDelay: '8s' }} />
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full animate-gentle-grid"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(8, 145, 178, 0.02) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(8, 145, 178, 0.02) 1px, transparent 1px)
                   `,
                   backgroundSize: '60px 60px'
                 }} />
          </div>
          
          {/* Floating particles */}
          <div className="absolute top-60 left-1/2 w-2 h-2 bg-primary-300/40 rounded-full animate-subtle-float blur-sm" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute top-80 right-1/4 w-1 h-1 bg-accent-300/50 rounded-full animate-subtle-float" 
               style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-60 left-1/3 w-3 h-3 bg-sage-300/30 rounded-full animate-subtle-float blur-sm" 
               style={{ animationDelay: '5s' }} />
        </div>
        
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;