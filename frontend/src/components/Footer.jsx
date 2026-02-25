import { 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone,
  ArrowUpRight,
  Send
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Footer.css'

const Footer = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
  const currentYear = new Date().getFullYear()
  const [isHiringOpen, setIsHiringOpen] = useState(false) // default to false
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const fetchHiringStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/admin/settings/hiringBannerEnabled`)
        if (response.ok) {
          const data = await response.json()
          setIsHiringOpen(data.value)
        }
      } catch (error) {
        console.error('Failed to fetch hiring status:', error)
      }
    }
    fetchHiringStatus()
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email && agreed) {
      setSubscribed(true)
      setEmail('')
      setAgreed(false)
    }
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '/hiring', isRoute: true },
      { name: 'Contact', href: '#contact' }
    ],
    services: [
      { name: 'Quality Monitoring', href: '#services' },
      { name: 'Outbound Calls', href: '#services' },
      { name: 'Appointment Setting', href: '#services' },
      { name: 'Back Office', href: '#services' }
    ],
    resources: [
      { name: 'Industries', href: '#industries' },
      { name: 'Why Choose Us', href: '#why-choose' },
      { name: 'FAQs', href: '#faqs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' }
    ]
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@brainiax.com' }
  ]

  return (
    <footer className="relative bg-gray-900 pt-20 pb-12 overflow-hidden">
      
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <motion.div 
          className="bg-gray-800 rounded-3xl p-10 md:p-16 border border-gray-700"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
              Get the latest news and updates
            </h3>
            
            {subscribed ? (
              <div className="text-green-400 font-medium py-4">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    className="flex-1 px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl
                             text-white placeholder-gray-400 focus:outline-none 
                             focus:border-gray-500 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={!agreed}
                    className="px-8 py-4 bg-white text-gray-900 font-medium rounded-xl
                             hover:bg-gray-100 transition-colors disabled:opacity-50 
                             disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                </div>
                
                <label className="flex items-start gap-3 text-left cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-700 text-white 
                             focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-400">
                    I agree to receive emails from Brainiax and the{' '}
                    <a href="#" className="underline hover:text-white">data statement</a>.
                  </span>
                </label>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-16 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand Column */}
          <div className="col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <svg 
                width="36" 
                height="36" 
                viewBox="0 0 100 100" 
                className="transition-all"
                style={{ transform: 'rotate(-25deg)' }}
              >
                <line x1="15" y1="15" x2="85" y2="15" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
                <line x1="15" y1="38" x2="85" y2="38" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
                <line x1="15" y1="61" x2="85" y2="61" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
                <line x1="15" y1="84" x2="85" y2="84" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
              </svg>
              <span className="text-xl font-semibold text-white">
                Brainiax
              </span>
            </Link>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-xs">
              Leading Telemarketing & BPO solutions delivering exceptional 
              customer experiences 24/7.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>info@brainiaxsolutions.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link 
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-10 border-t border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Brainiax. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
