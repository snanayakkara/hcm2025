import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Heart, Activity, Users, Award, ChevronDown } from 'lucide-react';
import Heart3D from './Heart3D';

const MinimalistHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  // Scroll phases for progressive content reveal
  const scrollPhases = [
    { threshold: 0, opacity: 1, scale: 1, rotation: 0 },
    { threshold: 200, opacity: 0.9, scale: 0.95, rotation: 5 },
    { threshold: 400, opacity: 0.8, scale: 0.9, rotation: 10 },
    { threshold: 600, opacity: 0.7, scale: 0.85, rotation: 15 },
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "5700+", label: "Patients Treated", delay: 0 },
    { icon: <Award className="w-6 h-6" />, number: "36+", label: "Years Experience", delay: 200 },
    { icon: <Heart className="w-6 h-6" />, number: "4", label: "Expert Doctors", delay: 400 },
    { icon: <Activity className="w-6 h-6" />, number: "4", label: "Locations", delay: 600 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      // Determine current scroll phase
      const phase = scrollPhases.findIndex((phase, index) => {
        const nextPhase = scrollPhases[index + 1];
        return scrollPosition >= phase.threshold && (!nextPhase || scrollPosition < nextPhase.threshold);
      });
      setCurrentPhase(Math.max(0, phase));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsVisible(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('patient-journey');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate transform values based on scroll
  const currentPhaseData = scrollPhases[currentPhase] || scrollPhases[0];
  const heartTransform = {
    scale: currentPhaseData.scale,
    rotation: currentPhaseData.rotation,
    opacity: currentPhaseData.opacity,
    translateY: scrollY * 0.3
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Minimalist Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-24 h-24 bg-red-200/30 rounded-full"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-200/30 rounded-full"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        
        {/* Header Content - Minimal and Clean */}
        <div className={`pt-32 pb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-8">
            {/* Subtle Brand Indicator */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-gray-700 font-medium text-sm">Heart Clinic Melbourne</span>
            </div>
            
            {/* Main Headline - Large and Impactful */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.9] tracking-tight">
              Your Heart
              <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            
            {/* Minimal Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Expert cardiac care across Melbourne's southeast
            </p>
          </div>
        </div>

        {/* 3D Heart - Central Focus */}
        <div 
          ref={heartRef}
          className="flex-1 flex items-center justify-center relative"
          style={{
            transform: `translateY(${heartTransform.translateY}px) scale(${heartTransform.scale}) rotate(${heartTransform.rotation}deg)`,
            opacity: heartTransform.opacity,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
          }}
        >
          <div className="w-full max-w-4xl mx-auto">
            <Heart3D className="w-full h-[500px] lg:h-[600px] shadow-2xl rounded-3xl" />
          </div>

          {/* Floating Stats - Appear on Scroll */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${scrollY > 100 ? 'opacity-100' : 'opacity-0'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`absolute bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-700`}
                style={{
                  animationDelay: `${stat.delay}ms`,
                  ...(index === 0 && { top: '10%', left: '5%' }),
                  ...(index === 1 && { top: '20%', right: '5%' }),
                  ...(index === 2 && { bottom: '20%', left: '5%' }),
                  ...(index === 3 && { bottom: '10%', right: '5%' }),
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Minimal and Elegant */}
        <div className={`pb-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center space-y-3 text-gray-600 hover:text-blue-600 transition-all duration-300"
          >
            <span className="text-sm font-medium tracking-wide uppercase">Explore Your Journey</span>
            <div className="relative">
              <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-blue-600 rounded-full flex justify-center transition-colors duration-300">
                <div className="w-1 h-3 bg-gray-400 group-hover:bg-blue-600 rounded-full mt-2 animate-bounce transition-colors duration-300"></div>
              </div>
              <ChevronDown className="w-4 h-4 mt-2 mx-auto animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* Progressive Content Reveal Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-2">
          {scrollPhases.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                currentPhase >= index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, (scrollY / window.innerHeight) * 100)}%` }}
        />
      </div>
    </section>
  );
};

export default MinimalistHero;