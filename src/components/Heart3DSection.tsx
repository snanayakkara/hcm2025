import React, { useState, useEffect, useRef } from 'react';
import { Heart, Play, BookOpen, Users, Award, ChevronRight } from 'lucide-react';
import Heart3D from './Heart3D';

const Heart3DSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Anatomical Accuracy",
      description: "Detailed 3D model showing all four heart chambers, major vessels, and blood flow patterns"
    },
    {
      icon: <Play className="w-6 h-6 text-blue-500" />,
      title: "Interactive Animation",
      description: "Real-time heart beating simulation with adjustable speed and blood flow visualization"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      title: "Educational Tool",
      description: "Click on different parts to learn about their function and role in cardiovascular health"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Patient Education",
      description: "Help patients understand their heart condition and treatment options visually"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-red-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-red-700 font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Interactive 3D Heart Model</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Explore Your
            <span className="block bg-gradient-to-r from-red-600 via-pink-600 to-red-800 bg-clip-text text-transparent">
              Heart in 3D
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience an interactive 3D visualization of the human heart. Learn about cardiac anatomy, understand how your heart works, and explore the cardiovascular system in unprecedented detail.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* 3D Heart Visualization */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Heart3D className="w-full" />
          </div>

          {/* Features and Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Advanced Cardiac Visualization
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our state-of-the-art 3D heart model provides an immersive educational experience, helping patients and medical professionals understand cardiac anatomy and function like never before.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-white shadow-xl scale-105 border-2 border-blue-200'
                      : 'bg-white/80 shadow-lg hover:shadow-xl hover:scale-102 border border-gray-200'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      activeFeature === index ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Specifications */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Technical Features</span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">WebGL-powered rendering</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Real-time animations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Cross-browser compatible</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Mobile responsive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Interactive controls</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Educational tooltips</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Benefits */}
        <div className={`bg-white rounded-3xl shadow-xl p-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Educational Benefits
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This interactive 3D heart model serves as a powerful educational tool for both patients and healthcare professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Patient Education</h4>
              <p className="text-gray-600">
                Help patients visualize their heart condition and understand treatment procedures through interactive exploration.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Medical Training</h4>
              <p className="text-gray-600">
                Enhance medical education with detailed anatomical visualization and interactive learning experiences.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Health Awareness</h4>
              <p className="text-gray-600">
                Promote cardiovascular health awareness through engaging and informative 3D visualization.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-800 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">Experience the Future of Cardiac Education</h3>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Discover how our advanced 3D visualization technology can enhance your understanding of cardiovascular health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 px-8 py-4 rounded-2xl hover:bg-red-50 transition-all duration-200 flex items-center justify-center space-x-2 font-bold text-lg transform hover:-translate-y-1 shadow-lg">
                  <span>Schedule Consultation</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-red-600 transition-all duration-200 font-bold text-lg transform hover:-translate-y-1">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heart3DSection;