import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Compass, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/works', label: 'Works', icon: Briefcase },
  { path: '/nexus', label: 'Nexus', icon: Compass },
  { path: '/about', label: 'About', icon: User },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
      <div className="flex items-center justify-around p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} className="relative flex flex-col items-center gap-1 px-4 py-2">
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 rounded-xl bg-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`relative z-10 w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-white/60'}`} />
              <span className={`relative z-10 text-xs ${isActive ? 'text-cyan-400' : 'text-white/60'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
