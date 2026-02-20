import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ChevronRight, Award } from 'lucide-react';
import { doctors } from '../../data/doctors';
import { DEFAULT_VIEWPORT } from '../../lib/motion';
import { normalizeClinicLocation } from '../../utils/locationMapping';

const DOCTOR_ACTIVE_EVENT = 'hcm:doctor-active';

const MobileDoctorCarousel: React.FC = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState('freilich');

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  // Dispatch event when active doctor changes (for header easter egg)
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(DOCTOR_ACTIVE_EVENT, {
        detail: { doctorId: selectedDoctorId },
      })
    );
  }, [selectedDoctorId]);

  const handleBookAppointment = (doctor: typeof doctors[0]) => {
    const normalizedLocation = normalizeClinicLocation(doctor.locations?.[0]);

    // Store doctor selection and scroll to booking
    localStorage.setItem('selectedDoctorBooking', JSON.stringify({
      name: doctor.name,
      location: normalizedLocation,
      timestamp: Date.now()
    }));

    // Trigger the custom event
    window.dispatchEvent(new CustomEvent('doctorSelected', {
      detail: { name: doctor.name, location: normalizedLocation }
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
          viewport={DEFAULT_VIEWPORT}
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
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-sm mx-auto"
        >
          Comprehensive cardiac care with advanced specialisation
        </motion.p>
      </div>

      {/* Doctor Selection Buttons */}
      <div className="flex gap-2 px-4 mb-6">
        {doctors.map((doctor) => (
          <motion.button
            key={doctor.id}
            onClick={() => setSelectedDoctorId(doctor.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-2xl flex-1 transition-all duration-300 ${
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
                loading="lazy"
                decoding="async"
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
          className="doctor-card relative overflow-visible min-h-[528px] flex flex-col"
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedDoctor.mobileColor} opacity-5 rounded-3xl`} />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header Section */}
            <div className="flex items-start space-x-4 mb-6 min-h-[96px]">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg flex-shrink-0">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
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
                <h3 className="font-bold text-xl text-gray-900 truncate mb-1 min-h-[28px]">{selectedDoctor.name}</h3>
                <p className="text-teal-600 font-semibold text-base mb-1 min-h-[24px] line-clamp-2">{selectedDoctor.specialty}</p>
                <p className="text-gray-500 text-sm min-h-[20px]">{selectedDoctor.qualifications}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 flex-grow">
              <p className="text-gray-700 text-base leading-relaxed min-h-[96px]">
                {selectedDoctor.description}
              </p>
            </div>

            {/* Location & Expertise */}
            <div className="mb-6 min-h-[140px]">
              <div className="flex items-center space-x-2 mb-4 min-h-[24px]">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-base font-medium text-gray-700 truncate">
                  {selectedDoctor.locations && selectedDoctor.locations.length > 0 
                    ? selectedDoctor.locations[0] 
                    : 'Multiple locations'
                  }
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 min-h-[88px]">
                {selectedDoctor.expertise.slice(0, 4).map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-xl min-h-[40px]"
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0" />
                    <span className="text-teal-700 text-sm font-medium truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBookAppointment(selectedDoctor)}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl min-h-[56px]"
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
