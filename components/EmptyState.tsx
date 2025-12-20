
import React, { useState, useCallback, useRef } from 'react';

interface EmptyStateProps {
  onReset?: () => void;
  query?: string;
  type?: 'search' | 'favorites' | 'recent';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset, query, type = 'search' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    setRotate({
      x: -percentY * 12,
      y: percentX * 12
    });

    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);

  // 根据类型定义不同的内容
  const content = {
    search: {
      icon: '🔍',
      title: query ? `支流扫描无果: <span class="text-teal-400 font-mono">"${query}"</span>` : '流域尚未汇集数据',
      status: 'Flow Analysis: No Match',
      description: '我们的观测仪已搜索了晓河所有数字支流的尽头。看起来您寻找的信息尚未汇入当前的 Nexus 流域，或者处于下游未同步区域。',
      actionText: '重置流域同步'
    },
    favorites: {
      icon: '⭐',
      title: '流域暂无收藏',
      status: 'Star Collection: Empty',
      description: '点击工具卡片上的星星图标，将常用的工具标记为收藏，方便日后快速访问。',
      actionText: '浏览全部工具'
    },
    recent: {
      icon: '🕐',
      title: '流域未有足迹',
      status: 'Usage History: Clear',
      description: '开始探索这些有趣的工具吧！您的使用记录会自动保存在这里，方便您回溯最近的数字旅程。',
      actionText: '开始探索'
    }
  };

  const currentContent = content[type];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden rounded-[3.5rem] border border-white/5 bg-white/[0.01] transition-all duration-700 hover:bg-teal-900/10"
    >
      {/* 流体光束背景 */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(20, 184, 166, 0.2), transparent)`
        }}
      />

      {/* 交互式流域探测仪 */}
      <div 
        className="relative w-80 h-80 mb-12 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 多重同心圆波纹 (Z轴深度) */}
        <div className="absolute inset-0 rounded-full border border-teal-500/10 animate-pulse-ring" style={{ transform: 'translateZ(-60px)' }}></div>
        <div className="absolute inset-12 rounded-full border border-teal-400/5 animate-pulse-ring" style={{ animationDelay: '0.7s', transform: 'translateZ(-30px)' }}></div>
        
        {/* 核心观测塔 SVG */}
        <div className="relative z-10 animate-float" style={{ transform: 'translateZ(60px)' }}>
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" className="text-teal-400 drop-shadow-[0_0_30px_rgba(20,184,166,0.5)]">
            {/* 流线型设计 */}
            <path d="M12 2L4 9L12 16L20 9L12 2Z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 15L12 22L20 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L12 15L16 12" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
            
            {/* 动态核心 */}
            <circle cx="12" cy="9" r="2" fill="currentColor">
              <animate attributeName="r" values="2;2.5;2" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* 实时流水扫描线 */}
          <div className="absolute left-1/2 -translate-x-1/2 w-72 h-[1px] bg-gradient-to-r from-transparent via-teal-300/40 to-transparent animate-scan top-0"></div>
        </div>
      </div>

      {/* 文本内容 */}
      <div className="text-center z-20 space-y-6 px-10 max-w-2xl">
        <div className="space-y-3">
          <div className="text-6xl mb-4">{currentContent.icon}</div>
          <h3
            className="text-3xl font-bold text-white tracking-tight"
            dangerouslySetInnerHTML={{ __html: currentContent.title }}
          />
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-teal-500/40 uppercase tracking-[0.4em]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            {currentContent.status}
          </div>
        </div>

        <p className="text-slate-400 font-light leading-relaxed text-lg">
          {currentContent.description}
        </p>
      </div>

      {/* 交互按钮 */}
      {onReset && (
        <div className="mt-14 flex flex-col sm:flex-row gap-6 z-20">
          <button
            onClick={onReset}
            className="group relative px-12 py-4 rounded-full bg-teal-600 text-white font-bold shadow-[0_0_30px_rgba(20,184,166,0.2)] hover:shadow-[0_0_50px_rgba(20,184,166,0.4)] hover:-translate-y-1 transition-all active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 tracking-[0.2em] uppercase text-xs">{currentContent.actionText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          </button>

          {type === 'search' && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-12 py-4 rounded-full border border-white/5 text-slate-500 font-bold hover:text-white hover:bg-white/5 transition-all text-xs tracking-[0.2em] uppercase"
            >
              优化检索频率
            </button>
          )}
        </div>
      )}

      {/* 侧边装饰代码 */}
      <div className="absolute top-1/4 left-16 opacity-5 text-[9px] font-mono text-teal-300 hidden xl:block">
        STREAM_STATUS: STAGNANT<br/>
        DEPTH: 404m<br/>
        FLOW_RATE: 0.0kb/s
      </div>
      <div className="absolute bottom-1/4 right-16 opacity-5 text-[9px] font-mono text-teal-300 hidden xl:block">
        RIVER_OS: v4.0<br/>
        NODE: XI_AO_HE<br/>
        STATUS: STANDBY
      </div>
    </div>
  );
};
