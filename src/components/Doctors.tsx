import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, Clock, Star, MapPin, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
      color: "from-blue-100 to-purple-100"
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
      color: "from-emerald-100 to-teal-100"
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
      color: "from-rose-100 to-pink-100"
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
      color: "from-amber-100 to-orange-100"
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
    <section id="doctors" className="py-20 bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Our Expert Cardiologists
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of highly qualified cardiologists brings extensive experience and specialized expertise in all aspects of cardiovascular care, from general cardiology to advanced interventional procedures.
          </p>
        </div>

        {/* Interactive Doctor Showcase */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-purple-100">
            <div className="grid lg:grid-cols-2">
              {/* Doctor Image and Info */}
              <div className={`bg-gradient-to-br ${doctors[selectedDoctor].color} p-8 lg:p-12 relative`}>
                <div className="relative">
                  <img
                    src={doctors[selectedDoctor].image}
                    alt={`${doctors[selectedDoctor].name} - ${doctors[selectedDoctor].title}`}
                    className="w-64 h-64 object-cover rounded-2xl mx-auto shadow-lg"
                  />
                  <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{doctors[selectedDoctor].rating}</span>
                  </div>
                </div>
                
                <div className="text-center mt-6 space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">{doctors[selectedDoctor].name}</h3>
                  <p className="text-purple-600 font-semibold">{doctors[selectedDoctor].title}</p>
                  <p className="text-gray-600">{doctors[selectedDoctor].specialization}</p>
                </div>

                {/* Navigation */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4">
                  <button
                    onClick={prevDoctor}
                    className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <button
                    onClick={nextDoctor}
                    className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-8 lg:p-12 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">{doctors[selectedDoctor].experience}</p>
                    <p className="text-sm text-gray-600">Experience</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                    <Award className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">{doctors[selectedDoctor].patients}</p>
                    <p className="text-sm text-gray-600">Patients</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-gray-800">Education</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{doctors[selectedDoctor].education}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctors[selectedDoctor].expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <span className="font-semibold text-gray-800">Consulting Locations</span>
                    </div>
                    <div className="space-y-1">
                      {doctors[selectedDoctor].locations.map((location, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{location}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white py-3 rounded-full hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold">
                  Book Consultation with {doctors[selectedDoctor].name.split(' ')[1]}
                </button>
              </div>
            </div>

            {/* Doctor Selection Dots */}
            <div className="flex justify-center space-x-2 p-6 bg-gray-50/50">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDoctor(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedDoctor 
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {doctors.map((doctor, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDoctor(index);
                setIsAutoPlaying(false);
              }}
              className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-2 ${
                selectedDoctor === index
                  ? `bg-gradient-to-br ${doctor.color} shadow-xl scale-105 border-2 border-purple-200`
                  : 'bg-white/80 shadow-lg hover:shadow-xl border border-gray-100'
              }`}
            >
              <div className="space-y-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 object-cover rounded-full mx-auto"
                />
                <div className="text-center space-y-1">
                  <h4 className="font-bold text-gray-800">{doctor.name}</h4>
                  <p className="text-sm text-purple-600">{doctor.specialization}</p>
                  <p className="text-xs text-gray-600">{doctor.experience}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-emerald-100 rounded-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">4</div>
              <div className="text-sm text-gray-600">Expert Cardiologists</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">36+</div>
              <div className="text-sm text-gray-600">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-rose-500 bg-clip-text text-transparent">5700+</div>
              <div className="text-sm text-gray-600">Patients Treated</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">4</div>
              <div className="text-sm text-gray-600">Convenient Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;