import { motion } from 'framer-motion'
import { ArrowDown, Github } from 'lucide-react'
import { profile } from '@/data/resume'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end sm:items-center overflow-hidden pb-20 sm:pb-0">
      {/* Background — animated mesh gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] -top-40 -right-40 rounded-full opacity-20 dark:opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', animation: 'mesh-drift 20s ease-in-out infinite' }}
        />
        <div
          className="absolute w-[500px] h-[500px] -bottom-20 -left-20 rounded-full opacity-15 dark:opacity-8 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', animation: 'mesh-drift 25s ease-in-out infinite reverse' }}
        />
        {/* Blueprint grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Giant Watermark "河" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute right-[5%] sm:right-[10%] top-1/2 -translate-y-1/2 select-none pointer-events-none"
      >
        <span
          className="text-[20rem] sm:text-[28rem] md:text-[36rem] font-black leading-none text-slate-900/[0.03] dark:text-white/[0.03]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          河
        </span>
      </motion.div>

      {/* Content — left-aligned for asymmetry */}
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6">
        <div className="max-w-2xl">
          {/* Annotation */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="section-num mb-6"
          >
            {'//'}  portfolio  {'—'}  {new Date().getFullYear()}
          </motion.p>

          {/* Name — large and bold */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl sm:text-7xl md:text-[5.5rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[0.95]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {profile.name}
          </motion.h1>

          {/* English name + rule */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <span
                className="text-xs tracking-[0.3em] uppercase text-slate-400 dark:text-slate-600 shrink-0"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {profile.nameEn}
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {profile.title}
          </motion.p>

          {/* Tagline — with accent left border */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-5 pl-4 accent-border-l text-base text-slate-500 dark:text-slate-500 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(15,23,42,0.25)] dark:hover:shadow-[0_8px_30px_-6px_rgba(255,255,255,0.15)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              查看项目
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors link-underline"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Github size={16} />
              GitHub
            </a>
          </motion.div>

          {/* Stats row — monospace style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-16 flex items-center gap-8"
          >
            {[
              { value: '13', unit: '年', label: '研发经验' },
              { value: '10', unit: '+', label: '交付项目' },
              { value: '100', unit: '万+', label: '日均交易' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                {i > 0 && <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 -ml-4 mr-0" />}
                <div>
                  <span
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm text-blue-500 ml-0.5">{stat.unit}</span>
                  <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — minimal line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-6 sm:left-auto sm:right-6 flex items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.15em] uppercase text-slate-400 dark:text-slate-600" style={{ fontFamily: 'var(--font-mono)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-6 bg-slate-400 dark:bg-slate-600 origin-top"
        />
      </motion.div>
    </section>
  )
}
