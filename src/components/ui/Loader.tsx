import { motion } from 'framer-motion';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050816]">
      <div className="relative">
        <motion.div
          className="w-24 h-24 border-2 border-cyan-500/50"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-4 border-2 border-purple-500/50"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-white/60 whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
