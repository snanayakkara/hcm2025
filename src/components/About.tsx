import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Heart, Shield, ChevronRight } from 'lucide-react';

const About: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Clinical Excellence",
      description: "Recognized expertise in cardiovascular medicine with evidence-based treatment protocols.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Specialist Team",
      description: "Board-certified cardiologists with advanced training from leading medical institutions.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Comprehensive Services",
      description: "Complete range of cardiovascular services from preventive care to advanced interventions.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Advanced Technology",
      description: "State-of-the-art diagnostic equipment and treatment technologies for optimal patient outcomes.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900">
                Melbourne's Leading
                <span className="text-blue-600 block">
                  Cardiovascular Specialists
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Heart Clinic Melbourne provides comprehensive cardiovascular care with over two decades of clinical experience. Our multidisciplinary team delivers evidence-based treatment using advanced diagnostic and therapeutic technologies.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We specialize in personalized treatment plans that address individual patient needs, ensuring optimal cardiovascular health outcomes through collaborative care approaches.
              </p>
            </motion.div>

            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`${feature.color} ${feature.hoverColor} p-6 rounded-xl transition-all duration-500 cursor-pointer transform ${
                    activeFeature === index ? 'scale-105 shadow-lg ring-2 ring-blue-200' : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="space-y-3">
                    <motion.div 
                      className="bg-white w-16 h-16 rounded-lg flex items-center justify-center shadow-md"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                    {activeFeature === index && (
                      <motion.div 
                        className="flex items-center text-blue-600 font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>Learn more</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical professionals in consultation discussing patient care"
                className="w-full h-[600px] object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
            
            {/* Achievement Card */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="w-6 h-6" />
                </motion.div>
                <p className="font-bold text-gray-900">Clinical Excellence</p>
                <p className="text-sm text-gray-600">Healthcare Leadership</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;