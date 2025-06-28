import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Heart, Activity, Users, Award, ChevronDown } from 'lucide-react';

const MinimalistHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: <Users className="w-5 h-5" />, number: "5700+", label: "Patients", delay: 0 },
    { icon: <Award className="w-5 h-5" />, number: "36+", label: "Years", delay: 200 },
    { icon: <Heart className="w-5 h-5" />, number: "4", label: "Doctors", delay: 400 },
    { icon: <Activity className="w-5 h-5" />, number: "4", label: "Locations", delay: 600 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Ultra Minimal Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        
        {/* Central Content */}
        <div className={`text-center space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Subtle Brand Indicator */}
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-gray-600 font-medium text-sm">Heart Clinic Melbourne</span>
          </div>
          
          {/* Main Headline - Massive and Clean */}
          <div className="space-y-6">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-gray-900 leading-[0.85] tracking-tight">
              Your Heart
              <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            
            {/* Minimal Subtitle */}
            <p className="text-2xl lg:text-3xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
              Expert cardiac care across Melbourne's southeast
            </p>
          </div>

          {/* Floating Stats - Clean and Minimal */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${scrollY > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="space-y-3">
                  <div className="bg-gray-50 text-gray-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto">
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple CTA */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium text-lg">
                Book Consultation
              </button>
              <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center space-y-2 text-gray-400 hover:text-gray-600 transition-all duration-300"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Explore</span>
            <div className="w-6 h-10 border border-gray-300 group-hover:border-gray-400 rounded-full flex justify-center transition-colors duration-300">
              <div className="w-1 h-3 bg-gray-300 group-hover:bg-gray-400 rounded-full mt-2 animate-bounce transition-colors duration-300"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-gray-900 transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, (scrollY / window.innerHeight) * 100)}%` }}
        />
      </div>
    </section>
  );
};

export default MinimalistHero;