import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TOOLS } from '@/constants.tsx';

export const ToolPreview: React.FC = () => {
  const PREVIEW_COUNT = 8;
  const previewTools = TOOLS.slice(0, PREVIEW_COUNT);
  const remainingCount = Math.max(0, TOOLS.length - PREVIEW_COUNT);
  const [isHovered, setIsHovered] = useState(false);

  const orbitRadius = [140, 200, 260];

  return (
    <section className="py-32 relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4 relative z-10"
      >
        <motion.div 
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500/50" />
          <span className="text-teal-400 text-sm font-semibold tracking-[0.2em] uppercase">Tools</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500/50" />
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          我的<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">工具流域</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          这些是我日常使用的工具，也是我对数字效率的理解与实践
        </p>
      </motion.div>

      <div 
        className="relative w-full max-w-2xl aspect-square flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {orbitRadius.map((radius, orbitIndex) => (
          <motion.div
            key={orbitIndex}
            className="absolute rounded-full border border-white/5"
            style={{ width: radius * 2, height: radius * 2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: orbitIndex * 0.2, duration: 0.8 }}
          />
        ))}

        <motion.div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center z-20"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">R</span>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.3)',
                '0 0 40px rgba(45, 212, 191, 0.3)',
                '0 0 20px rgba(139, 92, 246, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {previewTools.map((tool, index) => {
          const orbitIndex = index < 3 ? 0 : index < 6 ? 1 : 2;
          const radius = orbitRadius[orbitIndex];
          const toolsInOrbit = orbitIndex === 0 ? 3 : orbitIndex === 1 ? 3 : 2;
          const indexInOrbit = orbitIndex === 0 ? index : orbitIndex === 1 ? index - 3 : index - 6;
          const baseAngle = (indexInOrbit / toolsInOrbit) * 360;
          const orbitSpeed = 60 + orbitIndex * 20;
          const direction = orbitIndex % 2 === 0 ? 1 : -1;

          return (
            <motion.div
              key={tool.id}
              className="absolute"
              style={{
                width: 60,
                height: 60,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              animate={{
                rotate: isHovered ? 0 : direction * 360,
              }}
              custom={baseAngle}
            >
              <motion.div
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((baseAngle + (isHovered ? 0 : 360)) * Math.PI / 180) * radius - 30,
                  y: Math.sin((baseAngle + (isHovered ? 0 : 360)) * Math.PI / 180) * radius - 30,
                }}
                transition={{
                  duration: orbitSpeed,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                initial={{
                  x: Math.cos(baseAngle * Math.PI / 180) * radius - 30,
                  y: Math.sin(baseAngle * Math.PI / 180) * radius - 30,
                }}
              >
                <motion.div
                  className="group relative w-14 h-14 md:w-16 md:h-16 rounded-2xl glass border border-white/10 shadow-lg backdrop-blur-md flex items-center justify-center text-2xl md:text-3xl bg-white/5 cursor-default select-none"
                  whileHover={{ 
                    scale: 1.2, 
                    zIndex: 50,
                    boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.4)'
                  }}
                  animate={{
                    rotate: isHovered ? 0 : -direction * 360,
                  }}
                  transition={{
                    rotate: { duration: orbitSpeed, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 0.2 },
                  }}
                >
                  {tool.icon}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    {tool.name}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}

        {remainingCount > 0 && (
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              x: Math.cos(270 * Math.PI / 180) * orbitRadius[2] - 30,
              y: Math.sin(270 * Math.PI / 180) * orbitRadius[2] - 30,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Link to="/nexus">
              <motion.div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl glass border border-white/10 shadow-lg backdrop-blur-md flex items-center justify-center text-base md:text-lg font-bold text-white/80 bg-white/5 cursor-pointer"
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  borderColor: 'rgba(139, 92, 246, 0.4)'
                }}
              >
                +{remainingCount}
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 relative z-10"
      >
        <Link 
          to="/nexus"
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/40 text-white font-medium transition-all duration-500 hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10">探索工具港</span>
          <motion.span 
            className="relative z-10 text-teal-400"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/0 via-teal-600/10 to-teal-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </Link>
      </motion.div>
    </section>
  );
};
