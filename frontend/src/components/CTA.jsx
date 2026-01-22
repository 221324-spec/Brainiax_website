import { motion } from 'framer-motion'
import { ArrowRight, Mail, Calendar, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'
import './CTA.css'

const CTA = ({ onOpenContact }) => {
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/brainiax' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/brainiax' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/brainiax' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/brainiax' }
  ]

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-[#f8f7f4]">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative bg-white border border-gray-200 rounded-3xl p-12 lg:p-20 text-center overflow-hidden">

            {/* Content */}
            <div className="relative z-10">
              {/* Section Label */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-8
                          text-xs font-semibold uppercase tracking-wider text-gray-600
                          bg-gray-100 border border-gray-200 rounded-full"
              >
                Get Started Today
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6"
              >
                Ready to Elevate
                <span className="block text-gray-600 mt-2">Your Customer Experience?</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Partner with Brainiax for premium call center services. Our trained agents 
                deliver exceptional customer support that builds loyalty and drives growth.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <button onClick={onOpenContact} className="px-8 py-4 bg-gray-900 text-white font-semibold 
                                                           rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Get in Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button onClick={onOpenContact} className="px-8 py-4 bg-white text-gray-900 font-semibold 
                                                           border-2 border-gray-900 rounded-xl hover:bg-gray-900 hover:text-white 
                                                           transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule a Demo
                  </span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-8 pt-10 
                          border-t border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Free</div>
                  <div className="text-xs text-gray-500">Consultation</div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24hr</div>
                  <div className="text-xs text-gray-500">Response Time</div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Custom</div>
                  <div className="text-xs text-gray-500">Solutions</div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <p className="text-sm text-gray-500 mb-4">Follow us on social media</p>
                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 
                               flex items-center justify-center text-gray-600
                               hover:bg-gray-900 hover:border-gray-900 hover:text-white
                               transition-all duration-300 hover:-translate-y-1"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
