import React from "react";
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
  Zap,
} from "lucide-react";

export interface ProcedureStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: () => React.ReactNode;
  duration: string;
  details: string[];
}

export interface ProcedureJourney {
  name: string;
  description: string;
  color: string;
  category: string;
  type: string;
  image: string;
  summary: string;
  needToKnow: string[];
  /**
   * Optional longform, patientfriendly explainer in Markdown.
   * Shown when the “Want more detail?” toggle is opened.
   */
  details?: string;
  steps: ProcedureStep[];
}

export type ProcedureJourneys = Record<string, ProcedureJourney>;

export const procedureJourneys: ProcedureJourneys = {
  general: {
    name: "General Patient Journey",
    description: "Overview of the standard patient care process",
    color: "from-primary-500 to-accent-500",
    category: "consultation",
    type: "procedure",
    image: "/images/consult.png",
    summary:
      "A comprehensive cardiac consultation and diagnostic process designed to assess your heart health and develop a personalized treatment plan.",
    needToKnow: [
      "Consultation typically takes 20-40 minutes",
      "Bring Medicare card, referral letter, and medication list",
      "May include ECG, echocardiogram, or other tests",
      "Results and treatment plan discussed same day",
      "Follow-up appointments scheduled as needed",
    ],
    steps: [
      {
        id: 1,
        title: "Initial Contact",
        subtitle: "Professional consultation begins",
        description:
          "Contact our medical reception team for appointment scheduling and initial consultation guidance.",
        icon: () => React.createElement(Phone, { className: "w-5 h-5" }),
        duration: "5 minutes",
        details: [
          "Professional reception service",
          "Flexible appointment scheduling",
          "Insurance verification assistance",
          "Immediate appointment confirmation",
        ],
      },
      {
        id: 2,
        title: "Pre-Visit Preparation",
        subtitle: "Comprehensive preparation support",
        description:
          "Receive detailed preparation instructions and complete necessary documentation for your consultation.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "1-2 days",
        details: [
          "Detailed preparation guidelines",
          "Digital patient forms",
          "Clear facility directions",
          "Consultation expectations overview",
        ],
      },
      {
        id: 3,
        title: "Medical Consultation",
        subtitle: "Expert cardiovascular assessment",
        description:
          "Comprehensive evaluation by our qualified cardiologists with personalized treatment planning.",
        icon: () => React.createElement(Stethoscope, { className: "w-5 h-5" }),
        duration: "20-40 minutes",
        details: [
          "Comprehensive medical history review",
          "Thorough cardiovascular examination",
          "Risk factor assessment",
          "Clear medical explanations",
        ],
      },
      {
        id: 4,
        title: "Diagnostic Testing",
        subtitle: "Advanced cardiac diagnostics",
        description:
          "State-of-the-art diagnostic testing to provide comprehensive insights into cardiovascular function.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "30-90 minutes",
        details: [
          "Electrocardiogram monitoring",
          "Echocardiography imaging",
          "Exercise stress testing",
          "Same-day results discussion",
        ],
      },
      {
        id: 5,
        title: "Treatment Planning",
        subtitle: "Personalized medical care",
        description:
          "Evidence-based treatment recommendations tailored to your specific cardiovascular health needs.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "Ongoing",
        details: [
          "Evidence-based treatment recommendations",
          "Lifestyle modification guidance",
          "Medication management protocols",
          "Follow-up care scheduling",
        ],
      },
      {
        id: 6,
        title: "Continuing Care",
        subtitle: "Long-term health partnership",
        description:
          "Ongoing cardiovascular monitoring and support for optimal long-term heart health outcomes.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Regular health monitoring",
          "Preventive care strategies",
          "Emergency consultation access",
          "Patient education resources",
        ],
      },
    ],
  },
  tavi: {
    name: "TAVI (Transcatheter Aortic Valve Implantation)",
    description: "Minimally invasive aortic valve replacement procedure",
    color: "from-accent-500 to-primary-500",
    category: "interventional",
    type: "procedure",
    image: "/images/tavi.png",
    summary:
      "A minimally invasive procedure to replace a diseased aortic valve using a catheter, typically through the groin artery, avoiding the need for open heart surgery.",
    needToKnow: [
      "Procedure takes 1-2 hours under local anaesthesia and sedation",
      "Usually requires 2-4 day hospital stay",
      "Pre-procedure CT scan and tests required",
      "Recovery is faster than surgical valve replacement",
      "Regular follow-up appointments essential",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Assessment",
        subtitle: "Comprehensive evaluation and planning",
        description:
          "Detailed cardiac imaging and multidisciplinary team evaluation to determine TAVI suitability.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "CT angiography for valve sizing and assess blood vessels",
          "Comprehensive echocardiography",
          "Heart team consultation",
          "Risk assessment and planning",
        ],
      },
      {
        id: 2,
        title: "Day of Procedure",
        subtitle: "Minimally invasive valve replacement",
        description:
          "TAVI procedure performed via small catheter insertion, typically through the groin artery.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Local anaesthetic with sedation",
          "Catheter-based valve delivery",
          "Real-time X-ray guidance",
          "Immediate function assessment",
        ],
      },
      {
        id: 3,
        title: "Post-Procedure Care",
        subtitle: "Recovery and monitoring",
        description:
          "Careful monitoring and gradual mobilization following successful valve implantation.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "2-4 days",
        details: [
          "Cardiac monitoring and observation, particular for risk of needing a pacemaker",
          "Gradual activity progression",
          "Medication optimisation",
          "Discharge planning and education",
        ],
      },
      {
        id: 4,
        title: "Long-term Follow-up",
        subtitle: "Ongoing valve function monitoring",
        description:
          "Regular assessment to ensure optimal valve function and long-term heart health.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Regular echocardiographic monitoring",
          "Clinical assessment at intervals",
          "Medication management",
          "Lifestyle optimisation guidance",
        ],
      },
    ],
  },
  toe_dcr: {
    name: "TOE-Guided Cardioversion",
    description:
      "Electrical cardioversion with advanced cardiac imaging guidance",
    color: "from-sage-500 to-accent-500",
    category: "procedures",
    type: "procedure",
    image: "/images/toe.png",
    summary:
      "A procedure combining advanced cardiac imaging with electrical cardioversion to safely restore normal heart rhythm in patients with atrial fibrillation.",
    needToKnow: [
      "Day procedure with light sedation",
      "Fast for 6 hours before procedure",
      "Blood thinners mandatory for four weeks prior",
      "TOE imaging ensures safety before cardioversion",
      "Transport home required after procedure",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Preparation",
        subtitle: "Assessment and anticoagulation",
        description:
          "Comprehensive evaluation including anticoagulation management and procedure planning.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "2-4 weeks",
        details: [
          "Anticoagulation therapy optimisation",
          "Pre-procedure echocardiography",
          "Anaesthetic assessment",
          "Consent and education process",
        ],
      },
      {
        id: 2,
        title: "TOE Assessment",
        subtitle: "Advanced cardiac imaging evaluation",
        description:
          "Transesophageal echocardiography to assess heart function and exclude blood clots.",
        icon: () => React.createElement(Search, { className: "w-5 h-5" }),
        duration: "30-45 minutes",
        details: [
          "Detailed left atrial assessment",
          "Blood clot exclusion",
          "Valve function evaluation",
          "Safety confirmation for cardioversion",
        ],
      },
      {
        id: 3,
        title: "Electrical Cardioversion",
        subtitle: "Rhythm restoration procedure",
        description:
          "Controlled electrical shock to restore normal heart rhythm under careful monitoring.",
        icon: () => React.createElement(Zap, { className: "w-5 h-5" }),
        duration: "15-30 minutes",
        details: [
          "General anaesthesia administration",
          "Synchronized electrical cardioversion",
          "Continuous cardiac monitoring",
          "Immediate rhythm assessment",
        ],
      },
      {
        id: 4,
        title: "Recovery and Follow-up",
        subtitle: "Post-procedure monitoring and care",
        description:
          "Careful observation and planning for ongoing rhythm management and anticoagulation.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "2-4 hours",
        details: [
          "Recovery room monitoring",
          "Rhythm stability assessment",
          "Anticoagulation planning",
          "Discharge education and follow-up",
        ],
      },
    ],
  },
  toe: {
    name: "Transoesophageal Echocardiogram (TOE)",
    description: "High-resolution ultrasound of the heart via the oesophagus",
    color: "from-sage-500 to-accent-500",
    category: "procedures",
    type: "procedure",
    image: "/images/toe_drawn.png",
    summary:
      "A specialised ultrasound test in which a thin probe is passed down the oesophagus under light sedation. This close vantage point provides crystal-clear images of the heart valves, atria and implanted devices without interference from ribs or lungs.",
    needToKnow: [
      "Fast for 6 hours before the test",
      "Throat spray and light IV sedation keep you comfortable",
      "The probe is about the width of a little finger",
      "Actual imaging time is 10-15 minutes; total visit 60-90 minutes",
      "You will need a responsible adult to drive you home",
      "Normal eating and drinking can resume after the throat is no longer numb",
    ],
    steps: [
      {
        id: 1,
        title: "Preparation & Sedation",
        subtitle: "Ensuring comfort and safety",
        description:
          "Consent review, IV cannula insertion and throat-numbing spray. Light sedation helps you relax while maintaining breathing.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "10 minutes",
        details: [
          "Fasting status confirmed",
          "Removal of dentures if present",
          "Continuous oxygen and blood-pressure monitoring",
        ],
      },
      {
        id: 2,
        title: "Probe Insertion & Imaging",
        subtitle: "High-definition valve assessment",
        description:
          "The lubricated probe is gently guided into the oesophagus; live images are recorded from multiple depths and angles.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "10-15 minutes",
        details: [
          "Mitral, aortic and tricuspid valves in close detail",
          "Assessment for clots, infection or prosthetic-valve issues",
          "Colour Doppler to measure leak severity",
        ],
      },
      {
        id: 3,
        title: "Recovery & Results",
        subtitle: "Observation and discussion",
        description:
          "You relax in recovery for ~30 minutes until the sedation wears off. Preliminary findings are explained before discharge.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "30-45 minutes",
        details: [
          "Monitoring until swallowing is safe",
          "Written report sent to your doctor within 24-48 hours",
          "Arrange follow-up if abnormalities are found",
        ],
      },
    ],
  },
  angiogram_pci: {
    name: "Coronary Angiography & PCI",
    description: "Diagnostic coronary imaging with potential intervention",
    color: "from-primary-500 to-cream-500",
    category: "interventional",
    type: "procedure",
    image: "/images/angio.png",
    summary:
      "Diagnostic procedure to visualise coronary arteries using contrast dye, with potential for immediate treatment (angioplasty/stenting) if blockages are found.",
    needToKnow: [
      "Procedure duration: 30-90 minutes depending on complexity",
      "Local anaesthetic via wrist or groin access",
      "May require overnight stay if intervention needed",
      "Kidney function tests required beforehand",
      "Two blood thinning tablets if stent placed",
    ],
    /** Deepdive content rendered in the expandable panel */
    details: `
## Coronary Angiography&PCI – deepdive
**What is a coronary angiogram?**  
A coronary angiogram is a special Xray test that visualises the blood flow in your heart’s arteries. A thin tube (catheter) is inserted, usually via the wrist or groin, and guided up to the heart. Contrast dye is injected to make the arteries visible on Xray. The test shows if there are any narrowings or blockages.

**What is PCI (“stenting”)?**  
If a significant blockage is found, it can often be treated immediately with percutaneous coronary intervention (PCI). This involves inflating a tiny balloon at the blockage site and placing a metal mesh stent to keep the artery open. PCI restores blood flow and reduces the risk of heart attack.

**Why is this test done?**  
You may be referred for angiography if you have symptoms like chest pain, shortness of breath, abnormal stress test results, or known coronary artery disease. It’s the gold standard for diagnosing blockages and planning treatment.

**How do I prepare?**  
You’ll need blood tests to check kidney function and clotting. Most people can take their usual medications, but blood thinners or diabetes medications may need adjustment—your doctor will advise. Fast for 4–6 hours before the procedure.

**What happens on the day?**  
You’ll change into a gown and have an IV inserted. The wrist or groin area is numbed with local anaesthetic. The procedure usually takes 30–90 minutes. You may feel a warm flush when contrast dye is injected, but there should be no pain. If PCI is needed, it adds extra time.

**Recovery and aftercare**  
Afterwards, you’ll be monitored while the access site is compressed to prevent bleeding. Most people can sit up and eat soon after. If a stent is placed, you’ll need to take antiplatelet medications (such as aspirin and ticagrelor) for several months. Bruising and mild discomfort at the access site are common.

**Risks and complications**  
Serious risks are uncommon but include bleeding, allergic reaction to dye, kidney injury, heart attack, stroke, or (very rarely) death. Your doctor will discuss your individual risk before the procedure.

**Results**  
Your cardiologist will review the images and explain the findings. If PCI was performed, you’ll receive instructions on medications, activity restrictions, and followup. Most people return to normal activities within a few days.
`,
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Assessment",
        subtitle: "Comprehensive evaluation and preparation",
        description:
          "Detailed assessment including kidney function, bleeding risk, and procedure planning.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "1-7 days",
        details: [
          "Blood tests and kidney function assessment",
          "Medication review and adjustment",
          "Bleeding risk evaluation",
          "Consent process and education",
        ],
      },
      {
        id: 2,
        title: "Coronary Angiography",
        subtitle: "Diagnostic coronary artery imaging",
        description:
          "Contrast injection through cardiac catheter to visualise coronary arteries and identify blockages.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "30-60 minutes",
        details: [
          "Local anaesthetic and catheter insertion",
          "Contrast injection and X-ray imaging",
          "Coronary artery assessment",
          "Decision making for intervention",
        ],
      },
      {
        id: 3,
        title: "Percutaneous Coronary Intervention (PCI)",
        subtitle: "Coronary artery treatment if required",
        description:
          "Balloon angioplasty and stent placement to open blocked coronary arteries if indicated.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "30-90 minutes",
        details: [
          "Balloon angioplasty if blockages found",
          "Stent deployment for artery support",
          "Blood flow restoration",
          "Procedural success confirmation",
        ],
      },
      {
        id: 4,
        title: "Post-Procedure Recovery",
        subtitle: "Monitoring and discharge planning",
        description:
          "Careful observation for complications and medication optimisation before discharge.",
        icon: () => React.createElement(Bed, { className: "w-5 h-5" }),
        duration: "4-24 hours",
        details: [
          "Puncture site monitoring and pressure",
          "Cardiac rhythm and vital sign monitoring",
          "Medication initiation or adjustment",
          "Activity restriction and discharge planning",
        ],
      },
    ],
  },
  pacemaker: {
    name: "Pacemaker Implantation",
    description: "Permanent cardiac rhythm device insertion",
    color: "from-primary-500 to-cream-500",
    category: "electrophysiology",
    type: "procedure",
    image: "/images/pacemaker.png",
    summary:
      "Surgical implantation of a small electronic device that helps regulate heart rhythm by delivering electrical impulses when needed.",
    needToKnow: [
      "Day procedure or overnight stay",
      "Local anaesthetic below left collarbone",
      "Arm movement restrictions for 4-6 weeks",
      "Regular device checks every 3-6 months",
      "Battery replacement needed every 8-12 years",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Implant Assessment",
        subtitle: "Device selection and preparation",
        description:
          "Comprehensive evaluation to determine optimal pacemaker type and settings for individual needs.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Detailed rhythm analysis and indication review",
          "Device type selection and programming planning",
          "Pre-operative medical optimisation",
          "Patient education and consent process",
        ],
      },
      {
        id: 2,
        title: "Pacemaker Implantation",
        subtitle: "Device and lead placement procedure",
        description:
          "Surgical implantation of pacemaker generator and positioning of leads in the heart.",
        icon: () => React.createElement(Zap, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Local a and sterile preparation",
          "Lead positioning using X-ray guidance",
          "Generator placement in chest pocket",
          "Initial device testing and programming",
        ],
      },
      {
        id: 3,
        title: "Post-Implant Recovery",
        subtitle: "Initial healing and device optimisation",
        description:
          "Recovery period with activity restrictions to allow proper healing and device settling.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "4-6 weeks",
        details: [
          "Wound care and infection prevention",
          "Activity restrictions to protect leads",
          "Device function monitoring",
          "Gradual return to normal activities",
        ],
      },
      {
        id: 4,
        title: "Long-term Device Management",
        subtitle: "Ongoing monitoring and optimisation",
        description:
          "Regular device checks and programming adjustments to ensure optimal function throughout device life.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "Device lifetime",
        details: [
          "Regular device interrogation and programming",
          "Battery status monitoring",
          "Lead function assessment",
          "Activity and lifestyle optimisation",
        ],
      },
    ],
  },
  af_ablation: {
    name: "Atrial Fibrillation Ablation",
    description: "Advanced catheter ablation for rhythm control",
    color: "from-sage-500 to-primary-500",
    category: "electrophysiology",
    type: "procedure",
    image: "/images/afabl_drawn.png",
    summary:
      "Advanced catheter-based procedure using radiofrequency or pulsed field technology to eliminate abnormal electrical pathways causing atrial fibrillation.",
    needToKnow: [
      "Complex procedure taking 3-5 hours",
      "General anaesthesia required",
      "Overnight hospital stay",
      "Blood thinning management crucial",
      "3-6 months monitoring period for success assessment",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Ablation Preparation",
        subtitle: "Comprehensive evaluation and optimisation",
        description:
          "Detailed assessment including imaging studies and anticoagulation management before ablation.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "2-4 weeks",
        details: [
          "Cardiac MRI or CT for anatomical mapping",
          "Anticoagulation optimisation",
          "Pre-procedural echocardiography",
          "Anaesthetic consultation and preparation",
        ],
      },
      {
        id: 2,
        title: "Catheter Ablation Procedure",
        subtitle: "Advanced electrophysiology intervention",
        description:
          "Catheter-based ablation using radiofrequency or pulsed field technology to eliminate abnormal electrical pathways.",
        icon: () => React.createElement(Zap, { className: "w-5 h-5" }),
        duration: "3-5 hours",
        details: [
          "General anaesthesia and catheter positioning",
          "3D mapping of electrical activity",
          "Pulmonary vein isolation",
          "Additional lesion sets if required",
        ],
      },
      {
        id: 3,
        title: "Post-Ablation Recovery",
        subtitle: "Initial healing and rhythm monitoring",
        description:
          "Recovery period with careful monitoring for complications and early rhythm assessment.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "24-48 hours",
        details: [
          "Cardiac monitoring and observation",
          "Puncture site care and bed rest",
          "Pain management and comfort measures",
          "Early rhythm assessment and optimisation",
        ],
      },
      {
        id: 4,
        title: "Long-term Follow-up",
        subtitle: "Rhythm monitoring and optimisation",
        description:
          "Extended follow-up period to assess ablation success and manage ongoing rhythm control.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "6-12 months",
        details: [
          "Regular rhythm monitoring with Holter studies",
          "Anticoagulation management decisions",
          "Activity progression and lifestyle counseling",
          "Assessment for additional procedures if needed",
        ],
      },
    ],
  },
  mteer: {
    name: "Mitral Transcatheter Edge-to-Edge Repair (mTEER)",
    description:
      "Minimally invasive mitral valve repair using MitraClip or PASCAL technology",
    color: "from-cream-500 to-accent-500",
    category: "interventional",
    type: "procedure",
    image: "/images/mteer_drawn.png",
    summary:
      "A catheterbased, minimally invasive procedure that implants a small clip on the mitral valve leaflets to reduce mitral regurgitation. The procedure usually takes 1-3 hours, avoids openheart surgery, and most people leave hospital within 1-3 days with rapid improvement in symptoms and quality of life.",
    needToKnow: [
      "Heartteam (cardiologist & cardiothoracic surgeon) evaluation confirms suitability",
      "Performed through a vein in the groin with transseptal access to the heart",
      "General anaesthesia and transoesophageal echocardiography (TOE) guidance (some centres use deep sedation)",
      "Typical procedure time is 1-3 hours",
      "Most patients go home within 1-3 days",
      "Symptoms and exercise capacity often improve quickly",
    ],
    steps: [
      {
        id: 1,
        title: "Heart Team Evaluation",
        subtitle: "Multidisciplinary assessment for candidacy",
        description:
          "Comprehensive evaluation by heart team to determine suitability for transcatheter mitral valve repair.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Detailed echocardiographic assessment",
          "Heart team discussion and planning",
          "Risk-benefit analysis",
          "Patient education and consent process",
        ],
      },
      {
        id: 2,
        title: "mTEER Procedure",
        subtitle: "Transcatheter valve repair intervention",
        description:
          "Minimally invasive placement of MitraClip or PASCAL device to reduce mitral valve leakage.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "2-4 hours",
        details: [
          "General anaesthesia and TEE guidance",
          "Transseptal catheter access",
          "Clip positioning and deployment",
          "Real-time assessment of repair adequacy",
        ],
      },
      {
        id: 3,
        title: "Post-Procedure Monitoring",
        subtitle: "Recovery and initial assessment",
        description:
          "Careful monitoring following clip deployment with assessment of procedural success.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "1-2 days",
        details: [
          "Cardiac monitoring and observation",
          "Post-procedure echocardiography",
          "Gradual activity progression",
          "Discharge planning and education",
        ],
      },
      {
        id: 4,
        title: "Long-term Follow-up",
        subtitle: "Ongoing valve function assessment",
        description:
          "Regular monitoring to assess durability of repair and optimise heart failure management.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Serial echocardiographic monitoring",
          "Heart failure management optimisation",
          "Activity and exercise recommendations",
          "Long-term durability assessment",
        ],
      },
    ],
  },
  echocardiogram: {
    name: "Resting Echocardiogram",
    description: "Noninvasive ultrasound scan of the heart at rest",
    color: "from-sage-500 to-cream-500",
    category: "imaging",
    type: "test",
    image: "/images/echo.png",
    summary:
      "A painless ultrasound that creates live images of your heart chambers, valves and blood flow, helping diagnose structure, function and overall pumping performance.",
    needToKnow: [
      "No fasting or special preparation required",
      "Takes about 30-45 minutes",
      "A small probe with gel is moved across the chest",
      "Uses safe, radiationfree ultrasound waves",
      "Results reviewed by a cardiologist within 24-48 hours",
    ],
    steps: [
      {
        id: 1,
        title: "Checkin & Preparation",
        subtitle: "Brief medical history and setup",
        description:
          "You change into a gown and lie on an exam table; ECG dots may be placed to synchronise images.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "510 minutes",
        details: [
          "Verification of referral and Medicare details",
          "Explanation of the scan process",
          "Removal of upperbody clothing and jewellery",
        ],
      },
      {
        id: 2,
        title: "Image Acquisition",
        subtitle: "Ultrasound imaging of heart structures",
        description:
          "The sonographer moves the probe over the chest to collect moving pictures and Doppler bloodflow signals.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "2030 minutes",
        details: [
          "Multiple views taken from left side and below sternum",
          "Colour Doppler to assess valve leakage",
          "Live measurements of chamber size & heart function",
        ],
      },
      {
        id: 3,
        title: "Review & Results",
        subtitle: "Cardiologist interpretation",
        description:
          "Images are analysed and a detailed report is sent to your referring doctor.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "Same or next day",
        details: [
          "Quantitative measurements of pumping strength (EF)",
          "Valve function grading",
          "Recommendation for further tests or treatment if needed",
        ],
      },
    ],
  },
  ctca: {
    name: "Cardiac CT Angiography (CTCA)",
    description:
      "Non-invasive coronary artery imaging using advanced CT technology",
    color: "from-sage-500 to-primary-500",
    category: "imaging",
    type: "test",
    image: "/images/ctca.png",
    summary:
      "High-resolution CT scan with contrast to visualise coronary arteries and assess for blockages without invasive catheterisation.",
    needToKnow: [
      "Fast for 4 hours, avoid caffeine day of scan",
      "Heart rate control with medication if needed",
      "Quick 15-30 minute procedure",
      "Results available within a few days",
      "Excellent alternative to invasive angiography",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Scan Preparation",
        subtitle: "Optimisation for optimal image quality",
        description:
          "Heart rate control and preparation to ensure optimal image quality for coronary assessment.",
        icon: () => React.createElement(Clock, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Heart rate optimization with beta-blockers",
          "IV access for contrast administration",
          "Allergy screening and premedication if needed",
          "Patient positioning and monitoring setup",
        ],
      },
      {
        id: 2,
        title: "CT Coronary Angiography",
        subtitle: "Advanced cardiac imaging acquisition",
        description:
          "High-resolution CT scanning with contrast to visualise coronary arteries and assess for blockages.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "15-30 minutes",
        details: [
          "ECG-gated cardiac CT acquisition",
          "Contrast injection for coronary visualization",
          "Breath-hold instructions during scanning",
          "Multiple cardiac cycle imaging",
        ],
      },
      {
        id: 3,
        title: "Image Analysis",
        subtitle: "Detailed coronary assessment",
        description:
          "Comprehensive analysis of coronary anatomy and identification of any significant narrowing.",
        icon: () => React.createElement(Search, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "3D reconstruction of coronary arteries",
          "Stenosis assessment and quantification",
          "Plaque characterization and analysis",
          "Cardiac function evaluation",
        ],
      },
      {
        id: 4,
        title: "Results and Follow-up",
        subtitle: "Treatment planning based on findings",
        description:
          "Review of results with cardiologist and planning of appropriate treatment strategy if needed.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "Same day",
        details: [
          "Results review with cardiologist",
          "Treatment recommendations if abnormal",
          "Risk stratification and prognosis discussion",
          "Follow-up planning and recommendations",
        ],
      },
    ],
  },
  pyp_scan: {
    name: "PYP Scan (Cardiac Amyloidosis Imaging)",
    description: "Specialised nuclear imaging to detect cardiac amyloidosis",
    color: "from-accent-500 to-sage-500",
    category: "imaging",
    type: "test",
    image: "/images/pyp.png",
    summary:
      "Specialised nuclear imaging study to detect and quantify cardiac amyloid deposits using radiotracer technology.",
    needToKnow: [
      "No fasting required, total time 3 hours",
      "Safe radiotracer injection followed by wait period",
      "SPECT/CT imaging after uptake period",
      "Results typically available within 48 hours",
      "Important for diagnosing cardiac amyloidosis",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Scan Assessment",
        subtitle: "Clinical evaluation and preparation",
        description:
          "Clinical assessment and preparation for specialised nuclear cardiac imaging study.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "30 minutes",
        details: [
          "Clinical history and examination",
          "Review of indications for scan",
          "Patient education about procedure",
          "Consent process and preparation",
        ],
      },
      {
        id: 2,
        title: "Radiotracer Injection",
        subtitle: "PYP radiotracer administration",
        description:
          "Injection of Technetium-99m pyrophosphate (PYP) radiotracer for cardiac amyloid detection.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "5 minutes",
        details: [
          "IV access and radiotracer preparation",
          "PYP injection via peripheral vein",
          "Radiotracer distribution period",
          "Safety monitoring and comfort measures",
        ],
      },
      {
        id: 3,
        title: "Imaging Acquisition",
        subtitle: "SPECT/CT cardiac imaging",
        description:
          "Specialised nuclear imaging to detect and quantify cardiac amyloid deposits.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "45 minutes",
        details: [
          "SPECT/CT camera positioning",
          "Multiple angle image acquisition",
          "Heart and thorax imaging",
          "High-resolution cardiac assessment",
        ],
      },
      {
        id: 4,
        title: "Results and Interpretation",
        subtitle: "Amyloidosis assessment and reporting",
        description:
          "Specialised interpretation to determine presence and extent of cardiac amyloidosis.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "1-2 days",
        details: [
          "Quantitative analysis of cardiac uptake",
          "Comparison with normal reference values",
          "Grading of amyloid burden if present",
          "Correlation with clinical findings",
        ],
      },
    ],
  },
  svt_ablation: {
    name: "SVT Ablation (Supraventricular Tachycardia)",
    description: "Catheter ablation for supraventricular tachycardia treatment",
    color: "from-primary-500 to-accent-500",
    category: "electrophysiology",
    type: "procedure",
    image: "/images/afabl_drawn.png",
    summary:
      "Precise catheter-based procedure to eliminate abnormal electrical pathways causing supraventricular tachycardia episodes.",
    needToKnow: [
      "High success rate (>95% for most SVT types)",
      "Day procedure with conscious sedation",
      "1-3 hour procedure via groin access",
      "Same-day discharge in most cases",
      "Immediate cure of SVT episodes expected",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Ablation Assessment",
        subtitle: "Electrophysiology study planning",
        description:
          "Comprehensive evaluation to identify the specific type of SVT and plan ablation strategy.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Detailed rhythm analysis and characterization",
          "Electrophysiology study planning",
          "Risk assessment and patient education",
          "Consent process and pre-procedure preparation",
        ],
      },
      {
        id: 2,
        title: "Electrophysiology Study",
        subtitle: "Diagnostic mapping and localization",
        description:
          "Detailed electrical mapping to identify the exact location of abnormal electrical pathways.",
        icon: () => React.createElement(Search, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Catheter positioning via groin access",
          "Electrical mapping of heart chambers",
          "SVT induction and characterization",
          "Precise localization of abnormal pathway",
        ],
      },
      {
        id: 3,
        title: "Catheter Ablation",
        subtitle: "Elimination of abnormal electrical pathway",
        description:
          "Precise radiofrequency ablation to permanently eliminate the SVT causing electrical pathway.",
        icon: () => React.createElement(Zap, { className: "w-5 h-5" }),
        duration: "30-60 minutes",
        details: [
          "Radiofrequency energy delivery",
          "Real-time monitoring of ablation effect",
          "Testing for complete pathway elimination",
          "Confirmation of procedural success",
        ],
      },
      {
        id: 4,
        title: "Post-Ablation Recovery",
        subtitle: "Recovery and follow-up care",
        description:
          "Recovery period with monitoring and assessment of long-term success.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "4-6 hours",
        details: [
          "Post-procedure monitoring and observation",
          "Puncture site care and bed rest",
          "Rhythm monitoring for complications",
          "Discharge planning and follow-up",
        ],
      },
    ],
  },
  cardiac_mri: {
    name: "Cardiac MRI",
    description:
      "Advanced magnetic resonance imaging for detailed cardiac assessment",
    color: "from-sage-500 to-cream-500",
    category: "imaging",
    type: "test",
    image: "/images/mri.png",
    summary:
      "Advanced magnetic resonance imaging providing detailed assessment of cardiac structure, function, and tissue characteristics.",
    needToKnow: [
      "MRI safety screening essential",
      "60 minute scan with breath holds",
      "Contrast (non-iodine) injection may be required",
      "Results available within a week",
      "Most detailed cardiac imaging available for the heart muscle",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-MRI Screening",
        subtitle: "Safety assessment and preparation",
        description:
          "Comprehensive screening for MRI safety and preparation for optimal image quality.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
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
        description:
          "High-resolution magnetic resonance imaging to assess cardiac structure and function.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "20-40 minutes",
        details: [
          "ECG-gated cardiac imaging sequences",
          "Cine imaging for function assessment",
          "Contrast-enhanced imaging if indicated",
          "Specialised sequences for tissue characterisation",
        ],
      },
      {
        id: 3,
        title: "Image Analysis",
        subtitle: "Detailed cardiac assessment",
        description:
          "Comprehensive analysis of cardiac structure, function, and tissue characteristics.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Cardiac function quantification",
          "Wall motion and thickening analysis",
          "Tissue characterization and fibrosis assessment",
          "Valve function evaluation",
        ],
      },
      {
        id: 4,
        title: "Results and Clinical Correlation",
        subtitle: "Treatment planning based on findings",
        description:
          "Review of MRI findings with clinical correlation and treatment planning.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "Variable",
        details: [
          "Detailed review of cardiac structure and function",
          "Correlation with clinical presentation",
          "Treatment recommendations based on findings",
          "Follow-up imaging planning if needed",
        ],
      },
    ],
  },
  exercise_stress_echo: {
    name: "Exercise Stress Echocardiography",
    description: "Combined exercise testing with cardiac ultrasound imaging",
    color: "from-cream-500 to-sage-500",
    category: "imaging",
    type: "test",
    image: "/images/stressecho.png",
    summary:
      "Exercise test combined with cardiac ultrasound to assess heart function under stress and detect coronary artery disease.",
    needToKnow: [
      "Wear comfortable exercise clothing and shoes",
      "Light meal 2-3 hours before test",
      "Progressive treadmill exercise with monitoring",
      "Immediate post-exercise imaging required",
      "Results discussed immediately after test",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Test Preparation",
        subtitle: "Baseline assessment and preparation",
        description:
          "Baseline cardiac assessment and preparation for safe exercise testing.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "30 minutes",
        details: [
          "Baseline ECG and vital signs",
          "Resting echocardiography",
          "Exercise protocol selection",
          "Safety monitoring setup",
        ],
      },
      {
        id: 2,
        title: "Exercise Testing",
        subtitle: "Progressive exercise with monitoring",
        description:
          "Graded exercise testing with continuous cardiac monitoring and imaging.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "15-20 minutes",
        details: [
          "Progressive treadmill exercise protocol",
          "Continuous ECG and blood pressure monitoring",
          "Symptom assessment during exercise",
          "Peak exercise achievement",
        ],
      },
      {
        id: 3,
        title: "Post-Exercise Imaging",
        subtitle: "Immediate post-exercise echocardiography",
        description:
          "Rapid echocardiographic imaging immediately after peak exercise to assess cardiac function.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "5-10 minutes",
        details: [
          "Immediate transfer to echo bed",
          "Rapid cardiac imaging acquisition",
          "Wall motion assessment at peak stress",
          "Comparison with resting images",
        ],
      },
      {
        id: 4,
        title: "Recovery and Results",
        subtitle: "Recovery monitoring and interpretation",
        description:
          "Recovery period with continued monitoring and interpretation of test results.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "15-30 minutes",
        details: [
          "Continuous monitoring during recovery",
          "Comparison of rest and stress images",
          "Exercise capacity assessment",
          "Results discussion and recommendations",
        ],
      },
    ],
  },
  holter: {
    name: "24 Hour Holter Monitoring",
    description: "Continuous cardiac rhythm monitoring over 24 hours",
    color: "from-cream-500 to-accent-500",
    category: "monitoring",
    type: "test",
    image: "/images/holter.png",
    summary:
      "Holter monitoring involves wearing a small, portable device that continuously records your heart rhythm for 24 hours. This helps detect irregular heartbeats that may not occur during a brief office visit.",
    needToKnow: [
      "Wear the device continuously for 24 hours",
      "Keep a diary of symptoms and activities",
      "Normal daily activities encouraged",
      "Avoid getting the device wet",
      "Return device the following day",
    ],
    steps: [
      {
        id: 1,
        title: "Device Application",
        subtitle: "Holter monitor setup and instruction",
        description:
          "Attachment of the portable cardiac monitoring device with patient education on proper use.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "15-20 minutes",
        details: [
          "Skin preparation and electrode placement",
          "Device attachment and testing",
          "Patient education on device care",
          "Diary instruction for symptom recording",
        ],
      },
      {
        id: 2,
        title: "24 Hour Monitoring",
        subtitle: "Continuous rhythm recording",
        description:
          "24 hour period of continuous cardiac rhythm monitoring during normal daily activities.",
        icon: () => React.createElement(Clock, { className: "w-5 h-5" }),
        duration: "24 hours",
        details: [
          "Continuous ECG recording",
          "Normal daily activity maintenance",
          "Symptom diary completion",
          "Device care and protection",
        ],
      },
      {
        id: 3,
        title: "Device Return",
        subtitle: "Monitor removal and data download",
        description:
          "Return of the monitoring device with data download and initial technical analysis.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "10-15 minutes",
        details: [
          "Device removal and electrode cleanup",
          "Data download and verification",
          "Diary collection and review",
          "Technical analysis initiation",
        ],
      },
      {
        id: 4,
        title: "Results and Follow-up",
        subtitle: "Analysis interpretation and recommendations",
        description:
          "Comprehensive analysis of 24-hour recording with clinical correlation and treatment planning.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "1-3 days",
        details: [
          "Detailed rhythm analysis",
          "Symptom correlation assessment",
          "Clinical interpretation",
          "Follow-up planning and recommendations",
        ],
      },
    ],
  },
  abpm: {
    name: "24 Hour Ambulatory Blood Pressure Monitor",
    description:
      "Continuous blood pressure monitoring over 24 hours during normal daily activities",
    color: "from-blue-500 to-teal-500",
    category: "monitoring",
    type: "test",
    image: "/images/abpm.png",
    summary:
      "Ambulatory blood pressure monitoring involves wearing a small, portable device that automatically measures your blood pressure at regular intervals over 24 hours. This provides a comprehensive picture of your blood pressure patterns throughout the day and night, helping to diagnose hypertension and evaluate treatment effectiveness.",
    needToKnow: [
      "Wear the device continuously for 24 hours",
      "Keep a detailed diary of activities and symptoms",
      "Continue normal daily activities (except vigorous exercise)",
      "Avoid getting the device wet -no showering or swimming",
      "Device will inflate every 15-30 minutes during the day, hourly at night",
      "Return device the following day for data analysis",
    ],
    steps: [
      {
        id: 1,
        title: "Device Fitting",
        subtitle: "Monitor setup and patient education",
        description:
          "Initial appointment to fit the ambulatory blood pressure monitor and provide comprehensive instructions.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "30-40 minutes",
        details: [
          "Height and weight measurement for BMI calculation",
          "Blood pressure cuff sizing and fitting to non-dominant arm",
          "Monitor attachment and testing",
          "Patient education on device operation and care",
          "Diary instruction for activity and symptom recording",
          "Scheduling return appointment",
        ],
      },
      {
        id: 2,
        title: "24 Hour Monitoring",
        subtitle: "Continuous blood pressure recording",
        description:
          "24-hour period of continuous blood pressure monitoring during normal daily activities.",
        icon: () => React.createElement(Clock, { className: "w-5 h-5" }),
        duration: "24 hours",
        details: [
          "Automatic blood pressure readings every 15-30 minutes during daytime",
          "Hourly readings during nighttime sleep",
          "Simultaneous heart rate monitoring",
          "Maintain normal daily routine (work, activities, sleep)",
          "Avoid vigorous exercise and water exposure",
          "Complete activity and symptom diary entries",
        ],
      },
      {
        id: 3,
        title: "Device Return",
        subtitle: "Monitor removal and data download",
        description:
          "Return appointment to remove the monitoring device and download recorded data.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "10-15 minutes",
        details: [
          "Device removal and cuff cleanup",
          "Data download and verification",
          "Diary collection and review",
          "Technical analysis initiation",
          "Patient feedback on monitoring experience",
        ],
      },
      {
        id: 4,
        title: "Results and Interpretation",
        subtitle: "Comprehensive analysis and clinical correlation",
        description:
          "Detailed analysis of 24-hour blood pressure patterns with clinical interpretation and treatment recommendations.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "2-3 days",
        details: [
          "24-hour average blood pressure calculation",
          "Daytime and nighttime blood pressure analysis",
          "Nocturnal dipping pattern assessment",
          "Blood pressure variability evaluation",
          "Clinical correlation with symptoms and activities",
          "Treatment recommendations and follow-up planning",
        ],
      },
    ],
  },
  bav: {
    name: "Balloon Aortic Valvuloplasty (BAV)",
    description: "Balloon dilation procedure for aortic valve stenosis",
    color: "from-primary-500 to-cream-500",
    category: "interventional",
    type: "procedure",
    image: "/images/bav.png",
    summary:
      "A minimally invasive procedure where a balloon catheter is used to widen a narrowed aortic valve, improving blood flow from the heart to the body.",
    needToKnow: [
      "Procedure duration: 1-2 hours",
      "Performed via catheter through groin or wrist",
      "Local anaesthetic with conscious sedation",
      "Usually day procedure or overnight stay",
      "Temporary improvement -may need repeat procedure in the long term",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Assessment",
        subtitle: "Comprehensive evaluation and planning",
        description:
          "Detailed cardiac assessment to determine suitability for balloon valvuloplasty and procedure planning.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Echocardiography to assess valve severity",
          "Cardiac catheterisation for detailed measurements",
          "Risk assessment and patient selection",
          "Anaesthetic consultation and consent process",
        ],
      },
      {
        id: 2,
        title: "Balloon Valvuloplasty",
        subtitle: "Valve dilation procedure",
        description:
          "Catheter-based balloon inflation to stretch and open the narrowed aortic valve.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Arterial access and catheter positioning",
          "Balloon positioning across aortic valve",
          "Rapid ventricular pacing during inflation",
          "Immediate assessment of valve function",
        ],
      },
      {
        id: 3,
        title: "Post-Procedure Recovery",
        subtitle: "Monitoring and assessment",
        description:
          "Recovery period with monitoring for complications and assessment of procedure success.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "4-24 hours",
        details: [
          "Access site monitoring and care",
          "Echocardiography to assess improvement",
          "Symptom assessment and monitoring",
          "Discharge planning and follow-up",
        ],
      },
      {
        id: 4,
        title: "Follow-up Care",
        subtitle: "Long-term monitoring and planning",
        description:
          "Regular follow-up to monitor valve function and plan for future interventions if needed.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "Ongoing",
        details: [
          "Regular echocardiographic monitoring",
          "Symptom assessment and functional capacity",
          "Planning for definitive valve replacement",
          "Medication optimization",
        ],
      },
    ],
  },
  cabg: {
    name: "Coronary Artery Bypass Grafting (CABG)",
    description: "Surgical revascularization using vessel grafts",
    color: "from-primary-500 to-cream-500",
    category: "surgery",
    type: "procedure",
    image: "/images/cabg.png",
    summary:
      "Major cardiac surgery where blood vessels from other parts of the body are used to create alternate pathways around blocked coronary arteries.",
    needToKnow: [
      "Major surgery requiring 3-7 days hospital stay",
      "General anaesthesia with heart-lung machine",
      "6-12 week recovery period",
      "Long-term medication management required",
      "Excellent long-term outcomes for suitable patients",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Operative Assessment",
        subtitle: "Comprehensive surgical planning",
        description:
          "Detailed evaluation to assess surgical risk and plan the optimal revascularization strategy.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Coronary angiography for surgical planning",
          "Cardiac function assessment",
          "Risk stratification and surgical consultation",
          "Pre-operative optimization and education",
        ],
      },
      {
        id: 2,
        title: "Surgical Procedure",
        subtitle: "Coronary artery bypass surgery",
        description:
          "Complex cardiac surgery to create new pathways for blood flow around blocked arteries.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "3-6 hours",
        details: [
          "Harvesting of graft vessels (mammary, radial, saphenous)",
          "Cardiopulmonary bypass initiation",
          "Coronary anastomoses creation",
          "Weaning from bypass and chest closure",
        ],
      },
      {
        id: 3,
        title: "Intensive Care Recovery",
        subtitle: "Critical care monitoring",
        description:
          "Initial recovery period in intensive care with close monitoring of cardiac and respiratory function.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "1-3 days",
        details: [
          "Mechanical ventilation and gradual weaning",
          "Hemodynamic monitoring and support",
          "Pain management and early mobilization",
          "Complication surveillance and management",
        ],
      },
      {
        id: 4,
        title: "Hospital Recovery",
        subtitle: "Progressive rehabilitation",
        description:
          "Ward-based recovery with progressive activity increase and preparation for discharge.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "3-5 days",
        details: [
          "Progressive mobilization and physiotherapy",
          "Wound care and infection prevention",
          "Medication optimization",
          "Discharge planning and education",
        ],
      },
      {
        id: 5,
        title: "Long-term Recovery",
        subtitle: "Rehabilitation and follow-up",
        description:
          "Extended recovery period with cardiac rehabilitation and long-term follow-up care.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "6-12 weeks",
        details: [
          "Cardiac rehabilitation programme participation",
          "Progressive return to normal activities",
          "Regular follow-up appointments",
          "Long-term medication management",
        ],
      },
    ],
  },
  pfo_closure: {
    name: "PFO Closure",
    description: "Patent foramen ovale closure device implantation",
    color: "from-primary-500 to-cream-500",
    category: "structural",
    type: "procedure",
    image: "/images/pfoclosure.png",
    summary:
      "Minimally invasive procedure to close a small opening between the heart's upper chambers that failed to close naturally after birth.",
    needToKnow: [
      "Day procedure with conscious sedation",
      "Performed via catheter through leg vein",
      "Device permanently seals the opening",
      "Prevents stroke risk from paradoxical embolism",
      "Blood thinning medication for 3-6 months",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Assessment",
        subtitle: "Detailed cardiac evaluation",
        description:
          "Comprehensive assessment to confirm PFO diagnosis and evaluate suitability for closure.",
        icon: () => React.createElement(Search, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Transoesophageal echocardiography",
          "Bubble contrast study confirmation",
          "Risk-benefit assessment for closure",
          "Patient education and consent process",
        ],
      },
      {
        id: 2,
        title: "Device Implantation",
        subtitle: "Catheter-based closure procedure",
        description:
          "Minimally invasive placement of a closure device to seal the patent foramen ovale.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Venous access and catheter advancement",
          "TEE guidance for device positioning",
          "Device deployment and position confirmation",
          "Final assessment of closure",
        ],
      },
      {
        id: 3,
        title: "Post-Procedure Recovery",
        subtitle: "Monitoring and discharge",
        description:
          "Recovery period with monitoring for complications and assessment of successful closure.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "4-6 hours",
        details: [
          "Access site monitoring",
          "Echocardiographic confirmation of device position",
          "Neurological assessment",
          "Discharge planning and medication initiation",
        ],
      },
      {
        id: 4,
        title: "Follow-up Care",
        subtitle: "Long-term monitoring",
        description:
          "Regular follow-up to ensure successful closure and monitor for any complications.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Echocardiography at 1, 6, and 12 months",
          "Antiplatelet therapy management",
          "Endocarditis prophylaxis education",
          "Long-term stroke prevention assessment",
        ],
      },
    ],
  },
  asd_closure: {
    name: "ASD Closure",
    description: "Atrial septal defect closure device implantation",
    color: "from-primary-500 to-cream-500",
    category: "structural",
    type: "procedure",
    image: "/images/asd.png",
    summary:
      "Minimally invasive procedure to close an abnormal opening between the heart's upper chambers using a specialised closure device.",
    needToKnow: [
      "Day procedure or overnight stay",
      "Performed via catheter through leg vein",
      "Device grows into heart tissue over time",
      "Prevents right heart volume overload",
      "Blood thinning medication for 6 months",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Assessment",
        subtitle: "Comprehensive evaluation",
        description:
          "Detailed assessment to evaluate ASD size, location, and suitability for device closure.",
        icon: () => React.createElement(Search, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Transoesophageal echocardiography sizing",
          "Right heart catheterisation if indicated",
          "Assessment of surrounding structures",
          "Device size selection and planning",
        ],
      },
      {
        id: 2,
        title: "Device Implantation",
        subtitle: "Transcatheter ASD closure",
        description:
          "Catheter-based placement of an occlusion device to close the atrial septal defect.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "1-3 hours",
        details: [
          "Venous access and transseptal approach",
          "Balloon sizing of defect",
          "Device deployment and positioning",
          "Stability testing and final release",
        ],
      },
      {
        id: 3,
        title: "Post-Procedure Recovery",
        subtitle: "Monitoring and assessment",
        description:
          "Recovery period with monitoring for complications and confirmation of successful closure.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "4-24 hours",
        details: [
          "Continuous cardiac monitoring",
          "Echocardiographic assessment",
          "Neurological monitoring",
          "Access site care and mobilization",
        ],
      },
      {
        id: 4,
        title: "Long-term Follow-up",
        subtitle: "Endothelialization monitoring",
        description:
          "Regular follow-up to monitor device integration and assess for residual shunting.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Serial echocardiography at defined intervals",
          "Assessment of device position and function",
          "Antiplatelet therapy management",
          "Endocarditis prophylaxis recommendations",
        ],
      },
    ],
  },
  icd: {
    name: "Implantable Cardioverter Defibrillator (ICD) Implantation",
    description: "Life-saving device implantation for arrhythmia protection",
    color: "from-primary-500 to-cream-500",
    category: "electrophysiology",
    type: "procedure",
    image: "/images/pacemaker.png",
    summary:
      "Surgical implantation of a sophisticated device that monitors heart rhythm and delivers life-saving therapy for dangerous arrhythmias.",
    needToKnow: [
      "Day procedure or overnight stay",
      "Local anaesthetic below left collarbone",
      "Device monitors rhythm 24/7",
      "Can deliver pacing, cardioversion, or defibrillation",
      "Regular device checks every 3-6 months required",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Implant Assessment",
        subtitle: "Risk stratification and device selection",
        description:
          "Comprehensive evaluation to determine ICD indication and optimal device configuration.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Arrhythmia risk assessment and indication review",
          "Echocardiography for lead placement planning",
          "Device type selection (single/dual/CRT-D)",
          "Patient education and expectation setting",
        ],
      },
      {
        id: 2,
        title: "ICD Implantation",
        subtitle: "Device and lead placement",
        description:
          "Surgical implantation of ICD generator and positioning of defibrillation leads.",
        icon: () => React.createElement(Zap, { className: "w-5 h-5" }),
        duration: "1-3 hours",
        details: [
          "Local anaesthesia and sterile preparation",
          "Lead positioning using fluoroscopic guidance",
          "Defibrillation threshold testing",
          "Generator placement and system testing",
        ],
      },
      {
        id: 3,
        title: "Post-Implant Recovery",
        subtitle: "Initial monitoring and optimization",
        description:
          "Recovery period with device programming optimisation and patient education.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "4-24 hours",
        details: [
          "Wound care and infection prevention",
          "Device interrogation and programming",
          "Patient education on device function",
          "Activity restrictions and discharge planning",
        ],
      },
      {
        id: 4,
        title: "Long-term Management",
        subtitle: "Device monitoring and optimization",
        description:
          "Ongoing device management with regular checks and therapy optimization.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "Device lifetime",
        details: [
          "Regular device interrogations and programming",
          "Battery monitoring and replacement planning",
          "Therapy optimization based on clinical needs",
          "Remote monitoring capability utilization",
        ],
      },
    ],
  },
  eps: {
    name: "Electrophysiology Study (EPS)",
    description: "Diagnostic study of heart's electrical conduction system",
    color: "from-primary-500 to-cream-500",
    category: "electrophysiology",
    type: "test",
    image: "/images/angio.png",
    summary:
      "Specialised catheter-based test to evaluate the heart's electrical system, diagnose arrhythmias, and guide treatment decisions.",
    needToKnow: [
      "Procedure duration: 1-4 hours depending on complexity",
      "Local anaesthetic with conscious sedation",
      "May include ablation therapy if indicated",
      "Multiple catheters placed through leg veins",
      "Day procedure with 4-6 hour recovery",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Study Preparation",
        subtitle: "Evaluation and planning",
        description:
          "Comprehensive assessment to plan the electrophysiology study and potential interventions.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Arrhythmia history and symptom correlation",
          "Baseline ECG and rhythm monitoring review",
          "Medication management and anticoagulation",
          "Consent process and procedure planning",
        ],
      },
      {
        id: 2,
        title: "Catheter Positioning",
        subtitle: "Electrophysiology catheter placement",
        description:
          "Placement of specialised catheters to map the heart\'s electrical system.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "30-60 minutes",
        details: [
          "Venous access and catheter insertion",
          "Catheter positioning using fluoroscopy",
          "Baseline electrical measurements",
          "Mapping catheter placement if needed",
        ],
      },
      {
        id: 3,
        title: "Electrical Testing",
        subtitle: "Arrhythmia induction and mapping",
        description:
          "Detailed electrical testing to induce and characterize arrhythmias.",
        icon: () => React.createElement(Zap, { className: "w-5 h-5" }),
        duration: "1-3 hours",
        details: [
          "Programmed electrical stimulation",
          "Arrhythmia induction and characterization",
          "Detailed electrical mapping",
          "Assessment of conduction system function",
        ],
      },
      {
        id: 4,
        title: "Results and Treatment",
        subtitle: "Analysis and therapeutic decisions",
        description:
          "Analysis of findings and implementation of appropriate therapy if indicated.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "Variable",
        details: [
          "Real-time analysis of electrical findings",
          "Ablation therapy if appropriate substrate found",
          "Treatment recommendation formulation",
          "Follow-up planning based on results",
        ],
      },
    ],
  },
  myocardial_perfusion: {
    name: "Myocardial Perfusion Scan",
    description: "Nuclear stress test to assess heart muscle blood flow",
    color: "from-sage-500 to-primary-500",
    category: "imaging",
    type: "test",
    image: "/images/mps.png",
    summary:
      "A nuclear medicine test that uses radioactive tracers to evaluate blood flow to the heart muscle during rest and stress conditions.",
    needToKnow: [
      "Two-day procedure: stress and rest imaging",
      "Radioactive tracer injection (very safe, low dose)",
      "Exercise stress test or medication-induced stress",
      "No eating for 4 hours before each scan",
      "Avoid caffeine 24 hours before test",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Test Preparation",
        subtitle: "Patient preparation and education",
        description:
          "Comprehensive preparation including dietary restrictions and medication management for optimal test results.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "24 hours prior",
        details: [
          "Caffeine restriction for 24 hours",
          "Fasting for 4 hours before each visit",
          "Medication review and adjustment",
          "Comfortable exercise clothing for stress day",
        ],
      },
      {
        id: 2,
        title: "Stress Test Day",
        subtitle: "Stress imaging with radiotracer",
        description:
          "Exercise or pharmacological stress testing with radioactive tracer injection and imaging.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "3-4 hours",
        details: [
          "Baseline ECG and vital signs",
          "Stress test (exercise or medication)",
          "Radiotracer injection at peak stress",
          "SPECT imaging 15-60 minutes post-injection",
        ],
      },
      {
        id: 3,
        title: "Rest Test Day",
        subtitle: "Resting comparison imaging",
        description:
          "Resting radiotracer injection and imaging to compare with stress images.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "2-3 hours",
        details: [
          "Second radiotracer injection at rest",
          "Resting SPECT imaging",
          "Comparison with stress images",
          "Additional views if required",
        ],
      },
      {
        id: 4,
        title: "Results and Interpretation",
        subtitle: "Image analysis and reporting",
        description:
          "Comprehensive analysis comparing stress and rest images to assess coronary artery disease.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "1-3 days",
        details: [
          "Computer-assisted image analysis",
          "Stress vs rest perfusion comparison",
          "Correlation with stress test findings",
          "Detailed report with recommendations",
        ],
      },
    ],
  },
  heartbug: {
    name: "HeartBug",
    description: "Extended cardiac patch monitor (1-4 weeks)",
    color: "from-cream-500 to-accent-500",
    category: "monitoring",
    type: "test",
    image: "/images/heartbug2.png",
    summary:
      "Advanced wearable patch monitor that continuously records heart rhythm for 1-4 weeks, with mobile app integration for symptom correlation.",
    needToKnow: [
      "Worn continuously for 1-4 weeks as prescribed",
      "Waterproof -wear in shower, avoid swimming/bathing",
      "Mobile app allows symptom recording",
      "Automatically detects abnormal heart rhythms",
      "Not an emergency device -call 000 for urgent issues",
    ],
    steps: [
      {
        id: 1,
        title: "Device Application",
        subtitle: "Patch placement and app setup",
        description:
          "Application of the HeartBug patch monitor with mobile app installation and patient education.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "15-20 minutes",
        details: [
          "Skin preparation and patch placement",
          "Mobile app download and setup",
          "Device pairing and testing",
          "Patient education on device use and care",
        ],
      },
      {
        id: 2,
        title: "Extended Monitoring Period",
        subtitle: "Continuous heart rhythm recording",
        description:
          "Extended monitoring period with continuous ECG recording and symptom correlation capability.",
        icon: () => React.createElement(Clock, { className: "w-5 h-5" }),
        duration: "1-4 weeks",
        details: [
          "Continuous ECG monitoring 24/7",
          "Automatic abnormal rhythm detection",
          "Manual symptom recording via app",
          "Bluetooth data transmission to monitoring service",
        ],
      },
      {
        id: 3,
        title: "Symptom Documentation",
        subtitle: "Patient-activated recording",
        description:
          "Patient can manually record symptoms using the mobile app for precise symptom-rhythm correlation.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "As needed",
        details: [
          "Tap 'Make a Recording' when experiencing symptoms",
          "Records 20 seconds before and 60 seconds after button press",
          "Time and date stamped recordings",
          "Symptom diary integration",
        ],
      },
      {
        id: 4,
        title: "Device Return and Reporting",
        subtitle: "Data analysis and clinical correlation",
        description:
          "Return of device with comprehensive analysis and reporting to referring physician.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "1-2 weeks post-return",
        details: [
          "Device data download and analysis",
          "Rhythm-symptom correlation assessment",
          "Comprehensive report generation",
          "Results sent to referring doctor for discussion",
        ],
      },
    ],
  },
  loop_recorder: {
    name: "Loop Recorder Insertion",
    description:
      "Small device implantation for long-term heart rhythm monitoring",
    color: "from-blue-500 to-teal-500",
    category: "monitoring",
    type: "procedure",
    image: "/images/loop.png",
    summary:
      "A minimally invasive procedure to implant a tiny device under the skin to continuously monitor your heart rhythm for extended periods, detecting irregularities.",
    needToKnow: [
      "Procedure duration: 15-30 minutes",
      "Local anaesthesia and minor incision",
      "Immediate discharge post-procedure",
      "Regular remote monitoring of rhythm data",
      "Device typically remains in place up to 3 years",
    ],
    steps: [
      {
        id: 1,
        title: "Device Selection & Planning",
        subtitle: "Personalized device choice and preparation",
        description:
          "Assessment of rhythm monitoring needs and selection of the appropriate loop recorder device.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "1-7 days",
        details: [
          "Review of symptoms and indications for long-term monitoring",
          "Discussion of device features and remote monitoring capability",
          "Pre-procedure instructions and consent process",
          "Medication review and planning",
        ],
      },
      {
        id: 2,
        title: "Device Implantation",
        subtitle: "Minimally invasive insertion",
        description:
          "Implantation of the loop recorder under the skin using local anaesthetic and a small incision.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "15-30 minutes",
        details: [
          "Local anaesthetic applied to chest area",
          "Small incision made for device placement",
          "Device inserted and positioned subcutaneously",
          "Incision closed with adhesive or suture",
        ],
      },
      {
        id: 3,
        title: "Recovery & Device Activation",
        subtitle: "Immediate post-procedure care",
        description:
          "Short observation period and activation of remote device monitoring.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "30-60 minutes",
        details: [
          "Monitoring for bleeding or discomfort",
          "Device programming and remote connection setup",
          "Patient education on wound care and device use",
          "Instructions for activity resumption and signs of complications",
        ],
      },
      {
        id: 4,
        title: "Long-term Monitoring",
        subtitle: "Continuous rhythm surveillance and follow-up",
        description:
          "Ongoing remote monitoring and periodic review of heart rhythm data.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "Up to 3 years",
        details: [
          "Automatic rhythm event detection and transmission",
          "Remote data review by cardiac team",
          "Clinic visits only if issues are detected",
          "Device removal or replacement when indicated",
        ],
      },
    ],
  },
  surgical_avr: {
    name: "Surgical Aortic Valve Replacement",
    description: "Open-heart surgery to replace the aortic valve",
    color: "from-primary-500 to-cream-500",
    category: "surgery",
    type: "procedure",
    image: "/images/savr.png",
    summary:
      "An open-heart surgical procedure to replace a diseased aortic valve with a mechanical or tissue prosthesis.",
    needToKnow: [
      "General anaesthesia and heart-lung bypass required",
      "Typically 4-7 days hospital stay",
      "Recovery period approximately 6-12 weeks",
      "Long-term medication management necessary",
      "Follow-up with regular echocardiography",
    ],
    steps: [
      {
        id: 1,
        title: "Preoperative Assessment",
        subtitle: "Comprehensive surgical and cardiac evaluation",
        description:
          "Detailed evaluation to assess surgical risk and plan the optimal valve replacement strategy.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Echocardiography and angiography for valve and coronary assessment",
          "Blood tests and anaesthetic consultation",
          "Risk stratification and patient education",
          "Medication review and optimization",
        ],
      },
      {
        id: 2,
        title: "Surgical Valve Replacement",
        subtitle: "Open-heart aortic valve surgery",
        description:
          "Replacement of the diseased aortic valve with a mechanical or tissue prosthesis under general anaesthesia.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "3-5 hours",
        details: [
          "General anaesthesia and heart-lung bypass",
          "Surgical access via sternotomy",
          "Removal of diseased valve",
          "Implantation of new valve and closure",
        ],
      },
      {
        id: 3,
        title: "ICU Recovery",
        subtitle: "Intensive postoperative monitoring",
        description:
          "Initial recovery in intensive care for close monitoring and stabilization.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "1-2 days",
        details: [
          "Mechanical ventilation and weaning",
          "Hemodynamic and rhythm monitoring",
          "Pain management and infection prevention",
          "Early mobilization planning",
        ],
      },
      {
        id: 4,
        title: "Ward Recovery",
        subtitle: "Progressive rehabilitation and discharge planning",
        description:
          "Continued recovery on the ward with physiotherapy and education for home care.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "3-5 days",
        details: [
          "Progressive mobilization and physiotherapy",
          "Wound care and medication adjustment",
          "Education on valve type, anticoagulation, and lifestyle",
          "Discharge planning and follow-up arrangement",
        ],
      },
      {
        id: 5,
        title: "Long-term Follow-up",
        subtitle: "Ongoing valve surveillance and care",
        description:
          "Regular follow-up for valve function, medication management, and lifestyle optimization.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Serial echocardiography for valve assessment",
          "Anticoagulation monitoring if mechanical valve",
          "Infective endocarditis prevention education",
          "Activity and rehabilitation support",
        ],
      },
    ],
  },
  surgical_mvr: {
    name: "Surgical Mitral Valve Replacement",
    description:
      "Open-heart or minimally invasive surgery to replace the mitral valve",
    color: "from-primary-500 to-sage-500",
    category: "surgery",
    type: "procedure",
    image: "/images/minimitral.png",
    summary:
      "Replacement of a severely damaged mitral valve with a mechanical or biological prosthesis through open-heart or minimally invasive techniques.",
    needToKnow: [
      "Procedure duration: 3-5 hours",
      "General anaesthesia required",
      "Option of minimally invasive approach available",
      "Hospital stay usually 5-7 days",
      "Recovery period approximately 6-12 weeks",
    ],
    steps: [
      {
        id: 1,
        title: "Assessment & Planning",
        subtitle: "Preoperative evaluation and surgical planning",
        description:
          "Comprehensive assessment including imaging and anaesthetic review to determine best surgical approach.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Echocardiography and angiography for mitral valve assessment",
          "Discussion of open-heart versus minimally invasive approach",
          "Anaesthetic and surgical risk assessment",
          "Patient education and consent",
        ],
      },
      {
        id: 2,
        title: "Surgical Procedure",
        subtitle: "Mitral valve replacement (open or minimally invasive)",
        description:
          "Replacement of the mitral valve with a prosthesis using the most appropriate surgical technique.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "3-5 hours",
        details: [
          "General anaesthesia and heart-lung bypass",
          "Surgical access via sternotomy or minimally invasive incision",
          "Excision of diseased mitral valve",
          "Implantation of mechanical or tissue prosthesis",
        ],
      },
      {
        id: 3,
        title: "ICU Recovery",
        subtitle: "Intensive monitoring and stabilization",
        description:
          "Immediate postoperative recovery in intensive care for close monitoring and stabilization.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "1-2 days",
        details: [
          "Mechanical ventilation and gradual weaning",
          "Hemodynamic and rhythm monitoring",
          "Pain management and infection prevention",
          "Early mobilization planning",
        ],
      },
      {
        id: 4,
        title: "Ward Recovery & Rehabilitation",
        subtitle: "Progressive activity and discharge planning",
        description:
          "Continued recovery with physiotherapy and education to support return home.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "3-5 days",
        details: [
          "Progressive mobilization and physiotherapy",
          "Wound care and medication management",
          "Education on valve care and anticoagulation",
          "Discharge planning and home support",
        ],
      },
      {
        id: 5,
        title: "Postoperative Management",
        subtitle: "Long-term follow-up and care",
        description:
          "Ongoing care for valve surveillance, anticoagulation, and lifestyle optimization.",
        icon: () => React.createElement(FileText, { className: "w-5 h-5" }),
        duration: "6-12 weeks and beyond",
        details: [
          "Regular echocardiographic assessment",
          "Anticoagulation and medication management",
          "Rehabilitation and activity progression",
          "Long-term clinic follow-up",
        ],
      },
    ],
  },
  ross_procedure: {
    name: "Ross Procedure",
    description:
      "Complex aortic valve replacement surgery using patient's own pulmonary valve",
    color: "from-accent-500 to-primary-500",
    category: "surgery",
    type: "procedure",
    image: "/images/ross.png",
    summary:
      "Specialized surgery to replace a diseased aortic valve using your own pulmonary valve, while a donor valve replaces the pulmonary valve.",
    needToKnow: [
      "General anaesthesia and heart-lung bypass",
      "Hospital stay of 7-10 days",
      "Recovery period approximately 8-12 weeks",
      "Long-term follow-up essential",
      "Ideal for younger patients due to durability and growth capability",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Surgical Evaluation",
        subtitle: "Detailed assessment and planning",
        description:
          "Comprehensive cardiac and surgical evaluation to ensure suitability for the Ross procedure.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Echocardiography and cardiac MRI for valve and heart assessment",
          "Coronary angiography if indicated",
          "Anaesthetic and surgical risk evaluation",
          "Patient education and consent",
        ],
      },
      {
        id: 2,
        title: "Ross Surgery",
        subtitle: "Complex double valve replacement",
        description:
          "Replacement of the aortic valve with the patient's own pulmonary valve, and pulmonary valve replaced with a donor valve.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "5-8 hours",
        details: [
          "General anaesthesia and heart-lung bypass",
          "Removal of diseased aortic valve",
          "Mobilization and transfer of pulmonary valve to aortic position",
          "Replacement of pulmonary valve with donor (homograft) valve",
          "Precise surgical technique for valve alignment and function",
        ],
      },
      {
        id: 3,
        title: "ICU Recovery",
        subtitle: "Critical postoperative monitoring",
        description:
          "Immediate recovery in intensive care for stabilization and early complication detection.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "2-3 days",
        details: [
          "Mechanical ventilation support",
          "Hemodynamic, rhythm, and fluid balance monitoring",
          "Pain management and infection prevention",
          "Early physiotherapy initiation",
        ],
      },
      {
        id: 4,
        title: "Ward Recovery",
        subtitle: "Rehabilitation and discharge planning",
        description:
          "Progressive recovery on the ward with physiotherapy and education for home care.",
        icon: () => React.createElement(UserCheck, { className: "w-5 h-5" }),
        duration: "5-7 days",
        details: [
          "Continued physiotherapy and mobilization",
          "Wound care and medication adjustment",
          "Education on activity, wound, and infection signs",
          "Discharge planning and support",
        ],
      },
      {
        id: 5,
        title: "Long-term Follow-up",
        subtitle: "Ongoing dual valve surveillance",
        description:
          "Regular follow-up to monitor both aortic and pulmonary valve function and overall heart health.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Serial echocardiography for both valves",
          "Endocarditis prevention education",
          "Activity and lifestyle guidance",
          "Assessment for late complications or reintervention",
        ],
      },
    ],
  },
  triclip_repair: {
    name: " Tricuspid Transcatheter Edge-to-Edge Repair (tTEER)",
    description: "Minimally invasive tricuspid valve repair using TriClip",
    color: "from-sage-500 to-accent-500",
    category: "interventional",
    type: "procedure",
    image: "/images/tteer.png",
    summary:
      "A minimally invasive catheter-based procedure using the TriClip device to repair the tricuspid valve and reduce tricuspid regurgitation.",
    needToKnow: [
      "Procedure duration: 1-3 hours",
      "General anaesthesia or deep sedation",
      "Typically a 1-3 day hospital stay",
      "Rapid improvement in symptoms",
      "Regular follow-up echocardiograms",
    ],
    steps: [
      {
        id: 1,
        title: "Evaluation and Planning",
        subtitle: "Multidisciplinary assessment and imaging",
        description:
          "Comprehensive assessment by heart team and advanced imaging to confirm suitability for TriClip repair.",
        icon: () => React.createElement(Heart, { className: "w-5 h-5" }),
        duration: "1-2 weeks",
        details: [
          "Echocardiography and cardiac imaging for valve assessment",
          "Heart team review and risk stratification",
          "Discussion of procedural benefits and risks",
          "Patient education and consent",
        ],
      },
      {
        id: 2,
        title: "TriClip Procedure",
        subtitle: "Catheter-based tricuspid valve repair",
        description:
          "Percutaneous placement of TriClip device under imaging guidance to reduce tricuspid regurgitation.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "1-3 hours",
        details: [
          "General anaesthesia or deep sedation",
          "Venous access via groin",
          "Transesophageal echocardiography (TOE) guidance",
          "Clip positioning and deployment",
          "Real-time assessment of valve function",
        ],
      },
      {
        id: 3,
        title: "Postoperative Care",
        subtitle: "Monitoring and recovery",
        description:
          "Observation and monitoring after the procedure to ensure stability and recovery.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "1-3 days",
        details: [
          "Cardiac rhythm and hemodynamic monitoring",
          "Post-procedure echocardiography",
          "Wound care and gradual mobilization",
          "Discharge planning and education",
        ],
      },
      {
        id: 4,
        title: "Follow-up Echocardiography",
        subtitle: "Ongoing valve assessment",
        description:
          "Regular follow-up with echocardiography to assess device function and heart status.",
        icon: () => React.createElement(Calendar, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Scheduled echocardiograms to monitor valve and device",
          "Symptom and medication review",
          "Lifestyle and activity guidance",
          "Assessment for late complications",
        ],
      },
    ],
  },
  rotational_atherectomy: {
    name: "Rotational Atherectomy",
    description: "Procedure to remove hardened plaque from coronary arteries",
    color: "from-primary-500 to-accent-500",
    category: "interventional",
    type: "procedure",
    image: "/images/rota.png",
    summary:
      "A procedure utilizing a rotating burr device to remove calcified plaque from coronary arteries, facilitating stent placement and blood flow restoration.",
    needToKnow: [
      "Procedure duration: 1-2 hours",
      "Local anaesthetic and sedation",
      "Usually requires overnight stay",
      "Performed during coronary angioplasty procedures",
      "Immediate symptom relief post-procedure",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Planning",
        subtitle: "Assessment and preparation",
        description:
          "Detailed evaluation and planning to determine need and suitability for rotational atherectomy.",
        icon: () => React.createElement(Search, { className: "w-5 h-5" }),
        duration: "1-7 days",
        details: [
          "Coronary angiography to identify calcified lesions",
          "Medication review and optimization",
          "Discussion of procedural risks and benefits",
          "Consent and pre-procedure instructions",
        ],
      },
      {
        id: 2,
        title: "Atherectomy Procedure",
        subtitle: "Plaque modification and vessel preparation",
        description:
          "Use of a rotating burr to remove hardened plaque and prepare the artery for stenting.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "1-2 hours",
        details: [
          "Local anaesthetic and sedation",
          "Catheter insertion via wrist or groin",
          "Rotating burr advanced to calcified segment",
          "Plaque ablation and vessel preparation for stenting",
        ],
      },
      {
        id: 3,
        title: "Post-Procedure Recovery",
        subtitle: "Monitoring and stabilization",
        description:
          "Observation and monitoring for complications following the procedure.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "4-24 hours",
        details: [
          "Puncture site and cardiac rhythm monitoring",
          "Assessment for chest pain or complications",
          "Medication adjustment and optimization",
          "Discharge planning and instructions",
        ],
      },
      {
        id: 4,
        title: "Long-term Management",
        subtitle: "Ongoing care and follow-up",
        description:
          "Regular follow-up to monitor stent function and optimize cardiovascular health.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "Lifelong",
        details: [
          "Clinic visits for symptom and medication review",
          "Repeat imaging if indicated",
          "Lifestyle and risk factor modification",
          "Assessment for recurrent symptoms or restenosis",
        ],
      },
    ],
  },
  ivus: {
    name: "Intravascular Ultrasound (IVUS)",
    description: "Detailed ultrasound imaging within coronary arteries",
    color: "from-blue-500 to-teal-500",
    category: "imaging",
    type: "procedure",
    image: "/images/ivus.png",
    summary:
      "Intravascular ultrasound (IVUS) procedure using a specialized catheter (e.g., Boston Scientific AVVIGO system) to visualize the inside of coronary arteries and optimize stent placement.",
    needToKnow: [
      "Performed alongside coronary angiography and intervention",
      "Adds approximately 15-20 minutes to procedure time",
      "Provides detailed vessel wall and plaque information",
      "Improves accuracy of coronary stent placement",
      "Helps predict long-term treatment outcomes",
    ],
    steps: [
      {
        id: 1,
        title: "Preparation & Access",
        subtitle: "Patient setup and procedure planning",
        description:
          "Patient preparation and vascular access for IVUS imaging, typically during coronary angiography.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "10-20 minutes",
        details: [
          "Review of indications for IVUS use",
          "Standard angiography access via wrist or groin",
          "Anticoagulation and medication review",
          "Patient education and consent",
        ],
      },
      {
        id: 2,
        title: "IVUS Imaging Procedure",
        subtitle: "High-resolution intravascular imaging",
        description:
          "Insertion of IVUS catheter into coronary artery and acquisition of detailed vessel images.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "15-20 minutes",
        details: [
          "Advancement of IVUS catheter to target vessel",
          "Real-time ultrasound imaging of vessel wall and plaque",
          "Measurement of vessel size and lesion characteristics",
          "Identification of stent landing zones",
        ],
      },
      {
        id: 3,
        title: "Post-Imaging Care",
        subtitle: "Catheter removal and observation",
        description:
          "Safe removal of IVUS catheter and monitoring for immediate complications.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "10-30 minutes",
        details: [
          "Catheter withdrawal and hemostasis at access site",
          "Observation for bleeding or discomfort",
          "Review of initial imaging findings",
          "Preparation for stent placement if indicated",
        ],
      },
      {
        id: 4,
        title: "Integration with Stent Placement",
        subtitle: "Optimizing intervention based on IVUS",
        description:
          "Utilization of IVUS findings to guide and optimize coronary stent placement and long-term outcomes.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "During intervention",
        details: [
          "Precise stent sizing and selection",
          "Verification of stent expansion and apposition",
          "Post-stenting IVUS to confirm optimal result",
          "Documentation for future follow-up",
        ],
      },
    ],
  },
  right_heart_catheterisation: {
    name: "Right Heart Catheterisation",
    description:
      "Diagnostic procedure to evaluate right heart function and pulmonary circulation",
    color: "from-primary-500 to-sage-500",
    category: "interventional",
    type: "procedure",
    image: "/images/catheter.png",
    summary:
      "A minimally invasive diagnostic procedure using a thin catheter to measure pressures and blood flow in the right side of the heart and pulmonary arteries, helping diagnose conditions like pulmonary hypertension and heart failure.",
    needToKnow: [
      "Usually performed as day procedure or overnight stay",
      "Local anaesthetic and mild sedation typically used",
      "Takes approximately 30-60 minutes",
      "Access through neck or groin vein",
      "Precise pressure measurements guide treatment decisions",
      "Low-risk procedure with high diagnostic value",
    ],
    steps: [
      {
        id: 1,
        title: "Pre-Procedure Preparation",
        subtitle: "Assessment and setup for catheterisation",
        description:
          "Comprehensive preparation including IV access, monitoring setup, and patient positioning for safe catheter insertion.",
        icon: () => React.createElement(Clipboard, { className: "w-5 h-5" }),
        duration: "30-45 minutes",
        details: [
          "IV line placement and medication administration",
          "Continuous heart monitoring setup",
          "Local anaesthetic to insertion site",
          "Sterile draping and positioning",
        ],
      },
      {
        id: 2,
        title: "Catheter Insertion and Navigation",
        subtitle: "Accessing the right heart chambers",
        description:
          "Insertion of a thin, flexible catheter through a vein and careful navigation to the right ventricle and pulmonary arteries.",
        icon: () => React.createElement(Activity, { className: "w-5 h-5" }),
        duration: "15-30 minutes",
        details: [
          "Venous access through neck or groin",
          "X-ray guidance for catheter positioning",
          "Navigation through right atrium to right ventricle",
          "Advancement into pulmonary arteries",
        ],
      },
      {
        id: 3,
        title: "Pressure Measurements and Data Collection",
        subtitle: "Comprehensive hemodynamic assessment",
        description:
          "Detailed measurement of pressures in different heart chambers and calculation of cardiac output and pulmonary resistance.",
        icon: () => React.createElement(Monitor, { className: "w-5 h-5" }),
        duration: "15-30 minutes",
        details: [
          "Right atrial pressure measurement",
          "Right ventricular pressure recording",
          "Pulmonary artery pressure assessment",
          "Cardiac output and resistance calculations",
        ],
      },
      {
        id: 4,
        title: "Recovery and Results Review",
        subtitle: "Post-procedure monitoring and interpretation",
        description:
          "Careful monitoring during recovery with prompt review of results to guide treatment recommendations.",
        icon: () => React.createElement(CheckCircle, { className: "w-5 h-5" }),
        duration: "2-4 hours",
        details: [
          "Observation for bleeding or complications",
          "Gradual mobilisation when appropriate",
          "Results interpretation and discussion",
          "Treatment plan development based on findings",
        ],
      },
    ],
  },
};
