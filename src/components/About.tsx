import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Heart, Shield, ChevronRight } from 'lucide-react';

const About: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Award-Winning Care",
      description: "Recognized excellence in cardiovascular medicine with multiple healthcare awards.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Expert Team",
      description: "Board-certified cardiologists with specialized training from leading institutions.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Comprehensive Care",
      description: "Full spectrum of cardiac services from prevention to advanced interventions.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Advanced Technology",
      description: "State-of-the-art diagnostic and treatment equipment for optimal outcomes.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Melbourne's Premier
                <span className="text-blue-600 block">
                  Heart Specialists
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                For over two decades, Heart Clinic Melbourne has been at the forefront of cardiovascular care, combining cutting-edge medical technology with compassionate patient-centered treatment.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our multidisciplinary team of specialists works collaboratively to provide personalized treatment plans that address each patient's unique needs, ensuring the best possible outcomes for heart health.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.color} ${feature.hoverColor} p-6 rounded-xl transition-all duration-500 cursor-pointer transform ${
                    activeFeature === index ? 'scale-105 shadow-lg ring-2 ring-blue-200' : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="space-y-3">
                    <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                    {activeFeature === index && (
                      <div className="flex items-center text-blue-600 font-medium">
                        <span>Learn more</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical professionals in consultation discussing patient care"
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            {/* Floating Achievement Card */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <p className="font-bold text-gray-900">Excellence Award</p>
                <p className="text-sm text-gray-600">2023 Healthcare Leader</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;