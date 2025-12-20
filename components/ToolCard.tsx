
import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <a 
      href={tool.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group glass p-8 rounded-[2.5rem] hover-glow flex flex-col h-full relative overflow-hidden transition-all duration-500"
    >
      {/* 内部加强光晕装饰 */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-teal-500/5 rounded-full blur-[80px] group-hover:bg-teal-400/20 group-hover:scale-150 animate-inner-pulse transition-all duration-700 pointer-events-none"></div>
      
      {/* 扫光效果 */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-shimmer pointer-events-none z-20"></div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-teal-500/30 group-hover:bg-teal-500/10 transition-all duration-500 shadow-xl shadow-black/20">
          {tool.icon}
        </div>
        <span className="px-4 py-1.5 rounded-full font-mono text-[10px] font-semibold tracking-widest bg-white/5 border border-white/5 text-gray-400 group-hover:text-teal-300 group-hover:border-teal-500/20 transition-all uppercase backdrop-blur-sm">
          {tool.category}
        </span>
      </div>

      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl font-bold mb-4 tracking-tighter-heading group-hover:text-white transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-[15px] text-gray-400 leading-relaxed mb-8 font-light line-clamp-3 group-hover:text-gray-300 transition-colors">
          {tool.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5 relative z-10 mt-auto">
        {tool.tags.map(tag => (
          <span key={tag} className="font-mono text-[11px] text-gray-500 font-medium opacity-60 group-hover:opacity-100 group-hover:text-teal-400/80 transition-all tracking-tight">
            #{tag}
          </span>
        ))}
      </div>

      {/* 底部装饰线条 */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/0 to-transparent group-hover:via-teal-500/40 transition-all duration-700"></div>
    </a>
  );
};
