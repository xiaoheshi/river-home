import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { SKILLS } from '@/constants.tsx';
import { Skill } from '@/types';

const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(startValue + (value - startValue) * easeOutQuart));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
};

const CircularProgress: React.FC<{ value: number; size?: number; strokeWidth?: number }> = ({ 
  value, 
  size = 80, 
  strokeWidth = 6 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const springValue = useSpring(0, { stiffness: 30, damping: 20 });
  const strokeDashoffset = useTransform(springValue, (v) => circumference - (v / 100) * circumference);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white">
          <AnimatedCounter value={value} />
          <span className="text-sm text-white/50">%</span>
        </span>
      </div>
    </div>
  );
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div 
        className="glass p-8 rounded-[2rem] h-full border border-white/5 hover:border-purple-500/30 transition-all duration-500"
        whileHover={{ 
          y: -8,
          boxShadow: '0 30px 60px -15px rgba(139, 92, 246, 0.2)'
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0"
            animate={isHovered ? { x: ['0%', '100%'] } : { x: '0%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full"
                animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-inner backdrop-blur-md"
                animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-3xl select-none filter drop-shadow-lg"
                  animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
                >
                  {skill.icon}
                </motion.span>
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{skill.name}</h3>
              <motion.div 
                className="h-1 bg-gradient-to-r from-purple-400 via-teal-400 to-indigo-400 rounded-full opacity-60"
                initial={{ width: '3rem' }}
                animate={isHovered ? { width: '8rem' } : { width: '3rem' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
          
          <CircularProgress value={skill.level} />
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {skill.items.map((item, i) => (
            <motion.span 
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.05) }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                borderColor: 'rgba(139, 92, 246, 0.3)'
              }}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-white/70 border border-white/10 transition-all duration-300 cursor-default"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SkillGrid: React.FC = () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="text-indigo-400 text-sm font-semibold tracking-[0.2em] uppercase">Skills</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-4">
            我的能力图谱
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            多年积累的技术栈，持续精进的专业能力
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SKILLS.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
