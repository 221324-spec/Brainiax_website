import { motion } from 'framer-motion'

// Animation variants for scroll-based animations
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const fadeInDown = {
  hidden: { 
    opacity: 0, 
    y: -40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Default viewport settings for scroll animations
export const defaultViewport = {
  once: false,
  amount: 0.2,
  margin: "-50px"
}

// Motion components with preset animations
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionP = motion.p
export const MotionSpan = motion.span

// Reusable animated wrapper components
export const FadeInUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={defaultViewport}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeInLeft = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={fadeInLeft}
    initial="hidden"
    whileInView="visible"
    viewport={defaultViewport}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeInRight = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={fadeInRight}
    initial="hidden"
    whileInView="visible"
    viewport={defaultViewport}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const ScaleIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={defaultViewport}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerContainer = ({ children, className = "" }) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={defaultViewport}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className = "" }) => (
  <motion.div variants={staggerItem} className={className}>
    {children}
  </motion.div>
)
