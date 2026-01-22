import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyChoose from './components/WhyChoose'
import Industries from './components/Industries'
import Team from './components/Team'
import Careers from './components/Careers'
import FAQs from './components/FAQs'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ContactSidebar from './components/ContactSidebar'
import ScrollToTop from './components/ScrollToTop'
import HiringPage from './pages/HiringPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import { HIRING_CONFIG } from './config/hiring'

const API_BASE = import.meta.env.VITE_API_BASE || ''

function HomePage({ openContact }) {
  return (
    <>
      <main>
        <Hero onOpenContact={openContact} />
        <About />
        <Services />
        <WhyChoose />
        <Industries />
        <Team />
        <Careers />
        <FAQs />
        <CTA onOpenContact={openContact} />
      </main>
      <Footer />
    </>
  )
}

// Wrapper component to conditionally render Navbar
function AppContent({ openContact }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [isHiringOpen, setIsHiringOpen] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/settings/hiringBannerEnabled`)
      .then(res => res.json())
      .then(data => setIsHiringOpen(data.value))
      .catch(() => setIsHiringOpen(false))
  }, [])

  return (
    <div className={`min-h-screen ${isHomePage ? 'bg-[#12121a] text-white' : 'bg-[#f8f7f4]'} ${isHiringOpen && isHomePage ? 'pt-10' : ''}`}
         style={{ overscrollBehavior: 'none' }}>
      {/* Background Elements - Only on home page */}
      {isHomePage && (
        <>
          <div className="fixed inset-0 hero-bg-gradient pointer-events-none" />
          <div className="fixed inset-0 grid-pattern pointer-events-none opacity-40" />
        </>
      )}
      
      {/* Navbar - Only on home page */}
      {isHomePage && <Navbar onOpenContact={openContact} />}
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage openContact={openContact} />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </div>
  )
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const openContact = () => setIsContactOpen(true)
  const closeContact = () => setIsContactOpen(false)

  // Listen for global event to open contact sidebar (e.g. from FAQ button)
  useEffect(() => {
    const handler = (e) => {
      openContact()
    }
    window.addEventListener('openContactSidebar', handler)
    return () => window.removeEventListener('openContactSidebar', handler)
  }, [])

  return (
    <Router>
      <AppContent openContact={openContact} />
      {/* Contact Sidebar */}
      <ContactSidebar isOpen={isContactOpen} onClose={closeContact} />
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </Router>
  )
}

export default App
