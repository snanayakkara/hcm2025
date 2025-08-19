import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, Clock, Search, MapPin, ArrowRight, Phone, FileText } from 'lucide-react';
import { ServiceItem } from '../../types/common';
import { DEFAULT_VIEWPORT } from '../../lib/motion';

const MobileServiceCards: React.FC = () => {
  const [selectedService, setSelectedService] = useState(0);

  // Educational content mapping removed - Learning Library moved to separate site

  const services = [
    {
      id: 'consultation',
      title: 'Consultation',
      subtitle: 'Expert Assessment',
      description: 'A comprehensive cardiac consultation is your first step towards understanding and managing your heart health. Our experienced cardiologists will review your medical history, perform a thorough examination, and discuss your symptoms and concerns.',
      icon: Stethoscope,
      color: 'from-primary-500 to-primary-600',
      image: '/images/consult.png',
      duration: '30 minutes',
      preparation: 'Minimal preparation required',
      locations: ['Cabrini Malvern', 'Pakenham', 'Clyde'],
      cost: 'Medicare rebates available'
    },
    {
      id: 'echocardiography',
      title: 'Echocardiography',
      subtitle: 'Heart Imaging',
      description: 'Echocardiography uses ultrasound waves to create detailed images of your heart. This non-invasive test allows us to assess heart function, valve performance, and detect structural abnormalities.',
      icon: Activity,
      color: 'from-accent-500 to-accent-600',
      image: '/images/echo.png',
      duration: '30-45 minutes',
      preparation: 'Comfortable clothing recommended',
      locations: ['Pakenham', 'Clyde'],
      cost: 'Bulk billed for eligible patients'
    },
    {
      id: 'holter',
      title: '24 Hour Holter Monitoring',
      subtitle: 'Rhythm Monitoring',
      description: 'Holter monitoring involves wearing a small, portable device that continuously records your heart rhythm for 24 hours. This helps detect irregular heartbeats that may not occur during a brief office visit.',
      icon: Clock,
      color: 'from-sage-500 to-sage-600',
      image: '/images/holter.png',
      duration: '24 hours continuous',
      preparation: 'Normal daily activities',
      locations: ['Cabrini Malvern', 'Pakenham', 'Clyde'],
      cost: 'Medicare rebates available'
    },
    {
      id: 'angiography',
      title: 'Coronary Angiography',
      subtitle: 'Advanced Imaging',
      description: 'Coronary angiography is a specialised X-ray procedure that uses contrast dye to visualise the coronary arteries. This gold-standard test can detect blockages and assess the need for intervention.',
      icon: Heart,
      color: 'from-primary-500 to-primary-600',
      image: '/images/angio.png',
      duration: '30-60 minutes',
      preparation: 'Fasting required',
      locations: ['Cabrini Malvern', 'Berwick'],
      cost: 'Hospital admission may be required'
    },
    {
      id: 'stress-echo',
      title: 'Stress Echocardiography',
      subtitle: 'Stress Testing',
      description: 'Stress echocardiography combines ultrasound imaging with stress testing to evaluate heart function under stress conditions. This helps detect coronary artery disease and assess exercise capacity.',
      icon: Activity,
      color: 'from-accent-500 to-accent-600',
      image: '/images/stressecho.png',
      duration: '60-90 minutes',
      preparation: 'Comfortable exercise clothing required',
      locations: ['Pakenham', 'Clyde'],
      cost: 'Medicare rebates available'
    },
    {
      id: 'toe',
      title: 'Transoesophageal Echo (TOE)',
      subtitle: 'Advanced Imaging',
      description: 'TOE provides superior cardiac images by placing an ultrasound probe in the oesophagus. This advanced technique offers detailed views of heart structures, particularly useful for valve assessment and detecting blood clots.',
      icon: Search,
      color: 'from-sage-500 to-sage-600',
      image: '/images/toe_drawn.png',
      duration: '30-45 minutes',
      preparation: 'Fasting required, light sedation available',
      locations: ['Cabrini Malvern', 'Berwick'],
      cost: 'Day procedure charges apply'
    },
    {
      id: 'toe-dcr',
      title: 'TOE-Guided Cardioversion',
      subtitle: 'Rhythm Restoration',
      description: 'TOE-guided cardioversion combines transesophageal echocardiography with electrical cardioversion to safely restore normal heart rhythm in patients with atrial fibrillation.',
      icon: Zap,
      color: 'from-cream-700 to-cream-800',
      image: '/images/cardioversion.jpg',
      duration: '2-3 hours including recovery',
      preparation: 'Fasting and pre-procedure assessments required',
      locations: ['Cabrini Malvern', 'Berwick'],
      cost: 'Day procedure charges apply'
    },
    {
      id: 'af-ablation',
      title: 'Atrial Fibrillation Ablation',
      subtitle: 'Advanced Treatment',
      description: 'Catheter ablation for atrial fibrillation uses advanced techniques including the latest Pulsed Field Ablation (PFA) technology to eliminate abnormal electrical pathways causing irregular heart rhythm.',
      icon: Zap,
      color: 'from-primary-500 to-primary-600',
      image: '/images/afabl_drawn.png',
      duration: '3-5 hours',
      preparation: 'Hospital admission required',
      locations: ['Cabrini Malvern', 'Berwick'],
      cost: 'Overnight hospital admission required'
    },
    {
      id: 'tavi',
      title: 'TAVI',
      subtitle: 'Valve Replacement',
      description: 'TAVI is a minimally invasive procedure to replace a diseased aortic valve without open heart surgery. A new valve is delivered via catheter, typically through the groin artery.',
      icon: Heart,
      color: 'from-accent-500 to-accent-600',
      image: '/images/tavi.png',
      duration: '2-3 hours',
      preparation: 'Comprehensive pre-procedure assessment required',
      locations: ['Cabrini Malvern'],
      cost: 'Private health insurance recommended'
    },
    {
      id: 'mteer',
      title: 'Mitral TEER',
      subtitle: 'Valve Repair',
      description: 'mTEER is a minimally invasive procedure to repair a leaking mitral valve using advanced clip technology. This procedure can significantly improve symptoms without open heart surgery.',
      icon: Heart,
      color: 'from-sage-500 to-sage-600',
      image: '/images/mteer_drawn.png',
      duration: '2-4 hours',
      preparation: 'Multidisciplinary team assessment required',
      locations: ['Cabrini Malvern'],
      cost: 'Private health insurance recommended'
    },
    {
      id: 'pacemaker',
      title: 'Pacemaker Insertion',
      subtitle: 'Device Implantation',
      description: 'Pacemaker insertion is a procedure to implant a small electronic device that helps regulate your heart rhythm. The pacemaker monitors your heart rate and delivers electrical impulses when needed to maintain a normal rhythm.',
      icon: Zap,
      color: 'from-cream-700 to-cream-800',
      image: '/images/pacemaker.png',
      duration: '1-2 hours',
      preparation: 'Day procedure or overnight stay',
      locations: ['Cabrini Malvern', 'Berwick'],
      cost: 'Private health insurance recommended'
    },
  ];

  const handleServiceSelect = (service: ServiceItem) => {
    // Could navigate to service detail page or open modal
  };

  const handleLearnMore = () => {
    // Learning Library has been moved to a separate site
  };

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.6 }}
          className="mobile-text-xl font-bold text-gray-900 mb-2"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mobile-text-sm text-gray-600 max-w-sm mx-auto"
        >
          Comprehensive cardiac care with cutting-edge technology
        </motion.p>
      </div>

      {/* Service Selection Menu */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {services.slice(0, 9).map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(index)}
                className={`relative p-3 rounded-xl transition-all duration-300 ${
                  selectedService === index
                    ? 'bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className={`text-xs font-medium text-center leading-tight ${
                    selectedService === index ? 'text-white' : 'text-gray-700'
                  }`}>
                    {service.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
          
          {/* Additional services in a second row */}
          <div className="grid grid-cols-2 gap-3">
            {services.slice(9).map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(index + 9)}
                className={`relative p-3 rounded-xl transition-all duration-300 ${
                  selectedService === index + 9
                    ? 'bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className={`text-xs font-medium text-center leading-tight ${
                    selectedService === index + 9 ? 'text-white' : 'text-gray-700'
                  }`}>
                    {service.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Service Detail Card */}
      <motion.div
        key={selectedService}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${services[selectedService].color} p-6 flex items-center space-x-4`}>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            {React.createElement(services[selectedService].icon, { className: "w-8 h-8 text-white" })}
          </div>
          <div className="text-white flex-1">
            <h3 className="font-bold text-xl">{services[selectedService].title}</h3>
            <p className="text-white/90 text-base">{services[selectedService].subtitle}</p>
          </div>
        </div>

        {/* Service Image */}
        <div className="aspect-video bg-gray-50 overflow-hidden">
          <img 
            src={services[selectedService].image} 
            alt={services[selectedService].title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-700 text-base leading-relaxed">
            {services[selectedService].description}
          </p>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Duration</span>
              </div>
              <p className="text-gray-600 text-sm">{services[selectedService].duration}</p>
            </div>
            
            {services[selectedService].preparation && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Preparation</span>
                </div>
                <p className="text-gray-600 text-sm">{services[selectedService].preparation}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Locations</span>
              </div>
              <p className="text-gray-600 text-sm">{services[selectedService].locations.join(', ')}</p>
            </div>

            {services[selectedService].cost && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Cost Information</span>
                </div>
                <p className="text-gray-600 text-sm">{services[selectedService].cost}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLearnMore}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-medium text-base transition-all duration-300"
            >
              <span>Learn More in Library</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleServiceSelect(services[selectedService])}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Book Consultation</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileServiceCards;