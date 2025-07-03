import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { FileText, Clock, Shield, CreditCard, Phone, Mail, ArrowRight, CheckCircle, Upload, X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { faqData } from '../data/faqData';

const PatientIntakeWizard = lazy(() => import('./Wizard/Wizard'));

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
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeResource, setActiveResource] = useState(0);
  const [showIntakeWizard, setShowIntakeWizard] = useState(false);
  const [showVisitInfo, setShowVisitInfo] = useState(false);
  const [showFaqInfo, setShowFaqInfo] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const sectionRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.includes('image/') || file.type === 'application/pdf';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      alert('Some files were not added. Please ensure files are images or PDFs under 10MB.');
    }
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
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

ATTACHMENTS:
${attachments.length > 0 
  ? attachments.map(file => `- ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`).join('\n')
  : 'No attachments'
}

Please contact me to confirm the appointment details.

Thank you,
${formData.name}`;

    const encodedBody = encodeURIComponent(body);
    const mailtoLink = `mailto:reception@heartclinicmelbourne.com?subject=${subject}&body=${encodedBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Optional: Still log for debugging
    console.log('Form submitted:', formData);
    console.log('Attachments:', attachments);
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
    "Casey Medical Centre, Clyde"
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
      case "Casey Medical Centre, Clyde":
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
      default:
        return [{ name: "No preference", image: null, specialty: "Any available cardiologist" }];
    }
  };

  const availableDoctors = getDoctorsByLocation(formData.preferredLocation);

  return (
    <section id="patients" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Patient Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for your visit, from scheduling to insurance and what to expect during your consultation. Click a card for more information.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:items-start">
          {/* Patient Resources */}
          <div className="flex flex-col space-y-8 relative z-10">
            {patientResources.map((resource, index) => (
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
                  transitionDelay: `${300 + index * 150}ms`
                }}
                onMouseEnter={() => resource.hasHoverCard && setShowVisitInfo(true)}
                onMouseLeave={() => resource.hasHoverCard && setShowVisitInfo(false)}
              >
                <div className="flex items-start space-x-4">
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
                        <li key={idx} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                          {resource.hasWizard && idx === 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowIntakeWizard(true);
                              }}
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                            >
                              Start
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Floating "Before Your Visit" Card */}
                {resource.hasHoverCard && showVisitInfo && (
                  <div className="absolute left-full top-0 ml-4 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 z-[99999] animate-in slide-in-from-left-2 duration-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Before Your Visit</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-gray-800 text-sm mb-3">What to Bring</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">Medicare card and private health insurance details</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">Referral letter from your GP</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">List of current medications</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">Previous cardiac test results</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-800 text-sm mb-3">Appointment Tips</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">Arrive 15 minutes early</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">Wear comfortable clothing</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">Prepare questions for your doctor</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">Call if you need to reschedule</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Arrow pointing to the card */}
                    <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white transform -translate-x-2"></div>
                    <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-200 transform -translate-x-3"></div>
                  </div>
                )}
              </div>
            ))}

            {/* Common Questions Card */}
            <div
              className={`relative bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              } hover:scale-102`}
              style={{ transitionDelay: `${300 + patientResources.length * 150}ms` }}
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
                setShowFaqInfo(true);
              }}
              onMouseLeave={() => {
                hoverTimeoutRef.current = setTimeout(() => {
                  setShowFaqInfo(false);
                }, 200);
              }}
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

              {/* Floating FAQ Card */}
              {showFaqInfo && (
                <div 
                  className="absolute left-full top-0 ml-4 w-[32rem] bg-white border border-gray-200 rounded-xl shadow-2xl p-6 z-[99999] animate-in slide-in-from-left-2 duration-200 max-h-96 overflow-y-auto"
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                    }
                  }}
                  onMouseLeave={() => {
                    hoverTimeoutRef.current = setTimeout(() => {
                      setShowFaqInfo(false);
                    }, 200);
                  }}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h4>
                  
                  <div className="space-y-4">
                    {faqData.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4">
                        <h5 className="font-semibold text-gray-800 text-sm mb-2">{faq.question}</h5>
                        <p className="text-sm text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>

                  {/* Arrow pointing to the card */}
                  <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white transform -translate-x-2"></div>
                  <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-200 transform -translate-x-3"></div>
                </div>
              )}
            </div>

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

          {/* Appointment Form */}
          <div className={`bg-white border border-gray-200 p-8 rounded-2xl shadow-xl transition-all duration-1000 delay-400 relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
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
                  <div className="mt-3 bg-gray-50 rounded-lg p-4 h-[200px] flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(calendarDate);
                          newDate.setMonth(newDate.getMonth() - 1);
                          setCalendarDate(newDate);
                        }}
                        className="p-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <div className="text-sm font-medium text-gray-700">
                        {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(calendarDate);
                          newDate.setMonth(newDate.getMonth() + 1);
                          setCalendarDate(newDate);
                        }}
                        className="p-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
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
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : isToday
                                  ? 'bg-blue-100 text-blue-600 font-medium hover:bg-blue-200'
                                  : isCurrentMonth
                                  ? 'text-gray-700 hover:bg-blue-50'
                                  : 'text-gray-400 hover:bg-gray-100'
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
                <div>
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
                <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Your Referral
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="attachments"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF or Image files (MAX. 10MB each)</p>
                      </div>
                      <input
                        id="attachments"
                        name="attachments"
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {/* Display selected files */}
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected files:</p>
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700 truncate max-w-xs">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
        </div>

        {/* Patient Intake Wizard */}
        {showIntakeWizard && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 flex items-center space-x-3">
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="text-gray-700">Loading intake form...</span>
              </div>
            </div>
          }>
            <PatientIntakeWizard onClose={() => setShowIntakeWizard(false)} />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default PatientInfo;