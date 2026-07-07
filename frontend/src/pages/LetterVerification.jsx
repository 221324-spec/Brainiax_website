import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Award,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Briefcase,
  Building2,
  Calendar,
  Loader2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const letterOptions = [
  {
    type: 'Offer',
    title: 'Offer Letter Verification',
    description: 'Verify the authenticity of an offer letter issued by Brainiax.',
    icon: FileText
  },
  {
    type: 'Experience',
    title: 'Experience Letter Verification',
    description: 'Verify the authenticity of an experience letter issued by Brainiax.',
    icon: Award
  }
]

const formatDate = (dateStr) => {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const LetterVerification = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const reset = () => {
    setSelectedType(null)
    setCode('')
    setResult(null)
    setError('')
  }

  const backToForm = () => {
    setResult(null)
    setCode('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/letters/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verification_code: code.trim(), letter_type: selectedType })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Verification request failed')
      }
      setResult(data)
    } catch (err) {
      setError(err.message === 'Failed to fetch'
        ? 'Unable to reach the verification service. Please try again later.'
        : err.message)
    } finally {
      setLoading(false)
    }
  }

  const selectedOption = letterOptions.find(o => o.type === selectedType)

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-gray-900" style={{ overscrollBehavior: 'none' }}>

      {/* Header - consistent with other sub-pages */}
      <header className="fixed top-0 left-0 right-0 z-40 py-6 px-6 lg:px-8 bg-white border-b border-gray-200">
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
      <div className="h-28" />

      <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-20">
        {/* Page title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 mb-5">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Letter Verification
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Verify the authenticity of offer and experience letters issued by Brainiax.
            Enter the unique verification code printed on your document.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Choose letter type */}
          {!selectedType && (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {letterOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => setSelectedType(option.type)}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-left
                           hover:border-indigo-400 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-5
                                group-hover:bg-indigo-600 transition-colors duration-300">
                    <option.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{option.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 mt-5">
                    Verify now
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {/* STEP 2: Verification form */}
          {selectedType && !result && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10"
            >
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Change letter type
              </button>

              <div className="flex items-center gap-3 mb-2">
                <selectedOption.icon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {selectedOption.title}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                Enter the unique verification code printed on the letter to check its authenticity.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    id="verificationCode"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. BRX-2026-00123"
                    autoComplete="off"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900
                             placeholder-gray-400 tracking-widest font-mono uppercase
                             focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                             transition-all"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !code.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4
                           bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl
                           transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Verify Document
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Result */}
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* VALID */}
              {result.result === 'valid' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-green-50 border-b border-green-100 px-8 py-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-green-800">Document Verified</h2>
                      <p className="text-sm text-green-700">This document is genuine and was issued by Brainiax.</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Employee Name</dt>
                          <dd className="text-base font-semibold text-gray-900 mt-0.5">{result.record.employee_name}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Letter Type</dt>
                          <dd className="text-base font-semibold text-gray-900 mt-0.5">{result.record.letter_type} Letter</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Designation</dt>
                          <dd className="text-base font-semibold text-gray-900 mt-0.5">{result.record.designation}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Department</dt>
                          <dd className="text-base font-semibold text-gray-900 mt-0.5">{result.record.department}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Issue Date</dt>
                          <dd className="text-base font-semibold text-gray-900 mt-0.5">{formatDate(result.record.issue_date)}</dd>
                        </div>
                      </div>
                      {result.record.joining_date && (
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Joining Date</dt>
                            <dd className="text-base font-semibold text-gray-900 mt-0.5">{formatDate(result.record.joining_date)}</dd>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</dt>
                          <dd className="mt-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                              <CheckCircle2 className="w-4 h-4" /> Valid
                            </span>
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {/* NOT FOUND */}
              {result.result === 'not_found' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                    <XCircle className="w-9 h-9 text-red-500" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This document could not be verified. Please check the verification code
                    and try again, or contact us if you believe this is an error.
                  </p>
                </div>
              )}

              {/* REVOKED */}
              {result.result === 'revoked' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                    <AlertTriangle className="w-9 h-9 text-amber-500" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Document Revoked</h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This document has been revoked. Please contact the company for further assistance.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Email: info@brainiaxsolutions.com &bull; Phone: +92 317 6538007
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <button
                  onClick={backToForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3
                           bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Verify Another Code
                </button>
                <button
                  onClick={reset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3
                           bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info note */}
        <motion.p
          className="text-center text-xs text-gray-400 mt-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          This tool only verifies letters officially issued by Brainiax HR.
          If you have questions regarding a verification result, please contact
          info@brainiaxsolutions.com.
        </motion.p>
      </section>

      <Footer />
    </div>
  )
}

export default LetterVerification
