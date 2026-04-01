import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, ArrowUpRight, ArrowRight } from 'lucide-react'
import { projects } from '@/data/resume'

const slideIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
})

function FeaturedCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={slideIn(index * 0.15)}
      className="group relative"
    >
      {/* Outer container with accent gradient border on hover */}
      <div className="relative p-px rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200/60 via-slate-200/60 to-cyan-200/60 dark:from-blue-500/20 dark:via-slate-800/40 dark:to-cyan-500/20 group-hover:from-blue-400 group-hover:via-blue-500 group-hover:to-cyan-400 transition-all duration-700">
        <div className="relative bg-white dark:bg-[#0d0d18] rounded-[15px] p-7 sm:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          {/* Top row: badge + index */}
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Featured
            </span>
            <span
              className="text-[11px] text-slate-300 dark:text-slate-600"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              0{index + 1}
            </span>
          </div>

          <h3
            className="mt-5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-[1.8]">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 border border-transparent"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors link-underline"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Github size={15} />
                Source
                <ArrowUpRight size={12} className="opacity-40" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <ExternalLink size={15} />
                {project.linkLabel || '访问'}
                <ArrowUpRight size={12} className="opacity-60" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CompactCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const link = project.github || project.link
  const Tag = link ? 'a' : 'div'
  const linkProps = link ? { href: link, target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={slideIn(index * 0.1)}
    >
      <Tag
        {...linkProps}
        className={`group block p-5 border-l-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 bg-white/40 dark:bg-white/[0.01] h-full ${link ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-start justify-between">
          <h3
            className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </h3>
          {link && (
            <ArrowRight size={14} className="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
          )}
        </div>
        <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag, i, arr) => (
            <span
              key={tag}
              className="text-[10px] text-slate-400 dark:text-slate-500"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tag}
              {i < arr.length - 1 && <span className="ml-1.5">·</span>}
            </span>
          ))}
        </div>
      </Tag>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={slideIn(0)} className="section-num">
            03 — 项目
          </motion.p>
          <motion.div variants={slideIn(0.1)} className="mt-4 rule" />
          <motion.h2
            variants={slideIn(0.15)}
            className="mt-8 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            项目作品
          </motion.h2>
        </motion.div>

        {/* Featured */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((p, i) => (
            <FeaturedCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Others — left-border style, not cards */}
        <div className="mt-10">
          <p
            className="text-[11px] text-slate-400 dark:text-slate-500 tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            其他项目
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {others.map((p, i) => (
              <CompactCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
