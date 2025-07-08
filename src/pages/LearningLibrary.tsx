import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Heart, 
  Activity, 
  Stethoscope, 
  Search, 
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  PlayCircle,
  ArrowLeft,
  Phone,
  Clipboard,
  Monitor,
  Bed,
  UserCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  Zap
} from 'lucide-react';

const LearningLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('journeys');
  const [selectedProcedure, setSelectedProcedure] = useState('general');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedConditions, setExpandedConditions] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle URL parameters from services page and main search
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const focus = urlParams.get('focus');
    const tab = urlParams.get('tab');
    const search = urlParams.get('search');
    
    if (focus) {
      setSelectedProcedure(focus);
    }
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (search) {
      setSearchTerm(search);
    }
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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

  // Intersection observer for journey steps
  useEffect(() => {
    const observerOptions = {
      threshold: 0.4,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = stepRefs.current.findIndex(ref => ref === entry.target);
          if (stepIndex !== -1 && !visibleSteps.includes(stepIndex)) {
            setVisibleSteps(prev => [...prev, stepIndex].sort((a, b) => a - b));
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleSteps]);

  const toggleConditionExpansion = (conditionName: string) => {
    setExpandedConditions(prev => 
      prev.includes(conditionName)
        ? prev.filter(name => name !== conditionName)
        : [...prev, conditionName]
    );
  };

  const heartConditions = [
    {
      name: 'Coronary Artery Disease (CAD)',
      description: 'Narrowing of the coronary arteries that supply blood to the heart muscle, leading to reduced oxygen delivery and potential chest pain or heart attack.',
      symptoms: [
        'Chest pain or discomfort (angina), especially with exertion',
        'Shortness of breath during activity or at rest',
        'Fatigue and reduced exercise tolerance',
        'Heart palpitations or irregular heartbeat',
        'Nausea, sweating, or light-headedness',
        'Pain radiating to arm, jaw, neck, or back'
      ],
      causes: [
        'Atherosclerosis (plaque buildup in coronary arteries)',
        'High cholesterol and triglyceride levels',
        'High blood pressure and diabetes',
        'Smoking and tobacco use',
        'Family history of heart disease',
        'Sedentary lifestyle and poor diet',
        'Obesity and metabolic syndrome'
      ],
      treatments: [
        'Lifestyle modifications: diet, exercise, smoking cessation',
        'Medications: statins, blood pressure medications, antiplatelets',
        'Coronary angioplasty and stent placement (PCI)',
        'Coronary artery bypass grafting (CABG) surgery',
        'Cardiac rehabilitation programs',
        'Risk factor management and monitoring',
        'Regular follow-up and preventive care'
      ],
      tests: [
        'Electrocardiogram (ECG)',
        'Exercise Stress Test',
        'Cardiac CT Angiography (CTCA)',
        'Coronary Angiography',
        'Echocardiogram',
        'Blood tests (cholesterol, diabetes screening)'
      ],
      icon: <Heart className="w-6 h-6 text-primary-500" />
    },
    {
      name: 'Heart Failure with Reduced Ejection Fraction (HFrEF)',
      description: 'A condition where the heart muscle is weakened and can’t pump enough blood around the body, leading to symptoms like tiredness and fluid retention. Effective treatments can help improve symptoms and quality of life.',
      symptoms: [
        'Shortness of breath, especially with activity or when lying down',
        'Swollen ankles, legs, or abdomen due to fluid retention',
        'Persistent cough or wheezing',
        'Fatigue or reduced exercise capacity',
        'Rapid or irregular heartbeat (palpitations)',
        'Sudden weight gain due to fluid buildup'
      ],
      causes: [
        'Previous heart attack (myocardial infarction)',
        'Coronary artery disease',
        'High blood pressure (hypertension)',
        'Heart muscle damage (cardiomyopathy)',
        'Faulty heart valves',
        'Long-term alcohol abuse or drug use'
      ],
      treatments: [
        'Medications such as ACE inhibitors, beta-blockers, and diuretics',
        'Lifestyle changes including a low-salt diet, regular gentle exercise, and fluid restriction',
        'Cardiac rehabilitation programs',
        'Pacemaker or defibrillator implantation, if needed',
        'Surgery for valve repair or replacement, or in severe cases, heart transplant'
      ],
      tests: [
        'Echocardiogram (ultrasound of the heart)',
        'Electrocardiogram (ECG)',
        'Cardiac MRI',
        'Chest X-ray',
        'Blood tests (BNP/NT-proBNP, kidney function)',
        'Coronary angiography if indicated'
      ],
      icon: <Activity className="w-6 h-6 text-sage-500" />
    },
    {
      name: 'Heart Failure with Preserved Ejection Fraction (HFpEF)',
      description: 'A form of heart failure where the heart muscle is stiff and doesn’t relax properly, making it harder for the heart to fill with blood. With the right management plan, symptoms can be controlled effectively.',
      symptoms: [
        'Shortness of breath, especially during activity',
        'Fatigue and reduced physical endurance',
        'Swelling in ankles, legs, or abdomen',
        'Difficulty breathing when lying flat',
        'Persistent cough or wheeze',
        'Rapid heartbeat (palpitations)'
      ],
      causes: [
        'High blood pressure (hypertension)',
        'Diabetes',
        'Obesity and metabolic syndrome',
        'Coronary artery disease',
        'Atrial fibrillation',
        'Aging and stiffening of heart muscle'
      ],
      treatments: [
        'Blood pressure control medications like diuretics',
        'Lifestyle modifications: healthy diet, weight loss, regular physical activity',
        'Management of related conditions such as diabetes and high cholesterol',
        'Cardiac rehabilitation to improve overall heart health',
        'Regular monitoring by a cardiologist'
      ],
      tests: [
        'Echocardiogram',
        'Electrocardiogram (ECG)',
        'Exercise Stress Echocardiogram',
        'Cardiac MRI',
        'Blood tests (BNP/NT-proBNP, diabetes and kidney screening)',
        'Chest X-ray'
      ],
      icon: <Activity className="w-6 h-6 text-accent-500" />
    },
    {
      name: 'Atrial Fibrillation (AF)',
      description: 'A fast, irregular heartbeat that can come and go. AF reduces the heart pumping efficiency and markedly increases the risk of stroke and heart failure if untreated.',
      symptoms: [
        'Fluttering or racing heartbeat',
        'Irregular pulse',
        'Shortness of breath',
        'Fatigue or reduced exercise capacity',
        'Dizziness or light-headedness',
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
        'Post-surgery stress'
      ],
      treatments: [
        'Anticoagulant ("blood-thinning") therapy to reduce stroke risk',
        'Medicines to slow the heart rate',
        'Medicines or electrical cardioversion to restore normal rhythm',
        'Catheter ablation for rhythm control',
        'Lifestyle changes: weight, alcohol, blood pressure, sleep apnoea'
      ],
      tests: [
        'Electrocardiogram (ECG)',
        'Holter monitor or event monitor',
        'Echocardiogram',
        'Blood tests (thyroid function, kidney function)',
        'Sleep study (for sleep apnoea screening)'
      ],
      icon: <Activity className="w-6 h-6 text-accent-500" />
    },
    {
      name: 'Aortic Stenosis',
      description: 'Narrowing of the aortic valve opening that obstructs blood flow from the heart to the body. Untreated, it can lead to heart failure, fainting or sudden death, but modern valve-replacement procedures can restore normal flow.',
      symptoms: [
        'Shortness of breath on exertion',
        'Chest pain or pressure (angina)',
        'Dizziness or fainting spells (syncope)',
        'Unusual tiredness or reduced exercise capacity',
        'Heart-failure signs such as ankle swelling'
      ],
      causes: [
        'Age-related calcification and scarring of the aortic valve',
        'Congenital bicuspid (two-leaflet) aortic valve',
        'Rheumatic heart disease after rheumatic fever',
        'Risk factors: smoking, high blood pressure, high cholesterol, chronic kidney disease'
      ],
      treatments: [
        'Regular cardiology follow-up and echocardiography if mild or asymptomatic',
        'Aortic valve replacement — either surgical (open-heart) or transcatheter (TAVI)',
        'Balloon valvuloplasty as temporary or bridge therapy in selected cases',
        'Medicines to control blood pressure, cholesterol and heart-failure symptoms',
        'Lifestyle measures: quit smoking, manage blood pressure and cholesterol'
      ],
      tests: [
        'Echocardiogram',
        'Electrocardiogram (ECG)',
        'Cardiac CT scan (for valve sizing)',
        'Coronary angiography if valve replacement considered',
        'Exercise Stress Test (in selected cases)'
      ],
      icon: <Heart className="w-6 h-6 text-primary-500" />
    },
    {
      name: 'Mitral Regurgitation',
      description: 'A condition where the mitral valve does not close properly, allowing blood to leak backward into the left atrium.',
      symptoms: ['Shortness of breath', 'Fatigue', 'Heart palpitations', 'Swelling in feet/ankles', 'Heart murmur'],
      causes: ['Mitral valve prolapse', 'Heart attack', 'Infection', 'Age-related wear', 'Rheumatic heart disease'],
      treatments: ['Monitoring', 'Medications', 'Valve repair', 'Valve replacement', 'PASCAL procedure', 'MitraClip procedure'],
      tests: [
        'Echocardiogram',
        'Electrocardiogram (ECG)',
        'Transesophageal Echocardiogram (TOE)',
        'Cardiac MRI',
        'Exercise Stress Echocardiogram'
      ],
      icon: <Heart className="w-6 h-6 text-sage-500" />
    },
    {
      name: 'Hypertension (High Blood Pressure)',
      description: 'A condition where blood pressure in the arteries is persistently elevated, increasing the risk of heart disease and stroke.',
      symptoms: ['Often no symptoms', 'Headaches', 'Shortness of breath', 'Nosebleeds (severe cases)'],
      causes: ['Genetics', 'Poor diet', 'Lack of exercise', 'Stress', 'Obesity'],
      treatments: ['Lifestyle changes', 'Blood pressure medications', 'Regular monitoring', 'Dietary modifications'],
      tests: [
        'Blood pressure monitoring (home or ambulatory)',
        'Blood tests (kidney function, cholesterol, diabetes screening)',
        'Electrocardiogram (ECG)',
        'Echocardiogram (in selected cases)'
      ],
      icon: <AlertCircle className="w-6 h-6 text-cream-600" />
    },
    // --- removed "Arrhythmias" entry ---
    {
      name: 'Supraventricular Tachycardia (SVT)',
      description: 'A condition causing the heart to beat very rapidly due to abnormal electrical signals in the upper heart chambers. It can feel uncomfortable, but treatments are highly effective.',
      symptoms: [
        'Sudden rapid heartbeat',
        'Palpitations or a fluttering sensation',
        'Shortness of breath',
        'Dizziness or lightheadedness',
        'Chest discomfort',
        'Feeling anxious or panicky'
      ],
      causes: [
        'Abnormal electrical pathways in the heart',
        'Stress or anxiety',
        'Excessive caffeine or alcohol intake',
        'Certain medications or stimulants',
        'Underlying heart conditions'
      ],
      treatments: [
        'Vagal maneuvers (techniques to slow heart rate)',
        'Medications to control heart rhythm',
        'Catheter ablation procedure (highly effective)',
        'Lifestyle adjustments to avoid triggers'
      ],
      tests: [
        'Electrocardiogram (ECG)',
        'Holter monitor or event monitor',
        'Electrophysiology study (EPS)',
        'Echocardiogram'
      ],
      icon: <Zap className="w-6 h-6 text-primary-500" />
    },
    {
      name: 'Spontaneous Coronary Artery Dissection (SCAD)',
      description: 'An uncommon condition where a tear forms inside a coronary artery, potentially restricting blood flow to the heart. While it can be frightening, most people recover well with proper care.',
      symptoms: [
        'Chest pain or discomfort, often sudden',
        'Pain radiating to arms, neck, or back',
        'Shortness of breath',
        'Sweating or nausea',
        'Extreme fatigue'
      ],
      causes: [
        'Often occurs spontaneously without clear cause',
        'More common in younger women, especially after pregnancy',
        'Extreme physical exertion or emotional stress',
        'Underlying blood vessel conditions'
      ],
      treatments: [
        'Careful monitoring and medications to aid healing',
        'Blood pressure control and stress management',
        'Cardiac rehabilitation and lifestyle changes',
        'Procedures or surgery in severe cases'
      ],
      tests: [
        'Coronary Angiography',
        'Cardiac CT Angiography (CTCA)',
        'Electrocardiogram (ECG)',
        'Echocardiogram'
      ],
      icon: <Heart className="w-6 h-6 text-primary-500" />
    },
    {
      name: 'Heart Block',
      description: 'A condition where electrical signals in the heart are delayed or blocked, causing a slower heartbeat. Many people manage it effectively with treatment.',
      symptoms: [
        'Slow or irregular heartbeat',
        'Dizziness or fainting',
        'Fatigue or shortness of breath',
        'Chest discomfort',
        'Reduced ability to exercise'
      ],
      causes: [
        'Aging-related changes in the heart’s electrical system',
        'Previous heart attack or heart surgery',
        'Certain medications',
        'Conditions like Lyme disease or rheumatic fever'
      ],
      treatments: [
        'Regular monitoring by a cardiologist',
        'Adjusting medications that may cause blockages',
        'Pacemaker implantation, if needed, to regulate heart rhythm',
        'Lifestyle advice and cardiac rehabilitation'
      ],
      tests: [
        'Electrocardiogram (ECG)',
        'Holter monitor or event monitor',
        'Echocardiogram',
        'Electrophysiology study (in selected cases)'
      ],
      icon: <Monitor className="w-6 h-6 text-sage-500" />
    },
    {
      name: 'Atrial Flutter',
      description: 'A rapid, regular heart rhythm caused by abnormal electrical signals in the heart’s upper chambers. It’s treatable and can often be effectively controlled.',
      symptoms: [
        'Rapid, regular heartbeat',
        'Palpitations or fluttering sensation',
        'Shortness of breath or chest discomfort',
        'Fatigue or reduced exercise ability',
        'Dizziness or faintness'
      ],
      causes: [
        'Underlying heart conditions like coronary artery disease',
        'High blood pressure',
        'Heart valve disease',
        'Recent heart surgery',
        'Alcohol or stimulant use'
      ],
      treatments: [
        'Medications to control heart rate and rhythm',
        'Electrical cardioversion to restore normal rhythm',
        'Catheter ablation procedure for lasting relief',
        'Blood-thinning medications to reduce stroke risk'
      ],
      tests: [
        'Electrocardiogram (ECG)',
        'Holter monitor or event monitor',
        'Echocardiogram',
        'Electrophysiology study (EPS)'
      ],
      icon: <Activity className="w-6 h-6 text-accent-500" />
    }
  ];

  const tabs = [
    { id: 'journeys', label: 'Tests and Procedures', icon: <Heart className="w-5 h-5" /> },
    { id: 'conditions', label: 'Heart Conditions', icon: <Info className="w-5 h-5" /> }
  ];

  const filteredConditions = heartConditions.filter(condition => {
    const matchesSearch = searchTerm === '' ||
                         condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         condition.causes.some(cause => cause.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         condition.treatments.some(treatment => treatment.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  /**
   * Maps the plain‑language test names shown in each condition card
   * to the corresponding key in `procedureJourneys`.
   * When a test appears in this map, we can jump straight to the
   * “Tests & Procedures” tab and open the matching card.
   */
  const testToProcedureMap: Record<string, string> = {
    'Cardiac CT Angiography (CTCA)': 'ctca',
    'Cardiac CT scan (for valve sizing)': 'ctca',
    'Coronary Angiography': 'angiogram_pci',
    'Exercise Stress Test': 'exercise_stress_echo',
    'Exercise Stress Echocardiogram': 'exercise_stress_echo',
    'Echocardiogram (ultrasound of the heart)': 'echocardiogram',
    'Echocardiogram': 'echocardiogram',
    'Cardiac MRI': 'cardiac_mri',
    'PYP Scan': 'pyp_scan',
    'SPECT/CT imaging': 'pyp_scan',
    'Electrophysiology study (EPS)': 'svt_ablation',
    'Pacemaker implantation': 'pacemaker',
    
    // Procedures/Treatments
    'Pacemaker or defibrillator implantation, if needed': 'pacemaker',
    'Coronary angioplasty and stent placement (PCI)': 'angiogram_pci',
    'Catheter ablation': 'af_ablation',
    'Catheter ablation for rhythm control': 'af_ablation',
    'Catheter ablation procedure (highly effective)': 'svt_ablation',
    'Aortic valve replacement — either surgical (open-heart) or transcatheter (TAVI)': 'tavi',
    'Transcatheter (TAVI)': 'tavi',
    'TAVI': 'tavi',
    'Valve repair': 'mteer',
    'Valve replacement': 'tavi',
    'MitraClip procedure': 'mteer',
    'Electrical cardioversion to restore normal rhythm': 'toe_dcr',
    'Medicines or electrical cardioversion to restore normal rhythm': 'toe_dcr'
  };

  /**
   * When a test “pill” is clicked we switch to the
   * Tests & Procedures tab, open the relevant journey,
   * and smoothly scroll to the top.
   */
  const handleTestClick = (testName: string) => {
    const target = testToProcedureMap[testName];
    if (target) {
      setActiveTab('journeys');
      setSelectedProcedure(target);
      scrollToDetailCard();
    }
  };

  const procedureJourneys = {
    general: {
      name: 'General Patient Journey',
      description: 'Overview of the standard patient care process',
      color: 'from-primary-500 to-accent-500',
      category: 'consultation',
      type: 'procedure',
      image: '/images/consult.png',
      summary: 'A comprehensive cardiac consultation and diagnostic process designed to assess your heart health and develop a personalized treatment plan.',
      needToKnow: [
        'Consultation typically takes 20-40 minutes',
        'Bring Medicare card, referral letter, and medication list',
        'May include ECG, echocardiogram, or other tests',
        'Results and treatment plan discussed same day',
        'Follow-up appointments scheduled as needed'
      ],
      steps: [
        {
          id: 1,
          title: "Initial Contact",
          subtitle: "Professional consultation begins",
          description: "Contact our medical reception team for appointment scheduling and initial consultation guidance.",
          icon: <Phone className="w-5 h-5" />,
          duration: "5 minutes",
          details: [
            "Professional reception service",
            "Flexible appointment scheduling", 
            "Insurance verification assistance",
            "Immediate appointment confirmation"
          ],
        },
        {
          id: 2,
          title: "Pre-Visit Preparation",
          subtitle: "Comprehensive preparation support",
          description: "Receive detailed preparation instructions and complete necessary documentation for your consultation.",
          icon: <FileText className="w-5 h-5" />,
          duration: "1-2 days",
          details: [
            "Detailed preparation guidelines",
            "Digital patient forms",
            "Clear facility directions",
            "Consultation expectations overview"
          ],
        },
        {
          id: 3,
          title: "Medical Consultation",
          subtitle: "Expert cardiovascular assessment",
          description: "Comprehensive evaluation by our qualified cardiologists with personalized treatment planning.",
          icon: <Stethoscope className="w-5 h-5" />,
          duration: "20-40 minutes",
          details: [
            "Comprehensive medical history review",
            "Thorough cardiovascular examination",
            "Risk factor assessment",
            "Clear medical explanations"
          ],
        },
        {
          id: 4,
          title: "Diagnostic Testing",
          subtitle: "Advanced cardiac diagnostics",
          description: "State-of-the-art diagnostic testing to provide comprehensive insights into cardiovascular function.",
          icon: <Activity className="w-5 h-5" />,
          duration: "30-90 minutes",
          details: [
            "Electrocardiogram monitoring",
            "Echocardiography imaging",
            "Exercise stress testing",
            "Same-day results discussion"
          ],
        },
        {
          id: 5,
          title: "Treatment Planning",
          subtitle: "Personalized medical care",
          description: "Evidence-based treatment recommendations tailored to your specific cardiovascular health needs.",
          icon: <Heart className="w-5 h-5" />,
          duration: "Ongoing",
          details: [
            "Evidence-based treatment recommendations",
            "Lifestyle modification guidance",
            "Medication management protocols",
            "Follow-up care scheduling"
          ],
        },
        {
          id: 6,
          title: "Continuing Care",
          subtitle: "Long-term health partnership",
          description: "Ongoing cardiovascular monitoring and support for optimal long-term heart health outcomes.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: "Lifelong",
          details: [
            "Regular health monitoring",
            "Preventive care strategies",
            "Emergency consultation access",
            "Patient education resources"
          ],
        }
      ]
    },
    tavi: {
      name: 'TAVI (Transcatheter Aortic Valve Implantation)',
      description: 'Minimally invasive aortic valve replacement procedure',
      color: 'from-accent-500 to-primary-500',
      category: 'interventional',
      type: 'procedure',
      image: '/images/tavi.png',
      summary: 'A minimally invasive procedure to replace a diseased aortic valve using a catheter, typically through the groin artery, avoiding the need for open heart surgery.',
      needToKnow: [
        'Procedure takes 2-3 hours under general anaesthesia',
        'Usually requires 1-2 day hospital stay',
        'Pre-procedure CT scan and tests required',
        'Recovery is faster than surgical valve replacement',
        'Regular follow-up appointments essential'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Procedure Assessment",
          subtitle: "Comprehensive evaluation and planning",
          description: "Detailed cardiac imaging and multidisciplinary team evaluation to determine TAVI suitability.",
          icon: <Activity className="w-5 h-5" />,
          duration: "1-2 weeks",
          details: [
            "CT angiography for valve sizing",
            "Comprehensive echocardiography",
            "Heart team consultation",
            "Risk assessment and planning"
          ],
        },
        {
          id: 2,
          title: "Day of Procedure",
          subtitle: "Minimally invasive valve replacement",
          description: "TAVI procedure performed via small catheter insertion, typically through the groin artery.",
          icon: <Heart className="w-5 h-5" />,
          duration: "2-3 hours",
          details: [
            "Local a with sedation",
            "Catheter-based valve delivery",
            "Real-time imaging guidance",
            "Immediate function assessment"
          ],
        },
        {
          id: 3,
          title: "Post-Procedure Care",
          subtitle: "Recovery and monitoring",
          description: "Careful monitoring and gradual mobilization following successful valve implantation.",
          icon: <Monitor className="w-5 h-5" />,
          duration: "1-2 days",
          details: [
            "Cardiac monitoring and observation",
            "Gradual activity progression",
            "Medication optimization",
            "Discharge planning and education"
          ],
        },
        {
          id: 4,
          title: "Long-term Follow-up",
          subtitle: "Ongoing valve function monitoring",
          description: "Regular assessment to ensure optimal valve function and long-term heart health.",
          icon: <Calendar className="w-5 h-5" />,
          duration: "Lifelong",
          details: [
            "Regular echocardiographic monitoring",
            "Clinical assessment at intervals",
            "Medication management",
            "Lifestyle optimization guidance"
          ],
        }
      ]
    },
    toe_dcr: {
      name: 'TOE-Guided Cardioversion',
      description: 'Electrical cardioversion with advanced cardiac imaging guidance',
      color: 'from-sage-500 to-accent-500',
      category: 'procedures',
      type: 'procedure',
      image: '/images/toe.png',
      summary: 'A procedure combining advanced cardiac imaging with electrical cardioversion to safely restore normal heart rhythm in patients with atrial fibrillation.',
      needToKnow: [
        'Day procedure with light sedation',
        'Fast for 6 hours before procedure',
        'Blood thinning medication management required',
        'TOE imaging ensures safety before cardioversion',
        'Transport home required after procedure'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Procedure Preparation",
          subtitle: "Assessment and anticoagulation",
          description: "Comprehensive evaluation including anticoagulation management and procedure planning.",
          icon: <FileText className="w-5 h-5" />,
          duration: "2-4 weeks",
          details: [
            "Anticoagulation therapy optimization",
            "Pre-procedure echocardiography",
            "Anaesthetic assessment",
            "Consent and education process"
          ],
        },
        {
          id: 2,
          title: "TOE Assessment",
          subtitle: "Advanced cardiac imaging evaluation",
          description: "Transesophageal echocardiography to assess heart function and exclude blood clots.",
          icon: <Search className="w-5 h-5" />,
          duration: "30-45 minutes",
          details: [
            "Detailed left atrial assessment",
            "Blood clot exclusion",
            "Valve function evaluation",
            "Safety confirmation for cardioversion"
          ],
        },
        {
          id: 3,
          title: "Electrical Cardioversion",
          subtitle: "Rhythm restoration procedure",
          description: "Controlled electrical shock to restore normal heart rhythm under careful monitoring.",
          icon: <Zap className="w-5 h-5" />,
          duration: "15-30 minutes",
          details: [
            "General anaesthesia administration",
            "Synchronized electrical cardioversion",
            "Continuous cardiac monitoring",
            "Immediate rhythm assessment"
          ],
        },
        {
          id: 4,
          title: "Recovery and Follow-up",
          subtitle: "Post-procedure monitoring and care",
          description: "Careful observation and planning for ongoing rhythm management and anticoagulation.",
          icon: <UserCheck className="w-5 h-5" />,
          duration: "2-4 hours",
          details: [
            "Recovery room monitoring",
            "Rhythm stability assessment",
            "Anticoagulation planning",
            "Discharge education and follow-up"
          ],
        }
      ]
    },
    angiogram_pci: {
      name: 'Coronary Angiography & PCI',
      description: 'Diagnostic coronary imaging with potential intervention',
      color: 'from-primary-500 to-cream-500',
      category: 'interventional',
      type: 'procedure',
      image: '/images/angio.png',
      summary: 'Diagnostic procedure to visualize coronary arteries using contrast dye, with potential for immediate treatment (angioplasty/stenting) if blockages are found.',
      needToKnow: [
        'Procedure duration: 30-90 minutes depending on complexity',
        'Local anaesthetic via wrist or groin access',
        'May require overnight stay if intervention needed',
        'Kidney function tests required beforehand',
        'Two blood thinning tablets if stent placed'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Procedure Assessment",
          subtitle: "Comprehensive evaluation and preparation",
          description: "Detailed assessment including kidney function, bleeding risk, and procedure planning.",
          icon: <Clipboard className="w-5 h-5" />,
          duration: "1-7 days",
          details: [
            "Blood tests and kidney function assessment",
            "Medication review and adjustment",
            "Bleeding risk evaluation",
            "Consent process and education"
          ],
        },
        {
          id: 2,
          title: "Coronary Angiography",
          subtitle: "Diagnostic coronary artery imaging",
          description: "Contrast injection through cardiac catheter to visualize coronary arteries and identify blockages.",
          icon: <Activity className="w-5 h-5" />,
          duration: "30-60 minutes",
          details: [
            "Local anaesthetic and catheter insertion",
            "Contrast injection and X-ray imaging",
            "Coronary artery assessment",
            "Decision making for intervention"
          ],
        },
        {
          id: 3,
          title: "Percutaneous Coronary Intervention (PCI)",
          subtitle: "Coronary artery treatment if required",
          description: "Balloon angioplasty and stent placement to open blocked coronary arteries if indicated.",
          icon: <Heart className="w-5 h-5" />,
          duration: "30-90 minutes",
          details: [
            "Balloon angioplasty if blockages found",
            "Stent deployment for artery support",
            "Blood flow restoration",
            "Procedural success confirmation"
          ],
        },
        {
          id: 4,
          title: "Post-Procedure Recovery",
          subtitle: "Monitoring and discharge planning",
          description: "Careful observation for complications and medication optimization before discharge.",
          icon: <Bed className="w-5 h-5" />,
          duration: "4-24 hours",
          details: [
            "Puncture site monitoring and pressure",
            "Cardiac rhythm and vital sign monitoring",
            "Medication initiation or adjustment",
            "Activity restriction and discharge planning"
          ],
        }
      ]
    },
    pacemaker: {
      name: 'Pacemaker Implantation',
      description: 'Permanent cardiac rhythm device insertion',
      color: 'from-primary-500 to-cream-500',
      category: 'electrophysiology',
      type: 'procedure',
      image: '/images/pacemaker.png',
      summary: 'Surgical implantation of a small electronic device that helps regulate heart rhythm by delivering electrical impulses when needed.',
      needToKnow: [
        'Day procedure or overnight stay',
        'Local anaesthetic below left collarbone',
        'Arm movement restrictions for 4-6 weeks',
        'Regular device checks every 3-6 months',
        'Battery replacement needed every 8-12 years'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Implant Assessment",
          subtitle: "Device selection and preparation",
          description: "Comprehensive evaluation to determine optimal pacemaker type and settings for individual needs.",
          icon: <Activity className="w-5 h-5" />,
          duration: "1-2 weeks",
          details: [
            "Detailed rhythm analysis and indication review",
            "Device type selection and programming planning",
            "Pre-operative medical optimization",
            "Patient education and consent process"
          ],
        },
        {
          id: 2,
          title: "Pacemaker Implantation",
          subtitle: "Device and lead placement procedure",
          description: "Surgical implantation of pacemaker generator and positioning of leads in the heart.",
          icon: <Zap className="w-5 h-5" />,
          duration: "1-2 hours",
          details: [
            "Local a and sterile preparation",
            "Lead positioning using X-ray guidance",
            "Generator placement in chest pocket",
            "Initial device testing and programming"
          ],
        },
        {
          id: 3,
          title: "Post-Implant Recovery",
          subtitle: "Initial healing and device optimization",
          description: "Recovery period with activity restrictions to allow proper healing and device settling.",
          icon: <Monitor className="w-5 h-5" />,
          duration: "4-6 weeks",
          details: [
            "Wound care and infection prevention",
            "Activity restrictions to protect leads",
            "Device function monitoring",
            "Gradual return to normal activities"
          ],
        },
        {
          id: 4,
          title: "Long-term Device Management",
          subtitle: "Ongoing monitoring and optimization",
          description: "Regular device checks and programming adjustments to ensure optimal function throughout device life.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: "Device lifetime",
          details: [
            "Regular device interrogation and programming",
            "Battery status monitoring",
            "Lead function assessment",
            "Activity and lifestyle optimization"
          ],
        }
      ]
    },
    af_ablation: {
      name: 'Atrial Fibrillation Ablation',
      description: 'Advanced catheter ablation for rhythm control',
      color: 'from-sage-500 to-primary-500',
      category: 'electrophysiology',
      type: 'procedure',
      image: '/images/afabl_drawn.png',
      summary: 'Advanced catheter-based procedure using radiofrequency or pulsed field technology to eliminate abnormal electrical pathways causing atrial fibrillation.',
      needToKnow: [
        'Complex procedure taking 3-5 hours',
        'General anaesthesia required',
        'Overnight hospital stay',
        'Blood thinning management crucial',
        '3-6 months monitoring period for success assessment'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Ablation Preparation",
          subtitle: "Comprehensive evaluation and optimization",
          description: "Detailed assessment including imaging studies and anticoagulation management before ablation.",
          icon: <FileText className="w-5 h-5" />,
          duration: "2-4 weeks",
          details: [
            "Cardiac MRI or CT for anatomical mapping",
            "Anticoagulation optimization",
            "Pre-procedural echocardiography",
            "Anaesthetic consultation and preparation"
          ],
        },
        {
          id: 2,
          title: "Catheter Ablation Procedure",
          subtitle: "Advanced electrophysiology intervention",
          description: "Catheter-based ablation using radiofrequency or pulsed field technology to eliminate abnormal electrical pathways.",
          icon: <Zap className="w-5 h-5" />,
          duration: "3-5 hours",
          details: [
            "General anaesthesia and catheter positioning",
            "3D mapping of electrical activity",
            "Pulmonary vein isolation",
            "Additional lesion sets if required"
          ],
        },
        {
          id: 3,
          title: "Post-Ablation Recovery",
          subtitle: "Initial healing and rhythm monitoring",
          description: "Recovery period with careful monitoring for complications and early rhythm assessment.",
          icon: <Activity className="w-5 h-5" />,
          duration: "24-48 hours",
          details: [
            "Cardiac monitoring and observation",
            "Puncture site care and bed rest",
            "Pain management and comfort measures",
            "Early rhythm assessment and optimization"
          ],
        },
        {
          id: 4,
          title: "Long-term Follow-up",
          subtitle: "Rhythm monitoring and optimization",
          description: "Extended follow-up period to assess ablation success and manage ongoing rhythm control.",
          icon: <Calendar className="w-5 h-5" />,
          duration: "6-12 months",
          details: [
            "Regular rhythm monitoring with Holter studies",
            "Anticoagulation management decisions",
            "Activity progression and lifestyle counseling",
            "Assessment for additional procedures if needed"
          ],
        }
      ]
    },
    mteer: {
      name: 'Mitral TEER (Transcatheter Edge-to-Edge Repair)',
      description: 'Minimally invasive mitral valve repair using MitraClip or PASCAL technology',
      color: 'from-cream-500 to-accent-500',
      category: 'interventional',
      type: 'procedure',
      image: '/images/mteer_drawn.png',
      summary: 'A catheter‑based, minimally invasive procedure that implants a small clip on the mitral valve leaflets to reduce mitral regurgitation. The procedure usually takes 1–3 hours, avoids open‑heart surgery, and most people leave hospital within 1–3 days with rapid improvement in symptoms and quality of life.',
      needToKnow: [
        'Heart‑team (cardiologist & cardiothoracic surgeon) evaluation confirms suitability',
        'Performed through a vein in the groin with trans‑septal access to the heart',
        'General anaesthesia and transoesophageal echocardiography (TOE) guidance (some centres use deep sedation)',
        'Typical procedure time is 1–3 hours',
        'Most patients go home within 1–3 days',
        'Symptoms and exercise capacity often improve quickly'
      ],
      steps: [
        {
          id: 1,
          title: "Heart Team Evaluation",
          subtitle: "Multidisciplinary assessment for candidacy",
          description: "Comprehensive evaluation by heart team to determine suitability for transcatheter mitral valve repair.",
          icon: <Heart className="w-5 h-5" />,
          duration: "1-2 weeks",
          details: [
            "Detailed echocardiographic assessment",
            "Heart team discussion and planning",
            "Risk-benefit analysis",
            "Patient education and consent process"
          ],
        },
        {
          id: 2,
          title: "mTEER Procedure",
          subtitle: "Transcatheter valve repair intervention",
          description: "Minimally invasive placement of MitraClip or PASCAL device to reduce mitral valve leakage.",
          icon: <Activity className="w-5 h-5" />,
          duration: "2-4 hours",
          details: [
            "General anaesthesia and TEE guidance",
            "Transseptal catheter access",
            "Clip positioning and deployment",
            "Real-time assessment of repair adequacy"
          ],
        },
        {
          id: 3,
          title: "Post-Procedure Monitoring",
          subtitle: "Recovery and initial assessment",
          description: "Careful monitoring following clip deployment with assessment of procedural success.",
          icon: <Monitor className="w-5 h-5" />,
          duration: "1-2 days",
          details: [
            "Cardiac monitoring and observation",
            "Post-procedure echocardiography",
            "Gradual activity progression",
            "Discharge planning and education"
          ],
        },
        {
          id: 4,
          title: "Long-term Follow-up",
          subtitle: "Ongoing valve function assessment",
          description: "Regular monitoring to assess durability of repair and optimize heart failure management.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: "Lifelong",
          details: [
            "Serial echocardiographic monitoring",
            "Heart failure management optimization",
            "Activity and exercise recommendations",
            "Long-term durability assessment"
          ],
        }
      ]
    },
    echocardiogram: {
      name: 'Resting Echocardiogram',
      description: 'Non‑invasive ultrasound scan of the heart at rest',
      color: 'from-sage-500 to-cream-500',
      category: 'imaging',
      type: 'test',
      image: '/images/echo.png',
      summary: 'A painless ultrasound that creates live images of your heart chambers, valves and blood flow, helping diagnose structure, function and overall pumping performance.',
      needToKnow: [
        'No fasting or special preparation required',
        'Takes about 30–45 minutes',
        'A small probe with gel is moved across the chest',
        'Uses safe, radiation‑free ultrasound waves',
        'Results reviewed by a cardiologist within 24–48 hours'
      ],
      steps: [
        {
          id: 1,
          title: 'Check‑in & Preparation',
          subtitle: 'Brief medical history and setup',
          description: 'You change into a gown and lie on an exam table; ECG dots may be placed to synchronise images.',
          icon: <Clipboard className="w-5 h-5" />,
          duration: '5‑10 minutes',
          details: [
            'Verification of referral and Medicare details',
            'Explanation of the scan process',
            'Removal of upper‑body clothing and jewellery'
          ]
        },
        {
          id: 2,
          title: 'Image Acquisition',
          subtitle: 'Ultrasound imaging of heart structures',
          description: 'The sonographer moves the probe over the chest to collect moving pictures and Doppler blood‑flow signals.',
          icon: <Activity className="w-5 h-5" />,
          duration: '20‑30 minutes',
          details: [
            'Multiple views taken from left side and below sternum',
            'Colour Doppler to assess valve leakage',
            'Live measurements of chamber size & heart function'
          ]
        },
        {
          id: 3,
          title: 'Review & Results',
          subtitle: 'Cardiologist interpretation',
          description: 'Images are analysed and a detailed report is sent to your referring doctor.',
          icon: <FileText className="w-5 h-5" />,
          duration: 'Same or next day',
          details: [
            'Quantitative measurements of pumping strength (EF)',
            'Valve function grading',
            'Recommendation for further tests or treatment if needed'
          ]
        }
      ]
    },
    ctca: {
      name: 'Cardiac CT Angiography (CTCA)',
      description: 'Non-invasive coronary artery imaging using advanced CT technology',
      color: 'from-sage-500 to-primary-500',
      category: 'imaging',
      type: 'test',
      image: '/images/ctca.png',
      summary: 'High-resolution CT scan with contrast to visualize coronary arteries and assess for blockages without invasive catheterization.',
      needToKnow: [
        'Fast for 4 hours, avoid caffeine day of scan',
        'Heart rate control with medication if needed',
        'Quick 15-30 minute procedure',
        'Results available within a few days',
        'Excellent alternative to invasive angiography'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Scan Preparation",
          subtitle: "Optimization for optimal image quality",
          description: "Heart rate control and preparation to ensure optimal image quality for coronary assessment.",
          icon: <Clock className="w-5 h-5" />,
          duration: "1-2 hours",
          details: [
            "Heart rate optimization with beta-blockers",
            "IV access for contrast administration",
            "Allergy screening and premedication if needed",
            "Patient positioning and monitoring setup"
          ],
        },
        {
          id: 2,
          title: "CT Coronary Angiography",
          subtitle: "Advanced cardiac imaging acquisition",
          description: "High-resolution CT scanning with contrast to visualize coronary arteries and assess for blockages.",
          icon: <Activity className="w-5 h-5" />,
          duration: "15-30 minutes",
          details: [
            "ECG-gated cardiac CT acquisition",
            "Contrast injection for coronary visualization",
            "Breath-hold instructions during scanning",
            "Multiple cardiac cycle imaging"
          ],
        },
        {
          id: 3,
          title: "Image Analysis",
          subtitle: "Detailed coronary assessment",
          description: "Comprehensive analysis of coronary anatomy and identification of any significant narrowing.",
          icon: <Search className="w-5 h-5" />,
          duration: "1-2 hours",
          details: [
            "3D reconstruction of coronary arteries",
            "Stenosis assessment and quantification",
            "Plaque characterization and analysis",
            "Cardiac function evaluation"
          ],
        },
        {
          id: 4,
          title: "Results and Follow-up",
          subtitle: "Treatment planning based on findings",
          description: "Review of results with cardiologist and planning of appropriate treatment strategy if needed.",
          icon: <FileText className="w-5 h-5" />,
          duration: "Same day",
          details: [
            "Results review with cardiologist",
            "Treatment recommendations if abnormal",
            "Risk stratification and prognosis discussion",
            "Follow-up planning and recommendations"
          ],
        }
      ]
    },
    pyp_scan: {
      name: 'PYP Scan (Cardiac Amyloidosis Imaging)',
      description: 'Specialized nuclear imaging to detect cardiac amyloidosis',
      color: 'from-accent-500 to-sage-500',
      category: 'imaging',
      type: 'test',
      image: '/images/pyp.png',
      summary: 'Specialized nuclear imaging study to detect and quantify cardiac amyloid deposits using radiotracer technology.',
      needToKnow: [
        'No fasting required, total time 3 hours',
        'Safe radiotracer injection followed by wait period',
        'SPECT/CT imaging after uptake period',
        'Results typically available within 48 hours',
        'Important for diagnosing cardiac amyloidosis'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Scan Assessment",
          subtitle: "Clinical evaluation and preparation",
          description: "Clinical assessment and preparation for specialized nuclear cardiac imaging study.",
          icon: <FileText className="w-5 h-5" />,
          duration: "30 minutes",
          details: [
            "Clinical history and examination",
            "Review of indications for scan",
            "Patient education about procedure",
            "Consent process and preparation"
          ],
        },
        {
          id: 2,
          title: "Radiotracer Injection",
          subtitle: "PYP radiotracer administration",
          description: "Injection of Technetium-99m pyrophosphate (PYP) radiotracer for cardiac amyloid detection.",
          icon: <Activity className="w-5 h-5" />,
          duration: "5 minutes",
          details: [
            "IV access and radiotracer preparation",
            "PYP injection via peripheral vein",
            "Radiotracer distribution period",
            "Safety monitoring and comfort measures"
          ],
        },
        {
          id: 3,
          title: "Imaging Acquisition",
          subtitle: "SPECT/CT cardiac imaging",
          description: "Specialized nuclear imaging to detect and quantify cardiac amyloid deposits.",
          icon: <Monitor className="w-5 h-5" />,
          duration: "45 minutes",
          details: [
            "SPECT/CT camera positioning",
            "Multiple angle image acquisition",
            "Heart and thorax imaging",
            "High-resolution cardiac assessment"
          ],
        },
        {
          id: 4,
          title: "Results and Interpretation",
          subtitle: "Amyloidosis assessment and reporting",
          description: "Specialized interpretation to determine presence and extent of cardiac amyloidosis.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: "1-2 days",
          details: [
            "Quantitative analysis of cardiac uptake",
            "Comparison with normal reference values",
            "Grading of amyloid burden if present",
            "Correlation with clinical findings"
          ],
        }
      ]
    },
    svt_ablation: {
      name: 'SVT Ablation (Supraventricular Tachycardia)',
      description: 'Catheter ablation for supraventricular tachycardia treatment',
      color: 'from-primary-500 to-accent-500',
      category: 'electrophysiology',
      type: 'procedure',
      image: '/images/afabl_drawn.png',
      summary: 'Precise catheter-based procedure to eliminate abnormal electrical pathways causing supraventricular tachycardia episodes.',
      needToKnow: [
        'High success rate (>95% for most SVT types)',
        'Day procedure with conscious sedation',
        '1-3 hour procedure via groin access',
        'Same-day discharge in most cases',
        'Immediate cure of SVT episodes expected'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Ablation Assessment",
          subtitle: "Electrophysiology study planning",
          description: "Comprehensive evaluation to identify the specific type of SVT and plan ablation strategy.",
          icon: <Activity className="w-5 h-5" />,
          duration: "1-2 weeks",
          details: [
            "Detailed rhythm analysis and characterization",
            "Electrophysiology study planning",
            "Risk assessment and patient education",
            "Consent process and pre-procedure preparation"
          ],
        },
        {
          id: 2,
          title: "Electrophysiology Study",
          subtitle: "Diagnostic mapping and localization",
          description: "Detailed electrical mapping to identify the exact location of abnormal electrical pathways.",
          icon: <Search className="w-5 h-5" />,
          duration: "1-2 hours",
          details: [
            "Catheter positioning via groin access",
            "Electrical mapping of heart chambers",
            "SVT induction and characterization",
            "Precise localization of abnormal pathway"
          ],
        },
        {
          id: 3,
          title: "Catheter Ablation",
          subtitle: "Elimination of abnormal electrical pathway",
          description: "Precise radiofrequency ablation to permanently eliminate the SVT causing electrical pathway.",
          icon: <Zap className="w-5 h-5" />,
          duration: "30-60 minutes",
          details: [
            "Radiofrequency energy delivery",
            "Real-time monitoring of ablation effect",
            "Testing for complete pathway elimination",
            "Confirmation of procedural success"
          ],
        },
        {
          id: 4,
          title: "Post-Ablation Recovery",
          subtitle: "Recovery and follow-up care",
          description: "Recovery period with monitoring and assessment of long-term success.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: "4-6 hours",
          details: [
            "Post-procedure monitoring and observation",
            "Puncture site care and bed rest",
            "Rhythm monitoring for complications",
            "Discharge planning and follow-up"
          ],
        }
      ]
    },
    cardiac_mri: {
      name: 'Cardiac MRI',
      description: 'Advanced magnetic resonance imaging for detailed cardiac assessment',
      color: 'from-sage-500 to-cream-500',
      category: 'imaging',
      type: 'test',
      image: '/images/mri.png',
      summary: 'Advanced magnetic resonance imaging providing detailed assessment of cardiac structure, function, and tissue characteristics.',
      needToKnow: [
        'MRI safety screening essential',
        '60 minute scan with breath holds',
        'Contrast (non-iodine) injection may be required',
        'Results available within a week',
        'Most detailed cardiac imaging available for the heart muscle'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-MRI Screening",
          subtitle: "Safety assessment and preparation",
          description: "Comprehensive screening for MRI safety and preparation for optimal image quality.",
          icon: <FileText className="w-5 h-5" />,
          duration: "30 minutes",
          details: [
            "MRI safety questionnaire completion",
            "Metallic implant assessment",
            "Claustrophobia evaluation and management",
          ],
        },
        {
          id: 2,
          title: "Cardiac MRI Acquisition",
          subtitle: "Advanced cardiac imaging",
          description: "High-resolution magnetic resonance imaging to assess cardiac structure and function.",
          icon: <Heart className="w-5 h-5" />,
          duration: "20-40 minutes",
          details: [
            "ECG-gated cardiac imaging sequences",
            "Cine imaging for function assessment",
            "Contrast-enhanced imaging if indicated",
            "Specialized sequences for tissue characterization"
          ],
        },
        {
          id: 3,
          title: "Image Analysis",
          subtitle: "Detailed cardiac assessment",
          description: "Comprehensive analysis of cardiac structure, function, and tissue characteristics.",
          icon: <Monitor className="w-5 h-5" />,
          duration: "1-2 hours",
          details: [
            "Cardiac function quantification",
            "Wall motion and thickening analysis",
            "Tissue characterization and fibrosis assessment",
            "Valve function evaluation"
          ],
        },
        {
          id: 4,
          title: "Results and Clinical Correlation",
          subtitle: "Treatment planning based on findings",
          description: "Review of MRI findings with clinical correlation and treatment planning.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: "Variable",
          details: [
            "Detailed review of cardiac structure and function",
            "Correlation with clinical presentation",
            "Treatment recommendations based on findings",
            "Follow-up imaging planning if needed"
          ],
        }
      ]
    },
    exercise_stress_echo: {
      name: 'Exercise Stress Echocardiography',
      description: 'Combined exercise testing with cardiac ultrasound imaging',
      color: 'from-cream-500 to-sage-500',
      category: 'imaging',
      type: 'test',
      image: '/images/stressecho.png',
      summary: 'Exercise test combined with cardiac ultrasound to assess heart function under stress and detect coronary artery disease.',
      needToKnow: [
        'Wear comfortable exercise clothing and shoes',
        'Light meal 2-3 hours before test',
        'Progressive treadmill exercise with monitoring',
        'Immediate post-exercise imaging required',
        'Results discussed immediately after test'
      ],
      steps: [
        {
          id: 1,
          title: "Pre-Test Preparation",
          subtitle: "Baseline assessment and preparation",
          description: "Baseline cardiac assessment and preparation for safe exercise testing.",
          icon: <Activity className="w-5 h-5" />,
          duration: "30 minutes",
          details: [
            "Baseline ECG and vital signs",
            "Resting echocardiography",
            "Exercise protocol selection",
            "Safety monitoring setup"
          ],
        },
        {
          id: 2,
          title: "Exercise Testing",
          subtitle: "Progressive exercise with monitoring",
          description: "Graded exercise testing with continuous cardiac monitoring and imaging.",
          icon: <Heart className="w-5 h-5" />,
          duration: "15-20 minutes",
          details: [
            "Progressive treadmill exercise protocol",
            "Continuous ECG and blood pressure monitoring",
            "Symptom assessment during exercise",
            "Peak exercise achievement"
          ],
        },
        {
          id: 3,
          title: "Post-Exercise Imaging",
          subtitle: "Immediate post-exercise echocardiography",
          description: "Rapid echocardiographic imaging immediately after peak exercise to assess cardiac function.",
          icon: <Monitor className="w-5 h-5" />,
          duration: "5-10 minutes",
          details: [
            "Immediate transfer to echo bed",
            "Rapid cardiac imaging acquisition",
            "Wall motion assessment at peak stress",
            "Comparison with resting images"
          ],
        },
        {
          id: 4,
          title: "Recovery and Results",
          subtitle: "Recovery monitoring and interpretation",
          description: "Recovery period with continued monitoring and interpretation of test results.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: "15-30 minutes",
          details: [
            "Continuous monitoring during recovery",
            "Comparison of rest and stress images",
            "Exercise capacity assessment",
            "Results discussion and recommendations"
          ],
        }
      ]
    },
    holter: {
      name: '24 Hour Holter Monitoring',
      description: 'Continuous cardiac rhythm monitoring over 24 hours',
      color: 'from-cream-500 to-accent-500',
      category: 'monitoring',
      type: 'test',
      image: '/images/holter.png',
      summary: 'Holter monitoring involves wearing a small, portable device that continuously records your heart rhythm for 24 hours. This helps detect irregular heartbeats that may not occur during a brief office visit.',
      needToKnow: [
        'Wear the device continuously for 24 hours',
        'Keep a diary of symptoms and activities',
        'Normal daily activities encouraged',
        'Avoid getting the device wet',
        'Return device the following day'
      ],
      steps: [
        {
          id: 1,
          title: "Device Application",
          subtitle: "Holter monitor setup and instruction",
          description: "Attachment of the portable cardiac monitoring device with patient education on proper use.",
          icon: <Monitor className="w-5 h-5" />,
          duration: "15-20 minutes",
          details: [
            "Skin preparation and electrode placement",
            "Device attachment and testing",
            "Patient education on device care",
            "Diary instruction for symptom recording"
          ],
        },
        {
          id: 2,
          title: "24 Hour Monitoring",
          subtitle: "Continuous rhythm recording",
          description: "24 hour period of continuous cardiac rhythm monitoring during normal daily activities.",
          icon: <Clock className="w-5 h-5" />,
          duration: "24 hours",
          details: [
            "Continuous ECG recording",
            "Normal daily activity maintenance",
            "Symptom diary completion",
            "Device care and protection"
          ],
        },
        {
          id: 3,
          title: "Device Return",
          subtitle: "Monitor removal and data download",
          description: "Return of the monitoring device with data download and initial technical analysis.",
          icon: <UserCheck className="w-5 h-5" />,
          duration: "10-15 minutes",
          details: [
            "Device removal and electrode cleanup",
            "Data download and verification",
            "Diary collection and review",
            "Technical analysis initiation"
          ],
        },
        {
          id: 4,
          title: "Results and Follow-up",
          subtitle: "Analysis interpretation and recommendations",
          description: "Comprehensive analysis of 24-hour recording with clinical correlation and treatment planning.",
          icon: <FileText className="w-5 h-5" />,
          duration: "1-3 days",
          details: [
            "Detailed rhythm analysis",
            "Symptom correlation assessment",
            "Clinical interpretation",
            "Follow-up planning and recommendations"
          ],
        }
      ]
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const getServiceColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'consultation': 'from-primary-500 to-accent-500',
      'interventional': 'from-accent-500 to-primary-500', 
      'procedures': 'from-sage-500 to-accent-500',
      'electrophysiology': 'from-primary-500 to-cream-500',
      'imaging': 'from-sage-500 to-primary-500',
      'monitoring': 'from-cream-500 to-accent-500'
    };
    return colorMap[category] || 'from-primary-500 to-accent-500';
  };

  const filteredProcedures = Object.entries(procedureJourneys).filter(([, procedure]) => {
    if (searchTerm === '') return true;
    const searchLower = searchTerm.toLowerCase();
    return procedure.name.toLowerCase().includes(searchLower) ||
           procedure.description.toLowerCase().includes(searchLower) ||
           procedure.steps.some(step => 
             step.title.toLowerCase().includes(searchLower) ||
             step.subtitle.toLowerCase().includes(searchLower) ||
             step.description.toLowerCase().includes(searchLower) ||
             step.details.some(detail => detail.toLowerCase().includes(searchLower))
           );
  });

  const groupedProcedures = filteredProcedures.reduce((acc, [key, procedure]) => {
    if (key === 'general') {
      // Handle general separately - it will be shown at the top
      return acc;
    }
    const type = procedure.type || 'procedure';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push([key, procedure]);
    return acc;
  }, {} as Record<string, Array<[string, any]>>);

  // Extract general procedure separately for top display
  const generalProcedure = filteredProcedures.find(([key]) => key === 'general');

  /**
   * Scrolls to the detailed procedure card section with offset for sticky header
   */
  const scrollToDetailCard = () => {
    setTimeout(() => {
      const detailCard = document.querySelector('[data-testid="selected-journey-display"]');
      if (detailCard) {
        const headerHeight = 100; // Account for sticky header height
        const elementPosition = detailCard.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback: scroll to a reasonable position that shows the detail card
        window.scrollTo({ top: 700, behavior: 'smooth' });
      }
    }, 100);
  };

  /**
   * When a procedure button is clicked, select it and scroll to the detail card
   */
  const handleProcedureClick = (procedureKey: string) => {
    setSelectedProcedure(procedureKey);
    scrollToDetailCard();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
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
              <h1 className="text-2xl font-bold text-secondary-800">Library</h1>
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
                  setSearchTerm('');
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'journeys' ? 'tests and procedures' : 'heart conditions'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Tests and Procedures Tab */}
          {activeTab === 'journeys' && (
            <div className="space-y-12">
              {/* Procedure Selection */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 p-8">
                <h3 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
                  Select a Test or Procedure
                </h3>
                
                <div className="space-y-12">
                  {/* General Patient Journey - Top Section */}
                  {generalProcedure && (
                    <div>
                      <h4 className="text-xl font-semibold text-secondary-700 mb-6 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-primary-500" />
                        Getting Started
                      </h4>
                      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
                        <motion.button
                          onClick={() => handleProcedureClick('general')}
                          className={`relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border ${
                            selectedProcedure === 'general'
                              ? 'shadow-xl scale-105 border-transparent' 
                              : 'shadow-sm hover:shadow-lg border-secondary-200 hover:border-primary-300'
                          }`}
                          style={{
                            backgroundImage: generalProcedure[1].image ? `url(${generalProcedure[1].image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            imageRendering: '-webkit-optimize-contrast'
                          }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Background overlay */}
                          <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                            selectedProcedure === 'general'
                              ? `bg-gradient-to-r ${generalProcedure[1].color} opacity-80`
                              : 'bg-white/70 hover:bg-white/80'
                          }`} />
                          
                          {/* Selection indicator */}
                          {selectedProcedure === 'general' && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="relative z-10 space-y-4 pointer-events-none">
                            <h4 className={`font-semibold text-lg leading-tight ${
                              selectedProcedure === 'general' ? 'text-white' : 'text-secondary-900'
                            }`}>
                              {generalProcedure[1].name}
                            </h4>
                            <p className={`text-sm ${
                              selectedProcedure === 'general' ? 'text-white/90' : 'text-secondary-600'
                            }`}>
                              {generalProcedure[1].description}
                            </p>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* Tests Section */}
                  {groupedProcedures.test && groupedProcedures.test.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-secondary-700 mb-6 flex items-center">
                        <Search className="w-5 h-5 mr-2 text-primary-500" />
                        Diagnostic Tests
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedProcedures.test.map(([key, procedure]) => (
                          <motion.button
                            key={key}
                            onClick={() => handleProcedureClick(key)}
                            className={`relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border ${
                              selectedProcedure === key
                                ? 'shadow-xl scale-105 border-transparent' 
                                : 'shadow-sm hover:shadow-lg border-secondary-200 hover:border-primary-300'
                            }`}
                            style={{
                              backgroundImage: procedure.image ? `url(${procedure.image})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              imageRendering: '-webkit-optimize-contrast'
                            }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Background overlay */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                              selectedProcedure === key
                                ? `bg-gradient-to-r ${procedure.color} opacity-80`
                                : 'bg-white/70 hover:bg-white/80'
                            }`} />
                            
                            {/* Selection indicator */}
                            {selectedProcedure === key && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                              </div>
                            )}
                            
                            {/* Content */}
                            <div className="relative z-10 space-y-4 pointer-events-none">
                              <h4 className={`font-semibold text-lg leading-tight ${
                                selectedProcedure === key ? 'text-white' : 'text-secondary-900'
                              }`}>
                                {procedure.name}
                              </h4>
                              <p className={`text-sm ${
                                selectedProcedure === key ? 'text-white/90' : 'text-secondary-600'
                              }`}>
                                {procedure.description}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Procedures Section */}
                  {groupedProcedures.procedure && groupedProcedures.procedure.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-secondary-700 mb-6 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-primary-500" />
                        Therapeutic Procedures
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedProcedures.procedure.map(([key, procedure]) => (
                          <motion.button
                            key={key}
                            onClick={() => handleProcedureClick(key)}
                            className={`relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border ${
                              selectedProcedure === key
                                ? 'shadow-xl scale-105 border-transparent' 
                                : 'shadow-sm hover:shadow-lg border-secondary-200 hover:border-primary-300'
                            }`}
                            style={{
                              backgroundImage: procedure.image ? `url(${procedure.image})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              imageRendering: '-webkit-optimize-contrast'
                            }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Background overlay */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                              selectedProcedure === key
                                ? `bg-gradient-to-r ${procedure.color} opacity-80`
                                : 'bg-white/70 hover:bg-white/80'
                            }`} />
                            
                            {/* Selection indicator */}
                            {selectedProcedure === key && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                              </div>
                            )}
                            
                            {/* Content */}
                            <div className="relative z-10 space-y-4 pointer-events-none">
                              <h4 className={`font-semibold text-lg leading-tight ${
                                selectedProcedure === key ? 'text-white' : 'text-secondary-900'
                              }`}>
                                {procedure.name}
                              </h4>
                              <p className={`text-sm ${
                                selectedProcedure === key ? 'text-white/90' : 'text-secondary-600'
                              }`}>
                                {procedure.description}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Journey Display */}
              {selectedProcedure && procedureJourneys[selectedProcedure as keyof typeof procedureJourneys] && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-secondary-200/50 p-8" data-testid="selected-journey-display">
                  {/* Header Section */}
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-secondary-800 mb-4">
                      {procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].name}
                    </h3>
                    <p className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed mb-6">
                      {procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].summary}
                    </p>
                  </div>

                  {/* Need to Know Section */}
                  <div className="flex gap-6 mb-8">
                    {/* Key Information - 2/3 width */}
                    <div className="flex-1 max-w-[66.666%] bg-primary-50/80 rounded-2xl p-6 border border-primary-100">
                      <h4 className="text-xl font-bold text-secondary-800 mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-primary-600" />
                        Key Information
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].needToKnow.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                            <span className="text-secondary-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Procedure Image - 1/3 width */}
                    <div className="flex-1 max-w-[33.333%]">
                      <div className="bg-white rounded-2xl p-4 border border-primary-100 shadow-sm h-full flex items-center justify-center">
                        <img
                          src={(procedureJourneys[selectedProcedure as keyof typeof procedureJourneys] as any)?.image || '/images/placeholder1.png'}
                          alt={procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].name}
                          className="w-full h-full object-cover rounded-xl"
                          style={{ 
                            maxHeight: '200px',
                            imageRendering: '-webkit-optimize-contrast'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detailed Steps Section */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-secondary-800 mb-6 text-center">
                      Detailed Process Steps
                    </h4>
                  </div>

                  {/* Journey Steps */}
                  <div className="space-y-12">
                    {procedureJourneys[selectedProcedure as keyof typeof procedureJourneys].steps.map((step: any, index: number) => (
                      <motion.div
                        key={step.id}
                        ref={el => stepRefs.current[index] = el}
                        variants={stepVariants}
                        initial="hidden"
                        animate={visibleSteps.includes(index) ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid lg:grid-cols-10 gap-8 items-start"
                      >
                        {/* Step Number */}
                        <div className="lg:col-span-1">
                          <div className="text-4xl font-bold text-secondary-200 leading-none">
                            {step.id.toString().padStart(2, '0')}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-9 space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-secondary-800 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                              {step.icon}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-secondary-800">{step.title}</h4>
                              <p className="text-secondary-500 font-medium">{step.subtitle}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-secondary-400">
                            <Clock className="w-4 h-4" />
                            <span>Duration: {step.duration}</span>
                          </div>

                          <p className="text-secondary-700 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Details */}
                          <div className="grid sm:grid-cols-1 gap-3">
                            <div>
                              <h5 className="font-semibold text-secondary-800 mb-2">What to Expect:</h5>
                              {step.details.map((detail: string, idx: number) => (
                                <div key={idx} className="flex items-start space-x-2 mb-1">
                                  <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-secondary-600 text-sm">{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call-to-Action */}
              <motion.div 
                className="mt-32 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="bg-slate-800 rounded-3xl p-16 text-white"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-8">
                    <motion.h3 
                      className="text-4xl lg:text-5xl font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Ready to Begin Your Journey?
                    </motion.h3>
                    <motion.p 
                      className="text-xl text-slate-300 max-w-2xl mx-auto font-light"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Contact our team to discuss your treatment options and schedule your consultation
                    </motion.p>
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.button 
                        className="bg-white text-slate-800 px-8 py-4 rounded-2xl font-medium text-lg shadow-sm"
                        whileHover={{ 
                          scale: 1.02,
                          backgroundColor: "#f8fafc"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Call (03) 9509 5009
                      </motion.button>
                      <motion.button 
                        className="border border-slate-600 text-white px-8 py-4 rounded-2xl font-medium text-lg hover:bg-slate-700/50"
                        whileHover={{ 
                          scale: 1.02
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Schedule Online
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Heart Conditions Tab */}
          {activeTab === 'conditions' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredConditions.map((condition, index) => {
                const isExpanded = expandedConditions.includes(condition.name);
                return (
                  <motion.div
                    key={condition.name}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-secondary-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    onClick={() => toggleConditionExpansion(condition.name)}
                  >
                  {/* Header */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary-50">
                      {condition.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-800 mb-2">{condition.name}</h3>
                      <p className="text-secondary-600 text-sm leading-relaxed">{condition.description}</p>
                    </div>
                  </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <>
                        {/* Symptoms */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-secondary-800 mb-2 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                            Symptoms
                          </h4>
                          <ul className="space-y-1">
                            {condition.symptoms.map((symptom, idx) => (
                              <li key={idx} className="text-sm text-secondary-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Causes */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-secondary-800 mb-2 flex items-center">
                            <Info className="w-4 h-4 mr-2 text-blue-500" />
                            Common Causes
                          </h4>
                          <ul className="space-y-1">
                            {condition.causes.map((cause, idx) => (
                              <li key={idx} className="text-sm text-secondary-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Treatments */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-secondary-800 mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Treatment Options
                          </h4>
                          <ul className="space-y-1">
                            {condition.treatments.map((treatment, idx) => (
                              <li key={idx} className="text-sm text-secondary-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {testToProcedureMap[treatment] ? (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleTestClick(treatment);
                                    }}
                                    className="flex items-center space-x-1 bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded-full shadow transition text-left"
                                  >
                                    <PlayCircle className="w-3 h-3 flex-shrink-0" />
                                    <span>{treatment}</span>
                                  </button>
                                ) : (
                                  <span>{treatment}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tests */}
                        {condition.tests && condition.tests.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-secondary-800 mb-2 flex items-center">
                              <Search className="w-4 h-4 mr-2 text-purple-500" />
                              Common Tests
                            </h4>
                            <ul className="space-y-1">
                              {condition.tests.map((test, idx) => (
                                <li key={idx} className="text-sm text-secondary-600 flex items-start">
                                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {testToProcedureMap[test] ? (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();            // prevent expanding/collapsing when pill clicked
                                        handleTestClick(test);
                                      }}
                                      className="flex items-center space-x-1 bg-purple-50 hover:bg-purple-100 text-purple-700 px-2 py-1 rounded-full shadow transition text-left"
                                    >
                                      <PlayCircle className="w-3 h-3 flex-shrink-0" />
                                      <span>{test}</span>
                                    </button>
                                  ) : (
                                    <span>{test}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {/* Expand/Collapse Indicator */}
                    <div className="mt-4 pt-3 border-t border-secondary-200/50">
                      <div className="flex items-center justify-center text-xs text-secondary-500">
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3 h-3 mr-1" />
                            Click to collapse
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3 mr-1" />
                            Click to see more details
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LearningLibrary;