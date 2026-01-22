import { Linkedin, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import './Team.css'

// Import team member images from assets
import irfanImg from '../assets/irfan.jpeg'
import sirHassanImg from '../assets/sirhassan.jpeg'
import talhaImg from '../assets/Talha.png'
import talhaJuttImg from '../assets/talha_jutt.png'
import usamaImg from '../assets/usama.jpg'
import waseemImg from '../assets/Waseem.jpg'
import junaidImg from '../assets/junaid.jpg'

const Team = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const leadership = [
    {
      name: 'Chaudhry Hassan',
      title: 'Project Manager',
      image: sirHassanImg,
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Talha Siddique',
      title: 'Senior Managing Director',
      image: talhaImg,
      linkedin: '#',
      twitter: '#',
    }
  ]

  const teamMembers = [
    {
      name: 'Talha Jutt',
      title: 'HR Manager',
      image: talhaJuttImg,
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Usama Khan',
      title: 'IT Executive',
      image: usamaImg,
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Irfan Ali Mirza',
      title: 'Full Stack Developer',
      image: irfanImg,
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Muhammad Waseem',
      title: 'QA Manager',
      image: waseemImg,
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Muhammad Junaid',
      title: 'Managing Director',
      image: junaidImg,
      linkedin: '#',
      twitter: '#',
    }
  ]

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // Reset to 0 when reaching the end
        if (prev >= teamMembers.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 3000) // Change slide every 3 seconds
    
    return () => clearInterval(interval)
  }, [teamMembers.length])

  // Reusable Team Card Component
  const TeamCard = ({ member, index, isLeadership = false }) => (
    <div className="group">
      <div className="relative h-full bg-white rounded-2xl border border-gray-200 overflow-hidden
                    hover:border-gray-300 hover:shadow-lg transition-all duration-500
                    hover:transform hover:-translate-y-2">
        
        {/* Image Container - Square */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                        -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-20" />
          
          {/* Actual Image */}
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover object-center absolute inset-0
                      group-hover:scale-110 transition-transform duration-700 ease-out"
            style={{ zIndex: 5 }}
            onError={(e) => {
              // Hide image and show fallback if image fails to load
              e.target.style.display = 'none';
            }}
          />
          
          {/* Fallback initials (shown behind image, visible if image fails) */}
          <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-150 to-gray-300
                        flex items-center justify-center absolute inset-0"
               style={{ zIndex: 1 }}>
            <span className="text-6xl md:text-7xl font-bold text-gray-400/50 
                          group-hover:text-gray-500/60 transition-colors duration-500">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>

          {/* Social Links - Appear on hover */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2
                        opacity-0 group-hover:opacity-100 
                        translate-y-4 group-hover:translate-y-0
                        transition-all duration-500 delay-100">
            <a href={member.linkedin}
               className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 
                        flex items-center justify-center text-gray-600
                        hover:bg-gray-900 hover:border-gray-900 hover:text-white
                        transition-all duration-300 transform hover:scale-110"
               aria-label={`${member.name} LinkedIn`}>
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={member.twitter}
               className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 
                        flex items-center justify-center text-gray-600
                        hover:bg-gray-900 hover:border-gray-900 hover:text-white
                        transition-all duration-300 transform hover:scale-110"
               aria-label={`${member.name} Twitter`}>
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 relative">
          {/* Animated line */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent
                        scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          {/* Name */}
          <h3 className="text-xl font-semibold text-gray-900 mb-1 
                       group-hover:text-gray-600 transition-colors duration-300">
            {member.name}
          </h3>

          {/* Title */}
          <p className="text-base text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            {member.title}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 to-gray-900
                      transform scale-x-0 group-hover:scale-x-100 
                      transition-transform duration-500 origin-left" />
      </div>
    </div>
  )

  return (
    <section id="team" className="relative py-24 overflow-hidden bg-[#f8f7f4]">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-2xl md:text-3xl font-semibold uppercase tracking-wider text-gray-500 mb-5">
            Our People
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            Meet our
            <span className="text-gray-600"> Team</span>
          </h2>

          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Meet the experienced professionals driving innovation and excellence at Brainiax.
          </p>
        </motion.div>

        {/* Leadership Row - CEO & Director */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 max-w-4xl mx-auto">
          {leadership.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Team Grid with Highlight Effect */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                animate={{
                  scale: currentSlide === index ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <TeamCard member={member} index={index} />
              </motion.div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-gray-900 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Highlight ${teamMembers[index].name}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gray-900" />
            <p className="text-base text-gray-600">
              Together, we're building the future of intelligent business operations.
            </p>
            <div className="w-2 h-2 rounded-full bg-gray-900" />
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary-500/5 rounded-full 
                    blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary-500/5 rounded-full 
                    blur-[120px] pointer-events-none" />
    </section>
  )
}

export default Team