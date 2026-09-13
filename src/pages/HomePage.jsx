import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
    </motion.div>
  )
}
