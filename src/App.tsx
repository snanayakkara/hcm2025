import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMobileDetection } from './hooks/useMobileDetection';
import { ToastProvider } from './components/ui/Toast';
import Header from './components/Header';
import MinimalistHero from './components/MinimalistHero';
import MinimalistHeroAlternate from './components/MinimalistHeroAlternate';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Doctors = lazy(() => import('./components/Doctors'));
const ReceptionTeam = lazy(() => import('./components/ReceptionTeam'));
const PatientInfo = lazy(() => import('./components/PatientInfo'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const loadMobileLayout = () => import('./components/mobile/MobileLayout');
const MobileLayout = lazy(loadMobileLayout);

if (
  typeof window !== 'undefined' &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
) {
  void loadMobileLayout();
}

const SectionFallback = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
  </div>
);

const PageFallback = ({ mobile = false }: { mobile?: boolean }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-primary-50/20">
    <div className="flex flex-col items-center gap-4 text-secondary-500">
      <img
        src="/images/hcm3d2.webp"
        alt="Heart Clinic Melbourne"
        className={mobile ? 'w-10 h-10 object-contain' : 'w-12 h-12 object-contain'}
        loading="eager"
        decoding="async"
      />
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      <p className="text-sm">Loading experience...</p>
    </div>
  </div>
);

function HomePage() {
  // Feature flag for Remotion enhancement - can be controlled via URL param (default: false for clean design)
  const [useRemotionHero] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('remotion') === 'true';
  });

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-white">
      <main className="relative z-10">
        {useRemotionHero ? <MinimalistHeroAlternate /> : <MinimalistHero />}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Doctors />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ReceptionTeam />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <PatientInfo />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
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
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<PageFallback mobile />}>
                <MobileLayout 
                  currentPage={currentPage} 
                  onPageChange={setCurrentPage} 
                />
              </Suspense>
            } />
          </Routes>
        </Router>
      </ToastProvider>
    );
  }

  // Desktop layout
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen relative overflow-x-hidden">
          <div className="fixed inset-0 z-0 bg-gradient-to-br from-cream-50 via-white to-primary-50/20" />
          
          <div className="relative z-10">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
