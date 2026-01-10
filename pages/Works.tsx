import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/constants.tsx';
import { ProjectStatus } from '@/types';

type FilterType = '全部' | '已上线' | '开发中';

export const Works: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('全部');

  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === '全部') return true;
    if (filter === '已上线') return project.status === 'live';
    if (filter === '开发中') return project.status === 'development';
    return true;
  });

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'live':
        return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
      case 'development':
        return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
      case 'archived':
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case 'live': return 'Live';
      case 'development': return 'Dev';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight font-display">
          <span className="text-gradient">作品集</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          这里汇聚了我的个人项目与产品实验。从构思到落地，每一个像素都凝聚着对创造的热爱。
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center md:justify-start gap-4 mb-12"
      >
        {(['全部', '已上线', '开发中'] as FilterType[]).map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              filter === item ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {filter === item && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full border border-teal-500/30 shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{item}</span>
          </button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="card-premium glow-soft h-full p-6 md:p-8 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="text-4xl p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <span className={`text-sm px-4 py-1.5 rounded-full border font-medium tracking-wide ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>

                <div className="mb-6 flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.roles.map((role) => (
                      <span key={role} className="text-[10px] text-teal-300 bg-teal-500/10 px-2 py-1 rounded-md">
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] text-gray-500 border border-white/5 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.url && (
                  <div className="mt-auto">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-teal-300 transition-colors group/link"
                    >
                      访问项目
                      <svg
                        className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                )}

                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full -ml-16 -mb-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-32"
        >
          <div className="inline-block p-6 rounded-full bg-white/5 mb-6 backdrop-blur-sm border border-white/10">
            <div className="text-6xl animate-pulse-soft">🌪️</div>
          </div>
          <h3 className="text-xl font-medium text-white mb-2 font-display">暂无相关项目</h3>
          <p className="text-gray-500">更多精彩正在酝酿中...</p>
        </motion.div>
      )}
    </div>
  );
};
