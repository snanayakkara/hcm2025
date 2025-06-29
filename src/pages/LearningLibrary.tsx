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
  Home,
  Building,
  UserCheck,
  Shield,
  Clipboard,
  Monitor,
  Bed,
  ArrowRight
} from 'lucide-react';
import ProgressivePatientJourney from '../components/ProgressivePatientJourney';

const LearningLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('journey-maps');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState('general');
  const [activePhase, setActivePhase] = useState('pre-procedure');
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

  const procedureJourneys = {
    general: {
      name: 'General Patient Journey',
      description: 'Overview of the standard patient care process',
      color: 'from-primary-500 to-accent-500'
    },
    tavi: {
      name: 'TAVI (Transcatheter Aortic Valve Implantation)',
      description: 'Minimally invasive aortic valve replacement procedure',
      color: 'from-primary-500 to-sage-500',
      phases: {
        'pre-procedure': {
          title: 'Pre-Procedure Preparation',
          duration: '1-2 weeks before',
          icon: <Clipboard className="w-5 h-5" />,
          activities: [
            'Comprehensive cardiac assessment and imaging',
            'Blood tests and pre-operative workup',
            'Anesthesia consultation and risk assessment',
            'Medication review and adjustment',
            'Pre-procedure education session',
            'Consent process and question answering',
            'Fasting instructions (12 hours before procedure)',
            'Arrival instructions and parking information'
          ]
        },
        'procedure-day': {
          title: 'Procedure Day',
          duration: '4-6 hours total',
          icon: <Monitor className="w-5 h-5" />,
          activities: [
            'Admission and pre-procedure checks',
            'IV line insertion and monitoring setup',
            'Sedation or general anesthesia',
            'Catheter insertion (usually via groin)',
            'Valve positioning and deployment (1-2 hours)',
            'Post-procedure monitoring and assessment',
            'Transfer to recovery or cardiac unit',
            'Initial post-procedure echocardiogram'
          ]
        },
        'recovery': {
          title: 'Recovery Phase',
          duration: '1-3 days in hospital',
          icon: <Bed className="w-5 h-5" />,
          activities: [
            'Continuous cardiac monitoring',
            'Regular vital sign checks',
            'Gradual mobilization and activity increase',
            'Medication management and adjustment',
            'Wound care and catheter site monitoring',
            'Echocardiogram to assess valve function',
            'Physiotherapy and mobility assessment',
            'Discharge planning and education'
          ]
        },
        'post-procedure': {
          title: 'Post-Procedure Follow-up',
          duration: 'Ongoing care',
          icon: <UserCheck className="w-5 h-5" />,
          activities: [
            'Follow-up appointment at 1 week',
            'Echocardiogram at 1 month',
            'Cardiology review at 3 months',
            'Annual follow-up assessments',
            'Medication compliance monitoring',
            'Activity and lifestyle guidance',
            'Emergency contact information provided',
            'Long-term care coordination'
          ]
        }
      }
    },
    toe_dcr: {
      name: 'TOE +/- DCR (Transesophageal Echo ± Cardioversion)',
      description: 'Diagnostic imaging with possible rhythm correction',
      color: 'from-sage-500 to-accent-500',
      phases: {
        'pre-procedure': {
          title: 'Pre-Procedure Preparation',
          duration: '24-48 hours before',
          icon: <Clipboard className="w-5 h-5" />,
          activities: [
            'Fasting for 6 hours before procedure',
            'Medication review (especially blood thinners)',
            'Pre-procedure blood tests if required',
            'Consent process and risk discussion',
            'Arrangement for transport home',
            'Comfortable clothing recommendations',
            'Remove dentures and jewelry',
            'Arrival 30 minutes before appointment'
          ]
        },
        'procedure-day': {
          title: 'Procedure Day',
          duration: '1-2 hours total',
          icon: <Monitor className="w-5 h-5" />,
          activities: [
            'IV line insertion and monitoring setup',
            'Throat numbing spray application',
            'Conscious sedation administration',
            'TOE probe insertion and imaging (20-30 min)',
            'Assessment for blood clots',
            'Cardioversion if indicated and safe',
            'Post-procedure monitoring period',
            'Recovery and discharge preparation'
          ]
        },
        'recovery': {
          title: 'Recovery Phase',
          duration: '2-4 hours observation',
          icon: <Bed className="w-5 h-5" />,
          activities: [
            'Monitoring in recovery area',
            'Throat comfort assessment',
            'Vital signs monitoring',
            'Gradual return to normal swallowing',
            'Light refreshments when appropriate',
            'Discharge instructions review',
            'Arrangement for safe transport home',
            'Emergency contact information provided'
          ]
        },
        'post-procedure': {
          title: 'Post-Procedure Care',
          duration: '24-48 hours',
          icon: <UserCheck className="w-5 h-5" />,
          activities: [
            'Soft diet for remainder of day',
            'Avoid hot liquids for 2 hours',
            'Resume normal activities next day',
            'Follow-up appointment scheduling',
            'Results discussion with cardiologist',
            'Medication adjustments if needed',
            'Contact clinic if concerns arise',
            'Return to normal diet and activities'
          ]
        }
      }
    },
    angiogram_pci: {
      name: 'Coronary Angiogram & PCI',
      description: 'Diagnostic imaging and coronary intervention',
      color: 'from-accent-500 to-primary-500',
      phases: {
        'pre-procedure': {
          title: 'Pre-Procedure Preparation',
          duration: '1-7 days before',
          icon: <Clipboard className="w-5 h-5" />,
          activities: [
            'Pre-procedure blood tests and kidney function',
            'Medication review and adjustments',
            'Allergy assessment (especially contrast dye)',
            'Fasting for 6 hours before procedure',
            'Hydration instructions',
            'Consent process and risk discussion',
            'Arrangement for overnight stay if needed',
            'Comfortable clothing and personal items'
          ]
        },
        'procedure-day': {
          title: 'Procedure Day',
          duration: '2-4 hours total',
          icon: <Monitor className="w-5 h-5" />,
          activities: [
            'Admission and pre-procedure preparation',
            'IV line and monitoring equipment setup',
            'Local anesthetic at catheter site',
            'Catheter insertion (wrist or groin)',
            'Contrast injection and imaging',
            'PCI (stent placement) if blockages found',
            'Catheter removal and pressure application',
            'Transfer to recovery area'
          ]
        },
        'recovery': {
          title: 'Recovery Phase',
          duration: '4-24 hours',
          icon: <Bed className="w-5 h-5" />,
          activities: [
            'Bed rest with leg straight (if groin access)',
            'Regular pulse and blood pressure checks',
            'Catheter site monitoring for bleeding',
            'Gradual mobilization as directed',
            'Hydration to help eliminate contrast',
            'Pain management if needed',
            'Results discussion with cardiologist',
            'Discharge planning and medications'
          ]
        },
        'post-procedure': {
          title: 'Post-Procedure Care',
          duration: 'Ongoing',
          icon: <UserCheck className="w-5 h-5" />,
          activities: [
            'Dual antiplatelet therapy if stent placed',
            'Activity restrictions for 24-48 hours',
            'Wound care instructions',
            'Follow-up appointment in 1-2 weeks',
            'Cardiac rehabilitation referral',
            'Lifestyle modification counseling',
            'Emergency signs to watch for',
            'Long-term medication management'
          ]
        }
      }
    },
    pacemaker: {
      name: 'Pacemaker Implantation',
      description: 'Device implantation for heart rhythm management',
      color: 'from-primary-500 to-cream-500',
      phases: {
        'pre-procedure': {
          title: 'Pre-Procedure Preparation',
          duration: '1-3 days before',
          icon: <Clipboard className="w-5 h-5" />,
          activities: [
            'Pre-operative assessment and blood tests',
            'Chest X-ray and ECG',
            'Medication review and adjustments',
            'Antibiotic prophylaxis discussion',
            'Fasting instructions (usually overnight)',
            'Shower with antibacterial soap',
            'Consent process and device education',
            'Arrangement for post-procedure care'
          ]
        },
        'procedure-day': {
          title: 'Procedure Day',
          duration: '2-3 hours total',
          icon: <Monitor className="w-5 h-5" />,
          activities: [
            'Admission and pre-procedure preparation',
            'IV line insertion and monitoring',
            'Local anesthetic at implant site',
            'Small incision below left collarbone',
            'Lead placement into heart chambers',
            'Pacemaker testing and programming',
            'Wound closure and dressing application',
            'Post-procedure chest X-ray'
          ]
        },
        'recovery': {
          title: 'Recovery Phase',
          duration: '1-2 days in hospital',
          icon: <Bed className="w-5 h-5" />,
          activities: [
            'Overnight monitoring and observation',
            'Arm movement restrictions (left arm)',
            'Wound site monitoring',
            'Pacemaker function checks',
            'Pain management as needed',
            'Gradual activity increase',
            'Device education and programming',
            'Discharge planning and instructions'
          ]
        },
        'post-procedure': {
          title: 'Post-Procedure Care',
          duration: 'Lifelong follow-up',
          icon: <UserCheck className="w-5 h-5" />,
          activities: [
            'Wound care for 1-2 weeks',
            'Activity restrictions for 4-6 weeks',
            'First device check at 2 weeks',
            'Regular device monitoring (3-6 monthly)',
            'MRI safety considerations',
            'Device identification card carrying',
            'Battery replacement planning (8-12 years)',
            'Emergency contact information'
          ]
        }
      }
    },
    af_ablation: {
      name: 'AF Ablation (Atrial Fibrillation Ablation)',
      description: 'Catheter-based treatment for atrial fibrillation',
      color: 'from-sage-500 to-primary-500',
      phases: {
        'pre-procedure': {
          title: 'Pre-Procedure Preparation',
          duration: '1-2 weeks before',
          icon: <Clipboard className="w-5 h-5" />,
          activities: [
            'Transesophageal echo to exclude clots',
            'Blood tests including clotting studies',
            'Medication adjustments (blood thinners)',
            'Pre-procedure consultation and consent',
            'Fasting from midnight before procedure',
            'Arrangement for 1-2 night hospital stay',
            'Comfortable clothing and personal items',
            'Transportation arrangements'
          ]
        },
        'procedure-day': {
          title: 'Procedure Day',
          duration: '3-6 hours',
          icon: <Monitor className="w-5 h-5" />,
          activities: [
            'Admission and pre-procedure preparation',
            'General anesthesia or deep sedation',
            'Multiple catheter insertions via groin',
            '3D mapping of heart chambers',
            'Pulmonary vein isolation',
            'Additional ablation if needed',
            'Post-procedure monitoring',
            'Transfer to cardiac unit'
          ]
        },
        'recovery': {
          title: 'Recovery Phase',
          duration: '1-2 days in hospital',
          icon: <Bed className="w-5 h-5" />,
          activities: [
            'Continuous cardiac monitoring',
            'Bed rest for 4-6 hours post-procedure',
            'Catheter site monitoring',
            'Pain and discomfort management',
            'Gradual mobilization',
            'Medication review and adjustments',
            'Discharge planning and education',
            'Follow-up appointment scheduling'
          ]
        },
        'post-procedure': {
          title: 'Post-Procedure Care',
          duration: '3-6 months monitoring',
          icon: <UserCheck className="w-5 h-5" />,
          activities: [
            'Activity restrictions for 1 week',
            'Continued blood thinner therapy',
            'Rhythm monitoring (may include device)',
            'Follow-up at 1 week, 1 month, 3 months',
            'Symptom diary keeping',
            'Gradual return to normal activities',
            'Possible repeat procedure discussion',
            'Long-term rhythm management'
          ]
        }
      }
    }
  };

  const timelinePhases = [
    { id: 'pre-procedure', label: 'Pre-Procedure', icon: <Clipboard className="w-4 h-4" /> },
    { id: 'procedure-day', label: 'Procedure Day', icon: <Monitor className="w-4 h-4" /> },
    { id: 'recovery', label: 'Recovery', icon: <Bed className="w-4 h-4" /> },
    { id: 'post-procedure', label: 'Post-Procedure', icon: <UserCheck className="w-4 h-4" /> }
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

  const getCurrentPhaseData = () => {
    if (selectedProcedure === 'general') return null;
    const procedure = procedureJourneys[selectedProcedure as keyof typeof procedureJourneys];
    if ('phases' in procedure) {
      return procedure.phases[activePhase as keyof typeof procedure.phases];
    }
    return null;
  };

  const getCurrentPhaseIndex = () => {
    return timelinePhases.findIndex(phase => phase.id === activePhase);
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
            <div className="space-y-12">
              {/* Procedure Selection */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 p-8">
                <h3 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
                  Select a Procedure Journey
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(procedureJourneys).map(([key, procedure]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedProcedure(key);
                        setActivePhase('pre-procedure');
                      }}
                      className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border ${
                        selectedProcedure === key
                          ? 'bg-gradient-to-r ' + procedure.color + ' text-white shadow-xl scale-105 border-transparent' 
                          : 'bg-white text-secondary-900 shadow-sm hover:shadow-lg border-secondary-200 hover:border-primary-200'
                      }`}
                    >
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg leading-tight">{procedure.name}</h4>
                        <p className={`text-sm ${
                          selectedProcedure === key ? 'text-white/90' : 'text-secondary-600'
                        }`}>
                          {procedure.description}
                        </p>
                        {selectedProcedure === key && (
                          <div className="flex items-center space-x-2 text-white/90">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Selected</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline and Content for Specific Procedures */}
              {selectedProcedure !== 'general' && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 overflow-hidden">
                  {/* Timeline Header */}
                  <div className="bg-gradient-to-r from-secondary-50 to-primary-50/30 p-8 border-b border-secondary-200/50">
                    <h3 className="text-2xl font-bold text-secondary-800 mb-2">
                      {procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].name}
                    </h3>
                    <p className="text-secondary-600">
                      {procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].description}
                    </p>
                  </div>

                  {/* Timeline Navigation */}
                  <div className="p-8 border-b border-secondary-200/50">
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute top-6 left-0 right-0 h-0.5 bg-secondary-200"></div>
                      <div 
                        className="absolute top-6 left-0 h-0.5 bg-primary-500 transition-all duration-500"
                        style={{ 
                          width: `${((getCurrentPhaseIndex() + 1) / timelinePhases.length) * 100}%` 
                        }}
                      ></div>

                      {/* Timeline Phases */}
                      <div className="relative flex justify-between">
                        {timelinePhases.map((phase, index) => (
                          <button
                            key={phase.id}
                            onClick={() => setActivePhase(phase.id)}
                            className={`flex flex-col items-center space-y-3 transition-all duration-300 ${
                              activePhase === phase.id ? 'scale-110' : 'hover:scale-105'
                            }`}
                          >
                            {/* Phase Circle */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                              index <= getCurrentPhaseIndex()
                                ? 'bg-primary-500 border-primary-500 text-white shadow-lg'
                                : 'bg-white border-secondary-300 text-secondary-400'
                            }`}>
                              {phase.icon}
                            </div>
                            
                            {/* Phase Label */}
                            <div className="text-center">
                              <div className={`font-semibold text-sm transition-colors duration-300 ${
                                activePhase === phase.id ? 'text-primary-600' : 'text-secondary-600'
                              }`}>
                                {phase.label}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phase Content */}
                  <div className="p-8">
                    {getCurrentPhaseData() && (
                      <div className="space-y-8">
                        {/* Phase Header */}
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary-100 p-3 rounded-xl">
                            {getCurrentPhaseData()!.icon}
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-secondary-800">
                              {getCurrentPhaseData()!.title}
                            </h4>
                            <p className="text-primary-600 font-semibold">
                              {getCurrentPhaseData()!.duration}
                            </p>
                          </div>
                        </div>

                        {/* Activities List */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {getCurrentPhaseData()!.activities.map((activity, index) => (
                            <div 
                              key={index}
                              className="flex items-start space-x-3 p-4 bg-secondary-50/50 rounded-xl hover:bg-secondary-50 transition-colors duration-200"
                            >
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-secondary-700 leading-relaxed">{activity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-8 border-t border-secondary-200/50">
                          <button
                            onClick={() => {
                              const currentIndex = getCurrentPhaseIndex();
                              if (currentIndex > 0) {
                                setActivePhase(timelinePhases[currentIndex - 1].id);
                              }
                            }}
                            disabled={getCurrentPhaseIndex() === 0}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                              getCurrentPhaseIndex() === 0
                                ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
                                : 'bg-secondary-200 text-secondary-700 hover:bg-secondary-300'
                            }`}
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Previous Phase</span>
                          </button>

                          <div className="text-center">
                            <span className="text-sm text-secondary-500">
                              Phase {getCurrentPhaseIndex() + 1} of {timelinePhases.length}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              const currentIndex = getCurrentPhaseIndex();
                              if (currentIndex < timelinePhases.length - 1) {
                                setActivePhase(timelinePhases[currentIndex + 1].id);
                              }
                            }}
                            disabled={getCurrentPhaseIndex() === timelinePhases.length - 1}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                              getCurrentPhaseIndex() === timelinePhases.length - 1
                                ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
                                : 'bg-primary-500 text-white hover:bg-primary-600'
                            }`}
                          >
                            <span>Next Phase</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* General Patient Journey */}
              {selectedProcedure === 'general' && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 overflow-hidden">
                  <ProgressivePatientJourney />
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
              <Phone className="w-5 h-5" />
              <span>Contact Our Team</span>
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