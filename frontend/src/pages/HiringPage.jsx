import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, 
  MapPin, 
  DollarSign,
  Users,
  GraduationCap,
  Heart,
  Coffee,
  ArrowRight,
  CheckCircle2,
  Send,
  ArrowLeft,
  Clock,
  ChevronDown,
  Loader2
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ResumeModal from '../components/ResumeModal'
import Footer from '../components/Footer'

const API_BASE = import.meta.env.VITE_API_BASE || ''

const iconMap = {
  DollarSign,
  Heart,
  GraduationCap,
  Coffee,
  Users,
  Clock
}

const HiringPage = () => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [jobOpenings, setJobOpenings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isHiringOpen, setIsHiringOpen] = useState(false)

  // Default perks (static)
  const perks = [
    { icon: 'DollarSign', title: 'Competitive Pay', description: 'Above market rates with performance bonuses' },
    { icon: 'Heart', title: 'Health Benefits', description: 'Comprehensive medical coverage for you and family' },
    { icon: 'GraduationCap', title: 'Training & Development', description: 'Continuous learning and career growth opportunities' },
    { icon: 'Coffee', title: 'Great Environment', description: 'Modern facilities with collaborative workspaces' }
  ]

  // Fetch jobs from backend API on mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${API_BASE}/api/jobs`)
        if (!res.ok) throw new Error('Failed to fetch')
        const jobs = await res.json()
        setJobOpenings(jobs.map(j => ({ ...j, id: j._id })))
        setError(null)
      } catch (err) {
        console.error('Error loading jobs:', err)
        setError('Failed to load job openings. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/settings/hiringBannerEnabled`)
      .then(res => res.json())
      .then(data => setIsHiringOpen(data.value))
      .catch(() => setIsHiringOpen(false))
  }, [])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  // Handle header hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 200) {
        // Hide header when scrolled past 200px
        setIsHeaderVisible(false)
      } else {
        // Show header when near top
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const openResumeModal = (jobId = null, jobTitle = null) => {
    setSelectedJob(jobId)
    setSelectedJobTitle(jobTitle)
    setIsResumeModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-gray-900" style={{ overscrollBehavior: 'none' }}>

      {/* Header - Hides on scroll */}
      <header className={`fixed top-0 left-0 right-0 z-40 py-6 px-6 lg:px-8 bg-white border-b border-gray-200
                        transition-all duration-500 ${!isHeaderVisible ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 
                     transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 100 100" 
              className="transition-all"
              style={{ transform: 'rotate(-25deg)' }}
            >
              <line x1="15" y1="15" x2="85" y2="15" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
              <line x1="15" y1="38" x2="85" y2="38" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
              <line x1="15" y1="61" x2="85" y2="61" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
              <line x1="15" y1="84" x2="85" y2="84" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </Link>
          
          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      <main className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16 pt-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isHiringOpen && (
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6
                            text-sm font-semibold uppercase tracking-wider text-green-600
                            bg-green-100 border border-green-200 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                We're Hiring
              </div>
            )}

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900">
              Join Our
              <span className="block text-gray-600">Growing Team</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Be part of a dynamic team delivering exceptional customer experiences. 
              We offer competitive pay, great benefits, and real career growth.
            </p>
          </motion.div>

          {/* Current Openings Header */}
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Current Openings
              {!isLoading && (
                <span className="ml-3 text-lg text-gray-600">
                  ({jobOpenings.length} positions)
                </span>
              )}
            </h2>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Loading job openings...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <p className="text-red-600 text-lg mb-2">⚠️ {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && jobOpenings.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Open Positions</h3>
              <p className="text-gray-600">Check back soon for new opportunities!</p>
            </div>
          )}

          {/* Job Listings - Enhanced List View with Accordion */}
          {!isLoading && !error && jobOpenings.length > 0 && (
            <div className="space-y-6 mb-16">
              {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Job Header - Clickable */}
                <div 
                  className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white cursor-pointer"
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 
                                      flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 font-medium">
                              {job.department}
                            </span>
                            <span className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold">
                              {job.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Location & Salary */}
                      <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                            <p className="text-sm font-semibold text-gray-900">{job.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Salary</p>
                            <p className="text-sm font-semibold text-gray-900">{job.salary}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Valid Until</p>
                            <p className="text-sm font-semibold text-gray-900">{job.validityDate ? new Date(job.validityDate).toLocaleDateString() : 'No expiry'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    
                    {/* Expand/Collapse Indicator */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          openResumeModal(job.id, job.title)
                        }}
                        className="md:min-w-[180px] px-6 py-3.5 bg-gray-900 hover:bg-gray-800 
                                 rounded-xl text-white font-semibold text-sm
                                 transition-all duration-300 flex items-center justify-center gap-2
                                 shadow-md hover:shadow-lg hover:scale-105"
                      >
                        <Send className="w-4 h-4" />
                        Apply Now
                      </button>
                      <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center transition-transform duration-300 ${
                        selectedJob === job.id ? 'rotate-180' : ''
                      }`}>
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Details Grid - Expandable */}
                <AnimatePresence>
                  {selectedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 border-t border-gray-100">
                        {/* Responsibilities/Requirements */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            </div>
                            Job Requirements
                          </h4>
                          <ul className="space-y-3">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                                </div>
                                <span className="leading-relaxed">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits & Perks */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                              <Heart className="w-5 h-5 text-green-600" />
                            </div>
                            What We Offer
                          </h4>
                          <div className="space-y-3">
                            {job.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-800">{benefit}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Additional Perks Section */}
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                              Plus Standard Benefits
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">
                                Career Growth
                              </span>
                              <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">
                                Flexible Shifts
                              </span>
                              <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">
                                Great Environment
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              ))}
            </div>
          )}

          {/* General Application CTA */}
          {!isLoading && !error && (
            <motion.div 
              className="text-center bg-white border border-gray-200 rounded-3xl p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don't See a Perfect Match?
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                We're always interested in meeting talented people. Send us your resume 
                and we'll keep you in mind for future opportunities.
              </p>
              <button 
                onClick={() => openResumeModal()}
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl 
                         hover:bg-gray-800 transition-colors duration-300 inline-flex items-center gap-2"
              >
                Submit Your Resume
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)}
        jobTitle={selectedJobTitle}
        jobId={selectedJob}
      />
    </div>
  )
}

export default HiringPage
