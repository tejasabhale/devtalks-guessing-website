import { motion } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'

export default function AnswerButton({
  label,
  selected,
  correct,
  incorrect,
  disabled,
  onClick,
}) {
  const finePointer = useFinePointer()
  let stateClass =
    'border-border bg-bg-secondary text-white hover:border-red/60 hover:bg-card'

  if (selected && correct) {
    stateClass = 'border-red bg-red/20 text-white red-glow'
  } else if (selected && incorrect) {
    stateClass = 'border-red-bright/70 bg-red-dark/30 text-white'
  } else if (disabled && !selected) {
    stateClass = 'border-border/60 bg-bg-secondary/50 text-muted'
  }

  return (
    <motion.button
      type="button"
      whileHover={
        disabled || !finePointer ? undefined : { y: -2, scale: 1.01 }
      }
      whileTap={disabled ? undefined : { y: 1, scale: 0.99 }}
      onClick={onClick}
      disabled={disabled}
      className={`min-h-12 w-full rounded-sm border px-4 py-3.5 text-left text-sm font-medium transition-colors md:text-[15px] ${stateClass}`}
    >
      {label}
    </motion.button>
  )
}
