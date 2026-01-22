import { motion } from 'framer-motion'
import { Brain, Zap, Globe, TrendingUp } from 'lucide-react'
import './About.css'

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Trained Agents',
      description: 'Highly skilled customer service professionals'
    },
    {
      icon: Zap,
      title: 'Quick Response',
      description: 'Average call answer time under 20 seconds'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Support in English, Urdu, and regional languages'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Teams',
      description: 'Flexible capacity for your growing needs'
    }
  ]

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-[#f8f7f4]">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Section Label */}
            <p className="text-2xl md:text-3xl font-semibold uppercase tracking-wider text-gray-500 mb-6">
              About Brainiax
            </p>

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              Your Trusted
              <span className="block text-gray-600">Telemarketing Partner</span>
            </h2>

            {/* Description */}
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-xl">
                At Brainiax, we don’t just make calls — we build connections.As a leading Telemarketing and BPO company,we specialize in 
                <span className="text-gray-900 font-medium"> inbound & outbound calling services</span>, 
                customer Support, Telemarketing and IT operations helping businesses grow and customers feel valued.
              </p>
              <p className="text-lg">
                Our state-of-the-art facility and highly trained, dedicated agents 
                deliver seamless experiences across voice, chat, and email channels.
                Acting as an extension of your brand, we focus on exceptional service 
                that strengthens customer relationships and builds loyalty.
              </p>
              <p className="text-lg">
                From lead generation and appointment setting to technical 
                support and customer retention,our teams handle thousands of interactions every 
                month — all with industry-leading quality scores and a personal touch that sets us apart.
              </p>
            </div>

            {/* CTA Link */}
            <div className="mt-8">
              <a href="#services" 
                 className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 
                          text-lg font-medium transition-colors group">
                Explore Our Services
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-sm
                            hover:shadow-md transition-all duration-300 ${index === 1 || index === 3 ? 'mt-8' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-500">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-900 
                               border-2 border-white flex items-center justify-center text-xs font-medium text-white"
                    >
                      {i}K+
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Trusted by Industry Leaders</div>
                  <div className="text-xs text-gray-500">Join 50+ enterprise clients worldwide</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gray-300/20 rounded-full 
                    blur-[150px] pointer-events-none" />
    </section>
  )
}

export default About
