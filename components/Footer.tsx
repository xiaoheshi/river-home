import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-xs text-white/30 tracking-widest hover:text-white/50 transition-colors duration-300 cursor-default">
          © 2025 Riverhub
        </span>
        <span className="font-mono text-xs text-white/30 tracking-widest hover:text-white/50 transition-colors duration-300 cursor-default">
          从三门峡连接世界
        </span>
      </div>
    </footer>
  );
};
