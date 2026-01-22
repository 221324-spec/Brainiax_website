import { motion } from 'framer-motion'
import { 
  Headphones, 
  PhoneOutgoing, 
  MessageSquare, 
  Users, 
  BarChart3,
  ArrowUpRight 
} from 'lucide-react'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: Headphones,
      title: 'Customer Retention & Engagement',
      description: 'Proactive customer engagement solutions that retain clients, boost satisfaction and increase lifetime value, positioning your company as a trusted partner.',
      features: ['Customer Feedback', 'Upselling & Cross-Selling', 'Retention Campaigns', 'Complaint Handling'],
      accent: 'from-blue-500/20 to-primary-500/20'
    },
    {
      icon: PhoneOutgoing,
      title: 'Outbound Call Services',
      description: 'Strategic outbound calling campaigns for lead generation, telemarketing, appointment setting, surveys, and customer follow-ups that drive results.',
      features: ['Lead Generation', 'Telemarketing', 'Appointment Setting', 'Surveys'],
      accent: 'from-emerald-500/20 to-primary-500/20'
    },
    {
      icon: MessageSquare,
      title: 'Lead Conversion Solutions',
      description: 'Strategic telemarketing campaigns designed to deliver high-quality, qualified leads and maximize conversions while maintaining brand integrity.',
      features: ['Lead Qualification', 'Appointment Setting', 'High-Intent Prospecting', 'Consultative Sales Calls'],
      accent: 'from-violet-500/20 to-primary-500/20'
    },
    {
      icon: Users,
      title: 'Dedicated Teams',
      description: 'Fully dedicated agent teams that work exclusively for your brand, trained on your products, processes, and culture for authentic representation.',
      features: ['Brand Training', 'Exclusive Agents', 'Custom Scripts', 'Quality Monitoring'],
      accent: 'from-amber-500/20 to-primary-500/20'
    },
    {
      icon: BarChart3,
      title: 'Back Office & Data Entry',
      description: 'Efficient back-office operations including data entry, document processing, order management, and administrative support to streamline your business.',
      features: ['Data Entry', 'Order Processing', 'Document Management', 'Admin Support'],
      accent: 'from-rose-500/20 to-primary-500/20'
    }
  ]

  return (
    <section id="services" className="relative py-24 overflow-hidden bg-white">

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
            Our Services
          </p>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Comprehensive Telemarketing
            <span className="block text-gray-500">Solutions</span>
          </h2>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            End-to-end business process solutions designed to optimize your operations, 
            reduce costs and drive sustainable growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              className={index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full p-8 relative overflow-hidden bg-[#f8f7f4] rounded-2xl
                            border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center mb-6 
                                group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1
                                           group-hover:opacity-100 group-hover:translate-y-0 
                                           group-hover:translate-x-0 transition-all duration-300 text-gray-600" />
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-base mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600
                                 bg-white border border-gray-200 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}

          {/* Custom Solutions Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="h-full p-8 flex flex-col items-center justify-center 
                          text-center border-2 border-dashed border-gray-300 rounded-2xl bg-white">
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200
                            flex items-center justify-center mb-6">
                <span className="text-2xl text-gray-600">+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Solutions
              </h3>
              <p className="text-gray-500 mb-6">
                Need something specific? We build tailored solutions for unique business challenges.
              </p>
              <a href="#contact" 
                 className="text-gray-900 hover:text-gray-600 font-medium 
                          transition-colors underline underline-offset-4">
                Let's Discuss
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Services
