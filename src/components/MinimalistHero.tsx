import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Users, Award } from 'lucide-react';

const MinimalistHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: <Users className="w-5 h-5" />, number: "5700+", label: "Patients Treated", delay: 0 },
    { icon: <Award className="w-5 h-5" />, number: "36+", label: "Years Experience", delay: 0.2 },
    { icon: <Heart className="w-5 h-5" />, number: "4", label: "Specialist Doctors", delay: 0.4 },
    { icon: <Activity className="w-5 h-5" />, number: "4", label: "Clinic Locations", delay: 0.6 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('patient-journey');
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

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay + 1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Subtle Background Elements with Parallax */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          style={{ 
            y: scrollY * 0.1,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"
          style={{ 
            y: scrollY * 0.15,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
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
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        
        <motion.div 
          className="text-center space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Professional Brand Indicator */}
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-gray-600 font-medium text-sm">Heart Clinic Melbourne</span>
          </motion.div>
          
          {/* Main Headline - Clean and Professional */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-gray-900 leading-[0.85] tracking-tight">
              Expert Cardiac
              <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent">
                Care
              </span>
            </h1>
            
            {/* Clear Value Proposition */}
            <p className="text-2xl lg:text-3xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
              Comprehensive cardiovascular services across four convenient locations in Melbourne's southeast
            </p>
          </motion.div>

          {/* Professional Statistics */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm"
                variants={statsVariants}
                custom={stat.delay}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-3">
                  <div className="bg-gray-50 text-gray-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto">
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-gray-900"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: stat.delay + 1.5, duration: 0.5 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Clear Call-to-Action */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-medium text-lg"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#1f2937"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Schedule Consultation
              </motion.button>
              <motion.button 
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-medium text-lg"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "#9ca3af",
                  backgroundColor: "#f9fafb"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                View Locations
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="group flex flex-col items-center space-y-2 text-gray-400 hover:text-gray-600 transition-all duration-300"
            whileHover={{ y: -5 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-xs font-medium tracking-wider uppercase">Continue</span>
            <div className="w-6 h-10 border border-gray-300 group-hover:border-gray-400 rounded-full flex justify-center transition-colors duration-300">
              <motion.div 
                className="w-1 h-3 bg-gray-300 group-hover:bg-gray-400 rounded-full mt-2 transition-colors duration-300"
                animate={{ y: [0, 10, 0] }}
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
        className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gray-900 origin-left"
          style={{ 
            scaleX: Math.min(1, scrollY / window.innerHeight)
          }}
        />
      </motion.div>
    </section>
  );
};

export default MinimalistHero;