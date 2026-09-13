/** Lightweight Web Audio SFX — no external files required */

let audioCtx = null

function getCtx() {
  if (typeof window === 'undefined') return null
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  if (!audioCtx) audioCtx = new Ctx()
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

function tone(ctx, { freq, type = 'sine', start, duration, gain = 0.12, slideTo }) {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  if (slideTo != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), start + duration)
  }
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

/** Soft positive blip when a clue is answered correctly */
export function playCorrect() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  tone(ctx, { freq: 523.25, type: 'triangle', start: t, duration: 0.12, gain: 0.1 })
  tone(ctx, { freq: 659.25, type: 'triangle', start: t + 0.08, duration: 0.14, gain: 0.1 })
  tone(ctx, { freq: 783.99, type: 'sine', start: t + 0.16, duration: 0.22, gain: 0.08 })
}

/** Short buzz when a clue answer is wrong */
export function playIncorrect() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  tone(ctx, { freq: 180, type: 'sawtooth', start: t, duration: 0.18, gain: 0.06, slideTo: 90 })
  tone(ctx, { freq: 140, type: 'square', start: t + 0.1, duration: 0.2, gain: 0.04, slideTo: 70 })
}

/** Triumphant sting for solving the case */
export function playWin() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, i) => {
    tone(ctx, {
      freq,
      type: i === notes.length - 1 ? 'sine' : 'triangle',
      start: t + i * 0.12,
      duration: 0.28 + i * 0.05,
      gain: 0.09 - i * 0.01,
    })
  })
  tone(ctx, { freq: 1318.5, type: 'sine', start: t + 0.52, duration: 0.45, gain: 0.06 })
}

/** Dramatic fail for wrong final guess */
export function playLose() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  tone(ctx, { freq: 220, type: 'sawtooth', start: t, duration: 0.35, gain: 0.07, slideTo: 110 })
  tone(ctx, { freq: 165, type: 'square', start: t + 0.2, duration: 0.4, gain: 0.05, slideTo: 70 })
  tone(ctx, { freq: 90, type: 'triangle', start: t + 0.45, duration: 0.55, gain: 0.06, slideTo: 45 })
}

/** Soft shutter click when a new evidence panel peeks open */
export function playRevealTick() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  tone(ctx, { freq: 880, type: 'square', start: t, duration: 0.04, gain: 0.035 })
  tone(ctx, { freq: 440, type: 'triangle', start: t + 0.03, duration: 0.06, gain: 0.025 })
}
