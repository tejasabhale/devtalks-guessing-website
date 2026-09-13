import { CASE_FILE } from '../../data/speakers'
import { useGame } from '../../context/GameContext'
import ScorePanel from '../ui/ScorePanel'

export default function CaseHeader() {
  const { playerName, phase } = useGame()

  const status =
    phase === 'reveal'
      ? 'CLOSED'
      : phase === 'finalGuess'
        ? 'FINAL ANALYSIS'
        : 'ACTIVE'

  return (
    <div className="card-3d flex flex-col gap-4 rounded-sm border border-border bg-card/90 p-4 md:flex-row md:items-center md:justify-between md:p-5">
      <div>
        <p className="text-label text-red">{CASE_FILE}</p>
        <h2 className="mt-1 font-display text-xl font-bold tracking-wide text-white md:text-2xl">
          MYSTERY SPEAKER
        </h2>
        <p className="mt-2 text-label text-muted">
          INVESTIGATION STATUS:{' '}
          <span className="text-red-bright">{status}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-sm border border-border bg-bg-secondary px-3 py-2">
          <p className="text-label text-muted">PLAYER</p>
          <p className="font-display text-sm font-semibold text-white md:text-base">
            {playerName || 'UNKNOWN'}
          </p>
        </div>
        <ScorePanel compact />
      </div>
    </div>
  )
}
