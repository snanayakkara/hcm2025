import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import SplitText from './SplitText';
import { useMobileDetection } from '../hooks/useMobileDetection';
import Button from './ui/Button';
import { Calendar, MapPin, FileText } from 'lucide-react';

const OPEN_REFERRAL_FORM_EVENT = 'hcm:open-referral-form';

const MinimalistHero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobileDetection();
  const shouldReduceMotion = useReducedMotion();
  const enableAmbientMotion = !shouldReduceMotion && isHeroInView;

  // Cursor trail glow
  const glowX = useMotionValue(-200);
  const glowY = useMotionValue(-200);
  const smoothGlowX = useSpring(glowX, { stiffness: 80, damping: 30 });
  const smoothGlowY = useSpring(glowY, { stiffness: 80, damping: 30 });

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || shouldReduceMotion) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      glowX.set(e.clientX - rect.left);
      glowY.set(e.clientY - rect.top);
    },
    [isMobile, shouldReduceMotion, glowX, glowY]
  );

  const handleHeroMouseLeave = useCallback(() => {
    glowX.set(-200);
    glowY.set(-200);
  }, [glowX, glowY]);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/images/hcmheartback.webp';
  }, []);

  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocations = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToConsultation = () => {
    const patientSection = document.getElementById('patients');
    if (patientSection) {
      patientSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openReferralForm = () => {
    window.dispatchEvent(new Event(OPEN_REFERRAL_FORM_EVENT));
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

  const dotGridVariants = {
    rest: {
      backgroundPosition: '0px 0px, 14px 14px',
      backgroundSize: '28px 28px, 28px 28px'
    },
    hover: {
      backgroundPosition: '4px 4px, 18px 18px',
      backgroundSize: '30px 30px, 30px 30px',
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 18
      }
    }
  };

  const dustParticles = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        yOffset: -30 - Math.random() * 20,
        xOffset: (Math.random() - 0.5) * 20,
        duration: 12 + Math.random() * 8,
        delay: Math.random() * 10,
      })),
    []
  );

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-cream-50 via-white to-primary-50/20 overflow-hidden"
      initial="rest"
      animate="rest"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      {/* Cursor trail glow */}
      {!isMobile && !shouldReduceMotion && (
        <motion.div
          className="absolute pointer-events-none -z-5"
          style={{
            x: smoothGlowX,
            y: smoothGlowY,
            width: 320,
            height: 320,
            marginLeft: -160,
            marginTop: -160,
            background: 'radial-gradient(circle, rgba(20,135,146,0.08) 0%, rgba(59,215,214,0.04) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />
      )}
      <motion.div
        variants={dotGridVariants}
        className="absolute inset-0 -z-20"
        style={{
          backgroundColor: '#f0fdff',
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(20, 135, 146, 0.22) 1px, transparent 0),
            radial-gradient(circle at 13px 13px, rgba(59, 215, 214, 0.16) 1px, transparent 0)
          `,
          opacity: 0.9
        }}
      />

      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-br from-white/70 via-transparent to-primary-50/40" />

      {/* Enhanced Floating Particles */}
      {enableAmbientMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Main visible particles */}
          <div className="opacity-40">
            <motion.div 
              className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary-400/80 rounded-full shadow-sm"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-accent-400/70 rounded-full shadow-sm"
              animate={{
                y: [0, 15, 0],
                x: [0, -8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-sage-400/60 rounded-full shadow-sm"
              animate={{
                y: [0, -12, 0],
                x: [0, 6, 0],
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </div>

          {/* Floating dust particles */}
          <div className="opacity-25">
            {dustParticles.map((particle, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-1 h-1 bg-primary-300/40 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, particle.yOffset, 0],
                  x: [0, particle.xOffset, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* Soft bokeh effects */}
          <div className="opacity-15">
            <motion.div
              className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-sage-200/25 to-primary-200/25 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5,
              }}
            />
            <motion.div
              className="absolute top-2/3 left-3/4 w-12 h-12 bg-gradient-to-r from-accent-200/20 to-cream-200/30 rounded-full blur-lg"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 8,
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className={`relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 min-h-screen flex flex-col justify-center pt-24 ${isMobile ? 'pb-12' : ''}`}>
        
        <motion.div 
          className="text-center space-y-20"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          
          {/* Main Headline */}
          <motion.div className="space-y-12" variants={itemVariants}>
            <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl sm:text-7xl lg:text-8xl'} font-bold text-secondary-800 leading-[0.9] tracking-tight`}>
              Welcome to
              <span className="block relative">
                {/* Image background container for text */}
                <div 
                  className="relative inline-block bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent"
                  style={{
                    ...(imageLoaded && {
                      backgroundImage: `url('/images/hcmheartback.webp')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }),
                    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
                  }}
                >
                  <SplitText delay={0.3} duration={0.03} disableInitialAnimation>
                    Heart Clinic Melbourne.
                  </SplitText>
                </div>
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p className={`${isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} text-secondary-500 max-w-3xl mx-auto leading-relaxed font-light`}>
              Heart Clinic Melbourne provides consultations, diagnostics, and advanced procedures with personalised, compassionate care.
            </p>
          </motion.div>

          {/* Call-to-Action */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className={`flex flex-col ${isMobile ? 'gap-4' : 'sm:flex-row sm:flex-wrap gap-4 sm:gap-6'} justify-center items-center`}>
              <Button 
                variant="primary"
                size="large"
                icon={Calendar}
                onClick={scrollToConsultation}
                isMobile={isMobile}
                magnetic
                className="bg-secondary-800 text-white hover:bg-secondary-900 shadow-sm"
              >
                Book Appointment
              </Button>
              <Button 
                variant="secondary"
                size="large"
                icon={FileText}
                onClick={openReferralForm}
                isMobile={isMobile}
                magnetic
                className="border-2 border-accent-200 text-accent-700 hover:border-accent-300 hover:bg-accent-50/50"
              >
                Send Referral
              </Button>
              <Button 
                variant="tertiary"
                size="large"
                icon={MapPin}
                onClick={scrollToLocations}
                isMobile={isMobile}
                magnetic
                className="text-secondary-600 hover:bg-secondary-50/50"
              >
                View Locations
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="group flex flex-col items-center space-y-2 text-secondary-400 hover:text-secondary-600 transition-all duration-300"
            whileHover={enableAmbientMotion ? { y: -3 } : undefined}
            animate={enableAmbientMotion ? { y: [0, -3, 0] } : { y: 0 }}
            transition={{ 
              duration: enableAmbientMotion ? 2 : 0,
              repeat: enableAmbientMotion ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <span className="text-xs font-medium tracking-wider uppercase">Continue</span>
            <div className="w-6 h-10 border border-secondary-300 group-hover:border-secondary-400 rounded-full flex justify-center transition-colors duration-300">
              <motion.div 
                className="w-1 h-3 bg-secondary-300 group-hover:bg-secondary-400 rounded-full mt-2 transition-colors duration-300"
                animate={enableAmbientMotion ? { y: [0, 8, 0] } : { y: 0 }}
                transition={{ 
                  duration: enableAmbientMotion ? 1.5 : 0,
                  repeat: enableAmbientMotion ? Infinity : 0,
                  ease: "easeInOut",
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
    </motion.section>
  );
};

export default MinimalistHero;
