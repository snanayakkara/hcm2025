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
  Star
} from 'lucide-react';

const PatientJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const journeySteps = [
    {
      id: 1,
      title: "Initial Contact",
      subtitle: "Get in touch with our team",
      description: "Contact our friendly reception team to discuss your needs and schedule your appointment. We'll guide you through the process and answer any questions.",
      icon: <Phone className="w-8 h-8" />,
      duration: "5-10 minutes",
      details: [
        "Call our main line or preferred location",
        "Discuss your symptoms and concerns",
        "Schedule at convenient time and location",
        "Receive appointment confirmation"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Appointment Booking",
      subtitle: "Secure your consultation time",
      description: "Choose your preferred doctor, location, and time slot. We'll send you all the necessary information and preparation instructions.",
      icon: <Calendar className="w-8 h-8" />,
      duration: "Same day",
      details: [
        "Select preferred cardiologist",
        "Choose convenient location",
        "Receive appointment details via SMS/email",
        "Get preparation instructions"
      ],
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      id: 3,
      title: "Pre-Visit Preparation",
      subtitle: "Get ready for your appointment",
      description: "Gather your medical documents, complete any required forms, and prepare questions for your cardiologist.",
      icon: <FileText className="w-8 h-8" />,
      duration: "1-2 days before",
      details: [
        "Collect referral letter and medical records",
        "Complete patient registration forms",
        "Prepare list of current medications",
        "Write down questions and concerns"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 4,
      title: "Consultation",
      subtitle: "Meet with your cardiologist",
      description: "Comprehensive cardiac assessment including medical history review, physical examination, and discussion of your symptoms and concerns.",
      icon: <Stethoscope className="w-8 h-8" />,
      duration: "45-60 minutes",
      details: [
        "Detailed medical history discussion",
        "Comprehensive physical examination",
        "Review of symptoms and risk factors",
        "Initial assessment and recommendations"
      ],
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200"
    },
    {
      id: 5,
      title: "Diagnostic Testing",
      subtitle: "Advanced cardiac assessment",
      description: "If needed, we'll perform specialized tests such as ECG, echocardiography, or stress testing to get a complete picture of your heart health.",
      icon: <Activity className="w-8 h-8" />,
      duration: "30-90 minutes",
      details: [
        "ECG and basic cardiac monitoring",
        "Echocardiography if required",
        "Stress testing when appropriate",
        "Advanced imaging if necessary"
      ],
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      id: 6,
      title: "Treatment Plan",
      subtitle: "Personalized care strategy",
      description: "Based on your assessment and test results, we'll develop a comprehensive treatment plan tailored to your specific needs and lifestyle.",
      icon: <Heart className="w-8 h-8" />,
      duration: "Ongoing",
      details: [
        "Personalized treatment recommendations",
        "Medication management if needed",
        "Lifestyle modification guidance",
        "Follow-up appointment scheduling"
      ],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
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
    if (isVisible) {
      const timer = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % journeySteps.length;
          if (next === 0) {
            setCompletedSteps([]);
          } else {
            setCompletedSteps((completed) => [...completed, prev]);
          }
          return next;
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isVisible, journeySteps.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setCompletedSteps(Array.from({ length: index }, (_, i) => i));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-200 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-blue-700 font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Your Journey to Better Heart Health</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Patient
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From your first call to ongoing care, we've designed a seamless experience that puts your comfort and health at the center of everything we do.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-blue-200 rounded-full hidden lg:block"></div>

          {/* Journey Steps */}
          <div className="space-y-16 lg:space-y-24">
            {journeySteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Desktop Layout */}
                <div className={`hidden lg:grid lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}>
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left lg:col-start-2'}`}>
                    <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl ${step.bgColor} ${step.borderColor} border-2`}>
                      <div className={`bg-gradient-to-r ${step.color} text-white p-2 rounded-xl`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 font-medium">{step.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className={`flex items-center space-x-3 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`flex items-center space-x-2 text-sm text-gray-500 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className={`${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                    <div className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-2 ${
                      activeStep === index ? step.borderColor : 'border-gray-200'
                    } transition-all duration-500 transform ${
                      activeStep === index ? 'scale-105' : 'hover:scale-102'
                    }`}>
                      <div className={`bg-gradient-to-br ${step.color} text-white w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        {step.icon}
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Step {step.id}</h4>
                        <p className="text-gray-600">{step.subtitle}</p>
                      </div>
                      
                      {/* Progress Indicator */}
                      {completedSteps.includes(index) && (
                        <div className="absolute -top-3 -right-3 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}
                      
                      {activeStep === index && (
                        <div className="absolute -top-3 -left-3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center animate-pulse">
                          <Star className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div 
                    onClick={() => handleStepClick(index)}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-2 ${
                      activeStep === index ? step.borderColor : 'border-gray-200'
                    } transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-br ${step.color} text-white p-3 rounded-xl flex-shrink-0`}>
                        {step.icon}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          <p className="text-gray-600">{step.subtitle}</p>
                        </div>
                        
                        {activeStep === index && (
                          <div className="space-y-4 animate-fadeIn">
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            <div className="space-y-2">
                              {step.details.map((detail, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{detail}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{step.duration}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0">
                        {completedSteps.includes(index) ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : activeStep === index ? (
                          <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Node (Desktop) */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div 
                    onClick={() => handleStepClick(index)}
                    className={`w-6 h-6 rounded-full border-4 cursor-pointer transition-all duration-300 ${
                      completedSteps.includes(index)
                        ? 'bg-green-500 border-green-300'
                        : activeStep === index
                        ? `bg-gradient-to-r ${step.color} border-white shadow-lg scale-150`
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Journey?</h3>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Take the first step towards better heart health. Our team is here to guide you through every stage of your care.
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

export default PatientJourney;