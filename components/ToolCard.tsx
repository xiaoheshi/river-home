
import React from 'react';
import { motion } from 'framer-motion';
import { Tool } from '../types';
import { analyticsService } from '../services/analyticsService';

interface ToolCardProps {
  tool: Tool;
  isFavorite?: boolean;
  onToggleFavorite?: (toolId: string) => void;
  onToolClick?: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite = false,
  onToggleFavorite,
  onToolClick
}) => {
  const handleClick = () => {
    // 追踪工具点击
    analyticsService.trackToolClick(tool.id, tool.name, tool.category);

    onToolClick?.(tool.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 追踪收藏操作
    const action = isFavorite ? 'remove' : 'add';
    analyticsService.trackFavoriteAction(tool.id, action);

    onToggleFavorite?.(tool.id);
  };

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group glass p-8 rounded-[2.5rem] hover-glow flex flex-col h-full relative overflow-hidden transition-all duration-500"
    >
      {/* 收藏按钮 */}
      <motion.button
        onClick={handleFavoriteClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute top-4 right-4 z-30 p-2 rounded-full
                    border transition-all duration-300
                    ${isFavorite
                      ? 'bg-yellow-500/20 border-yellow-500/40 opacity-100'
                      : 'bg-white/5 border-white/10 opacity-0 group-hover:opacity-100 hover:bg-teal-500/20 hover:border-teal-500/40'
                    }`}
        title={isFavorite ? '取消收藏' : '添加收藏'}
      >
        <svg
          className={`w-4 h-4 transition-colors ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
          viewBox="0 0 24 24"
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </motion.button>

      {/* 收藏指示条 */}
      {isFavorite && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 32 }}
          className="absolute top-0 left-6 w-1 bg-gradient-to-b from-yellow-400 to-transparent rounded-b-full"
        />
      )}

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
