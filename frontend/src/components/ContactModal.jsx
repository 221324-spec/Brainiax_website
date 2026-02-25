import { useState } from 'react'
import { X, Send, User, Mail, Building2, MessageSquare, Calendar, Loader2 } from 'lucide-react'
import './ContactModal.css'

const ContactModal = ({ isOpen, onClose, isDemo = false }) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    console.log('Submitting contact form:', formData)
    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      console.log('Fetch response status:', res.status)
      if (!res.ok) throw new Error('Failed to submit')

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          preferredDate: '',
          preferredTime: ''
        })
        onClose()
      }, 2500)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Failed to submit form. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg glass-card p-8 animate-scale-in overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent 
                      to-primary-500/5 pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/5 border border-white/10
                   flex items-center justify-center text-gray-400 hover:text-white
                   hover:bg-white/10 transition-all duration-300 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {isSubmitted ? (
            // Success State
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 border border-green-500/30
                            flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400">
                {isDemo 
                  ? "We'll contact you shortly to schedule your demo."
                  : "We've received your message and will get back to you soon."}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4
                              text-xs font-semibold uppercase tracking-wider text-primary-400
                              bg-primary-500/10 border border-primary-500/20 rounded-full">
                  {isDemo ? 'Schedule Demo' : 'Get in Touch'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isDemo ? 'Book Your Demo' : 'Contact Us'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {isDemo 
                    ? 'Fill out the form below and we\'ll schedule a personalized demo for you.'
                    : 'Have questions? We\'d love to hear from you. Send us a message.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500 text-sm
                                 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07]
                                 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500 text-sm
                                 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07]
                                 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500 text-sm
                                 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07]
                                 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-gray-500 text-sm
                               focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07]
                               transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Demo-specific fields */}
                {isDemo && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                   text-white placeholder-gray-500 text-sm
                                   focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07]
                                   transition-all duration-300
                                   [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white text-sm appearance-none cursor-pointer
                                 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07]
                                 transition-all duration-300"
                      >
                        <option value="" className="bg-dark-500">Select time...</option>
                        <option value="9:00 AM" className="bg-dark-500">9:00 AM</option>
                        <option value="10:00 AM" className="bg-dark-500">10:00 AM</option>
                        <option value="11:00 AM" className="bg-dark-500">11:00 AM</option>
                        <option value="2:00 PM" className="bg-dark-500">2:00 PM</option>
                        <option value="3:00 PM" className="bg-dark-500">3:00 PM</option>
                        <option value="4:00 PM" className="bg-dark-500">4:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {isDemo ? 'What would you like to see in the demo?' : 'Message *'}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required={!isDemo}
                      rows={4}
                      placeholder={isDemo 
                        ? "Tell us about your business needs and what features interest you..."
                        : "Tell us about your project or inquiry..."}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-gray-500 text-sm resize-none
                               focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07]
                               transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {isDemo ? 'Request Demo' : 'Send Message'}
                      </>
                    )}
                  </span>
                </button>
              </form>
            </>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 
                      rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-500/10 
                      rounded-full blur-[80px] pointer-events-none" />
      </div>
    </div>
  )
}

export default ContactModal
