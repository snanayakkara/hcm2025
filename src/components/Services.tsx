import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, MapPin, Phone, ArrowRight, Clock, User, FileText, AlertCircle, CheckCircle, Info, Search, Filter, ChevronDown, Calendar, Users, BookOpen, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

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
      // Navigate to learning library with specific tab and content
      const focusParam = ('procedure' in linkInfo) ? linkInfo.procedure : 
                        ('section' in linkInfo) ? linkInfo.section : serviceId;
      navigate(`/learning-library?tab=${linkInfo.learningPath}&focus=${focusParam}`);
    }
  };

  // Listen for filter events from header
  useEffect(() => {
    const handleFilterServices = (event: CustomEvent) => {
      setActiveCategory(event.detail);
      setShowFilters(true);
    };

    window.addEventListener('filterServices', handleFilterServices as EventListener);
    return () => window.removeEventListener('filterServices', handleFilterServices as EventListener);
  }, []);

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: <Heart className="w-4 h-4" /> },
    { id: 'consultation', name: 'Consultations', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'imaging', name: 'Cardiac Imaging', icon: <Activity className="w-4 h-4" /> },
    { id: 'monitoring', name: 'Monitoring', icon: <Clock className="w-4 h-4" /> },
    { id: 'interventional', name: 'Interventional', icon: <Heart className="w-4 h-4" /> },
    { id: 'electrophysiology', name: 'Electrophysiology', icon: <Zap className="w-4 h-4" /> },
    { id: 'procedures', name: 'Procedures', icon: <FileText className="w-4 h-4" /> }
  ];

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
      whatToExpected: [
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

  // Filter services based on category and search term
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        {/* Search and Filter */}
        <div className="mb-16 space-y-8">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white border border-secondary-300 rounded-2xl hover:bg-secondary-50 transition-all duration-200 shadow-sm"
            >
              <Filter className="w-4 h-4 text-secondary-600" />
              <span className="text-secondary-700 font-medium">Filter by Category</span>
              <ChevronDown className={`w-4 h-4 text-secondary-600 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Category Filter */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  {serviceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-primary-500 text-white shadow-sm'
                          : 'bg-white text-secondary-700 hover:bg-primary-50 shadow-sm border border-secondary-200'
                      }`}
                    >
                      {category.icon}
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredServices.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(services.findIndex(s => s.id === service.id))}
              className={`p-8 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border ${
                services[activeService]?.id === service.id
                  ? 'bg-primary-500 text-white shadow-xl scale-105 border-primary-500' 
                  : 'bg-white/80 backdrop-blur-sm text-secondary-900 shadow-sm hover:shadow-lg border-secondary-200 hover:border-primary-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="space-y-6">
                <div className={`p-3 rounded-xl w-fit ${
                  services[activeService]?.id === service.id ? 'bg-white/20' : 'bg-primary-50'
                }`}>
                  <div className={services[activeService]?.id === service.id ? 'text-white' : 'text-primary-600'}>
                    {service.icon}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg leading-tight">{service.name}</h3>
                  <p className={`text-sm ${
                    services[activeService]?.id === service.id ? 'text-primary-100' : 'text-secondary-600'
                  }`}>
                    {service.duration}
                  </p>
                  <p className={`text-sm ${
                    services[activeService]?.id === service.id ? 'text-primary-100' : 'text-secondary-600'
                  }`}>
                    {service.shortDescription}
                  </p>
                </div>

                {/* Location badges */}
                <div className="flex flex-wrap gap-2">
                  {service.locations.slice(0, 2).map((location, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs rounded-full ${
                        services[activeService]?.id === service.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-secondary-100 text-secondary-600'
                      }`}
                    >
                      {location}
                    </span>
                  ))}
                  {service.locations.length > 2 && (
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      services[activeService]?.id === service.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      +{service.locations.length - 2}
                    </span>
                  )}
                </div>

                {/* Learn More Badge */}
                {educationalLinks[service.id as keyof typeof educationalLinks]?.hasContent && (
                  <div className="pt-2">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                      services[activeService]?.id === service.id 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-sage-100 text-sage-700 border border-sage-200 hover:bg-sage-200'
                    }`}>
                      <BookOpen className="w-3 h-3" />
                      <span className="font-medium">Learn More</span>
                    </span>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Service Detail */}
        {services[activeService] && (
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden mb-20 border border-secondary-200/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16 space-y-10">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                    {services[activeService].icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-secondary-800">
                      {services[activeService].name}
                    </h3>
                    <p className="text-secondary-600 text-lg">{services[activeService].shortDescription}</p>
                  </div>
                </div>
                
                <p className="text-lg text-secondary-600 leading-relaxed">
                  {services[activeService].description}
                </p>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-3 gap-6 p-8 bg-secondary-50/50 rounded-2xl">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-primary-600 mx-auto mb-3" />
                    <p className="font-semibold text-secondary-800">Duration</p>
                    <p className="text-sm text-secondary-600">{services[activeService].duration}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-5 h-5 text-primary-600 mx-auto mb-3" />
                    <p className="font-semibold text-secondary-800">Locations</p>
                    <p className="text-sm text-secondary-600">{services[activeService].locations.join(', ')}</p>
                  </div>
                  <div className="text-center">
                    <FileText className="w-5 h-5 text-primary-600 mx-auto mb-3" />
                    <p className="font-semibold text-secondary-800">Cost</p>
                    <p className="text-sm text-secondary-600">{services[activeService].cost}</p>
                  </div>
                </div>

                {/* Educational Link */}
                {educationalLinks[services[activeService].id as keyof typeof educationalLinks]?.hasContent && (
                  <div className="bg-gradient-to-r from-sage-50 to-primary-50 rounded-2xl p-6 border border-sage-200/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-sage-500 text-white p-2 rounded-lg">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary-800">Want to Learn More?</h4>
                          <p className="text-sm text-secondary-600">
                            {educationalLinks[services[activeService].id as keyof typeof educationalLinks]?.title}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLearnMore(services[activeService].id)}
                        className="bg-sage-500 text-white px-6 py-3 rounded-xl hover:bg-sage-600 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 shadow-sm hover:shadow-md"
                      >
                        <span className="font-medium">Learning Library</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

              <div className="h-64 lg:h-full">
                <img
                  src={services[activeService].image}
                  alt={`${services[activeService].name} procedure`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className="border-t border-secondary-200 bg-secondary-50/30">
              <div className="grid md:grid-cols-3 gap-10 p-12">
                {/* What to Expect */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Info className="w-5 h-5 text-sage-600" />
                    <h4 className="font-semibold text-secondary-800">What to Expect</h4>
                  </div>
                  <ul className="space-y-3">
                    {services[activeService].whatToExpect?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-sage-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-secondary-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-cream-600" />
                    <h4 className="font-semibold text-secondary-800">Preparation</h4>
                  </div>
                  <ul className="space-y-3">
                    {services[activeService].preparationSteps?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cream-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-secondary-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After Care */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-accent-600" />
                    <h4 className="font-semibold text-secondary-800">After Care</h4>
                  </div>
                  <ul className="space-y-3">
                    {services[activeService].afterCare?.map((item, idx) => (
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
        )}

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Schedule Your Cardiac Service?
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