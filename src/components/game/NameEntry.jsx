import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'

export default function NameEntry() {
  const { beginCase, playerName } = useGame()
  const [name, setName] = useState(playerName || '')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setError('Enter at least 2 characters.')
      return
    }
    if (trimmed.length > 24) {
      setError('Keep it under 24 characters.')
      return
    }
    setError('')
    beginCase(trimmed)
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5 }}
        className="card-3d relative w-full overflow-hidden rounded-sm border border-red/40 bg-card p-6 red-glow md:p-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red/20 blur-xl md:blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-red-dark/30 blur-xl md:blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-label text-red">CASE INTAKE</span>
            <span className="text-label text-muted">FORM DT-01</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-wide text-white md:text-4xl">
            IDENTIFY YOURSELF
          </h1>
          <p className="mt-3 text-muted">
            Enter your name to begin the investigation.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="investigator-name" className="text-label text-muted">
                YOUR NAME
              </label>
              <input
                id="investigator-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Investigator name"
                className="mt-2 min-h-12 w-full rounded-sm border border-border bg-bg-secondary px-4 py-3 text-white placeholder:text-muted/50 focus:border-red focus:outline-none"
              />
              {error && (
                <p className="mt-2 text-sm text-red-bright" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-3d min-h-12 w-full rounded-sm bg-red px-4 py-3.5 text-label text-white"
            >
              BEGIN CASE
            </button>
          </form>

          <div className="mt-6 flex justify-between border-t border-border pt-4 text-[10px] tracking-[0.25em] text-muted uppercase">
            <span>CLASSIFIED ACCESS</span>
            <span>DYPIT · DEVTALKS</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
