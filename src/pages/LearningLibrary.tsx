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
  MapPin,
  ArrowLeft,
  Zap,
  Calendar,
  Users,
  Phone,
  Mail,
  Shield,
  Clipboard,
  Home,
  Car,
  Bed,
  Pill
} from 'lucide-react';
import ProgressivePatientJourney from '../components/ProgressivePatientJourney';

const LearningLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('journey-maps');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState('general');
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

  const procedureJourneys = [
    {
      id: 'general',
      name: 'General Patient Journey',
      description: 'Standard cardiac care pathway for consultations and basic procedures',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-primary-500 to-accent-500'
    },
    {
      id: 'tavi',
      name: 'TAVI (Transcatheter Aortic Valve Implantation)',
      description: 'Minimally invasive aortic valve replacement procedure',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      steps: [
        {
          phase: 'Pre-Assessment',
          duration: '2-4 weeks',
          activities: [
            'Initial consultation with cardiologist',
            'Comprehensive cardiac imaging (CT, Echo)',
            'Blood tests and kidney function assessment',
            'Anesthesia consultation',
            'Heart team discussion and planning'
          ],
          preparation: [
            'Bring all current medications list',
            'Complete pre-operative questionnaires',
            'Arrange transport for procedure day',
            'Follow fasting instructions'
          ]
        },
        {
          phase: 'Procedure Day',
          duration: '2-4 hours',
          activities: [
            'Admission and pre-procedure checks',
            'Anesthesia (conscious sedation or general)',
            'Catheter insertion via groin or wrist',
            'Valve deployment under X-ray guidance',
            'Post-procedure monitoring'
          ],
          preparation: [
            'Fast from midnight before procedure',
            'Take prescribed medications as directed',
            'Wear comfortable, loose clothing',
            'Remove jewelry and dentures'
          ]
        },
        {
          phase: 'Recovery',
          duration: '2-5 days',
          activities: [
            'Intensive monitoring for 24 hours',
            'Gradual mobilization',
            'Echocardiogram to check valve function',
            'Medication adjustments',
            'Discharge planning and education'
          ],
          preparation: [
            'Arrange home support for first week',
            'Prepare comfortable recovery area at home',
            'Organize follow-up appointments',
            'Understand activity restrictions'
          ]
        },
        {
          phase: 'Follow-up Care',
          duration: 'Ongoing',
          activities: [
            '30-day follow-up appointment',
            '6-month and annual check-ups',
            'Regular echocardiograms',
            'Blood thinner management if required',
            'Lifestyle counseling and support'
          ],
          preparation: [
            'Keep medication diary',
            'Monitor for any concerning symptoms',
            'Maintain regular exercise as advised',
            'Attend all scheduled appointments'
          ]
        }
      ]
    },
    {
      id: 'toe-dcr',
      name: 'TOE +/- DCR (Transesophageal Echo +/- Cardioversion)',
      description: 'Advanced cardiac imaging with possible rhythm correction',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      steps: [
        {
          phase: 'Pre-Procedure',
          duration: '1-2 weeks',
          activities: [
            'Consultation and procedure explanation',
            'Blood tests including clotting studies',
            'Medication review and adjustments',
            'Consent process and risk discussion',
            'Pre-procedure instructions provided'
          ],
          preparation: [
            'Fast for 6 hours before procedure',
            'Continue blood thinners as directed',
            'Arrange transport home',
            'Bring current medication list'
          ]
        },
        {
          phase: 'Procedure',
          duration: '30-60 minutes',
          activities: [
            'IV line insertion and monitoring setup',
            'Conscious sedation administration',
            'TOE probe insertion and imaging',
            'Cardioversion if indicated and safe',
            'Post-procedure monitoring'
          ],
          preparation: [
            'Remove dentures and jewelry',
            'Wear comfortable clothing',
            'Inform staff of any allergies',
            'Relax and follow staff instructions'
          ]
        },
        {
          phase: 'Recovery',
          duration: '2-4 hours',
          activities: [
            'Monitoring in recovery area',
            'Gradual return to normal swallowing',
            'Heart rhythm monitoring',
            'Discharge when stable',
            'Results discussion with doctor'
          ],
          preparation: [
            'Rest quietly during recovery',
            'Avoid eating until swallowing returns to normal',
            'Have someone available to drive you home',
            'Follow post-procedure instructions'
          ]
        },
        {
          phase: 'Post-Procedure',
          duration: '1-2 weeks',
          activities: [
            'Follow-up appointment scheduling',
            'Medication adjustments if needed',
            'Activity recommendations',
            'Symptom monitoring',
            'Results integration into care plan'
          ],
          preparation: [
            'Monitor for any unusual symptoms',
            'Take medications as prescribed',
            'Gradually return to normal activities',
            'Contact clinic with any concerns'
          ]
        }
      ]
    },
    {
      id: 'angiogram-pci',
      name: 'Coronary Angiogram & PCI',
      description: 'Diagnostic imaging and treatment of coronary artery blockages',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      steps: [
        {
          phase: 'Pre-Procedure',
          duration: '1-2 weeks',
          activities: [
            'Pre-procedure consultation',
            'Blood tests and kidney function check',
            'Medication review and adjustments',
            'Allergy assessment (contrast dye)',
            'Consent and risk discussion'
          ],
          preparation: [
            'Fast for 6 hours before procedure',
            'Continue heart medications unless advised otherwise',
            'Arrange transport and overnight stay if needed',
            'Bring insurance and identification'
          ]
        },
        {
          phase: 'Procedure',
          duration: '30-90 minutes',
          activities: [
            'Local anesthetic at catheter site',
            'Catheter insertion (wrist or groin)',
            'Contrast injection and X-ray imaging',
            'PCI (stent placement) if blockages found',
            'Catheter removal and pressure application'
          ],
          preparation: [
            'Wear hospital gown',
            'Remove jewelry and contact lenses',
            'Inform staff of any discomfort',
            'Stay still during imaging'
          ]
        },
        {
          phase: 'Recovery',
          duration: '4-24 hours',
          activities: [
            'Bed rest with pressure on catheter site',
            'Regular monitoring of vital signs',
            'Gradual mobilization',
            'Medication administration',
            'Discharge planning'
          ],
          preparation: [
            'Rest flat for prescribed time',
            'Drink plenty of fluids',
            'Report any chest pain or bleeding',
            'Follow mobilization instructions'
          ]
        },
        {
          phase: 'Follow-up',
          duration: 'Ongoing',
          activities: [
            'Follow-up appointment in 1-2 weeks',
            'Medication optimization',
            'Cardiac rehabilitation referral',
            'Lifestyle counseling',
            'Long-term monitoring plan'
          ],
          preparation: [
            'Take dual antiplatelet therapy as prescribed',
            'Monitor catheter site for complications',
            'Gradually increase activity level',
            'Attend cardiac rehabilitation if recommended'
          ]
        }
      ]
    },
    {
      id: 'pacemaker',
      name: 'Pacemaker Implantation',
      description: 'Device implantation for heart rhythm management',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      steps: [
        {
          phase: 'Pre-Implantation',
          duration: '1-2 weeks',
          activities: [
            'Comprehensive cardiac evaluation',
            'Device selection and programming plan',
            'Pre-operative assessment',
            'Antibiotic prophylaxis planning',
            'Patient education about device'
          ],
          preparation: [
            'Complete pre-operative tests',
            'Arrange post-procedure support at home',
            'Understand device limitations and benefits',
            'Prepare questions for medical team'
          ]
        },
        {
          phase: 'Implantation',
          duration: '1-2 hours',
          activities: [
            'Local anesthesia and sedation',
            'Small incision below collarbone',
            'Lead placement in heart chambers',
            'Device testing and programming',
            'Incision closure and dressing'
          ],
          preparation: [
            'Fast from midnight before procedure',
            'Wear comfortable, front-opening clothing',
            'Remove jewelry from upper body',
            'Follow pre-procedure medication instructions'
          ]
        },
        {
          phase: 'Recovery',
          duration: '1-2 days',
          activities: [
            'Overnight monitoring',
            'Chest X-ray to check lead position',
            'Device interrogation and programming',
            'Wound care education',
            'Activity restriction counseling'
          ],
          preparation: [
            'Keep arm movement limited for 24 hours',
            'Keep incision site dry and clean',
            'Report any unusual symptoms',
            'Understand activity restrictions'
          ]
        },
        {
          phase: 'Long-term Care',
          duration: 'Lifelong',
          activities: [
            'Regular device checks (3-6 monthly)',
            'Battery monitoring',
            'Lead function assessment',
            'Medication adjustments',
            'Lifestyle adaptation support'
          ],
          preparation: [
            'Carry device identification card',
            'Understand electromagnetic interference',
            'Maintain regular follow-up schedule',
            'Know when to contact device clinic'
          ]
        }
      ]
    },
    {
      id: 'af-ablation',
      name: 'Atrial Fibrillation Ablation',
      description: 'Catheter-based treatment to restore normal heart rhythm',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-green-500 to-teal-500',
      steps: [
        {
          phase: 'Pre-Ablation',
          duration: '2-4 weeks',
          activities: [
            'Comprehensive AF evaluation',
            'TOE to exclude blood clots',
            'CT or MRI cardiac imaging',
            'Anticoagulation optimization',
            'Pre-procedure planning meeting'
          ],
          preparation: [
            'Continue blood thinners as directed',
            'Complete all pre-procedure tests',
            'Arrange extended time off work',
            'Organize support for recovery period'
          ]
        },
        {
          phase: 'Ablation Procedure',
          duration: '3-6 hours',
          activities: [
            'General anesthesia or deep sedation',
            'Multiple catheter insertion via groin',
            '3D mapping of heart chambers',
            'Radiofrequency or cryoablation',
            'Testing of ablation effectiveness'
          ],
          preparation: [
            'Fast from midnight before procedure',
            'Take prescribed medications',
            'Arrange overnight hospital stay',
            'Understand procedure risks and benefits'
          ]
        },
        {
          phase: 'Recovery',
          duration: '1-3 days',
          activities: [
            'Intensive monitoring for complications',
            'Gradual mobilization',
            'Heart rhythm monitoring',
            'Pain management',
            'Discharge planning and education'
          ],
          preparation: [
            'Rest with limited movement initially',
            'Monitor for any chest pain or bleeding',
            'Follow fluid intake recommendations',
            'Understand activity restrictions'
          ]
        },
        {
          phase: 'Follow-up',
          duration: '3-6 months',
          activities: [
            'Regular rhythm monitoring',
            'Medication adjustments',
            'Activity progression guidance',
            'Symptom assessment',
            'Success evaluation at 3 months'
          ],
          preparation: [
            'Continue anticoagulation as directed',
            'Monitor for AF recurrence',
            'Gradually increase activity level',
            'Attend all follow-up appointments'
          ]
        }
      ]
    }
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
    },
    {
      category: 'conditions',
      question: 'What is coronary artery disease?',
      answer: 'Coronary artery disease occurs when the major blood vessels that supply your heart become damaged or diseased. It\'s usually caused by plaque buildup in the arteries, which can reduce blood flow to the heart muscle.'
    },
    {
      category: 'procedures',
      question: 'What happens during an echocardiogram?',
      answer: 'An echocardiogram is a painless test that uses sound waves to create pictures of your heart. A technician will apply gel to your chest and move a probe around to capture images of your heart\'s chambers, valves, and blood flow.'
    },
    {
      category: 'procedures',
      question: 'How should I prepare for a stress test?',
      answer: 'Wear comfortable exercise clothing and shoes. Avoid eating, drinking caffeine, or smoking for 3 hours before the test. Continue taking your medications unless specifically told otherwise by your doctor.'
    },
    {
      category: 'procedures',
      question: 'What is a Holter monitor?',
      answer: 'A Holter monitor is a small, portable device that records your heart\'s electrical activity for 24-48 hours. You wear it while going about your normal daily activities to detect irregular heart rhythms that might not show up during a short ECG.'
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
    },
    {
      category: 'procedures',
      title: 'Preparing for Your Cardiac Catheterization',
      duration: '5:45',
      description: 'Everything you need to know before your cardiac catheterization procedure.',
      thumbnail: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      category: 'procedures',
      title: 'Understanding Your Stress Test Results',
      duration: '4:20',
      description: 'Learn how to interpret your stress test results and what they mean for your heart health.',
      thumbnail: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const conditionsData = [
    {
      name: 'Coronary Artery Disease (CAD)',
      description: 'A condition where the coronary arteries become narrowed or blocked by plaque buildup, reducing blood flow to the heart muscle.',
      symptoms: ['Chest pain or discomfort', 'Shortness of breath', 'Fatigue', 'Heart palpitations'],
      causes: ['High cholesterol', 'High blood pressure', 'Smoking', 'Diabetes', 'Family history'],
      treatments: ['Lifestyle changes', 'Medications', 'Angioplasty', 'Bypass surgery'],
      icon: <Heart className="w-6 h-6 text-primary-500" />
    },
    {
      name: 'Heart Failure',
      description: 'A condition where the heart cannot pump blood effectively to meet the body\'s needs, causing fluid buildup and fatigue.',
      symptoms: ['Shortness of breath', 'Swelling in legs/ankles', 'Fatigue', 'Rapid heartbeat'],
      causes: ['Coronary artery disease', 'High blood pressure', 'Previous heart attack', 'Valve disease'],
      treatments: ['Medications', 'Lifestyle changes', 'Device therapy', 'Surgery in severe cases'],
      icon: <Activity className="w-6 h-6 text-sage-500" />
    },
    {
      name: 'Atrial Fibrillation',
      description: 'An irregular heart rhythm where the upper chambers beat chaotically, potentially causing blood clots and stroke.',
      symptoms: ['Irregular heartbeat', 'Palpitations', 'Fatigue', 'Shortness of breath'],
      causes: ['Age', 'High blood pressure', 'Heart disease', 'Thyroid problems', 'Alcohol'],
      treatments: ['Blood thinners', 'Rate control medications', 'Cardioversion', 'Ablation'],
      icon: <Activity className="w-6 h-6 text-accent-500" />
    },
    {
      name: 'Hypertension (High Blood Pressure)',
      description: 'A condition where blood pressure in the arteries is persistently elevated, increasing the risk of heart disease and stroke.',
      symptoms: ['Often no symptoms', 'Headaches', 'Shortness of breath', 'Nosebleeds (severe cases)'],
      causes: ['Genetics', 'Poor diet', 'Lack of exercise', 'Stress', 'Obesity'],
      treatments: ['Lifestyle changes', 'Blood pressure medications', 'Regular monitoring', 'Dietary modifications'],
      icon: <AlertCircle className="w-6 h-6 text-cream-600" />
    },
    {
      name: 'Heart Valve Disease',
      description: 'A condition where one or more of the heart\'s valves don\'t work properly, affecting blood flow through the heart.',
      symptoms: ['Shortness of breath', 'Chest pain', 'Fatigue', 'Swelling', 'Heart murmur'],
      causes: ['Age-related wear', 'Congenital defects', 'Rheumatic fever', 'Infections', 'Heart attack'],
      treatments: ['Monitoring', 'Medications', 'Valve repair', 'Valve replacement'],
      icon: <Heart className="w-6 h-6 text-accent-500" />
    },
    {
      name: 'Arrhythmias',
      description: 'Abnormal heart rhythms that can cause the heart to beat too fast, too slow, or irregularly.',
      symptoms: ['Palpitations', 'Dizziness', 'Shortness of breath', 'Chest pain', 'Fainting'],
      causes: ['Heart disease', 'Electrolyte imbalances', 'Medications', 'Stress', 'Caffeine'],
      treatments: ['Lifestyle changes', 'Medications', 'Cardioversion', 'Ablation', 'Pacemaker'],
      icon: <Activity className="w-6 h-6 text-primary-500" />
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
    },
    {
      name: 'Cardiac MRI',
      description: 'Detailed magnetic resonance imaging of the heart',
      duration: '45-90 minutes',
      preparation: 'Remove metal objects',
      link: 'cardiac-mri'
    },
    {
      name: 'Nuclear Stress Test',
      description: 'Stress test combined with radioactive tracer imaging',
      duration: '3-4 hours',
      preparation: 'Fasting and medication adjustments',
      link: 'nuclear-stress'
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

  const goBack = () => {
    window.history.back();
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'pre-assessment':
      case 'pre-procedure':
      case 'pre-implantation':
      case 'pre-ablation':
        return <Clipboard className="w-5 h-5" />;
      case 'procedure day':
      case 'procedure':
      case 'implantation':
      case 'ablation procedure':
        return <Stethoscope className="w-5 h-5" />;
      case 'recovery':
        return <Bed className="w-5 h-5" />;
      case 'follow-up care':
      case 'follow-up':
      case 'post-procedure':
      case 'long-term care':
        return <Calendar className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-primary-50/20">
      {/* Header with Back Button */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-secondary-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-secondary-800">Learning Library</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16" ref={sectionRef}>
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-secondary-800 mb-6">
            Patient Education Resources
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive educational resources to help you understand your heart health, our procedures, and what to expect during your care.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-8 py-4 rounded-2xl transition-all duration-200 font-medium ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-secondary-700 hover:bg-primary-50 shadow-sm border border-secondary-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search and Filter - Only show for non-journey-maps tabs */}
          {activeTab !== 'journey-maps' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>

              {(activeTab === 'faq' || activeTab === 'videos') && (
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {activeTab === 'faq' && (
                    <>
                      <button
                        onClick={() => setSelectedCategory('general')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'general'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        General
                      </button>
                      <button
                        onClick={() => setSelectedCategory('billing')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'billing'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Billing
                      </button>
                      <button
                        onClick={() => setSelectedCategory('symptoms')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'symptoms'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Symptoms
                      </button>
                      <button
                        onClick={() => setSelectedCategory('conditions')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'conditions'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Conditions
                      </button>
                      <button
                        onClick={() => setSelectedCategory('procedures')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'procedures'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Procedures
                      </button>
                    </>
                  )}
                  {activeTab === 'videos' && (
                    <>
                      <button
                        onClick={() => setSelectedCategory('heart-basics')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'heart-basics'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Heart Basics
                      </button>
                      <button
                        onClick={() => setSelectedCategory('tests')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'tests'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Tests
                      </button>
                      <button
                        onClick={() => setSelectedCategory('lifestyle')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'lifestyle'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Lifestyle
                      </button>
                      <button
                        onClick={() => setSelectedCategory('procedures')}
                        className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                          selectedCategory === 'procedures'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
                        }`}
                      >
                        Procedures
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
          {/* Journey Maps Tab */}
          {activeTab === 'journey-maps' && (
            <div className="space-y-16">
              {/* Procedure Selection */}
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-secondary-800 mb-8">Select a Procedure Journey</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {procedureJourneys.map((procedure) => (
                    <button
                      key={procedure.id}
                      onClick={() => setSelectedProcedure(procedure.id)}
                      className={`p-8 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border ${
                        selectedProcedure === procedure.id
                          ? `bg-gradient-to-br ${procedure.color} text-white shadow-xl scale-105 border-transparent` 
                          : 'bg-white/80 backdrop-blur-sm text-secondary-900 shadow-sm hover:shadow-lg border-secondary-200 hover:border-primary-200'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className={`p-3 rounded-xl w-fit ${
                          selectedProcedure === procedure.id ? 'bg-white/20' : 'bg-primary-50'
                        }`}>
                          <div className={selectedProcedure === procedure.id ? 'text-white' : 'text-primary-600'}>
                            {procedure.icon}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg leading-tight">{procedure.name}</h4>
                          <p className={`text-sm ${
                            selectedProcedure === procedure.id ? 'text-white/90' : 'text-secondary-600'
                          }`}>
                            {procedure.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Procedure Journey */}
              {selectedProcedure === 'general' ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 overflow-hidden">
                  <ProgressivePatientJourney />
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 overflow-hidden">
                  {(() => {
                    const procedure = procedureJourneys.find(p => p.id === selectedProcedure);
                    if (!procedure || !procedure.steps) return null;

                    return (
                      <div className="p-12">
                        {/* Procedure Header */}
                        <div className={`bg-gradient-to-r ${procedure.color} rounded-2xl p-8 text-white mb-12`}>
                          <div className="flex items-center space-x-4 mb-4">
                            {procedure.icon}
                            <h3 className="text-3xl font-bold">{procedure.name}</h3>
                          </div>
                          <p className="text-xl opacity-90">{procedure.description}</p>
                        </div>

                        {/* Journey Steps */}
                        <div className="space-y-16">
                          {procedure.steps.map((step, index) => (
                            <div key={index} className="relative">
                              {/* Step Header */}
                              <div className="flex items-center space-x-4 mb-8">
                                <div className="bg-secondary-100 p-3 rounded-xl">
                                  {getPhaseIcon(step.phase)}
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold text-secondary-800">{step.phase}</h4>
                                  <p className="text-secondary-600">Duration: {step.duration}</p>
                                </div>
                              </div>

                              {/* Step Content */}
                              <div className="grid lg:grid-cols-2 gap-12">
                                {/* What Happens */}
                                <div className="space-y-6">
                                  <h5 className="font-semibold text-secondary-800 flex items-center space-x-2">
                                    <Activity className="w-5 h-5 text-primary-600" />
                                    <span>What Happens</span>
                                  </h5>
                                  <ul className="space-y-3">
                                    {step.activities.map((activity, idx) => (
                                      <li key={idx} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-secondary-700">{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* How to Prepare */}
                                <div className="space-y-6">
                                  <h5 className="font-semibold text-secondary-800 flex items-center space-x-2">
                                    <Clipboard className="w-5 h-5 text-sage-600" />
                                    <span>How to Prepare</span>
                                  </h5>
                                  <ul className="space-y-3">
                                    {step.preparation.map((prep, idx) => (
                                      <li key={idx} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-secondary-700">{prep}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Connector Line */}
                              {index < procedure.steps.length - 1 && (
                                <div className="absolute left-6 top-20 w-0.5 h-16 bg-secondary-200"></div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Contact Information */}
                        <div className="mt-16 bg-secondary-50 rounded-2xl p-8">
                          <h4 className="text-xl font-bold text-secondary-800 mb-6">Questions About This Procedure?</h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-3">
                              <Phone className="w-5 h-5 text-primary-600" />
                              <div>
                                <p className="font-semibold text-secondary-800">Call Our Team</p>
                                <p className="text-secondary-600">(03) 9509 5009</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Mail className="w-5 h-5 text-primary-600" />
                              <div>
                                <p className="font-semibold text-secondary-800">Email Us</p>
                                <p className="text-secondary-600">reception@heartclinicmelbourne.com.au</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-secondary-200/50 overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-secondary-50/50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-secondary-800 pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-secondary-500 transition-transform duration-200 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-8 pb-8 border-t border-secondary-100">
                      <p className="text-secondary-600 leading-relaxed pt-6">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-secondary-200/50">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full">
                        <Play className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-lg font-semibold text-secondary-800 mb-3">{video.title}</h3>
                    <p className="text-secondary-600 text-sm leading-relaxed mb-6">{video.description}</p>
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
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
            <div className="grid lg:grid-cols-2 gap-10">
              {conditionsData.map((condition, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-10 hover:shadow-lg transition-all duration-300 border border-secondary-200/50">
                  <div className="flex items-center space-x-3 mb-6">
                    {condition.icon}
                    <h3 className="text-xl font-bold text-secondary-800">{condition.name}</h3>
                  </div>
                  
                  <p className="text-secondary-600 mb-8 leading-relaxed">{condition.description}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-secondary-800 mb-3 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-cream-500" />
                        <span>Common Symptoms</span>
                      </h4>
                      <ul className="space-y-2">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-cream-500 rounded-full"></div>
                            <span className="text-sm text-secondary-600">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-secondary-800 mb-3 flex items-center space-x-2">
                        <Info className="w-4 h-4 text-sage-500" />
                        <span>Common Causes</span>
                      </h4>
                      <ul className="space-y-2">
                        {condition.causes.map((cause, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-sage-500 rounded-full"></div>
                            <span className="text-sm text-secondary-600">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-secondary-800 mb-3 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary-500" />
                        <span>Treatment Options</span>
                      </h4>
                      <ul className="space-y-2">
                        {condition.treatments.map((treatment, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span className="text-sm text-secondary-600">{treatment}</span>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testsData.map((test, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-secondary-200/50">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-xl">
                        <Stethoscope className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-secondary-800">{test.name}</h3>
                    </div>
                    
                    <p className="text-secondary-600 text-sm leading-relaxed">{test.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-secondary-500" />
                        <span className="text-sm text-secondary-600">Duration: {test.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Info className="w-4 h-4 text-secondary-500" />
                        <span className="text-sm text-secondary-600">Preparation: {test.preparation}</span>
                      </div>
                    </div>
                    
                    <button className="w-full flex items-center justify-center space-x-2 bg-primary-500 text-white py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200 font-medium">
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
        <div className={`mt-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-12 text-center transition-all duration-1000 delay-600 border border-secondary-200/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-secondary-800 mb-6">
            Still Have Questions?
          </h3>
          <p className="text-secondary-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Our team is here to help. Contact us directly for personalized answers about your heart health or to schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-primary-500 text-white px-10 py-4 rounded-2xl hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold text-lg">
              <span>Contact Our Team</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-primary-500 text-primary-600 px-10 py-4 rounded-2xl hover:bg-primary-50 transition-colors duration-200 font-semibold text-lg">
              Download Patient Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningLibrary;