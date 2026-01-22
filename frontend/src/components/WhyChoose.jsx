import { 
  Shield, 
  Clock, 
  Lightbulb, 
  LineChart, 
  Users, 
  Lock,
  CheckCircle2
} from 'lucide-react'
import { motion } from 'framer-motion'
import './WhyChoose.css'

const WhyChoose = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous call monitoring, scoring, and coaching to ensure every interaction meets your brand standards.',
      stat: '98%',
      statLabel: 'Quality Score'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock call center operations ensuring your customers always reach a live agent.',
      stat: '24/7',
      statLabel: 'Support'
    },
    {
      icon: Lightbulb,
      title: 'Trained Professionals',
      description: 'Comprehensive agent training programs covering communication, product knowledge, and soft skills.',
      stat: '50+',
      statLabel: 'Trained Agents'
    },
    {
      icon: LineChart,
      title: 'Performance Metrics',
      description: 'Real-time dashboards and detailed reporting on KPIs, call volumes, and customer satisfaction.',
      stat: '< 20s',
      statLabel: 'Avg Answer Time'
    },
    {
      icon: Users,
      title: 'Cost-Effective Lead Generation',
      description: 'Reduce acquisition costs by outsourcing infrastructure, hiring, and training to a specialized team.',
      stat: '30- 50%',
      statLabel: 'Cost Savings'
    },
    {
      icon: Lock,
      title: 'Data Security',
      description: 'Secure infrastructure with call recording, data encryption, and strict confidentiality protocols.',
      stat: '100%',
      statLabel: 'Secure'
    }
  ]

  const highlights = [
    'Full-Spectrum Telemarketing',
    'Expert Customer Support',
    'Multi-channel integration',
    'Real-time call monitoring',
    'Bilingual agents available',
    'Performance-based pricing'
  ]

  return (
    <section id="why-choose" className="relative py-24 overflow-hidden">
      {/* Spinning Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=2000&q=80)',
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <p className="text-2xl md:text-3xl font-semibold uppercase tracking-wider text-white mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            Why Brainiax
          </p>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.9)'}}>
            The Brainiax
            <span className="block text-white">Advantage</span>
          </h2>

          <p className="text-xl text-white max-w-2xl mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
            We combine technology, talent and trust to deliver exceptional outcomes. 
            Here's why leading enterprises choose Brainiax.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full p-8 bg-white rounded-2xl border border-gray-200 
                            hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-gray-700" />
                  </div>

                  {/* Stat */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{benefit.stat}</div>
                    <div className="text-sm text-gray-500">{benefit.statLabel}</div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl border border-gray-200 p-10 lg:p-14 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
                  Engineered for Excellence
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  At Brainiax, excellence isn’t an accident — it’s built into every step of our process. 
                  From onboarding to ongoing operations,we deliver seamless, reliable, 
                  and measurable outcomes that exceed expectations.
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-700 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Visual */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {/* Metric Cards */}
                  <div className="bg-gray-900 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-white mb-2">12+</div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </div>
                  <div className="bg-gray-900 rounded-2xl p-6 text-center mt-8">
                    <div className="text-4xl font-bold text-white mb-2">4+</div>
                    <div className="text-sm text-gray-400">Countries Served</div>
                  </div>
                  <div className="bg-gray-900 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-white mb-2">1M+</div>
                    <div className="text-sm text-gray-400">Calls/Month</div>
                  </div>
                  <div className="bg-gray-900 rounded-2xl p-6 text-center mt-8">
                    <div className="text-4xl font-bold text-white mb-2">98%</div>
                    <div className="text-sm text-gray-400">Client Retention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChoose
