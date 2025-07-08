import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, MapPin, Phone, Clock, FileText, BookOpen, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMobileDetection } from '../hooks/useMobileDetection';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>('consultation');
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useMobileDetection();

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Educational content mapping for services that have learning library content
  const educationalLinks = {
    'angiography': {
      hasContent: true,
      learningPath: 'journey-maps',
      procedure: 'angiogram_pci',
      title: 'Learn about the complete coronary angiography journey'
    },
    'tavi': {
      hasContent: true,
      learningPath: 'journey-maps', 
      procedure: 'tavi',
      title: 'Explore the TAVI procedure journey and what to expect'
    },
    'consultation': {
      hasContent: true,
      learningPath: 'tests',
      procedure: 'consultation',
      title: 'Common questions about cardiac consultations'
    },
    'toe': {
      hasContent: true,
      learningPath: 'journey-maps',
      procedure: 'toe_dcr',
      title: 'Learn more about TOE procedures and imaging'
    },
    'toe-dcr': {
      hasContent: true,
      learningPath: 'journey-maps',
      procedure: 'toe_dcr',
      title: 'Learn about TOE-guided cardioversion process'
    },
    'af-ablation': {
      hasContent: true,
      learningPath: 'journey-maps',
      procedure: 'af_ablation',
      title: 'Understand the AF ablation procedure journey'
    },
    'pacemaker': {
      hasContent: true,
      learningPath: 'journey-maps',
      procedure: 'pacemaker',
      title: 'Learn about pacemaker implantation process'
    },
    'echocardiography': {
      hasContent: true,
      learningPath: 'tests',
      procedure: 'echocardiography',
      title: 'Learn about echocardiography and cardiac imaging'
    },
    'stress-echo': {
      hasContent: true,
      learningPath: 'tests',
      procedure: 'stress-test',
      title: 'Understand stress echocardiography testing'
    },
    'holter': {
      hasContent: true,
      learningPath: 'tests',
      procedure: 'holter',
      title: 'Understanding heart rhythm monitoring'
    }
  };

  // Auto-cycling through services
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setSelectedService(current => {
        const currentIndex = services.findIndex(s => s.id === current);
        const nextIndex = (currentIndex + 1) % services.length;
        return services[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsPaused(true);
    // Resume auto-cycling after 10 seconds of user inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleLearnMore = (serviceId: string) => {
    const linkInfo = educationalLinks[serviceId as keyof typeof educationalLinks];
    if (linkInfo?.hasContent) {
      const focusParam = linkInfo.procedure;
      const targetUrl = `/learning-library?tab=${linkInfo.learningPath}&focus=${focusParam}`;
      console.log('Navigating to:', targetUrl, 'for service:', serviceId, 'with linkInfo:', linkInfo);
      navigate(targetUrl);
    } else {
      console.log('No educational content found for service:', serviceId);
    }
  };

  /** Small fact cell used in the expanded card */
  const QuickFact = ({
    icon: Icon,
    title,
    value,
  }: {
    icon: React.FC<any>;
    title: string;
    value: string;
  }) => (
    <div className="text-center">
      <Icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
      <p className="font-semibold text-secondary-800 text-sm">{title}</p>
      <p className="text-xs text-secondary-600">{value}</p>
    </div>
  );

  const services = [
    {
      id: 'consultation',
      name: "Consultation",
      category: 'consultation',
      icon: <Stethoscope className="w-5 h-5" />,
      shortDescription: "Comprehensive cardiac assessment and specialist consultation",
      duration: "20-40 minutes",
      preparation: "Minimal preparation required",
      locations: ["Cabrini Malvern", "Pakenham", "Clyde"],
      description: "A comprehensive cardiac consultation is your first step towards understanding and managing your heart health. Our experienced cardiologists will review your medical history, perform a thorough examination, and discuss your symptoms and concerns.",
      cost: "Medicare rebates available",
      image: "/images/consult.png"
    },
    {
      id: 'echocardiography',
      name: "Echocardiography",
      category: 'imaging',
      icon: <Activity className="w-5 h-5" />,
      shortDescription: "Resting and stress echocardiography for detailed cardiac imaging",
      duration: "30-45 minutes",
      preparation: "Comfortable clothing recommended",
      locations: ["Pakenham", "Clyde"],
      description: "Echocardiography uses ultrasound waves to create detailed images of your heart. This non-invasive test allows us to assess heart function, valve performance, and detect structural abnormalities.",
      cost: "Bulk billed for eligible patients",
      image: "/images/echo.png"
    },
    {
      id: 'holter',
      name: "24 Hour Holter Monitoring",
      category: 'monitoring',
      icon: <Clock className="w-5 h-5" />,
      shortDescription: "Continuous cardiac rhythm monitoring over 24 hours",
      duration: "24 hours continuous",
      preparation: "Normal daily activities",
      locations: ["Cabrini Malvern", "Pakenham", "Clyde"],
      description: "Holter monitoring involves wearing a small, portable device that continuously records your heart rhythm for 24 hours. This helps detect irregular heartbeats that may not occur during a brief office visit.",
      cost: "Medicare rebates available",
      image: "/images/holter.png"
    },
    {
      id: 'angiography',
      name: "Coronary Angiography",
      category: 'interventional',
      icon: <Heart className="w-5 h-5" />,
      shortDescription: "Advanced imaging of coronary arteries to detect blockages",
      duration: "30-60 minutes",
      preparation: "Fasting required",
      locations: ["Cabrini Malvern", "Berwick", "The Alfred"],
      description: "Coronary angiography is a specialized X-ray procedure that uses contrast dye to visualize the coronary arteries. This gold-standard test can detect blockages and assess the need for intervention.",
      cost: "Hospital admission may be required",
      image: "/images/angio.png"
    },
    {
      id: 'stress-echo',
      name: "Stress Echocardiography",
      category: 'imaging',
      icon: <Activity className="w-5 h-5" />,
      shortDescription: "Exercise or pharmacological stress testing with echocardiography",
      duration: "60-90 minutes",
      preparation: "Comfortable exercise clothing required",
      locations: ["Pakenham", "Clyde"],
      description: "Stress echocardiography combines ultrasound imaging with stress testing to evaluate heart function under stress conditions. This helps detect coronary artery disease and assess exercise capacity.",
      cost: "Medicare rebates available",
      image: "/images/stressecho.png"
    },
    {
      id: 'toe',
      name: "Transoesophageal Echocardiography (TOE)",
      category: 'imaging',
      icon: <Search className="w-5 h-5" />,
      shortDescription: "Advanced cardiac imaging via esophageal probe for detailed assessment",
      duration: "30-45 minutes",
      preparation: "Fasting required, light sedation available",
      locations: ["Cabrini Malvern", "Berwick", "The Alfred"],
      description: "TOE provides superior cardiac images by placing an ultrasound probe in the oesophagus. This advanced technique offers detailed views of heart structures, particularly useful for valve assessment and detecting blood clots.",
      cost: "Day procedure charges apply",
      image: "/images/toe_drawn.png"
    },
    {
      id: 'toe-dcr',
      name: "TOE-Guided Cardioversion",
      category: 'procedures',
      icon: <Zap className="w-5 h-5" />,
      shortDescription: "Electrical cardioversion with TOE guidance for atrial fibrillation",
      duration: "2-3 hours including recovery",
      preparation: "Fasting and pre-procedure assessments required",
      locations: ["Cabrini Malvern", "Berwick", "The Alfred"],
      description: "TOE-guided cardioversion combines transesophageal echocardiography with electrical cardioversion to safely restore normal heart rhythm in patients with atrial fibrillation.",
      cost: "Day procedure charges apply",
      image: "https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'af-ablation',
      name: "Atrial Fibrillation Ablation",
      category: 'electrophysiology',
      icon: <Zap className="w-5 h-5" />,
      shortDescription: "Advanced catheter ablation including Pulsed Field Ablation (PFA)",
      duration: "3-5 hours",
      preparation: "Hospital admission required",
      locations: ["Cabrini Malvern", "Berwick", "The Alfred"],
      description: "Catheter ablation for atrial fibrillation uses advanced techniques including the latest Pulsed Field Ablation (PFA) technology to eliminate abnormal electrical pathways causing irregular heart rhythm.",
      cost: "Overnight hospital admission required",
      image: "/images/afabl_drawn.png"
    },
    {
      id: 'tavi',
      name: "Transcatheter Aortic Valve Implantation (TAVI)",
      category: 'interventional',
      icon: <Heart className="w-5 h-5" />,
      shortDescription: "Minimally invasive aortic valve replacement via catheter",
      duration: "2-3 hours",
      preparation: "Comprehensive pre-procedure assessment required",
      locations: ["Cabrini Malvern", "The Alfred"],
      description: "TAVI is a minimally invasive procedure to replace a diseased aortic valve without open heart surgery. A new valve is delivered via catheter, typically through the groin artery.",
      cost: "Private health insurance recommended",
      image: "/images/tavi.png"
    },
    {
      id: 'mteer',
      name: "Mitral Transcatheter Edge-to-Edge Repair (mTEER)",
      category: 'interventional',
      icon: <Heart className="w-5 h-5" />,
      shortDescription: "Minimally invasive mitral valve repair using keyhole technology",
      duration: "2-4 hours",
      preparation: "Multidisciplinary team assessment required",
      locations: ["Cabrini Malvern", "The Alfred"],
      description: "mTEER is a minimally invasive procedure to repair a leaking mitral valve using advanced clip technology. This procedure can significantly improve symptoms without open heart surgery.",
      cost: "Private health insurance recommended",
      image: "/images/mteer_drawn.png"
    },
    {
      id: 'pacemaker',
      name: "Pacemaker Insertion",
      category: 'electrophysiology',
      icon: <Zap className="w-5 h-5" />,
      shortDescription: "Permanent pacemaker implantation for heart rhythm disorders",
      duration: "1-2 hours",
      preparation: "Day procedure or overnight stay",
      locations: ["Cabrini Malvern", "Berwick", "The Alfred"],
      description: "Pacemaker insertion is a procedure to implant a small electronic device that helps regulate your heart rhythm. The pacemaker monitors your heart rate and delivers electrical impulses when needed to maintain a normal rhythm.",
      cost: "Private health insurance recommended",
      image: "/images/pacemaker.png"
    }
  ];

  return (
    <section id="services" className="py-32 bg-gradient-to-br from-white via-cream-25 to-primary-25/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className={`${isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-bold text-secondary-800 mb-8 leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Cardiac Services
          </motion.h2>
          <motion.p 
            className={`${isMobile ? 'text-lg' : 'text-xl'} text-secondary-600 max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Comprehensive cardiac care with detailed patient information to help you understand what to expect during your visit.
          </motion.p>
        </div>

        {/* Services Menu + Detail Layout */}
        <div className="mb-20">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-5'} gap-8`}>
            {/* Services Menu List */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-2'} flex flex-col`}>
              <div className="space-y-2 flex-1">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedService === service.id
                        ? isMobile 
                          ? 'bg-white/95 border-2 border-primary-200/30 shadow-2xl backdrop-blur-sm' 
                          : 'bg-white/90 border-2 border-primary-200/50 shadow-xl backdrop-blur-sm'
                        : isMobile
                          ? 'bg-white/85 border-2 border-transparent hover:bg-white/95 hover:border-primary-100/30 shadow-xl hover:shadow-2xl backdrop-blur-sm'
                          : 'bg-white/70 border-2 border-transparent hover:bg-white/90 hover:border-primary-100 shadow-lg backdrop-blur-sm'
                    }`}
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedService === service.id 
                          ? isMobile
                            ? 'bg-primary-50/90 text-primary-700 shadow-md'
                            : 'bg-primary-100/80 text-primary-600'
                          : isMobile
                            ? 'bg-white/90 text-primary-600 shadow-sm'
                            : 'bg-primary-50/80 text-primary-500'
                      }`}>
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-800 text-sm leading-tight">
                          {service.name}
                        </h4>
                        <p className="text-xs text-secondary-600 mt-1">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Detail Card */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'} flex flex-col`}>
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {selectedService && (() => {
                    const s = services.find((x) => x.id === selectedService)!;
                    return (
                      <motion.div
                        key={selectedService}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`${isMobile ? 'bg-white/95 shadow-2xl' : 'bg-white/80 shadow-2xl'} backdrop-blur-sm rounded-3xl p-8 h-full flex flex-col border border-white/20`}
                      >
                      {/* Header */}
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="p-3 rounded-xl bg-primary-50/80 text-primary-600 shadow-sm">
                          {s.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-secondary-800 mb-2">{s.name}</h3>
                          <p className="text-secondary-600 text-sm">{s.shortDescription}</p>
                        </div>
                      </div>

                      {/* Image */}
                      <div className={`w-full ${isMobile ? 'h-72' : 'h-[28rem]'} rounded-2xl overflow-hidden mb-6`}>
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Description */}
                      <p className="text-secondary-700 leading-relaxed mb-6">{s.description}</p>

                      {/* Quick Facts */}
                      <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'} p-4 bg-white/60 backdrop-blur-sm rounded-xl mb-6 shadow-inner border border-white/30`}>
                        <QuickFact icon={Clock} title="Duration" value={s.duration} />
                        <QuickFact icon={MapPin} title="Locations" value={s.locations.join(', ')} />
                        <QuickFact icon={FileText} title="Cost" value={s.cost} />
                      </div>

                      {/* Learn More Button */}
                      {educationalLinks[s.id as keyof typeof educationalLinks]?.hasContent && (
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Learn More button clicked for:', s.id);
                            handleLearnMore(s.id);
                          }}
                          className={`w-full bg-sage-500 text-white ${isMobile ? 'py-4 min-h-[44px]' : 'py-3'} rounded-xl flex items-center justify-center space-x-2 hover:bg-sage-600 transition-colors duration-200`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Learn More in Library</span>
                        </motion.button>
                      )}
                    </motion.div>
                  );
                })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className={`bg-gradient-to-r from-primary-500/90 to-accent-500/90 backdrop-blur-sm rounded-3xl ${isMobile ? 'p-8' : 'p-12'} text-center ${isMobile ? 'mt-16' : 'mt-32'} shadow-2xl border border-white/20`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-6`}>
            Ready to Schedule Your Appointment?
          </h3>
          <p className={`text-primary-100 ${isMobile ? 'mb-6' : 'mb-8'} max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`}>
            Our reception team is ready to help you book the right service at the most convenient location for you.
          </p>
          <div className={`flex flex-col ${isMobile ? 'gap-4' : 'sm:flex-row gap-6'} justify-center`}>
            <button className={`bg-white/95 backdrop-blur-sm text-primary-600 ${isMobile ? 'px-8 py-4 min-h-[44px] text-base' : 'px-10 py-4 text-lg'} rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold shadow-md`}>
              <Phone className="w-5 h-5" />
              <span>Call (03) 9509 5009</span>
            </button>
            <button 
              onClick={() => window.location.href = 'mailto:reception@hcm2025.com.au'}
              className={`border-2 border-white/80 text-white ${isMobile ? 'px-8 py-4 min-h-[44px] text-base' : 'px-10 py-4 text-lg'} rounded-2xl hover:bg-white hover:text-primary-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg backdrop-blur-sm`}
            >
              Email Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;