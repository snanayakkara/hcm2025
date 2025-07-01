import React, { useState, useEffect, useRef } from 'react';
import { FileText, Clock, Shield, CreditCard, Phone, Mail, ArrowRight, CheckCircle, Upload, X } from 'lucide-react';

const PatientInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
    preferredDoctor: '',
    localGP: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeResource, setActiveResource] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    // Handle form submission
    console.log('Form submitted:', formData);
    console.log('Attachments:', attachments);
    alert('Thank you! We will contact you shortly to confirm your appointment.');
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
      description: "Download and complete forms before your visit",
      items: ["New Patient Registration", "Medical History Form", "Insurance Information", "Consent Forms"],
      color: "from-blue-100 to-indigo-100"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "What to Expect",
      description: "Prepare for your appointment with us",
      items: ["Initial Consultation (20 min)", "Diagnostic Tests if needed", "Treatment Plan Discussion", "Follow-up Scheduling"],
      color: "from-emerald-100 to-teal-100"
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

  const doctors = [
    "Dr Mark Freilich",
    "Dr Phillip Ngu", 
    "Associate Professor Alex Voskoboinik",
    "Dr Shane Nanayakkara",
    "No preference"
  ];

  return (
    <section id="patients" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Patient Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for your visit, from scheduling to insurance and what to expect during your consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Patient Resources */}
          <div className="space-y-8">
            <h3 className={`text-2xl font-bold text-gray-900 mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              Patient Resources
            </h3>
            
            {patientResources.map((resource, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                } ${
                  activeResource === index ? 'scale-105 ring-2 ring-blue-200' : 'hover:scale-102'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
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
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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

          {/* Appointment Form */}
          <div className={`bg-white border border-gray-200 p-8 rounded-2xl shadow-xl transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Appointment</h3>
            
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
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="preferredDoctor" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Doctor
                </label>
                <select
                  id="preferredDoctor"
                  name="preferredDoctor"
                  value={formData.preferredDoctor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select preferred doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
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
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4 text-center">
              We'll contact you within 24 hours to confirm your appointment details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientInfo;