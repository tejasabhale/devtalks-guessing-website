import { motion } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'

export default function SpeakerCard({
  speaker,
  selected,
  onSelect,
  revealPercent = 40,
}) {
  const finePointer = useFinePointer()
  const panels = 5
  const openPanels = Math.round(revealPercent / 20)

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={finePointer ? { y: -6, scale: 1.02 } : undefined}
      whileTap={{ y: 0, scale: 0.99 }}
      aria-pressed={selected}
      className={`card-3d group w-full overflow-hidden rounded-sm border text-left transition-colors ${
        selected
          ? 'border-red bg-red/10 red-glow'
          : 'border-border bg-card hover:border-red/60'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black">
        <img
          src={speaker.image}
          alt={`Candidate: ${speaker.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: panels }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 border-b border-red/10 ${
                i < openPanels ? 'bg-transparent' : 'bg-[#050505]/90'
              }`}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />
      </div>
      <div className="border-t border-border p-3">
        <p className="font-display text-sm font-bold text-white md:text-base">
          {speaker.name}
        </p>
        <p className="mt-1 text-xs text-muted">{speaker.designation}</p>
        <p className="mt-2 text-label text-red/80">{speaker.category}</p>
      </div>
    </motion.button>
  )
}
