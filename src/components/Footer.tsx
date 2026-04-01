import { Github, ArrowUp } from 'lucide-react'
import { navLinks, profile } from '@/data/resume'

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-white/[0.01]">
      {/* Blueprint grid echo */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Top row: brand + back-to-top */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-lg font-bold text-slate-900 dark:text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {profile.name}
            </span>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500" style={{ fontFamily: 'var(--font-mono)' }}>
              {profile.title}
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-label="回到顶部"
          >
            <span className="hidden sm:inline tracking-wider uppercase">Back to top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px bg-slate-200/60 dark:bg-slate-800/40" />

        {/* Bottom row: nav + meta */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500" style={{ fontFamily: 'var(--font-mono)' }}>
              <span>&copy; {new Date().getFullYear()}</span>
              <span className="w-px h-3 bg-slate-200 dark:bg-slate-800" />
              <span>Built with React + Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
