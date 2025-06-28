import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, Clock, Star, MapPin, Stethoscope, ChevronLeft, ChevronRight, Calendar, Users, Heart } from 'lucide-react';

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const doctors = [
    {
      name: "Dr Mark Freilich",
      title: "General & Interventional Cardiologist",
      specialization: "Interventional Cardiac Procedures",
      experience: "15+ Years",
      education: "MBBS (Hons) Monash University 1999, Fellowship Lahey Clinic Medical Centre Boston",
      expertise: ["Radial (wrist) approach coronary angiography", "Interventional cardiology", "Coronary angiograms", "General cardiology"],
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      patients: "2000+",
      locations: ["Cabrini Hospital Malvern", "St John of God Berwick", "Pakenham"],
      appointments: ["Alfred Hospital", "Frankston Hospital"],
      description: "Dr Freilich is a pioneer in radial approach coronary angiography in Melbourne, having trained in this advanced technique in the United States. He specializes in interventional cardiac procedures with extensive experience in coronary interventions.",
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      accentColor: "blue"
    },
    {
      name: "Dr Phillip Ngu",
      title: "General & Non-invasive Imaging Cardiologist",
      specialization: "Cardiac Imaging & General Cardiology",
      experience: "8+ Years",
      education: "MBBS (Hons) Monash University 2007, Cardiac Imaging Fellowship Alfred Hospital 2017",
      expertise: ["Echocardiography (resting, stress, TOE)", "CT coronary angiography", "Cardiac MRI", "Multi-modality imaging"],
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      patients: "1500+",
      locations: ["St John of God Berwick", "Cabrini Hospital Malvern"],
      appointments: ["Alfred Hospital"],
      description: "Dr Ngu specializes in advanced cardiac imaging and uses multi-modality imaging techniques to better understand cardiac disease and improve patient outcomes. His expertise spans all forms of non-invasive cardiac assessment.",
      gradient: "from-emerald-500 via-emerald-600 to-teal-700",
      accentColor: "emerald"
    },
    {
      name: "Associate Professor Alex Voskoboinik",
      title: "General Cardiologist & Electrophysiologist",
      specialization: "Cardiac Rhythm Disturbances",
      experience: "7+ Years",
      education: "MBBS (Hons) Monash University 2008, PhD Baker Heart Institute 2019, Fellowship UCSF 2019",
      expertise: ["Pacemaker implantation", "Defibrillator implantation", "Catheter ablation", "Atrial fibrillation treatment"],
      image: "https://images.pexels.com/photos/5214030/pexels-photo-5214030.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      patients: "1200+",
      locations: ["Cabrini Hospital Malvern"],
      appointments: ["Western Health", "Alfred Health"],
      description: "Associate Professor Voskoboinik is a leading electrophysiologist specializing in rhythm disorders. He has extensive research experience and has won prestigious awards including the Ralph Reader Prize for top young investigator.",
      gradient: "from-rose-500 via-rose-600 to-pink-700",
      accentColor: "rose"
    },
    {
      name: "Dr Shane Nanayakkara",
      title: "Interventional & Structural Cardiologist",
      specialization: "Advanced Interventional Procedures",
      experience: "6+ Years",
      education: "MBBS Monash University, PhD Heart Failure, Advanced Fellowships in Intervention",
      expertise: ["Coronary angiography", "Coronary stenting", "Transcatheter valve procedures", "Structural heart interventions"],
      image: "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      patients: "1000+",
      locations: ["Alfred Hospital", "Cabrini Hospital Malvern", "Shepparton"],
      appointments: ["Alfred Hospital"],
      description: "Dr Nanayakkara is an interventional and structural cardiologist with expertise in advanced procedures including transcatheter valve interventions. He combines clinical excellence with research innovation and has a passion for both face-to-face and telemedicine care.",
      gradient: "from-amber-500 via-orange-600 to-red-700",
      accentColor: "amber"
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
    <section id="doctors" className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-200 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-blue-700 font-medium mb-6">
            <Stethoscope className="w-4 h-4" />
            <span>Meet Our Expert Team</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Expert
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Cardiologists
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our team of highly qualified cardiologists brings extensive experience and specialized expertise in all aspects of cardiovascular care, from general cardiology to advanced interventional procedures.
          </p>
        </div>

        {/* Premium Doctor Showcase */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
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
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-bold text-gray-900">{doctors[selectedDoctor].rating}</span>
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
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{doctors[selectedDoctor].experience}</p>
                    <p className="text-sm text-gray-600 font-medium">Experience</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
                    <Users className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{doctors[selectedDoctor].patients}</p>
                    <p className="text-sm text-gray-600 font-medium">Patients</p>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">Education & Training</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-11">{doctors[selectedDoctor].education}</p>
                </div>

                {/* Expertise */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg">Areas of Expertise</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {doctors[selectedDoctor].expertise.map((skill, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">Consulting Locations</span>
                  </div>
                  <div className="space-y-2 pl-11">
                    {doctors[selectedDoctor].locations.map((location, idx) => (
                      <p key={idx} className="text-gray-600 font-medium">{location}</p>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full bg-gradient-to-r ${doctors[selectedDoctor].gradient} text-white py-4 rounded-2xl hover:shadow-xl transition-all duration-300 font-bold text-lg transform hover:-translate-y-1`}>
                  Book with {doctors[selectedDoctor].name.split(' ')[1]}
                </button>
              </div>
            </div>

            {/* Enhanced Doctor Selection */}
            <div className="flex justify-center space-x-4 p-8 bg-gray-50/50">
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
                      : 'bg-gray-300 hover:bg-gray-400 w-4 h-4 rounded-full'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Premium Doctor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                setSelectedDoctor(index);
                setIsAutoPlaying(false);
              }}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer overflow-hidden ${
                selectedDoctor === index ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${doctor.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative p-8 space-y-6">
                {/* Doctor Image */}
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 object-cover rounded-2xl mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${doctor.gradient} rounded-full flex items-center justify-center`}>
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                {/* Doctor Info */}
                <div className="text-center space-y-3">
                  <h4 className="font-bold text-gray-900 text-lg leading-tight">{doctor.name}</h4>
                  <p className="text-sm text-blue-600 font-semibold">{doctor.specialization}</p>
                  <p className="text-xs text-gray-600">{doctor.experience}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">{doctor.rating}</span>
                  </div>
                </div>

                {/* Hover Effect */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm flex items-center justify-center rounded-2xl transition-all duration-300">
                    <div className="text-center space-y-3">
                      <Calendar className={`w-8 h-8 mx-auto text-${doctor.accentColor}-600`} />
                      <p className="font-bold text-gray-900">Book Consultation</p>
                      <p className="text-sm text-gray-600">Click to learn more</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Statistics */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden">
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
              <div className="text-4xl lg:text-5xl font-bold">4</div>
              <div className="text-white/80 font-medium">Convenient Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;