import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/resume'

const slideIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
})

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-28 sm:py-36 bg-white/50 dark:bg-white/[0.01]">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={slideIn(0)} className="section-num">
            04 — 联系
          </motion.p>
          <motion.div variants={slideIn(0.1)} className="mt-4 rule" />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
          {/* Left — CTA text */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.h2
              variants={slideIn(0.15)}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              有合作想法？
              <br />
              <span className="text-blue-500">欢迎联系我</span>
            </motion.h2>
            <motion.p
              variants={slideIn(0.25)}
              className="mt-6 text-base text-slate-500 dark:text-slate-500 leading-relaxed max-w-md"
            >
              无论是技术合作、项目咨询还是职业机会，期待与你交流。
            </motion.p>
          </motion.div>

          {/* Right — Contact details */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {/* Phone */}
            <motion.a
              variants={slideIn(0.3)}
              href={`tel:${profile.phone}`}
              className="group flex items-center gap-5 p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-slate-800/60 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <span className="text-[11px] text-slate-400 dark:text-slate-600 block" style={{ fontFamily: 'var(--font-mono)' }}>
                  电话
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5 block" style={{ fontFamily: 'var(--font-mono)' }}>
                  {profile.phone}
                </span>
              </div>
              <ArrowUpRight size={16} className="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors" />
            </motion.a>

            {/* GitHub */}
            <motion.a
              variants={slideIn(0.38)}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-slate-800/60 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                <Github size={18} />
              </div>
              <div className="flex-1">
                <span className="text-[11px] text-slate-400 dark:text-slate-600 block" style={{ fontFamily: 'var(--font-mono)' }}>
                  GitHub
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5 block" style={{ fontFamily: 'var(--font-mono)' }}>
                  github.com/xiaoheshi
                </span>
              </div>
              <ArrowUpRight size={16} className="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors" />
            </motion.a>

            {/* Location */}
            <motion.div
              variants={slideIn(0.46)}
              className="flex items-center gap-5 p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-slate-800/60"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <span className="text-[11px] text-slate-400 dark:text-slate-600 block" style={{ fontFamily: 'var(--font-mono)' }}>
                  位置
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5 block">
                  {profile.location}，中国
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
