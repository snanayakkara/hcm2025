import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Heart, Shield } from 'lucide-react';

const About: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Award className="w-6 h-6 text-primary-600" />,
      title: "Clinical Excellence",
      description: "Recognised expertise in cardiovascular medicine with evidence-based treatment protocols.",
      color: "bg-primary-50/80",
      hoverColor: "hover:bg-primary-100/80"
    },
    {
      icon: <Users className="w-6 h-6 text-sage-600" />,
      title: "Specialist Team",
      description: "Cardiologists with advanced training from leading medical institutions.",
      color: "bg-sage-50/80",
      hoverColor: "hover:bg-sage-100/80"
    },
    {
      icon: <Heart className="w-6 h-6 text-accent-600" />,
      title: "Comprehensive Services",
      description: "Complete range of cardiovascular services from preventive care to advanced interventions.",
      color: "bg-accent-50/80",
      hoverColor: "hover:bg-accent-100/80"
    },
    {
      icon: <Shield className="w-6 h-6 text-cream-600" />,
      title: "Advanced Technology",
      description: "State-of-the-art diagnostic equipment and treatment technologies for optimal patient outcomes.",
      color: "bg-cream-50/80",
      hoverColor: "hover:bg-cream-100/80"
    }
  ];

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, features.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="about" className="py-32 bg-gradient-to-b from-white via-white to-primary-50/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Centred Header */}
        <motion.div 
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-secondary-800 leading-tight"
            variants={itemVariants}
          >
            Melbourne's Leading
            <span className="text-primary-600 block">
              Cardiovascular Specialists
            </span>
          </motion.h2>
        </motion.div>

        {/* Full-width centred description */}
        <motion.div 
          className="text-center mb-20 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Heart Clinic Melbourne provides comprehensive cardiovascular care with over two decades of clinical experience.
            </p>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Our team of sub-specialists delivers evidence-based treatment using the latest advanced diagnostic and therapeutic technologies, ensuring optimal cardiovascular health outcomes for you through a collaborative care approach.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-stretch">
          {/* Content - Cards */}
          <motion.div 
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full"
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`${feature.color} ${feature.hoverColor} p-8 rounded-2xl transition-all duration-500 cursor-pointer border border-secondary-200/50 flex flex-col h-full ${
                    activeFeature === index ? 'shadow-lg ring-2 ring-primary-200/50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    transformOrigin: 'center',
                    willChange: 'transform',
                    transform: activeFeature === index ? 'scale(1.02)' : 'scale(1)',
                    minHeight: '280px'
                  }}
                >
                  <div className="space-y-6 flex-1 flex flex-col">
                    <motion.div 
                      className="bg-white/80 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-secondary-800 flex-shrink-0">{feature.title}</h3>
                    <p className="text-secondary-600 leading-relaxed flex-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="rounded-3xl overflow-hidden shadow-xl flex-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ minHeight: '572px' }}
            >
              <motion.img
                src="/images/table_port.webp"
                alt="Medical professionals in consultation discussing patient care"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
