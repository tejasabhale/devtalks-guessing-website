import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import GuessPage from './pages/GuessPage'
import LeaderboardPage from './pages/LeaderboardPage'

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/guess" element={<GuessPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
