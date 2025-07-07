import React, { useState, useEffect, useRef } from 'react';
import { FileText, Clock, Shield, CreditCard, Phone, Mail, ArrowRight, CheckCircle, ChevronLeft, ChevronRight, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../data/faqData';
import Wizard from './Wizard/Wizard';

const PatientInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
    preferredLocation: '',
    preferredDoctor: '',
    localGP: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [activeResource, setActiveResource] = useState(0);
  const [showIntakeWizard, setShowIntakeWizard] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const [expandedFaqItems, setExpandedFaqItems] = useState<Set<number>>(new Set());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [doctorPreSelected, setDoctorPreSelected] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (cardType: string) => {
    setActiveDetail(activeDetail === cardType ? null : cardType);
  };

  const closeDetail = () => {
    setActiveDetail(null);
  };

  const toggleFaqItem = (index: number) => {
    const newExpanded = new Set(expandedFaqItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFaqItems(newExpanded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If location changes, reset doctor selection
    if (name === 'preferredLocation') {
      setFormData({
        ...formData,
        [name]: value,
        preferredDoctor: '' // Reset doctor when location changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent('Appointment Request - Heart Clinic Melbourne');
    
    let body = `Dear Heart Clinic Melbourne team,

I would like to request an appointment with the following details:

PATIENT INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Local GP: ${formData.localGP || 'Not specified'}

APPOINTMENT PREFERENCES:
Preferred Date: ${formData.preferredDate || 'Not specified'}
Preferred Time: ${formData.preferredTime || 'Not specified'}
Preferred Location: ${formData.preferredLocation || 'Not specified'}
Preferred Cardiologist: ${formData.preferredDoctor || 'Not specified'}

REASON FOR VISIT:
${formData.reason || 'Not specified'}

Please contact me to confirm the appointment details.

Thank you,
${formData.name}`;

    const encodedBody = encodeURIComponent(body);
    const mailtoLink = `mailto:reception@heartclinicmelbourne.com?subject=${subject}&body=${encodedBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Optional: Still log for debugging
    console.log('Form submitted:', formData);
  };

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
      setActiveResource((prev) => (prev + 1) % patientResources.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Listen for doctor selection from Doctors component
  useEffect(() => {
    const handleDoctorSelected = (event: CustomEvent) => {
      const doctorInfo = event.detail;
      setFormData(prev => ({
        ...prev,
        preferredDoctor: doctorInfo.name,
        // Only set location if it's provided (not null), otherwise clear it
        preferredLocation: doctorInfo.location || ''
      }));
      
      // Show visual feedback only if both doctor and location are pre-selected
      if (doctorInfo.location) {
        setDoctorPreSelected(true);
        setTimeout(() => setDoctorPreSelected(false), 3000);
      }
      
      // Clear the stored data after using it
      localStorage.removeItem('selectedDoctorBooking');
    };

    // Check for existing doctor selection on mount
    const storedDoctorInfo = localStorage.getItem('selectedDoctorBooking');
    if (storedDoctorInfo) {
      try {
        const doctorInfo = JSON.parse(storedDoctorInfo);
        // Only use if timestamp is within the last 5 minutes
        if (Date.now() - doctorInfo.timestamp < 300000) {
          setFormData(prev => ({
            ...prev,
            preferredDoctor: doctorInfo.name,
            // Only set location if it's provided (not null), otherwise clear it
            preferredLocation: doctorInfo.location || ''
          }));
          // Show visual feedback only if both doctor and location are pre-selected
          if (doctorInfo.location) {
            setDoctorPreSelected(true);
            setTimeout(() => setDoctorPreSelected(false), 3000);
          }
        }
        localStorage.removeItem('selectedDoctorBooking');
      } catch (e) {
        console.error('Error parsing stored doctor info:', e);
      }
    }

    window.addEventListener('doctorSelected', handleDoctorSelected as EventListener);
    return () => {
      window.removeEventListener('doctorSelected', handleDoctorSelected as EventListener);
    };
  }, []);

  const patientResources = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Patient Forms",
      description: "Complete your intake form digitally before your visit",
      items: ["Quick Intake Wizard", "Medical History Form", "Insurance Information", "Consent Forms"],
      color: "from-blue-100 to-indigo-100",
      hasWizard: true
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "What to Expect",
      description: "Prepare for your appointment with us",
      items: ["Initial Consultation (20 min)", "Diagnostic Tests if needed", "Treatment Plan Discussion", "Follow-up Scheduling"],
      color: "from-emerald-100 to-teal-100",
      hasHoverCard: true
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Insurance & Billing",
      description: "We will sort the Medicare rebate for you",
      items: ["Medicare & Private Health", "Medicare Rebate", "Payment Plans", "Insurance Verification"],
      color: "from-purple-100 to-pink-100"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      title: "Payment Options",
      description: "Flexible payment solutions available",
      items: ["All Major Credit Cards", "EFTPOS & Bank Transfer", "Insurance Claims", "Interest-Free Options"],
      color: "from-amber-100 to-orange-100"
    }
  ];

  const locations = [
    "Cabrini Malvern",
    "Pakenham", 
    "Clyde"
  ];

  const getDoctorsByLocation = (location: string) => {
    switch (location) {
      case "Cabrini Malvern":
        return [
          { 
            name: "Dr Mark Freilich", 
            image: "/images/freilich.png",
            specialty: "General and Interventional Cardiology"
          },
          { 
            name: "Associate Professor Alex Voskoboinik", 
            image: "/images/vosko.png",
            specialty: "General and Electrophysiology"
          },
          { 
            name: "Dr Shane Nanayakkara", 
            image: "/images/nanayakkara.png",
            specialty: "General, Intervention, Structural, and Heart Failure"
          },
          { 
            name: "No preference", 
            image: null,
            specialty: "Any available cardiologist"
          }
        ];
      case "Pakenham":
        return [
          { 
            name: "Dr Mark Freilich", 
            image: "/images/freilich.png",
            specialty: "Interventional Cardiology"
          },
          { 
            name: "Associate Professor Alex Voskoboinik", 
            image: "/images/vosko.png",
            specialty: "Electrophysiology"
          },
          { 
            name: "Dr Phillip Ngu", 
            image: "/images/ngu.png",
            specialty: "General and Non-Invasive Imaging"
          },
          { 
            name: "No preference", 
            image: null,
            specialty: "Any available cardiologist"
          }
        ];
      case "Clyde":
        return [
          { 
            name: "Dr Phillip Ngu", 
            image: "/images/ngu.png",
            specialty: "General and Non-Invasive Imaging"
          },
          { 
            name: "No preference", 
            image: null,
            specialty: "Any available cardiologist"
          }
        ];
      default:
        return [{ name: "No preference", image: null, specialty: "Any available cardiologist" }];
    }
  };

  const availableDoctors = getDoctorsByLocation(formData.preferredLocation);

  return (
    <section id="patients" className="py-32 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Patient Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for your visit, from scheduling to insurance and what to expect during your consultation. Click a card for more information.
          </p>
        </div>

        <motion.div 
          className="grid gap-8 lg:items-start"
          animate={{
            gridTemplateColumns: activeDetail ? '1fr 0.67fr' : '1fr 1fr'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Left Section: Patient Resources + Detail View */}
          <div className="flex">
            {/* Patient Resources Column */}
            <motion.div 
              className="flex-shrink-0 pr-4"
              animate={{
                width: activeDetail ? '60%' : '100%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col space-y-8">
            {patientResources.slice(0, 2).map((resource, index) => (
              <div
                key={index}
                className={`relative bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                } ${
                  activeResource === index ? 'ring-2 ring-blue-200 shadow-xl' : 'hover:shadow-lg'
                }`}
                style={{ 
                  transformOrigin: 'center',
                  willChange: 'transform',
                  transform: activeResource === index ? 'scale(1.02)' : 'scale(1)',
                  transitionDelay: `${300 + index * 150}ms`,
                  cursor: resource.hasHoverCard ? 'pointer' : 'default'
                }}
                onClick={() => resource.hasHoverCard && handleCardClick('visit')}
              >
                <div className="flex items-start space-x-4 relative">
                  <div className={`bg-gradient-to-br ${resource.color} p-3 rounded-lg`}>
                    {resource.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{resource.title}</h4>
                      <p className="text-gray-600">{resource.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {resource.items.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Circular Start Button */}
                  {resource.hasWizard && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowIntakeWizard(true);
                      }}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold text-sm hover:scale-105 group"
                      style={{
                        boxShadow: '4px 4px 12px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        Start
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Common Questions Card - moved to third position */}
            <div
              className={`relative bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              } hover:scale-102`}
              style={{ 
                transitionDelay: `${300 + 2 * 150}ms`,
                cursor: 'pointer'
              }}
              onClick={() => handleCardClick('faq')}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-lg">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Common Questions</h4>
                    <p className="text-gray-600">Frequently asked questions about our services and appointments</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">What to expect during your visit</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Insurance and billing information</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Appointment scheduling and preparation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Emergency contact information</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Remaining patient resource cards */}
            {patientResources.slice(2).map((resource, index) => (
              <div
                key={index + 2}
                className={`relative bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                } ${
                  activeResource === index + 2 ? 'ring-2 ring-blue-200 shadow-xl' : 'hover:shadow-lg'
                }`}
                style={{ 
                  transformOrigin: 'center',
                  willChange: 'transform',
                  transform: activeResource === index + 2 ? 'scale(1.02)' : 'scale(1)',
                  transitionDelay: `${300 + (index + 3) * 150}ms`,
                  cursor: resource.hasHoverCard ? 'pointer' : 'default'
                }}
                onClick={() => resource.hasHoverCard && handleCardClick('visit')}
              >
                <div className="flex items-start space-x-4 relative">
                  <div className={`bg-gradient-to-br ${resource.color} p-3 rounded-lg`}>
                    {resource.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{resource.title}</h4>
                      <p className="text-gray-600">{resource.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {resource.items.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Circular Start Button */}
                  {resource.hasWizard && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowIntakeWizard(true);
                      }}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold text-sm hover:scale-105 group"
                      style={{
                        boxShadow: '4px 4px 12px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        Start
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Emergency Contact */}
            <div className={`bg-red-50 border border-red-200 p-6 rounded-xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h4 className="text-lg font-semibold text-red-900 mb-3">Emergency Contact</h4>
              <p className="text-red-800 mb-4">
                For cardiac emergencies, call 000 immediately. For urgent non-emergency matters:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0391234567"
                  className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>(03) 9509 5009</span>
                </a>
                <a
                  href="mailto:reception@heartclinicmelbourne.com"
                  className="flex items-center justify-center space-x-2 border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Detail View Column */}
          <AnimatePresence>
            {activeDetail && (
              <motion.div 
                className="flex-shrink-0 pl-4"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '40%' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {activeDetail === 'visit' ? 'Before Your Visit' : 'Frequently Asked Questions'}
                    </h3>
                    <button
                      onClick={closeDetail}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {activeDetail === 'visit' && (
                    <div className="space-y-6 flex-1 overflow-y-auto">
                      <div>
                        <h5 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-blue-600" />
                          What to Bring
                        </h5>
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Medicare card and private health insurance details</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Referral letter from your GP</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">List of current medications</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Previous cardiac test results</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                          Appointment Tips
                        </h5>
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Arrive 15 minutes early</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Wear comfortable clothing</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Prepare questions for your doctor</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Call if you need to reschedule</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeDetail === 'faq' && (
                    <div className="flex-1 overflow-y-auto">
                      <div className="space-y-3 pr-2">
                        {faqData.map((faq, index) => {
                          const isExpanded = expandedFaqItems.has(index);
                          return (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleFaqItem(index)}
                                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                              >
                                <h5 className="font-semibold text-gray-800 text-sm">{faq.question}</h5>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex-shrink-0 ml-3"
                                >
                                  <ChevronRight className="w-4 h-4 text-gray-500" />
                                </motion.div>
                              </button>
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 py-3 bg-white">
                                      <p className="text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Right Section: Appointment Form */}
          <div>
              <div className={`bg-white border border-gray-200 p-8 pb-20 rounded-2xl shadow-xl transition-all duration-1000 delay-400 relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="/images/hcm3d2.png" 
                    alt="Heart Clinic Melbourne" 
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">Request An Appointment</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="0412 345 678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="order-1">
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      
                      {/* Mini Calendar Widget */}
                      <div className="mt-3 bg-white rounded-lg p-4 h-[200px] flex flex-col mb-32 md:mb-0">
                        <div className="flex items-center justify-between mb-3">
                          <button
                            type="button"
                            onClick={() => {
                              const newDate = new Date(calendarDate);
                              newDate.setMonth(newDate.getMonth() - 1);
                              setCalendarDate(newDate);
                            }}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4 text-teal-600" />
                          </button>
                          
                          <div className="text-sm font-medium text-teal-700">
                            {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const newDate = new Date(calendarDate);
                              newDate.setMonth(newDate.getMonth() + 1);
                              setCalendarDate(newDate);
                            }}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-teal-600" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-xs flex-1">
                          {/* Calendar Header */}
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                            <div key={idx} className="text-center text-gray-500 font-medium py-1">
                              {day}
                            </div>
                          ))}
                          
                          {/* Calendar Days */}
                          {(() => {
                            const today = new Date();
                            const currentMonth = calendarDate.getMonth();
                            const currentYear = calendarDate.getFullYear();
                            const firstDay = new Date(currentYear, currentMonth, 1);
                            const startDate = new Date(firstDay);
                            startDate.setDate(firstDay.getDate() - firstDay.getDay());
                            
                            const days = [];
                            for (let i = 0; i < 35; i++) {
                              const date = new Date(startDate);
                              date.setDate(startDate.getDate() + i);
                              
                              const isCurrentMonth = date.getMonth() === currentMonth;
                              const isToday = date.toDateString() === today.toDateString();
                              const isPast = date < today && !isToday;
                              const isSelected = formData.preferredDate === date.toISOString().split('T')[0];
                              
                              days.push(
                                <button
                                  key={i}
                                  type="button"
                                  disabled={isPast}
                                  onClick={() => {
                                    if (!isPast) {
                                      const selectedDate = new Date(date);
                                      setFormData({
                                        ...formData,
                                        preferredDate: selectedDate.toISOString().split('T')[0]
                                      });
                                    }
                                  }}
                                  className={`h-7 rounded text-xs transition-all duration-200 ${
                                    isPast
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : isSelected
                                      ? 'bg-teal-500 text-white shadow-sm'
                                      : isToday
                                      ? 'bg-teal-100 text-teal-700 font-medium hover:bg-teal-200'
                                      : isCurrentMonth
                                      ? 'text-teal-600 hover:bg-teal-50'
                                      : 'text-gray-400 hover:bg-gray-50'
                                  }`}
                                >
                                  {date.getDate()}
                                </button>
                              );
                            }
                            return days.slice(0, 35); // Show full 5 weeks
                          })()}
                        </div>
                      </div>
                    </div>
                    <div className="order-2">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Time
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: "9-11 AM", label: "9-11 AM", period: "Morning" },
                          { value: "11 AM-1 PM", label: "11 AM-1 PM", period: "Late Morning" },
                          { value: "1-3 PM", label: "1-3 PM", period: "Afternoon" },
                          { value: "3-5 PM", label: "3-5 PM", period: "Late Afternoon" }
                        ].map((timeSlot) => (
                          <button
                            key={timeSlot.value}
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                preferredTime: timeSlot.value
                              });
                            }}
                            className={`w-full px-4 py-3 text-left rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                              formData.preferredTime === timeSlot.value
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            <div>
                              <div className="font-medium">{timeSlot.label}</div>
                              <div className={`text-xs ${
                                formData.preferredTime === timeSlot.value ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {timeSlot.period}
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              formData.preferredTime === timeSlot.value ? 'bg-white' : 'bg-gray-300'
                            }`}></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Location *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {locations.map((location) => (
                        <button
                          key={location}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              preferredLocation: location,
                              preferredDoctor: '' // Reset doctor when location changes
                            });
                          }}
                          className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                            formData.preferredLocation === location
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Cardiologist
                    </label>
                    
                    {/* Doctor Pre-selection Notification */}
                    {doctorPreSelected && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Doctor and location have been pre-selected based on your choice!
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableDoctors.map((doctor) => (
                        <button
                          key={doctor.name}
                          type="button"
                          disabled={!formData.preferredLocation}
                          onClick={() => {
                            if (formData.preferredLocation) {
                              setFormData({
                                ...formData,
                                preferredDoctor: doctor.name
                              });
                            }
                          }}
                          className={`px-4 py-4 text-left rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                            !formData.preferredLocation
                              ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                              : formData.preferredDoctor === doctor.name
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {doctor.image ? (
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className={`w-12 h-12 rounded-full object-cover border-2 transition-all duration-200 ${
                                  formData.preferredDoctor === doctor.name
                                    ? 'border-white'
                                    : 'border-gray-300'
                                }`}
                              />
                            ) : (
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-200 ${
                                !formData.preferredLocation
                                  ? 'bg-gray-200 text-gray-400 border-gray-300'
                                  : formData.preferredDoctor === doctor.name
                                  ? 'bg-white text-blue-600 border-white'
                                  : 'bg-gray-100 text-gray-600 border-gray-300'
                              }`}>
                                ?
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm ${
                              !formData.preferredLocation
                                ? 'text-gray-400'
                                : formData.preferredDoctor === doctor.name
                                ? 'text-white'
                                : 'text-gray-900'
                            }`}>
                              {doctor.name}
                            </div>
                            <div className={`text-xs mt-1 ${
                              !formData.preferredLocation
                                ? 'text-gray-300'
                                : formData.preferredDoctor === doctor.name
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}>
                              {doctor.specialty}
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            formData.preferredDoctor === doctor.name ? 'bg-white' : 'bg-gray-300'
                          }`}></div>
                        </button>
                      ))}
                    </div>
                    {!formData.preferredLocation && (
                      <p className="text-sm text-gray-500 mt-2">Please select a location first to choose your preferred cardiologist.</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="localGP" className="block text-sm font-medium text-gray-700 mb-2">
                      Local GP
                    </label>
                    <input
                      type="text"
                      id="localGP"
                      name="localGP"
                      value={formData.localGP}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your GP's name and practice"
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Visit
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={4}
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Please describe your symptoms or reason for consultation..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Send Appointment Request</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>

                <p className="text-sm text-gray-600 mt-4 text-center">
                  Your email client will open with a pre-filled appointment request. Send the email and we'll contact you within 24 hours to confirm your appointment details.
                </p>
              </div>
        </div>        </motion.div>

        {/* Patient Intake Wizard */}
        {showIntakeWizard && (
          <Wizard onClose={() => setShowIntakeWizard(false)} />
        )}
      </div>
    </section>
  );
};

export default PatientInfo;