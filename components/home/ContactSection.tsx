import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/constants.tsx';

export const ContactSection: React.FC = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-gradient font-display">与我联系</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            如果你有项目合作、工作机会，或只是想聊聊，<br className="hidden md:block"/>欢迎随时通过以下方式找到我。
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <a 
            href={`mailto:${PROFILE.contact.email}`}
            className="group relative inline-block py-4"
          >
            <span className="text-3xl md:text-6xl font-bold text-white tracking-tighter font-display hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-400 transition-all duration-300">
              {PROFILE.contact.email}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.a
            href={`https://github.com/${PROFILE.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="card-premium glow-soft p-10 flex flex-col items-center justify-center gap-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-xl shadow-black/20">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-center z-10">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">GitHub</h3>
              <p className="text-gray-400 group-hover:text-white transition-colors">@{PROFILE.contact.github}</p>
              <div className="mt-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-500 group-hover:border-white/30 transition-colors">
                Explore Code
              </div>
            </div>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="card-premium glow-soft p-10 flex flex-col items-center justify-center gap-6 group relative overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <img 
                src="/wechat-qr.png" 
                alt="WeChat QR Code" 
                className="relative z-10 w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white/5 border border-white/10 shadow-2xl"
              />
            </div>
            
            <div className="text-center z-10">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">WeChat</h3>
              <p className="text-gray-400 text-sm mb-3">扫码添加好友</p>
              <div className="flex items-center justify-center gap-2 text-green-400/80 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Open for opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center mt-24"
        >
            <p className="text-white/20 text-sm font-light tracking-widest uppercase">
              © {new Date().getFullYear()} {PROFILE.englishName}. All rights reserved.
            </p>
        </motion.div>
      </div>
    </section>
  );
};
