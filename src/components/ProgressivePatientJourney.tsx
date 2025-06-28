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
      title: "Contact",
      subtitle: "Your journey begins",
      description: "Reach out to our reception team who will guide you through scheduling and answer any questions.",
      icon: <Phone className="w-6 h-6" />,
      duration: "5 minutes",
      details: [
        "Friendly reception team",
        "Flexible scheduling",
        "Insurance guidance",
        "Immediate confirmation"
      ]
    },
    {
      id: 2,
      title: "Preparation",
      subtitle: "Getting ready",
      description: "We provide everything you need to prepare for your consultation for a smooth appointment.",
      icon: <FileText className="w-6 h-6" />,
      duration: "1-2 days",
      details: [
        "Preparation checklist",
        "Digital forms",
        "Clear directions",
        "What to expect"
      ]
    },
    {
      id: 3,
      title: "Consultation",
      subtitle: "Expert assessment",
      description: "Meet with our cardiologists for comprehensive evaluation and personalized care planning.",
      icon: <Stethoscope className="w-6 h-6" />,
      duration: "45-60 minutes",
      details: [
        "Medical history review",
        "Physical examination",
        "Risk assessment",
        "Clear explanations"
      ]
    },
    {
      id: 4,
      title: "Diagnostics",
      subtitle: "Advanced testing",
      description: "State-of-the-art testing to provide detailed insights into your heart function.",
      icon: <Activity className="w-6 h-6" />,
      duration: "30-90 minutes",
      details: [
        "ECG monitoring",
        "Echocardiography",
        "Stress testing",
        "Same-day results"
      ]
    },
    {
      id: 5,
      title: "Treatment",
      subtitle: "Personalized care",
      description: "Comprehensive treatment plan tailored to your specific needs and health goals.",
      icon: <Heart className="w-6 h-6" />,
      duration: "Ongoing",
      details: [
        "Treatment recommendations",
        "Lifestyle guidance",
        "Medication management",
        "Follow-up scheduling"
      ]
    },
    {
      id: 6,
      title: "Ongoing Care",
      subtitle: "Long-term partnership",
      description: "Continuous support and monitoring for optimal heart health throughout your journey.",
      icon: <CheckCircle className="w-6 h-6" />,
      duration: "Lifelong",
      details: [
        "Health monitoring",
        "Preventive strategies",
        "Emergency support",
        "Education resources"
      ]
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.4,
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
    <section id="patient-journey" className="py-32 bg-gray-50" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ultra Minimal Header */}
        <div className="text-center mb-24">
          <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Six Simple
            <span className="block text-gray-400">
              Steps
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            A carefully designed journey that puts your comfort first
          </p>
        </div>

        {/* Minimal Journey Steps */}
        <div className="space-y-24">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              ref={el => stepRefs.current[index] = el}
              className={`transition-all duration-1000 ${
                visibleSteps.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
            >
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Step Number - Large and Minimal */}
                <div className="lg:col-span-2">
                  <div className="text-8xl font-bold text-gray-200 leading-none">
                    {step.id.toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-900 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-gray-500 font-medium">{step.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-600 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Element - Minimal */}
                <div className="lg:col-span-4">
                  <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-500 ${
                    activeStep === index ? 'shadow-lg scale-105' : 'shadow-sm hover:shadow-md'
                  }`}>
                    <div className="text-center space-y-4">
                      <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">Step {step.id}</div>
                        <div className="text-gray-500">{step.subtitle}</div>
                      </div>
                      
                      {/* Progress */}
                      <div className="flex justify-center space-x-1">
                        {journeySteps.map((_, stepIdx) => (
                          <div
                            key={stepIdx}
                            className={`h-1 rounded-full transition-all duration-500 ${
                              stepIdx <= index ? 'bg-gray-900 w-6' : 'bg-gray-200 w-2'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal CTA */}
        <div className="mt-32 text-center">
          <div className="bg-gray-900 rounded-3xl p-16 text-white">
            <div className="space-y-8">
              <h3 className="text-4xl lg:text-5xl font-bold">Ready to Begin?</h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Take the first step towards better heart health
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 font-medium text-lg">
                  Call (03) 9509 5009
                </button>
                <button className="border border-gray-600 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium text-lg">
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