import React, { useState } from 'react';
import { X, Send, FileText, Download, Printer, ChevronDown } from 'lucide-react';
import Button from './ui/Button';

interface ReferralFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralForm: React.FC<ReferralFormProps> = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    // Referral Types
    referralTypes: [] as string[],
    stressEchoCategory: '',
    stressEchoIndications: [] as string[],
    
    // Patient Details
    patientName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
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
        : [...prev.referralTypes, type],
      // Clear stress echo data if stress echo is deselected
      stressEchoCategory: type === 'Stress Echocardiogram' && prev.referralTypes.includes(type)
        ? ''
        : prev.stressEchoCategory,
      stressEchoIndications: type === 'Stress Echocardiogram' && prev.referralTypes.includes(type)
        ? []
        : prev.stressEchoIndications
    }));
  };

  const handleStressEchoCategorySelect = (category: string) => {
    setFormData(prev => ({
      ...prev,
      stressEchoCategory: category,
      stressEchoIndications: [] // Clear previous indications when changing category
    }));
  };

  const handleStressEchoIndicationToggle = (indication: string) => {
    setFormData(prev => ({
      ...prev,
      stressEchoIndications: prev.stressEchoIndications.includes(indication)
        ? prev.stressEchoIndications.filter(i => i !== indication)
        : [...prev.stressEchoIndications, indication]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent('Patient Referral - Heart Clinic Melbourne');
    
    const body = `Dear Heart Clinic Melbourne Team,

I would like to refer a patient for cardiac consultation.

REFERRAL FOR:
${formData.referralTypes.length > 0 ? formData.referralTypes.join(', ') : 'Not specified'}

${formData.referralTypes.includes('Stress Echocardiogram') && formData.stressEchoCategory && formData.stressEchoIndications.length > 0 ? `STRESS ECHO INDICATIONS:
Category: ${stressEchoCategories.find(cat => cat.id === formData.stressEchoCategory)?.label}
${formData.stressEchoIndications.map(indication => `• ${indication}`).join('\n')}` : ''}

PATIENT DETAILS:
Patient Name: ${formData.patientName}
Date of Birth: ${formData.dateOfBirth}
Gender: ${formData.gender}
Email: ${formData.email}

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
    "Casey Specialist Centre, Clyde"
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
            name: "Dr Kate Rowe", 
            image: "/images/kate2png.png",
            specialty: "General Cardiology",
            displayName: "Dr Kate Rowe (General)"
          },
          { 
            name: "No preference", 
            image: null,
            specialty: "Any available cardiologist",
            displayName: "No preference"
          }
        ];
      case "Heart Clinic Pakenham":
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
            name: "Dr Kate Rowe", 
            image: "/images/kate2png.png",
            specialty: "General Cardiology",
            displayName: "Dr Kate Rowe (General)"
          },
          { 
            name: "No preference", 
            image: null,
            specialty: "Any available cardiologist",
            displayName: "No preference"
          }
        ];
      case "Casey Specialist Centre, Clyde":
        return [
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

  const stressEchoCategories = [
    {
      id: "ischaemia",
      label: "Suspected Myocardial Ischaemia",
      icon: "📍",
      indications: [
        "Chest, neck, jaw, shoulder, or arm discomfort",
        "Symptoms triggered by exertion and relieved by rest or GTN (≤5 minutes)",
        "Exertional shortness of breath of unclear cause",
        "Abnormal ECG suggestive of ischaemia (no known coronary artery disease)",
        "Known coronary artery disease with new or worsening symptoms",
        "CT coronary angiogram shows plaque or possible functionally significant lesions",
        "Suspected silent ischaemia or unclear symptom history (e.g., cognitive impairment, language difficulty)"
      ]
    },
    {
      id: "valvular",
      label: "Valvular or Structural Heart Disease",
      icon: "🫀",
      indications: [
        "Known or suspected valvular disease (e.g., severe aortic stenosis, significant aortic/mitral regurgitation)",
        "Assessing functional impact of valve disease (e.g., exercise-induced regurgitation or symptoms)",
        "Congenital heart disease post-surgery, assessing for residual ischaemia"
      ]
    },
    {
      id: "preop",
      label: "Pre-operative Assessment",
      icon: "🏥",
      indications: [
        "Intermediate or high-risk non-cardiac surgery and poor functional capacity (<4 METs) plus one of the following:",
        "  • Ischaemic heart disease",
        "  • Previous myocardial infarction",
        "  • Heart failure",
        "  • Stroke or TIA",
        "  • Insulin-treated diabetes",
        "  • Renal impairment (creatinine >170 µmol/L or eGFR <60 mL/min)"
      ]
    }
  ];

  const getCurrentCategoryIndications = () => {
    const category = stressEchoCategories.find(cat => cat.id === formData.stressEchoCategory);
    return category ? category.indications : [];
  };

  const handleDownloadPDF = () => {
    // Open the PDF in a new tab for download
    window.open('/A4-Referral-Pad-update-Feb-2023.pdf', '_blank');
  };

  const handlePrintPDF = () => {
    // Open PDF in new window and trigger print dialog
    const printWindow = window.open('/A4-Referral-Pad-update-Feb-2023.pdf', '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

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

  return isOpen ? (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl border border-gray-200"
           onClick={e => e.stopPropagation()}>
        
        {!showForm ? (
          // Initial Screen with PDF and Form Options
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-6 mb-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/hcm3d2.png" 
                  alt="Heart Clinic Melbourne Logo" 
                  className="h-10 w-10"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Patient Referral</h2>
                  <p className="text-gray-600">Choose your preferred method</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Option Cards */}
            <div className="space-y-6">
              
              {/* PDF Option */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">PDF Referral Form</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Download or print our traditional PDF referral form. Perfect for printing and filling out by hand, 
                      or for practices that prefer paper-based workflows.
                    </p>
                  </div>
                </div>
                
                {/* Split Button for PDF */}
                <div className="flex rounded-xl overflow-hidden shadow-md">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </button>
                  <div className="w-px bg-blue-700"></div>
                  <button
                    onClick={handlePrintPDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-4 transition-colors duration-200 flex items-center justify-center"
                    title="Print PDF"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 font-medium">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Online Form Option */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-100 rounded-2xl p-6 border border-teal-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-teal-500 p-3 rounded-xl">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fill Form Online</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Complete the referral form digitally with guided fields, smart suggestions, and automatic email formatting. 
                      Faster and more accurate than paper forms.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="bg-white/70 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">Smart Validation</span>
                      <span className="bg-white/70 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">Auto Email</span>
                      <span className="bg-white/70 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">No Printing</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <span>Fill Form Online</span>
                  <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                </button>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <strong>Note:</strong> Both methods will create a referral that can be sent to{' '}
                <span className="font-medium text-teal-600">reception@heartclinicmelbourne.com</span>
              </p>
            </div>
          </div>
        ) : (
          // Existing Form Content
          <>
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1 hover:bg-gray-100 rounded mr-2 transition-colors"
                  title="Back to options"
                >
                  <ChevronDown className="w-5 h-5 rotate-90 text-gray-600" />
                </button>
                <img 
                  src="/images/hcm3d2.png" 
                  alt="Heart Clinic Melbourne Logo" 
                  className="h-8 w-8"
                />
                <h2 className="text-lg font-semibold text-black">Patient Referral Form for Referring Doctors</h2>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Referral Types */}
          <div>
            <label className="block mb-4 font-medium text-gray-900">What is this referral for? (select all that apply)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {referralTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleReferralTypeToggle(type.value)}
                  className={`relative overflow-hidden w-full px-2 py-3 text-xs font-medium rounded-lg border-2 transition-all duration-300 min-h-[80px] ${
                    formData.referralTypes.includes(type.value)
                      ? 'border-blue-600 shadow-lg'
                      : 'border-gray-300 hover:border-blue-300 hover:shadow-md'
                  }`}
                  style={{
                    height: '80px'
                  }}
                >
                  {/* Blurred background image */}
                  <div 
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundImage: `url(${type.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'blur(2px)'
                    }}
                  />
                  
                  {/* Background overlay */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    formData.referralTypes.includes(type.value)
                      ? 'bg-blue-600/85'
                      : 'bg-white/75 hover:bg-white/95'
                  }`} style={{
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)'
                  }}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className={`text-sm text-center leading-tight font-bold transition-all duration-300 ${
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
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
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
            
            {/* Stress Echo Category Selection */}
            {formData.referralTypes.includes("Stress Echocardiogram") && (
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Please select the clinical category for Stress Echocardiogram:
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {stressEchoCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleStressEchoCategorySelect(category.id)}
                      className={`px-3 py-2.5 text-xs font-medium rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-1 flex-1 min-w-0 ${
                        formData.stressEchoCategory === category.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-sm">{category.icon}</span>
                      <span className="text-center leading-tight">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stress Echo Detailed Indications Checklist */}
            {formData.referralTypes.includes("Stress Echocardiogram") && formData.stressEchoCategory && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <span>{stressEchoCategories.find(cat => cat.id === formData.stressEchoCategory)?.icon}</span>
                  <span>{stressEchoCategories.find(cat => cat.id === formData.stressEchoCategory)?.label}</span>
                </h4>
                <div className="space-y-2">
                  {getCurrentCategoryIndications().map((indication, index) => (
                    <div key={index}>
                      {indication.startsWith('  • ') ? (
                        // Sub-point - no checkbox, just display as indented text
                        <div className="ml-6 text-sm text-gray-600 leading-5">
                          {indication}
                        </div>
                      ) : (
                        // Main point - checkbox
                        <label className="flex items-start space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.stressEchoIndications.includes(indication)}
                            onChange={() => handleStressEchoIndicationToggle(indication)}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 leading-5">{indication}</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestion for Cardiology Consult when Stress Echo is selected */}
            {formData.referralTypes.includes("Stress Echocardiogram") && 
             !formData.referralTypes.includes("Cardiology Consult") && (
              <div 
                className="mt-4 p-3 border border-gray-300 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer animate-pulse"
                style={{
                  backgroundImage: "url(/images/consult.png)",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => handleReferralTypeToggle("Cardiology Consult")}
              >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-white/75 hover:bg-white/95 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-lg text-gray-800 font-bold">
                      Note: If you would also like your patient to have a bulk-billed consultation with Dr. Ngu, please click here. 
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Patient Details */}
          <div>
            <h3 className="font-medium mb-4 text-gray-900">Patient Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Patient Name *</label>
                <input
                  type="text"
                  name="patientName"
                  required
                  value={formData.patientName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-sm text-gray-700">Gender</label>
                <div className="flex gap-2 flex-wrap">
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
                      className={`px-3 py-2.5 text-sm font-medium rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-1 flex-1 min-w-0 ${
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
                <label className="block mb-1 font-medium text-sm text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="0412 345 678"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="patient@example.com"
                />
              </div>
            </div>
          </div>

          {/* Clinical Information */}
          <div>
            <h3 className="font-medium mb-4 text-gray-900">Clinical Information</h3>
            <div>
              <label className="block mb-1 font-medium text-sm text-gray-700">Clinical Information *</label>
              <textarea
                name="clinicalInformation"
                required
                rows={8}
                value={formData.clinicalInformation}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Please include:
• Reason for referral
• Relevant medical history
• Current symptoms and duration
• Current medications
• Any examination findings (BP, HR, etc.)
• Investigation results (ECG, Echo, Blood tests)
• Any other relevant clinical information

📎 IMPORTANT: Remember to attach any supporting documents (ECG, Echo reports, blood tests, etc.) when you send the email."
              />
              <p className="text-xs text-gray-500 mt-2">
                Include all relevant clinical information in one comprehensive note. <strong>Don't forget to attach supporting documents (ECG, Echo reports, blood tests) when sending the email.</strong>
              </p>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="font-medium mb-4 text-gray-900">Referral Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-3 font-medium text-sm text-gray-700">Preferred Location</label>
                <div className="flex gap-2 flex-wrap">
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
                      className={`px-3 py-2.5 text-xs font-medium rounded-lg border-2 transition-all duration-200 flex items-center justify-center flex-1 min-w-0 ${
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
                <label className="block mb-3 font-medium text-sm text-gray-700">Urgency</label>
                <div className="flex gap-2 flex-wrap">
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
                      className={`px-3 py-2.5 text-center rounded-lg border-2 transition-all duration-200 flex-1 min-w-0 ${
                        formData.urgency === level.value
                          ? `${level.bgColor} text-white ${level.borderColor} shadow-md`
                          : `bg-white text-gray-700 border-gray-300 ${level.hoverBorder} ${level.hoverBg}`
                      }`}
                    >
                      <div className="font-medium text-xs">{level.label}</div>
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
                <label className="block mb-3 font-medium text-sm text-gray-700">Preferred Cardiologist</label>
                <div className="grid grid-cols-1 gap-3">
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
                  <p className="text-xs text-gray-500 mt-2">
                    Please select a location first to see available cardiologists
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Additional Comments</label>
                <textarea
                  name="additionalComments"
                  rows={3}
                  value={formData.additionalComments}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Any additional information or special requests..."
                />
              </div>
            </div>
          </div>

          {/* Referring Doctor Details */}
          <div>
            <h3 className="font-medium mb-4 text-gray-900">Referring Doctor Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Doctor Name *</label>
                <input
                  type="text"
                  name="doctorName"
                  required
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Dr. [Your Name]"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Practice Name</label>
                <input
                  type="text"
                  name="practiceName"
                  value={formData.practiceName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Practice name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="doctorPhone"
                  value={formData.doctorPhone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Contact number"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="doctorEmail"
                  value={formData.doctorEmail}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">Provider Number</label>
                <input
                  type="text"
                  name="providerNumber"
                  value={formData.providerNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Provider Number"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button
              variant="secondary"
              size="medium"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="medium"
              icon={Send}
              type="submit"
              className="flex-1"
            >
              Send Referral
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Your email client will open with a pre-filled referral. Send the email and we'll contact you to confirm receipt and appointment details.
          </p>
        </form>
        </>
        )}
      </div>
    </div>
  ) : null;
};

export default ReferralForm;