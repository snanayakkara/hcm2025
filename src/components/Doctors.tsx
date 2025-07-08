import React, { useState, useEffect } from 'react';
import { GraduationCap, MapPin, Stethoscope, Star } from 'lucide-react';

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const doctors = [
    {
      name: "Dr Mark Freilich",
      title: "General & Interventional Cardiologist",
      specialization: "Coronary Interventions",
      education: "MBBS (Hons) Monash University 1999, Fellowship Lahey Clinic Medical Centre Boston",
      degrees: "MBBS FRACP",
      expertise: ["Radial (wrist) approach coronary angiography", "Interventional cardiology", "Coronary angiograms", "General cardiology"],
      image: "/images/freilich.png",
      locations: ["Cabrini Hospital Malvern"],
      appointments: ["Alfred Hospital", "Frankston Hospital"],
      description: "Dr Freilich is a pioneer in radial approach coronary angiography in Melbourne, having trained in this advanced technique in the United States. He specializes in interventional cardiac procedures with extensive experience in coronary interventions.",
      color: '#148792',
    },
    {
      name: "Dr Phillip Ngu",
      title: "Non-invasive Imaging",
      specialization: "Cardiac Imaging & General Cardiology",
      education: "MBBS (Hons) Monash University 2007, Cardiac Imaging Fellowship Alfred Hospital 2017",
      degrees: "MBBS FRACP",
      expertise: ["Echocardiography (resting, stress, TOE)", "CT coronary angiography", "Cardiac MRI", "Multi-modality imaging"],
      image: "/images/ngu.png",
      locations: ["The Alfred Hospital"],
      appointments: ["Alfred Hospital"],
      description: "Dr Ngu specializes in advanced cardiac imaging and uses multi-modality imaging techniques to better understand cardiac disease and improve patient outcomes. His expertise spans all forms of non-invasive cardiac assessment.",
      color: '#4a787d',
    },
    {
      name: "A/Prof Alex Voskoboinik",
      title: "General Cardiologist & Electrophysiologist",
      specialization: "Cardiac Rhythm Disturbances",
      education: "MBBS (Hons) Monash University 2008, PhD Baker Heart Institute 2019, Electrophysiology Fellowship UCSF 2019",
      degrees: "MBBS PhD FRACP",
      expertise: ["Pacemaker implantation", "Defibrillator implantation", "Catheter ablation", "Atrial fibrillation treatment"],
      image: "/images/vosko.png",
      locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
      appointments: ["Cabrini Hospital Malvern", "Alfred Health"],
      description: "Associate Professor Voskoboinik is a leading electrophysiologist specializing in rhythm disorders. He has extensive research experience and has won prestigious awards including the Ralph Reader Prize for top young investigator.",
      color: '#3bd7d6',
    },
    {
      name: "Dr Shane Nanayakkara",
      title: "Interventional & Structural Cardiologist",
      specialization: "Coronary and Structural Heart Interventions, Heart Failure",
      education: "MBBS Monash University, PhD Heart Failure, Advanced Fellowships in Coronary Intervention and Structural Intervention",
      degrees: "MBBS PhD FRACP",
      expertise: ["Coronary angiography", "Coronary stenting", "Transcatheter valve procedures", "Structural heart interventions"],
      image: "/images/nanayakkara.png",
      locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
      appointments: ["Cabrini Hospital Malvern", "Alfred Hospital"],
      description: "Dr Nanayakkara is an interventional and structural cardiologist with expertise in advanced procedures including transcatheter valve interventions. He combines clinical excellence with research innovation and has a passion for both face-to-face and telemedicine care.",
      color: '#79e7e1',
    },
    {
      name: "Dr Kate Rowe",
      title: "General Cardiologist & Cardiac Imaging Specialist",
      specialization: "Cardiac Imaging & Valvular Heart Disease",
      education: "MBBS (Hons) Monash University 2013, Advanced training in cardiology at Alfred Hospital and Royal Darwin Hospital",
      degrees: "MBBS FRACP",
      expertise: ["Cardiac CT", "Cardiac MRI", "Echocardiography (resting, stress, TOE)", "Valvular heart disease", "Indigenous health"],
      image: "/images/katerowe.png",
      locations: ["Cabrini Hospital Malvern", "Pakenham"],
      appointments: ["Alfred Hospital", "Sunshine Hospital"],
      description: "Dr Rowe is a general cardiologist and cardiac imaging specialist with particular expertise in valvular heart disease and Indigenous health. She has undertaken advanced training in cardiac CT, MRI and all forms of echocardiography.",
      color: '#2dd4bf',
    }
  ];

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
            Our team of highly qualified cardiologists brings extensive experience and specialized expertise in all aspects of cardiovascular care, from general cardiology to advanced interventional procedures.
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
          <div className="grid md:grid-cols-2 gap-0">
            
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
            <div className="p-8 space-y-6">
              
              {/* Name and Title */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentDoctor.name}
                </h3>
                <p className="text-lg font-medium mb-2" style={{ color: currentDoctor.color }}>
                  {currentDoctor.title}
                </p>
                <p className="text-gray-600">{currentDoctor.description}</p>
              </div>

              {/* Education */}
              <InfoSection icon={GraduationCap} title="Education & Training">
                <p>{currentDoctor.education}</p>
              </InfoSection>

              {/* Expertise */}
              <InfoSection icon={Star} title="Areas of Expertise">
                <div className="flex flex-wrap gap-2">
                  {currentDoctor.expertise.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </InfoSection>

              {/* Locations */}
              <InfoSection icon={MapPin} title="Primary Locations">
                <ul className="space-y-1">
                  {currentDoctor.locations.map((location, idx) => (
                    <li key={idx} className="text-sm">• {location}</li>
                  ))}
                </ul>
              </InfoSection>

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
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-200 hover:shadow-lg"
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