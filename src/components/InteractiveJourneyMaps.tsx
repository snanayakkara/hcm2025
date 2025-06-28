import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Stethoscope, 
  Activity, 
  Heart, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Download, 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Phone, 
  Mail,
  Printer,
  BookOpen,
  HelpCircle,
  Star,
  ArrowRight,
  Users,
  Shield,
  Zap
} from 'lucide-react';

interface JourneyStage {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  steps: JourneyStep[];
  keyPoints: string[];
  professionals: string[];
  resources: Resource[];
}

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  preparation?: string[];
  whatToExpect?: string[];
  afterCare?: string[];
  tips?: string[];
}

interface Resource {
  type: 'video' | 'checklist' | 'guide' | 'faq';
  title: string;
  description: string;
  url?: string;
  downloadable?: boolean;
}

interface ProcedureJourney {
  id: string;
  name: string;
  category: string;
  overview: string;
  totalDuration: string;
  complexity: 'Low' | 'Medium' | 'High';
  stages: JourneyStage[];
  faqs: FAQ[];
  emergencyContacts: EmergencyContact[];
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface EmergencyContact {
  type: string;
  name: string;
  phone: string;
  hours: string;
}

const InteractiveJourneyMaps: React.FC = () => {
  const [selectedProcedure, setSelectedProcedure] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showProgress, setShowProgress] = useState(false);
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

