import React from 'react';

interface InfiniteScrollProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  className = '',
}) => {
  const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div 
        className={`flex w-max ${pauseOnHover ? 'hover:pause-animation' : ''}`}
        style={{
          animation: `${animationName} ${speed}s linear infinite`
        }}
      >
        <div className="flex gap-3 px-1.5">
          {items.map((item, idx) => (
            <span
              key={`original-${idx}`}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-white/70 border border-white/10 backdrop-blur-sm whitespace-nowrap hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 px-1.5">
          {items.map((item, idx) => (
            <span
              key={`duplicate-${idx}`}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-white/70 border border-white/10 backdrop-blur-sm whitespace-nowrap hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScroll;
