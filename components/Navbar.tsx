import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const links = [
    { name: '作品', path: '/works' },
    { name: '工具', path: '/nexus' },
    { name: '关于', path: '/about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled 
            ? 'glass py-4 shadow-lg shadow-black/5 border-white/5' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link 
            to="/" 
            className="group relative z-50"
            aria-label="Home"
          >
            <span className="text-2xl font-bold tracking-tighter text-gradient font-display">
              Riverhub
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <MagneticButton key={link.path} className="relative">
                <Link
                  to={link.path}
                  className={`nav-link text-[15px] font-medium tracking-wide transition-colors duration-300 ${
                    location.pathname === link.path 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </MagneticButton>
            ))}
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative z-50 p-2 text-white/90 hover:text-white focus:outline-none"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col justify-center items-end w-6 h-6 gap-1.5">
              <span 
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
                }`} 
              />
              <span 
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileOpen ? 'w-0 opacity-0' : 'w-4'
                }`} 
              />
              <span 
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'
                }`} 
              />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm glass border-l border-white/10 p-8 pt-32 shadow-2xl"
            >
              <div className="flex flex-col space-y-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`block text-2xl font-light tracking-wide transition-colors ${
                        location.pathname === link.path
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-12 left-8 right-8">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                <p className="text-xs text-slate-500 font-mono text-center">
                  DESIGNED BY RIVER
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
