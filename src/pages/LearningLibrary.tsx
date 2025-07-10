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
import { procedureJourneys } from '../data/procedureJourneys';
import { usePdfSelection } from '../contexts/PdfSelectionContext';
import { starterPacks } from '../data/starterPacks';
import { relatedCards } from '../data/relatedCards';
import { generateLearningLibraryPDF, downloadPDF } from '../components/pdf/generatePdf';

const LearningLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('journeys');
  const [selectedProcedure, setSelectedProcedure] = useState('general');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedConditions, setExpandedConditions] = useState<string[]>([]);
  const [showRelatedCards, setShowRelatedCards] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { selectedProcedures, addProcedure, removeProcedure, clearSelection } = usePdfSelection();

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
        'Cardiac rehabilitation programmes',
        'Risk factor management and monitoring',
        'Regular follow-up and preventive care'
      ],
      tests: [
        'Electrocardiogram (ECG)',
        'Exercise Stress Test',
        'Cardiac CT Angiography (CTCA)',
        'Coronary Angiography',
        'Echocardiogram',
        'Ambulatory Blood Pressure Monitor',
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
        'Cardiac rehabilitation programmes',
        'Pacemaker or defibrillator implantation, if needed',
        'Surgery for valve repair or replacement, or in severe cases, heart transplant'
      ],
      tests: [
        'Echocardiogram (ultrasound of the heart)',
        'Electrocardiogram (ECG)',
        'Cardiac MRI',
        'Chest X-ray',
        'Ambulatory Blood Pressure Monitor',
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
    'Ambulatory Blood Pressure Monitor': 'abpm',
    '24 Hour Ambulatory Blood Pressure Monitor': 'abpm',
    'Ambulatory Blood Pressure Monitoring': 'abpm',
    
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
    'Medicines or electrical cardioversion to restore normal rhythm': 'toe_dcr',
    'Transoesophageal Echocardiogram (TOE)': 'toe',
    'TOE': 'toe'
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
      'monitoring': 'from-cream-500 to-accent-500',
      'surgery': 'from-primary-500 to-cream-500',
      'structural': 'from-accent-500 to-sage-500'
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

  /**
   * Add procedure to PDF and show feedback
   */
  const handleAddToPdf = (procedureKey: string, event: React.MouseEvent) => {
    event.stopPropagation();
    addProcedure(procedureKey);
    
    // Create animated element that flies to bottom bar
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    
    const flyingElement = document.createElement('div');
    flyingElement.className = 'fixed z-50 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white pointer-events-none';
    flyingElement.style.left = `${rect.left + rect.width / 2 - 16}px`;
    flyingElement.style.top = `${rect.top + rect.height / 2 - 16}px`;
    flyingElement.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>';
    document.body.appendChild(flyingElement);
    
    // Animate to bottom bar
    setTimeout(() => {
      flyingElement.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      flyingElement.style.transform = 'translateY(50vh) scale(0.5)';
      flyingElement.style.opacity = '0';
    }, 100);
    
    // Remove element after animation
    setTimeout(() => {
      if (document.body.contains(flyingElement)) {
        document.body.removeChild(flyingElement);
      }
    }, 700);
  };

  const handleDownloadClick = (procedureKey: string, event: React.MouseEvent) => {
    event.stopPropagation();
    addProcedure(procedureKey);
    setShowRelatedCards(procedureKey);
  };

  const handleAddRelatedCard = (procedureKey: string) => {
    addProcedure(procedureKey);
    setShowRelatedCards(null);
  };

  const handleCloseRelatedCards = () => {
    setShowRelatedCards(null);
  };

  const handleGeneratePdf = async () => {
    if (selectedProcedures.size === 0) return;
    
    try {
      // Convert selected procedure IDs to procedure data
      const procedureData = Array.from(selectedProcedures).map(id => {
        const procedure = procedureJourneys[id as keyof typeof procedureJourneys];
        return procedure ? {
          name: procedure.name,
          description: procedure.description,
          summary: procedure.summary,
          needToKnow: procedure.needToKnow,
          steps: procedure.steps,
          image: (procedure as any)?.image
        } : null;
      }).filter((item): item is NonNullable<typeof item> => item !== null);

      if (procedureData.length === 0) {
        throw new Error('No valid procedures found');
      }

      const pdfBytes = await generateLearningLibraryPDF(procedureData);
      downloadPDF(pdfBytes, 'heart-clinic-procedures.pdf');
      
      // Show success message
      showToast('PDF generated successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Error generating PDF. Please try again.');
    }
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
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

        {/* Contextual PDF Selection Helper */}
        {selectedProcedures.size > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-4 border border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedProcedures.size} procedure{selectedProcedures.size !== 1 ? 's' : ''} selected
                  </div>
                  <span className="text-secondary-600 text-sm">
                    Ready to generate your personalized PDF guide
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Starter Packs Quick Add */}
                  <div className="flex space-x-1">
                    {starterPacks.slice(0, 2).map((pack) => (
                      <button
                        key={pack.id}
                        onClick={() => {
                          pack.procedureIds.forEach(id => addProcedure(id));
                        }}
                        className="px-2 py-1 text-xs bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-md transition-colors duration-200"
                        title={`Add ${pack.name}`}
                      >
                        +{pack.procedureIds.length} {pack.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

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
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Blurred background image */}
                          {generalProcedure[1].image && (
                            <div 
                              className="absolute inset-0 rounded-2xl"
                              style={{
                                backgroundImage: `url(${generalProcedure[1].image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                imageRendering: '-webkit-optimize-contrast',
                                filter: 'blur(2px)'
                              }}
                            />
                          )}
                          
                          {/* Backdrop filter overlay */}
                          <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                            selectedProcedure === 'general'
                              ? `bg-gradient-to-r ${generalProcedure[1].color} opacity-80`
                              : 'bg-white/70 hover:bg-white/80'
                          }`} style={{
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)'
                          }} />
                          
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
                        Tests
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedProcedures.test.map(([key, procedure]) => (
                          <motion.button
                            key={key}
                            onClick={() => handleProcedureClick(key)}
                            className={`relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-500 transform hover:-translate-y-2 border group hover:shadow-2xl hover:shadow-primary-500/20 ${
                              selectedProcedure === key
                                ? 'shadow-2xl scale-105 border-transparent ring-2 ring-primary-300 ring-opacity-50 shadow-primary-500/30' 
                                : 'shadow-sm hover:shadow-2xl border-secondary-200 hover:border-primary-300 hover:scale-102'
                            }`}
                            whileHover={{ 
                              y: -6, 
                              scale: 1.03,
                              transition: { 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 25 
                              }
                            }}
                            whileTap={{ 
                              scale: 0.97,
                              transition: { 
                                type: "spring", 
                                stiffness: 600, 
                                damping: 30 
                              }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              delay: groupedProcedures.test.findIndex(([k]) => k === key) * 0.1,
                              duration: 0.6,
                              ease: "easeOut"
                            }}
                          >
                            {/* Blurred background image */}
                            {procedure.image && (
                              <div 
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                  backgroundImage: `url(${procedure.image})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  imageRendering: '-webkit-optimize-contrast',
                                  filter: 'blur(2px)'
                                }}
                              />
                            )}
                            
                            {/* Backdrop filter overlay */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                              selectedProcedure === key
                                ? `bg-gradient-to-r ${procedure.color} opacity-80`
                                : 'bg-white/70 hover:bg-white/80'
                            }`} style={{
                              backdropFilter: 'blur(4px)',
                              WebkitBackdropFilter: 'blur(4px)'
                            }} />
                            
                            {/* Add to PDF button with text and icon */}
                            <button
                              onClick={(e) => handleAddToPdf(key, e)}
                              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-primary-600 px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center space-x-1 text-sm font-medium hover:shadow-lg hover:scale-105"
                              title="Add to PDF Guide"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Add to PDF</span>
                            </button>
                            
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
                        Procedures
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedProcedures.procedure.map(([key, procedure]) => (
                          <motion.button
                            key={key}
                            onClick={() => handleProcedureClick(key)}
                            className={`relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-500 transform hover:-translate-y-2 border group hover:shadow-2xl hover:shadow-primary-500/20 ${
                              selectedProcedure === key
                                ? 'shadow-2xl scale-105 border-transparent ring-2 ring-primary-300 ring-opacity-50 shadow-primary-500/30' 
                                : 'shadow-sm hover:shadow-2xl border-secondary-200 hover:border-primary-300 hover:scale-102'
                            }`}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Blurred background image */}
                            {procedure.image && (
                              <div 
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                  backgroundImage: `url(${procedure.image})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  imageRendering: '-webkit-optimize-contrast',
                                  filter: 'blur(2px)'
                                }}
                              />
                            )}
                            
                            {/* Backdrop filter overlay */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                              selectedProcedure === key
                                ? `bg-gradient-to-r ${procedure.color} opacity-80`
                                : 'bg-white/70 hover:bg-white/80'
                            }`} style={{
                              backdropFilter: 'blur(4px)',
                              WebkitBackdropFilter: 'blur(4px)'
                            }} />
                            
                            {/* Add to PDF button with text and icon */}
                            <button
                              onClick={(e) => handleAddToPdf(key, e)}
                              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-primary-600 px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center space-x-1 text-sm font-medium hover:shadow-lg hover:scale-105"
                              title="Add to PDF Guide"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Add to PDF</span>
                            </button>
                            
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
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button
                        onClick={(e) => handleAddToPdf(selectedProcedure, e)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <FileText className="w-5 h-5" />
                        <span>Add to PDF Guide</span>
                      </button>
                      
                      <button
                        onClick={(e) => handleDownloadClick(selectedProcedure, e)}
                        className="bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download & View Related</span>
                      </button>
                      
                      {selectedProcedures.has(selectedProcedure) && (
                        <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Added to PDF Guide</span>
                        </div>
                      )}
                    </div>
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
                              {step.icon()}
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
                  
                  {/* Related Procedures Section */}
                  {selectedProcedure && relatedCards[selectedProcedure] && (
                    <div className="mt-12 bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
                      <h4 className="text-xl font-bold text-secondary-800 mb-6 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-primary-600" />
                        You might also be interested in:
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {relatedCards[selectedProcedure].slice(0, 3).map((relatedId) => {
                          const procedure = procedureJourneys[relatedId];
                          if (!procedure) return null;
                          
                          return (
                            <div
                              key={relatedId}
                              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-102 border border-gray-100"
                            >
                              <h5 className="font-semibold text-gray-800 mb-2 text-sm">{procedure.name}</h5>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{procedure.description}</p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedProcedure(relatedId)}
                                  className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                                >
                                  Learn More
                                </button>
                                <button
                                  onClick={(e) => handleAddToPdf(relatedId, e)}
                                  className="bg-primary-50 hover:bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs font-medium transition-colors"
                                >
                                  Add to PDF
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Floating Action Button for detailed view */}
                  <div className="fixed bottom-20 right-6 z-30">
                    <button
                      onClick={(e) => handleDownloadClick(selectedProcedure, e)}
                      className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 hover:scale-110"
                      title="Download and see related procedures"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
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
                      <motion.a 
                        href="#request-appointment"
                        className="border border-slate-600 text-white px-8 py-4 rounded-2xl font-medium text-lg hover:bg-slate-700/50 inline-block text-center"
                        whileHover={{ 
                          scale: 1.02
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Request An Appointment
                      </motion.a>
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
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-secondary-200/50 hover:shadow-xl hover:shadow-primary-500/20 transition-all duration-500 cursor-pointer group hover:border-primary-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -6,
                      scale: 1.02,
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25 
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
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

      {/* Floating Bottom Bar - PDF Cart */}
      {selectedProcedures.size > 0 && (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-40 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-gray-800">
                PDF Guide ({selectedProcedures.size} procedure{selectedProcedures.size !== 1 ? 's' : ''})
              </span>
            </div>
            <div className="flex items-center space-x-2 max-w-md overflow-x-auto">
              {Array.from(selectedProcedures).slice(0, 3).map((procedureId) => (
                <div
                  key={procedureId}
                  className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-1"
                >
                  <span>{procedureJourneys[procedureId]?.name || procedureId}</span>
                  <button
                    onClick={() => removeProcedure(procedureId)}
                    className="ml-1 hover:text-primary-900"
                  >
                    ×
                  </button>
                </div>
              ))}
              {selectedProcedures.size > 3 && (
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  +{selectedProcedures.size - 3} more
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearSelection}
              className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm"
            >
              Clear All
            </button>
            <button
              onClick={handleGeneratePdf}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Generate PDF</span>
            </button>
          </div>
        </div>
      </motion.div>
    )}

    {/* Related Cards Modal */}
    {showRelatedCards && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleCloseRelatedCards}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Download Options
              </h3>
              <button
                onClick={handleCloseRelatedCards}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Original Procedure Download Option */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border-2 border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-primary-800 mb-1">
                    {procedureJourneys[showRelatedCards]?.name}
                  </h4>
                  <p className="text-sm text-primary-700">
                    Download this procedure guide only
                  </p>
                </div>
                <button
                  onClick={async () => {
                    const procedure = procedureJourneys[showRelatedCards];
                    if (procedure) {
                      try {
                        const procedureData = [{
                          name: procedure.name,
                          description: procedure.description,
                          summary: procedure.summary,
                          needToKnow: procedure.needToKnow,
                          steps: procedure.steps,
                          image: (procedure as any)?.image
                        }];
                        const pdfBytes = await generateLearningLibraryPDF(procedureData);
                        downloadPDF(pdfBytes, `${procedure.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-guide.pdf`);
                        showToast('PDF downloaded successfully!');
                        handleCloseRelatedCards();
                      } catch (error) {
                        console.error('Error generating PDF:', error);
                        showToast('Error generating PDF. Please try again.');
                      }
                    }
                  }}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Now</span>
                </button>
              </div>
            </div>
            
            {/* Divider */}
            <div className="mb-6">
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-3 text-sm text-gray-500 bg-white">Or add related procedures</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              You might also want to learn about:
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              {relatedCards[showRelatedCards]?.map((relatedId) => {
                const procedure = procedureJourneys[relatedId];
                if (!procedure) return null;
                
                return (
                  <div
                    key={relatedId}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{procedure.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{procedure.description}</p>
                    <button
                      onClick={() => handleAddRelatedCard(relatedId)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add to PDF
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </div>
  );
};

export default LearningLibrary;