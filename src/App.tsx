import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMobileDetection } from './hooks/useMobileDetection';
import Header from './components/Header';
import MinimalistHero from './components/MinimalistHero';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import ReceptionTeam from './components/ReceptionTeam';
import PatientInfo from './components/PatientInfo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LearningLibrary from './pages/LearningLibrary';
import MobileLayout from './components/mobile/MobileLayout';
import { PdfSelectionProvider } from './contexts/PdfSelectionContext';

function HomePage() {
  const { isMobile } = useMobileDetection();

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
    const handleParallax = () => {
      if (isMobile) return; // Skip parallax on mobile for performance
      
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      // Add floating animation to background elements
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = Math.sin(scrolled * 0.01 + index) * 10;
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    // Throttled scroll listener for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Add mouse movement parallax effect (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // Skip mouse parallax on mobile
      
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const parallaxElements = document.querySelectorAll('.mouse-parallax');
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-mouse-speed') || '0.1');
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  // Return mobile layout for mobile devices
  if (isMobile) {
    return null; // Mobile layout will be handled in the main App component
  }

  return (
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
      
      <main className="relative z-10">
        <MinimalistHero />
        <About />
        <Services />
        <Doctors />
        <ReceptionTeam />
        <PatientInfo />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  const { isMobile, screenWidth } = useMobileDetection();
  const [currentPage, setCurrentPage] = useState('home');
  
  // Debug logging
  console.log('Mobile detection:', { isMobile, screenWidth });

  // If mobile, use MobileLayout exclusively
  if (isMobile) {
    return (
      <PdfSelectionProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <MobileLayout 
                currentPage={currentPage} 
                onPageChange={setCurrentPage} 
              />
            } />
            <Route path="/learning-library" element={
              <div className="min-h-screen overflow-x-hidden pb-24">
                <div className="pt-20 px-4">
                  <LearningLibrary />
                </div>
              </div>
            } />
          </Routes>
        </Router>
      </PdfSelectionProvider>
    );
  }

  // Desktop layout
  return (
    <PdfSelectionProvider>
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
              <Route path="/learning-library" element={
                <>
                  <LearningLibrary />
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </PdfSelectionProvider>
  );
}

export default App;