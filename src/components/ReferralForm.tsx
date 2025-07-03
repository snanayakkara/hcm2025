import React, { useState } from 'react';
import { X, FileText, User, Mail, MapPin, AlertCircle, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReferralFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralForm: React.FC<ReferralFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Referral Types
    referralTypes: [] as string[],
    
    // Patient Details
    patientName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    
    // Combined Clinical Information
    clinicalInformation: '',
    
    // Preferences
    preferredLocation: '',
    urgency: '',
    preferredCardiologist: '',
    additionalComments: '',
    
    // Referring Doctor Details
    doctorName: '',
    practiceName: '',
    doctorPhone: '',
    doctorEmail: '',
    providerNumber: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If location changes, reset cardiologist selection
    if (name === 'preferredLocation') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        preferredCardiologist: '' // Reset cardiologist when location changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleReferralTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      referralTypes: prev.referralTypes.includes(type)
        ? prev.referralTypes.filter(t => t !== type)
        : [...prev.referralTypes, type]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent('Patient Referral - Heart Clinic Melbourne');
    
    let body = `Dear Heart Clinic Melbourne Team,

I would like to refer a patient for cardiac consultation.

REFERRAL FOR:
${formData.referralTypes.length > 0 ? formData.referralTypes.join(', ') : 'Not specified'}

PATIENT DETAILS:
Patient Name: ${formData.patientName}
Date of Birth: ${formData.dateOfBirth}
Gender: ${formData.gender}
Address: ${formData.address}

Phone Number: ${formData.phoneNumber}

CLINICAL INFORMATION:
${formData.clinicalInformation}

PREFERRED LOCATION:
${formData.preferredLocation}

URGENCY:
${formData.urgency}

PREFERRED CARDIOLOGIST:
${formData.preferredCardiologist}

Additional Comments: ${formData.additionalComments}

Thank you for your assistance.

Dr. ${formData.doctorName}
${formData.practiceName}
${formData.doctorPhone}
${formData.doctorEmail}
Provider Number: ${formData.providerNumber}`;

    const encodedBody = encodeURIComponent(body);
    const mailtoLink = `mailto:reception@heartclinicmelbourne.com?subject=${subject}&body=${encodedBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close form
    onClose();
  };

  const locations = [
    "Cabrini Malvern",
    "Heart Clinic Pakenham", 
    "Casey Medical Centre, Clyde"
  ];

  const getDoctorsByLocation = (location: string) => {
    switch (location) {
      case "Cabrini Malvern":
        return [
          { 
            name: "Dr Mark Freilich", 
            image: "/images/freilich.png",
            specialty: "General and Interventional Cardiology",
            displayName: "Dr Mark Freilich (Interventional)"
          },
          { 
            name: "Associate Professor Alex Voskoboinik", 
            image: "/images/vosko.png",
            specialty: "General and Electrophysiology",
            displayName: "A/Prof Alex Voskoboinik (Electrophysiology)"
          },
          { 
            name: "Dr Shane Nanayakkara", 
            image: "/images/nanayakkara.png",
            specialty: "General, Intervention, Structural, and Heart Failure",
            displayName: "Dr Shane Nanayakkara (Interventional/Structural/Heart Failure)"
          },
          { 
            name: "No preference", 
            image: null,
            specialty: "Any available cardiologist",
            displayName: "No preference"
          }
        ];
      case "Heart Clinic Pakenham":
      case "Casey Medical Centre, Clyde":
        return [
          { 
            name: "Dr Mark Freilich", 
            image: "/images/freilich.png",
            specialty: "Interventional Cardiology",
            displayName: "Dr Mark Freilich (Interventional)"
          },
          { 
            name: "Associate Professor Alex Voskoboinik", 
            image: "/images/vosko.png",
            specialty: "Electrophysiology",
            displayName: "A/Prof Alex Voskoboinik (Electrophysiology)"
          },
          { 
            name: "Dr Phillip Ngu", 
            image: "/images/ngu.png",
            specialty: "General and Non-Invasive Imaging",
            displayName: "Dr Phillip Ngu (Imaging/General)"
          },
          { 
            name: "No preference", 
            image: null,
            specialty: "Any available cardiologist",
            displayName: "No preference"
          }
        ];
      default:
        return [{ name: "No preference", image: null, specialty: "Any available cardiologist", displayName: "No preference" }];
    }
  };

  const availableCardiologists = getDoctorsByLocation(formData.preferredLocation);

  const urgencyLevels = [
    {
      value: "Routine (4-6 weeks)",
      label: "Routine",
      timeframe: "4-6 weeks",
      color: "green",
      bgColor: "bg-green-600",
      hoverBg: "hover:bg-green-50",
      borderColor: "border-green-600",
      hoverBorder: "hover:border-green-300"
    },
    {
      value: "Semi-urgent (2-4 weeks)",
      label: "Semi-urgent",
      timeframe: "2-4 weeks", 
      color: "yellow",
      bgColor: "bg-yellow-600",
      hoverBg: "hover:bg-yellow-50",
      borderColor: "border-yellow-600",
      hoverBorder: "hover:border-yellow-300"
    },
    {
      value: "Urgent (within 1 week)",
      label: "Urgent",
      timeframe: "within 1 week",
      color: "red", 
      bgColor: "bg-red-600",
      hoverBg: "hover:bg-red-50",
      borderColor: "border-red-600",
      hoverBorder: "hover:border-red-300"
    }
  ];

  const genderOptions = [
    {
      value: "Male",
      label: "Male",
      icon: "♂"
    },
    {
      value: "Female", 
      label: "Female",
      icon: "♀"
    },
    {
      value: "Other",
      label: "Other",
      icon: "⚧"
    }
  ];

  const referralTypes = [
    {
      value: "Cardiology Consult",
      label: "Cardiology Consult",
      image: "/images/consult.png"
    },
    {
      value: "Resting Echocardiogram", 
      label: "Resting Echo",
      image: "/images/echo.png"
    },
    {
      value: "Stress Echocardiogram",
      label: "Stress Echo",
      image: "/images/stressecho.png"
    },
    {
      value: "Holter Monitor",
      label: "Holter Monitor",
      image: "/images/holter.png"
    },
    {
      value: "Pacemaker/Device Review",
      label: "Device Review",
      image: "/images/pacemaker.png"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-lg">
                    <img 
                      src="/images/hcm3d2.png" 
                      alt="Heart Clinic Melbourne" 
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Patient Referral Form</h2>
                    <p className="text-sm text-gray-600">Heart Clinic Melbourne</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Referral Types Section */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">What is this referral for? (choose all that apply)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {referralTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleReferralTypeToggle(type.value)}
                      className={`relative overflow-hidden px-6 py-8 text-sm font-medium rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-3 min-h-[120px] ${
                        formData.referralTypes.includes(type.value)
                          ? 'border-blue-600 shadow-lg transform scale-105'
                          : 'border-gray-300 hover:border-blue-300 hover:shadow-md'
                      }`}
                      style={{
                        backgroundImage: `url(${type.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Background overlay */}
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        formData.referralTypes.includes(type.value)
                          ? 'bg-blue-600/85'
                          : 'bg-white/75 hover:bg-white/60'
                      }`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center">
                        <span className={`text-lg text-center leading-tight font-bold transition-all duration-300 ${
                          formData.referralTypes.includes(type.value)
                            ? 'text-white'
                            : 'text-gray-800'
                        }`}>
                          {type.label}
                        </span>
                      </div>
                      
                      {/* Selection indicator */}
                      {formData.referralTypes.includes(type.value) && (
                        <div className="absolute top-2 right-2 z-20">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Select all services that apply. Multiple selections are allowed.
                </p>
              </section>

              {/* Patient Details Section */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      required
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {genderOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              gender: option.value
                            });
                          }}
                          className={`px-2 py-2.5 text-sm font-medium rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-1 ${
                            formData.gender === option.value
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <span className="text-base">{option.icon}</span>
                          <span className="text-xs">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0412 345 678"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </section>

              {/* Clinical Information Section */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Clinical Information</h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinical Information *
                  </label>
                  <textarea
                    name="clinicalInformation"
                    required
                    rows={8}
                    value={formData.clinicalInformation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please include:&#10;• Reason for referral&#10;• Relevant medical history&#10;• Current symptoms and duration&#10;• Current medications&#10;• Any examination findings (BP, HR, etc.)&#10;• Investigation results (ECG, Echo, Blood tests)&#10;• Any other relevant clinical information&#10;&#10;📎 IMPORTANT: Remember to attach any supporting documents (ECG, Echo reports, blood tests, etc.) when you send the email."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Include all relevant clinical information in one comprehensive note. <strong>Don't forget to attach supporting documents (ECG, Echo reports, blood tests) when sending the email.</strong>
                  </p>
                </div>
              </section>

              {/* Referral Preferences */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Referral Preferences</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Location
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
                              preferredCardiologist: '' // Reset cardiologist when location changes
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
                      Urgency
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {urgencyLevels.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              urgency: level.value
                            });
                          }}
                          className={`px-4 py-3 text-center rounded-lg border-2 transition-all duration-200 ${
                            formData.urgency === level.value
                              ? `${level.bgColor} text-white ${level.borderColor} shadow-md`
                              : `bg-white text-gray-700 border-gray-300 ${level.hoverBorder} ${level.hoverBg}`
                          }`}
                        >
                          <div className="font-medium text-sm">{level.label}</div>
                          <div className={`text-xs mt-1 ${
                            formData.urgency === level.value ? 'text-white/90' : 'text-gray-500'
                          }`}>
                            {level.timeframe}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Cardiologist
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableCardiologists.map((cardiologist) => (
                        <button
                          key={cardiologist.name}
                          type="button"
                          disabled={!formData.preferredLocation}
                          onClick={() => {
                            if (formData.preferredLocation) {
                              setFormData({
                                ...formData,
                                preferredCardiologist: cardiologist.displayName
                              });
                            }
                          }}
                          className={`px-4 py-4 text-left rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                            !formData.preferredLocation
                              ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                              : formData.preferredCardiologist === cardiologist.displayName
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {cardiologist.image ? (
                              <img
                                src={cardiologist.image}
                                alt={cardiologist.name}
                                className={`w-12 h-12 rounded-full object-cover border-2 transition-all duration-200 ${
                                  formData.preferredCardiologist === cardiologist.displayName
                                    ? 'border-white'
                                    : 'border-gray-300'
                                }`}
                              />
                            ) : (
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-200 ${
                                !formData.preferredLocation
                                  ? 'bg-gray-200 text-gray-400 border-gray-300'
                                  : formData.preferredCardiologist === cardiologist.displayName
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
                                : formData.preferredCardiologist === cardiologist.displayName
                                ? 'text-white'
                                : 'text-gray-900'
                            }`}>
                              {cardiologist.name}
                            </div>
                            <div className={`text-xs mt-1 ${
                              !formData.preferredLocation
                                ? 'text-gray-300'
                                : formData.preferredCardiologist === cardiologist.displayName
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}>
                              {cardiologist.specialty}
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            formData.preferredCardiologist === cardiologist.displayName ? 'bg-white' : 'bg-gray-300'
                          }`}></div>
                        </button>
                      ))}
                    </div>
                    {!formData.preferredLocation && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Please select a location first to see available cardiologists
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      name="additionalComments"
                      rows={3}
                      value={formData.additionalComments}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any additional information or special requests..."
                    />
                  </div>
                </div>
              </section>

              {/* Referring Doctor Details */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Referring Doctor Details</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Doctor Name *
                    </label>
                    <input
                      type="text"
                      name="doctorName"
                      required
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Dr. [Your Name]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      name="practiceName"
                      value={formData.practiceName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Practice name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="doctorPhone"
                      value={formData.doctorPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="doctorEmail"
                      value={formData.doctorEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider Number
                    </label>
                    <input
                      type="text"
                      name="providerNumber"
                      value={formData.providerNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provider Number"
                    />
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Referral</span>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Your email client will open with a pre-filled referral. Send the email and we'll contact you to confirm receipt and appointment details.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReferralForm;
