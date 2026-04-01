import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { navLinks } from '@/data/resume'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/70 dark:bg-[#0b0b14]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/30'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-sm font-bold tracking-tight text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          史晓河
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors link-underline"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </a>
          ))}
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-800" />
          <button
            onClick={toggle}
            className="p-1.5 rounded-md text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            aria-label="切换主题"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggle}
            className="p-2 text-slate-400 dark:text-slate-600"
            aria-label="切换主题"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-500 dark:text-slate-400"
            aria-label="菜单"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden bg-white/90 dark:bg-[#0b0b14]/90 backdrop-blur-2xl border-t border-slate-200/30 dark:border-slate-800/30"
          >
            <div className="px-6 py-3 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-3 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
