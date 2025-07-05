import React, { useState, useEffect, useRef } from 'react';
import { Users, Phone, Smile, Award, Stethoscope, Activity, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMobileDetection } from '../hooks/useMobileDetection';

// Simple Collapse component
const Collapse: React.FC<{ isOpened: boolean; children: React.ReactNode }> = ({ isOpened, children }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpened ? 'auto' : 0,
        opacity: isOpened ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};

const ReceptionTeam: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobileDetection();

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  // Practice Manager (featured prominently)
  const practiceManager = {
    name: "Emma Mayne",
    title: "Practice Manager",
    experience: "7+ Years",
    description: "Emma joined the team in 2022 and has more than 7 years of medical administration experience, both in a hospital and clinical settings. As Practice Manager, she oversees all clinic operations and ensures the highest standards of patient care. Emma is known to be kind, empathetic and professional and always does whatever she can to help patients and her colleagues.",
    qualities: ["Leadership & Management", "Kind & Empathetic", "Professional Excellence", "Operational Oversight"],
    image: "/images/mayne.png",
    specialties: ["Practice Management", "Medical Administration", "Patient Care", "Team Leadership"],
    color: "from-primary-100 to-accent-100"
  };

  // Reception Team Members
  const receptionTeam = [
    {
      name: "Louise Georgeson",
      title: "Medical Receptionist",
      experience: "Healthcare Administration",
      description: "Louise brings valuable healthcare administration experience to our team. She is dedicated to ensuring smooth clinic operations and providing excellent patient service with attention to detail and professionalism.",
      qualities: ["Detail-Oriented", "Professional", "Reliable", "Patient-Focused"],
      image: "/images/georgeson.png",
      specialties: ["Healthcare Administration", "Appointment Scheduling", "Patient Records", "Insurance Processing"],
      color: "from-cream-100 to-sage-100"
    },
    {
      name: "Michelle Goodier",
      title: "Patient Care Coordinator",
      experience: "Extensive Customer Service",
      description: "Michelle joined our team in 2022. Michelle has a long career in customer service roles including aged care as a personal carer. She is caring, friendly and brings a bright demeanour to the practice.",
      qualities: ["Caring & Friendly", "Bright Demeanour", "Patient Comfort", "Customer Service"],
      image: "/images/goodier.png",
      specialties: ["Customer Service", "Aged Care", "Personal Care", "Patient Support"],
      color: "from-sage-100 to-primary-100"
    },
    {
      name: "Jennifer Haywood",
      title: "Administrative Assistant",
      experience: "Medical Office Support",
      description: "Jennifer provides essential administrative support to our clinical team. Her organizational skills and warm personality help create a welcoming environment for all patients visiting our clinic.",
      qualities: ["Organized", "Warm Personality", "Supportive", "Efficient"],
      image: "/images/placeholder1.png",
      specialties: ["Administrative Support", "Patient Communication", "File Management", "Clinical Coordination"],
      color: "from-accent-100 to-cream-100"
    },
    {
      name: "Georgie Kerr",
      title: "Reception Coordinator",
      experience: "Front Office Management",
      description: "The newest member of our team, Georgie coordinates our front office operations with enthusiasm and professionalism. She ensures that every patient interaction is positive and that our reception area runs smoothly throughout the day.",
      qualities: ["Enthusiastic", "Coordinated", "Professional", "Team Player"],
      image: "/images/placeholder2.png",
      specialties: ["Front Office Management", "Patient Flow", "Team Coordination", "Quality Assurance"],
      color: "from-primary-100 to-sage-100"
    },
    {
      name: "Alison Hodgens",
      title: "Patient Services Specialist",
      experience: "Healthcare Support",
      description: "Alison specializes in patient services and support, helping patients navigate their healthcare journey with confidence. Her compassionate approach ensures every patient feels heard and supported.",
      qualities: ["Compassionate", "Supportive", "Knowledgeable", "Patient Advocate"],
      image: "/images/alison.png",
      specialties: ["Patient Services", "Healthcare Navigation", "Insurance Assistance", "Patient Advocacy"],
      color: "from-sage-100 to-accent-100"
    },
    {
      name: "Leanne Marshall",
      title: "Administrative Coordinator",
      experience: "Medical Administration",
      description: "Leanne coordinates various administrative functions across our multiple locations. Her attention to detail and systematic approach help maintain consistency and quality in all our administrative processes.",
      qualities: ["Systematic", "Detail-Focused", "Multi-Location Coordinator", "Quality-Driven"],
      image: "/images/leanne.png",
      specialties: ["Multi-Location Coordination", "Process Management", "Quality Control", "Administrative Systems"],
      color: "from-cream-100 to-primary-100"
    }
  ];

  // Technologists Team
  const technologists = [
    {
      name: "Janie Puah",
      title: "Senior Cardiac Sonographer",
      experience: "Specialized Cardiac Imaging",
      description: "Janie is our senior cardiac sonographer with extensive experience in echocardiography and cardiac imaging. She provides high-quality diagnostic imaging services and works closely with our cardiologists to ensure accurate assessments.",
      qualities: ["Technical Excellence", "Patient Care", "Diagnostic Expertise", "Professional Development"],
      image: "/images/janie.png",
      specialties: ["Echocardiography", "Stress Echo", "Cardiac Imaging", "Patient Education"],
      color: "from-primary-100 to-accent-100"
    },
    {
      name: "Aaron Williams",
      title: "Cardiac Sonographer",
      experience: "Diagnostic Imaging",
      description: "Aaron brings fresh expertise to our imaging team with a focus on providing comfortable patient experiences during diagnostic procedures. His technical skills and patient-centered approach make him a valuable addition to our team.",
      qualities: ["Technical Proficiency", "Patient Comfort", "Innovation", "Collaborative"],
      image: "/images/placeholder3.png",
      specialties: ["Cardiac Ultrasound", "Diagnostic Procedures", "Patient Care", "Technical Innovation"],
      color: "from-primary-100 to-accent-100"
    },
    {
      name: "Janice Murrell",
      title: "Cardiac Technologist",
      experience: "Cardiac Diagnostics",
      description: "Janice is a skilled cardiac technologist who specializes in various cardiac diagnostic procedures. Her meticulous attention to detail and gentle approach with patients ensures high-quality diagnostic results while maintaining patient comfort throughout the process.",
      qualities: ["Detail-Oriented", "Patient-Centered", "Technical Precision", "Gentle Approach"],
      image: "/images/placeholder1.png",
      specialties: ["Cardiac Diagnostics", "ECG Interpretation", "Patient Monitoring", "Quality Assurance"],
      color: "from-primary-100 to-accent-100"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % (receptionTeam.length + technologists.length + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reception-team" className="py-32 bg-gradient-to-br from-cream-50 via-white to-primary-50/20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-primary-500 p-3 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-secondary-800`}>
              Our Team
            </h2>
          </div>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-secondary-600 max-w-3xl mx-auto leading-relaxed`}>
            Meet our dedicated team of professionals who ensure every patient receives exceptional care and support throughout their journey with us.
          </p>
        </div>

        {/* Practice Manager - Featured */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {isMobile ? (
            // Mobile: Collapsible Practice Manager Card
            <motion.div
              className="liquid-glass-card rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Compact Header - Always Visible */}
              <div 
                className="p-4 cursor-pointer flex items-center justify-between hover:bg-white/50 transition-colors"
                onClick={() => toggleCard('practice-manager')}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${practiceManager.color} flex-shrink-0 overflow-hidden border-2 border-primary-200`}>
                    <img
                      src={practiceManager.image}
                      alt={practiceManager.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-800 text-lg">{practiceManager.name}</h3>
                    <p className="text-primary-600 font-semibold text-sm">{practiceManager.title}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Award className="w-3 h-3 text-primary-600" />
                      <span className="text-xs text-secondary-600">{practiceManager.experience}</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedCards.has('practice-manager') ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </div>

              {/* Expandable Content */}
              <Collapse isOpened={expandedCards.has('practice-manager')}>
                <div className="px-4 pb-4">
                  <div className="border-t pt-4 space-y-4">
                    {/* Practice Manager Badge */}
                    <div className="bg-gradient-to-r from-primary-500/80 to-accent-500/80 backdrop-blur-sm p-3 rounded-xl text-white text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Award className="w-5 h-5" />
                        <span className="font-semibold">Practice Manager</span>
                      </div>
                    </div>

                    {/* Full Image */}
                    <div className={`relative h-64 overflow-hidden rounded-xl bg-gradient-to-br ${practiceManager.color}`}>
                      <img
                        src={practiceManager.image}
                        alt={`${practiceManager.name} - ${practiceManager.title}`}
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Experience Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                        <Award className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-semibold text-secondary-900">{practiceManager.experience}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-secondary-600 text-sm leading-relaxed">
                      {practiceManager.description}
                    </p>

                    {/* Qualities */}
                    <div className="space-y-2">
                      <h5 className="font-semibold text-secondary-800 text-sm">Leadership Qualities</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {practiceManager.qualities.map((quality, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                            <span className="text-xs text-secondary-600">{quality}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <h5 className="font-semibold text-secondary-800 text-sm">Leadership Areas</h5>
                      <div className="flex flex-wrap gap-2">
                        {practiceManager.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 bg-gradient-to-r ${practiceManager.color} text-primary-700 text-xs rounded-full font-medium`}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </motion.div>
          ) : (
            // Desktop: Original Layout
            <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-100">
              {/* Practice Manager Header */}
              <div className="bg-gradient-to-r from-primary-500/80 to-accent-500/80 backdrop-blur-sm p-6 text-white">
                <div className="flex items-center justify-center space-x-3">
                  <Award className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Practice Manager</h3>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 p-8">
                {/* Manager Image */}
                <div className="relative overflow-hidden rounded-2xl bg-white flex items-center justify-center">
                  <img
                    src={practiceManager.image}
                    alt={`${practiceManager.name} - ${practiceManager.title}`}
                    className="w-full h-96 object-cover object-center"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Award className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-semibold text-secondary-900">{practiceManager.experience}</span>
                  </div>
                </div>

                {/* Manager Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-secondary-800">{practiceManager.name}</h3>
                    <p className="text-primary-600 font-semibold text-xl">{practiceManager.title}</p>
                  </div>

                  {/* Description */}
                  <p className="text-secondary-600 leading-relaxed text-lg">{practiceManager.description}</p>

                  {/* Qualities Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {practiceManager.qualities.map((quality, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-secondary-700 font-medium">{quality}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specialties */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-secondary-800">Leadership Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {practiceManager.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className={`px-4 py-2 bg-gradient-to-r ${practiceManager.color} text-primary-700 text-sm rounded-full font-medium`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reception Team */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible || isMobile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="glass-primary rounded-2xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-secondary-800 mb-4">Reception Team</h3>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Our friendly reception team is your first point of contact, ensuring every patient feels welcomed and supported.
              </p>
            </div>
          </div>

          {isMobile ? (
            // Mobile: Collapsible Cards
            <div className="space-y-4">
              {receptionTeam.map((member, index) => {
                const cardId = `reception-${index}`;
                const isExpanded = expandedCards.has(cardId);
                
                return (
                  <motion.div
                    key={index}
                    className="liquid-glass-card rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Compact Header - Always Visible */}
                    <div 
                      className="p-4 cursor-pointer flex items-center justify-between hover:bg-white/50 transition-colors"
                      onClick={() => toggleCard(cardId)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex-shrink-0 overflow-hidden`}>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-secondary-800">{member.name}</h4>
                          <p className="text-primary-600 font-medium text-sm">{member.title}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </div>

                    {/* Expandable Content */}
                    <Collapse isOpened={isExpanded}>
                      <div className="px-4 pb-4">
                        <div className="border-t pt-4 space-y-4">
                          {/* Full Image */}
                          <div className={`relative h-48 overflow-hidden rounded-xl bg-gradient-to-br ${member.color}`}>
                            <img
                              src={member.image}
                              alt={`${member.name} - ${member.title}`}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>

                          {/* Description */}
                          <p className="text-secondary-600 text-sm leading-relaxed">
                            {member.description}
                          </p>

                          {/* Qualities */}
                          <div className="space-y-2">
                            <h5 className="font-semibold text-secondary-800 text-sm">Key Qualities</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {member.qualities.map((quality, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                                  <span className="text-xs text-secondary-600">{quality}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Specialties */}
                          <div className="space-y-2">
                            <h5 className="font-semibold text-secondary-800 text-sm">Experience Areas</h5>
                            <div className="flex flex-wrap gap-2">
                              {member.specialties.map((specialty, idx) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 bg-gradient-to-r ${member.color} text-primary-700 text-xs rounded-full font-medium`}
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Desktop: Original Layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {receptionTeam.map((member, index) => (
                <div
                  key={index}
                  className={`liquid-glass-card rounded-2xl overflow-hidden transform transition-all duration-500 ${
                    activeCard === index + 1 ? 'ring-2 ring-primary-200/30 shadow-xl' : 'hover:shadow-lg'
                  }`}
                  style={{ 
                    transformOrigin: 'center',
                    willChange: 'transform',
                    transform: activeCard === index + 1 ? 'scale(1.02)' : 'scale(1)',
                    transitionDelay: `${index * 100}ms` 
                  }}
                >
                  {/* Member Image */}
                  <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${member.color}`}>
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      className="w-full h-full object-cover object-center"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  {/* Member Info */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-secondary-800">{member.name}</h4>
                      <p className="text-primary-600 font-semibold text-sm">{member.title}</p>
                    </div>

                    {/* Description */}
                    <p className="text-secondary-600 text-sm leading-relaxed">{member.description}</p>

                    {/* Qualities */}
                    <div className="space-y-2">
                      <h5 className="font-semibold text-secondary-800 text-sm">Key Qualities</h5>
                      <div className="grid grid-cols-2 gap-1">
                        {member.qualities.slice(0, 4).map((quality, idx) => (
                          <div key={idx} className="flex items-center space-x-1">
                            <div className="w-1 h-1 bg-primary-600 rounded-full"></div>
                            <span className="text-xs text-secondary-600">{quality}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Technologists Team */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible || isMobile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="glass-sage rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-sage-500/20 backdrop-blur-sm p-3 rounded-xl border border-sage-300/30">
                  <Stethoscope className="w-6 h-6 text-sage-700" />
                </div>
                <h3 className="text-3xl font-bold text-secondary-800">Cardiac Technologists</h3>
              </div>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Our skilled technologists provide expert diagnostic imaging services with a focus on patient comfort and clinical excellence.
              </p>
            </div>
          </div>

          {isMobile ? (
            // Mobile: Collapsible Cards
            <div className="space-y-4">
              {technologists.map((tech, index) => {
                const cardId = `tech-${index}`;
                const isExpanded = expandedCards.has(cardId);
                
                return (
                  <motion.div
                    key={index}
                    className="liquid-glass-card rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Compact Header - Always Visible */}
                    <div 
                      className="p-4 cursor-pointer flex items-center justify-between hover:bg-white/50 transition-colors"
                      onClick={() => toggleCard(cardId)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tech.color} flex-shrink-0 overflow-hidden border-2 border-sage-200`}>
                          <img
                            src={tech.image}
                            alt={tech.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-secondary-800">{tech.name}</h4>
                          <p className="text-sage-600 font-medium text-sm">{tech.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-sage-600" />
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <Collapse isOpened={isExpanded}>
                      <div className="px-4 pb-4">
                        <div className="border-t pt-4 space-y-4">
                          {/* Tech Badge */}
                          <div className="bg-gradient-to-r from-sage-500/80 to-primary-500/80 backdrop-blur-sm p-3 rounded-xl text-white text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Activity className="w-5 h-5" />
                              <span className="font-semibold">Cardiac Technologist</span>
                            </div>
                          </div>

                          {/* Full Image */}
                          <div className={`relative h-48 overflow-hidden rounded-xl bg-gradient-to-br ${tech.color}`}>
                            <img
                              src={tech.image}
                              alt={`${tech.name} - ${tech.title}`}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>

                          {/* Description */}
                          <p className="text-secondary-600 text-sm leading-relaxed">
                            {tech.description}
                          </p>

                          {/* Specialties */}
                          <div className="space-y-2">
                            <h5 className="font-semibold text-secondary-800 text-sm">Technical Expertise</h5>
                            <div className="flex flex-wrap gap-2">
                              {tech.specialties.map((specialty, idx) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 bg-gradient-to-r ${tech.color} text-sage-700 text-xs rounded-full font-medium`}
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Qualities */}
                          <div className="space-y-2">
                            <h5 className="font-semibold text-secondary-800 text-sm">Professional Qualities</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {tech.qualities.map((quality, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-sage-600 rounded-full"></div>
                                  <span className="text-xs text-secondary-600">{quality}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Desktop: Original Layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technologists.map((tech, index) => (
                <div
                  key={index}
                  className={`liquid-glass-card rounded-2xl overflow-hidden hover:shadow-xl transform transition-all duration-500 ${
                    activeCard === index + receptionTeam.length + 1 ? 'ring-2 ring-sage-200/30 shadow-xl' : 'hover:shadow-lg'
                  }`}
                  style={{ 
                    transformOrigin: 'center',
                    willChange: 'transform',
                    transform: activeCard === index + receptionTeam.length + 1 ? 'scale(1.02)' : 'scale(1)',
                    transitionDelay: `${index * 150}ms` 
                  }}
                >
                  {/* Tech Header */}
                  <div className="bg-gradient-to-r from-sage-500/80 to-primary-500/80 backdrop-blur-sm p-4 text-white">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span className="font-semibold">Cardiac Technologist</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Tech Image */}
                    <div className={`relative h-72 overflow-hidden rounded-xl bg-gradient-to-br ${tech.color}`}>
                      <img
                        src={tech.image}
                        alt={`${tech.name} - ${tech.title}`}
                        className="w-full h-full object-cover object-center"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </div>

                    {/* Tech Info */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-secondary-800">{tech.name}</h4>
                        <p className="text-sage-600 font-semibold">{tech.title}</p>
                      </div>

                      {/* Description */}
                      <p className="text-secondary-600 leading-relaxed">{tech.description}</p>

                      {/* Specialties */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-secondary-800">Technical Expertise</h5>
                        <div className="flex flex-wrap gap-2">
                          {tech.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1 bg-gradient-to-r ${tech.color} text-sage-700 text-sm rounded-full`}
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Qualities */}
                      <div className="space-y-2">
                        <h5 className="font-semibold text-secondary-800">Professional Qualities</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {tech.qualities.map((quality, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-sage-600 rounded-full"></div>
                              <span className="text-sm text-secondary-600">{quality}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Statistics */}
        <div className={`premium-card rounded-3xl p-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-secondary-800">Our Team Philosophy</h3>
              <p className="text-lg text-secondary-600 leading-relaxed">
                Our comprehensive team approach ensures that every aspect of your care is handled with professionalism, compassion, and expertise. From your first phone call to your diagnostic procedures, our team works together to provide seamless, patient-centered care.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Smile className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-secondary-800">Patient-Centered Care</span>
                  </div>
                  <p className="text-sm text-secondary-600">Every interaction focused on your comfort and wellbeing</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-secondary-800">Professional Excellence</span>
                  </div>
                  <p className="text-sm text-secondary-600">Highly trained professionals committed to quality care</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-primary p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-primary-600">10</div>
                <div className="text-sm text-secondary-600">Team Members</div>
              </div>
              <div className="glass-sage p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-sage-600">4</div>
                <div className="text-sm text-secondary-600">Locations Supported</div>
              </div>
              <div className="glass-accent p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-accent-600">100%</div>
                <div className="text-sm text-secondary-600">Patient Satisfaction Focus</div>
              </div>
              <div className="glass-cream p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-secondary-600">Support Commitment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Team */}
        <div className={`mt-16 bg-primary-500 rounded-3xl p-12 text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-white mb-6">
            Would you like to book an appointment?
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Our entire team is here to support you through every step of your cardiac care journey. Contact us today to schedule your consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-primary-600 px-10 py-4 rounded-2xl hover:bg-primary-50 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg transform hover:scale-105">
              <Phone className="w-5 h-5" />
              <span>Call Our Team</span>
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-2xl hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg transform hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceptionTeam;