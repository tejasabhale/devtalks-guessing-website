import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiShare } from 'react-icons/hi'
import { useGame } from '../../context/GameContext'
import SpeakerReveal from './SpeakerReveal'
import { playWin, playLose } from '../../utils/sounds'

function buildWhatsAppShareUrl({ score, playerName, playerRank, isCorrectGuess }) {
  const siteUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://devtalks.local'
  const rankLine =
    playerRank != null ? ` Rank: #${playerRank}.` : ''
  const resultLine = isCorrectGuess
    ? 'I cracked the case on Guess the Speaker!'
    : 'I just played Guess the Speaker — can you crack the case?'
  const nameBit = playerName ? `${playerName} scored` : 'I scored'
  const message = `${resultLine}\n${nameBit} ${score} points.${rankLine}\n\nPlay here: ${siteUrl}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

function ConfettiBurst() {
  const narrow =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches
  const count = narrow ? 14 : 36
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${4 + (i * 2.7) % 92}%`,
        delay: (i % 12) * 0.05,
        duration: 1.4 + (i % 5) * 0.25,
        color: i % 3 === 0 ? '#e50914' : i % 3 === 1 ? '#ff3030' : '#f5f5f5',
        size: 4 + (i % 4) * 2,
        x: ((i * 17) % 80) - 40,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-[1px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0, x: 0 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: 360 + p.id * 20,
            x: p.x,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

export default function FinalReveal() {
  const {
    speaker,
    isCorrectGuess,
    score,
    playerRank,
    playerName,
    resetGame,
  } = useGame()

  useEffect(() => {
    if (isCorrectGuess) playWin()
    else playLose()
  }, [isCorrectGuess])

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppShareUrl({
        score,
        playerName,
        playerRank,
        isCorrectGuess,
      }),
    [score, playerName, playerRank, isCorrectGuess],
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        isCorrectGuess
          ? { opacity: 1 }
          : { opacity: 1, x: [0, -10, 10, -8, 8, -4, 4, 0] }
      }
      transition={
        isCorrectGuess
          ? { duration: 0.4 }
          : { duration: 0.55, ease: 'easeOut' }
      }
      className="relative"
    >
      {isCorrectGuess && <ConfettiBurst />}

      <div
        className={`pointer-events-none absolute inset-0 -z-10 ${
          isCorrectGuess ? 'bg-black/40' : 'bg-red-dark/30'
        }`}
      />
      <div
        className={`pointer-events-none absolute left-1/2 top-10 -z-10 h-40 w-40 -translate-x-1/2 rounded-full blur-[48px] md:h-64 md:w-64 md:blur-[100px] ${
          isCorrectGuess ? 'bg-red/35 animate-win-pulse' : 'bg-red-bright/40 animate-lose-flicker'
        }`}
      />

      {!isCorrectGuess && (
        <div className="pointer-events-none absolute inset-0 -z-10 animate-lose-vignette bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(139,0,0,0.45)_100%)]" />
      )}

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            ...(isCorrectGuess
              ? {}
              : {
                  x: [0, -3, 3, -2, 2, 0],
                }),
          }}
          transition={{ delay: 0.15, duration: isCorrectGuess ? 0.6 : 0.9 }}
          className={isCorrectGuess ? 'animate-win-reveal' : 'animate-lose-glitch'}
        >
          <SpeakerReveal forceFull />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className={`text-label ${isCorrectGuess ? 'text-red' : 'text-red-bright'}`}>
              {isCorrectGuess ? 'CASE SOLVED' : 'CASE FAILED'}
            </p>
            <p className="mt-3 text-label text-muted">THE SPEAKER IS...</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">
              {speaker.name}
            </h2>
            <p className="mt-2 text-lg text-muted">{speaker.designation}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {speaker.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className={`card-3d rounded-sm border p-5 ${
              isCorrectGuess
                ? 'border-red bg-red/10 red-glow animate-win-glow'
                : 'border-red-bright/60 bg-red-dark/25 animate-lose-border'
            }`}
          >
            <p className={`text-label ${isCorrectGuess ? 'text-red-bright' : 'text-red-bright'}`}>
              {isCorrectGuess ? 'IDENTITY CONFIRMED' : 'CASE UNSOLVED'}
            </p>
            {!isCorrectGuess && (
              <p className="mt-2 text-sm text-muted">
                Wrong subject. The file is closed — study the evidence and try again.
              </p>
            )}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-label text-muted">YOUR SCORE</p>
                <p className="font-display text-3xl font-bold text-white">{score}</p>
              </div>
              <div>
                <p className="text-label text-muted">YOUR RANK</p>
                <p className="font-display text-3xl font-bold text-red">
                  {playerRank != null ? `#${playerRank}` : '—'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-red px-5 py-3 text-label text-white"
            >
              <HiShare size={18} aria-hidden />
              SHARE MY SCORE
            </a>
            <Link
              to="/leaderboard"
              className="btn-ghost-3d inline-flex min-h-12 items-center justify-center rounded-sm border border-border bg-bg-secondary px-5 py-3 text-label text-white"
            >
              VIEW LEADERBOARD
            </Link>
            <button
              type="button"
              onClick={resetGame}
              className="btn-ghost-3d inline-flex min-h-12 items-center justify-center rounded-sm border border-border bg-bg-secondary px-5 py-3 text-label text-white"
            >
              NEW INVESTIGATION
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
