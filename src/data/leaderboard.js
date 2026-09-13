/** Mock leaderboard — current player injected at runtime */

export const mockLeaderboard = [
  { id: 1, name: 'Neha Kulkarni', score: 1780, timeSeconds: 142 },
  { id: 2, name: 'Vikram Shah', score: 1650, timeSeconds: 168 },
  { id: 3, name: 'Ananya Rao', score: 1590, timeSeconds: 155 },
  { id: 4, name: 'Kabir Joshi', score: 1480, timeSeconds: 190 },
  { id: 5, name: 'Meera Iyer', score: 1410, timeSeconds: 210 },
  { id: 6, name: 'Dev Patel', score: 1360, timeSeconds: 188 },
  { id: 7, name: 'Sana Qureshi', score: 1290, timeSeconds: 225 },
  { id: 8, name: 'Arjun Malhotra', score: 1220, timeSeconds: 240 },
  { id: 9, name: 'Diya Banerjee', score: 1180, timeSeconds: 198 },
  { id: 10, name: 'Harsh Verma', score: 1100, timeSeconds: 260 },
  { id: 11, name: 'Riya Chawla', score: 1050, timeSeconds: 275 },
  { id: 12, name: 'Yash Thakur', score: 980, timeSeconds: 290 },
]

export function formatTime(seconds) {
  if (seconds == null || Number.isNaN(seconds)) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/**
 * Merge current player into leaderboard and compute rank.
 */
export function buildLeaderboard(playerName, playerScore, playerTimeSeconds) {
  const entries = mockLeaderboard.map((e) => ({ ...e, isCurrent: false }))

  if (playerName && playerScore != null) {
    entries.push({
      id: 'current',
      name: playerName,
      score: playerScore,
      timeSeconds: playerTimeSeconds ?? 0,
      isCurrent: true,
    })
  }

  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.timeSeconds - b.timeSeconds
  })

  return entries.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }))
}
