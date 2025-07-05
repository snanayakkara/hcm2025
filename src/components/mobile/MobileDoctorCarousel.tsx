import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Phone, Award, BookOpen } from 'lucide-react';
import SwipeDeck from './SwipeDeck';

const MobileDoctorCarousel: React.FC = () => {

  const doctors = [
    {
      id: 'freilich',
      name: 'Dr Mark Freilich',
      specialty: 'Interventional Cardiologist',
      qualifications: 'MBBS (Hons) FRACP',
      image: '/images/freilich.png',
      experience: '25+ years',
      location: 'Cabrini Malvern',
      description: 'Specializing in radial (wrist) approach coronary angiography and interventional cardiology procedures.',
      expertise: ['Coronary Angioplasty', 'Radial Approach', 'Interventional Cardiology', 'Coronary Angiograms'],
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'ngu',
      name: 'Dr Phillip Ngu',
      specialty: 'Non-Invasive Imaging',
      qualifications: 'MBBS (Hons)  FRACP',
      image: '/images/ngu.png',
      experience: '17+ years',
      location: 'Alfred Hospital',
      description: 'Expert in advanced cardiac imaging and multi-modality imaging techniques.',
      expertise: ['Echocardiography', 'CT Coronary Angiography', 'Cardiac MRI', 'Multi-modality Imaging'],
      color: 'from-sage-500 to-sage-600',
    },
    {
      id: 'voskoboinik',
      name: 'A/Prof Alex Voskoboinik',
      specialty: 'Electrophysiologist',
      qualifications: 'MBBS (Hons) FRACP PhD',
      image: '/images/vosko.png',
      experience: '16+ years',
      location: 'Multiple Locations',
      description: 'Leading expert in cardiac rhythm disorders, ablation procedures, and device implantation.',
      expertise: ['Pacemaker Implantation', 'Catheter Ablation', 'Atrial Fibrillation', 'Defibrillator Implantation'],
      color: 'from-accent-500 to-accent-600',
    },
    {
      id: 'nanayakkara',
      name: 'Dr Shane Nanayakkara',
      specialty: 'Heart Failure & Interventional Cardiologist',
      qualifications: 'MBBS FRACP PhD',
      image: '/images/nanayakkara.png',
      experience: '14+ years',
      location: 'Multiple Locations',
      description: 'Specialist in complex heart failure, cardiomyopathy, and structural heart interventions including TAVI.',
      expertise: ['Heart Failure', 'Cardiomyopathy', 'TAVI', 'Structural Heart Disease'],
      color: 'from-cream-700 to-cream-800',
    },
  ];

  // Create doctor items with proper content for SwipeDeck
  const doctorItems = doctors.map(doctor => ({
    id: doctor.id,
    title: doctor.name,
    description: doctor.description,
    content: (
      <div className="flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-br ${doctor.color} p-6 rounded-t-xl`}>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/30 bg-white/20 flex items-center justify-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <span class="text-white font-bold text-xl">
                        ${doctor.name.split(' ')[1][0]}
                      </span>
                    `;
                  }
                }}
              />
            </div>
            <div className="text-white flex-1">
              <h3 className="font-bold text-xl">{doctor.name}</h3>
              <p className="text-white/90 text-base">{doctor.specialty}</p>
              <p className="text-white/70 text-sm">{doctor.qualifications}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6">
          <p className="text-gray-700 text-base leading-relaxed">
            {doctor.description}
          </p>

          {/* Key Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-base font-medium text-gray-700">{doctor.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {doctor.expertise.slice(0, 2).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleBookAppointment(doctor)}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-medium text-base transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Appointment</span>
          </motion.button>
        </div>
      </div>
    )
  }));

  const handleBookAppointment = (doctor: typeof doctors[0]) => {
    // Store doctor selection and scroll to booking
    localStorage.setItem('selectedDoctorBooking', JSON.stringify({
      name: doctor.name,
      location: doctor.location,
      timestamp: Date.now()
    }));

    // Trigger the custom event
    window.dispatchEvent(new CustomEvent('doctorSelected', {
      detail: { name: doctor.name, location: doctor.location }
    }));

    // Scroll to booking section
    const element = document.getElementById('patients');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDoctorSelect = (doctor: any) => {
    console.log('Doctor selected:', doctor.title);
    // Could navigate to doctor detail page
  };

  const handleDoctorLongPress = (doctor: any) => {
    console.log('Doctor long press:', doctor.title);
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
          Our Cardiologists
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mobile-text-sm text-gray-600 max-w-sm mx-auto"
        >
          Expert specialists dedicated to your heart health
        </motion.p>
      </div>

      {/* Swipe Deck */}
      <SwipeDeck
        items={doctorItems}
        onItemSelect={handleDoctorSelect}
        onLongPress={handleDoctorLongPress}
        className="mb-6"
      />
    </div>
  );
};

export default MobileDoctorCarousel;