import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, ChevronRight, User, FileText } from 'lucide-react';
import Button from '../ui/Button';

interface MobileReferralFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileReferralForm: React.FC<MobileReferralFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Essential fields only for mobile
    referralType: '',
    patientName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    clinicalReason: '',
    urgency: '',
    doctorName: '',
    doctorPhone: '',
    doctorEmail: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent('Mobile Referral - Heart Clinic Melbourne');
    
    const body = `Dear Heart Clinic Melbourne Team,

I would like to refer a patient for cardiac consultation.

REFERRAL TYPE: ${formData.referralType}

PATIENT DETAILS:
Name: ${formData.patientName}
Date of Birth: ${formData.dateOfBirth}
Phone: ${formData.phoneNumber}
Email: ${formData.email}

CLINICAL REASON:
${formData.clinicalReason}

URGENCY: ${formData.urgency}

REFERRING DOCTOR:
Dr. ${formData.doctorName}
Phone: ${formData.doctorPhone}
Email: ${formData.doctorEmail}

Sent via Mobile Quick Referral

Thank you for your assistance.`;

    const encodedBody = encodeURIComponent(body);
    const mailtoLink = `mailto:reception@heartclinicmelbourne.com?subject=${subject}&body=${encodedBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close form
    onClose();
  };

  const referralTypes = [
    { value: 'Cardiology Consult', label: 'Cardiology Consult', icon: '🩺' },
    { value: 'Resting Echo', label: 'Resting Echo', icon: '📊' },
    { value: 'Stress Echo', label: 'Stress Echo', icon: '🏃' },
    { value: 'Holter Monitor', label: 'Holter Monitor', icon: '📱' },
    { value: 'Device Review', label: 'Device Review', icon: '🔋' },
  ];

  const urgencyLevels = [
    { value: 'Routine (4-6 weeks)', label: 'Routine', timeframe: '4-6 weeks', color: 'teal' },
    { value: 'Semi-urgent (2-4 weeks)', label: 'Semi-urgent', timeframe: '2-4 weeks', color: 'yellow' },
    { value: 'Urgent (within 1 week)', label: 'Urgent', timeframe: 'within 1 week', color: 'red' },
  ];

  const steps = [
    {
      title: 'Referral Type',
      icon: FileText,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">What type of referral is this?</p>
          <div className="space-y-2">
            {referralTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, referralType: type.value }))}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.referralType === type.value
                    ? 'border-teal-600 bg-teal-50 text-teal-900'
                    : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-medium">{type.label}</span>
                </div>
                {formData.referralType === type.value && (
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Patient Info',
      icon: User,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
            <input
              type="text"
              name="patientName"
              required
              value={formData.patientName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0412 345 678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="patient@example.com"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Clinical Details',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Referral *</label>
            <textarea
              name="clinicalReason"
              required
              rows={6}
              value={formData.clinicalReason}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Please include:
• Reason for referral
• Relevant medical history
• Current symptoms
• Current medications
• Examination findings"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
            <div className="space-y-2">
              {urgencyLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, urgency: level.value }))}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.urgency === level.value
                      ? `border-${level.color}-600 bg-${level.color}-50 text-${level.color}-900`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="font-medium text-left">{level.label}</div>
                    <div className="text-sm text-gray-500">{level.timeframe}</div>
                  </div>
                  {formData.urgency === level.value && (
                    <div className={`w-6 h-6 bg-${level.color}-600 rounded-full flex items-center justify-center`}>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Your Details',
      icon: User,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
            <input
              type="text"
              name="doctorName"
              required
              value={formData.doctorName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Dr. [Your Name]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
            <input
              type="tel"
              name="doctorPhone"
              value={formData.doctorPhone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Email Address</label>
            <input
              type="email"
              name="doctorEmail"
              value={formData.doctorEmail}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.referralType !== '';
      case 1:
        return formData.patientName !== '' && formData.dateOfBirth !== '';
      case 2:
        return formData.clinicalReason !== '';
      case 3:
        return formData.doctorName !== '';
      default:
        return true;
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center md:items-center">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white w-full max-w-md h-[90vh] md:h-auto md:max-h-[90vh] md:rounded-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/hcm3d2.png" 
              alt="Heart Clinic Melbourne" 
              className="h-8 w-8"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Quick Referral</h2>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-teal-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-gray-700">
              {steps[currentStep].title}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].content}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex space-x-3">
            {currentStep > 0 && (
              <Button
                variant="secondary"
                size="medium"
                onClick={prevStep}
                className="flex-1"
              >
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                variant="primary"
                size="medium"
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex-1"
                icon={ChevronRight}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                size="medium"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex-1"
                icon={Send}
              >
                Send Referral
              </Button>
            )}
          </div>
          {currentStep === steps.length - 1 && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Your email client will open with a pre-filled referral
            </p>
          )}
        </div>
      </motion.div>
    </div>
  ) : null;
};

export default MobileReferralForm;