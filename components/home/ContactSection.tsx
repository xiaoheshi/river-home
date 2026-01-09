import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/constants.tsx';

export const ContactSection: React.FC = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">与我联系</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide">
            如果你有项目合作、工作机会，或只是想聊聊
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
            className="group relative inline-block"
          >
            <span className="text-3xl md:text-6xl font-bold text-white tracking-tighter hover:text-white/90 transition-colors">
              {PROFILE.contact.email}
            </span>
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.a
            href={`https://github.com/${PROFILE.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/5 group flex flex-col items-center justify-center gap-4 min-h-[200px]"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">GitHub</h3>
              <p className="text-gray-400 group-hover:text-white transition-colors">@{PROFILE.contact.github}</p>
            </div>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/5 group flex flex-col items-center justify-center gap-4 min-h-[200px] cursor-default"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.5,13.5A1.5,1.5 0 1,0 7,12,1.5,1.5 0 0,0 8.5,13.5Zm7,0A1.5,1.5 0 1,0 14,12,1.5,1.5 0 0,0 15.5,13.5Z" opacity="0.5"/>
                <path d="M15.5,18.5a1.5,1.5,0 1,1-1.5-1.5A1.5,1.5,0 0,1 15.5,18.5Z"/>
                <path d="M12,2C6.48,2,2,5.58,2,10c0,2.42,1.34,4.58,3.41,6.06L5,19l4.47-2.22c.81.25,1.67.39,2.53.39,5.52,0,10-3.58,10-8S17.52,2,12,2Zm0,14c-4.41,0-8-2.69-8-6s3.59-6,8-6,8,2.69,8,6S16.41,16,12,16Z"/>
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">WeChat</h3>
              <div className="relative overflow-hidden group-hover:h-auto transition-all">
                <p className="text-gray-400 text-sm mb-2">扫码添加好友</p>
                <div className="w-24 h-24 mx-auto bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                  <span className="text-xs text-gray-500">微信二维码</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center mt-16 text-white/20 text-sm"
        >
            © {new Date().getFullYear()} {PROFILE.englishName}. All rights reserved.
        </motion.div>
      </div>
    </section>
  );
};
