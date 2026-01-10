import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { SKILLS } from '@/constants.tsx';
import { Skill } from '@/types';
import InfiniteScroll from '@/components/InfiniteScroll';

const AnimatedCounter: React.FC<{ value: number; duration?: number; suffix?: string }> = ({ value, duration = 2, suffix = '' }) => {
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

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const CircularProgress: React.FC<{ value: number; size?: number; strokeWidth?: number }> = ({ 
  value, 
  size = 70, 
  strokeWidth = 5 
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
    <div ref={ref} className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#skillGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-white">
          <AnimatedCounter value={value} />
          <span className="text-xs text-white/50">%</span>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div 
        className="glass p-6 rounded-2xl h-full border border-white/5 hover:border-teal-500/30 transition-all duration-500 flex flex-col overflow-hidden"
        whileHover={{ 
          y: -4,
          boxShadow: '0 20px 40px -12px rgba(20, 184, 166, 0.2)'
        }}
      >
        {/* 背景光效 */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* 头部：图标、标题、进度环 */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full"
                animate={isHovered ? { opacity: 1, scale: 1.3 } : { opacity: 0, scale: 1 }}
              />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl">{skill.icon}</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg tracking-tight">{skill.name}</h3>
              <div className="h-0.5 w-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mt-1" />
            </div>
          </div>
          
          <CircularProgress value={skill.level} size={56} strokeWidth={4} />
        </div>
        
        {/* 技能标签 */}
        <div className="relative z-10 mt-auto pt-4">
          <div className="flex flex-wrap gap-2">
            {skill.items.slice(0, 5).map((item, i) => (
              <span 
                key={i}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/60 border border-white/5 hover:border-teal-500/30 hover:text-teal-400 transition-all"
              >
                {item}
              </span>
            ))}
            {skill.items.length > 5 && (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                +{skill.items.length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StatCard: React.FC = () => {
  const totalSkills = useMemo(() => SKILLS.reduce((acc, curr) => acc + curr.items.length, 0), []);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="group relative"
    >
       <div className="glass p-6 rounded-2xl h-full border border-white/5 hover:border-amber-500/30 transition-all duration-500 flex flex-col items-center justify-center text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
         
         <motion.div 
           className="text-4xl mb-3"
           animate={{ rotate: [0, 10, -10, 0] }}
           transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
         >
           🚀
         </motion.div>
         
         <div className="text-3xl font-bold text-white mb-1">
           <AnimatedCounter value={totalSkills} suffix="+" />
         </div>
         <div className="text-xs text-white/50 font-medium uppercase tracking-wider">
           掌握技能点
         </div>
       </div>
    </motion.div>
  );
};

export const SkillGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* 背景光效 - 使用青蓝色调 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="text-teal-400 text-sm font-semibold tracking-[0.2em] uppercase">Skills</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500/50" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
            我的能力图谱
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            多年积累的技术栈，持续精进的专业能力
          </p>
        </motion.div>
        
        {/* 技能卡片网格 - 简化布局，2x2 + 1 统计卡 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index} 
            />
          ))}
          <StatCard />
        </div>
      </div>
    </section>
  );
};
