import { motion } from 'framer-motion'
import { CASE_ID } from '../../data/speakers'
import { useGame } from '../../context/GameContext'
import { useFinePointer, useIsNarrow } from '../../hooks/useFinePointer'

const PANELS = 5

/** Map clue progress → how many shutter strips lift (never all until submit) */
function openCount(percent, fullyRevealed) {
  if (fullyRevealed) return PANELS
  if (percent <= 0) return 0
  if (percent < 10) return 1
  if (percent < 20) return 2
  if (percent < 30) return 3
  return 4 // leave at least one strip locked until final submit
}

export default function SpeakerReveal({ forceFull = false, className = '' }) {
  const { speaker, revealPercent, phase } = useGame()
  const finePointer = useFinePointer()
  const narrow = useIsNarrow()
  const fullyRevealed = forceFull || phase === 'reveal'
  const percent = fullyRevealed ? 100 : revealPercent
  const openPanels = openCount(percent, fullyRevealed)

  // Keep the face hard to recognize until the case is submitted
  const blurMax = narrow ? 20 : 32
  const blurMin = narrow ? 8 : 14
  const blurPx = fullyRevealed
    ? 0
    : Math.max(blurMin, blurMax - percent * (narrow ? 0.28 : 0.4))
  const brightness = fullyRevealed ? 1 : 0.5 + percent * 0.008
  const contrast = fullyRevealed ? 1 : 1.4
  const saturate = fullyRevealed ? 1 : 0.25
  const confidence = fullyRevealed
    ? 99
    : Math.min(62, 18 + openPanels * 9)

  return (
    <div className={`perspective-[1000px] ${className}`}>
      <motion.div
        className="card-3d card-3d-motion relative overflow-hidden rounded-sm border border-red/40 bg-bg-secondary contain-paint"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 12, rotateY: narrow ? -3 : -6, rotateX: narrow ? 2 : 4 }}
        animate={{ opacity: 1, y: 0, rotateY: narrow ? -3 : -6, rotateX: narrow ? 2 : 4 }}
        whileHover={
          finePointer ? { rotateY: -2, rotateX: 1, y: -4 } : undefined
        }
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      >
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-border/80 bg-bg-primary/95 px-3 py-2 md:bg-bg-primary/80 md:backdrop-blur-sm">
          <span className="text-label text-red">EVIDENCE IMAGE</span>
          <span className="shrink-0 text-label text-muted">
            <span className="sm:hidden">{fullyRevealed ? 'CLOSED' : 'ACTIVE'}</span>
            <span className="hidden sm:inline">
              {fullyRevealed ? 'CASE STATUS: CLOSED' : 'CASE STATUS: ACTIVE'}
            </span>
          </span>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
          <img
            src={speaker.image}
            alt={
              fullyRevealed
                ? `Portrait of ${speaker.name}`
                : 'Classified mystery speaker evidence'
            }
            className="h-full w-full object-cover"
            style={
              fullyRevealed
                ? undefined
                : {
                    filter: `blur(${blurPx}px) brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
                    transform: narrow ? 'scale(1.05)' : 'scale(1.12)',
                    transformOrigin: 'center center',
                  }
            }
            loading="lazy"
            decoding="async"
          />

          {/* Mosaic overlay — CSS pattern on mobile; light backdrop blur on desktop */}
          {!fullyRevealed && (
            <div
              className="pointer-events-none absolute inset-0 z-[5]"
              style={{
                ...(narrow
                  ? {}
                  : {
                      backdropFilter: `blur(${Math.max(2, 8 - percent * 0.1)}px)`,
                      WebkitBackdropFilter: `blur(${Math.max(2, 8 - percent * 0.1)}px)`,
                    }),
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0 3px, transparent 3px 10px), repeating-linear-gradient(90deg, rgba(5,5,5,0.4) 0 3px, transparent 3px 10px)',
                opacity: narrow ? 0.9 : 0.85,
              }}
            />
          )}

          {/* Horizontal shutter panels — always leave strips locked mid-quiz */}
          <div className="absolute inset-0 z-10 flex flex-col">
            {Array.from({ length: PANELS }).map((_, i) => {
              const open = i < openPanels
              return (
                <motion.div
                  key={i}
                  className="relative flex-1 border-b border-red/20 bg-[#050505]"
                  initial={false}
                  animate={{
                    scaleY: open ? 0 : 1,
                    opacity: open ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: open ? i * 0.05 : 0,
                  }}
                  style={{ originY: i % 2 === 0 ? 0 : 1 }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(229,9,20,0.08),transparent)]" />
                  {!open && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-display text-[10px] tracking-[0.3em] text-red/40">
                      LOCKED {String(i + 1).padStart(2, '0')}
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>

          {!fullyRevealed && (
            <>
              <div className="pointer-events-none absolute inset-0 z-10 scanlines opacity-40 md:opacity-50" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-full overflow-hidden">
                <div className="animate-scan absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-red/25 to-transparent" />
              </div>
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35">
                <span className="font-display text-5xl font-bold text-red/80 drop-shadow-[0_0_12px_rgba(229,9,20,0.45)] md:text-6xl md:drop-shadow-[0_0_20px_rgba(229,9,20,0.5)]">
                  ?
                </span>
                <span className="mt-3 text-label text-white/80">IDENTITY CLASSIFIED</span>
                <span className="mt-2 max-w-[14rem] text-center text-[10px] tracking-wider text-muted uppercase">
                  Full reveal after final guess
                </span>
              </div>
            </>
          )}

          <div className="absolute bottom-3 left-3 z-20 rounded-sm border border-red/50 bg-bg-primary/95 px-2 py-1 text-label text-red md:bg-bg-primary/80 md:backdrop-blur-sm">
            {fullyRevealed ? speaker.name.toUpperCase() : 'SUBJECT UNKNOWN'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-border bg-bg-primary/90 p-3 text-[10px] tracking-wider text-muted uppercase md:grid-cols-4 md:text-[11px]">
          <div>
            <span className="text-muted/70">CASE ID</span>
            <p className="font-display text-white">{CASE_ID}</p>
          </div>
          <div>
            <span className="text-muted/70">EVIDENCE</span>
            <p className="font-display text-white">
              {String(Math.min(5, openPanels || 0)).padStart(2, '0')}
            </p>
          </div>
          <div>
            <span className="text-muted/70">CONFIDENCE</span>
            <p className="font-display text-red-bright">{confidence}%</p>
          </div>
          <div>
            <span className="text-muted/70">LOCATION</span>
            <p className="font-display text-white">
              {fullyRevealed ? 'CONFIRMED' : 'CLASSIFIED'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
