import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Works", path: "/works" },
  { name: "Nexus", path: "/nexus" },
  { name: "About", path: "/about" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-lg shadow-slate-200/50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-slate-900 rounded-full"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
