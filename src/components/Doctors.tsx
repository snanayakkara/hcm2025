import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, MapPin, Stethoscope, ChevronLeft, ChevronRight, Calendar, Users, Heart } from 'lucide-react';

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const doctors = [
    {
      name: "Dr Mark Freilich",
      title: "General & Interventional Cardiologist",
      specialization: "Interventional Cardiac Procedures",
      education: "MBBS (Hons) Monash University 1999, Fellowship Lahey Clinic Medical Centre Boston",
      expertise: ["Radial (wrist) approach coronary angiography", "Interventional cardiology", "Coronary angiograms", "General cardiology"],
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
      locations: ["Cabrini Hospital Malvern"],
      appointments: ["Alfred Hospital", "Frankston Hospital"],
      description: "Dr Freilich is a pioneer in radial approach coronary angiography in Melbourne, having trained in this advanced technique in the United States. He specializes in interventional cardiac procedures with extensive experience in coronary interventions.",
      gradient: "from-primary-500 via-primary-600 to-sage-700",
      accentColor: "primary"
    },
    {
      name: "Dr Phillip Ngu",
      title: "General & Non-invasive Imaging Cardiologist",
      specialization: "Cardiac Imaging & General Cardiology",
      education: "MBBS (Hons) Monash University 2007, Cardiac Imaging Fellowship Alfred Hospital 2017",
      expertise: ["Echocardiography (resting, stress, TOE)", "CT coronary angiography", "Cardiac MRI", "Multi-modality imaging"],
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
      locations: ["St John of God Berwick", "The Alfred Hospital"],
      appointments: ["Alfred Hospital"],
      description: "Dr Ngu specializes in advanced cardiac imaging and uses multi-modality imaging techniques to better understand cardiac disease and improve patient outcomes. His expertise spans all forms of non-invasive cardiac assessment.",
      gradient: "from-sage-500 via-sage-600 to-accent-700",
      accentColor: "sage"
    },
    {
      name: "Associate Professor Alex Voskoboinik",
      title: "General Cardiologist & Electrophysiologist",
      specialization: "Cardiac Rhythm Disturbances",
      education: "MBBS (Hons) Monash University 2008, PhD Baker Heart Institute 2019, Fellowship UCSF 2019",
      expertise: ["Pacemaker implantation", "Defibrillator implantation", "Catheter ablation", "Atrial fibrillation treatment"],
      image: "https://images.pexels.com/photos/5214030/pexels-photo-5214030.jpeg?auto=compress&cs=tinysrgb&w=400",
      locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
      appointments: ["Western Health", "Alfred Health"],
      description: "Associate Professor Voskoboinik is a leading electrophysiologist specializing in rhythm disorders. He has extensive research experience and has won prestigious awards including the Ralph Reader Prize for top young investigator.",
      gradient: "from-accent-500 via-accent-600 to-cream-700",
      accentColor: "accent"
    },
    {
      name: "Dr Shane Nanayakkara",
      title: "Interventional & Structural Cardiologist",
      specialization: "Advanced Interventional Procedures",
      education: "MBBS Monash University, PhD Heart Failure, Advanced Fellowships in Intervention",
      expertise: ["Coronary angiography", "Coronary stenting", "Transcatheter valve procedures", "Structural heart interventions"],
      image: "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400",
      locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
      appointments: ["Alfred Hospital"],
      description: "Dr Nanayakkara is an interventional and structural cardiologist with expertise in advanced procedures including transcatheter valve interventions. He combines clinical excellence with research innovation and has a passion for both face-to-face and telemedicine care.",
      gradient: "from-cream-500 via-cream-600 to-primary-700",
      accentColor: "cream"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setSelectedDoctor((prev) => (prev + 1) % doctors.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, doctors.length]);

  const nextDoctor = () => {
    setSelectedDoctor((prev) => (prev + 1) % doctors.length);
    setIsAutoPlaying(false);
  };

  const prevDoctor = () => {
    setSelectedDoctor((prev) => (prev - 1 + doctors.length) % doctors.length);
    setIsAutoPlaying(false);
  };

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
          <h2 className="text-5xl lg:text-6xl font-bold text-secondary-800 mb-6 tracking-tight leading-tight">
            Our Expert
            <span className="block bg-gradient-to-r from-primary-600 via-accent-600 to-primary-800 bg-clip-text text-transparent">
              Cardiologists
            </span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-4xl mx-auto leading-relaxed">
            Our team of highly qualified cardiologists brings extensive experience and specialized expertise in all aspects of cardiovascular care, from general cardiology to advanced interventional procedures.
          </p>
        </div>

        {/* Doctor Selection Cards - Above the main showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {doctors.map((doctor, index) => (
            <button
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                setSelectedDoctor(index);
                setIsAutoPlaying(false);
              }}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-2 ${
                selectedDoctor === index 
                  ? `border-${doctor.accentColor}-500 scale-105 shadow-xl` 
                  : 'border-secondary-200/50 hover:border-primary-300'
              }`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${doctor.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-6 space-y-4">
                {/* Doctor Image */}
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 object-cover rounded-xl mx-auto shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <div className={`absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r ${doctor.gradient} rounded-full flex items-center justify-center`}>
                    <Heart className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                
                {/* Doctor Info */}
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-secondary-800 text-sm leading-tight">{doctor.name}</h4>
                  <p className="text-xs text-primary-600 font-semibold">{doctor.specialization}</p>
                  
                  {/* Locations */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-xs text-secondary-500">
                      <MapPin className="w-3 h-3" />
                      <span>Primary Locations:</span>
                    </div>
                    <div className="space-y-1">
                      {doctor.locations.slice(0, 2).map((location, idx) => (
                        <div key={idx} className="text-xs text-secondary-600 font-medium">
                          {location}
                        </div>
                      ))}
                      {doctor.locations.length > 2 && (
                        <div className="text-xs text-primary-600 font-medium">
                          +{doctor.locations.length - 2} more
                        </div>
                      )}
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
            <div className="grid lg:grid-cols-2">
              {/* Doctor Image and Info */}
              <div className={`relative bg-gradient-to-br ${doctors[selectedDoctor].gradient} p-12 lg:p-16`}>
                <div className="relative z-10">
                  {/* Doctor Image */}
                  <div className="relative mb-8">
                    <div className="w-80 h-80 mx-auto relative">
                      <img
                        src={doctors[selectedDoctor].image}
                        alt={`${doctors[selectedDoctor].name} - ${doctors[selectedDoctor].title}`}
                        className="w-full h-full object-cover rounded-3xl shadow-2xl"
                      />
                      <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                        <MapPin className="w-5 h-5 text-primary-600" />
                        <span className="font-bold text-secondary-900 text-sm">{doctors[selectedDoctor].locations.length} Location{doctors[selectedDoctor].locations.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Doctor Info */}
                  <div className="text-center text-white space-y-4">
                    <h3 className="text-3xl lg:text-4xl font-bold">{doctors[selectedDoctor].name}</h3>
                    <p className="text-xl font-semibold text-white/90">{doctors[selectedDoctor].title}</p>
                    <p className="text-lg text-white/80">{doctors[selectedDoctor].specialization}</p>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
                  <div className="absolute top-1/2 right-20 w-12 h-12 border-2 border-white rounded-full"></div>
                </div>

                {/* Navigation */}
                <button
                  onClick={prevDoctor}
                  className="absolute top-1/2 -translate-y-1/2 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200 group"
                >
                  <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={nextDoctor}
                  className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200 group"
                >
                  <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Doctor Details */}
              <div className="p-12 lg:p-16 space-y-8">
                {/* Education */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent-100 p-2 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-accent-600" />
                    </div>
                    <span className="font-bold text-secondary-900 text-lg">Education & Training</span>
                  </div>
                  <p className="text-secondary-600 leading-relaxed pl-11">{doctors[selectedDoctor].education}</p>
                </div>

                {/* Expertise */}
                <div className="space-y-4">
                  <h4 className="font-bold text-secondary-900 text-lg">Areas of Expertise</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {doctors[selectedDoctor].expertise.map((skill, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-xl">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-secondary-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-sage-100 p-2 rounded-lg">
                      <MapPin className="w-6 h-6 text-sage-600" />
                    </div>
                    <span className="font-bold text-secondary-900 text-lg">Primary Locations</span>
                  </div>
                  <div className="space-y-2 pl-11">
                    {doctors[selectedDoctor].locations.map((location, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                        <span className="text-secondary-600 font-medium">{location}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h4 className="font-bold text-secondary-900 text-lg">About</h4>
                  <p className="text-secondary-600 leading-relaxed">{doctors[selectedDoctor].description}</p>
                </div>

                {/* CTA Button */}
                <button className={`w-full bg-gradient-to-r ${doctors[selectedDoctor].gradient} text-white py-4 rounded-2xl hover:shadow-xl transition-all duration-300 font-bold text-lg transform hover:-translate-y-1`}>
                  Book with {doctors[selectedDoctor].name.split(' ')[1]}
                </button>
              </div>
            </div>

            {/* Enhanced Doctor Selection */}
            <div className="flex justify-center space-x-4 p-8 bg-secondary-50/50">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDoctor(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`transition-all duration-300 ${
                    index === selectedDoctor 
                      ? `bg-gradient-to-r ${doctors[index].gradient} w-12 h-4 rounded-full` 
                      : 'bg-secondary-300 hover:bg-secondary-400 w-4 h-4 rounded-full'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Statistics */}
        <div className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-800 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl lg:text-5xl font-bold">4</div>
              <div className="text-white/80 font-medium">Expert Cardiologists</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl lg:text-5xl font-bold">36+</div>
              <div className="text-white/80 font-medium">Years Combined Experience</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl lg:text-5xl font-bold">5700+</div>
              <div className="text-white/80 font-medium">Patients Treated</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl lg:text-5xl font-bold">6</div>
              <div className="text-white/80 font-medium">Hospital Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;