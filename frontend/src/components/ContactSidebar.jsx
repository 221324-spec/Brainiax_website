import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, User, Mail, Building, MessageSquare, Phone, CheckCircle } from 'lucide-react'
import './ContactSidebar.css'

const ContactSidebar = ({ isOpen, onClose }) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fatherName: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
      setIsSuccess(true)

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({ name: '', email: '', fatherName: '', phone: '', message: '' })
        onClose()
      }, 2500)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Failed to submit form. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white 
                      border-l border-gray-200 z-50 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-gray-100 border border-gray-200
                         flex items-center justify-center text-gray-600 hover:text-gray-900 
                         hover:bg-gray-200 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-900 
                              flex items-center justify-center font-bold text-lg text-white">
                  B
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  Brain<span className="text-gray-600">iax</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
              <p className="text-gray-600 text-sm">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6 h-[calc(100%-180px)] overflow-y-hidden">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-green-100 border border-green-200
                               flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll be in touch soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                                 text-gray-900 placeholder-gray-400 
                                 focus:border-gray-400 focus:bg-white focus:outline-none
                                 transition-all duration-300"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                                 text-gray-900 placeholder-gray-400 
                                 focus:border-gray-400 focus:bg-white focus:outline-none
                                 transition-all duration-300"
                      />
                    </div>

                    {/* Company Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-600" />
                        Father Name
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder="Your Father's Name"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                                 text-gray-900 placeholder-gray-400 
                                 focus:border-gray-400 focus:bg-white focus:outline-none
                                 transition-all duration-300"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                                 text-gray-900 placeholder-gray-400 
                                 focus:border-gray-400 focus:bg-white focus:outline-none
                                 transition-all duration-300"
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={2}
                        placeholder="Tell us about your project or inquiry..."
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                                 text-gray-900 placeholder-gray-400 resize-none
                                 focus:border-gray-400 focus:bg-white focus:outline-none
                                 transition-all duration-300"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 
                               rounded-xl font-semibold text-white
                               flex items-center justify-center gap-2
                               transition-all duration-300 
                               disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    {/* Privacy Note */}
                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Need immediate help?</span>
                <a href="mailto:info@brainiaxsolutions.com" className="text-gray-900 hover:text-gray-600 font-medium transition-colors">
                  info@brainiaxsolutions.com
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ContactSidebar
