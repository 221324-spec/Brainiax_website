import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = ({ onOpenContact }) => {
  
  const text = "Delivering Excellence"
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: 0.2 + i * 0.08,
        duration: 0.3,
      },
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Replace with your own image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* ===== HERO CONTENT - Centered ===== */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Headline with Typing Animation */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-white mb-6 sm:mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.4,
                  }
                }
              }}
              style={{ display: 'inline-block', minWidth: char === " " ? "0.3em" : "auto" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
        >
          Transforming customer interactions into meaningful connections. We empower businesses 
          with world-class Telecommunication solutions that drive growth, enhance satisfaction and deliver 
          measurable results across every touchpoint.
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 
                     bg-white text-gray-900 font-medium rounded-full
                     hover:bg-gray-900 hover:text-white transition-all duration-300
                     shadow-lg hover:shadow-xl"
          >
            Explore Our Services
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 bg-white/60 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
