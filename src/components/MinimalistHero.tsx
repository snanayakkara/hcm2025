import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Users, Award, ArrowDown } from 'lucide-react';

const MinimalistHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: <Users className="w-4 h-4" />, number: "5700+", label: "Patients Treated", delay: 0 },
    { icon: <Award className="w-4 h-4" />, number: "36+", label: "Years Experience", delay: 0.1 },
    { icon: <Heart className="w-4 h-4" />, number: "4", label: "Specialist Doctors", delay: 0.2 },
    { icon: <Activity className="w-4 h-4" />, number: "6", label: "Hospital Locations", delay: 0.3 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
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

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay + 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-cream-50 via-white to-primary-50/20 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-sage-200/30 rounded-full blur-3xl"
          style={{ 
            y: scrollY * 0.1,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-3xl"
          style={{ 
            y: scrollY * 0.15,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 min-h-screen flex flex-col justify-center pt-24">
        
        <motion.div 
          className="text-center space-y-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Professional Brand Indicator */}
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary-200/50 shadow-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart className="w-4 h-4 text-primary-500" />
            <span className="text-secondary-600 font-medium text-sm">Heart Clinic Melbourne</span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.div className="space-y-12" variants={itemVariants}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-secondary-800 leading-[0.9] tracking-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent">
                Heart Clinic Melbourne
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p className="text-xl lg:text-2xl text-secondary-500 max-w-3xl mx-auto leading-relaxed font-light">
              Comprehensive cardiovascular services across Melbourne's southeast with a focus on personalized, compassionate care
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-secondary-200/50 shadow-sm"
                variants={statsVariants}
                custom={stat.delay}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-4">
                  <div className="bg-secondary-100/80 text-secondary-600 w-10 h-10 rounded-xl flex items-center justify-center mx-auto">
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-secondary-800"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: stat.delay + 1.2, duration: 0.5 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-secondary-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call-to-Action */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                className="bg-secondary-800 text-white px-10 py-4 rounded-2xl font-medium text-lg shadow-sm"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "#1e293b",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Schedule Consultation
              </motion.button>
              <motion.button 
                className="border-2 border-secondary-200 text-secondary-600 px-10 py-4 rounded-2xl font-medium text-lg hover:border-secondary-300 hover:bg-secondary-50/50"
                whileHover={{ 
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                View Locations
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="group flex flex-col items-center space-y-2 text-secondary-400 hover:text-secondary-600 transition-all duration-300"
            whileHover={{ y: -3 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-xs font-medium tracking-wider uppercase">Continue</span>
            <div className="w-6 h-10 border border-secondary-300 group-hover:border-secondary-400 rounded-full flex justify-center transition-colors duration-300">
              <motion.div 
                className="w-1 h-3 bg-secondary-300 group-hover:bg-secondary-400 rounded-full mt-2 transition-colors duration-300"
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-0.5 bg-secondary-100 z-40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 origin-left"
          style={{ 
            scaleX: Math.min(1, scrollY / window.innerHeight)
          }}
        />
      </motion.div>
    </section>
  );
};

export default MinimalistHero;