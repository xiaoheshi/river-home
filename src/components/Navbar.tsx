import { Link, useLocation } from "react-router-dom";
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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1 rounded-full bg-white/70 backdrop-blur-md border border-white/20 shadow-sm ring-1 ring-black/5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white text-black shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
