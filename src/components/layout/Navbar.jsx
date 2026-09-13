import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi'
import { useGame } from '../../context/GameContext'

const links = [
  { to: '/', label: 'HOME' },
  { to: '/guess', label: 'GUESS THE SPEAKER' },
  { to: '/leaderboard', label: 'LEADERBOARD' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { openNameEntry, phase, resetGame } = useGame()

  const startInvestigation = () => {
    setOpen(false)
    if (phase === 'idle' || phase === 'name') {
      openNameEntry()
      navigate('/guess')
      return
    }
    navigate('/guess')
  }

  const handleLogoClick = () => {
    if (phase === 'reveal') resetGame()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg-primary/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-6">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-3"
          aria-label="DevTalks DYPIT home"
        >
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-[0.12em] text-white group-hover:text-red-bright transition-colors">
              DEV
              <span className="text-red">TALKS</span>
            </span>
            <span className="mt-0.5 text-[10px] tracking-[0.35em] text-muted">DYPIT</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-label transition-colors ${
                  isActive ? 'text-red' : 'text-muted hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={startInvestigation}
            className="btn-3d rounded-sm bg-red px-5 py-2.5 text-label text-white"
          >
            START INVESTIGATION
          </button>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-border text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiOutlineX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-bg-secondary lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-sm px-3 py-3 text-label ${
                      isActive ? 'bg-card text-red' : 'text-muted'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={startInvestigation}
                className="btn-3d mt-2 rounded-sm bg-red px-4 py-3.5 text-label text-white"
              >
                START INVESTIGATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
