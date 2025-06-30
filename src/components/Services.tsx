import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, MapPin, Phone, Clock, FileText, BookOpen, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);
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

        {/* Services Card Grid */}
        <LayoutGroup id="services-cards">
          {/* Collapsed service cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <motion.div
                key={s.id}
                layout
                layoutId={s.id}
                onClick={() => setSelectedService(s.id)}
                style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="relative h-28 cursor-pointer rounded-3xl shadow-md overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] transition-colors duration-300 hover:bg-white/50" />
                <div className="relative z-10 flex items-center h-full px-6 space-x-4">
                  <div className="p-3 rounded-xl bg-primary-100 text-primary-600">{s.icon}</div>
                  <div>
                    <h4 className="font-semibold text-secondary-800 leading-snug">{s.name}</h4>
                    <p className="text-xs text-secondary-600">{s.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overlay + expanded card */}
          <AnimatePresence>
            {selectedService && (
              <>
                {/* dimmed background */}
                <motion.div
                  key="overlay"
                  className="fixed inset-0 bg-secondary-900/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedService(null)}
                />

                {/* expanded content */}
                <motion.div
                  key="expanded"
                  layoutId={selectedService}
                  className="fixed inset-x-4 sm:left-1/2 sm:-translate-x-1/2 top-24 z-50 max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  {(() => {
                    const s = services.find((x) => x.id === selectedService)!;
                    return (
                      <div className="space-y-8 p-8">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
                            {s.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-secondary-800">{s.name}</h3>
                            <p className="text-secondary-600">{s.shortDescription}</p>
                          </div>
                        </div>

                        <p className="text-secondary-700">{s.description}</p>

                        <div className="grid sm:grid-cols-3 gap-4 p-4 bg-secondary-50 rounded-xl">
                          <QuickFact icon={Clock} title="Duration" value={s.duration} />
                          <QuickFact icon={MapPin} title="Locations" value={s.locations.join(', ')} />
                          <QuickFact icon={FileText} title="Cost" value={s.cost} />
                        </div>

                        {educationalLinks[s.id as keyof typeof educationalLinks]?.hasContent && (
                          <button
                            onClick={() => handleLearnMore(s.id)}
                            className="w-full bg-sage-500 text-white py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-sage-600"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Learning Library</span>
                          </button>
                        )}

                        <div className="w-full h-64 rounded-xl overflow-hidden">
                          <img
                            src={s.image}
                            alt={s.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </LayoutGroup>

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