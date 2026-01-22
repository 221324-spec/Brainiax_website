import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Send, FileText, CheckCircle } from 'lucide-react'
import { useState, useRef } from 'react'
import './ResumeModal.css'

const ResumeModal = ({ isOpen, onClose, jobTitle = null, jobId = null }) => {
  const API_BASE = import.meta.env.VITE_API_BASE || ''
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: jobTitle || ''
  })
  const [resumeFile, setResumeFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (validTypes.includes(file.type)) {
        setResumeFile(file)
      } else {
        alert('Please upload a PDF or Word document')
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (validTypes.includes(file.type)) {
        setResumeFile(file)
      } else {
        alert('Please upload a PDF or Word document')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!resumeFile) {
      alert('Please attach your resume')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const form = new FormData()
      form.append('name', formData.name)
      form.append('email', formData.email)
      form.append('phone', formData.phone)
      form.append('position', formData.position)
      if (jobId) form.append('jobId', jobId)
      form.append('resume', resumeFile)

      const res = await fetch(`${API_BASE}/api/resumes`, { method: 'POST', body: form })
      if (!res.ok) throw new Error('Upload failed')

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', phone: '', position: jobTitle || '' })
        setResumeFile(null)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
      setIsSubmitting(false)
    }
  }

  const removeFile = () => {
    setResumeFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="w-full max-w-lg my-auto">
            <div className="bg-white border border-gray-200 rounded-2xl 
                          shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Submit Your Resume</h3>
                  {jobTitle && (
                    <p className="text-sm text-gray-600 mt-1">Applying for: {jobTitle}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 
                           rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              {isSubmitted ? (
                <div className="p-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 border border-green-200
                             flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Application Submitted!
                  </h4>
                  <p className="text-gray-600">
                    We'll review your resume and get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-gray-900 placeholder-gray-400 focus:outline-none 
                               focus:border-gray-400 focus:bg-white transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-gray-900 placeholder-gray-400 focus:outline-none 
                               focus:border-gray-400 focus:bg-white transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-gray-900 placeholder-gray-400 focus:outline-none 
                               focus:border-gray-400 focus:bg-white transition-all"
                      placeholder="+92 300 1234567"
                    />
                  </div>

                  {/* Position (if no specific job) */}
                  {!jobTitle && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position Interested In
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 text-gray-900 placeholder-gray-400 focus:outline-none 
                                 focus:border-gray-400 focus:bg-white transition-all"
                        placeholder="e.g., Customer Service Representative"
                      />
                    </div>
                  )}

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach Resume * <span className="text-gray-500">(PDF, DOC, DOCX)</span>
                    </label>
                    
                    {resumeFile ? (
                      <div className="flex items-center gap-3 p-4 bg-green-50 
                                    border border-green-200 rounded-xl">
                        <FileText className="w-8 h-8 text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 
                                 text-center cursor-pointer hover:border-gray-400 
                                 hover:bg-gray-50 transition-all"
                      >
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm">
                          Drag & drop your resume here, or{' '}
                          <span className="text-gray-900 font-medium">browse</span>
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 
                             rounded-xl font-semibold text-white flex items-center 
                             justify-center gap-2 transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white 
                                      rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal
