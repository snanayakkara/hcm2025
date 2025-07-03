import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, MapPin, Stethoscope, Calendar, Star } from 'lucide-react';
import { useMobileDetection } from '../hooks/useMobileDetection';

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { isMobile, isTouchDevice } = useMobileDetection();

  const doctors = [
    {
      name: "Dr Mark Freilich",
      title: "General & Interventional Cardiologist",
      specialization: "Coronary Interventions",
      education: "MBBS (Hons) Monash University 1999, Fellowship Lahey Clinic Medical Centre Boston",
      expertise: ["Radial (wrist) approach coronary angiography", "Interventional cardiology", "Coronary angiograms", "General cardiology"],
      image: "/images/freilich.png",
      locations: ["Cabrini Hospital Malvern"],
      appointments: ["Alfred Hospital", "Frankston Hospital"],
      description: "Dr Freilich is a pioneer in radial approach coronary angiography in Melbourne, having trained in this advanced technique in the United States. He specializes in interventional cardiac procedures with extensive experience in coronary interventions.",
      gradient: "from-primary-500 via-primary-600 to-sage-700",
      accentColor: "primary",
      accentHex: '#148792',
    },
    {
      name: "Dr Phillip Ngu",
      title: "Non-invasive Imaging",
      specialization: "Cardiac Imaging & General Cardiology",
      education: "MBBS (Hons) Monash University 2007, Cardiac Imaging Fellowship Alfred Hospital 2017",
      expertise: ["Echocardiography (resting, stress, TOE)", "CT coronary angiography", "Cardiac MRI", "Multi-modality imaging"],
      image: "/images/ngu.png",
      locations: ["The Alfred Hospital"],
      appointments: ["Alfred Hospital"],
      description: "Dr Ngu specializes in advanced cardiac imaging and uses multi-modality imaging techniques to better understand cardiac disease and improve patient outcomes. His expertise spans all forms of non-invasive cardiac assessment.",
      gradient: "from-sage-500 via-sage-600 to-accent-700",
      accentColor: "sage",
      accentHex: '#4a787d',
    },
    {
      name: "A/Prof Alex Voskoboinik",
      title: "General Cardiologist & Electrophysiologist",
      specialization: "Cardiac Rhythm Disturbances",
      education: "MBBS (Hons) Monash University 2008, PhD Baker Heart Institute 2019, Electrophysiology Fellowship UCSF 2019",
      expertise: ["Pacemaker implantation", "Defibrillator implantation", "Catheter ablation", "Atrial fibrillation treatment"],
      image: "/images/vosko.png",
      locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
      appointments: ["Cabrini Hospital Malvern", "Alfred Health"],
      description: "Associate Professor Voskoboinik is a leading electrophysiologist specializing in rhythm disorders. He has extensive research experience and has won prestigious awards including the Ralph Reader Prize for top young investigator.",
      gradient: "from-accent-500 via-accent-600 to-cream-700",
      accentColor: "accent",
      accentHex: '#3bd7d6',
    },
    {
      name: "Dr Shane Nanayakkara",
      title: "Interventional & Structural Cardiologist",
      specialization: "Coronary and Structural Heart Interventions, Heart Failure",
      education: "MBBS Monash University, PhD Heart Failure, Advanced Fellowships in Coronary Intervention and Structural Intervention",
      expertise: ["Coronary angiography", "Coronary stenting", "Transcatheter valve procedures", "Structural heart interventions"],
      image: "/images/nanayakkara.png",
      locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
      appointments: ["Cabrini Hospital Malvern", "Alfred Hospital"],
      description: "Dr Nanayakkara is an interventional and structural cardiologist with expertise in advanced procedures including transcatheter valve interventions. He combines clinical excellence with research innovation and has a passion for both face-to-face and telemedicine care.",
      gradient: "from-cream-500 via-cream-600 to-primary-700",
      accentColor: "cream",
      accentHex: '#79e7e1',
    }
  ];

  // ──────────────────────────────────────────────────────────────
  // Small reusable section with an icon heading
  const Block = ({
    icon: Icon,
    title,
    children,
  }: {
    icon: React.FC<any>;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <h4 className="flex items-center gap-2 font-semibold text-secondary-800">
        <Icon className="w-4 h-4" />
        {title}
      </h4>
      {typeof children === 'string' ? (
        <p className="text-sm text-secondary-600">{children}</p>
      ) : (
        children
      )}
    </div>
  );
  // ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setSelectedDoctor((prev) => (prev + 1) % doctors.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, doctors.length]);

  return (
    <section id="doctors" className="py-32 bg-gradient-to-br from-cream-50 via-white to-primary-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent-200 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-sage-200 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-primary-700 font-medium mb-6">
            <Stethoscope className="w-4 h-4" />
            <span>Meet Our Expert Team</span>
          </div>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-bold text-secondary-800 mb-8 tracking-tight leading-relaxed`}>
            Our Expert
            <span className="block bg-gradient-to-r from-primary-600 via-accent-600 to-primary-800 bg-clip-text text-transparent pb-2">
              Cardiologists
            </span>
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-secondary-600 max-w-4xl mx-auto leading-relaxed`}>
            Our team of highly qualified cardiologists brings extensive experience and specialized expertise in all aspects of cardiovascular care, from general cardiology to advanced interventional procedures.
          </p>
        </div>

        {/* Doctor Selection Cards - Above the main showcase */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 lg:grid-cols-4 gap-6'} mb-16`}>
          {doctors.map((doctor, index) => (
            <button
              key={index}
              onMouseEnter={() => !isTouchDevice && setHoveredCard(index)}
              onMouseLeave={() => !isTouchDevice && setHoveredCard(null)}
              onClick={() => {
                setSelectedDoctor(index);
                setIsAutoPlaying(false);
              }}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 ${isMobile ? 'transform-none' : 'transform hover:-translate-y-2'} cursor-pointer overflow-hidden border-2 ${isMobile ? 'min-h-[44px]' : ''} ${
                selectedDoctor === index 
                  ? `border-${doctor.accentColor}-500 ${isMobile ? '' : 'scale-105'} shadow-xl` 
                  : 'border-secondary-200/50 hover:border-primary-300'
              }`}
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-white" />
              
              <div className={`relative ${isMobile ? 'p-4' : 'p-6'} space-y-4`}>
                {/* Doctor Image */}
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} object-cover rounded-xl mx-auto shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                  />
                </div>
                
                {/* Doctor Info */}
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-secondary-800 text-sm leading-tight">{doctor.name}</h4>
                  <p className="text-xs text-primary-600 font-semibold">{doctor.specialization}</p>
                  
                  {/* Qualifications */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2 text-xs text-secondary-600 font-medium">
                      <GraduationCap className="w-3 h-3" />
                      <span>
                        {doctor.name === "Dr Mark Freilich" ? "MBBS (Hons) FRACP" :
                         doctor.name === "Dr Phillip Ngu" ? "MBBS (Hons) FRACP" :
                         doctor.name === "A/Prof Alex Voskoboinik" ? "MBBS (Hons) PhD FRACP" :
                         doctor.name === "Dr Shane Nanayakkara" ? "MBBS PhD FRACP" : "MBBS FRACP"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedDoctor === index && (
                  <div className="absolute top-2 right-2">
                    <div className={`w-3 h-3 bg-${doctor.accentColor}-500 rounded-full animate-pulse`}></div>
                  </div>
                )}

                {/* Hover Effect */}
                {hoveredCard === index && selectedDoctor !== index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm flex items-center justify-center rounded-2xl transition-all duration-300">
                    <div className="text-center space-y-2">
                      <Calendar className={`w-6 h-6 mx-auto text-${doctor.accentColor}-600`} />
                      <p className="font-bold text-secondary-800 text-sm">View Details</p>
                      <p className="text-xs text-secondary-600">Click to learn more</p>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Main Doctor Showcase - Below the selection cards */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-secondary-100">
            <div className={`${isMobile ? 'block' : 'md:grid md:grid-cols-[auto_1fr]'}`}>
              {/* ─ Portrait ─ */}
              <div className={`relative flex flex-col items-center justify-center ${isMobile ? 'p-8' : 'p-12'} space-y-4 group`}>
                {/* Portrait Circle */}
                <div className="relative z-10 cursor-pointer">
                  <div 
                    className={`${isMobile ? 'w-48 h-48' : 'w-64 h-64'} rounded-full overflow-hidden border-4 shadow-2xl transition-all duration-300 ${isMobile ? '' : 'group-hover:scale-110 group-hover:shadow-3xl'}`}
                    style={{ 
                      borderColor: doctors[selectedDoctor].accentHex,
                      boxShadow: `0 0 0 4px ${doctors[selectedDoctor].accentHex}20, 0 25px 50px -12px rgba(0, 0, 0, 0.25)`
                    }}
                  >
                    <img
                      src={doctors[selectedDoctor].image}
                      alt={doctors[selectedDoctor].name}
                      className={`w-full h-full object-cover object-center transition-transform duration-300 ${isMobile ? '' : 'group-hover:scale-105'}`}
                      style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  </div>
                  
                  {/* Subtle pulse animation ring */}
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse opacity-30"
                    style={{ 
                      border: `2px solid ${doctors[selectedDoctor].accentHex}`,
                      transform: 'scale(1.1)'
                    }}
                  ></div>
                  
                  {/* Enhanced border on hover */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      border: `4px solid ${doctors[selectedDoctor].accentHex}`,
                      transform: 'scale(1.05)'
                    }}
                  ></div>
                </div>

                {/* Specialization text below photo */}
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold text-sm text-secondary-700 leading-tight">
                    {doctors[selectedDoctor].specialization}
                  </p>
                </div>
              </div>

              {/* ─ Info column ─ */}
              <div className={`flex flex-col justify-between ${isMobile ? 'p-6' : 'p-8 md:p-12'} space-y-6`}>
                {/* Header */}
                <header className="space-y-1">
                  <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-secondary-800`}>
                    {doctors[selectedDoctor].name}
                  </h3>
                  <p className={`font-semibold text-primary-600 ${isMobile ? 'text-sm' : ''}`}>
                    {doctors[selectedDoctor].title}
                  </p>
                </header>
                <p className={`text-secondary-700 ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed mt-2`}>
                  {doctors[selectedDoctor].description}
                </p>

                {/* Scrollable details */}
                <section className={`${isMobile ? 'space-y-4' : 'space-y-6'} overflow-y-auto pr-2 md:pr-4 flex-grow`}>
                  <Block icon={GraduationCap} title="Education & Training">
                    {doctors[selectedDoctor].education}
                  </Block>

                  <Block icon={Star} title="Areas of Expertise">
                    <div className="flex flex-wrap gap-2 mt-1">
                      {doctors[selectedDoctor].expertise.map((exp) => (
                        <span
                          key={exp}
                          className="bg-slate-50 border border-slate-200 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </Block>

                  <Block icon={MapPin} title="Primary Locations">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {doctors[selectedDoctor].locations.map((loc) => (
                        <li key={loc}>{loc}</li>
                      ))}
                    </ul>
                  </Block>
                </section>

                {/* CTA */}
                <footer>
                  <button
                    className={`w-full ${isMobile ? 'py-4 min-h-[44px] text-sm' : 'py-4 text-base'} rounded-2xl font-bold text-white transition hover:shadow-xl`}
                    style={{ backgroundColor: doctors[selectedDoctor].accentHex }}
                  >
                    Book with {doctors[selectedDoctor].name.split(' ')[1]}
                  </button>
                </footer>
              </div>
            </div>

            {/* Selection bullets */}
            <div className={`flex justify-center ${isMobile ? 'space-x-2 p-6' : 'space-x-4 p-8'} bg-secondary-50/50`}>
              {doctors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDoctor(index);
                    setIsAutoPlaying(false);
                  }}
                  style={{
                    backgroundColor: index === selectedDoctor ? doctors[index].accentHex : '#d1d5db',
                    width: index === selectedDoctor ? (isMobile ? '32px' : '48px') : (isMobile ? '12px' : '16px'),
                    height: isMobile ? '12px' : '16px',
                    borderRadius: '9999px',
                    transition: 'all 0.3s',
                    minHeight: isMobile ? '44px' : 'auto',
                    minWidth: isMobile ? '44px' : 'auto',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;