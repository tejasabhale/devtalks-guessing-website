import { createContext, useContext, useMemo, useReducer, useCallback } from 'react'
import {
  mysterySpeaker,
  SCORE_RULES,
} from '../data/speakers'
import { buildLeaderboard } from '../data/leaderboard'

const GameContext = createContext(null)

const initialState = {
  playerName: '',
  score: SCORE_RULES.startingScore,
  currentClueIndex: 0,
  cluesCompleted: 0,
  revealPercent: 0,
  hintsUsed: 0,
  hintsRevealed: {},
  phase: 'idle', // idle | name | playing | finalGuess | reveal
  feedback: null, // null | 'correct' | 'incorrect'
  selectedAnswerId: null,
  lockedClue: false,
  selectedGuessId: null,
  guessLocked: false,
  isCorrectGuess: null,
  startTime: null,
  endTime: null,
  elapsedSeconds: null,
  scoreFlash: null,
}

function applyDelta(score, delta) {
  return Math.max(0, score + delta)
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, playerName: action.payload }
    case 'OPEN_NAME_ENTRY':
      return { ...state, phase: 'name' }
    case 'BEGIN_CASE': {
      const name = (action.payload || state.playerName).trim()
      if (!name) return state
      return {
        ...initialState,
        playerName: name,
        phase: 'playing',
        startTime: Date.now(),
        score: SCORE_RULES.startingScore,
      }
    }
    case 'SELECT_ANSWER': {
      if (state.lockedClue || state.phase !== 'playing') return state
      const clue = mysterySpeaker.clues[state.currentClueIndex]
      const correct = action.payload === clue.correctOptionId
      const delta = correct ? SCORE_RULES.correctClue : SCORE_RULES.incorrectClue
      const nextCompleted = state.cluesCompleted + 1
      // Peek only — never fully clear the face until final guess is locked
      const nextReveal = Math.min(38, nextCompleted * 7)
      return {
        ...state,
        selectedAnswerId: action.payload,
        feedback: correct ? 'correct' : 'incorrect',
        lockedClue: true,
        cluesCompleted: nextCompleted,
        revealPercent: nextReveal,
        score: applyDelta(state.score, delta),
        scoreFlash: delta,
      }
    }
    case 'ADVANCE_CLUE': {
      if (!state.lockedClue) return state
      const nextIndex = state.currentClueIndex + 1

      if (nextIndex >= mysterySpeaker.clues.length) {
        return {
          ...state,
          feedback: null,
          selectedAnswerId: null,
          lockedClue: false,
          phase: 'finalGuess',
          scoreFlash: null,
        }
      }

      return {
        ...state,
        currentClueIndex: nextIndex,
        feedback: null,
        selectedAnswerId: null,
        lockedClue: false,
        scoreFlash: null,
      }
    }
    case 'USE_HINT': {
      if (state.hintsUsed >= SCORE_RULES.maxHints) return state
      if (state.phase !== 'playing') return state
      const clueId = mysterySpeaker.clues[state.currentClueIndex].id
      if (state.hintsRevealed[clueId]) return state
      return {
        ...state,
        hintsUsed: state.hintsUsed + 1,
        hintsRevealed: { ...state.hintsRevealed, [clueId]: true },
        score: applyDelta(state.score, SCORE_RULES.hintCost),
        scoreFlash: SCORE_RULES.hintCost,
      }
    }
    case 'CLEAR_SCORE_FLASH':
      return { ...state, scoreFlash: null }
    case 'SELECT_GUESS':
      if (state.guessLocked) return state
      return { ...state, selectedGuessId: action.payload }
    case 'LOCK_GUESS': {
      if (!state.selectedGuessId || state.guessLocked) return state
      const correct = state.selectedGuessId === mysterySpeaker.id
      const delta = correct ? SCORE_RULES.finalCorrect : SCORE_RULES.finalIncorrect
      const endTime = Date.now()
      const elapsedSeconds = state.startTime
        ? Math.round((endTime - state.startTime) / 1000)
        : 0
      return {
        ...state,
        guessLocked: true,
        isCorrectGuess: correct,
        score: applyDelta(state.score, delta),
        scoreFlash: delta || null,
        revealPercent: 100,
        phase: 'reveal',
        endTime,
        elapsedSeconds,
      }
    }
    case 'RESET_GAME':
      return { ...initialState }
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const beginCase = useCallback((name) => {
    dispatch({ type: 'BEGIN_CASE', payload: name })
  }, [])

  const openNameEntry = useCallback(() => {
    dispatch({ type: 'OPEN_NAME_ENTRY' })
  }, [])

  const selectAnswer = useCallback((optionId) => {
    dispatch({ type: 'SELECT_ANSWER', payload: optionId })
  }, [])

  const advanceClue = useCallback(() => {
    dispatch({ type: 'ADVANCE_CLUE' })
  }, [])

  const useHint = useCallback(() => {
    dispatch({ type: 'USE_HINT' })
  }, [])

  const selectGuess = useCallback((id) => {
    dispatch({ type: 'SELECT_GUESS', payload: id })
  }, [])

  const lockGuess = useCallback(() => {
    dispatch({ type: 'LOCK_GUESS' })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [])

  const clearScoreFlash = useCallback(() => {
    dispatch({ type: 'CLEAR_SCORE_FLASH' })
  }, [])

  const setName = useCallback((name) => {
    dispatch({ type: 'SET_NAME', payload: name })
  }, [])

  const leaderboard = useMemo(() => {
    if (state.phase === 'reveal' && state.playerName) {
      return buildLeaderboard(
        state.playerName,
        state.score,
        state.elapsedSeconds,
      )
    }
    return buildLeaderboard(null, null, null)
  }, [state.phase, state.playerName, state.score, state.elapsedSeconds])

  const playerRank = useMemo(() => {
    const current = leaderboard.find((e) => e.isCurrent)
    return current?.rank ?? null
  }, [leaderboard])

  const value = useMemo(
    () => ({
      ...state,
      speaker: mysterySpeaker,
      maxHints: SCORE_RULES.maxHints,
      leaderboard,
      playerRank,
      beginCase,
      openNameEntry,
      selectAnswer,
      advanceClue,
      useHint,
      selectGuess,
      lockGuess,
      resetGame,
      clearScoreFlash,
      setName,
    }),
    [
      state,
      leaderboard,
      playerRank,
      beginCase,
      openNameEntry,
      selectAnswer,
      advanceClue,
      useHint,
      selectGuess,
      lockGuess,
      resetGame,
      clearScoreFlash,
      setName,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
