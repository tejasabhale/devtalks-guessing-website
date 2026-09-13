import { useEffect, useState } from 'react'

/** True when the device supports fine hover (desktop mice). False on most phones. */
export function useFinePointer() {
  const [fine, setFine] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setFine(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return fine
}

/** True for typical phone/tablet widths. */
export function useIsNarrow() {
  const [narrow, setNarrow] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 767px)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setNarrow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return narrow
}
