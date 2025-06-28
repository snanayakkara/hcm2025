import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Play, 
  Heart, 
  Activity, 
  Stethoscope, 
  FileText, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronRight,
  Clock,
  User,
  AlertCircle,
  Info,
  CheckCircle,
  PlayCircle,
  Download,
  ExternalLink,
  MapPin
} from 'lucide-react';

const PatientEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('journey-maps');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const tabs = [
    { id: 'journey-maps', label: 'Patient Journey Maps', icon: <MapPin className="w-5 h-5" /> },
    { id: 'faq', label: 'FAQs', icon: <FileText className="w-5 h-5" /> },
    { id: 'videos', label: 'Educational Videos', icon: <PlayCircle className="w-5 h-5" /> },
    { id: 'conditions', label: 'Heart Conditions', icon: <Heart className="w-5 h-5" /> },
    { id: 'tests', label: 'Tests & Procedures', icon: <Activity className="w-5 h-5" /> }
  ];

  const faqData = [
    {
      category: 'general',
      question: 'What are your operating hours?',
      answer: 'Our main clinic at Cabrini Hospital Malvern is open Monday-Friday 8:30am-5:00pm. Other locations have varying hours - Pakenham is open Monday-Friday 9:00am-5:00pm and Saturday 9:00am-1:00pm. Please call your preferred location to confirm specific hours.'
    },
    {
      category: 'general',
      question: 'Do I need a referral to see a cardiologist?',
      answer: 'Yes, you need a referral from your GP or another specialist to see our cardiologists. This ensures Medicare rebates are available and helps us understand your medical history and the reason for your visit.'
    },
    {
      category: 'general',
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring your Medicare card, private health insurance details, referral letter from your GP, a list of current medications, and any previous cardiac test results or reports.'
    },
    {
      category: 'billing',
      question: 'Do you accept Medicare?',
      answer: 'Yes, we accept Medicare and offer bulk billing for eligible patients. We also work with most private health insurance funds for gap-free or reduced gap consultations.'
    },
    {
      category: 'billing',
      question: 'What are the consultation fees?',
      answer: 'Consultation fees vary depending on the type and length of appointment. We offer Medicare rebates and work with private health insurers. Our reception team can provide specific fee information when booking.'
    },
    {
      category: 'symptoms',
      question: 'When should I be concerned about chest pain?',
      answer: 'Seek immediate medical attention (call 000) if you experience severe chest pain, especially if accompanied by shortness of breath, nausea, sweating, or pain radiating to your arm, neck, or jaw. For persistent or recurring chest discomfort, consult your GP for evaluation.'
    },
    {
      category: 'symptoms',
      question: 'What are common symptoms of heart disease?',
      answer: 'Common symptoms include chest pain or discomfort, shortness of breath, fatigue, irregular heartbeat, swelling in legs or ankles, and dizziness. However, some people may have no symptoms, which is why regular check-ups are important.'
    },
    {
      category: 'conditions',
      question: 'What is atrial fibrillation?',
      answer: 'Atrial fibrillation (AF) is an irregular heart rhythm where the upper chambers of the heart beat chaotically. This can cause symptoms like palpitations, fatigue, and shortness of breath, and increases the risk of stroke.'
    }
  ];

  const videoData = [
    {
      category: 'heart-basics',
      title: 'How Your Heart Works: A Simple Explanation',
      duration: '4:32',
      description: 'Learn about the four chambers of your heart and how blood flows through your cardiovascular system.',
      thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      category: 'heart-basics',
      title: 'Understanding Common Heart Conditions',
      duration: '6:15',
      description: 'A visual guide to coronary artery disease, heart failure, and arrhythmias.',
      thumbnail: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      category: 'tests',
      title: 'What to Expect During an Echocardiogram',
      duration: '3:45',
      description: 'Step-by-step walkthrough of the echocardiogram procedure and what the results mean.',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      category: 'tests',
      title: 'Your Holter Monitor: What It Is and How to Use It',
      duration: '5:20',
      description: 'Complete guide to wearing and caring for your 24-hour heart monitor.',
      thumbnail: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      category: 'lifestyle',
      title: 'Healthy Eating for a Healthy Heart',
      duration: '7:30',
      description: 'Nutritionist-approved tips for a heart-healthy diet and meal planning.',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      category: 'lifestyle',
      title: 'Exercise Safely for Cardiovascular Health',
      duration: '8:15',
      description: 'Safe exercise guidelines for people with heart conditions and how to get started.',
      thumbnail: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const conditionsData = [
    {
      name: 'Coronary Artery Disease (CAD)',
      description: 'A condition where the coronary arteries become narrowed or blocked by plaque buildup, reducing blood flow to the heart muscle.',
      symptoms: ['Chest pain or discomfort', 'Shortness of breath', 'Fatigue', 'Heart palpitations'],
      causes: ['High cholesterol', 'High blood pressure', 'Smoking', 'Diabetes', 'Family history'],
      treatments: ['Lifestyle changes', 'Medications', 'Angioplasty', 'Bypass surgery'],
      icon: <Heart className="w-6 h-6 text-red-500" />
    },
    {
      name: 'Heart Failure',
      description: 'A condition where the heart cannot pump blood effectively to meet the body\'s needs, causing fluid buildup and fatigue.',
      symptoms: ['Shortness of breath', 'Swelling in legs/ankles', 'Fatigue', 'Rapid heartbeat'],
      causes: ['Coronary artery disease', 'High blood pressure', 'Previous heart attack', 'Valve disease'],
      treatments: ['Medications', 'Lifestyle changes', 'Device therapy', 'Surgery in severe cases'],
      icon: <Activity className="w-6 h-6 text-blue-500" />
    },
    {
      name: 'Atrial Fibrillation',
      description: 'An irregular heart rhythm where the upper chambers beat chaotically, potentially causing blood clots and stroke.',
      symptoms: ['Irregular heartbeat', 'Palpitations', 'Fatigue', 'Shortness of breath'],
      causes: ['Age', 'High blood pressure', 'Heart disease', 'Thyroid problems', 'Alcohol'],
      treatments: ['Blood thinners', 'Rate control medications', 'Cardioversion', 'Ablation'],
      icon: <Activity className="w-6 h-6 text-purple-500" />
    },
    {
      name: 'Hypertension (High Blood Pressure)',
      description: 'A condition where blood pressure in the arteries is persistently elevated, increasing the risk of heart disease and stroke.',
      symptoms: ['Often no symptoms', 'Headaches', 'Shortness of breath', 'Nosebleeds (severe cases)'],
      causes: ['Genetics', 'Poor diet', 'Lack of exercise', 'Stress', 'Obesity'],
      treatments: ['Lifestyle changes', 'Blood pressure medications', 'Regular monitoring', 'Dietary modifications'],
      icon: <AlertCircle className="w-6 h-6 text-orange-500" />
    }
  ];

  const testsData = [
    {
      name: 'Echocardiography (Echo)',
      description: 'Ultrasound imaging of the heart to assess structure and function',
      duration: '30-45 minutes',
      preparation: 'No special preparation required',
      link: 'echocardiography'
    },
    {
      name: 'Electrocardiogram (ECG)',
      description: 'Recording of the heart\'s electrical activity',
      duration: '5-10 minutes',
      preparation: 'No special preparation required',
      link: 'consultation'
    },
    {
      name: 'Holter Monitoring',
      description: 'Continuous heart rhythm monitoring over 24 hours',
      duration: '24 hours',
      preparation: 'Shower before appointment',
      link: 'holter'
    },
    {
      name: 'Stress Testing',
      description: 'Exercise or medication-induced stress to assess heart function',
      duration: '45-60 minutes',
      preparation: 'Comfortable exercise clothing',
      link: 'stress-test'
    },
    {
      name: 'Coronary Angiography',
      description: 'X-ray imaging of coronary arteries using contrast dye',
      duration: '30-60 minutes',
      preparation: 'Fasting required',
      link: 'angiography'
    },
    {
      name: 'CT Coronary Angiography',
      description: 'Non-invasive CT imaging of coronary arteries',
      duration: '30-45 minutes',
      preparation: 'Heart rate control may be needed',
      link: 'ct-angiography'
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredVideos = videoData.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToService = (serviceId: string) => {
    // First navigate to services section
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
      // You could also trigger the service selection here if needed
    }
  };

  const scrollToJourneyMaps = () => {
    const journeyMapsElement = document.getElementById('journey-maps');
    if (journeyMapsElement) {
      journeyMapsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Patient Learning Library
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive educational resources to help you understand your heart health, our procedures, and what to expect during your care.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'journey-maps') {
                    scrollToJourneyMaps();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search and Filter - Only show for non-journey-maps tabs */}
          {activeTab !== 'journey-maps' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {(activeTab === 'faq' || activeTab === 'videos') && (
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {activeTab === 'faq' && (
                    <>
                      <button
                        onClick={() => setSelectedCategory('general')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === 'general'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        General
                      </button>
                      <button
                        onClick={() => setSelectedCategory('billing')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === 'billing'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        Billing
                      </button>
                      <button
                        onClick={() => setSelectedCategory('symptoms')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === 'symptoms'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        Symptoms
                      </button>
                      <button
                        onClick={() => setSelectedCategory('conditions')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === 'conditions'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        Conditions
                      </button>
                    </>
                  )}
                  {activeTab === 'videos' && (
                    <>
                      <button
                        onClick={() => setSelectedCategory('heart-basics')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === 'heart-basics'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        Heart Basics
                      </button>
                      <button
                        onClick={() => setSelectedCategory('tests')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === 'tests'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        Tests
                      </button>
                      <button
                        onClick={() => setSelectedCategory('lifestyle')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === 'lifestyle'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        Lifestyle
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Journey Maps Redirect */}
          {activeTab === 'journey-maps' && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Interactive Patient Journey Maps
                </h3>
                <p className="text-gray-600 mb-8">
                  Explore detailed, step-by-step guides for each medical procedure, from initial consultation to full recovery.
                </p>
                <button
                  onClick={scrollToJourneyMaps}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold mx-auto"
                >
                  <span>View Journey Maps</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full">
                        <Play className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                    <button className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                      <PlayCircle className="w-4 h-4" />
                      <span>Watch Video</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Conditions Tab */}
          {activeTab === 'conditions' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {conditionsData.map((condition, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    {condition.icon}
                    <h3 className="text-xl font-bold text-gray-900">{condition.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{condition.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>Common Symptoms</span>
                      </h4>
                      <ul className="space-y-1">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span>Common Causes</span>
                      </h4>
                      <ul className="space-y-1">
                        {condition.causes.map((cause, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Treatment Options</span>
                      </h4>
                      <ul className="space-y-1">
                        {condition.treatments.map((treatment, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testsData.map((test, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">{test.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Duration: {test.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Preparation: {test.preparation}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => scrollToService(test.link)}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className={`mt-16 bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help. Contact us directly for personalized answers about your heart health or to schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold">
              <span>Contact Our Team</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold">
              Download Patient Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientEducation;