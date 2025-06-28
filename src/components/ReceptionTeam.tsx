import React, { useState, useEffect, useRef } from 'react';
import { Users, Heart, Clock, Phone, Smile, Award } from 'lucide-react';

const ReceptionTeam: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const receptionTeam = [
    {
      name: "Emma Mayne",
      title: "Medical Administration Specialist",
      experience: "7+ Years",
      joinedYear: "2022",
      description: "Emma joined the team in 2022 and has more than 7 years of medical administration experience, both in a hospital and clinical settings. Emma is known to be kind, empathetic and professional and always does whatever she can to help patients and her colleagues.",
      qualities: ["Kind & Empathetic", "Professional", "Helpful", "Experienced"],
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Medical Administration", "Patient Care", "Hospital Systems", "Clinical Support"],
      color: "from-rose-100 to-pink-100"
    },
    {
      name: "Michelle Goodier",
      title: "Patient Care Coordinator",
      experience: "Extensive Customer Service",
      joinedYear: "2022",
      description: "Michelle joined our team in 2022. Michelle has a long career in customer service roles including aged care as a personal carer. She is caring, friendly and brings a bright demeanour to the practice. She is known to make patients comfortable and give them a laugh.",
      qualities: ["Caring & Friendly", "Bright Demeanour", "Comforting", "Humorous"],
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Customer Service", "Aged Care", "Personal Care", "Patient Comfort"],
      color: "from-blue-100 to-purple-100"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % receptionTeam.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reception-team" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Meet Our Reception Team
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our friendly and professional reception team is your first point of contact, ensuring every patient feels welcomed, comfortable, and well-cared for from the moment you arrive.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {receptionTeam.map((member, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                activeCard === index ? 'scale-105 ring-2 ring-blue-200' : 'hover:scale-102'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Member Image */}
              <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${member.color}`}>
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.title}`}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Experience Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">{member.experience}</span>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg">{member.title}</p>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Joined our team in {member.joinedYear}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{member.description}</p>

                {/* Qualities */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-blue-600" />
                    <span>Key Qualities</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {member.qualities.map((quality, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{quality}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r ${member.color} text-blue-700 text-sm rounded-full`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Our Reception Philosophy</h3>
              <p className="text-lg text-gray-600">
                Our reception team understands that visiting a cardiologist can be stressful. That's why Emma and Michelle are dedicated to creating a warm, welcoming environment where patients feel comfortable and supported throughout their entire experience.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Smile className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Patient Comfort</span>
                  </div>
                  <p className="text-sm text-gray-600">Making every patient feel at ease and welcome</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Professional Service</span>
                  </div>
                  <p className="text-sm text-gray-600">Efficient, knowledgeable administrative support</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600">2022</div>
                <div className="text-sm text-gray-600">Both joined our team</div>
              </div>
              <div className="bg-gradient-to-br from-rose-100 to-pink-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-rose-600">7+</div>
                <div className="text-sm text-gray-600">Years combined experience</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-emerald-600">100%</div>
                <div className="text-sm text-gray-600">Patient satisfaction focus</div>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-amber-600">4</div>
                <div className="text-sm text-gray-600">Locations supported</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Reception */}
        <div className={`mt-12 bg-blue-600 rounded-2xl p-8 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Schedule Your Appointment?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Emma and Michelle are here to help you book your consultation, answer questions about our services, and ensure your visit goes smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold transform hover:scale-105">
              <Phone className="w-5 h-5" />
              <span>Call Reception</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold transform hover:scale-105">
              Book Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceptionTeam;