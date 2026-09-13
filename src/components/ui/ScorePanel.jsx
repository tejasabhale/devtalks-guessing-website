import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../../context/GameContext'

export default function ScorePanel({ compact = false }) {
  const { score, scoreFlash, clearScoreFlash } = useGame()

  useEffect(() => {
    if (scoreFlash == null) return
    const t = setTimeout(() => clearScoreFlash(), 1200)
    return () => clearTimeout(t)
  }, [scoreFlash, clearScoreFlash])

  return (
    <div
      className={`relative flex items-center gap-3 rounded-sm border border-border bg-card/80 px-3 py-2 card-3d ${
        compact ? '' : 'px-4 py-3'
      }`}
    >
      <div>
        <p className="text-label text-muted">SCORE</p>
        <motion.p
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          key={score}
          transition={{ duration: 0.25 }}
          className="font-display text-xl font-bold text-white tabular-nums md:text-2xl"
        >
          {score}
        </motion.p>
      </div>

      <AnimatePresence>
        {scoreFlash != null && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: -4 }}
            exit={{ opacity: 0, y: -16 }}
            className={`absolute -top-2 right-3 font-display text-sm font-bold ${
              scoreFlash > 0 ? 'text-red-bright' : 'text-muted'
            }`}
          >
            {scoreFlash > 0 ? `+${scoreFlash}` : scoreFlash}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
