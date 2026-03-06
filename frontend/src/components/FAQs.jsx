import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import './FAQs.css'

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What services does Brainiax specialize in?",
      answer: "Brainiax specializes in BPO and telecommunication solutions with expertise in MVA (Motor Vehicle Accidents) campaigns, ACA (Affordable Care Act) health insurance enrollment, Solar energy lead generation, and comprehensive call center services including inbound/outbound calls, appointment setting, and customer support."
    },
    {
      question: "What is your experience with MVA campaigns?",
      answer: "We are currently focused on MVA (Motor Vehicle Accidents) campaigns, helping connect accident victims with legal professionals. Our trained agents handle sensitive calls with empathy, qualify leads efficiently, and ensure proper documentation for legal referrals."
    },
    {
      question: "Do you have experience with ACA and Healthcare campaigns?",
      answer: "Yes! We have extensive experience with ACA (Affordable Care Act) campaigns, helping individuals enroll in health insurance plans during open enrollment periods. Our team is trained in healthcare compliance and can assist with policy explanations, enrollment support, and follow-ups."
    },
    {
      question: "What about Solar lead generation services?",
      answer: "We've successfully managed Solar energy campaigns, generating qualified leads for solar installation companies. Our agents educate potential customers about solar benefits, assess eligibility, and schedule consultations with solar providers."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve multiple industries including Legal (MVA/Personal Injury), Healthcare (ACA enrollment), Renewable Energy (Solar), Banking & Finance, E-Commerce, Technology/SaaS, and Telecommunications. Our adaptable solutions are customized to meet each industry's specific compliance and service requirements."
    },
    {
      question: "How do you ensure quality and compliance?",
      answer: "Quality is our priority. We implement rigorous training programs, continuous call monitoring, TCPA compliance measures, and regular feedback sessions. All campaigns follow strict regulatory guidelines relevant to MVA, ACA, and other industries we serve."
    },
    {
      question: "What are your operating hours?",
      answer: "We operate 24/7 to provide round-the-clock support. Our flexible shifts accommodate different time zones, ensuring your campaigns run efficiently regardless of when your customers need assistance."
    },
    {
      question: "How do I get started with Brainiax?",
      answer: "Getting started is easy! Contact us through our website or reach out directly. We'll discuss your campaign requirements (MVA, ACA, Solar, or other services), provide a customized solution, and begin onboarding your project promptly with trained agents ready to deliver results."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faqs" className="py-20 bg-white" style={{ background: '#fff' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-gray-600 px-4 py-2 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our services, processes, and how we can help your business grow.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black rounded-xl border border-neutral-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-neutral-900 transition-colors"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('openContactSidebar', { detail: { source: 'faqs' } }))}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Reach Us
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQs