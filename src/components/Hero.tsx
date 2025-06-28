import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, MapPin, Heart, Activity, Users, Award } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "5700+", label: "Patients Treated", color: "text-blue-600" },
    { icon: <Award className="w-6 h-6" />, number: "36+", label: "Years Experience", color: "text-blue-600" },
    { icon: <Heart className="w-6 h-6" />, number: "4", label: "Expert Doctors", color: "text-blue-600" },
    { icon: <Activity className="w-6 h-6" />, number: "4", label: "Locations", color: "text-blue-600" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Expert Cardiac Care
                <span className="text-blue-600 block">
                  Across Melbourne
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Comprehensive cardiovascular services across multiple locations in Melbourne's southeast, providing accessible expert cardiac care close to home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="font-semibold">Book Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold"
              >
                Our Locations
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Main Line</p>
                  <p className="font-semibold text-gray-900">(03) 9509 5009</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Locations</p>
                  <p className="font-semibold text-gray-900">Malvern • Pakenham • Clyde • Berwick</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern cardiac care facility with professional healthcare environment"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            
            {/* Animated Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className={`${stats[currentStat].color} transition-colors duration-500`}>
                  {stats[currentStat].icon}
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {stats[currentStat].number}
                  </p>
                  <p className="text-sm text-gray-600">{stats[currentStat].label}</p>
                </div>
              </div>
              
              {/* Progress indicators */}
              <div className="flex space-x-1 mt-3">
                {stats.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentStat ? 'bg-blue-600 w-6' : 'bg-gray-200 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;