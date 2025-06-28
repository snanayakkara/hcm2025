import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, MapPin, Phone, ArrowRight, Clock, User, FileText, AlertCircle, CheckCircle, Info, Search, Filter, ChevronDown, Calendar, Users } from 'lucide-react';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

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

  const journeySteps = [
    {
      id: 1,
      title: "Initial Consultation",
      description: "Comprehensive cardiac assessment with our specialists",
      icon: <Stethoscope className="w-5 h-5" />,
      duration: "45-60 minutes",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Diagnostic Testing",
      description: "Advanced cardiac imaging and monitoring procedures",
      icon: <Activity className="w-5 h-5" />,
      duration: "30-90 minutes",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      id: 3,
      title: "Treatment Planning",
      description: "Personalized treatment recommendations and planning",
      icon: <Heart className="w-5 h-5" />,
      duration: "30-45 minutes",
      color: "from-rose-500 to-rose-600"
    },
    {
      id: 4,
      title: "Follow-up Care",
      description: "Ongoing monitoring and support for optimal outcomes",
      icon: <Calendar className="w-5 h-5" />,
      duration: "Ongoing",
      color: "from-purple-500 to-purple-600"
    }
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
        "Detailed report sent to your referring doctor",
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
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600"
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
        "Shower before appointment (can't get device wet)",
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
      image: "https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=600"
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
        "Local anesthetic at catheter insertion site",
        "Thin tube inserted through wrist or groin",
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
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  // Filter services based on category and search term
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveJourneyStep((prev) => (prev + 1) % journeySteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Cardiac Services
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Comprehensive cardiac care with detailed patient information to help you understand what to expect during your visit.
          </motion.p>
        </div>

        {/* Patient Journey Integration */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Your Care Journey</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                From initial consultation to ongoing care, we guide you through every step of your cardiac health journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 transition-all duration-500 ${
                    activeJourneyStep === index ? 'scale-105 shadow-lg' : 'hover:scale-102'
                  }`}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveJourneyStep(index)}
                >
                  <div className="space-y-4">
                    <div className={`bg-gradient-to-r ${step.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm`}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">{step.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Journey Progress */}
            <div className="flex justify-center mt-8 space-x-2">
              {journeySteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeJourneyStep ? 'w-8 bg-rose-500' : 'w-2 bg-slate-300'
                  }`}
                  onClick={() => setActiveJourneyStep(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm"
            >
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-slate-700 font-medium">Filter by Category</span>
              <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
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
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  {serviceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-rose-50 shadow-sm border border-slate-200'
                      }`}
                    >
                      {category.icon}
                      <span className="font-medium text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredServices.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(services.findIndex(s => s.id === service.id))}
              className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border ${
                services[activeService]?.id === service.id
                  ? 'bg-rose-500 text-white shadow-xl scale-105 border-rose-500' 
                  : 'bg-white text-slate-900 shadow-sm hover:shadow-lg border-slate-200 hover:border-rose-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="space-y-4">
                <div className={`p-3 rounded-xl w-fit ${
                  services[activeService]?.id === service.id ? 'bg-white/20' : 'bg-rose-50'
                }`}>
                  <div className={services[activeService]?.id === service.id ? 'text-white' : 'text-rose-600'}>
                    {service.icon}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg leading-tight">{service.name}</h3>
                  <p className={`text-sm ${
                    services[activeService]?.id === service.id ? 'text-rose-100' : 'text-slate-600'
                  }`}>
                    {service.duration}
                  </p>
                  <p className={`text-sm ${
                    services[activeService]?.id === service.id ? 'text-rose-100' : 'text-slate-600'
                  }`}>
                    {service.shortDescription}
                  </p>
                </div>

                {/* Location badges */}
                <div className="flex flex-wrap gap-1">
                  {service.locations.slice(0, 2).map((location, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 text-xs rounded-full ${
                        services[activeService]?.id === service.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {location}
                    </span>
                  ))}
                  {service.locations.length > 2 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      services[activeService]?.id === service.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      +{service.locations.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Service Detail */}
        {services[activeService] && (
          <motion.div 
            className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16 border border-slate-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12 space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-rose-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm">
                    {services[activeService].icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800">
                      {services[activeService].name}
                    </h3>
                    <p className="text-slate-600 text-lg">{services[activeService].shortDescription}</p>
                  </div>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {services[activeService].description}
                </p>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-3 gap-4 p-6 bg-slate-50 rounded-2xl">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-rose-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-800">Duration</p>
                    <p className="text-sm text-slate-600">{services[activeService].duration}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-5 h-5 text-rose-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-800">Locations</p>
                    <p className="text-sm text-slate-600">{services[activeService].locations.join(', ')}</p>
                  </div>
                  <div className="text-center">
                    <FileText className="w-5 h-5 text-rose-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-800">Cost</p>
                    <p className="text-sm text-slate-600">{services[activeService].cost}</p>
                  </div>
                </div>
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
            <div className="border-t border-slate-200 bg-slate-50/50">
              <div className="grid md:grid-cols-3 gap-8 p-8">
                {/* What to Expect */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-slate-800">What to Expect</h4>
                  </div>
                  <ul className="space-y-2">
                    {services[activeService].whatToExpected?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <h4 className="font-semibold text-slate-800">Preparation</h4>
                  </div>
                  <ul className="space-y-2">
                    {services[activeService].preparationSteps?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After Care */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-rose-600" />
                    <h4 className="font-semibold text-slate-800">After Care</h4>
                  </div>
                  <ul className="space-y-2">
                    {services[activeService].afterCare?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-700">{item}</span>
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
          className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Schedule Your Cardiac Service?
          </h3>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
            Our reception team is ready to help you book the right service at the most convenient location for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-rose-600 px-8 py-3 rounded-xl hover:bg-rose-50 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold">
              <Phone className="w-5 h-5" />
              <span>Call (03) 9509 5009</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white hover:text-rose-600 transition-colors duration-200 font-semibold">
              Book Online
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;