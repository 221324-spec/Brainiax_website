import { motion } from 'framer-motion'
import { 
  Briefcase, 
  Users,
  GraduationCap,
  Heart,
  Coffee,
  ArrowRight,
  DollarSign,
  Clock,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Careers.css'

const iconMap = {
  DollarSign,
  Heart,
  GraduationCap,
  Coffee,
  Users,
  Clock
}

const Careers = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
  const perks = [
    { icon: 'DollarSign', title: 'Competitive Pay', description: 'Top industry salaries' },
    { icon: 'Heart', title: 'Health Benefits', description: 'Comprehensive coverage' },
    { icon: 'GraduationCap', title: 'Learning', description: 'Continuous growth' },
    { icon: 'Coffee', title: 'Work-Life Balance', description: 'Flexible schedules' },
    { icon: 'Users', title: 'Team Culture', description: 'Collaborative environment' },
    { icon: 'Clock', title: 'PTO', description: 'Generous time off' }
  ]
  const [jobs, setJobs] = useState([])
  const [isHiringOpen, setIsHiringOpen] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(() => setJobs([]))
  }, [])

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/settings/hiringBannerEnabled`)
      .then(res => res.json())
      .then(data => setIsHiringOpen(data.value))
      .catch(() => setIsHiringOpen(false))
  }, [])

  const openPositionsCount = jobs.length

  return (
    <section id="careers" className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {isHiringOpen && (
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6
                          text-sm font-semibold uppercase tracking-wider text-green-600
                          bg-green-100 border border-green-200 rounded-full">
              <Sparkles className="w-4 h-4" />
              We're Hiring
            </div>
          )}

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Build Your Career
            <span className="block text-white">With Brainiax</span>
          </h2>

          <p className="text-xl text-white mx-auto font-medium">
            Join our growing team and be part of something amazing. We're looking for 
            talented individuals who want to make a difference.
          </p>
        </motion.div>

        {/* Perks Preview */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {perks.map((perk) => {
            const IconComponent = iconMap[perk.icon] || Briefcase
            return (
              <div key={perk.title} className="bg-[#f8f7f4] border border-gray-200 rounded-2xl p-4 text-center
                                               hover:shadow-lg transition-shadow duration-300">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gray-900 
                              flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{perk.title}</h4>
                <p className="text-xs text-gray-500">{perk.description}</p>
              </div>
            )
          })}
        </motion.div>

        {/* CTA Card */}
        <motion.div 
          className="bg-[#f8f7f4] border border-gray-200 rounded-3xl p-10 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          
          <div className="relative z-10">
            {jobs.length > 0 ? (
              <>
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-900 
                              flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {openPositionsCount} Open Positions
                </h3>
                
                <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
                  Explore exciting career opportunities in customer service, sales, 
                  quality assurance, and more. Competitive salary & benefits await!
                </p>

                <Link 
                  to="/hiring"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white 
                           font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 group"
                >
                  View All Openings
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-900 
                              flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  No Job Openings
                </h3>
                
                <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
                  We don't have any open positions at this time. Please check back later!
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Careers