  const procedureJourneys: ProcedureJourney[] = [
    {
      id: 'cardiac-consultation',
      name: 'Cardiac Consultation',
      category: 'Consultation',
      overview: 'A comprehensive cardiac consultation is your first step towards understanding and managing your heart health. Our experienced cardiologists will review your medical history, perform a thorough examination, and discuss your symptoms and concerns.',
      totalDuration: '2-3 weeks',
      complexity: 'Low',
      stages: [
        {
          id: 'initial-consultation',
          title: 'Initial Consultation & Diagnosis',
          duration: '1-2 days',
          description: 'Schedule your appointment and prepare for your first consultation with our cardiologist.',
          icon: <Calendar className="w-6 h-6" />,
          color: 'from-blue-500 to-blue-600',
          steps: [
            {
              id: 'booking',
              title: 'Appointment Booking',
              description: 'Contact our reception team to schedule your consultation.',
              duration: '5-10 minutes',
              preparation: [
                'Have your referral letter ready',
                'Prepare your Medicare and insurance details',
                'List your current medications',
                'Note your symptoms and concerns'
              ],
              tips: [
                'Book during business hours for faster service',
                'Ask about bulk billing eligibility',
                'Request your preferred location'
              ]
            },
            {
              id: 'pre-visit-prep',
              title: 'Pre-Visit Preparation',
              description: 'Complete necessary forms and gather required documents.',
              duration: '30-45 minutes',
              preparation: [
                'Complete patient registration forms',
                'Gather previous test results',
                'Prepare list of questions',
                'Arrange transportation'
              ],
              tips: [
                'Arrive 15 minutes early',
                'Bring a support person if needed',
                'Wear comfortable clothing'
              ]
            }
          ],
          keyPoints: [
            'Referral from GP required',
            'Medicare rebates available',
            'Multiple locations available',
            'Professional reception support'
          ],
          professionals: ['Reception Team', 'Cardiologist'],
          resources: [
            {
              type: 'checklist',
              title: 'Pre-Consultation Checklist',
              description: 'Everything you need to bring to your appointment',
              downloadable: true
            },
            {
              type: 'guide',
              title: 'What to Expect Guide',
              description: 'Detailed overview of your consultation process',
              downloadable: true
            }
          ]
        },
        {
          id: 'consultation',
          title: 'Medical Consultation',
          duration: '45-60 minutes',
          description: 'Comprehensive evaluation by our qualified cardiologists with personalized assessment.',
          icon: <Stethoscope className="w-6 h-6" />,
          color: 'from-emerald-500 to-emerald-600',
          steps: [
            {
              id: 'history-review',
              title: 'Medical History Review',
              description: 'Detailed discussion of your medical background and current symptoms.',
              duration: '15-20 minutes',
              whatToExpected: [
                'Review of current medications',
                'Discussion of family history',
                'Symptom assessment',
                'Risk factor evaluation'
              ]
            },
            {
              id: 'physical-exam',
              title: 'Physical Examination',
              description: 'Comprehensive cardiovascular examination.',
              duration: '15-20 minutes',
              whatToExpected: [
                'Heart and lung examination',
                'Blood pressure measurement',
                'Pulse assessment',
                'General physical evaluation'
              ]
            },
            {
              id: 'discussion',
              title: 'Results Discussion',
              description: 'Clear explanation of findings and next steps.',
              duration: '15-20 minutes',
              whatToExpected: [
                'Explanation of findings',
                'Treatment recommendations',
                'Lifestyle advice',
                'Follow-up planning'
              ]
            }
          ],
          keyPoints: [
            'Comprehensive medical assessment',
            'Clear explanations provided',
            'Personalized treatment planning',
            'Immediate results discussion'
          ],
          professionals: ['Cardiologist', 'Nurse'],
          resources: [
            {
              type: 'video',
              title: 'What Happens During Your Consultation',
              description: 'Video walkthrough of the consultation process'
            }
          ]
        },
        {
          id: 'testing',
          title: 'Diagnostic Testing',
          duration: '1-7 days',
          description: 'Additional tests may be recommended based on your consultation findings.',
          icon: <Activity className="w-6 h-6" />,
          color: 'from-purple-500 to-purple-600',
          steps: [
            {
              id: 'test-scheduling',
              title: 'Test Scheduling',
              description: 'Schedule any recommended diagnostic tests.',
              duration: '5-10 minutes',
              preparation: [
                'Confirm test requirements',
                'Schedule at convenient time',
                'Arrange transportation if needed'
              ]
            },
            {
              id: 'test-completion',
              title: 'Test Completion',
              description: 'Complete recommended diagnostic tests.',
              duration: 'Varies by test',
              whatToExpected: [
                'Professional test administration',
                'Comfortable environment',
                'Clear instructions provided',
                'Results available promptly'
              ]
            }
          ],
          keyPoints: [
            'Tests based on individual needs',
            'Same-day results when possible',
            'Professional test administration',
            'Clear preparation instructions'
          ],
          professionals: ['Cardiac Technician', 'Cardiologist'],
          resources: [
            {
              type: 'guide',
              title: 'Diagnostic Tests Explained',
              description: 'Comprehensive guide to cardiac diagnostic tests'
            }
          ]
        },
        {
          id: 'follow-up',
          title: 'Follow-up & Recovery',
          duration: 'Ongoing',
          description: 'Ongoing care and monitoring based on your individual needs.',
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'from-green-500 to-green-600',
          steps: [
            {
              id: 'results-review',
              title: 'Results Review',
              description: 'Review test results and finalize treatment plan.',
              duration: '30-45 minutes',
              whatToExpected: [
                'Detailed results explanation',
                'Treatment plan discussion',
                'Medication review',
                'Lifestyle recommendations'
              ]
            },
            {
              id: 'ongoing-care',
              title: 'Ongoing Care',
              description: 'Regular monitoring and follow-up as needed.',
              duration: 'As required',
              afterCare: [
                'Follow medication instructions',
                'Attend scheduled follow-ups',
                'Monitor symptoms',
                'Contact clinic with concerns'
              ]
            }
          ],
          keyPoints: [
            'Personalized treatment plans',
            'Regular monitoring available',
            'Emergency support access',
            'Patient education provided'
          ],
          professionals: ['Cardiologist', 'Reception Team'],
          resources: [
            {
              type: 'guide',
              title: 'Living with Heart Conditions',
              description: 'Comprehensive lifestyle and management guide'
            }
          ]
        }
      ],
      faqs: [
        {
          question: 'How long will my consultation take?',
          answer: 'Initial consultations typically take 45-60 minutes. This allows time for a thorough review of your medical history, physical examination, and discussion of findings.',
          category: 'consultation'
        },
        {
          question: 'What should I bring to my appointment?',
          answer: 'Please bring your referral letter, Medicare card, private health insurance details, current medications list, and any previous cardiac test results.',
          category: 'preparation'
        },
        {
          question: 'Will I need additional tests?',
          answer: 'Additional tests may be recommended based on your consultation findings. Common tests include ECG, echocardiogram, or stress testing.',
          category: 'testing'
        }
      ],
      emergencyContacts: [
        {
          type: 'Emergency',
          name: 'Emergency Services',
          phone: '000',
          hours: '24/7'
        },
        {
          type: 'Clinic',
          name: 'Heart Clinic Melbourne',
          phone: '(03) 9509 5009',
          hours: 'Mon-Fri 8:30am-5:00pm'
        }
      ]
    },
    {
      id: 'echocardiography',
      name: 'Echocardiography',
      category: 'Imaging',
      overview: 'Echocardiography uses ultrasound waves to create detailed images of your heart. This non-invasive test allows us to assess heart function, valve performance, and detect structural abnormalities.',
      totalDuration: '1-2 weeks',
      complexity: 'Low',
      stages: [
        {
          id: 'preparation',
          title: 'Pre-Test Preparation',
          duration: '1-3 days',
          description: 'Prepare for your echocardiogram with simple preparation steps.',
          icon: <FileText className="w-6 h-6" />,
          color: 'from-blue-500 to-blue-600',
          steps: [
            {
              id: 'scheduling',
              title: 'Test Scheduling',
              description: 'Schedule your echocardiogram at a convenient time.',
              duration: '5-10 minutes',
              preparation: [
                'Choose preferred location',
                'Select convenient time slot',
                'Confirm contact details',
                'Note any special requirements'
              ]
            },
            {
              id: 'pre-test-prep',
              title: 'Pre-Test Instructions',
              description: 'Follow simple preparation guidelines.',
              duration: 'Day before test',
              preparation: [
                'Wear comfortable, loose-fitting clothing',
                'Continue regular medications',
                'Eat normally unless stress echo',
                'Arrive 15 minutes early'
              ]
            }
          ],
          keyPoints: [
            'No special preparation required',
            'Comfortable clothing recommended',
            'Continue normal activities',
            'Multiple locations available'
          ],
          professionals: ['Reception Team', 'Cardiac Technician'],
          resources: [
            {
              type: 'guide',
              title: 'Echocardiogram Preparation Guide',
              description: 'Simple steps to prepare for your test'
            }
          ]
        },
        {
          id: 'procedure',
          title: 'The Echocardiogram',
          duration: '30-45 minutes',
          description: 'Non-invasive ultrasound imaging of your heart.',
          icon: <Activity className="w-6 h-6" />,
          color: 'from-emerald-500 to-emerald-600',
          steps: [
            {
              id: 'setup',
              title: 'Test Setup',
              description: 'Preparation for the ultrasound examination.',
              duration: '5-10 minutes',
              whatToExpected: [
                'Change into hospital gown',
                'Lie on examination table',
                'Electrodes placed on chest',
                'Ultrasound gel applied'
              ]
            },
            {
              id: 'imaging',
              title: 'Heart Imaging',
              description: 'Detailed ultrasound imaging of heart structures.',
              duration: '20-30 minutes',
              whatToExpected: [
                'Ultrasound probe moved across chest',
                'Different views captured',
                'May need to change positions',
                'Real-time heart images displayed'
              ]
            },
            {
              id: 'completion',
              title: 'Test Completion',
              description: 'Final review and cleanup.',
              duration: '5 minutes',
              whatToExpected: [
                'Gel cleaned from chest',
                'Electrodes removed',
                'Initial findings discussed',
                'Discharge instructions provided'
              ]
            }
          ],
          keyPoints: [
            'Completely non-invasive',
            'No radiation exposure',
            'Real-time heart visualization',
            'Immediate preliminary results'
          ],
          professionals: ['Cardiac Sonographer', 'Cardiologist'],
          resources: [
            {
              type: 'video',
              title: 'Echocardiogram Procedure Video',
              description: 'See what happens during your test'
            }
          ]
        },
        {
          id: 'results',
          title: 'Results & Follow-up',
          duration: '1-7 days',
          description: 'Review results and plan next steps.',
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'from-green-500 to-green-600',
          steps: [
            {
              id: 'analysis',
              title: 'Image Analysis',
              description: 'Detailed analysis of echocardiogram images.',
              duration: '1-2 days',
              whatToExpected: [
                'Cardiologist reviews images',
                'Measurements calculated',
                'Function assessed',
                'Report prepared'
              ]
            },
            {
              id: 'results-discussion',
              title: 'Results Discussion',
              description: 'Review findings with your cardiologist.',
              duration: '15-30 minutes',
              whatToExpected: [
                'Clear explanation of findings',
                'Normal vs abnormal results',
                'Treatment recommendations',
                'Follow-up planning'
              ]
            }
          ],
          keyPoints: [
            'Results available within days',
            'Clear explanations provided',
            'Treatment planning if needed',
            'Follow-up scheduled as required'
          ],
          professionals: ['Cardiologist'],
          resources: [
            {
              type: 'guide',
              title: 'Understanding Your Echo Results',
              description: 'Guide to interpreting echocardiogram findings'
            }
          ]
        }
      ],
      faqs: [
        {
          question: 'Is an echocardiogram painful?',
          answer: 'No, echocardiograms are completely painless. You may feel slight pressure from the ultrasound probe, but there is no discomfort.',
          category: 'procedure'
        },
        {
          question: 'How should I prepare for the test?',
          answer: 'Wear comfortable, loose-fitting clothing. You can eat normally and continue your regular medications unless specifically instructed otherwise.',
          category: 'preparation'
        },
        {
          question: 'When will I get my results?',
          answer: 'Preliminary results are often available immediately. The full report is typically ready within 1-2 days and will be discussed with you.',
          category: 'results'
        }
      ],
      emergencyContacts: [
        {
          type: 'Emergency',
          name: 'Emergency Services',
          phone: '000',
          hours: '24/7'
        },
        {
          type: 'Clinic',
          name: 'Heart Clinic Melbourne',
          phone: '(03) 9509 5009',
          hours: 'Mon-Fri 8:30am-5:00pm'
        }
      ]
    },
    {
      id: 'coronary-angiography',
      name: 'Coronary Angiography',
      category: 'Interventional',
      overview: 'Coronary angiography is a specialized X-ray procedure that uses contrast dye to visualize the coronary arteries. This gold-standard test can detect blockages and assess the need for intervention.',
      totalDuration: '1-2 weeks',
      complexity: 'High',
      stages: [
        {
          id: 'pre-procedure',
          title: 'Pre-Procedure Assessment',
          duration: '3-7 days',
          description: 'Comprehensive preparation and assessment before your procedure.',
          icon: <FileText className="w-6 h-6" />,
          color: 'from-blue-500 to-blue-600',
          steps: [
            {
              id: 'consultation',
              title: 'Pre-Procedure Consultation',
              description: 'Detailed discussion about the procedure and preparation.',
              duration: '30-45 minutes',
              whatToExpected: [
                'Procedure explanation',
                'Risk assessment',
                'Consent process',
                'Preparation instructions'
              ]
            },
            {
              id: 'pre-tests',
              title: 'Pre-Procedure Tests',
              description: 'Required tests before the procedure.',
              duration: '1-2 hours',
              preparation: [
                'Blood tests',
                'ECG',
                'Chest X-ray',
                'Kidney function assessment'
              ]
            },
            {
              id: 'preparation',
              title: 'Final Preparation',
              description: 'Last-minute preparation steps.',
              duration: 'Day before',
              preparation: [
                'Fast for 6 hours before procedure',
                'Arrange transport home',
                'Continue heart medications',
                'Shower with antibacterial soap'
              ]
            }
          ],
          keyPoints: [
            'Comprehensive pre-assessment',
            'Detailed consent process',
            'Fasting required',
            'Transport arrangements needed'
          ],
          professionals: ['Cardiologist', 'Nurse', 'Anesthetist'],
          resources: [
            {
              type: 'guide',
              title: 'Angiography Preparation Guide',
              description: 'Complete preparation instructions'
            },
            {
              type: 'video',
              title: 'What is Coronary Angiography?',
              description: 'Educational video about the procedure'
            }
          ]
        },
        {
          id: 'procedure-day',
          title: 'Procedure Day',
          duration: '4-6 hours',
          description: 'The angiography procedure and immediate recovery.',
          icon: <Heart className="w-6 h-6" />,
          color: 'from-red-500 to-red-600',
          steps: [
            {
              id: 'admission',
              title: 'Hospital Admission',
              description: 'Arrival and preparation for the procedure.',
              duration: '1-2 hours',
              whatToExpected: [
                'Registration and paperwork',
                'Change into hospital gown',
                'IV line insertion',
                'Final checks and consent'
              ]
            },
            {
              id: 'procedure',
              title: 'Angiography Procedure',
              description: 'The actual coronary angiography.',
              duration: '30-60 minutes',
              whatToExpected: [
                'Local anesthetic at insertion site',
                'Catheter insertion through wrist or groin',
                'Contrast dye injection',
                'Real-time X-ray imaging',
                'Possible intervention if needed'
              ]
            },
            {
              id: 'recovery',
              title: 'Immediate Recovery',
              description: 'Recovery and monitoring after the procedure.',
              duration: '2-4 hours',
              afterCare: [
                'Pressure applied to insertion site',
                'Bed rest as directed',
                'Regular monitoring',
                'Gradual mobilization'
              ]
            }
          ],
          keyPoints: [
            'Minimally invasive procedure',
            'Real-time visualization',
            'Immediate results available',
            'Professional monitoring throughout'
          ],
          professionals: ['Interventional Cardiologist', 'Cardiac Technician', 'Nurse'],
          resources: [
            {
              type: 'video',
              title: 'Angiography Procedure Walkthrough',
              description: 'Step-by-step procedure video'
            }
          ]
        },
        {
          id: 'recovery',
          title: 'Recovery & Follow-up',
          duration: '1-2 weeks',
          description: 'Recovery period and ongoing care planning.',
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'from-green-500 to-green-600',
          steps: [
            {
              id: 'discharge',
              title: 'Hospital Discharge',
              description: 'Preparation for going home.',
              duration: '1-2 hours',
              afterCare: [
                'Discharge instructions provided',
                'Medication review',
                'Follow-up appointments scheduled',
                'Emergency contact information'
              ]
            },
            {
              id: 'home-recovery',
              title: 'Home Recovery',
              description: 'Recovery at home with specific guidelines.',
              duration: '3-7 days',
              afterCare: [
                'Rest for 24-48 hours',
                'Avoid heavy lifting',
                'Monitor insertion site',
                'Take medications as prescribed'
              ]
            },
            {
              id: 'follow-up',
              title: 'Follow-up Care',
              description: 'Ongoing monitoring and treatment planning.',
              duration: 'Ongoing',
              afterCare: [
                'Follow-up appointment',
                'Results discussion',
                'Treatment planning',
                'Lifestyle counseling'
              ]
            }
          ],
          keyPoints: [
            'Detailed discharge instructions',
            'Gradual return to activities',
            'Regular follow-up monitoring',
            'Comprehensive treatment planning'
          ],
          professionals: ['Cardiologist', 'Nurse', 'Discharge Coordinator'],
          resources: [
            {
              type: 'guide',
              title: 'Post-Angiography Recovery Guide',
              description: 'Complete recovery instructions'
            },
            {
              type: 'checklist',
              title: 'Recovery Checklist',
              description: 'Daily recovery milestones'
            }
          ]
        }
      ],
      faqs: [
        {
          question: 'Is coronary angiography safe?',
          answer: 'Coronary angiography is generally very safe. Serious complications are rare (less than 1%). Your cardiologist will discuss all risks with you before the procedure.',
          category: 'safety'
        },
        {
          question: 'Will I be awake during the procedure?',
          answer: 'Yes, you will be awake but may receive mild sedation to help you relax. Local anesthetic is used at the insertion site.',
          category: 'procedure'
        },
        {
          question: 'When can I return to normal activities?',
          answer: 'Most people can return to normal activities within 3-7 days. Avoid heavy lifting for the first week. Your doctor will provide specific guidelines.',
          category: 'recovery'
        }
      ],
      emergencyContacts: [
        {
          type: 'Emergency',
          name: 'Emergency Services',
          phone: '000',
          hours: '24/7'
        },
        {
          type: 'Hospital',
          name: 'Cabrini Hospital',
          phone: '(03) 9508 1222',
          hours: '24/7'
        }
      ]
    }
  ];

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const calculateProgress = () => {
    const currentProcedure = procedureJourneys[selectedProcedure];
    const totalSteps = currentProcedure.stages.reduce((acc, stage) => acc + stage.steps.length, 0);
    const completedCount = completedSteps.length;
    return Math.round((completedCount / totalSteps) * 100);
  };

