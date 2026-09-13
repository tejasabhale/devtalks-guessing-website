import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-border/80 bg-bg-secondary/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-white">
            DevTalks · DYPIT
          </p>
          <p className="mt-1 text-sm text-muted">
            A technology community experience by DYPIT.
          </p>
        </div>
        <div className="flex gap-6 text-label text-muted">
          <Link to="/" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <a href="mailto:devtalks@dypit.edu" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
