import { motion } from 'framer-motion'
import { formatTime } from '../../data/leaderboard'
import { useGame } from '../../context/GameContext'
import { buildLeaderboard } from '../../data/leaderboard'

export default function Leaderboard() {
  const { playerName, score, elapsedSeconds, phase, leaderboard: gameBoard } =
    useGame()

  const entries =
    phase === 'reveal' && playerName
      ? gameBoard
      : buildLeaderboard(
          playerName && score != null && phase !== 'idle' ? playerName : null,
          playerName && phase !== 'idle' ? score : null,
          elapsedSeconds,
        )

  const top = entries.slice(0, 3)
  const rest = entries.slice(3, 10)
  const current = entries.find((e) => e.isCurrent)
  const showYourRank = current && current.rank > 10

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 md:px-6 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <p className="text-label text-red">RANKINGS</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-5xl">
          TOP INVESTIGATORS
        </h1>
        <p className="mt-3 text-muted">Solve the case. Climb the ranks.</p>
      </motion.div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {top.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card-3d relative rounded-sm border p-5 ${
              entry.isCurrent
                ? 'border-red bg-red/10 red-glow'
                : index === 0
                  ? 'border-red/50 bg-card red-glow md:-translate-y-2'
                  : 'border-border bg-card'
            }`}
          >
            <p
              className={`font-display text-4xl font-bold ${
                index === 0 ? 'text-red' : 'text-muted'
              }`}
            >
              {entry.rank}
            </p>
            <p className="mt-3 font-display text-lg font-semibold text-white">
              {entry.name}
              {entry.isCurrent && (
                <span className="ml-2 text-label text-red">YOU</span>
              )}
            </p>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted">Score</span>
              <span className="font-display font-bold text-white">{entry.score}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-muted">Time</span>
              <span className="font-display text-white">
                {formatTime(entry.timeSeconds)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card-3d overflow-hidden rounded-sm border border-border bg-card">
        <div className="grid grid-cols-[48px_1fr_80px_72px] gap-2 border-b border-border bg-bg-secondary px-4 py-3 text-label text-muted md:grid-cols-[64px_1fr_100px_100px]">
          <span>RANK</span>
          <span>PLAYER</span>
          <span className="text-right">SCORE</span>
          <span className="text-right">TIME</span>
        </div>
        {rest.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.04 }}
            className={`grid grid-cols-[48px_1fr_80px_72px] items-center gap-2 border-b border-border/60 px-4 py-3.5 md:grid-cols-[64px_1fr_100px_100px] ${
              entry.isCurrent ? 'bg-red/10' : 'hover:bg-bg-secondary/60'
            }`}
          >
            <span className="font-display font-bold text-muted">#{entry.rank}</span>
            <span className="truncate font-medium text-white">
              {entry.name}
              {entry.isCurrent && (
                <span className="ml-2 text-label text-red">YOU</span>
              )}
            </span>
            <span className="text-right font-display font-semibold text-white">
              {entry.score}
            </span>
            <span className="text-right text-sm text-muted">
              {formatTime(entry.timeSeconds)}
            </span>
          </motion.div>
        ))}
      </div>

      {showYourRank && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 card-3d rounded-sm border border-red bg-red/10 p-5 red-glow"
        >
          <p className="text-label text-muted">YOUR RANK</p>
          <p className="mt-1 font-display text-4xl font-bold text-red">
            #{current.rank}
          </p>
          <div className="mt-3 flex flex-wrap gap-6 text-sm">
            <span className="text-white">
              {current.name} · {current.score} pts
            </span>
            <span className="text-muted">{formatTime(current.timeSeconds)}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