  const downloadResource = (resource: Resource) => {
    // Simulate download
    alert(`Downloading: ${resource.title}`);
  };

  const printJourney = () => {
    window.print();
  };

  return (
    <section id="journey-maps" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Interactive Patient Journey Maps
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Step-by-step guides for each medical procedure, from initial consultation to full recovery. Navigate at your own pace and track your progress.
          </p>
        </motion.div>

        {/* Procedure Selection */}
        <motion.div 
          className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {procedureJourneys.map((procedure, index) => (
              <motion.button
                key={procedure.id}
                onClick={() => {
                  setSelectedProcedure(index);
                  setActiveStage(0);
                  setActiveStep(0);
                }}
                className={`p-6 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedProcedure === index
                    ? 'bg-blue-600 text-white shadow-xl scale-105' 
                    : 'bg-white text-gray-900 shadow-lg hover:shadow-xl border border-gray-100'
                }`}
                whileHover={{ scale: selectedProcedure === index ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedProcedure === index 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {procedure.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      procedure.complexity === 'Low' ? 'bg-green-100 text-green-600' :
                      procedure.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    } ${selectedProcedure === index ? 'bg-white/20 text-white' : ''}`}>
                      {procedure.complexity}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{procedure.name}</h3>
                    <p className={`text-sm ${
                      selectedProcedure === index ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {procedure.overview.substring(0, 120)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className={`w-4 h-4 ${
                        selectedProcedure === index ? 'text-blue-200' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        selectedProcedure === index ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {procedure.totalDuration}
                      </span>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${
                      selectedProcedure === index ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Selected Procedure Journey */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProcedure}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Journey Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h3 className="text-3xl font-bold mb-2">
                    {procedureJourneys[selectedProcedure].name}
                  </h3>
                  <p className="text-blue-100 text-lg">
                    {procedureJourneys[selectedProcedure].overview}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowProgress(!showProgress)}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    <span>Track Progress</span>
                  </button>
                  <button
                    onClick={printJourney}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Guide</span>
                  </button>
                </div>
              </div>

              {/* Progress Tracker */}
              <AnimatePresence>
                {showProgress && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-white/10 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Journey Progress</span>
                      <span className="text-sm">{calculateProgress()}% Complete</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateProgress()}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {procedureJourneys[selectedProcedure].stages.map((stage, index) => (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setActiveStage(index);
                      setActiveStep(0);
                    }}
                    className={`flex-shrink-0 px-6 py-4 border-b-2 transition-all duration-200 ${
                      activeStage === index
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeStage === index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {stage.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{stage.title}</div>
                        <div className="text-sm opacity-75">{stage.duration}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stage Overview */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${procedureJourneys[selectedProcedure].stages[activeStage].color} text-white`}>
                        {procedureJourneys[selectedProcedure].stages[activeStage].icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">
                          {procedureJourneys[selectedProcedure].stages[activeStage].title}
                        </h4>
                        <p className="text-gray-600">
                          {procedureJourneys[selectedProcedure].stages[activeStage].description}
                        </p>
                      </div>
                    </div>

                    {/* Key Points */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Key Points</span>
                        </h5>
                        <ul className="space-y-2">
                          {procedureJourneys[selectedProcedure].stages[activeStage].keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                              <span className="text-sm text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                          <Users className="w-5 h-5 text-blue-500" />
                          <span>Healthcare Team</span>
                        </h5>
                        <ul className="space-y-2">
                          {procedureJourneys[selectedProcedure].stages[activeStage].professionals.map((professional, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                              <span className="text-sm text-gray-700">{professional}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-6">
                    <h5 className="text-xl font-bold text-gray-900 mb-4">Detailed Steps</h5>
                    
                    {procedureJourneys[selectedProcedure].stages[activeStage].steps.map((step, stepIndex) => (
                      <motion.div
                        key={step.id}
                        className={`border rounded-xl p-6 transition-all duration-300 ${
                          activeStep === stepIndex 
                            ? 'border-blue-300 bg-blue-50 shadow-md' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <button
                              onClick={() => toggleStepCompletion(step.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                completedSteps.includes(step.id)
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {completedSteps.includes(step.id) && (
                                <CheckCircle className="w-4 h-4" />
                              )}
                            </button>
                            <div className="flex-1">
                              <h6 className="text-lg font-semibold text-gray-900 mb-2">
                                {step.title}
                              </h6>
                              <p className="text-gray-600 mb-3">{step.description}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>Duration: {step.duration}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveStep(activeStep === stepIndex ? -1 : stepIndex)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${
                              activeStep === stepIndex ? 'rotate-90' : ''
                            }`} />
                          </button>
                        </div>

                        {/* Expanded Step Content */}
                        <AnimatePresence>
                          {activeStep === stepIndex && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-gray-200 pt-4 mt-4"
                            >
                              <div className="grid md:grid-cols-3 gap-6">
                                {step.preparation && (
                                  <div>
                                    <h7 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                      <AlertCircle className="w-4 h-4 text-orange-500" />
                                      <span>Preparation</span>
                                    </h7>
                                    <ul className="space-y-1">
                                      {step.preparation.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                                          <div className="w-1 h-1 bg-orange-500 rounded-full mt-2"></div>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {step.whatToExpected && (
                                  <div>
                                    <h7 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                      <Info className="w-4 h-4 text-blue-500" />
                                      <span>What to Expect</span>
                                    </h7>
                                    <ul className="space-y-1">
                                      {step.whatToExpected.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {step.afterCare && (
                                  <div>
                                    <h7 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                      <Heart className="w-4 h-4 text-red-500" />
                                      <span>After Care</span>
                                    </h7>
                                    <ul className="space-y-1">
                                      {step.afterCare.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                                          <div className="w-1 h-1 bg-red-500 rounded-full mt-2"></div>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {step.tips && (
                                  <div className="md:col-span-3">
                                    <h7 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                      <Star className="w-4 h-4 text-yellow-500" />
                                      <span>Helpful Tips</span>
                                    </h7>
                                    <ul className="grid md:grid-cols-2 gap-2">
                                      {step.tips.map((tip, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                                          <div className="w-1 h-1 bg-yellow-500 rounded-full mt-2"></div>
                                          <span>{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  {/* Resources */}
                  {procedureJourneys[selectedProcedure].stages[activeStage].resources.length > 0 && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                      <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span>Additional Resources</span>
                      </h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        {procedureJourneys[selectedProcedure].stages[activeStage].resources.map((resource, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                {resource.type === 'video' && <Play className="w-4 h-4 text-blue-600" />}
                                {resource.type === 'checklist' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                                {resource.type === 'guide' && <FileText className="w-4 h-4 text-blue-600" />}
                                {resource.type === 'faq' && <HelpCircle className="w-4 h-4 text-blue-600" />}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{resource.title}</div>
                                <div className="text-sm text-gray-600">{resource.description}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => downloadResource(resource)}
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                            >
                              <Download className="w-4 h-4" />
                              <span>Get</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
                  disabled={activeStage === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Stage</span>
                </button>
                
                <button
                  onClick={() => setActiveStage(Math.min(procedureJourneys[selectedProcedure].stages.length - 1, activeStage + 1))}
                  disabled={activeStage === procedureJourneys[selectedProcedure].stages.length - 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* FAQ Section */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </h4>
          
          <div className="space-y-4">
            {procedureJourneys[selectedProcedure].faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    expandedFAQ === index ? 'rotate-90' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 p-4 bg-gray-50"
                    >
                      <p className="text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div 
          className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-bold text-red-900 mb-4 flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Emergency Contacts</span>
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            {procedureJourneys[selectedProcedure].emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                <div>
                  <div className="font-medium text-gray-900">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.type} • {contact.hours}</div>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveJourneyMaps;