import { motion } from 'framer-motion'
import { speakerCandidates } from '../../data/speakers'
import { useGame } from '../../context/GameContext'
import SpeakerCard from './SpeakerCard'

export default function FinalGuess() {
  const { selectedGuessId, selectGuess, lockGuess } = useGame()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="card-3d rounded-sm border border-red/40 bg-card p-5 red-glow md:p-6">
        <p className="text-label text-red">FINAL ANALYSIS</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
          THE EVIDENCE IS IN.
        </h2>
        <p className="mt-2 font-display text-lg text-muted md:text-xl">
          WHO IS THE SUBJECT?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {speakerCandidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <SpeakerCard
              speaker={candidate}
              selected={selectedGuessId === candidate.id}
              onSelect={() => selectGuess(candidate.id)}
              revealPercent={100}
            />
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        disabled={!selectedGuessId}
        onClick={lockGuess}
        className={`btn-3d min-h-12 w-full rounded-sm px-4 py-3.5 text-label text-white md:w-auto md:min-w-[280px] ${
          selectedGuessId
            ? 'bg-red'
            : 'cursor-not-allowed bg-border text-muted shadow-none'
        }`}
      >
        LOCK IN MY GUESS
      </button>
    </motion.div>
  )
}
