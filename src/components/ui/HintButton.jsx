import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { useGame } from '../../context/GameContext'

export default function HintButton() {
  const {
    useHint,
    hintsUsed,
    maxHints,
    hintsRevealed,
    speaker,
    currentClueIndex,
    phase,
  } = useGame()

  const clue = speaker.clues[currentClueIndex]
  const revealed = clue ? hintsRevealed[clue.id] : false
  const remaining = maxHints - hintsUsed
  const disabled = phase !== 'playing' || remaining <= 0 || revealed

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={useHint}
        disabled={disabled}
        className={`btn-ghost-3d flex min-h-11 w-full items-center justify-center gap-2 rounded-sm border border-border bg-bg-secondary px-4 py-3 text-label ${
          disabled ? 'cursor-not-allowed opacity-50' : 'text-white hover:text-red-bright'
        }`}
      >
        <HiOutlineLightBulb className="text-red" size={18} />
        REQUEST HINT
        <span className="text-muted">({remaining} left)</span>
      </button>

      <AnimatePresence>
        {revealed && clue && (
          <motion.div
            initial={{ opacity: 0, height: 0, rotateX: -8 }}
            animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-sm border border-red/40 bg-red/5 p-4 red-glow"
          >
            <p className="text-label text-red mb-2">CONFIDENTIAL TIP</p>
            <p className="text-sm leading-relaxed text-white/90">{clue.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
