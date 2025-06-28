import React, { useState, useEffect } from 'react';
import { Heart, Activity, Stethoscope, Zap, MapPin, Phone, ArrowRight, Clock, User, FileText, AlertCircle, CheckCircle, Info, Search, Filter, ChevronDown } from 'lucide-react';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: <Heart className="w-5 h-5" /> },
    { id: 'consultation', name: 'Consultations', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'imaging', name: 'Cardiac Imaging', icon: <Activity className="w-5 h-5" /> },
    { id: 'monitoring', name: 'Monitoring', icon: <Clock className="w-5 h-5" /> },
    { id: 'interventional', name: 'Interventional', icon: <Heart className="w-5 h-5" /> },
    { id: 'electrophysiology', name: 'Electrophysiology', icon: <Zap className="w-5 h-5" /> },
    { id: 'procedures', name: 'Procedures', icon: <FileText className="w-5 h-5" /> }
  ];

  const services = [
    {
      id: 'consultation',
      name: "Cardiac Consultation",
      category: 'consultation',
      icon: <Stethoscope className="w-6 h-6" />,
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
      icon: <Activity className="w-6 h-6" />,
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
      icon: <Clock className="w-6 h-6" />,
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
      icon: <Heart className="w-6 h-6" />,
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
    },
    {
      id: 'toe',
      name: "Transoesophageal Echocardiography",
      category: 'imaging',
      icon: <Activity className="w-6 h-6" />,
      shortDescription: "Detailed cardiac imaging via esophageal approach",
      duration: "45-60 minutes",
      preparation: "Fasting required",
      locations: ["Malvern", "Berwick"],
      description: "TOE provides superior images of heart structures by placing an ultrasound probe in the esophagus. This technique offers clearer views of the heart valves, chambers, and blood clots.",
      whatToExpect: [
        "Throat numbing spray and light sedation",
        "Flexible probe gently inserted through mouth",
        "High-quality images from behind the heart",
        "Assessment of valve function and blood clots",
        "Recovery period after sedation"
      ],
      preparationSteps: [
        "Fast for 6 hours before procedure",
        "Arrange transport home due to sedation",
        "Remove dentures and jewelry",
        "Inform staff of swallowing difficulties"
      ],
      afterCare: [
        "Recovery until sedation wears off",
        "No eating/drinking until throat sensation returns",
        "Mild throat discomfort is normal",
        "Results discussed when fully alert"
      ],
      cost: "Day procedure admission",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'cardioversion',
      name: "Direct Cardioversion",
      category: 'electrophysiology',
      icon: <Zap className="w-6 h-6" />,
      shortDescription: "Electrical cardioversion for arrhythmia treatment",
      duration: "2-3 hours including recovery",
      preparation: "Fasting and medication adjustments",
      locations: ["Malvern", "Berwick"],
      description: "Direct cardioversion uses controlled electrical shocks to restore normal heart rhythm in patients with certain arrhythmias like atrial fibrillation or atrial flutter.",
      whatToExpect: [
        "General anesthesia for comfort",
        "Electrode pads placed on chest",
        "Brief electrical shock delivered",
        "Heart rhythm monitoring throughout",
        "Recovery in monitored environment"
      ],
      preparationSteps: [
        "Fast for 8 hours before procedure",
        "Blood thinning medication as prescribed",
        "Arrange transport home",
        "Pre-procedure blood tests may be required"
      ],
      afterCare: [
        "Monitor heart rhythm for several hours",
        "Chest soreness from electrode pads normal",
        "Resume normal activities gradually",
        "Continue medications as prescribed"
      ],
      cost: "Day procedure admission required",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'af-ablation',
      name: "Atrial Fibrillation Ablation",
      category: 'electrophysiology',
      icon: <Zap className="w-6 h-6" />,
      shortDescription: "Catheter ablation to treat atrial fibrillation",
      duration: "3-6 hours",
      preparation: "Fasting and medication adjustments",
      locations: ["Malvern"],
      description: "AF ablation is a minimally invasive procedure that uses radiofrequency energy to create small scars in the heart tissue that's causing irregular rhythms, effectively treating atrial fibrillation.",
      whatToExpect: [
        "General anesthesia or conscious sedation",
        "Catheters inserted through leg veins",
        "3D mapping of heart's electrical system",
        "Radiofrequency energy applied to problem areas",
        "Overnight hospital stay for monitoring"
      ],
      preparationSteps: [
        "Fast for 8 hours before procedure",
        "Stop blood thinners as directed",
        "Arrange overnight accommodation",
        "Complete pre-procedure blood tests"
      ],
      afterCare: [
        "Bed rest for 4-6 hours post-procedure",
        "Monitor for complications overnight",
        "Gradual return to normal activities over 1 week",
        "Follow-up appointments at 3 and 6 months"
      ],
      cost: "Hospital admission required",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'svt-ablation',
      name: "SVT Ablation",
      category: 'electrophysiology',
      icon: <Zap className="w-6 h-6" />,
      shortDescription: "Catheter ablation for supraventricular tachycardia",
      duration: "2-4 hours",
      preparation: "Fasting required",
      locations: ["Malvern"],
      description: "SVT ablation treats supraventricular tachycardia by destroying the abnormal electrical pathways causing rapid heart rhythms, offering a permanent cure for most patients.",
      whatToExpect: [
        "Local anesthetic and conscious sedation",
        "Catheters inserted through leg veins",
        "Electrical mapping to locate problem pathway",
        "Radiofrequency energy applied to abnormal tissue",
        "Same-day discharge in most cases"
      ],
      preparationSteps: [
        "Fast for 6 hours before procedure",
        "Continue regular medications unless advised",
        "Arrange transport home",
        "Wear comfortable, loose clothing"
      ],
      afterCare: [
        "Rest for 4 hours post-procedure",
        "Avoid heavy lifting for 48 hours",
        "Resume normal activities within 2-3 days",
        "Follow-up appointment in 6 weeks"
      ],
      cost: "Day procedure or overnight stay",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'pacemaker',
      name: "Permanent Pacemaker Implantation",
      category: 'electrophysiology',
      icon: <Zap className="w-6 h-6" />,
      shortDescription: "Implantation of permanent cardiac pacemaker",
      duration: "1-2 hours",
      preparation: "Fasting and pre-procedure tests",
      locations: ["Malvern"],
      description: "Pacemaker implantation involves placing a small electronic device under the skin to help regulate heart rhythm in patients with slow or irregular heartbeats.",
      whatToExpect: [
        "Local anesthetic at implant site",
        "Small incision below left collarbone",
        "Pacemaker leads threaded through veins to heart",
        "Device testing and programming",
        "Overnight hospital stay for monitoring"
      ],
      preparationSteps: [
        "Fast for 8 hours before procedure",
        "Complete pre-procedure blood tests and chest X-ray",
        "Arrange transport home next day",
        "Discuss medications with cardiologist"
      ],
      afterCare: [
        "Keep incision dry for 1 week",
        "Avoid lifting arm above shoulder for 6 weeks",
        "Regular pacemaker checks every 6 months",
        "Carry pacemaker identification card"
      ],
      cost: "Hospital admission required",
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'icd',
      name: "ICD Implantation",
      category: 'electrophysiology',
      icon: <Zap className="w-6 h-6" />,
      shortDescription: "Implantable cardioverter defibrillator placement",
      duration: "2-3 hours",
      preparation: "Comprehensive pre-procedure assessment",
      locations: ["Malvern"],
      description: "ICD implantation involves placing a sophisticated device that monitors heart rhythm and can deliver life-saving shocks if dangerous arrhythmias occur.",
      whatToExpect: [
        "General anesthesia or conscious sedation",
        "Incision below left collarbone",
        "ICD leads positioned in heart chambers",
        "Device testing with induced arrhythmias",
        "1-2 day hospital stay"
      ],
      preparationSteps: [
        "Fast for 8 hours before procedure",
        "Complete comprehensive cardiac assessment",
        "Arrange extended hospital stay",
        "Family education about ICD function"
      ],
      afterCare: [
        "Wound care and activity restrictions for 6 weeks",
        "Regular ICD checks every 3-6 months",
        "Avoid strong magnetic fields",
        "Emergency action plan for family"
      ],
      cost: "Hospital admission required",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'stress-test',
      name: "Exercise Stress Test",
      category: 'monitoring',
      icon: <Activity className="w-6 h-6" />,
      shortDescription: "Exercise-based cardiac stress testing",
      duration: "45-60 minutes",
      preparation: "Comfortable exercise clothing",
      locations: ["Malvern", "Pakenham"],
      description: "Exercise stress testing evaluates how your heart responds to physical activity, helping diagnose coronary artery disease and assess exercise capacity.",
      whatToExpect: [
        "Baseline ECG and blood pressure measurement",
        "Gradual increase in treadmill speed and incline",
        "Continuous heart rhythm monitoring",
        "Blood pressure checks throughout exercise",
        "Recovery period with continued monitoring"
      ],
      preparationSteps: [
        "Wear comfortable exercise shoes and clothing",
        "Avoid caffeine for 12 hours before test",
        "Continue regular medications unless advised",
        "Eat light meal 2 hours before test"
      ],
      afterCare: [
        "Cool-down period until heart rate normalizes",
        "Results discussion with cardiologist",
        "Resume normal activities immediately",
        "Follow-up appointment if abnormalities detected"
      ],
      cost: "Medicare rebates available",
      image: "https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'ct-angiography',
      name: "CT Coronary Angiography",
      category: 'imaging',
      icon: <Activity className="w-6 h-6" />,
      shortDescription: "Non-invasive CT imaging of coronary arteries",
      duration: "30-45 minutes",
      preparation: "Heart rate control may be needed",
      locations: ["Malvern"],
      description: "CT coronary angiography uses advanced CT scanning with contrast dye to create detailed images of coronary arteries without invasive catheterization.",
      whatToExpect: [
        "IV contrast injection",
        "Heart rate medication if needed",
        "Brief breath-holds during scanning",
        "High-resolution 3D images of coronary arteries",
        "Immediate results available"
      ],
      preparationSteps: [
        "Avoid caffeine for 12 hours before scan",
        "Fast for 4 hours before procedure",
        "Inform staff of kidney problems or allergies",
        "Take heart rate medication as prescribed"
      ],
      afterCare: [
        "Drink plenty of fluids to flush contrast",
        "Resume normal activities immediately",
        "Results discussed same day",
        "Follow-up based on findings"
      ],
      cost: "Private health insurance may cover",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600"
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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Cardiac Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive cardiac care with detailed patient information to help you understand what to expect during your visit.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter by Category</span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Category Filter */}
          <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
                  }`}
                >
                  {category.icon}
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredServices.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveService(services.findIndex(s => s.id === service.id))}
              className={`p-6 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 ${
                services[activeService]?.id === service.id
                  ? 'bg-blue-600 text-white shadow-xl scale-105' 
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-xl border border-gray-100'
              }`}
            >
              <div className="space-y-4">
                <div className={`p-3 rounded-lg w-fit ${
                  services[activeService]?.id === service.id ? 'bg-white/20' : 'bg-blue-100'
                }`}>
                  <div className={services[activeService]?.id === service.id ? 'text-white' : 'text-blue-600'}>
                    {service.icon}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-lg leading-tight">{service.name}</h3>
                  <p className={`text-sm ${
                    services[activeService]?.id === service.id ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {service.duration}
                  </p>
                  <p className={`text-sm ${
                    services[activeService]?.id === service.id ? 'text-blue-100' : 'text-gray-600'
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
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {location}
                    </span>
                  ))}
                  {service.locations.length > 2 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      services[activeService]?.id === service.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{service.locations.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Service Detail */}
        {services[activeService] && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16 border border-gray-200">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12 space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-lg flex items-center justify-center">
                    {services[activeService].icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {services[activeService].name}
                    </h3>
                    <p className="text-gray-600 text-lg">{services[activeService].shortDescription}</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {services[activeService].description}
                </p>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">Duration</p>
                    <p className="text-sm text-gray-600">{services[activeService].duration}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">Locations</p>
                    <p className="text-sm text-gray-600">{services[activeService].locations.join(', ')}</p>
                  </div>
                  <div className="text-center">
                    <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">Cost</p>
                    <p className="text-sm text-gray-600">{services[activeService].cost}</p>
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
            <div className="border-t border-gray-200 bg-gray-50">
              <div className="grid md:grid-cols-3 gap-8 p-8">
                {/* What to Expect */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-900">What to Expect</h4>
                  </div>
                  <ul className="space-y-2">
                    {services[activeService].whatToExpect?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <h4 className="font-bold text-gray-900">Preparation</h4>
                  </div>
                  <ul className="space-y-2">
                    {services[activeService].preparationSteps?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After Care */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-gray-900">After Care</h4>
                  </div>
                  <ul className="space-y-2">
                    {services[activeService].afterCare?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Schedule Your Cardiac Service?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our reception team is ready to help you book the right service at the most convenient location for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold">
              <Phone className="w-5 h-5" />
              <span>Call (03) 9509 5009</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold">
              Book Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;