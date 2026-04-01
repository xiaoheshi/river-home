import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { profile, competencies, techStack } from '@/data/resume'

const slideIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
})

const scaleIn = (delay: number = 0) => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
})

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        {/* Section header with rule */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={slideIn(0)} className="section-num">
            01 — 关于
          </motion.p>
          <motion.div variants={slideIn(0.1)} className="mt-4 rule" />
        </motion.div>

        {/* Two-column: Bio left, highlight right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
          {/* Left — Bio & Competencies */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.h2
              variants={slideIn(0.15)}
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              关于我
            </motion.h2>
            <motion.p
              variants={slideIn(0.25)}
              className="mt-6 text-base sm:text-[17px] text-slate-600 dark:text-slate-400 leading-[1.8]"
            >
              {profile.bio}
            </motion.p>

            {/* Competency grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {competencies.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={scaleIn(0.3 + i * 0.08)}
                    className="group bg-white dark:bg-white/[0.03] p-5 rounded-xl border border-slate-200/80 dark:border-slate-800/60 hover:border-blue-200 dark:hover:border-blue-500/20 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-6 h-px bg-blue-500/30 dark:bg-blue-400/20 mb-4" />
                    <Icon
                      size={18}
                      className="text-blue-500 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                    <h3
                      className="mt-3 text-sm font-semibold text-slate-900 dark:text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — Tech Stack as vertical list */}
          <motion.aside initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.h3
              variants={slideIn(0.2)}
              className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              技术栈
            </motion.h3>

            <div className="mt-5 space-y-5">
              {techStack.map((category, ci) => (
                <motion.div key={category.label} variants={slideIn(0.3 + ci * 0.06)}>
                  <span
                    className="text-[11px] text-blue-500 dark:text-blue-400 tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {category.label}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-transparent cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <motion.div variants={slideIn(0.6)} className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <span
                className="text-[11px] text-blue-500 dark:text-blue-400 tracking-wider"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                教育背景
              </span>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 font-medium">郑州轻工业学院</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">计算机科学与技术 · 本科 · 2009 — 2013</p>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
