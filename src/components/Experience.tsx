import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experiences } from '@/data/resume'

const slideIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
})

function TimelineEntry({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={slideIn(0.1 + index * 0.08)}
      className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-10"
    >
      {/* Left — time & role */}
      <div className="md:text-right md:pt-0.5">
        <span
          className="text-xs text-slate-400 dark:text-slate-500 tabular-nums"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {exp.period}
        </span>
        <p className="mt-1 text-xs text-blue-500 dark:text-blue-400 hidden md:block">
          {exp.role}
        </p>
      </div>

      {/* Right — content */}
      <div className="relative pl-6 md:pl-8 pb-12 border-l border-slate-200 dark:border-slate-800 group-last:pb-0">
        {/* Dot on the line */}
        <div className={`absolute left-0 top-1 -translate-x-1/2 rounded-full bg-blue-500 ${index === 0 ? 'w-2.5 h-2.5 ring-[3px] ring-blue-500/20' : 'w-2 h-2 ring-[3px] ring-slate-50 dark:ring-[#0b0b14]'}`} />

        <h3
          className="text-base font-semibold text-slate-900 dark:text-white -mt-0.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {exp.company}
          {index === 0 && (
            <span
              className="inline md:hidden ml-2 px-1.5 py-0.5 text-[9px] bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 rounded font-medium align-middle"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CURRENT
            </span>
          )}
        </h3>
        <p className="mt-0.5 text-sm text-blue-500 dark:text-blue-400 md:hidden">
          {exp.role}
        </p>

        <ul className="mt-3 space-y-2">
          {exp.highlights.map((h, i) => (
            <li key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-[1.7] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-px before:bg-slate-300 dark:before:bg-slate-700">
              {h}
            </li>
          ))}
        </ul>

        {/* Index marker */}
        {index === 0 && (
          <span className="absolute -left-[52px] md:-left-[52px] top-0 text-[10px] text-slate-300 dark:text-slate-600 hidden md:block" style={{ fontFamily: 'var(--font-mono)' }}>
            now
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-28 sm:py-36 bg-white/50 dark:bg-white/[0.01]">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={slideIn(0)} className="section-num">
            02 — 经历
          </motion.p>
          <motion.div variants={slideIn(0.1)} className="mt-4 rule" />
          <motion.h2
            variants={slideIn(0.15)}
            className="mt-8 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            工作经历
          </motion.h2>
          <motion.p variants={slideIn(0.2)} className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-lg">
            从北京到上海再到河南，13 年间经历了金融支付与智慧城市两大领域的深度历练。
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-14">
          {experiences.map((exp, i) => (
            <TimelineEntry key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
