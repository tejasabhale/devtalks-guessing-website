import { motion } from 'framer-motion'

export default function InvestigationBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 grid-investigation opacity-60" />

      <motion.div
        className="animate-ambient absolute -left-1/4 top-[-10%] h-[55vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(229,9,20,0.18)_0%,transparent_70%)] blur-3xl"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-[-5%] h-[45vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(139,0,0,0.22)_0%,transparent_70%)] blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <div className="absolute left-1/2 top-1/3 h-[30vh] w-[40vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.06)_0%,transparent_70%)] blur-2xl" />

      <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-red/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-[22%] h-px bg-gradient-to-r from-transparent via-red-dark/40 to-transparent" />
      <div className="absolute inset-y-0 left-[12%] w-px bg-gradient-to-b from-transparent via-red/15 to-transparent" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-red/10 to-transparent" />

      <div className="absolute left-4 top-24 hidden font-display text-[10px] tracking-[0.35em] text-muted/40 uppercase md:block">
        LAT 18.52 · LNG 73.85
      </div>
      <div className="absolute right-4 bottom-28 hidden font-display text-[10px] tracking-[0.35em] text-muted/40 uppercase md:block">
        SEC-LEVEL · RED
      </div>

      <div className="noise-overlay absolute inset-0" />
    </div>
  )
}
