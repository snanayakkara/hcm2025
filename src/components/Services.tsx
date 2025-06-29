import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, MapPin, Phone, Clock, FileText, AlertCircle, CheckCircle, Info, BookOpen, ExternalLink, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState(0);
  const navigate = useNavigate();

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
      learningPath: 'faq',
      section: 'consultation',
      title: 'Common questions about cardiac consultations'
    },
    'toe': {
      hasContent: true,
      learningPath: 'tests',
      procedure: 'toe',
      title: 'Learn more about TOE procedures and imaging'
    },
    'af-ablation': {
      hasContent: true,
      learningPath: 'journey-maps',
      procedure: 'ablation',
      title: 'Understand the AF ablation procedure journey'
    },
    'echocardiography': {
      hasContent: true,
      learningPath: 'tests',
      procedure: 'echo',
      title: 'Learn about echocardiography and cardiac imaging'
    },
    'holter': {
      hasContent: true,
      learningPath: 'tests',
      procedure: 'holter',
      title: 'Understanding heart rhythm monitoring'
    }
  };

  const handleLearnMore = (serviceId: string) => {
    const linkInfo = educationalLinks[serviceId as keyof typeof educationalLinks];
    if (linkInfo?.hasContent) {
      const focusParam = ('procedure' in linkInfo) ? linkInfo.procedure : 
                        ('section' in linkInfo) ? linkInfo.section : serviceId;
      navigate(`/learning-library?tab=${linkInfo.learningPath}&focus=${focusParam}`);
    }
  };

  // Animation variants
  const cardVariants = {
    rest: { 
      scale: 1, 
      y: 0,
      backgroundColor: prefersReducedMotion ? '#ffffff' : '#ffffff',
      transition: { duration: prefersReducedMotion ? 0 : 0.2, type: "spring", stiffness: 300 }
    },
    hover: { 
      scale: prefersReducedMotion ? 1 : 1.05, 
      y: prefersReducedMotion ? 0 : -2,
      backgroundColor: prefersReducedMotion ? '#f8fafc' : '#f1f5f9',
      transition: { duration: prefersReducedMotion ? 0 : 0.2, type: "spring", stiffness: 400 }
    },
    active: { 
      scale: prefersReducedMotion ? 1 : 1.02, 
      y: 0,
      backgroundColor: prefersReducedMotion ? '#3b82f6' : '#3b82f6',
      transition: { duration: prefersReducedMotion ? 0 : 0.25, type: "spring", stiffness: 300 }
    }
  };

  const panelVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.2 }
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.25, type: "spring", stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -10,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.2 }
    }
  };

  const services = [
    {
      id: 'consultation',
      name: "Cardiac Consultation",
      category: 'consultation',
      icon: <Stethoscope className="w-5 h-5" />,
      shortDescription: "Comprehensive cardiac assessment and specialist consultation",
      duration: "45-60 minutes",
      preparation: "Minimal preparation required",
      locations: ["Malvern", "Pakenham", "Clyde"],
      description: "A comprehensive cardiac consultation is your first step towards understanding and managing your heart health. Our experienced cardiologists will review your medical history, perform a thorough examination, and discuss your symptoms and concerns.",
      whatToExpect: [
        "Detailed medical history review",
        "Physical examination including heart and lung assessment",
        "Discussion of symptoms and risk factors",
        "Review of current medications",
        "Explanation of findings and next steps"
      ],
      preparationSteps: [
        "Bring your referral letter from your GP",
        "List all current medications and dosages",
        "Prepare questions about your heart health",
        "Arrive 15 minutes early for paperwork"
      ],
      afterCare: [
        "Detailed report sent to your referring doctor after every consult",
        "Follow-up appointments scheduled if needed",
        "Clear explanation of any lifestyle changes",
        "Medication adjustments if required"
      ],
      cost: "Medicare rebates available",
      image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600"
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
      whatToExpect: [
        "Gel applied to chest for better ultrasound contact",
        "Ultrasound probe moved across chest to capture images",
        "May include stress testing with exercise or medication",
        "Real-time viewing of heart chambers and valves",
        "Measurements of heart function and blood flow"
      ],
      preparationSteps: [
        "Wear comfortable, loose-fitting clothing",
        "Avoid heavy meals 2 hours before stress echo",
        "Continue regular medications unless advised otherwise",
        "Bring comfortable shoes for stress testing"
      ],
      afterCare: [
        "Resume normal activities immediately",
        "Results discussed with you after the test",
        "Detailed report sent to your cardiologist",
        "Follow-up appointment if abnormalities detected"
      ],
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
      locations: ["Malvern", "Pakenham", "Clyde"],
      description: "Holter monitoring involves wearing a small, portable device that continuously records your heart rhythm for 24 hours. This helps detect irregular heartbeats that may not occur during a brief office visit.",
      whatToExpect: [
        "Small recording device attached with adhesive electrodes",
        "Wear device for full 24 hours during normal activities",
        "Keep a diary of symptoms and activities",
        "Return device the following day",
        "Analysis of heart rhythm patterns"
      ],
      preparationSteps: [
        "Shower before appointment to clean the application area in the upper chest",
        "Wear comfortable, loose clothing",
        "Plan normal daily activities",
        "Prepare to keep an activity diary"
      ],
      afterCare: [
        "Remove device after 24 hours as instructed",
        "Return device and diary to clinic",
        "Results available within 1-2 weeks",
        "Follow-up appointment if abnormalities found"
      ],
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
      locations: ["Malvern", "Berwick"],
      description: "Coronary angiography is a specialized X-ray procedure that uses contrast dye to visualize the coronary arteries. This gold-standard test can detect blockages and assess the need for intervention.",
      whatToExpect: [
        "Local anaesthetic at catheter insertion site",
        "Thin tube inserted through wrist (typical) or groin",
        "Contrast dye injected to highlight arteries",
        "Real-time X-ray imaging of coronary circulation",
        "Possible intervention if blockages found"
      ],
      preparationSteps: [
        "Fast for 6 hours before procedure",
        "Arrange transport home (cannot drive)",
        "Continue heart medications unless advised otherwise",
        "Inform staff of allergies, especially to contrast"
      ],
      afterCare: [
        "Rest for 2-4 hours after procedure",
        "Pressure applied to insertion site",
        "Monitor for bleeding or complications",
        "Detailed results discussion with cardiologist"
      ],
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
      whatToExpect: [
        "Baseline echocardiogram at rest",
        "Exercise on treadmill or stationary bike",
        "Continuous heart rhythm monitoring",
        "Immediate post-exercise echocardiogram",
        "Assessment of wall motion abnormalities"
      ],
      preparationSteps: [
        "Wear comfortable exercise clothing and shoes",
        "Avoid caffeine 4 hours before test",
        "Continue medications unless advised otherwise",
        "Fast for 2 hours before the test"
      ],
      afterCare: [
        "Cool-down period with monitoring",
        "Resume normal activities after recovery",
        "Results discussed immediately after test",
        "Follow-up appointment if abnormalities detected"
      ],
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
      locations: ["Malvern", "Berwick"],
      description: "TOE provides superior cardiac images by placing an ultrasound probe in the oesophagus. This advanced technique offers detailed views of heart structures, particularly useful for valve assessment and detecting blood clots.",
      whatToExpect: [
        "Light sedation for comfort",
        "Flexible probe passed through mouth into esophagus",
        "High-resolution images of heart structures",
        "Assessment of valves, chambers, and blood flow",
        "Detection of clots or vegetations"
      ],
      preparationSteps: [
        "Fast for 6 hours before procedure",
        "Arrange transport home after sedation",
        "Remove dentures and jewelry",
        "Inform staff of swallowing difficulties"
      ],
      afterCare: [
        "Recovery period until sedation wears off",
        "No eating/drinking for 1 hour",
        "Mild throat discomfort is normal",
        "Results available immediately"
      ],
      cost: "Day procedure charges apply",
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'toe-dcr',
      name: "TOE-Guided Cardioversion",
      category: 'procedures',
      icon: <Zap className="w-5 h-5" />,
      shortDescription: "Electrical cardioversion with TOE guidance for atrial fibrillation",
      duration: "2-3 hours including recovery",
      preparation: "Fasting and pre-procedure assessments required",
      locations: ["Malvern", "Berwick"],
      description: "TOE-guided cardioversion combines transesophageal echocardiography with electrical cardioversion to safely restore normal heart rhythm in patients with atrial fibrillation.",
      whatToExpect: [
        "Pre-procedure TOE to exclude clots",
        "General anaesthetic for comfort",
        "Electrical shock delivered to chest",
        "Continuous heart rhythm monitoring",
        "Post-procedure recovery and monitoring"
      ],
      preparationSteps: [
        "Fast for 8 hours before procedure",
        "Blood tests and ECG required",
        "Arrange transport home",
        "Continue anticoagulation as directed"
      ],
      afterCare: [
        "Recovery from anaesthetic",
        "Heart rhythm monitoring",
        "Anticoagulation management",
        "Follow-up appointment in 1-2 weeks"
      ],
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
      locations: ["Malvern", "Berwick"],
      description: "Catheter ablation for atrial fibrillation uses advanced techniques including the latest Pulsed Field Ablation (PFA) technology to eliminate abnormal electrical pathways causing irregular heart rhythm.",
      whatToExpect: [
        "General anaesthetic for comfort",
        "Catheters inserted via groin vessels",
        "3D mapping of heart's electrical system",
        "Precise ablation of abnormal tissue",
        "Use of advanced PFA technology when appropriate"
      ],
      preparationSteps: [
        "Pre-procedure assessment and imaging",
        "Blood thinning medication management",
        "Overnight hospital stay",
        "Fasting from midnight before procedure"
      ],
      afterCare: [
        "Overnight monitoring in hospital",
        "Bed rest for 4-6 hours post-procedure",
        "Anticoagulation continuation",
        "Follow-up appointments at 3 and 6 months"
      ],
      cost: "Overnight hospital admission required",
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'tavi',
      name: "Transcatheter Aortic Valve Implantation (TAVI)",
      category: 'interventional',
      icon: <Heart className="w-5 h-5" />,
      shortDescription: "Minimally invasive aortic valve replacement via catheter",
      duration: "2-3 hours",
      preparation: "Comprehensive pre-procedure assessment required",
      locations: ["Malvern"],
      description: "TAVI is a minimally invasive procedure to replace a diseased aortic valve without open heart surgery. A new valve is delivered via catheter, typically through the groin artery.",
      whatToExpect: [
        "Local anaesthetic or light sedation",
        "Catheter insertion via groin artery",
        "Precise valve positioning using imaging",
        "New valve deployment and testing",
        "Immediate improvement in heart function"
      ],
      preparationSteps: [
        "Comprehensive cardiac CT and assessment",
        "Heart team evaluation",
        "Dental clearance if required",
        "Pre-procedure blood tests and imaging"
      ],
      afterCare: [
        "Intensive care monitoring",
        "Early mobilization within 24 hours",
        "Echocardiogram before discharge",
        "Regular follow-up with imaging"
      ],
      cost: "Private health insurance recommended",
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'mteer',
      name: "Mitral Transcatheter Edge-to-Edge Repair (mTEER)",
      category: 'interventional',
      icon: <Heart className="w-5 h-5" />,
      shortDescription: "Minimally invasive mitral valve repair using MitraClip technology",
      duration: "2-4 hours",
      preparation: "Multidisciplinary team assessment required",
      locations: ["Malvern"],
      description: "mTEER is a minimally invasive procedure to repair a leaking mitral valve using advanced clip technology. This procedure can significantly improve symptoms without open heart surgery.",
      whatToExpect: [
        "General anaesthetic for procedure",
        "Trans-septal catheter approach",
        "Real-time imaging guidance",
        "Clip placement to reduce valve leakage",
        "Immediate assessment of repair"
      ],
      preparationSteps: [
        "Heart team evaluation and planning",
        "3D echocardiography assessment",
        "Cardiac catheterization if needed",
        "Comprehensive medical optimization"
      ],
      afterCare: [
        "Intensive care unit monitoring",
        "Anticoagulation management",
        "Echocardiogram before discharge",
        "Regular follow-up with imaging studies"
      ],
      cost: "Private health insurance recommended",
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'pacemaker',
      name: "Pacemaker Insertion",
      category: 'electrophysiology',
      icon: <Zap className="w-5 h-5" />,
      shortDescription: "Permanent pacemaker implantation for heart rhythm disorders",
      duration: "1-2 hours",
      preparation: "Day procedure or overnight stay",
      locations: ["Malvern", "Berwick"],
      description: "Pacemaker insertion is a procedure to implant a small electronic device that helps regulate your heart rhythm. The pacemaker monitors your heart rate and delivers electrical impulses when needed to maintain a normal rhythm.",
      whatToExpect: [
        "Local anaesthetic at implantation site",
        "Small incision below the collarbone",
        "Pacemaker leads threaded through veins to heart",
        "Device testing to ensure proper function",
        "Wound closure and dressing application"
      ],
      preparationSteps: [
        "Fast for 8 hours before procedure",
        "Continue heart medications unless advised otherwise",
        "Arrange transport home",
        "Bring comfortable, loose-fitting clothing"
      ],
      afterCare: [
        "Rest with limited arm movement for 24 hours",
        "Keep wound dry for 48 hours",
        "Avoid heavy lifting for 6 weeks",
        "Follow-up appointment for wound check and device interrogation"
      ],
      cost: "Private health insurance recommended",
      image: "/images/pacemaker.png"
    }
  ];

  return (
    <section id="services" className="py-32 bg-gradient-to-br from-cream-50 via-white to-primary-50/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-secondary-800 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Cardiac Services
          </motion.h2>
          <motion.p 
            className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Comprehensive cardiac care with detailed patient information to help you understand what to expect during your visit.
          </motion.p>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          {/* Mini-Cards Row (Master) */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold text-secondary-800 mb-6">Select a Service</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:max-h-[700px] lg:overflow-y-auto lg:pr-4 lg:scrollbar-thin lg:scrollbar-thumb-secondary-300 lg:scrollbar-track-secondary-100">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(index)}
                  aria-pressed={selectedService === index}
                  className={`
                    relative w-full aspect-square rounded-2xl border-2 transition-all duration-200 
                    focus:outline-none focus:ring-4 focus:ring-primary-200/50 focus:ring-offset-2
                    ${selectedService === index 
                      ? 'border-primary-500 text-white shadow-lg' 
                      : 'border-secondary-200 text-secondary-700 hover:border-primary-300 hover:shadow-md'
                    }
                  `}
                  variants={cardVariants}
                  initial="rest"
                  whileHover={selectedService === index ? "active" : "hover"}
                  animate={selectedService === index ? "active" : "rest"}
                  layout={!prefersReducedMotion}
                  layoutId={!prefersReducedMotion ? `service-card-${service.id}` : undefined}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 space-y-2">
                    <div className={`
                      p-2 rounded-xl transition-colors duration-200
                      ${selectedService === index ? 'bg-white/20' : 'bg-primary-50'}
                    `}>
                      <div className={selectedService === index ? 'text-white' : 'text-primary-600'}>
                        {service.icon}
                      </div>
                    </div>
                    <span className={`
                      text-xs font-medium text-center leading-tight
                      ${selectedService === index ? 'text-white' : 'text-secondary-700'}
                    `}>
                      {service.name}
                    </span>
                    {service.duration && (
                      <span className={`
                        text-xs opacity-75
                        ${selectedService === index ? 'text-primary-100' : 'text-secondary-500'}
                      `}>
                        {service.duration}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-secondary-200/50"
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout={!prefersReducedMotion}
                role="region"
                aria-labelledby="service-detail-heading"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 lg:p-12 space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-500 text-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                        {services[selectedService].icon}
                      </div>
                      <div className="min-w-0">
                        <h3 id="service-detail-heading" className="text-2xl lg:text-3xl font-bold text-secondary-800 leading-tight">
                          {services[selectedService].name}
                        </h3>
                        <p className="text-secondary-600 text-lg mt-2">{services[selectedService].shortDescription}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-secondary-600 leading-relaxed">
                      {services[selectedService].description}
                    </p>

                    {/* Quick Info */}
                    <div className="grid sm:grid-cols-3 gap-4 p-6 bg-secondary-50/50 rounded-xl">
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                        <p className="font-semibold text-secondary-800 text-sm">Duration</p>
                        <p className="text-xs text-secondary-600">{services[selectedService].duration}</p>
                      </div>
                      <div className="text-center">
                        <MapPin className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                        <p className="font-semibold text-secondary-800 text-sm">Locations</p>
                        <p className="text-xs text-secondary-600">{services[selectedService].locations.join(', ')}</p>
                      </div>
                      <div className="text-center">
                        <FileText className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                        <p className="font-semibold text-secondary-800 text-sm">Cost</p>
                        <p className="text-xs text-secondary-600">{services[selectedService].cost}</p>
                      </div>
                    </div>

                    {/* Educational Link */}
                    {educationalLinks[services[selectedService].id as keyof typeof educationalLinks]?.hasContent && (
                      <div className="bg-gradient-to-r from-sage-50 to-primary-50 rounded-xl p-4 border border-sage-200/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-sage-500 text-white p-2 rounded-lg">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-secondary-800 text-sm">Want to Learn More?</h4>
                              <p className="text-xs text-secondary-600">
                                {educationalLinks[services[selectedService].id as keyof typeof educationalLinks]?.title}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleLearnMore(services[selectedService].id)}
                            className="bg-sage-500 text-white px-4 py-2 rounded-lg hover:bg-sage-600 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 shadow-sm hover:shadow-md text-sm"
                          >
                            <span className="font-medium">Learning Library</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold">
                        <Phone className="w-4 h-4" />
                        <span>Book Now</span>
                      </button>
                      <button className="flex-1 border border-primary-500 text-primary-600 px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors duration-200 font-semibold">
                        Learn More
                      </button>
                    </div>
                  </div>

                  <div className="h-64 lg:h-full">
                    <img
                      src={services[selectedService].image}
                      alt={`${services[selectedService].name} procedure`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Detailed Information Tabs */}
                <div className="border-t border-secondary-200 bg-secondary-50/30">
                  <div className="grid md:grid-cols-3 gap-8 p-8">
                    {/* What to Expect */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Info className="w-4 h-4 text-sage-600" />
                        <h4 className="font-semibold text-secondary-800">What to Expect</h4>
                      </div>
                      <ul className="space-y-2">
                        {services[selectedService].whatToExpect?.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-sage-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-secondary-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preparation */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-cream-600" />
                        <h4 className="font-semibold text-secondary-800">Preparation</h4>
                      </div>
                      <ul className="space-y-2">
                        {services[selectedService].preparationSteps?.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-cream-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-secondary-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After Care */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-accent-600" />
                        <h4 className="font-semibold text-secondary-800">After Care</h4>
                      </div>
                      <ul className="space-y-2">
                        {services[selectedService].afterCare?.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-secondary-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Schedule Your Appointment?
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Our reception team is ready to help you book the right service at the most convenient location for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-primary-600 px-10 py-4 rounded-2xl hover:bg-primary-50 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold text-lg">
              <Phone className="w-5 h-5" />
              <span>Call (03) 9509 5009</span>
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-2xl hover:bg-white hover:text-primary-600 transition-colors duration-200 font-semibold text-lg">
              Book Online
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;