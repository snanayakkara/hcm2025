import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, MapPin, Heart, Activity, Users, Award, Play, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "5700+", label: "Patients Treated", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: <Award className="w-8 h-8" />, number: "36+", label: "Years Experience", color: "text-emerald-600", bgColor: "bg-emerald-100" },
    { icon: <Heart className="w-8 h-8" />, number: "4", label: "Expert Doctors", color: "text-rose-600", bgColor: "bg-rose-100" },
    { icon: <Activity className="w-8 h-8" />, number: "4", label: "Locations", color: "text-purple-600", bgColor: "bg-purple-100" }
  ];

  const floatingElements = [
    { id: 1, size: 'w-20 h-20', color: 'bg-blue-200/30', position: 'top-20 left-10', delay: '0s' },
    { id: 2, size: 'w-16 h-16', color: 'bg-purple-200/30', position: 'top-40 right-20', delay: '2s' },
    { id: 3, size: 'w-12 h-12', color: 'bg-emerald-200/30', position: 'bottom-40 left-20', delay: '4s' },
    { id: 4, size: 'w-24 h-24', color: 'bg-rose-200/20', position: 'top-60 left-1/3', delay: '1s' },
    { id: 5, size: 'w-14 h-14', color: 'bg-amber-200/30', position: 'bottom-60 right-1/4', delay: '3s' }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Advanced Background Elements with Parallax */}
      <div className="absolute inset-0 opacity-40">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className={`absolute ${element.size} ${element.color} rounded-full animate-pulse`}
            style={{
              animationDelay: element.delay,
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-blue-50/60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          {/* Enhanced Content */}
          <div className={`space-y-10 transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            {/* Premium Typography */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-blue-700 font-medium">
                <Heart className="w-4 h-4" />
                <span>Melbourne's Premier Cardiac Care</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                Expert Cardiac Care
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Across Melbourne
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Comprehensive cardiovascular services across multiple locations in Melbourne's southeast, providing accessible expert cardiac care close to home.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="font-semibold text-lg relative z-10">Book Consultation</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
              </button>
              
              <button
                onClick={() => scrollToSection('services')}
                className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-lg backdrop-blur-sm bg-white/80 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Our Locations</span>
                </span>
              </button>
            </div>

            {/* Enhanced Contact Info */}
            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Main Line</p>
                    <p className="font-bold text-gray-900 text-lg">(03) 9509 5009</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Locations</p>
                    <p className="font-bold text-gray-900">Malvern • Pakenham • Clyde • Berwick</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className={`relative transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            {/* Main Image Container */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img
                  src="https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Modern cardiac care facility with professional healthcare environment"
                  className="w-full h-[500px] lg:h-[650px] object-cover"
                  style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
                    <Play className="w-8 h-8 text-blue-600 ml-1 group-hover:text-blue-700" />
                  </button>
                </div>
              </div>
              
              {/* Floating Achievement Cards */}
              <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-gray-900">Excellence Award</p>
                  <p className="text-sm text-gray-600">2023 Healthcare Leader</p>
                </div>
              </div>
              
              {/* Animated Stats Card */}
              <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-6">
                  <div className={`${stats[currentStat].bgColor} p-4 rounded-xl transition-all duration-500`}>
                    <div className={`${stats[currentStat].color} transition-colors duration-500`}>
                      {stats[currentStat].icon}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stats[currentStat].number}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">{stats[currentStat].label}</p>
                  </div>
                </div>
                
                {/* Enhanced Progress indicators */}
                <div className="flex space-x-2 mt-4 justify-center">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentStat 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' 
                          : 'bg-gray-200 w-2 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1200 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => scrollToSection('about')}
            className="group flex flex-col items-center space-y-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <span className="text-sm font-medium">Discover More</span>
            <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-blue-600 rounded-full flex justify-center transition-colors duration-300">
              <div className="w-1 h-3 bg-gray-400 group-hover:bg-blue-600 rounded-full mt-2 animate-bounce transition-colors duration-300"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;