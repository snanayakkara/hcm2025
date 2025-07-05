import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ChevronRight, Award } from 'lucide-react';

const MobileDoctorCarousel: React.FC = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState('freilich');

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

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

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


  return (
    <div className="px-4 py-8">
      {/* Modern Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-3 mb-4"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="mobile-text-xl font-bold text-gray-900">Our Cardiologists</h2>
            <p className="mobile-text-sm text-gray-600">Expert heart specialists</p>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-sm mx-auto"
        >
          Comprehensive cardiac care with advanced specialization
        </motion.p>
      </div>

      {/* Doctor Selection Buttons */}
      <div className="flex overflow-x-auto gap-3 px-4 mb-6 scrollbar-hide">
        {doctors.map((doctor) => (
          <motion.button
            key={doctor.id}
            onClick={() => setSelectedDoctorId(doctor.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-2xl min-w-[75px] max-w-[75px] transition-all duration-300 ${
              selectedDoctorId === doctor.id
                ? 'bg-teal-50 border-2 border-teal-200'
                : 'bg-gray-50 border-2 border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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
                      <span class="text-gray-600 font-bold text-sm">
                        ${doctor.name.split(' ')[1][0]}
                      </span>
                    `;
                  }
                }}
              />
            </div>
            <span className={`text-[9px] font-medium text-center leading-tight ${
              selectedDoctorId === doctor.id ? 'text-teal-700' : 'text-gray-600'
            }`}>
              {doctor.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Selected Doctor Detail Card */}
      <div className="px-4">
        <motion.div
          key={selectedDoctor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="doctor-card relative overflow-visible"
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedDoctor.color} opacity-5 rounded-3xl`} />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header Section */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <span class="text-gray-600 font-bold text-2xl">
                          ${selectedDoctor.name.split(' ')[1][0]}
                        </span>
                      `;
                    }
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-gray-900 truncate mb-1">{selectedDoctor.name}</h3>
                <p className="text-teal-600 font-semibold text-base mb-1">{selectedDoctor.specialty}</p>
                <p className="text-gray-500 text-sm">{selectedDoctor.qualifications}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 text-base leading-relaxed">
                {selectedDoctor.description}
              </p>
            </div>

            {/* Location & Expertise */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-base font-medium text-gray-700">{selectedDoctor.location}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {selectedDoctor.expertise.slice(0, 4).map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full" />
                    <span className="text-teal-700 text-sm font-medium truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBookAppointment(selectedDoctor)}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-14 h-14 bg-white border-2 border-gray-200 rounded-2xl hover:border-teal-300 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>
          </div>
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 pointer-events-none rounded-3xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default MobileDoctorCarousel;