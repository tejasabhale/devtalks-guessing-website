import { motion } from 'framer-motion'

export default function ProgressBar({ completed, activeIndex, total }) {
  const percent = Math.round((completed / total) * 100)
  const steps = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-label text-muted">CLUE PROGRESS</span>
        <span className="font-display text-sm font-semibold text-red">{percent}%</span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-red-dark via-red to-red-bright"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
      </div>

      <div className="flex gap-2">
        {steps.map((step) => {
          const done = step <= completed
          const active = step === activeIndex + 1 && step > completed
          return (
            <div
              key={step}
              className={`flex min-h-10 flex-1 items-center justify-center rounded-sm border font-display text-xs font-bold tracking-wider ${
                done
                  ? 'border-red bg-red/20 text-red-bright'
                  : active
                    ? 'border-red/50 bg-card text-white'
                    : 'border-border bg-bg-secondary text-muted'
              }`}
              aria-label={`Clue ${step}${done ? ' complete' : active ? ' current' : ''}`}
            >
              {String(step).padStart(2, '0')}
            </div>
          )
        })}
      </div>
    </div>
  )
}
