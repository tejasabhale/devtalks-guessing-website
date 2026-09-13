import { motion } from 'framer-motion'
import Leaderboard from '../components/leaderboard/Leaderboard'

export default function LeaderboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Leaderboard />
    </motion.div>
  )
}
