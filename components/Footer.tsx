import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-32 border-t border-white/5 bg-black/20 backdrop-blur-md overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        
        <div className="flex flex-col items-center md:items-start gap-1 group">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold font-display tracking-tight text-gradient-teal"
          >
            Riverhub
          </motion.h3>
          <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] group-hover:text-teal-400/50 transition-colors duration-300">
            DESIGNER & DEVELOPER
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 text-white/60"
          >
            <span className="w-1 h-1 rounded-full bg-teal-500/50 animate-pulse" />
            <span className="text-sm font-light tracking-widest hover:text-white transition-colors duration-300 cursor-default">
              从小城连接世界
            </span>
            <span className="w-1 h-1 rounded-full bg-teal-500/50 animate-pulse" />
          </motion.div>
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-xs font-mono text-white/30">
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex items-center gap-1.5 hover:text-white/60 transition-colors duration-300 cursor-default"
          >
            <span>MADE WITH</span>
            <span className="text-rose-500/70 animate-pulse-soft">❤</span>
            <span>IN SANMENXIA</span>
          </motion.div>
          <div className="hover:text-white/50 transition-colors duration-300">
            © {currentYear} RIVERHUB. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/4 w-1/2 h-24 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />
    </footer>
  );
};
