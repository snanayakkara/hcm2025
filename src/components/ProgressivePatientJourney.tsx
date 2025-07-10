import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Phone, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Activity, 
  Heart, 
  CheckCircle,
  Clock
} from 'lucide-react';

const ProgressivePatientJourney: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const journeySteps = [
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
      ]
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
      ]
    },
    {
      id: 3,
      title: "Medical Consultation",
      subtitle: "Expert cardiovascular assessment",
      description: "Comprehensive evaluation by our qualified cardiologists with personalized treatment planning.",
      icon: <Stethoscope className="w-5 h-5" />,
      duration: "45-60 minutes",
      details: [
        "Comprehensive medical history review",
        "Thorough cardiovascular examination",
        "Risk factor assessment",
        "Clear medical explanations"
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

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
            setActiveStep(stepIndex);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleSteps]);

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
    <section id="patient-journey" className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 tracking-tight leading-tight"
            variants={stepVariants}
          >
            Patient Care
            <span className="block text-slate-400">
              Process
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed"
            variants={stepVariants}
          >
            A systematic approach to cardiovascular care designed for optimal patient outcomes
          </motion.p>
        </motion.div>

        {/* Care Process Steps */}
        <div className="space-y-24">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              ref={el => stepRefs.current[index] = el}
              variants={stepVariants}
              initial="hidden"
              animate={visibleSteps.includes(index) ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Step Number */}
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={visibleSteps.includes(index) ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-7xl font-bold text-slate-200 leading-none">
                    {step.id.toString().padStart(2, '0')}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="lg:col-span-6 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={visibleSteps.includes(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-slate-800 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">{step.title}</h3>
                        <p className="text-slate-500 font-medium">{step.subtitle}</p>
                      </div>
                    </motion.div>
                    
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {step.duration}</span>
                    </div>
                  </div>

                  <p className="text-lg text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  <motion.div 
                    className="grid sm:grid-cols-2 gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate={visibleSteps.includes(index) ? "visible" : "hidden"}
                  >
                    {step.details.map((detail, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center space-x-2"
                        variants={{
                          hidden: { opacity: 0, x: -15 },
                          visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: idx * 0.1 }
                          }
                        }}
                        whileHover={{ x: 3 }}
                      >
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600 text-sm">{detail}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Visual Element */}
                <motion.div 
                  className="lg:col-span-4"
                  variants={cardVariants}
                  initial="hidden"
                  animate={visibleSteps.includes(index) ? "visible" : "hidden"}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 transition-all duration-500 ${
                    activeStep === index ? 'shadow-lg' : 'shadow-sm'
                  }`}>
                    <div className="text-center space-y-4">
                      <motion.div 
                        className="bg-slate-50/80 w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.icon}
                      </motion.div>
                      <div>
                        <div className="text-xl font-bold text-slate-800">Step {step.id}</div>
                        <div className="text-slate-500 text-sm">{step.subtitle}</div>
                      </div>
                      
                      {/* Progress Indicator */}
                      <div className="flex justify-center space-x-1">
                        {journeySteps.map((_, stepIdx) => (
                          <motion.div
                            key={stepIdx}
                            className={`h-1 rounded-full transition-all duration-500 ${
                              stepIdx <= index ? 'bg-slate-800 w-6' : 'bg-slate-200 w-2'
                            }`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: stepIdx <= index ? 1 : 0.3 }}
                            transition={{ duration: 0.5, delay: stepIdx * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

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
                Begin Your Care Journey
              </motion.h3>
              <motion.p 
                className="text-xl text-slate-300 max-w-2xl mx-auto font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Schedule your consultation with our cardiovascular specialists
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
    </section>
  );
};

export default ProgressivePatientJourney;