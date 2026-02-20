import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, MapPin, Phone, Clock, FileText, Search, Mail } from 'lucide-react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import Button from './ui/Button';
import { DEFAULT_VIEWPORT } from '../lib/motion';

const SERVICE_IDS = [
  'consultation',
  'echocardiography',
  'holter',
  'angiography',
  'stress-echo',
  'toe',
  'toe-dcr',
  'af-ablation',
  'tavi',
  'mteer',
  'pacemaker',
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>('consultation');
  const [isPaused, setIsPaused] = useState(false);
  const { isMobile } = useMobileDetection();

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  // Auto-cycling through services
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setSelectedService(current => {
        const currentIndex = SERVICE_IDS.findIndex((id) => id === current);
        const nextIndex = (currentIndex + 1) % SERVICE_IDS.length;
        return SERVICE_IDS[nextIndex];
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


  /** Small fact cell used in the expanded card */
  const QuickFact = ({
    icon: Icon,
    title,
    value,
  }: {
    icon: React.ComponentType<{ className?: string; size?: number | string }>;
    title: string;
    value: string;
  }) => (
    <div className="text-center">
      <Icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
      <p className="font-semibold text-secondary-800 text-sm">{title}</p>
      <p className="text-xs text-secondary-600">{value}</p>
    </div>
  );

  const services = useMemo(() => [
    {
      id: 'consultation',
      name: "Consultation",
      category: 'consultation',
      icon: <Stethoscope className="w-5 h-5" />,
      shortDescription: "Comprehensive cardiac assessment and specialist consultation",
      duration: "30 minutes",
      preparation: "Minimal preparation required",
      locations: ["Cabrini Malvern", "Pakenham", "Clyde"],
      description: "A comprehensive cardiac consultation is your first step towards understanding and managing your heart health. Our experienced cardiologists will review your medical history, perform a thorough examination, and discuss your symptoms and concerns.",
      cost: "Medicare rebates available",
      image: "/images/consult.webp"
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
      image: "/images/echo.webp"
    },
    {
      id: 'holter',
      name: "Holter Monitoring",
      category: 'monitoring',
      icon: <Clock className="w-5 h-5" />,
      shortDescription: "Continuous cardiac rhythm monitoring from 24 hours to one month",
      duration: "24 hours to 1 month continuous",
      preparation: "Normal daily activities",
      locations: ["Cabrini Malvern", "Pakenham", "Clyde"],
      description: "Holter monitoring involves wearing a small, portable device that continuously records your heart rhythm for periods ranging from 24 hours to one month. This helps detect irregular heartbeats that may not occur during a brief office visit.",
      cost: "Medicare rebates available",
      image: "/images/holter.webp"
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
      description: "Coronary angiography is a specialised X-ray procedure that uses contrast dye to visualise the coronary arteries. This gold-standard test can detect blockages and assess the need for intervention.",
      cost: "Performed at The Alfred (public); private health insurance recommended for Cabrini and SJOG",
      image: "/images/angio.webp"
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
      cost: "Bulk billed for eligible patients",
      image: "/images/stressecho.webp"
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
      image: "/images/toe_drawn.webp"
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
      image: "/images/toe.webp"
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
      image: "/images/afabl_drawn.webp"
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
      cost: "Performed at The Alfred (public); private health insurance recommended for Cabrini",
      image: "/images/tavi.webp"
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
      cost: "Performed at The Alfred (public); private health insurance recommended for Cabrini",
      image: "/images/mteer_drawn.webp"
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
      cost: "Performed at The Alfred (public); private health insurance recommended for Cabrini",
      image: "/images/pacemaker.webp"
    }
  ], []);

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-primary-50/30 via-white to-cream-50/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className={`${isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-bold text-secondary-800 mb-8 leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
          >
            Our Cardiac Services
          </motion.h2>
          <motion.p 
            className={`${isMobile ? 'text-lg' : 'text-xl'} text-secondary-600 max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
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
                      <motion.div
                        className={`p-2 rounded-lg ${
                          selectedService === service.id 
                            ? isMobile
                              ? 'bg-primary-50/90 text-primary-700 shadow-md'
                              : 'bg-primary-100/80 text-primary-600'
                            : isMobile
                              ? 'bg-white/90 text-primary-600 shadow-sm'
                              : 'bg-primary-50/80 text-primary-500'
                        }`}
                        animate={
                          selectedService === service.id
                            ? { scale: [1, 1.3, 1], rotate: [0, -8, 8, 0] }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 12,
                          duration: 0.4,
                        }}
                      >
                        {service.icon}
                      </motion.div>
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
                        <motion.div
                          className="p-3 rounded-xl bg-primary-50/80 text-primary-600 shadow-sm"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.1 }}
                        >
                          {s.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-secondary-800 mb-2">{s.name}</h3>
                          <p className="text-secondary-600 text-sm">{s.shortDescription}</p>
                        </div>
                      </div>

                      {/* Image with Ken Burns effect + shimmer skeleton */}
                      <div className={`relative w-full ${isMobile ? 'h-72' : 'h-[28rem]'} rounded-2xl overflow-hidden mb-6`}>
                        {/* Shimmer skeleton */}
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-100 via-secondary-50 to-secondary-100 animate-shimmer bg-[length:200%_100%]" aria-hidden />
                        <motion.img
                          src={s.image}
                          alt={s.name}
                          className="relative w-full h-full object-cover"
                          initial={{ scale: 1.0, opacity: 0 }}
                          animate={{
                            scale: 1.08,
                            opacity: 1,
                            x: [0, 8, -4, 0],
                            y: [0, -6, 4, 0],
                          }}
                          transition={{
                            opacity: { duration: 0.5, ease: 'easeOut' },
                            scale: { duration: 20, ease: 'linear' },
                            x: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
                            y: { duration: 30, repeat: Infinity, ease: 'easeInOut' },
                          }}
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
          viewport={DEFAULT_VIEWPORT}
        >
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-6`}>
            Ready to Schedule Your Appointment?
          </h3>
          <p className={`text-primary-100 ${isMobile ? 'mb-6' : 'mb-8'} max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`}>
            Our reception team is ready to help you book the right service at the most convenient location for you.
          </p>
          <div className={`flex flex-col ${isMobile ? 'gap-4' : 'sm:flex-row gap-6'} justify-center`}>
            <Button 
              variant="white"
              size="large"
              icon={Phone}
              href="tel:(03) 9509 5009"
              isMobile={isMobile}
              className="bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg"
            >
              Call (03) 9509 5009
            </Button>
            <Button 
              variant="outline-white"
              size="large"
              icon={Mail}
              onClick={() => window.location.href = 'mailto:reception@heartclinicmelbourne.com.au'}
              isMobile={isMobile}
              className="shadow-md hover:shadow-lg backdrop-blur-sm"
            >
              Email Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Services);