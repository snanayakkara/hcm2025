import React, { useState, useEffect } from 'react';
import { GraduationCap, MapPin, Stethoscope, Star, LucideIcon } from 'lucide-react';
import { doctors } from '../data/doctors';
import { normalizeClinicLocation } from '../utils/locationMapping';

const DOCTOR_ACTIVE_EVENT = 'hcm:doctor-active';

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);


  const currentDoctor = doctors[selectedDoctor];

  // Dispatch event when active doctor changes (for header easter egg)
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(DOCTOR_ACTIVE_EVENT, {
        detail: { doctorId: doctors[selectedDoctor].id },
      })
    );
  }, [selectedDoctor]);

  const InfoSection = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-secondary-600" />
        <h4 className="text-xl font-semibold text-secondary-800">{title}</h4>
      </div>
      <div className="text-secondary-700 text-lg leading-relaxed">
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
  }, [isAutoPlaying]);

  return (
    <section id="doctors" className="py-32 bg-gradient-to-b from-cream-50/20 via-white to-primary-50/20">
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

        <div className="grid lg:grid-cols-[380px,1fr] gap-8 items-stretch lg:h-[820px]">
          {/* Doctor Selection List */}
          <div className="h-full lg:h-[820px] flex border-r border-secondary-100 pr-5">
            <div className="flex flex-col gap-2 h-full w-full">
              {doctors.map((doctor, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDoctor(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`group flex w-full gap-4 px-4 rounded-xl font-medium transition-all duration-300 transform overflow-hidden ${
                    selectedDoctor === index
                      ? 'bg-primary-50 text-secondary-800 shadow-sm border border-primary-200 flex-1 py-6 items-center justify-start'
                      : 'bg-transparent text-secondary-600 hover:bg-secondary-50 hover:translate-x-1 py-3.5 flex-none items-center'
                  }`}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className={`rounded-full object-cover flex-shrink-0 transition-all duration-300 group-hover:scale-105 ${
                      selectedDoctor === index ? 'w-24 h-24' : 'w-14 h-14'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="text-left min-w-0">
                    <div className={`font-semibold leading-tight transition-colors duration-200 group-hover:text-secondary-800 ${
                      selectedDoctor === index ? 'text-2xl' : 'text-lg'
                    }`}>{doctor.name}</div>
                    <div className={`text-secondary-500 leading-tight mt-1 ${
                      selectedDoctor === index ? 'text-base' : 'text-sm'
                    }`}>{doctor.degrees}</div>
                    <div className={`leading-tight mt-1 ${
                      selectedDoctor === index ? 'text-base text-accent-700 font-medium' : 'text-sm text-secondary-500'
                    }`}>
                      {doctor.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Details Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full lg:h-[820px] flex flex-col">
            <div className="px-8 py-8 flex flex-col flex-1 min-h-0">
              <div className="space-y-5">
                <p className="text-secondary-600 text-xl leading-relaxed">
                  {currentDoctor.description}
                </p>

                <InfoSection icon={GraduationCap} title="Education & Training">
                  <p>{currentDoctor.education}</p>
                </InfoSection>

                <InfoSection icon={Star} title="Areas of Expertise">
                  <div className="flex flex-wrap gap-2">
                    {currentDoctor.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-50 px-3 py-1.5 rounded-full text-sm font-medium text-secondary-700 whitespace-nowrap"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </InfoSection>

                <InfoSection icon={MapPin} title="Locations">
                  <ul className="space-y-1">
                    {currentDoctor.locations.map((location, idx) => (
                      <li key={idx} className="text-base">• {location}</li>
                    ))}
                  </ul>
                </InfoSection>
              </div>

              {/* Book Button */}
              <button
                onClick={() => {
                  const normalizedLocation = normalizeClinicLocation(
                    currentDoctor.locations?.[0]
                  );

                  const selectedDoctorInfo = {
                    name: currentDoctor.name,
                    location: normalizedLocation,
                    timestamp: Date.now()
                  };
                  
                  localStorage.setItem('selectedDoctorBooking', JSON.stringify(selectedDoctorInfo));
                  window.dispatchEvent(new CustomEvent('doctorSelected', { detail: selectedDoctorInfo }));
                  
                  const element = document.getElementById('patients');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-200 hover:shadow-lg mt-auto"
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
              aria-label={`View ${doctors[index].name}`}
              title={doctors[index].name}
              onClick={() => {
                setSelectedDoctor(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                selectedDoctor === index
                  ? 'w-8 h-3'
                  : 'hover:bg-secondary-400'
              }`}
              style={{
                backgroundColor: selectedDoctor === index ? doctors[index].color : '#b1c9cb'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
