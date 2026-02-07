import React, { useState, useEffect } from 'react';
import { GraduationCap, MapPin, Stethoscope, Star } from 'lucide-react';
import { doctors } from '../data/doctors';

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);


  const currentDoctor = doctors[selectedDoctor];

  const InfoSection = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-gray-600" />
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="text-gray-700 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setSelectedDoctor((prev) => (prev + 1) % doctors.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, doctors.length]);

  return (
    <section id="doctors" className="py-32 bg-gradient-to-br from-white via-cream-25 to-primary-25/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-primary-700 font-medium mb-6">
            <Stethoscope className="w-4 h-4" />
            <span>Meet Our Expert Team</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-secondary-800 mb-8 leading-tight">
            Our Expert
            <span className="block bg-gradient-to-r from-primary-600 via-accent-600 to-primary-800 bg-clip-text text-transparent pb-2">
              Cardiologists
            </span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Our team of highly qualified cardiologists brings extensive experience and specialised expertise in all aspects of cardiovascular care, from general cardiology to advanced interventional procedures.
          </p>
        </div>

        {/* Doctor Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {doctors.map((doctor, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDoctor(index);
                setIsAutoPlaying(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedDoctor === index
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'bg-transparent text-gray-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold">{doctor.name}</div>
                <div className="text-xs text-gray-500">{doctor.degrees}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Doctor Details Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0 h-[770px]">
            
            {/* Doctor Image */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 flex items-center justify-center">
              <div className="relative group">
                <img
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  className="w-96 h-96 object-cover rounded-full shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 rounded-full border-4 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                  style={{ borderColor: currentDoctor.color }}
                />
              </div>
            </div>

            {/* Doctor Information */}
            <div className="p-8 flex flex-col justify-between h-[770px]">
              <div className="space-y-6 flex-grow">
                {/* Name and Title */}
                <div className="min-h-[140px]">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentDoctor.name}
                  </h3>
                  <p className="text-lg font-medium mb-2 min-h-[28px]" style={{ color: currentDoctor.color }}>
                    {currentDoctor.title}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed min-h-[80px]">
                    {currentDoctor.description}
                  </p>
                </div>

                {/* Education */}
                <div className="min-h-[100px]">
                  <InfoSection icon={GraduationCap} title="Education & Training">
                    <p className="min-h-[60px] overflow-hidden line-clamp-3">{currentDoctor.education}</p>
                  </InfoSection>
                </div>

                {/* Expertise */}
                <div className="min-h-[100px]">
                  <InfoSection icon={Star} title="Areas of Expertise">
                    <div className="flex flex-wrap gap-2 min-h-[60px] overflow-hidden max-h-[60px]">
                      {currentDoctor.expertise.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </InfoSection>
                </div>

                {/* Locations */}
                <div className="min-h-[100px]">
                  <InfoSection icon={MapPin} title="Locations">
                    <ul className="space-y-1 min-h-[80px] max-h-[80px] overflow-hidden">
                      {currentDoctor.locations.map((location, idx) => (
                        <li key={idx} className="text-sm">• {location}</li>
                      ))}
                    </ul>
                  </InfoSection>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => {
                  const selectedDoctorInfo = {
                    name: currentDoctor.name,
                    location: currentDoctor.name === "Dr Shane Nanayakkara" ? "Cabrini Malvern" : null,
                    timestamp: Date.now()
                  };
                  
                  localStorage.setItem('selectedDoctorBooking', JSON.stringify(selectedDoctorInfo));
                  window.dispatchEvent(new CustomEvent('doctorSelected', { detail: selectedDoctorInfo }));
                  
                  const element = document.getElementById('patients');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-200 hover:shadow-lg mt-6"
                style={{ backgroundColor: currentDoctor.color }}
              >
                Book with {currentDoctor.name.split(' ')[1]}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 mb-8">
          {doctors.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDoctor(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                selectedDoctor === index
                  ? 'w-8 h-3'
                  : 'hover:bg-gray-400'
              }`}
              style={{
                backgroundColor: selectedDoctor === index ? doctors[index].color : '#d1d5db'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;