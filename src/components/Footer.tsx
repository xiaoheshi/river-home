import { Github } from 'lucide-react'
import { navLinks, profile } from '@/data/resume'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/60">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span
              className="text-sm font-bold text-slate-900 dark:text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {profile.name}
            </span>
            <nav className="hidden sm:flex items-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-700" style={{ fontFamily: 'var(--font-mono)' }}>
              <span>&copy; {new Date().getFullYear()}</span>
              <span className="w-px h-3 bg-slate-200 dark:bg-slate-800" />
              <span>React + Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
