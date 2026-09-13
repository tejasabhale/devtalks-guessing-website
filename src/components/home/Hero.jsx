import { Link, useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useGame } from '../../context/GameContext'
import { CASE_FILE } from '../../data/speakers'
import { useDocumentVisible } from '../../hooks/useDocumentVisible'
import { useFinePointer } from '../../hooks/useFinePointer'

export default function Hero() {
  const navigate = useNavigate()
  const { openNameEntry } = useGame()
  const frameRef = useRef(null)
  const rectRef = useRef(null)
  const finePointer = useFinePointer()
  const tabVisible = useDocumentVisible()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  })

  const cacheRect = () => {
    const el = frameRef.current
    if (!el) return
    rectRef.current = el.getBoundingClientRect()
  }

  const onMove = (e) => {
    if (!finePointer) return
    const rect = rectRef.current
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const start = () => {
    openNameEntry()
    navigate('/guess')
  }

  return (
    <section className="relative overflow-x-clip px-5 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-label text-red"
          >
            DEVTALKS · DYPIT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            CAN YOU
            <br />
            <span className="text-red">GUESS THE SPEAKER?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg"
          >
            Five clues. One mystery speaker. Can you identify them before the
            evidence runs out?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={start}
              className="btn-3d min-h-12 rounded-sm bg-red px-6 py-3.5 text-label text-white"
            >
              START INVESTIGATION
            </button>
            <Link
              to="/leaderboard"
              className="btn-ghost-3d inline-flex min-h-12 items-center justify-center rounded-sm border border-border bg-bg-secondary px-6 py-3.5 text-label text-white"
            >
              VIEW LEADERBOARD
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={frameRef}
          onMouseEnter={finePointer ? cacheRect : undefined}
          onMouseMove={finePointer ? onMove : undefined}
          onMouseLeave={finePointer ? onLeave : undefined}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ perspective: 1200 }}
          className="relative mx-auto w-full max-w-md px-1 lg:max-w-none lg:px-0"
        >
          <motion.div
            style={
              finePointer
                ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
                : { transformStyle: 'preserve-3d' }
            }
            animate={
              finePointer || !tabVisible
                ? undefined
                : { y: [0, -5, 0] }
            }
            transition={
              finePointer || !tabVisible
                ? undefined
                : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
            }
            className="card-3d card-3d-motion relative overflow-hidden rounded-sm border border-red/50 bg-card red-glow contain-paint"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-label text-red">{CASE_FILE}</span>
              <span className="text-label text-muted">CLASSIFIED</span>
            </div>

            <div className="relative aspect-[4/5] bg-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.15),transparent_65%)]" />
              <div className="absolute inset-0 scanlines opacity-40 md:opacity-50" />
              <div className="animate-scan absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-red/30 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <motion.span
                  animate={
                    tabVisible
                      ? { opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }
                      : { opacity: 0.8, scale: 1 }
                  }
                  transition={
                    tabVisible
                      ? { duration: 3, repeat: Infinity }
                      : { duration: 0.2 }
                  }
                  className="font-display text-6xl font-bold text-red sm:text-7xl md:text-8xl"
                >
                  ?
                </motion.span>
                <p className="mt-4 text-label text-white">MYSTERY SPEAKER</p>
                <p className="mt-2 text-center text-label text-muted">
                  IDENTITY: CLASSIFIED
                </p>
              </div>

              <div className="absolute left-3 top-3 rounded-sm border border-red/40 bg-bg-primary/90 px-2 py-1 text-[10px] tracking-widest text-red uppercase">
                EVIDENCE TAG
              </div>
              <div className="absolute bottom-3 right-3 rounded-sm border border-border bg-bg-primary/90 px-2 py-1 text-[10px] tracking-widest text-muted uppercase">
                REVEAL 0%
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border bg-bg-secondary px-4 py-3 text-[10px] tracking-wider text-muted uppercase">
              <span>FILE OPEN</span>
              <span className="text-center text-red">SCANNING</span>
              <span className="text-right">DT-001</span>
            </div>
          </motion.div>

          {/* Floating chips — inset on mobile so they never collide or clip */}
          <motion.div
            animate={tabVisible ? { y: [0, -6, 0] } : { y: 0 }}
            transition={
              tabVisible
                ? { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.2 }
            }
            className="pointer-events-none absolute left-2 top-12 z-10 rounded-sm border border-border bg-card/95 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-muted uppercase shadow-lg sm:left-0 sm:top-16 sm:px-3 sm:py-2 sm:text-label md:-left-4"
            style={{ rotate: -6 }}
          >
            EVIDENCE
          </motion.div>
          <motion.div
            animate={tabVisible ? { y: [0, 5, 0] } : { y: 0 }}
            transition={
              tabVisible
                ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
                : { duration: 0.2 }
            }
            className="pointer-events-none absolute right-2 bottom-20 z-10 rounded-sm border border-red/30 bg-bg-secondary/95 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-red uppercase shadow-lg sm:right-0 sm:bottom-24 sm:px-3 sm:py-2 sm:text-label md:-right-3"
            style={{ rotate: 5 }}
          >
            CLASSIFIED
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
