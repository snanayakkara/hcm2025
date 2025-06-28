import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Clock, 
  User, 
  FileText, 
  Stethoscope, 
  Calendar, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Download,
  Play,
  Users,
  MapPin,
  Zap
} from 'lucide-react';

const InteractiveJourneyMaps: React.FC = () => {
  const [selectedProcedure, setSelectedProcedure] = useState('tavi');
  const [activeStage, setActiveStage] = useState(0);
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

  const procedures = {
    tavi: {
      name: "TAVI (Transcatheter Aortic Valve Implantation)",
      description: "Minimally invasive procedure to replace a diseased aortic valve",
      color: "from-rose-500 to-pink-600",
      icon: <Heart className="w-6 h-6" />,
      totalDuration: "6-12 months",
      stages: [
        {
          title: "Initial Symptoms & Diagnosis",
          duration: "1-2 weeks",
          icon: <Stethoscope className="w-5 h-5" />,
          description: "Recognition of aortic stenosis symptoms and initial cardiac evaluation",
          touchpoints: ["GP consultation", "Cardiology referral", "Initial echocardiogram"],
          providers: ["General Practitioner", "Cardiologist", "Cardiac sonographer"],
          emotions: ["Concern about symptoms", "Anxiety about diagnosis", "Relief at getting answers"],
          decisions: ["Whether to seek medical attention", "Accepting referral to specialist"],
          documentation: ["Referral letter", "Initial test results", "Medical history"],
          complications: ["Delayed diagnosis", "Symptom progression"],
          support: ["Family support", "GP guidance", "Patient information leaflets"]
        },
        {
          title: "Pre-Procedure Assessment",
          duration: "2-4 weeks",
          icon: <Activity className="w-5 h-5" />,
          description: "Comprehensive evaluation to determine TAVI suitability and planning",
          touchpoints: ["Specialist consultation", "CT scan", "Heart team discussion"],
          providers: ["Interventional cardiologist", "Cardiac surgeon", "Anesthetist", "Radiologist"],
          emotions: ["Anxiety about procedure", "Hope for improvement", "Information overload"],
          decisions: ["Choosing TAVI vs surgery", "Timing of procedure", "Valve type selection"],
          documentation: ["Consent forms", "CT scan results", "Heart team recommendations"],
          complications: ["Unsuitable anatomy", "High-risk findings"],
          support: ["Heart team counseling", "Patient education sessions", "Family meetings"]
        },
        {
          title: "Procedure Preparation",
          duration: "1-2 days",
          icon: <Calendar className="w-5 h-5" />,
          description: "Hospital admission and immediate pre-procedure preparation",
          touchpoints: ["Hospital admission", "Pre-procedure checks", "Anesthesia consultation"],
          providers: ["Nursing staff", "Anesthetist", "Interventional team"],
          emotions: ["Pre-procedure anxiety", "Anticipation", "Trust in medical team"],
          decisions: ["Final consent confirmation", "Anesthesia preferences"],
          documentation: ["Admission paperwork", "Final consent", "Pre-procedure checklist"],
          complications: ["Last-minute health issues", "Procedure delays"],
          support: ["Nursing care", "Family presence", "Chaplain services"]
        },
        {
          title: "TAVI Procedure",
          duration: "2-3 hours",
          icon: <Heart className="w-5 h-5" />,
          description: "Transcatheter aortic valve implantation procedure",
          touchpoints: ["Catheter lab procedure", "Real-time monitoring", "Valve deployment"],
          providers: ["Interventional cardiologist", "Cardiac surgeon", "Anesthetist", "Cath lab team"],
          emotions: ["Under anesthesia", "Family anxiety in waiting room"],
          decisions: ["Valve positioning adjustments", "Additional interventions if needed"],
          documentation: ["Procedure notes", "Imaging results", "Valve specifications"],
          complications: ["Vascular complications", "Valve malposition", "Bleeding"],
          support: ["Expert medical team", "Family waiting area support"]
        },
        {
          title: "Hospital Recovery",
          duration: "2-5 days",
          icon: <Users className="w-5 h-5" />,
          description: "Post-procedure monitoring and initial recovery in hospital",
          touchpoints: ["ICU monitoring", "Ward transfer", "Mobility assessment"],
          providers: ["ICU nurses", "Ward nurses", "Physiotherapist", "Cardiologist"],
          emotions: ["Relief procedure is over", "Gradual improvement", "Eagerness to go home"],
          decisions: ["Discharge timing", "Medication adjustments", "Follow-up scheduling"],
          documentation: ["Recovery notes", "Discharge summary", "Medication list"],
          complications: ["Bleeding", "Arrhythmias", "Vascular issues"],
          support: ["Nursing care", "Family visits", "Physiotherapy"]
        },
        {
          title: "Discharge Process",
          duration: "1 day",
          icon: <FileText className="w-5 h-5" />,
          description: "Transition from hospital to home care",
          touchpoints: ["Discharge planning", "Medication review", "Follow-up booking"],
          providers: ["Discharge nurse", "Pharmacist", "GP communication"],
          emotions: ["Excitement to go home", "Anxiety about self-care", "Gratitude"],
          decisions: ["Home care arrangements", "Activity restrictions", "Emergency contacts"],
          documentation: ["Discharge letter", "Medication list", "Follow-up appointments"],
          complications: ["Transport issues", "Home care concerns"],
          support: ["Discharge planning", "Family preparation", "Community services"]
        },
        {
          title: "Follow-up Care (6 months)",
          duration: "6 months",
          icon: <Calendar className="w-5 h-5" />,
          description: "Short-term monitoring and recovery assessment",
          touchpoints: ["1-month check", "3-month echo", "6-month review"],
          providers: ["Cardiologist", "GP", "Cardiac nurse"],
          emotions: ["Gradual confidence building", "Appreciation of improvement"],
          decisions: ["Activity progression", "Medication adjustments", "Lifestyle changes"],
          documentation: ["Follow-up reports", "Echo results", "Progress notes"],
          complications: ["Valve dysfunction", "Endocarditis risk"],
          support: ["Cardiac rehabilitation", "Patient support groups", "Family support"]
        },
        {
          title: "Long-term Monitoring",
          duration: "Lifelong",
          icon: <Clock className="w-5 h-5" />,
          description: "Lifelong valve surveillance and cardiovascular care",
          touchpoints: ["Annual reviews", "Echo surveillance", "Emergency access"],
          providers: ["Cardiologist", "GP", "Emergency services"],
          emotions: ["Confidence in new valve", "Appreciation of life quality"],
          decisions: ["Long-term care planning", "Lifestyle optimization"],
          documentation: ["Annual reports", "Valve registry data", "Emergency protocols"],
          complications: ["Valve deterioration", "Endocarditis", "Other cardiac issues"],
          support: ["Ongoing medical care", "Patient education", "Support networks"]
        }
      ]
    },
    pacemaker: {
      name: "Permanent Pacemaker Implantation",
      description: "Device implantation to regulate heart rhythm",
      color: "from-blue-500 to-indigo-600",
      icon: <Zap className="w-6 h-6" />,
      totalDuration: "3-6 months",
      stages: [
        {
          title: "Initial Symptoms & Diagnosis",
          duration: "1-2 weeks",
          icon: <Stethoscope className="w-5 h-5" />,
          description: "Recognition of bradycardia or heart block symptoms",
          touchpoints: ["GP consultation", "ECG recording", "Cardiology referral"],
          providers: ["General Practitioner", "Cardiologist", "ECG technician"],
          emotions: ["Concern about symptoms", "Fatigue and dizziness", "Seeking answers"],
          decisions: ["Whether to seek medical attention", "Accepting specialist referral"],
          documentation: ["Referral letter", "ECG results", "Symptom diary"],
          complications: ["Syncope episodes", "Progressive symptoms"],
          support: ["Family support", "GP guidance", "Patient information"]
        },
        {
          title: "Pre-Procedure Assessment",
          duration: "1-2 weeks",
          icon: <Activity className="w-5 h-5" />,
          description: "Comprehensive evaluation to confirm pacemaker indication",
          touchpoints: ["Specialist consultation", "24-hour Holter", "Echo assessment"],
          providers: ["Electrophysiologist", "Cardiac technician", "Nurse specialist"],
          emotions: ["Understanding the need", "Anxiety about device", "Hope for symptom relief"],
          decisions: ["Pacemaker type selection", "Timing of implantation", "Lead configuration"],
          documentation: ["Holter results", "Echo report", "Pacemaker prescription"],
          complications: ["Intermittent symptoms", "Medication interactions"],
          support: ["Pacemaker education", "Device counseling", "Family meetings"]
        },
        {
          title: "Procedure Preparation",
          duration: "1 day",
          icon: <Calendar className="w-5 h-5" />,
          description: "Day of surgery preparation and admission",
          touchpoints: ["Day surgery admission", "Pre-procedure checks", "Consent process"],
          providers: ["Day surgery nurses", "Anesthetist", "Electrophysiologist"],
          emotions: ["Pre-procedure nerves", "Anticipation of relief", "Trust in team"],
          decisions: ["Final consent", "Anesthesia preferences", "Device settings"],
          documentation: ["Admission forms", "Consent documents", "Pre-procedure checklist"],
          complications: ["Last-minute health concerns", "Anticoagulation issues"],
          support: ["Nursing care", "Family support", "Pre-procedure counseling"]
        },
        {
          title: "Pacemaker Implantation",
          duration: "1-2 hours",
          icon: <Zap className="w-5 h-5" />,
          description: "Surgical implantation of pacemaker device and leads",
          touchpoints: ["Local anesthesia", "Lead placement", "Device testing"],
          providers: ["Electrophysiologist", "Cardiac technician", "Theatre nurses"],
          emotions: ["Under local anesthesia", "Awareness during procedure", "Relief when complete"],
          decisions: ["Lead positioning", "Device programming", "Threshold testing"],
          documentation: ["Procedure notes", "Device parameters", "X-ray confirmation"],
          complications: ["Lead displacement", "Pneumothorax", "Bleeding"],
          support: ["Surgical team expertise", "Real-time monitoring"]
        },
        {
          title: "Hospital Recovery",
          duration: "1-2 days",
          icon: <Users className="w-5 h-5" />,
          description: "Post-implantation monitoring and device optimization",
          touchpoints: ["Device check", "Wound assessment", "Mobility evaluation"],
          providers: ["Ward nurses", "Device technician", "Physiotherapist"],
          emotions: ["Immediate symptom relief", "Wound discomfort", "Eagerness to recover"],
          decisions: ["Discharge timing", "Activity restrictions", "Device settings"],
          documentation: ["Recovery notes", "Device interrogation", "Wound care plan"],
          complications: ["Lead displacement", "Pocket hematoma", "Infection risk"],
          support: ["Nursing care", "Device education", "Family involvement"]
        },
        {
          title: "Discharge Process",
          duration: "1 day",
          icon: <FileText className="w-5 h-5" />,
          description: "Transition to home with new pacemaker",
          touchpoints: ["Discharge planning", "Device education", "Follow-up scheduling"],
          providers: ["Discharge nurse", "Device specialist", "GP communication"],
          emotions: ["Excitement about improvement", "Anxiety about device care", "Gratitude"],
          decisions: ["Activity restrictions", "Device precautions", "Emergency protocols"],
          documentation: ["Discharge summary", "Device card", "Follow-up appointments"],
          complications: ["Wound care concerns", "Device anxiety"],
          support: ["Device education", "Family training", "Support materials"]
        },
        {
          title: "Follow-up Care",
          duration: "3 months",
          icon: <Calendar className="w-5 h-5" />,
          description: "Device monitoring and optimization period",
          touchpoints: ["2-week check", "6-week review", "3-month optimization"],
          providers: ["Device clinic", "Cardiologist", "GP"],
          emotions: ["Growing confidence", "Appreciation of improvement", "Device acceptance"],
          decisions: ["Activity progression", "Device settings", "Lifestyle adaptations"],
          documentation: ["Device reports", "Follow-up notes", "Progress assessment"],
          complications: ["Lead maturation", "Threshold changes", "Infection monitoring"],
          support: ["Device clinic", "Patient support groups", "Educational resources"]
        },
        {
          title: "Long-term Monitoring",
          duration: "Lifelong",
          icon: <Clock className="w-5 h-5" />,
          description: "Lifelong device management and cardiovascular care",
          touchpoints: ["6-monthly checks", "Remote monitoring", "Battery replacement"],
          providers: ["Device clinic", "Cardiologist", "Remote monitoring team"],
          emotions: ["Confidence with device", "Routine acceptance", "Quality of life appreciation"],
          decisions: ["Device replacement timing", "Technology upgrades", "Lifestyle optimization"],
          documentation: ["Device logs", "Remote monitoring data", "Replacement planning"],
          complications: ["Battery depletion", "Lead fracture", "Device recalls"],
          support: ["Ongoing device support", "Patient networks", "Technology updates"]
        }
      ]
    }
  };

  const currentProcedure = procedures[selectedProcedure as keyof typeof procedures];

  return (
    <section id="journey-maps" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Interactive Patient
            <span className="block text-rose-600">Journey Maps</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Detailed, step-by-step guides for each medical procedure, from initial consultation to full recovery and long-term care.
          </motion.p>
        </div>

        {/* Procedure Selection */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center space-x-4">
            {Object.entries(procedures).map(([key, procedure]) => (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedProcedure(key);
                  setActiveStage(0);
                }}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  selectedProcedure === key
                    ? `bg-gradient-to-r ${procedure.color} text-white shadow-lg scale-105`
                    : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm border border-slate-200'
                }`}
                whileHover={{ scale: selectedProcedure === key ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2 rounded-lg ${
                  selectedProcedure === key ? 'bg-white/20' : 'bg-slate-100'
                }`}>
                  <div className={selectedProcedure === key ? 'text-white' : 'text-slate-600'}>
                    {procedure.icon}
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-semibold">{procedure.name}</div>
                  <div className={`text-sm ${selectedProcedure === key ? 'text-white/80' : 'text-slate-500'}`}>
                    {procedure.totalDuration}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Timeline Header */}
            <div className={`bg-gradient-to-r ${currentProcedure.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{currentProcedure.name}</h3>
                  <p className="text-white/80">{currentProcedure.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80">Total Journey</div>
                  <div className="text-xl font-semibold">{currentProcedure.totalDuration}</div>
                </div>
              </div>
            </div>

            {/* Stage Navigation */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {currentProcedure.stages.map((stage, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStage(index)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      activeStage === index
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`p-1 rounded ${activeStage === index ? 'bg-white/20' : 'bg-white'}`}>
                      <div className={activeStage === index ? 'text-white' : 'text-slate-600'}>
                        {stage.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{stage.title}</div>
                      <div className={`text-xs ${activeStage === index ? 'text-white/80' : 'text-slate-500'}`}>
                        {stage.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Stage Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-slate-800 mb-2">
                        {currentProcedure.stages[activeStage].title}
                      </h4>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {currentProcedure.stages[activeStage].description}
                      </p>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Patient Touchpoints */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-slate-800 flex items-center space-x-2">
                          <User className="w-4 h-4 text-blue-600" />
                          <span>Patient Touchpoints</span>
                        </h5>
                        <ul className="space-y-1">
                          {currentProcedure.stages[activeStage].touchpoints.map((point, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-slate-600">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Healthcare Providers */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-slate-800 flex items-center space-x-2">
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span>Healthcare Providers</span>
                        </h5>
                        <ul className="space-y-1">
                          {currentProcedure.stages[activeStage].providers.map((provider, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                              <span className="text-sm text-slate-600">{provider}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Patient Emotions */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-slate-800 flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-rose-600" />
                          <span>Common Emotions</span>
                        </h5>
                        <ul className="space-y-1">
                          {currentProcedure.stages[activeStage].emotions.map((emotion, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                              <span className="text-sm text-slate-600">{emotion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Critical Decisions */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-slate-800 flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Key Decisions</span>
                        </h5>
                        <ul className="space-y-1">
                          {currentProcedure.stages[activeStage].decisions.map((decision, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                              <span className="text-sm text-slate-600">{decision}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Information */}
                  <div className="space-y-6">
                    {/* Stage Progress */}
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h5 className="font-semibold text-slate-800 mb-4">Stage Progress</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Stage {activeStage + 1} of {currentProcedure.stages.length}</span>
                          <span className="font-medium text-slate-800">{currentProcedure.stages[activeStage].duration}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((activeStage + 1) / currentProcedure.stages.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Documentation */}
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h5 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>Required Documentation</span>
                      </h5>
                      <ul className="space-y-2">
                        {currentProcedure.stages[activeStage].documentation.map((doc, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-blue-600" />
                            <span className="text-sm text-slate-700">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Support Resources */}
                    <div className="bg-emerald-50 rounded-2xl p-6">
                      <h5 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span>Support Available</span>
                      </h5>
                      <ul className="space-y-2">
                        {currentProcedure.stages[activeStage].support.map((support, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span className="text-sm text-slate-700">{support}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Potential Complications */}
                    <div className="bg-amber-50 rounded-2xl p-6">
                      <h5 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Potential Complications</span>
                      </h5>
                      <ul className="space-y-2">
                        {currentProcedure.stages[activeStage].complications.map((complication, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span className="text-sm text-slate-700">{complication}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                  <button
                    onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
                    disabled={activeStage === 0}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>Previous Stage</span>
                  </button>

                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-200">
                      <Download className="w-4 h-4" />
                      <span>Download Guide</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all duration-200">
                      <Play className="w-4 h-4" />
                      <span>Watch Video</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveStage(Math.min(currentProcedure.stages.length - 1, activeStage + 1))}
                    disabled={activeStage === currentProcedure.stages.length - 1}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Need More Information?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Our team is here to guide you through every step of your journey. Contact us for personalized information about your specific procedure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-rose-500 text-white px-8 py-3 rounded-xl hover:bg-rose-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold">
                <Phone className="w-5 h-5" />
                <span>Call Our Team</span>
              </button>
              <button className="border-2 border-rose-500 text-rose-600 px-8 py-3 rounded-xl hover:bg-rose-50 transition-colors duration-200 font-semibold">
                Download Complete Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveJourneyMaps;