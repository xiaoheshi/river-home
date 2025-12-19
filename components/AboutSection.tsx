
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const decoration1Y = useTransform(scrollYProgress, [0.5, 1], [0, -100]);
  const decoration2Y = useTransform(scrollYProgress, [0.5, 1], [0, 100]);

  return (
    <section id="about-river-nexus" className="mt-32 mb-20 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
      >
        {/* 背景装饰：流动的线条 + 视差 */}
        <motion.div 
          style={{ y: decoration1Y }}
          className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"
        />
        <motion.div 
          style={{ y: decoration2Y }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
                流域哲学<br />The Flow Philosophy
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full"></div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              River Nexus 不仅仅是一个工具集合页，它是 <span className="text-teal-400 font-medium">晓河（River）</span> 个人数字世界的汇流点。
              在中文里，“晓”意味着清晨的破晓，而“河”则是奔流不息的生命。
            </p>
            
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              我们相信信息应当如同流水——它从无数支流（工具、创意、代码）中汇聚而来，在经过沉淀与梳理后，最终汇入认知的海洋。
              这个站点设计的每一个像素，都在试图还原这种“流动”感：无阻碍的交互，顺滑的视觉反馈，以及智慧的节点连接。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                <div className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-4">01 // 汇聚</div>
                <div className="text-white font-medium">整合碎片化的数字资产，构建统一的入口。</div>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors translate-x-4">
                <div className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-4">02 // 流动</div>
                <div className="text-white font-medium">打破信息孤岛，让工作流像河水般自然衔接。</div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                <div className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-4">03 // 破晓</div>
                <div className="text-white font-medium">在繁杂的数据中，洞察生产力与灵感的曙光。</div>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors translate-x-4">
                <div className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-4">04 // 永续</div>
                <div className="text-white font-medium">一个不断生长、迭代、自我更新的数字生态。</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
