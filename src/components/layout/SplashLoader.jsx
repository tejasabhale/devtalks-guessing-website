import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DISPLAY_MS = 2400

export default function SplashLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = reduce ? 400 : DISPLAY_MS
    const id = window.setTimeout(() => setVisible(false), delay)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-bg-primary contain-paint"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading DevTalks x DevKraft"
        >
          <div className="pointer-events-none absolute inset-0 grid-investigation opacity-40 md:opacity-50" />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-30 md:opacity-40" />
          <div className="noise-overlay absolute inset-0" />

          <motion.div
            className="gpu-layer absolute left-1/2 top-1/2 h-[min(42vw,11rem)] w-[min(42vw,11rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,9,20,0.28)_0%,transparent_68%)] blur-xl sm:h-[40vmin] sm:w-[40vmin] md:h-[50vmin] md:w-[50vmin] md:blur-3xl"
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-red to-transparent"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-red/15 via-red/5 to-transparent" />
          </div>

          <div className="relative z-10 flex w-full max-w-[min(100%,22rem)] flex-col items-center px-5 text-center sm:max-w-none sm:px-6">
            <motion.p
              className="text-label text-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              CASE FILE · INIT
            </motion.p>

            <motion.h1
              className="mt-5 flex w-full flex-col items-center gap-2 font-display text-[1.65rem] font-bold leading-none tracking-[0.06em] text-white sm:mt-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-0 sm:text-4xl sm:tracking-[0.08em] md:text-5xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block whitespace-nowrap">
                DEV
                <span className="text-red">TALKS</span>
              </span>
              <motion.span
                className="inline-block font-display text-xl font-semibold tracking-[0.2em] text-muted sm:mx-3 sm:text-2xl md:mx-4 md:text-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                aria-hidden="true"
              >
                ×
              </motion.span>
              <span className="inline-block whitespace-nowrap">
                DEV
                <span className="text-red">KRAFT</span>
              </span>
            </motion.h1>

            <motion.div
              className="mt-7 h-px w-[min(10rem,55vw)] overflow-hidden bg-border sm:mt-8 sm:w-56"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <motion.div
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-red-bright to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
            </motion.div>

            <motion.div
              className="mt-5 flex items-center gap-2 sm:mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-red"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.18,
                  }}
                />
              ))}
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex justify-between gap-3 font-display text-[9px] tracking-[0.2em] text-muted/50 uppercase sm:inset-x-10 sm:bottom-8 sm:text-[10px] sm:tracking-[0.35em]">
            <span className="truncate">SEC-LEVEL · RED</span>
            <span className="truncate text-right">DEVTALKS · DYPIT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
