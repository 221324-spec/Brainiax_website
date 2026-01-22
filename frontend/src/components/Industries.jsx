import { 
  Building2, 
  CreditCard, 
  ShoppingCart, 
  Stethoscope, 
  Plane, 
  Cpu,
  GraduationCap,
  Factory
} from 'lucide-react'
import { motion } from 'framer-motion'
import './Industries.css'

const Industries = () => {
  const industries = [
    {
      icon: CreditCard,
      name: 'Banking & Finance',
      description: 'Account inquiries, loan support, collections'
    },
    {
      icon: Stethoscope,
      name: 'Healthcare',
      description: 'Appointment scheduling, patient support'
    },
    {
      icon: ShoppingCart,
      name: 'E-Commerce & Retail',
      description: 'Order support, returns, product inquiries'
    },
    {
      icon: Cpu,
      name: 'Technology & SaaS',
      description: 'Technical support, onboarding assistance'
    },
    {
      icon: Plane,
      name: 'Travel & Airlines',
      description: 'Reservations, cancellations, travel support'
    },
    {
      icon: Building2,
      name: 'Real Estate',
      description: 'Lead qualification, property inquiries'
    },
    {
      icon: GraduationCap,
      name: 'Education',
      description: 'Enrollment support, student services'
    },
    {
      icon: Factory,
      name: 'Telecommunications',
      description: 'Billing support, service activation'
    }
  ]

  return (
    <section id="industries" className="relative py-24 overflow-hidden bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <p className="text-2xl md:text-3xl font-semibold uppercase tracking-wider text-gray-500 mb-6">
            Industries We Serve
          </p>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Industry
            <span className="block text-gray-500">Expertise</span>
          </h2>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Deep domain knowledge across diverse sectors, delivering specialized 
            solutions tailored to unique industry requirements.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {industries.map((industry, index) => (
            <motion.div 
              key={industry.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.075 }}
            >
              <div className="group h-full p-6 text-center bg-[#f8f7f4] rounded-2xl border border-gray-200
                            hover:border-gray-300 hover:shadow-md transition-all duration-300">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-5
                              bg-white border border-gray-200 rounded-2xl
                              group-hover:bg-gray-900 group-hover:border-gray-900
                              transition-all duration-300">
                  <industry.icon className="w-7 h-7 text-gray-600 group-hover:text-white 
                                          transition-colors duration-300" />
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {industry.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 text-lg mb-6">
            Don't see your industry? We adapt our solutions to any sector.
          </p>
          <a href="#contact" 
             className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 
                      font-medium transition-colors underline underline-offset-4">
            Discuss Your Requirements
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Industries
