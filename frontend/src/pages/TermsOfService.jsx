import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-gray-900" style={{ overscrollBehavior: 'none' }}>

      {/* Header copied from Hiring page for consistent navigation */}
      <header className={`fixed top-0 left-0 right-0 z-40 py-6 px-6 lg:px-8 bg-white border-b border-gray-200`}>
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

      {/* Spacer for fixed header (adjusted) */}
      <div className="h-12" />

      <section className="w-full px-0 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 mx-8 my-0">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Terms of Service
              </h1>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-8">
                Last updated: January 8, 2026
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Brainiax's services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Services</h2>
              <p className="text-gray-700 mb-4">
                Brainiax provides telemarketing and business process outsourcing services. We reserve the right to modify or discontinue our services at any time without notice.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Use our services in compliance with applicable laws</li>
                <li>Respect the privacy and rights of others</li>
                <li>Not engage in any harmful or illegal activities</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, trademarks, and materials on our website are owned by Brainiax and are protected by intellectual property laws.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Brainiax shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend your access to our services at our sole discretion, without prior notice, for any reason.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of Pakistan.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-700">
                Email: legal@brainiaxsolutions.com<br />
                Phone: +92 300 1234567<br />
                Address: Islamabad, Pakistan
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  )
}

export default TermsOfService