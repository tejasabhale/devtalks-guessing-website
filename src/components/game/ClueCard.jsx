import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import { useGame } from '../../context/GameContext'
import AnswerButton from '../ui/AnswerButton'
import { playCorrect, playIncorrect, playRevealTick } from '../../utils/sounds'
import { useIsNarrow } from '../../hooks/useFinePointer'

export default function ClueCard() {
  const {
    speaker,
    currentClueIndex,
    selectAnswer,
    selectedAnswerId,
    feedback,
    lockedClue,
    advanceClue,
  } = useGame()
  const narrow = useIsNarrow()

  const lastFeedback = useRef(null)

  useEffect(() => {
    if (!feedback || feedback === lastFeedback.current) return
    lastFeedback.current = feedback
    if (feedback === 'correct') {
      playCorrect()
      setTimeout(() => playRevealTick(), 220)
    } else if (feedback === 'incorrect') {
      playIncorrect()
      setTimeout(() => playRevealTick(), 280)
    }
  }, [feedback])

  useEffect(() => {
    lastFeedback.current = null
  }, [currentClueIndex])

  const clue = speaker.clues[currentClueIndex]
  if (!clue) return null

  const enter = {
    opacity: 0,
    x: narrow ? 16 : 24,
    rotateY: narrow ? -3 : -6,
    scale: narrow ? 0.99 : 0.98,
  }
  const center = { opacity: 1, x: 0, rotateY: 0, scale: 1 }
  const leave = {
    opacity: 0,
    x: narrow ? -16 : -24,
    rotateY: narrow ? 3 : 6,
    scale: narrow ? 0.99 : 0.98,
  }

  return (
    <div className="perspective-[800px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={clue.id}
          initial={enter}
          animate={center}
          exit={leave}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="card-3d card-3d-motion rounded-sm border border-border bg-card p-5 md:p-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-label text-red">{clue.evidenceLabel}</p>
            <p className="shrink-0 text-label text-muted">
              {String(currentClueIndex + 1).padStart(2, '0')} / 05
            </p>
          </div>

          <p className="text-label text-muted mb-2">CLUE</p>
          <p className="font-display text-lg font-semibold leading-snug text-white md:text-xl">
            {clue.text}
          </p>

          <div className="mt-6 space-y-3">
            {clue.options.map((option) => (
              <AnswerButton
                key={option.id}
                label={option.label}
                selected={selectedAnswerId === option.id}
                correct={feedback === 'correct' && selectedAnswerId === option.id}
                incorrect={feedback === 'incorrect' && selectedAnswerId === option.id}
                disabled={lockedClue}
                onClick={() => selectAnswer(option.id)}
              />
            ))}
          </div>

          <AnimatePresence>
            {feedback === 'correct' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex flex-col gap-3 rounded-sm border border-red bg-red/10 p-4 red-glow sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2 text-red-bright">
                  <HiCheckCircle size={22} />
                  <span className="text-label">CASE CRACKED</span>
                </div>
                <button
                  type="button"
                  onClick={advanceClue}
                  className="btn-3d min-h-11 rounded-sm bg-red px-4 py-2.5 text-label text-white"
                >
                  NEXT EVIDENCE
                </button>
              </motion.div>
            )}

            {feedback === 'incorrect' && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                transition={{ duration: 0.45 }}
                className="mt-5 flex flex-col gap-3 rounded-sm border border-red-bright/50 bg-red-dark/20 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-red-bright">
                    <HiExclamationCircle size={22} />
                    <span className="text-label">LEAD FAILED</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Investigation continues. New evidence unlocked.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={advanceClue}
                  className="btn-3d min-h-11 rounded-sm bg-red px-4 py-2.5 text-label text-white"
                >
                  CONTINUE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
