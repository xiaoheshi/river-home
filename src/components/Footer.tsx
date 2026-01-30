import { Github, Mail, Heart } from "lucide-react";
import { PROFILE } from "../constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Copyright */}
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>© {currentYear} {PROFILE.name}</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in {PROFILE.location}
            </span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
