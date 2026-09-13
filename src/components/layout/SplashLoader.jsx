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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading DevTalks x DevKraft"
        >
          <div className="pointer-events-none absolute inset-0 grid-investigation opacity-50" />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />
          <div className="noise-overlay absolute inset-0" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,9,20,0.28)_0%,transparent_68%)] blur-3xl"
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.92, 1.08, 0.92] }}
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

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.p
              className="text-label text-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              CASE FILE · INIT
            </motion.p>

            <motion.h1
              className="mt-5 font-display text-3xl font-bold tracking-[0.08em] text-white sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block">
                DEV
                <span className="text-red">TALKS</span>
              </span>
              <motion.span
                className="mx-3 inline-block font-display text-2xl font-semibold tracking-[0.2em] text-muted sm:mx-4 sm:text-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                ×
              </motion.span>
              <span className="inline-block">
                DEV
                <span className="text-red">KRAFT</span>
              </span>
            </motion.h1>

            <motion.div
              className="mt-8 h-px w-40 overflow-hidden bg-border sm:w-56"
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
              className="mt-6 flex items-center gap-2"
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

          <div className="pointer-events-none absolute inset-x-6 bottom-8 flex justify-between font-display text-[10px] tracking-[0.35em] text-muted/50 uppercase sm:inset-x-10">
            <span>SEC-LEVEL · RED</span>
            <span>DEVTALKS · DYPIT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
