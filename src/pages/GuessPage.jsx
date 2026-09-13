import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import NameEntry from '../components/game/NameEntry'
import CaseHeader from '../components/game/CaseHeader'
import SpeakerReveal from '../components/game/SpeakerReveal'
import ProgressBar from '../components/ui/ProgressBar'
import ClueCard from '../components/game/ClueCard'
import HintButton from '../components/ui/HintButton'
import FinalGuess from '../components/game/FinalGuess'
import FinalReveal from '../components/game/FinalReveal'

export default function GuessPage() {
  const { phase, cluesCompleted, currentClueIndex, speaker } = useGame()

  if (phase === 'idle' || phase === 'name') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <NameEntry />
      </motion.div>
    )
  }

  if (phase === 'reveal') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="px-5 py-10 md:px-6 md:py-14"
      >
        <div className="mx-auto max-w-6xl">
          <FinalReveal />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-5 py-8 md:px-6 md:py-12"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <CaseHeader />

        {phase === 'finalGuess' ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <SpeakerReveal />
              <div className="lg:hidden">
                <ProgressBar
                  completed={cluesCompleted}
                  activeIndex={currentClueIndex}
                  total={speaker.clues.length}
                />
              </div>
            </div>
            <FinalGuess />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Mobile order: speaker → progress → clue → answers → score → hint */}
            <div className="space-y-4">
              <SpeakerReveal />
              <div className="lg:hidden">
                <ProgressBar
                  completed={cluesCompleted}
                  activeIndex={currentClueIndex}
                  total={speaker.clues.length}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="hidden lg:block">
                <ProgressBar
                  completed={cluesCompleted}
                  activeIndex={currentClueIndex}
                  total={speaker.clues.length}
                />
              </div>
              <ClueCard />
              <HintButton />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
