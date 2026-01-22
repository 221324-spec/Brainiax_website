import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
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
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Privacy Policy
              </h1>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-8">
                Last updated: January 8, 2026
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you contact us, subscribe to our newsletter, or apply for a job. This may include your name, email address, phone number, and any other information you choose to provide.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process job applications and communicate with applicants</li>
                <li>Send you newsletters and marketing communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700">
                Email: privacy@brainiaxsolutions.com<br />
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

export default PrivacyPolicy