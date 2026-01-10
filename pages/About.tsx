import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROFILE, SKILLS } from '@/constants.tsx';
import { Globe } from '@/components/Globe';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    },
  },
};

const SkillBar: React.FC<{ name: string; level: number; items: string[]; delay: number }> = ({ name, level, items, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="mb-10">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-xl font-medium text-white/90">{name}</h3>
        <span className="text-lg font-bold text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">{level}%</span>
      </div>
      
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500 rounded-full relative shadow-[0_0_15px_rgba(45,212,191,0.3)]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: delay * 0.1 }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {items.map((item, idx) => (
          <span 
            key={idx} 
            className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10 hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-200 transition-all duration-300 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <div className="min-h-screen w-full px-4 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px]" />
        </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 md:mb-24"
        >
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                    关于
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 ml-4">
                    {PROFILE.name}
                </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full opacity-80" />
        </motion.div>

        <motion.div 
          className="card-premium p-8 md:p-12 rounded-[2rem] mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-lg md:text-xl text-white/80 leading-relaxed font-light">
              {PROFILE.bio.map((paragraph, index) => (
                <motion.p key={index} variants={itemVariants}>
                  {paragraph}
                </motion.p>
              ))}
              
              <motion.div variants={itemVariants} className="pt-4 flex items-center gap-2 text-teal-400 font-medium">
                <span className="animate-pulse">📍</span>
                <span>Current Location: Sanmenxia, Henan</span>
              </motion.div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="flex-shrink-0 relative z-10 hidden md:block"
            >
              <Globe />
            </motion.div>
             <motion.div 
              variants={itemVariants}
              className="flex-shrink-0 relative z-10 md:hidden block w-full flex justify-center py-8"
            >
              <Globe />
            </motion.div>
          </div>
        </motion.div>

        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-12 text-center md:text-left flex items-center gap-3 justify-center md:justify-start"
          >
            <span className="text-teal-400">⚡</span>
            <span>技能与专长</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {SKILLS.map((skill, index) => (
              <SkillBar 
                key={skill.name}
                name={skill.name}
                level={skill.level}
                items={skill.items}
                delay={index}
              />
            ))}
          </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
        >
            <h2 className="text-2xl font-bold mb-8 text-white/90">保持联系</h2>
            <div className="flex flex-wrap justify-center gap-6">
                <a 
                    href={`mailto:${PROFILE.contact.email}`}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 glow-soft hover:bg-white/10 hover:border-teal-500/50 transition-all duration-300"
                >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">✉️</span>
                    <span className="text-white/80 group-hover:text-white">{PROFILE.contact.email}</span>
                </a>

                <a 
                    href={`https://github.com/${PROFILE.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 glow-soft hover:bg-white/10 hover:border-teal-500/50 transition-all duration-300"
                >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">🐙</span>
                    <span className="text-white/80 group-hover:text-white">@{PROFILE.contact.github}</span>
                </a>

                 <div className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 glow-soft hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 cursor-default">
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">💬</span>
                    <span className="text-white/80 group-hover:text-white">{PROFILE.contact.wechat}</span>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};
