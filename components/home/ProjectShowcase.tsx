import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '@/constants.tsx';
import { Project } from '@/types';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXRel = (e.clientX - rect.left) / width - 0.5;
    const mouseYRel = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXRel);
    y.set(mouseYRel);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full rounded-[2rem] glass p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500 cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          filter: `brightness(${brightness})`,
        }}
      />

      <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>

      <div 
        className="relative z-10 flex flex-col h-full"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="flex justify-between items-start mb-6">
          <motion.span 
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none"
            style={{ transform: 'translateZ(20px)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
          <motion.div 
            className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
              project.status === 'live' 
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            }`}
            style={{ transform: 'translateZ(30px)' }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${
                project.status === 'live' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`} />
              {project.status === 'live' ? '已上线' : '开发中'}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="text-4xl mb-4"
          style={{ transform: 'translateZ(50px)' }}
          animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          {project.icon}
        </motion.div>

        <h3 
          className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 transition-all duration-500"
          style={{ transform: 'translateZ(35px)' }}
        >
          {project.name}
        </h3>
        
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-purple-500/50 via-teal-500/50 to-transparent mb-4"
          initial={{ width: '3rem' }}
          animate={isHovered ? { width: '100%' } : { width: '3rem' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <p 
          className="text-gray-400 mb-6 flex-grow leading-relaxed"
          style={{ transform: 'translateZ(25px)' }}
        >
          {project.description}
        </p>

        <div 
          className="flex flex-wrap gap-2 mb-8"
          style={{ transform: 'translateZ(20px)' }}
        >
          {project.techStack.map((tech, i) => (
            <motion.span 
              key={tech} 
              className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <motion.div 
          className="mt-auto pt-4 border-t border-white/5"
          style={{ transform: 'translateZ(30px)' }}
        >
          {project.status === 'live' && project.url ? (
            <motion.a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group/link"
              whileHover={{ x: 5 }}
            >
              <span>访问项目</span>
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
              <span className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" />
              敬请期待
            </span>
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute -bottom-px left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 via-teal-400 to-purple-500 rounded-full"
        animate={isHovered ? { width: '80%' } : { width: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export const ProjectShowcase: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-20"
        >
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50" />
            <span className="text-purple-400 text-sm font-semibold tracking-[0.2em] uppercase">Portfolio</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-6">
            我创造的<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-teal-400 to-purple-400">产品</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl text-lg leading-relaxed">
            不仅仅是代码，更是对用户体验的深度思考与打磨
          </p>
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          style={{ perspective: '1500px' }}
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            to="/works" 
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-white font-medium transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">查看全部作品</span>
            <motion.svg 
              className="w-5 h-5 text-purple-400 relative z-10" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              whileHover={{ x: 5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
