/**
 * Shared motion entry — use `m` via LazyMotion for a smaller runtime
 * while keeping the same animation API across the app.
 */
export {
  m as motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  LazyMotion,
  domAnimation,
  MotionConfig,
} from 'framer-motion'
