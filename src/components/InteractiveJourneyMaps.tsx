import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Clock, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Phone, 
  Calendar, 
  Stethoscope, 
  Zap, 
  Home, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Download,
  Play,
  Users,
  MapPin,
  Shield,
  Lightbulb,
  Target,
  TrendingUp
} from 'lucide-react';

interface JourneyStage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ReactNode;
  description: string;
  touchpoints: string[];
  providers: string[];
  documentation: string[];
  emotions: string[];
  decisions: string[];
  complications: string[];
  resources: string[];
  variations?: {
    emergency?: string[];
    elective?: string[];
    highRisk?: string[];
    lowRisk?: string[];
  };
}

interface ProcedureJourney {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stages: JourneyStage[];
}

const InteractiveJourneyMaps: React.FC = () => {
  const [selectedProcedure, setSelectedProcedure] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['touchpoints']);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [filterType, setFilterType] = useState<'all' | 'emergency' | 'elective'>('all');
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

  const procedures: ProcedureJourney[] = [
    {
      id: 'tavi',
      name: 'TAVI',
      fullName: 'Transcatheter Aortic Valve Implantation',
      description: 'Minimally invasive procedure to replace a diseased aortic valve without open-heart surgery',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-rose-500 to-pink-600',
      stages: [
        {
          id: 'symptoms-diagnosis',
          title: 'Initial Symptoms & Diagnosis',
          subtitle: 'Recognition and assessment of aortic stenosis',
          duration: '2-4 weeks',
          icon: <Stethoscope className="w-5 h-5" />,
          description: 'Patient presents with symptoms of aortic stenosis. Initial assessment and diagnostic workup to confirm valve disease severity.',
          touchpoints: [
            'GP consultation for symptoms (breathlessness, chest pain, fatigue)',
            'Referral to cardiologist',
            'Initial cardiac consultation',
            'Echocardiogram appointment',
            'Results discussion'
          ],
          providers: [
            'General Practitioner',
            'Cardiologist',
            'Cardiac sonographer',
            'Reception team',
            'Nursing staff'
          ],
          documentation: [
            'GP referral letter',
            'Medical history questionnaire',
            'Echocardiogram report',
            'Initial consultation notes',
            'Symptom assessment forms'
          ],
          emotions: [
            'Concern about symptoms',
            'Anxiety about heart condition',
            'Relief at getting answers',
            'Uncertainty about treatment',
            'Hope for improvement'
          ],
          decisions: [
            'Whether to seek medical attention',
            'Choice of cardiologist',
            'Timing of appointments',
            'Disclosure of symptoms severity',
            'Family involvement in care'
          ],
          complications: [
            'Delayed symptom recognition',
            'Waiting times for appointments',
            'Inconclusive initial tests',
            'Patient anxiety affecting assessment',
            'Comorbidity complications'
          ],
          resources: [
            'Heart Foundation information',
            'Aortic stenosis patient guides',
            'Symptom tracking tools',
            'Family support resources',
            'Transport assistance'
          ],
          variations: {
            emergency: [
              'Emergency department presentation',
              'Urgent cardiology referral',
              'Immediate echocardiogram',
              'Expedited consultation'
            ],
            elective: [
              'Routine GP screening',
              'Planned specialist referral',
              'Standard appointment scheduling',
              'Comprehensive assessment'
            ]
          }
        },
        {
          id: 'pre-procedure-assessment',
          title: 'Pre-Procedure Assessment',
          subtitle: 'Comprehensive evaluation for TAVI suitability',
          duration: '3-6 weeks',
          icon: <FileText className="w-5 h-5" />,
          description: 'Detailed assessment to determine TAVI candidacy, including cardiac catheterization, CT scanning, and multidisciplinary team review.',
          touchpoints: [
            'TAVI clinic consultation',
            'Cardiac catheterization',
            'CT coronary angiogram',
            'Pulmonary function tests',
            'Multidisciplinary team meeting',
            'Pre-procedure education session'
          ],
          providers: [
            'TAVI cardiologist',
            'Cardiac surgeon',
            'Anesthetist',
            'Cardiac catheter lab team',
            'CT technologist',
            'TAVI coordinator'
          ],
          documentation: [
            'TAVI assessment forms',
            'Catheterization report',
            'CT scan results',
            'Risk assessment scores',
            'MDT meeting notes',
            'Consent forms'
          ],
          emotions: [
            'Anxiety about invasive tests',
            'Hope for treatment option',
            'Overwhelmed by information',
            'Confidence in medical team',
            'Anticipation for procedure'
          ],
          decisions: [
            'Consent to invasive testing',
            'TAVI vs surgical valve replacement',
            'Timing of procedure',
            'Anesthesia preferences',
            'Family involvement'
          ],
          complications: [
            'Contrast allergy reactions',
            'Kidney function concerns',
            'Unsuitable anatomy discovered',
            'High surgical risk factors',
            'Patient anxiety affecting tests'
          ],
          resources: [
            'TAVI patient education videos',
            'Pre-procedure checklists',
            'Family information sessions',
            'Support group contacts',
            'Financial counseling'
          ],
          variations: {
            highRisk: [
              'Extended assessment period',
              'Additional specialist consultations',
              'Enhanced monitoring protocols',
              'Family conference meetings'
            ],
            lowRisk: [
              'Streamlined assessment',
              'Outpatient testing',
              'Shorter evaluation period',
              'Standard protocols'
            ]
          }
        },
        {
          id: 'procedure-preparation',
          title: 'Procedure Preparation',
          subtitle: 'Final preparations and admission',
          duration: '1-2 days',
          icon: <Calendar className="w-5 h-5" />,
          description: 'Hospital admission, final preparations, and immediate pre-procedure care including fasting, medication adjustments, and team briefing.',
          touchpoints: [
            'Hospital admission',
            'Pre-procedure nursing assessment',
            'Anesthesia consultation',
            'Final consent process',
            'Family briefing session',
            'Procedure preparation'
          ],
          providers: [
            'Admissions staff',
            'Ward nurses',
            'Anesthetist',
            'TAVI team',
            'Social worker',
            'Chaplain (if requested)'
          ],
          documentation: [
            'Admission paperwork',
            'Nursing assessment',
            'Anesthesia notes',
            'Final consent forms',
            'Procedure checklist',
            'Emergency contact details'
          ],
          emotions: [
            'Pre-procedure anxiety',
            'Excitement for treatment',
            'Concern for family',
            'Trust in medical team',
            'Anticipation of recovery'
          ],
          decisions: [
            'Final consent confirmation',
            'Anesthesia type preference',
            'Family presence during waiting',
            'Post-procedure care preferences',
            'Advanced directive discussions'
          ],
          complications: [
            'Last-minute health changes',
            'Medication interactions',
            'Family anxiety',
            'Procedure delays',
            'Equipment issues'
          ],
          resources: [
            'Hospital orientation materials',
            'Family waiting area information',
            'Spiritual care services',
            'Patient comfort items',
            'Communication tools'
          ]
        },
        {
          id: 'tavi-procedure',
          title: 'TAVI Procedure',
          subtitle: 'Transcatheter valve implantation',
          duration: '2-4 hours',
          icon: <Heart className="w-5 h-5" />,
          description: 'The TAVI procedure performed in cardiac catheterization laboratory with conscious sedation or general anesthesia.',
          touchpoints: [
            'Transfer to catheter lab',
            'Anesthesia administration',
            'Vascular access establishment',
            'Valve positioning and deployment',
            'Post-procedure assessment',
            'Transfer to recovery'
          ],
          providers: [
            'Interventional cardiologist',
            'Cardiac surgeon',
            'Anesthetist',
            'Catheter lab nurses',
            'Perfusionist',
            'Radiographer'
          ],
          documentation: [
            'Procedure report',
            'Anesthesia record',
            'Valve specifications',
            'Imaging studies',
            'Complication notes',
            'Recovery assessment'
          ],
          emotions: [
            'Unconscious during procedure',
            'Family anxiety in waiting',
            'Relief when procedure complete',
            'Gratitude to medical team',
            'Anticipation of results'
          ],
          decisions: [
            'Intra-procedure adjustments',
            'Valve size selection',
            'Additional interventions',
            'Anesthesia modifications',
            'Emergency protocols if needed'
          ],
          complications: [
            'Vascular access complications',
            'Valve malposition',
            'Conduction system disturbance',
            'Bleeding complications',
            'Stroke risk'
          ],
          resources: [
            'Real-time family updates',
            'Procedure explanation materials',
            'Waiting room support',
            'Chaplain services',
            'Communication systems'
          ]
        },
        {
          id: 'hospital-recovery',
          title: 'Hospital Recovery',
          subtitle: 'Immediate post-procedure monitoring',
          duration: '2-5 days',
          icon: <Activity className="w-5 h-5" />,
          description: 'Post-procedure monitoring in cardiac care unit, gradual mobilization, and preparation for discharge.',
          touchpoints: [
            'Cardiac care unit monitoring',
            'Daily medical rounds',
            'Physiotherapy sessions',
            'Echocardiogram assessment',
            'Medication education',
            'Discharge planning'
          ],
          providers: [
            'Cardiac care nurses',
            'Cardiologist',
            'Physiotherapist',
            'Pharmacist',
            'Discharge coordinator',
            'Dietitian'
          ],
          documentation: [
            'Monitoring charts',
            'Daily progress notes',
            'Echo reports',
            'Medication lists',
            'Discharge summary',
            'Follow-up appointments'
          ],
          emotions: [
            'Relief procedure is over',
            'Gratitude for improvement',
            'Anxiety about going home',
            'Excitement about recovery',
            'Appreciation for care'
          ],
          decisions: [
            'Pain management preferences',
            'Activity level progression',
            'Medication compliance',
            'Discharge timing',
            'Home support arrangements'
          ],
          complications: [
            'Bleeding at access site',
            'Heart rhythm disturbances',
            'Infection risk',
            'Mobility challenges',
            'Medication side effects'
          ],
          resources: [
            'Recovery milestone guides',
            'Family education materials',
            'Medication information',
            'Activity guidelines',
            'Emergency contact numbers'
          ]
        },
        {
          id: 'discharge-process',
          title: 'Discharge Process',
          subtitle: 'Transition to home care',
          duration: '1 day',
          icon: <Home className="w-5 h-5" />,
          description: 'Comprehensive discharge planning with medication reconciliation, activity instructions, and follow-up scheduling.',
          touchpoints: [
            'Discharge medication review',
            'Activity instruction session',
            'Follow-up appointment scheduling',
            'Emergency contact provision',
            'Transportation arrangement',
            'Home care coordination'
          ],
          providers: [
            'Discharge nurse',
            'Pharmacist',
            'Cardiologist',
            'Social worker',
            'Transport coordinator',
            'Home care nurse'
          ],
          documentation: [
            'Discharge summary',
            'Medication list',
            'Activity restrictions',
            'Follow-up schedule',
            'Emergency instructions',
            'GP communication'
          ],
          emotions: [
            'Excitement to go home',
            'Anxiety about self-care',
            'Gratitude for treatment',
            'Confidence in recovery',
            'Relief from hospital'
          ],
          decisions: [
            'Home vs rehabilitation facility',
            'Family support arrangements',
            'Medication management',
            'Activity level choices',
            'Follow-up compliance'
          ],
          complications: [
            'Transportation difficulties',
            'Medication confusion',
            'Home safety concerns',
            'Family support gaps',
            'Communication breakdowns'
          ],
          resources: [
            'Discharge checklist',
            'Medication organizers',
            'Activity tracking tools',
            'Emergency contact cards',
            'Home care services'
          ]
        },
        {
          id: 'follow-up-care',
          title: 'Follow-up Care',
          subtitle: 'Short-term monitoring and assessment',
          duration: '6 months',
          icon: <CheckCircle className="w-5 h-5" />,
          description: 'Regular follow-up appointments to monitor valve function, symptom improvement, and medication optimization.',
          touchpoints: [
            '1-week phone call',
            '1-month clinic visit',
            '3-month echocardiogram',
            '6-month comprehensive review',
            'GP coordination',
            'Cardiac rehabilitation'
          ],
          providers: [
            'TAVI coordinator',
            'Cardiologist',
            'Cardiac sonographer',
            'General practitioner',
            'Rehabilitation team',
            'Pharmacist'
          ],
          documentation: [
            'Follow-up visit notes',
            'Echo reports',
            'Symptom assessments',
            'Medication adjustments',
            'Quality of life scores',
            'GP correspondence'
          ],
          emotions: [
            'Confidence in recovery',
            'Satisfaction with results',
            'Reduced anxiety',
            'Improved quality of life',
            'Gratitude for care'
          ],
          decisions: [
            'Activity level increases',
            'Medication adjustments',
            'Return to work timing',
            'Travel considerations',
            'Lifestyle modifications'
          ],
          complications: [
            'Valve dysfunction',
            'Medication side effects',
            'Infection concerns',
            'Activity limitations',
            'Psychological adjustment'
          ],
          resources: [
            'Recovery tracking apps',
            'Support group information',
            'Exercise programs',
            'Nutritional guidance',
            'Travel advice'
          ]
        },
        {
          id: 'long-term-monitoring',
          title: 'Long-term Monitoring',
          subtitle: 'Lifelong valve surveillance',
          duration: 'Lifelong',
          icon: <TrendingUp className="w-5 h-5" />,
          description: 'Annual monitoring of valve function, cardiovascular health, and overall wellbeing with preventive care strategies.',
          touchpoints: [
            'Annual cardiology visits',
            'Yearly echocardiograms',
            'GP coordination',
            'Preventive care screening',
            'Emergency consultation access',
            'Patient education updates'
          ],
          providers: [
            'Cardiologist',
            'General practitioner',
            'Cardiac sonographer',
            'Preventive care team',
            'Emergency services',
            'Specialist nurses'
          ],
          documentation: [
            'Annual assessment reports',
            'Echo surveillance',
            'Risk factor monitoring',
            'Medication reviews',
            'Health maintenance records',
            'Emergency action plans'
          ],
          emotions: [
            'Confidence in long-term health',
            'Appreciation for life quality',
            'Routine acceptance',
            'Proactive health attitude',
            'Peace of mind'
          ],
          decisions: [
            'Frequency of monitoring',
            'Lifestyle choices',
            'Preventive interventions',
            'Emergency preparedness',
            'Health insurance decisions'
          ],
          complications: [
            'Valve deterioration',
            'New cardiac conditions',
            'Age-related changes',
            'Medication interactions',
            'Access to care issues'
          ],
          resources: [
            'Long-term care guides',
            'Healthy aging programs',
            'Emergency medical alerts',
            'Insurance navigation',
            'Community support networks'
          ]
        }
      ]
    },
    {
      id: 'pacemaker',
      name: 'Pacemaker',
      fullName: 'Permanent Pacemaker Implantation',
      description: 'Surgical implantation of a device to regulate heart rhythm in patients with bradycardia or heart block',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600',
      stages: [
        {
          id: 'symptoms-diagnosis',
          title: 'Initial Symptoms & Diagnosis',
          subtitle: 'Recognition of bradycardia or heart block',
          duration: '1-3 weeks',
          icon: <Stethoscope className="w-5 h-5" />,
          description: 'Patient presents with symptoms of slow heart rate or heart block. Initial assessment and diagnostic workup to confirm indication for pacing.',
          touchpoints: [
            'GP consultation for symptoms (dizziness, fatigue, syncope)',
            'Emergency department visit (if syncope)',
            'Cardiology referral',
            'ECG and Holter monitoring',
            'Electrophysiology consultation'
          ],
          providers: [
            'General Practitioner',
            'Emergency physician',
            'Cardiologist',
            'Electrophysiologist',
            'ECG technician'
          ],
          documentation: [
            'GP referral letter',
            'ECG recordings',
            'Holter monitor report',
            'Symptom diary',
            'Emergency department notes'
          ],
          emotions: [
            'Fear from fainting episodes',
            'Concern about heart condition',
            'Relief at diagnosis',
            'Anxiety about treatment',
            'Hope for symptom relief'
          ],
          decisions: [
            'When to seek emergency care',
            'Choice of cardiologist',
            'Timing of diagnostic tests',
            'Activity restrictions',
            'Family notification'
          ],
          complications: [
            'Recurrent syncope',
            'Delayed diagnosis',
            'Emergency presentations',
            'Medication interactions',
            'Driving restrictions'
          ],
          resources: [
            'Heart rhythm disorder guides',
            'Syncope safety information',
            'Activity modification guides',
            'Emergency action plans',
            'Family education materials'
          ],
          variations: {
            emergency: [
              'Emergency department presentation',
              'Urgent cardiology consultation',
              'Immediate ECG monitoring',
              'Temporary pacing consideration'
            ],
            elective: [
              'Routine symptom evaluation',
              'Planned diagnostic workup',
              'Standard referral process',
              'Comprehensive assessment'
            ]
          }
        },
        {
          id: 'pre-procedure-assessment',
          title: 'Pre-Procedure Assessment',
          subtitle: 'Comprehensive evaluation for pacemaker indication',
          duration: '1-2 weeks',
          icon: <FileText className="w-5 h-5" />,
          description: 'Detailed assessment to confirm pacemaker indication, device selection, and pre-operative preparation.',
          touchpoints: [
            'Electrophysiology consultation',
            'Pre-operative assessment',
            'Device selection discussion',
            'Anesthesia consultation',
            'Pre-procedure education',
            'Consent process'
          ],
          providers: [
            'Electrophysiologist',
            'Anesthetist',
            'Pre-operative nurse',
            'Device specialist',
            'Pacemaker coordinator',
            'Social worker'
          ],
          documentation: [
            'EP consultation notes',
            'Pre-operative checklist',
            'Device selection rationale',
            'Anesthesia assessment',
            'Informed consent',
            'Insurance authorization'
          ],
          emotions: [
            'Anxiety about surgery',
            'Relief about treatment',
            'Concern about device',
            'Trust in medical team',
            'Anticipation of improvement'
          ],
          decisions: [
            'Single vs dual chamber device',
            'Timing of implantation',
            'Anesthesia preferences',
            'Post-procedure care location',
            'Family involvement'
          ],
          complications: [
            'Anticoagulation management',
            'Infection risk assessment',
            'Anatomical considerations',
            'Device compatibility issues',
            'Patient anxiety'
          ],
          resources: [
            'Pacemaker patient guides',
            'Device information videos',
            'Pre-procedure checklists',
            'Family education sessions',
            'Support group contacts'
          ]
        },
        {
          id: 'procedure-preparation',
          title: 'Procedure Preparation',
          subtitle: 'Day of surgery preparation',
          duration: '4-6 hours',
          icon: <Calendar className="w-5 h-5" />,
          description: 'Day of surgery preparation including admission, pre-operative care, and immediate procedure preparation.',
          touchpoints: [
            'Hospital admission',
            'Pre-operative nursing care',
            'IV line insertion',
            'Antibiotic administration',
            'Final consent confirmation',
            'Transfer to procedure room'
          ],
          providers: [
            'Admissions staff',
            'Pre-operative nurses',
            'Anesthetist',
            'EP team',
            'Operating room staff',
            'Transport team'
          ],
          documentation: [
            'Admission notes',
            'Pre-operative checklist',
            'Medication administration',
            'Vital signs monitoring',
            'Final consent',
            'Procedure preparation'
          ],
          emotions: [
            'Pre-procedure nervousness',
            'Confidence in team',
            'Anticipation of relief',
            'Family concern',
            'Readiness for treatment'
          ],
          decisions: [
            'Final procedure consent',
            'Sedation level preference',
            'Family waiting arrangements',
            'Post-procedure preferences',
            'Pain management choices'
          ],
          complications: [
            'Last-minute health changes',
            'Medication allergies',
            'Procedure delays',
            'Equipment issues',
            'Patient anxiety'
          ],
          resources: [
            'Day surgery information',
            'Family waiting guidelines',
            'Comfort measures',
            'Communication updates',
            'Spiritual care access'
          ]
        },
        {
          id: 'pacemaker-implantation',
          title: 'Pacemaker Implantation',
          subtitle: 'Device implantation procedure',
          duration: '1-2 hours',
          icon: <Zap className="w-5 h-5" />,
          description: 'Pacemaker implantation performed under local anesthesia with conscious sedation in electrophysiology laboratory.',
          touchpoints: [
            'Local anesthesia administration',
            'Pocket creation',
            'Lead placement',
            'Device connection and testing',
            'Pocket closure',
            'Post-procedure monitoring'
          ],
          providers: [
            'Electrophysiologist',
            'EP nurse',
            'Device technician',
            'Anesthetist',
            'Radiographer',
            'Scrub nurse'
          ],
          documentation: [
            'Procedure report',
            'Device parameters',
            'Lead measurements',
            'X-ray confirmation',
            'Complication notes',
            'Recovery assessment'
          ],
          emotions: [
            'Conscious but relaxed',
            'Curiosity about procedure',
            'Relief when complete',
            'Gratitude to team',
            'Anticipation of results'
          ],
          decisions: [
            'Lead positioning adjustments',
            'Device programming',
            'Additional testing',
            'Sedation modifications',
            'Procedure completion'
          ],
          complications: [
            'Lead displacement',
            'Pneumothorax',
            'Bleeding complications',
            'Infection risk',
            'Device malfunction'
          ],
          resources: [
            'Real-time family updates',
            'Procedure explanation',
            'Waiting room support',
            'Communication systems',
            'Comfort measures'
          ]
        },
        {
          id: 'hospital-recovery',
          title: 'Hospital Recovery',
          subtitle: 'Post-implantation monitoring',
          duration: '1-2 days',
          icon: <Activity className="w-5 h-5" />,
          description: 'Post-procedure monitoring, device interrogation, and preparation for discharge with activity restrictions.',
          touchpoints: [
            'Post-procedure monitoring',
            'Device interrogation',
            'Chest X-ray',
            'Wound care education',
            'Activity instruction',
            'Discharge planning'
          ],
          providers: [
            'Ward nurses',
            'Electrophysiologist',
            'Device technician',
            'Physiotherapist',
            'Discharge coordinator',
            'Pharmacist'
          ],
          documentation: [
            'Monitoring records',
            'Device interrogation report',
            'X-ray results',
            'Wound assessment',
            'Discharge instructions',
            'Follow-up schedule'
          ],
          emotions: [
            'Relief procedure successful',
            'Amazement at immediate effect',
            'Anxiety about device',
            'Eagerness to go home',
            'Gratitude for improvement'
          ],
          decisions: [
            'Pain management',
            'Activity level',
            'Discharge timing',
            'Home support needs',
            'Follow-up preferences'
          ],
          complications: [
            'Pocket hematoma',
            'Lead displacement',
            'Infection signs',
            'Device malfunction',
            'Patient anxiety'
          ],
          resources: [
            'Recovery guidelines',
            'Wound care instructions',
            'Activity restrictions',
            'Device information',
            'Emergency contacts'
          ]
        },
        {
          id: 'discharge-process',
          title: 'Discharge Process',
          subtitle: 'Transition to home with device',
          duration: '1 day',
          icon: <Home className="w-5 h-5" />,
          description: 'Comprehensive discharge education including device care, activity restrictions, and emergency procedures.',
          touchpoints: [
            'Device education session',
            'Wound care instruction',
            'Activity restriction review',
            'Emergency procedure education',
            'Follow-up scheduling',
            'Device card provision'
          ],
          providers: [
            'Device nurse educator',
            'Discharge nurse',
            'Electrophysiologist',
            'Social worker',
            'Transport coordinator',
            'Home care nurse'
          ],
          documentation: [
            'Discharge summary',
            'Device information card',
            'Activity restrictions',
            'Wound care instructions',
            'Emergency procedures',
            'Follow-up appointments'
          ],
          emotions: [
            'Excitement about going home',
            'Confidence in device',
            'Anxiety about self-care',
            'Relief from symptoms',
            'Appreciation for care'
          ],
          decisions: [
            'Home vs extended care',
            'Activity modifications',
            'Family support arrangements',
            'Return to work timing',
            'Device monitoring compliance'
          ],
          complications: [
            'Understanding device limitations',
            'Wound care concerns',
            'Activity restriction compliance',
            'Emergency recognition',
            'Follow-up scheduling'
          ],
          resources: [
            'Device patient manual',
            'Activity guidelines',
            'Emergency action cards',
            'Support group information',
            'Home care services'
          ]
        },
        {
          id: 'follow-up-care',
          title: 'Follow-up Care',
          subtitle: 'Device monitoring and optimization',
          duration: '6 months',
          icon: <CheckCircle className="w-5 h-5" />,
          description: 'Regular device checks, wound healing assessment, and activity progression with device optimization.',
          touchpoints: [
            '1-week wound check',
            '6-week device check',
            '3-month optimization',
            '6-month comprehensive review',
            'Remote monitoring setup',
            'Activity progression'
          ],
          providers: [
            'Device clinic nurse',
            'Electrophysiologist',
            'Device technician',
            'General practitioner',
            'Physiotherapist',
            'Remote monitoring team'
          ],
          documentation: [
            'Device interrogation reports',
            'Wound healing notes',
            'Activity progression',
            'Symptom assessments',
            'Device optimization',
            'Remote monitoring data'
          ],
          emotions: [
            'Confidence in device function',
            'Relief from symptoms',
            'Adaptation to device',
            'Improved quality of life',
            'Routine acceptance'
          ],
          decisions: [
            'Activity level increases',
            'Device setting adjustments',
            'Remote monitoring participation',
            'Return to normal activities',
            'Long-term care planning'
          ],
          complications: [
            'Wound healing issues',
            'Device malfunction',
            'Lead problems',
            'Infection concerns',
            'Psychological adjustment'
          ],
          resources: [
            'Device monitoring apps',
            'Activity tracking tools',
            'Support groups',
            'Educational materials',
            'Emergency procedures'
          ]
        },
        {
          id: 'long-term-monitoring',
          title: 'Long-term Monitoring',
          subtitle: 'Lifelong device management',
          duration: 'Lifelong',
          icon: <TrendingUp className="w-5 h-5" />,
          description: 'Regular device monitoring, battery replacement planning, and ongoing cardiovascular care coordination.',
          touchpoints: [
            'Quarterly device checks',
            'Annual comprehensive review',
            'Remote monitoring alerts',
            'Battery replacement planning',
            'Lead surveillance',
            'Cardiovascular risk management'
          ],
          providers: [
            'Device clinic team',
            'Electrophysiologist',
            'Cardiologist',
            'General practitioner',
            'Remote monitoring center',
            'Emergency services'
          ],
          documentation: [
            'Device surveillance reports',
            'Battery status monitoring',
            'Lead function assessment',
            'Cardiovascular risk factors',
            'Replacement planning',
            'Emergency protocols'
          ],
          emotions: [
            'Confidence in long-term care',
            'Routine device acceptance',
            'Proactive health management',
            'Peace of mind',
            'Gratitude for technology'
          ],
          decisions: [
            'Monitoring frequency',
            'Device upgrade timing',
            'Lifestyle modifications',
            'Emergency preparedness',
            'Healthcare coordination'
          ],
          complications: [
            'Battery depletion',
            'Lead fracture or displacement',
            'Device recalls',
            'Infection risks',
            'Technology updates'
          ],
          resources: [
            'Long-term care guides',
            'Device technology updates',
            'Emergency medical alerts',
            'Insurance navigation',
            'Patient advocacy groups'
          ]
        }
      ]
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const currentProcedure = procedures[selectedProcedure];
  const currentStage = currentProcedure.stages[activeStage];

  const sectionIcons = {
    touchpoints: <User className="w-4 h-4" />,
    providers: <Users className="w-4 h-4" />,
    documentation: <FileText className="w-4 h-4" />,
    emotions: <Heart className="w-4 h-4" />,
    decisions: <Target className="w-4 h-4" />,
    complications: <AlertTriangle className="w-4 h-4" />,
    resources: <Lightbulb className="w-4 h-4" />
  };

  return (
    <section id="journey-maps" className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50 shadow-sm mb-6">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-slate-600 font-medium">Interactive Patient Journey Maps</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 tracking-tight leading-tight">
            Detailed Procedure
            <span className="block text-blue-600">
              Pathways
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
            Comprehensive journey maps for TAVI and Pacemaker procedures, from initial symptoms through long-term follow-up care
          </p>
        </motion.div>

        {/* Procedure Selection */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/50 shadow-sm">
            <div className="flex space-x-2">
              {procedures.map((procedure, index) => (
                <motion.button
                  key={procedure.id}
                  onClick={() => {
                    setSelectedProcedure(index);
                    setActiveStage(0);
                  }}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    selectedProcedure === index
                      ? `bg-gradient-to-r ${procedure.color} text-white shadow-lg`
                      : 'text-slate-600 hover:bg-slate-100/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={selectedProcedure === index ? 'text-white' : 'text-slate-600'}>
                    {procedure.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{procedure.name}</div>
                    <div className={`text-sm ${selectedProcedure === index ? 'text-white/80' : 'text-slate-500'}`}>
                      {procedure.fullName}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-slate-200/50 shadow-sm">
            <div className="flex space-x-1">
              {['overview', 'detailed'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as 'overview' | 'detailed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === mode
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100/80'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              {currentProcedure.fullName} Journey Timeline
            </h3>
            
            {/* Timeline Navigation */}
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200"></div>
              <div 
                className={`absolute top-6 left-0 h-0.5 bg-gradient-to-r ${currentProcedure.color} transition-all duration-500`}
                style={{ width: `${((activeStage + 1) / currentProcedure.stages.length) * 100}%` }}
              ></div>
              
              <div className="relative flex justify-between">
                {currentProcedure.stages.map((stage, index) => (
                  <motion.button
                    key={stage.id}
                    onClick={() => setActiveStage(index)}
                    className={`flex flex-col items-center space-y-3 transition-all duration-300 ${
                      index <= activeStage ? 'opacity-100' : 'opacity-60'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      index === activeStage
                        ? `bg-gradient-to-r ${currentProcedure.color} border-transparent text-white shadow-lg`
                        : index < activeStage
                        ? 'bg-slate-800 border-slate-800 text-white'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {stage.icon}
                    </div>
                    <div className="text-center max-w-24">
                      <div className={`text-xs font-medium ${
                        index <= activeStage ? 'text-slate-800' : 'text-slate-400'
                      }`}>
                        {stage.title}
                      </div>
                      <div className={`text-xs ${
                        index <= activeStage ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {stage.duration}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentProcedure.id}-${activeStage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            
            {/* Stage Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-sm sticky top-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentProcedure.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <div className="text-white text-xl">
                        {currentStage.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{currentStage.title}</h3>
                    <p className="text-slate-500 font-medium">{currentStage.subtitle}</p>
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{currentStage.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed">{currentStage.description}</p>
                  
                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Stage Guide</span>
                    </button>
                    <button className="w-full border border-slate-300 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Watch Video Guide</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Patient Touchpoints */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('touchpoints')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      {sectionIcons.touchpoints}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Patient Touchpoints</h4>
                      <p className="text-sm text-slate-500">Key interactions and appointments</p>
                    </div>
                  </div>
                  {expandedSections.includes('touchpoints') ? 
                    <ChevronUp className="w-5 h-5 text-slate-400" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes('touchpoints') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentStage.touchpoints.map((touchpoint, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-slate-700">{touchpoint}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Healthcare Providers */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('providers')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      {sectionIcons.providers}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Healthcare Providers</h4>
                      <p className="text-sm text-slate-500">Medical team members involved</p>
                    </div>
                  </div>
                  {expandedSections.includes('providers') ? 
                    <ChevronUp className="w-5 h-5 text-slate-400" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes('providers') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentStage.providers.map((provider, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-slate-700">{provider}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Patient Emotions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('emotions')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-rose-100 p-2 rounded-lg">
                      {sectionIcons.emotions}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Patient Emotions</h4>
                      <p className="text-sm text-slate-500">Common feelings and concerns</p>
                    </div>
                  </div>
                  {expandedSections.includes('emotions') ? 
                    <ChevronUp className="w-5 h-5 text-slate-400" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes('emotions') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentStage.emotions.map((emotion, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <span className="text-sm text-slate-700">{emotion}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Critical Decisions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('decisions')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      {sectionIcons.decisions}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Critical Decisions</h4>
                      <p className="text-sm text-slate-500">Key decision points</p>
                    </div>
                  </div>
                  {expandedSections.includes('decisions') ? 
                    <ChevronUp className="w-5 h-5 text-slate-400" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes('decisions') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentStage.decisions.map((decision, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm text-slate-700">{decision}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Potential Complications */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('complications')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      {sectionIcons.complications}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Potential Complications</h4>
                      <p className="text-sm text-slate-500">Possible delays or issues</p>
                    </div>
                  </div>
                  {expandedSections.includes('complications') ? 
                    <ChevronUp className="w-5 h-5 text-slate-400" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes('complications') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentStage.complications.map((complication, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-slate-700">{complication}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Support Resources */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('resources')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      {sectionIcons.resources}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Support Resources</h4>
                      <p className="text-sm text-slate-500">Available help and information</p>
                    </div>
                  </div>
                  {expandedSections.includes('resources') ? 
                    <ChevronUp className="w-5 h-5 text-slate-400" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes('resources') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentStage.resources.map((resource, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm text-slate-700">{resource}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Procedure Variations */}
              {currentStage.variations && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm p-6">
                  <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span>Procedure Variations</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(currentStage.variations).map(([type, variations]) => (
                      <div key={type} className="space-y-3">
                        <h5 className="font-medium text-slate-700 capitalize">
                          {type === 'highRisk' ? 'High Risk' : type === 'lowRisk' ? 'Low Risk' : type} Cases
                        </h5>
                        <div className="space-y-2">
                          {variations.map((variation, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                              <span className="text-sm text-slate-600">{variation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
            disabled={activeStage === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeStage === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous Stage</span>
          </button>

          <div className="text-center">
            <div className="text-sm text-slate-500">
              Stage {activeStage + 1} of {currentProcedure.stages.length}
            </div>
            <div className="text-lg font-semibold text-slate-800">
              {currentStage.title}
            </div>
          </div>

          <button
            onClick={() => setActiveStage(Math.min(currentProcedure.stages.length - 1, activeStage + 1))}
            disabled={activeStage === currentProcedure.stages.length - 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeStage === currentProcedure.stages.length - 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : `bg-gradient-to-r ${currentProcedure.color} text-white shadow-sm hover:shadow-lg`
            }`}
          >
            <span>Next Stage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-slate-200/50 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Our team is here to guide you through every step of your cardiac care journey. Contact us to schedule your consultation and begin your path to better heart health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-slate-800 text-white px-8 py-4 rounded-xl hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold">
              <Phone className="w-5 h-5" />
              <span>Call (03) 9509 5009</span>
            </button>
            <button className="border-2 border-slate-300 text-slate-600 px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 font-semibold">
              Download Complete Journey Guide
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveJourneyMaps;