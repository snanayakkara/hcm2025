import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Activity, 
  Heart, 
  CheckCircle, 
  ArrowRight,
  Clock,
  User,
  MapPin,
  Star,
  ChevronRight
} from 'lucide-react';

const ProgressivePatientJourney: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const journeySteps = [
    {
      id: 1,
      title: "Initial Contact",
      subtitle: "Your journey begins",
      description: "Reach out to our caring reception team who will guide you through scheduling your appointment and answer any initial questions.",
      icon: <Phone className="w-8 h-8" />,
      duration: "5 minutes",
      details: [
        "Friendly, professional reception team",
        "Flexible scheduling across 4 locations",
        "Insurance and Medicare guidance",
        "Immediate appointment confirmation"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Preparation",
      subtitle: "Getting ready for your visit",
      description: "We'll provide you with everything you need to prepare for your consultation, ensuring a smooth and efficient appointment.",
      icon: <FileText className="w-8 h-8" />,
      duration: "1-2 days",
      details: [
        "Pre-visit preparation checklist",
        "Digital forms for convenience",
        "Clear directions to your chosen location",
        "What to bring and expect"
      ],
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      id: 3,
      title: "Consultation",
      subtitle: "Expert cardiac assessment",
      description: "Meet with our experienced cardiologists for a comprehensive evaluation of your heart health and personalized care plan.",
      icon: <Stethoscope className="w-8 h-8" />,
      duration: "45-60 minutes",
      details: [
        "Thorough medical history review",
        "Comprehensive physical examination",
        "Personalized risk assessment",
        "Clear explanation of findings"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 4,
      title: "Diagnostics",
      subtitle: "Advanced cardiac testing",
      description: "State-of-the-art diagnostic testing to provide detailed insights into your heart function and overall cardiovascular health.",
      icon: <Activity className="w-8 h-8" />,
      duration: "30-90 minutes",
      details: [
        "ECG and rhythm monitoring",
        "Echocardiography imaging",
        "Stress testing when needed",
        "Same-day results discussion"
      ],
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      id: 5,
      title: "Treatment Plan",
      subtitle: "Your personalized care strategy",
      description: "Receive a comprehensive treatment plan tailored to your specific needs, lifestyle, and health goals.",
      icon: <Heart className="w-8 h-8" />,
      duration: "Ongoing",
      details: [
        "Personalized treatment recommendations",
        "Lifestyle modification guidance",
        "Medication management",
        "Regular follow-up scheduling"
      ],
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200"
    },
    {
      id: 6,
      title: "Ongoing Care",
      subtitle: "Long-term heart health partnership",
      description: "Continuous support and monitoring to ensure optimal heart health and quality of life throughout your journey.",
      icon: <Star className="w-8 h-8" />,
      duration: "Lifelong",
      details: [
        "Regular health monitoring",
        "Preventive care strategies",
        "Emergency support access",
        "Health education resources"
      ],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = stepRefs.current.findIndex(ref => ref === entry.target);
          if (stepIndex !== -1 && !visibleSteps.includes(stepIndex)) {
            setVisibleSteps(prev => [...prev, stepIndex].sort((a, b) => a - b));
            setActiveStep(stepIndex);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleSteps]);

  return (
    <section id="patient-journey" className="py-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full text-gray-600 font-medium mb-8">
            <Heart className="w-4 h-4" />
            <span>Your Patient Journey</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Six Steps to
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Better Heart Health
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            A carefully designed journey that puts your comfort and health at the center of everything we do.
          </p>
        </div>

        {/* Progressive Journey Steps */}
        <div className="space-y-32">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              ref={el => stepRefs.current[index] = el}
              className={`transition-all duration-1000 ${
                visibleSteps.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                
                {/* Content Side */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  {/* Step Number and Title */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className={`bg-gradient-to-r ${step.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg`}>
                        {step.id}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-lg text-gray-600 font-medium">{step.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <div className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center space-x-3 transition-all duration-500`}
                        style={{ transitionDelay: `${(index * 100) + (idx * 100)}ms` }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`inline-flex items-center space-x-2 bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-medium`}>
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Visual Side */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className={`relative ${step.bgColor} ${step.borderColor} border-2 rounded-3xl p-12 shadow-xl transform ${
                    activeStep === index ? 'scale-105' : 'hover:scale-102'
                  } transition-all duration-500`}>
                    
                    {/* Icon */}
                    <div className={`bg-gradient-to-r ${step.color} text-white w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                      {step.icon}
                    </div>
                    
                    {/* Step Info */}
                    <div className="text-center space-y-4">
                      <h4 className="text-2xl font-bold text-gray-900">Step {step.id}</h4>
                      <p className="text-gray-600 font-medium">{step.subtitle}</p>
                      
                      {/* Progress Indicator */}
                      <div className="flex justify-center space-x-2 pt-4">
                        {journeySteps.map((_, stepIdx) => (
                          <div
                            key={stepIdx}
                            className={`h-2 rounded-full transition-all duration-500 ${
                              stepIdx <= index 
                                ? `bg-gradient-to-r ${step.color} w-8` 
                                : 'bg-gray-200 w-2'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Active Step Indicator */}
                    {activeStep === index && (
                      <div className="absolute -top-3 -right-3 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">Ready to Begin Your Journey?</h3>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Take the first step towards better heart health. Our expert team is here to guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 font-bold text-lg transform hover:-translate-y-1 shadow-lg">
                  <Phone className="w-5 h-5" />
                  <span>Call (03) 9509 5009</span>
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-200 font-bold text-lg transform hover:-translate-y-1">
                  Book Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressivePatientJourney;