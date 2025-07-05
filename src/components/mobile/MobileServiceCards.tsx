import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, Clock, Search, MapPin, ArrowRight } from 'lucide-react';
import SwipeDeck from './SwipeDeck';

const MobileServiceCards: React.FC = () => {

  const services = [
    {
      id: 'consultation',
      title: 'Consultation',
      subtitle: 'Expert Assessment',
      description: 'Comprehensive cardiac assessment and specialist consultation',
      icon: Stethoscope,
      color: 'from-primary-500 to-primary-600',
      image: '/images/consult.png',
      duration: '45-60 minutes',
      locations: ['Malvern', 'Pakenham', 'Clyde'],
    },
    {
      id: 'echocardiography',
      title: 'Echocardiography',
      subtitle: 'Heart Imaging',
      description: 'Resting and stress echocardiography for detailed cardiac imaging',
      icon: Activity,
      color: 'from-accent-500 to-accent-600',
      image: '/images/echo.png',
      duration: '30-45 minutes',
      locations: ['Pakenham', 'Clyde'],
    },
    {
      id: 'holter',
      title: '24 Hour Holter Monitoring',
      subtitle: 'Rhythm Monitoring',
      description: 'Continuous cardiac rhythm monitoring over 24 hours',
      icon: Clock,
      color: 'from-sage-500 to-sage-600',
      image: '/images/holter.png',
      duration: '24 hours continuous',
      locations: ['Malvern', 'Pakenham', 'Clyde'],
    },
    {
      id: 'angiography',
      title: 'Coronary Angiography',
      subtitle: 'Advanced Imaging',
      description: 'Advanced imaging of coronary arteries to detect blockages',
      icon: Heart,
      color: 'from-primary-500 to-primary-600',
      image: '/images/angio.png',
      duration: '30-60 minutes',
      locations: ['Malvern', 'Berwick'],
    },
    {
      id: 'stress-echo',
      title: 'Stress Echocardiography',
      subtitle: 'Stress Testing',
      description: 'Exercise or pharmacological stress testing with echocardiography',
      icon: Activity,
      color: 'from-accent-500 to-accent-600',
      image: '/images/stressecho.png',
      duration: '60-90 minutes',
      locations: ['Pakenham', 'Clyde'],
    },
    {
      id: 'toe',
      title: 'Transoesophageal Echo (TOE)',
      subtitle: 'Advanced Imaging',
      description: 'Advanced cardiac imaging via esophageal probe for detailed assessment',
      icon: Search,
      color: 'from-sage-500 to-sage-600',
      image: '/images/toe_drawn.png',
      duration: '30-45 minutes',
      locations: ['Malvern', 'Berwick'],
    },
    {
      id: 'toe-dcr',
      title: 'TOE-Guided Cardioversion',
      subtitle: 'Rhythm Restoration',
      description: 'Electrical cardioversion with TOE guidance for atrial fibrillation',
      icon: Zap,
      color: 'from-cream-700 to-cream-800',
      image: '/images/cardioversion.jpg',
      duration: '2-3 hours',
      locations: ['Malvern', 'Berwick'],
    },
    {
      id: 'af-ablation',
      title: 'Atrial Fibrillation Ablation',
      subtitle: 'Advanced Treatment',
      description: 'Advanced catheter ablation including Pulsed Field Ablation (PFA)',
      icon: Zap,
      color: 'from-primary-500 to-primary-600',
      image: '/images/afabl_drawn.png',
      duration: '3-5 hours',
      locations: ['Malvern', 'Berwick'],
    },
    {
      id: 'tavi',
      title: 'TAVI',
      subtitle: 'Valve Replacement',
      description: 'Minimally invasive aortic valve replacement via catheter',
      icon: Heart,
      color: 'from-accent-500 to-accent-600',
      image: '/images/tavi.png',
      duration: '2-3 hours',
      locations: ['Malvern'],
    },
    {
      id: 'mteer',
      title: 'Mitral TEER',
      subtitle: 'Valve Repair',
      description: 'Minimally invasive mitral valve repair using keyhole technology',
      icon: Heart,
      color: 'from-sage-500 to-sage-600',
      image: '/images/mteer_drawn.png',
      duration: '2-4 hours',
      locations: ['Malvern'],
    },
    {
      id: 'pacemaker',
      title: 'Pacemaker Insertion',
      subtitle: 'Device Implantation',
      description: 'Permanent pacemaker implantation for heart rhythm disorders',
      icon: Zap,
      color: 'from-cream-700 to-cream-800',
      image: '/images/pacemaker.png',
      duration: '1-2 hours',
      locations: ['Malvern', 'Berwick'],
    },
  ];

  // Create service items with proper content for SwipeDeck
  const serviceItems = services.map(service => ({
    id: service.id,
    title: service.title,
    description: service.description,
    content: (
      <div className="flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-br ${service.color} p-6 rounded-t-xl flex items-center space-x-4`}>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <service.icon className="w-8 h-8 text-white" />
          </div>
          <div className="text-white">
            <h3 className="font-bold text-xl">{service.title}</h3>
            <p className="text-white/90 text-base">{service.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6">
          <p className="text-gray-700 text-base leading-relaxed">
            {service.description}
          </p>

          {/* Key Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-base font-medium text-gray-700">{service.duration}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-base text-gray-700">{service.locations.join(', ')}</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-medium text-base transition-all duration-300"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    )
  }));

  const handleServiceSelect = (service: any) => {
    console.log('Service selected:', service.title);
    // Could navigate to service detail page or open modal
  };

  const handleServiceLongPress = (service: any) => {
    console.log('Service long press:', service.title);
    // Could show additional info or quick actions
  };

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mobile-text-xl font-bold text-gray-900 mb-2"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mobile-text-sm text-gray-600 max-w-sm mx-auto"
        >
          Comprehensive cardiac care with cutting-edge technology
        </motion.p>
      </div>

      {/* Swipe Deck */}
      <SwipeDeck
        items={serviceItems}
        onItemSelect={handleServiceSelect}
        onLongPress={handleServiceLongPress}
        className="mb-6"
      />
    </div>
  );
};

export default MobileServiceCards;