import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROFILE } from '@/constants.tsx';

const SLOGAN = '在小城创造无限可能';

export const HeroSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const gradientX = useTransform(smoothX, [0, window.innerWidth], [0, 100]);
  const gradientY = useTransform(smoothY, [0, window.innerHeight], [0, 100]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let currentIndex = 0;
    const chars = SLOGAN.split('');
    
    const typeInterval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayText(chars.slice(0, currentIndex + 1).join(''));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: customDelay,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const identityVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 2.5 + i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([x, y]) => `
              radial-gradient(ellipse 80% 50% at ${x}% ${y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at ${100 - Number(x)}% ${100 - Number(y)}%, rgba(45, 212, 191, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)
            `
          )
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            x: useTransform(smoothX, [0, window.innerWidth], [-100, 100]),
            y: useTransform(smoothY, [0, window.innerHeight], [-100, 100]),
            left: '50%',
            top: '40%',
            translateX: '-50%',
            translateY: '-50%',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
            x: useTransform(smoothX, [0, window.innerWidth], [50, -50]),
            y: useTransform(smoothY, [0, window.innerHeight], [50, -50]),
            left: '30%',
            top: '60%',
            translateX: '-50%',
            translateY: '-50%',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"
            style={{
              left: `${20 + i * 30}%`,
              height: '100%',
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl">
        <div className="relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight select-none">
            {displayText.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="inline-block text-gradient-premium"
                style={{ 
                  textShadow: '0 0 80px rgba(139, 92, 246, 0.3), 0 0 40px rgba(45, 212, 191, 0.2)',
                }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: showCursor ? 1 : 0 }}
              className="inline-block w-[3px] md:w-[4px] h-[1em] bg-gradient-to-b from-purple-400 to-teal-400 ml-1 align-middle"
              style={{ 
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(45, 212, 191, 0.6)',
                marginBottom: '0.1em'
              }}
            />
          </h1>
          
          {isTypingComplete && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
            />
          )}
        </div>

        <motion.div
          custom={2.2}
          variants={fadeInVariants}
          initial="hidden"
          animate={isTypingComplete ? "visible" : "hidden"}
          className="mt-12 flex items-center gap-4 text-xl md:text-2xl font-medium"
        >
          <motion.span 
            className="w-16 h-px bg-gradient-to-r from-transparent to-white/40"
            initial={{ scaleX: 0 }}
            animate={isTypingComplete ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            style={{ transformOrigin: 'right' }}
          />
          <span className="tracking-widest text-white/80">{PROFILE.name}</span>
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-teal-400 animate-pulse" />
          <span className="tracking-[0.3em] text-white/50 font-light uppercase text-lg">{PROFILE.englishName}</span>
          <motion.span 
            className="w-16 h-px bg-gradient-to-l from-transparent to-white/40"
            initial={{ scaleX: 0 }}
            animate={isTypingComplete ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
          {PROFILE.identities.map((identity, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={identityVariants}
              initial="hidden"
              animate={isTypingComplete ? "visible" : "hidden"}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.3)'
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm cursor-default transition-colors duration-300 hover:bg-white/10 hover:border-purple-500/30"
            >
              <motion.span 
                className="text-xl"
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3 + index,
                }}
              >
                {identity.icon}
              </motion.span>
              <span className="text-sm md:text-base font-medium text-white/80">{identity.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          custom={3.2}
          variants={fadeInVariants}
          initial="hidden"
          animate={isTypingComplete ? "visible" : "hidden"}
          className="mt-10 text-base md:text-lg text-white/40 font-light max-w-xl leading-relaxed"
        >
          {PROFILE.tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingComplete ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span 
          className="text-xs uppercase tracking-[0.3em] text-white/30 font-light"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Explore
        </motion.span>
        <motion.div
          className="relative w-6 h-10 rounded-full border border-white/20 flex justify-center"
        >
          <motion.div
            className="w-1 h-2 bg-gradient-to-b from-purple-400 to-teal-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      <div className="absolute top-1/4 right-[10%] w-32 h-32 opacity-20 pointer-events-none">
        <motion.div
          className="w-full h-full border border-purple-500/30 rounded-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="absolute bottom-1/4 left-[10%] w-24 h-24 opacity-15 pointer-events-none">
        <motion.div
          className="w-full h-full border border-teal-500/30 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};
