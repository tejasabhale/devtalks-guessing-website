import { useEffect, useState } from 'react'

/** True when the tab is visible — use to pause infinite work while backgrounded. */
export function useDocumentVisible() {
  const [visible, setVisible] = useState(() =>
    typeof document === 'undefined' ? true : document.visibilityState !== 'hidden',
  )

  useEffect(() => {
    const onChange = () => {
      const next = document.visibilityState !== 'hidden'
      setVisible(next)
      document.documentElement.classList.toggle('anim-paused', !next)
    }
    onChange()
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return visible
}
