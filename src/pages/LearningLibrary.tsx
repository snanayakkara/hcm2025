import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Play, 
  Heart, 
  Activity, 
  Stethoscope, 
  Search, 
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  PlayCircle,
  MapPin,
  ArrowLeft,
  Phone,
  Clipboard,
  Monitor,
  Bed,
  ArrowRight,
  UserCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar
} from 'lucide-react';
import ProgressivePatientJourney from '../components/ProgressivePatientJourney';

const LearningLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('journey-maps');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState('general');
  const [activePhase, setActivePhase] = useState('pre-procedure');
  const [expandedTestCard, setExpandedTestCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle URL parameters from services page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    const focus = urlParams.get('focus');
    
    if (tab) {
      setActiveTab(tab);
    }
    if (focus) {
      setSelectedProcedure(focus);
    }
  }, []);

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
    { id: 'videos', label: 'Educational Videos', icon: <PlayCircle className="w-5 h-5" /> },
    { id: 'conditions', label: 'Heart Conditions', icon: <Heart className="w-5 h-5" /> },
    { id: 'tests', label: 'Tests & Procedures', icon: <Activity className="w-5 h-5" /> },
    { id: 'journey-maps', label: 'Patient Journey Maps', icon: <MapPin className="w-5 h-5" /> }
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
          title: 'Assessment & Pre‑Procedure Preparation',
          duration: 'Overnight stay or split visits',
          icon: <Clipboard className="w-5 h-5" />,
          activities: [
            "Echocardiogram (heart ultrasound) – usually already completed before your stay",
            "Coronary angiogram (30\u202Fmin procedure, wrist or groin access) with overnight monitoring",
            "CT scan of chest‑to‑thigh the next morning (or separate appointment) to size the valve and map blood vessels",
            "Blood tests and general pre‑operative work‑up",
            "Anaesthesia consultation and risk discussion",
            "Medication review and adjustment (bring your list)",
            "Education session, consent and chance to ask questions",
            "Fasting from midnight prior to admission",
            "Arrival instructions, parking and what to bring"
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
      description: 'A long‑term condition in which the heart muscle can’t pump blood strongly enough to meet the body’s needs, causing fluid build‑up, breathlessness and fatigue. With the right treatment plan, most people can live longer and feel better.',
      symptoms: [
        'Shortness of breath on exertion or when lying flat',
        'Swollen ankles, legs or abdomen (fluid build‑up)',
        'Persistent cough or wheeze',
        'Fatigue and reduced exercise capacity',
        'Rapid or irregular heartbeat (palpitations)',
        'Sudden weight gain or bloated stomach',
        'Dizziness or light‑headedness'
      ],
      causes: [
        'Coronary heart disease or previous heart attack',
        'High blood pressure (hypertension)',
        'Damaged heart muscle (cardiomyopathy or myocarditis)',
        'Faulty heart valves (valve disease)',
        'Heart rhythm problems (e.g. atrial fibrillation)',
        'Congenital heart disease',
        'Long‑standing conditions such as diabetes or thyroid disease'
      ],
      treatments: [
        'Evidence‑based medicines: ACE inhibitors/ARBs/ARNIs, beta‑blockers, MRAs, SGLT2 inhibitors, diuretics',
        'Heart‑failure management program and cardiac rehabilitation',
        'Lifestyle changes: low‑salt diet, fluid balance, weight monitoring, limiting alcohol',
        'Pacemaker, cardiac resynchronisation therapy (CRT) or implantable defibrillator if indicated',
        'Surgery or procedures such as valve repair/replacement, coronary bypass or, rarely, heart transplant'
      ],
      icon: <Activity className="w-6 h-6 text-sage-500" />
    },
    {
      name: 'Atrial Fibrillation (AF)',
      description: 'A fast, irregular heartbeat that can come and go. AF reduces the heart’s pumping efficiency and markedly increases the risk of stroke and heart failure if untreated.',
      symptoms: [
        'Fluttering or racing heartbeat',
        'Irregular pulse',
        'Shortness of breath',
        'Fatigue or reduced exercise capacity',
        'Dizziness or light‑headedness',
        'Chest discomfort'
      ],
      causes: [
        'Advancing age',
        'High blood pressure',
        'Coronary or valve heart disease',
        'Heart failure or previous heart attack',
        'Thyroid problems',
        'Obstructive sleep apnoea',
        'Obesity',
        'Excess alcohol or binge drinking',
        'Infections or acute illness',
        'Post‑surgery stress'
      ],
      treatments: [
        'Anticoagulant (“blood‑thinning”) therapy to reduce stroke risk',
        'Medicines to slow the heart rate',
        'Medicines or electrical cardioversion to restore normal rhythm',
        'Catheter ablation for rhythm control',
        'Lifestyle changes: weight, alcohol, blood pressure, sleep apnoea'
      ],
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
      name: 'Aortic Stenosis',
      description: 'Narrowing of the aortic valve opening that obstructs blood flow from the heart to the body. Untreated, it can lead to heart failure, fainting or sudden death, but modern valve‑replacement procedures can restore normal flow.',
      symptoms: [
        'Shortness of breath on exertion',
        'Chest pain or pressure (angina)',
        'Dizziness or fainting spells (syncope)',
        'Unusual tiredness or reduced exercise capacity',
        'Heart‑failure signs such as ankle swelling'
      ],
      causes: [
        'Age‑related calcification and scarring of the aortic valve',
        'Congenital bicuspid (two‑leaflet) aortic valve',
        'Rheumatic heart disease after rheumatic fever',
        'Risk factors: smoking, high blood pressure, high cholesterol, chronic kidney disease'
      ],
      treatments: [
        'Regular cardiology follow‑up and echocardiography if mild or asymptomatic',
        'Aortic valve replacement — either surgical (open‑heart) or transcatheter (TAVI)',
        'Balloon valvuloplasty as temporary or bridge therapy in selected cases',
        'Medicines to control blood pressure, cholesterol and heart‑failure symptoms',
        'Lifestyle measures: quit smoking, manage blood pressure and cholesterol'
      ],
      icon: <Heart className="w-6 h-6 text-primary-500" />
    },
    {
      name: 'Mitral Regurgitation',
      description: 'A condition where the mitral valve doesn\'t close properly, allowing blood to leak backward into the left atrium.',
      symptoms: ['Shortness of breath', 'Fatigue', 'Heart palpitations', 'Swelling in feet/ankles', 'Heart murmur'],
      causes: ['Mitral valve prolapse', 'Heart attack', 'Infection', 'Age-related wear', 'Rheumatic heart disease'],
      treatments: ['Monitoring', 'Medications', 'Valve repair', 'Valve replacement', 'MitraClip procedure'],
      icon: <Heart className="w-6 h-6 text-sage-500" />
    },
    {
      name: 'Hyperlipidaemia (High Cholesterol)',
      description: 'Elevated levels of cholesterol and other fats in the blood that can lead to atherosclerosis and increased cardiovascular risk.',
      symptoms: ['Usually no symptoms', 'Yellowish deposits around eyes (xanthelasma)', 'Chest pain if complications develop'],
      causes: ['Diet high in saturated fats', 'Genetics', 'Lack of exercise', 'Obesity', 'Diabetes'],
      treatments: ['Statin medications', 'Dietary changes', 'Exercise', 'Weight management', 'Other lipid-lowering drugs'],
      icon: <AlertCircle className="w-6 h-6 text-cream-600" />
    },
    {
      name: 'Pericarditis',
      description:
        'Inflammation of the pericardium (the sac around the heart) that can cause sharp chest pain and other symptoms. Most cases improve with medication and rest, but large fluid build-up or tamponade can be serious.',
      symptoms: [
        'Sharp or stabbing chest pain that may spread to neck or shoulders',
        'Pain worse when lying down and eased by sitting forward',
        'Fever or chills',
        'Shortness of breath—especially when flat',
        'Heart palpitations',
        'Fatigue or general weakness',
        'Dry cough'
      ],
      causes: [
        'Viral infection (most common)',
        'Bacterial or, rarely, fungal infection',
        'Heart attack or recent heart surgery',
        'Auto-immune conditions such as lupus or rheumatoid arthritis',
        'Kidney failure (uraemic pericarditis)',
        'Chest injury or trauma',
        'Cancer spreading to the pericardium',
        'Certain medicines or radiation therapy'
      ],
      treatments: [
        'Anti-inflammatory medicines (NSAIDs) plus colchicine',
        'Rest and avoidance of strenuous activity until symptoms settle',
        'Corticosteroids if pain persists or recurs',
        'Antibiotics or targeted therapy for infectious causes',
        'Pericardiocentesis (drainage) if large effusion or tamponade',
        'Hospital admission and monitoring in severe cases'
      ],
      icon: <Heart className="w-6 h-6 text-sage-500" />
    },
    {
      name: 'Spontaneous Coronary Artery Dissection (SCAD)',
      description:
        'A sudden tear in the wall of a coronary artery that can block blood flow and cause a heart attack. SCAD often affects healthy women under 50, including during or after pregnancy.',
      symptoms: [
        'Sudden chest pain or tightness',
        'Pain radiating to arm, jaw, back or shoulder',
        'Shortness of breath',
        'Sweating, nausea or vomiting',
        'Light-headedness or fainting',
        'Rapid heartbeat or palpitations'
      ],
      causes: [
        'Exact trigger unknown—spontaneous weakening of the artery wall',
        'Hormonal changes (pregnancy or post-partum period)',
        'Fibromuscular dysplasia (FMD)',
        'Connective-tissue disorders (e.g. Marfan, Ehlers-Danlos)',
        'Extreme emotional or physical stress',
        'Severe hypertension',
        'Intense exercise',
        'Certain stimulant or hormonal drugs (rare)'
      ],
      treatments: [
        'Emergency care similar to other heart attacks (aspirin, oxygen, monitoring)',
        'Coronary angiography to confirm dissection',
        'Most cases managed conservatively with antiplatelet therapy and beta-blockers—arteries often heal over weeks',
        'Stenting or bypass surgery only if ongoing ischaemia or unstable condition',
        'Screening for fibromuscular dysplasia and other vascular disorders',
        'Cardiac rehabilitation and gradual return to activity',
        'Long-term avoidance of extreme lifting, high-intensity exercise and hormonal triggers as advised by your cardiologist'
      ],
      icon: <Heart className="w-6 h-6 text-accent-500" />
    },
    {
      name: 'Coronary Artery Bypass Grafting (CABG)',
      description: 'Open‑heart surgery that uses healthy blood vessels to create new pathways around blocked coronary arteries. CABG restores blood flow, relieves angina and lowers the risk of future heart attacks when stents or medicines are not enough.',
      symptoms: [
        "Persistent chest pain (angina) despite medicines",
        "Shortness of breath on minimal exertion",
        "Poor exercise capacity or fatigue",
        "High risk or history of heart attack",
        "Multiple severe coronary blockages"
      ],
      causes: [
        "Severe coronary artery disease with multiple blockages",
        "Left main coronary artery narrowing",
        "Not suitable for or failed angioplasty/stenting",
        "Diabetes with complex coronary disease",
        "Previous heart attack causing impaired blood flow"
      ],
      treatments: [
        "Traditional open‑heart bypass using a heart‑lung machine",
        "Off‑pump (“beating‑heart”) bypass surgery",
        "Minimally invasive or robotic‑assisted bypass techniques",
        "Hybrid procedures combining stents and bypass grafts",
        "Cardiac rehabilitation and lifelong heart‑healthy lifestyle"
      ],
      icon: <Stethoscope className="w-6 h-6 text-accent-500" />
    },
    {
      name: 'Percutaneous Coronary Intervention (PCI)',
      description: 'A minimally invasive procedure that opens blocked coronary arteries using balloon angioplasty and stent placement.',
      symptoms: ['Procedure treats: chest pain', 'Shortness of breath', 'Heart attack', 'Abnormal stress test results'],
      causes: ['Coronary artery blockages', 'Acute heart attack', 'Unstable angina', 'Restenosis of previous stents'],
      treatments: ['Balloon angioplasty', 'Stent placement', 'Drug-eluting stents', 'Rotational atherectomy'],
      icon: <Monitor className="w-6 h-6 text-primary-500" />
    },
    {
      name: 'Heart Attack (Myocardial Infarction)',
      description: 'Occurs when blood flow to part of the heart muscle is blocked, causing tissue damage or death from lack of oxygen.',
      symptoms: ['Severe chest pain', 'Pain radiating to arm/jaw', 'Shortness of breath', 'Sweating', 'Nausea'],
      causes: ['Coronary artery blockage', 'Blood clot', 'Plaque rupture', 'Coronary spasm', 'Drug use'],
      treatments: ['Emergency angioplasty', 'Clot-busting medications', 'Bypass surgery', 'Cardiac rehabilitation'],
      icon: <AlertCircle className="w-6 h-6 text-red-500" />
    },
    {
      name: 'Angina',
      description: 'Chest pain or discomfort that occurs when the heart muscle doesn\'t receive enough oxygen-rich blood.',
      symptoms: ['Chest pain or pressure', 'Pain in arms/neck/jaw', 'Shortness of breath', 'Fatigue', 'Triggered by exertion'],
      causes: ['Coronary artery disease', 'Coronary spasm', 'Anemia', 'Heart valve disease', 'High blood pressure'],
      treatments: ['Nitrate medications', 'Beta-blockers', 'Calcium channel blockers', 'Angioplasty', 'Lifestyle changes'],
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
      name: 'Transthoracic Echocardiogram (TTE)',
      description: 'Ultrasound scan of the heart performed through the chest wall at rest, providing detailed pictures of heart muscle, valves and pumping strength.',
      detailedDescription: 'A resting (transthoracic) echocardiogram uses sound waves to create moving images of your heart. A handheld transducer is placed on different areas of the chest to show how well the heart pumps, whether the valves leak or tighten, and if the muscle is thickened or weakened. It is non‑invasive and painless, which is why almost every patient with a heart condition has had at least one echo.',
      duration: '30–45 minutes',
      preparation: [
        'No fasting required; continue normal food and drink',
        'Take regular medications as usual',
        'Wear a loose top that is easy to remove – you will change into a disposable gown',
        'Avoid body lotions or oils on the chest on the day',
        'Bring your referral form, Medicare card and medication list'
      ],
      whatToExpect: [
        'You will undress from the waist up and lie on an examination couch',
        'Sticky ECG dots are placed on the chest for monitoring',
        'Gel is applied to help the ultrasound waves travel',
        'The sonographer moves the probe over several positions; you may feel firm pressure',
        'You may be asked to hold your breath briefly or roll onto your side',
        'The test is painless and you can resume normal activities immediately'
      ],
      followUp: [
        'Images are reviewed by a cardiologist',
        'A report is sent to your referring doctor (and GP) within 2 business days – sooner if urgent',
        'You may request a personal copy of the report',
        'Your doctor will discuss results and any next steps; additional tests are arranged if needed'
      ],
      link: 'echocardiography'
    },
    {
      name: 'Electrocardiogram (ECG)',
      description: 'Recording of the heart\'s electrical activity',
      detailedDescription: 'An ECG records the electrical signals from your heart to check for different heart conditions. It\'s a quick, painless test that can detect irregular heart rhythms, heart attacks, and other heart problems.',
      duration: '5-10 minutes',
      preparation: [
        'No special preparation required',
        'Avoid using lotions or oils on your chest',
        'Wear clothing that allows easy access to your chest, arms, and legs',
        'Remove jewelry that might interfere with the electrodes'
      ],
      whatToExpect: [
        'You\'ll be asked to lie down on an examination table',
        'Electrodes (small sticky patches) are placed on your chest, arms, and legs',
        'The electrodes are connected to the ECG machine',
        'You\'ll need to lie still and breathe normally during the recording',
        'The actual recording takes only a few seconds',
        'Electrodes are removed and you can resume normal activities'
      ],
      followUp: [
        'Results are available immediately',
        'Your doctor will interpret the ECG pattern',
        'Normal results indicate regular heart rhythm and electrical activity',
        'Abnormal results may require additional testing or treatment'
      ],
      link: 'consultation'
    },
    {
      name: 'Holter Monitoring',
      description: 'Continuous heart rhythm monitoring over 24 hours',
      detailedDescription: 'A Holter monitor is a portable device that records your heart\'s electrical activity for 24-48 hours during your normal daily activities. It helps detect irregular heart rhythms that may not show up during a short ECG.',
      duration: '24-48 hours',
      preparation: [
        'Shower or bathe before your appointment (you cannot get the monitor wet)',
        'Wear a comfortable, loose-fitting shirt',
        'Avoid using lotions, oils, or powders on your chest',
        'Bring a list of your current medications'
      ],
      whatToExpect: [
        'Electrodes are attached to your chest with adhesive patches',
        'A small recording device is connected to the electrodes',
        'The device is worn in a small pouch or clipped to your clothing',
        'You\'ll keep a diary of your activities and any symptoms',
        'Continue normal activities but avoid getting the device wet',
        'Return to the clinic after 24-48 hours to remove the device'
      ],
      followUp: [
        'The recorded data is analyzed by computer and reviewed by a cardiologist',
        'Results are typically available within 3-5 business days',
        'A follow-up appointment will be scheduled to discuss findings',
        'Treatment recommendations will be based on any detected arrhythmias'
      ],
      link: 'holter'
    },
    {
      name: 'Exercise Stress Echocardiogram (ESE)',
      description: 'Ultrasound imaging of the heart taken before and immediately after treadmill exercise to see how your heart copes with physical stress.',
      detailedDescription: 'An Exercise Stress Echo combines a standard treadmill ECG stress test with ultrasound pictures of the heart. Images taken at rest and again within 60 seconds of peak exercise show how well the heart muscle and valves perform under load and help detect reduced blood flow or exercise‑induced rhythm problems. Because you are connected to ECG leads throughout, the test also provides continuous rhythm monitoring.',
      duration: '45 minutes (exercise 6‑12 min)',
      preparation: [
        'Wear flat‑soled runners or comfortable walking shoes',
        'Loose, easy‑to‑remove top; you will change into a disposable gown',
        'Avoid caffeine or a heavy meal for 3 h before the test',
        'Take usual medicines unless your doctor advises otherwise',
        'Bring referral form, Medicare card and medication list'
      ],
      whatToExpect: [
        'Baseline ECG and resting echo images are taken',
        'You walk on a treadmill that gradually increases speed and incline; you can stop at any time',
        'At peak effort the treadmill stops and immediate post‑exercise echo images are recorded',
        'Continuous ECG monitoring looks for rhythm changes',
        'Total time on the treadmill is typically 6–12 minutes',
        'A cardiologist supervises the entire test and will stop it if any concerning findings occur'
      ],
      followUp: [
        'Preliminary results are reviewed straight away',
        'A full report is sent to your referring doctor (and GP) within 2 business days',
        'No driving restrictions after the test; resume normal activities',
        'Contact the clinic if you feel unwell later in the day'
      ],
      link: 'stress-echo'
    },
    {
      name: 'Coronary Angiography',
      description: 'X-ray imaging of coronary arteries using contrast dye',
      detailedDescription: 'Coronary angiography is an invasive procedure that uses contrast dye and X-rays to visualize the coronary arteries. It\'s the gold standard for diagnosing coronary artery disease and determining treatment options.',
      duration: '30-60 minutes',
      preparation: [
        'Fast for 6-8 hours before the procedure',
        'Arrange for someone to drive you home',
        'Stop certain medications as directed by your doctor',
        'Inform staff of any allergies, especially to iodine or contrast dye',
        'Complete pre-procedure blood tests and consent forms'
      ],
      whatToExpect: [
        'IV line is inserted and mild sedation may be given',
        'Local anesthetic is injected at the catheter insertion site (wrist or groin)',
        'A thin catheter is guided to the coronary arteries',
        'Contrast dye is injected while X-ray images are taken',
        'You may feel a warm sensation when dye is injected',
        'The catheter is removed and pressure is applied to prevent bleeding'
      ],
      followUp: [
        'Bed rest for 2-6 hours with frequent vital sign checks',
        'Results are available immediately and discussed with you',
        'Discharge home the same day or overnight observation',
        'Follow-up appointment to discuss treatment options if blockages are found'
      ],
      link: 'angiography',
      hasJourneyMap: true,
      journeyMapId: 'angiogram_pci'
    },
    {
      name: 'CT Coronary Angiography',
      description: 'Non‑invasive CT scan that uses iodine contrast to produce detailed images of the coronary arteries, helping doctors detect — or confidently rule out — coronary artery disease.',
      detailedDescription: 'A CT Coronary Angiography (CTCA) is performed on a high‑speed CT scanner after an iodine contrast injection into a vein in your arm. Timed to your heartbeat, the scanner creates a 3‑D map of the vessels that supply the heart. CTCA is used to evaluate unexplained chest pain or shortness of breath, clarify inconclusive stress‑test results, screen people with risk factors, check bypass grafts and detect other cardiac abnormalities.',
      duration: '30‑45 minutes (scanning time ~10 min)',
      preparation: [
        'Booking is essential – bring any referral form (all providers accepted)',
        'Eat and drink normally but avoid caffeine for 24 hours before your scan',
        'Do **not** take Viagra or Levitra for 72 h, or Cialis for 7 days before the test',
        'Bring your Medicare card, medication list and any prior cardiac imaging',
        'Continue all usual medications unless instructed otherwise'
      ],
      whatToExpect: [
        'You will lie on a motorised table that slides through a doughnut‑shaped CT scanner',
        'ECG stickers are placed on your chest so the images can be taken in sync with your heartbeat',
        'A radiographer inserts a small IV line in your arm for the iodine contrast injection',
        'The contrast may give a brief warm sensation as it circulates',
        'You will be asked to hold your breath for 5‑10 seconds several times while the table moves',
        'Staff are in constant voice contact and can see you at all times during the 10‑minute scan'
      ],
      followUp: [
        'A radiologist **and** cardiologist review the images',
        'Your referring doctor usually receives the report within 24 hours',
        'You will discuss the findings and any next steps at your follow‑up appointment',
        'Further tests or treatment may be recommended if significant disease is found'
      ],
      link: 'ct-angiography'
    },
    {
      name: 'Cardiac MRI',
      description: 'Non‑invasive scan that uses a strong magnetic field and radio waves (no X‑rays) to create moving 3‑D pictures of your heart.',
      detailedDescription: 'Cardiac MRI provides highly detailed images of heart chambers, muscle, valves and blood flow without radiation. It detects heart‑attack damage, myocarditis, cardiomyopathy, congenital defects and valve disease, and guides treatment planning.',
      duration: '45‑90 minutes',
      preparation: [
        'Remove all metal objects including jewelry, watches and hearing aids',
        'Tell staff about any implanted devices (pacemaker, ICD, stent, artificial joints)',
        'Change into a hospital gown and complete the MRI safety questionnaire',
        'Take medicines as usual unless instructed otherwise',
        'Arrive 30 minutes early for IV cannula placement.'
      ],
      whatToExpect: [
        'You will lie on a narrow table that slides into the MRI tunnel',
        'Sticky pads (ECG leads) will monitor your heartbeat during the scan',
        'The scanner makes loud tapping noises – you will get earplugs or headphones',
        'Technologists will ask you to hold your breath for 10–15 seconds several times',
        'Contrast dye (gadolinium) may be injected through an IV to highlight blood flow',
        'A microphone allows two‑way communication with the technologist at all times'
      ],
      followUp: [
        'Images are processed and reviewed by a cardiac radiologist',
        'Preliminary results are often available within a few days; a full report follows within 5-7 business days',
        'Your cardiologist will explain the findings and how they affect your treatment',
        'Further tests or therapy adjustments may be recommended based on the results'
      ],
      link: 'cardiac-mri'
    },
    {
      name: 'Nuclear Stress Test',
      description: 'Stress test combined with radioactive tracer imaging',
      detailedDescription: 'A nuclear stress test combines exercise or pharmacologic stress with radioactive tracer imaging to evaluate blood flow to the heart muscle. It can detect areas of poor blood flow and assess heart function.',
      duration: '3-4 hours',
      preparation: [
        'Fast for 4-6 hours before the test',
        'Avoid caffeine for 24 hours before the test',
        'Wear comfortable exercise clothing and shoes',
        'Stop certain heart medications as directed',
        'Arrange for transportation home after the test'
      ],
      whatToExpect: [
        'Radioactive tracer is injected through an IV',
        'Rest images are taken with a special camera',
        'Exercise stress test is performed or medication is given',
        'Second tracer injection is given at peak stress',
        'Stress images are taken 30-60 minutes later',
        'Total time includes waiting periods between imaging sessions'
      ],
      followUp: [
        'Images are compared to assess blood flow differences',
        'Results are typically available within 24-48 hours',
        'Normal results indicate good blood flow to all areas of the heart',
        'Abnormal results may indicate blockages requiring further evaluation'
      ],
      link: 'nuclear-stress'
    },
    {
      name: 'PYP Scan (Pyrophosphate)',
      description: 'Nuclear imaging test to detect cardiac amyloidosis',
      detailedDescription: 'A PYP scan uses a radioactive tracer that binds to amyloid deposits in the heart. It\'s a specialized test used to diagnose cardiac amyloidosis, a condition where abnormal proteins accumulate in heart muscle.',
      duration: '2-3 hours',
      preparation: [
        'No special preparation required',
        'Continue taking all medications as normal',
        'Wear comfortable clothing',
        'Remove jewelry and metal objects before imaging',
        'Inform staff if you are pregnant or breastfeeding'
      ],
      whatToExpect: [
        'Radioactive tracer (pyrophosphate) is injected through an IV',
        'You\'ll wait 2-3 hours for the tracer to circulate and bind',
        'During waiting time, you can eat and drink normally',
        'You\'ll lie on an imaging table for the scan',
        'A special camera takes pictures of your heart',
        'The scan itself takes 30-45 minutes'
      ],
      followUp: [
        'Images are analyzed for tracer uptake in the heart muscle',
        'Results are typically available within 24-48 hours',
        'Positive results may indicate cardiac amyloidosis',
        'Further testing and specialist consultation may be recommended'
      ],
      link: 'pyp-scan'
    },
    {
      name: 'TAVI (Transcatheter Aortic Valve Implantation)',
      description: 'Minimally invasive aortic valve replacement procedure',
      detailedDescription: 'TAVI is a minimally invasive procedure to replace a diseased aortic valve without open heart surgery. A new valve is delivered via catheter, typically through the groin artery, offering an alternative to traditional open-heart surgery.',
      duration: '2-3 hours',
      preparation: [
        'Comprehensive cardiac assessment and imaging',
        'Heart team evaluation and planning',
        'Pre-procedure blood tests and dental clearance',
        'Fasting from midnight before procedure',
        'Arrange for 2-3 day hospital stay'
      ],
      whatToExpect: [
        'Admission and pre-procedure preparation',
        'Local anesthetic or light sedation',
        'Catheter insertion via groin artery',
        'Precise valve positioning using advanced imaging',
        'New valve deployment and immediate testing',
        'Post-procedure monitoring in cardiac unit'
      ],
      followUp: [
        'Intensive care monitoring for 24-48 hours',
        'Early mobilization and activity progression',
        'Echocardiogram before discharge',
        'Follow-up appointments at 1 week, 1 month, and annually',
        'Long-term anticoagulation management'
      ],
      link: 'tavi',
      hasJourneyMap: true,
      journeyMapId: 'tavi'
    },
    {
      name: 'Atrial Fibrillation (AF) Ablation',
      description: 'Catheter-based treatment for atrial fibrillation using advanced ablation techniques',
      detailedDescription: 'Catheter ablation for atrial fibrillation uses advanced techniques including the latest Pulsed Field Ablation (PFA) technology to eliminate abnormal electrical pathways causing irregular heart rhythm.',
      duration: '3-6 hours',
      preparation: [
        'Transoesophageal echocardiogram to exclude blood clots',
        'Blood tests including clotting studies',
        'Medication adjustments (blood thinners)',
        'Pre-procedure consultation and detailed consent',
        'Arrange for 1-2 night hospital stay'
      ],
      whatToExpect: [
        'General anesthesia or deep sedation',
        'Multiple catheter insertions via groin vessels',
        '3D mapping of heart\'s electrical system',
        'Pulmonary vein isolation using ablation energy',
        'Additional ablation areas if needed',
        'Post-procedure monitoring and recovery'
      ],
      followUp: [
        'Continuous cardiac monitoring for 24-48 hours',
        'Gradual mobilization with activity restrictions',
        'Continued anticoagulation therapy',
        'Follow-up appointments at 1 week, 1 month, 3 months',
        'Long-term rhythm monitoring and management'
      ],
      link: 'af-ablation',
      hasJourneyMap: true,
      journeyMapId: 'af_ablation'
    },
    {
      name: 'Transoesophageal Echocardiogram (TOE)',
      description: 'Ultrasound probe passed down the oesophagus to obtain close‑up images of the heart.',
      detailedDescription: 'A transoesophageal echocardiogram places a small ultrasound probe into the oesophagus — the tube behind your heart — so doctors can see valves, chambers and blood clots far more clearly than with a surface echo. You are lightly sedated and the test takes about half an hour.',
      duration: '30 minutes including sedation',
      preparation: [
        'Fast for at least 6 hours (sip of water allowed for essential pills)',
        'Discuss any medication changes, especially blood thinners if you are also having cardioversion',
        'Provide full medical history and allergy list',
        'Arrange a responsible adult to drive you home (no driving for 24 h after sedation)',
        'Wear comfortable clothes; you will change into a hospital gown',
        'Sign the consent form after the procedure has been explained'
      ],
      whatToExpect: [
        'Admission, IV line and vital‑sign monitoring',
        'Throat numbing spray and light sedation',
        'A mouth‑guard is placed to protect teeth and probe',
        'Probe gently passes through the mouth and down the oesophagus while you lie on your left side',
        'Real‑time heart images are recorded for about 10–15 minutes',
        'Monitoring continues until the sedation wears off (30–60 minutes)'
      ],
      followUp: [
        'Mild throat discomfort may last 24–48 h',
        'Formal report sent to your referring doctor and GP within 24 h',
        'You may request a personal copy of the results',
        'Contact the clinic if you develop fever, severe pain or difficulty swallowing'
      ],
      link: 'toe'
    },
    {
      name: 'TOE & Cardioversion (DCR)',
      description: 'Sedated electrical shock delivered to reset an irregular heartbeat (usually atrial fibrillation) to normal rhythm, often guided by a TOE scan to exclude clots.',
      detailedDescription: 'Direct (electrical) cardioversion is the most effective single way to restore a normal, coordinated heart rhythm. Large adhesive pads on the chest deliver a synchronised shock while you are briefly anaesthetised. A transoesophageal echo (TOE) may be performed immediately beforehand to ensure no blood clots are hiding in the heart. The entire procedure—including preparation, anaesthesia, shock, and recovery—takes a few hours, but the shock itself lasts only a fraction of a second.',
      duration: '2–3 hours total (shock < 1 second)',
      preparation: [
        'Medical evaluation and recent ECG/echo review',
        'Continue blood‑thinning medicines unless told otherwise',
        'Other medications may be paused—follow your doctor’s instructions',
        'Fast from midnight for morning lists, or 6 h before an afternoon list (sip of water for essential pills is fine)',
        'Bring referral, Medicare card and current medication list',
        'Arrange someone to drive you home (no driving for 24 h after sedation)'
      ],
      whatToExpect: [
        'Admission, consent signing and IV cannula insertion',
        'Monitoring leads and large adhesive shock pads placed on your chest',
        'Light anaesthetic given—you will be asleep for a few minutes',
        'One or more controlled shocks delivered; you will not feel them',
        'Heart rhythm checked; repeat shock if needed',
        'Observation in recovery while sedation wears off (1–2 h)',
        'If TOE performed first, you may notice mild throat discomfort afterward'
      ],
      followUp: [
        'Most people go home the same day',
        'Continue blood thinners unless your doctor advises otherwise',
        'Normal activities next day; avoid driving for 24 h',
        'Contact the clinic if you experience chest pain, severe sore throat or dizziness',
        'Follow‑up visit (or ECG) in 1–4 weeks to confirm rhythm and adjust medications'
      ],
      link: 'toe-dcr',
      hasJourneyMap: true,
      journeyMapId: 'toe_dcr'
    },
    {
      name: 'Pacemaker Implantation',
      description: 'Permanent pacemaker device implantation for heart rhythm disorders',
      detailedDescription: 'Pacemaker insertion involves implanting a small electronic device that monitors your heart rate and delivers electrical impulses when needed to maintain a normal rhythm, helping manage various heart rhythm disorders.',
      duration: '1-2 hours',
      preparation: [
        'Pre-operative assessment and blood tests',
        'Chest X-ray and baseline ECG',
        'Medication review and adjustments',
        'Fasting for 8 hours before procedure',
        'Shower with antibacterial soap'
      ],
      whatToExpect: [
        'Local anesthetic at implantation site',
        'Small incision below the left collarbone',
        'Pacemaker leads threaded through veins to heart',
        'Device testing and programming',
        'Wound closure and dressing application',
        'Post-procedure chest X-ray'
      ],
      followUp: [
        'Overnight monitoring and observation',
        'Arm movement restrictions for 4-6 weeks',
        'Wound care instructions for 1-2 weeks',
        'Device check at 2 weeks, then every 3-6 months',
        'Lifelong device monitoring and battery replacement planning'
      ],
      link: 'pacemaker',
      hasJourneyMap: true,
      journeyMapId: 'pacemaker'
    }
  ];

  const filteredVideos = videoData.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredConditions = conditionsData.filter(condition => {
    const matchesSearch = searchTerm === '' ||
                         condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         condition.causes.some(cause => cause.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         condition.treatments.some(treatment => treatment.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const filteredTests = testsData.filter(test => {
    const matchesSearch = searchTerm === '' ||
                         test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.detailedDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.preparation.some(prep => prep.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         test.whatToExpect.some(expect => expect.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         test.followUp.some(follow => follow.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Filter journey maps based on search
  const filteredJourneyMaps = Object.entries(procedureJourneys).filter(([, procedure]) => {
    if (searchTerm === '') return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      procedure.name.toLowerCase().includes(searchLower) ||
      procedure.description.toLowerCase().includes(searchLower) ||
      ('phases' in procedure && procedure.phases && Object.values(procedure.phases).some((phase: any) => 
        phase.title.toLowerCase().includes(searchLower) ||
        phase.activities.some((activity: string) => activity.toLowerCase().includes(searchLower))
      ))
    );
  });

  const goBack = () => {
    window.history.back();
  };

  const handleJourneyMapClick = (journeyMapId: string) => {
    setSelectedProcedure(journeyMapId);
    setActivePhase('pre-procedure');
    // Reset expanded test cards when selecting a journey map
    setExpandedTestCard(null);
    // Scroll to journey map section
    const journeySection = document.getElementById('journey-map-section');
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: 'smooth' });
    }
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
                onClick={() => {
                  setActiveTab(tab.id);
                  // Reset all expanded states when switching tabs
                  setExpandedTestCard(null);
                  setSelectedProcedure('general');
                }}
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

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search across all resources - procedures, tests, conditions, videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>

              {/* Search Results Indicator */}
              {searchTerm && (
                <div className="text-center text-sm text-secondary-600 bg-primary-50 rounded-xl py-2 px-4">
                  {activeTab === 'journey-maps' && `${filteredJourneyMaps.length} procedure${filteredJourneyMaps.length !== 1 ? 's' : ''} found`}
                  {activeTab === 'tests' && `${filteredTests.length} test${filteredTests.length !== 1 ? 's' : ''} found`}
                  {activeTab === 'conditions' && `${filteredConditions.length} condition${filteredConditions.length !== 1 ? 's' : ''} found`}
                  {activeTab === 'videos' && `${filteredVideos.length} video${filteredVideos.length !== 1 ? 's' : ''} found`}
                  {searchTerm && ` for "${searchTerm}"`}
                </div>
              )}

              {activeTab === 'videos' && (
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
                  {filteredJourneyMaps.length > 0 ? (
                    filteredJourneyMaps.map(([key, procedure]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedProcedure(key);
                          setActivePhase('pre-procedure');
                          // Reset expanded test cards when selecting a procedure
                          setExpandedTestCard(null);
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
                    ))
                  ) : searchTerm ? (
                    <div className="col-span-full text-center py-12">
                      <Search className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-secondary-600 mb-2">No procedures found</h3>
                      <p className="text-secondary-500">Try adjusting your search terms or browse all procedures.</p>
                    </div>
                  ) : null}
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

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-secondary-200/50">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-96 object-cover"
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
              {filteredConditions.length > 0 ? (
                filteredConditions.map((condition, index) => (
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
              ))
              ) : searchTerm ? (
                <div className="col-span-full text-center py-12">
                  <Search className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-secondary-600 mb-2">No conditions found</h3>
                  <p className="text-secondary-500">Try adjusting your search terms or browse all conditions.</p>
                </div>
              ) : null}
            </div>
          )}

          {/* Tests Tab */
          {activeTab === 'tests' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredTests.length > 0 ? (
                filteredTests.map((test, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-secondary-200/50 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Card Header */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary-100 p-2 rounded-xl">
                          <Stethoscope className="w-5 h-5 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-secondary-800">{test.name}</h3>
                      </div>
                      <button
                        onClick={() => {
                          const newExpanded = expandedTestCard === test.name ? null : test.name;
                          setExpandedTestCard(newExpanded);
                          // Reset patient journey when expanding a test
                          if (newExpanded) {
                            setSelectedProcedure('general');
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                      >
                        {expandedTestCard === test.name ? (
                          <ChevronUp className="w-5 h-5 text-secondary-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-secondary-600" />
                        )}
                      </button>
                    </div>
                    
                    <p className="text-secondary-600 text-sm leading-relaxed mb-6">{test.description}</p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-secondary-500" />
                        <span className="text-sm text-secondary-600">Duration: {test.duration}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <button
                        onClick={() => {
                          const newExpanded = expandedTestCard === test.name ? null : test.name;
                          setExpandedTestCard(newExpanded);
                          // Reset patient journey when expanding a test
                          if (newExpanded) {
                            setSelectedProcedure('general');
                          }
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-primary-500 text-white py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200 font-medium"
                      >
                        <span>{expandedTestCard === test.name ? 'Show Less' : 'Learn More'}</span>
                        {expandedTestCard === test.name ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      
                      {test.hasJourneyMap && (
                        <button
                          onClick={() => handleJourneyMapClick(test.journeyMapId)}
                          className="w-full flex items-center justify-center space-x-2 bg-sage-500 text-white py-3 rounded-xl hover:bg-sage-600 transition-colors duration-200 font-medium"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>View Patient Journey</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedTestCard === test.name && (
                    <div className="border-t border-secondary-200/50 bg-secondary-50/30 p-8 space-y-8">
                      {/* Detailed Description */}
                      <div>
                        <h4 className="font-semibold text-secondary-800 mb-3 flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-primary-500" />
                          <span>About This Test</span>
                        </h4>
                        <p className="text-secondary-600 text-sm leading-relaxed">{test.detailedDescription}</p>
                      </div>

                      {/* Preparation Checklist */}
                      <div>
                        <h4 className="font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-sage-500" />
                          <span>Preparation Checklist</span>
                        </h4>
                        <div className="space-y-3">
                          {test.preparation.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                              <div className="w-2 h-2 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-secondary-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* What to Expect */}
                      <div>
                        <h4 className="font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
                          <Monitor className="w-4 h-4 text-accent-500" />
                          <span>What to Expect</span>
                        </h4>
                        <div className="space-y-3">
                          {test.whatToExpect.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                              <div className="w-6 h-6 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-sm text-secondary-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Follow-up */}
                      <div>
                        <h4 className="font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-cream-600" />
                          <span>Follow-up & Results</span>
                        </h4>
                        <div className="space-y-3">
                          {test.followUp.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                              <div className="w-2 h-2 bg-cream-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-secondary-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
              ) : searchTerm ? (
                <div className="col-span-full text-center py-12">
                  <Search className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-secondary-600 mb-2">No tests found</h3>
                  <p className="text-secondary-500">Try adjusting your search terms or browse all tests.</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Journey Map Section */}
        {selectedProcedure !== 'general' && (
          <div id="journey-map-section" className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 overflow-hidden">
              {/* Timeline Header */}
              <div className="bg-gradient-to-r from-secondary-50 to-primary-50/30 p-8 border-b border-secondary-200/50">
                <h3 className="text-2xl font-bold text-secondary-800 mb-2">
                  {procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].name} - Patient Journey
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
          </div>
        )}

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