import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ onOpenContact }) => {
  const API_BASE = import.meta.env.VITE_API_BASE || ''
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHiringOpen, setIsHiringOpen] = useState(false) // default to false
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const bannerText = "We're Hiring!" // static for now

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8 // 80% of viewport height
      
      // Determine visibility based on scroll position and direction
      if (currentScrollY > heroHeight) {
        // Past hero section - hide navbar completely
        setIsVisible(false)
      } else {
        // Within hero section - always show
        setIsVisible(true)
      }
      
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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

  const leftNavLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Privacy Policy', href: '/privacy-policy', isRoute: true },
    { name: 'Terms of Service', href: '/terms-of-service', isRoute: true },
  ]

  const rightNavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Careers', href: '/hiring', isRoute: true },
  ]

  return (
    <>
      {/* Hiring Banner - Only show if hiring is open and visible */}
      {isHiringOpen && (
        <div 
          className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-emerald-600 
                     transition-all duration-500 ${!isVisible ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
        >
          <Link 
            to="/hiring"
            className="block py-2 px-4 text-center text-sm font-medium text-white 
                     hover:bg-white/10 transition-colors"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {bannerText} — We have open positions. Click to view & apply!
              <span className="hidden sm:inline">→</span>
            </span>
          </Link>
        </div>
      )}

      <nav 
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          isHiringOpen && isVisible ? 'top-10' : 'top-0'
        } ${
          !isVisible ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } ${
          isScrolled 
            ? 'py-4 bg-white/95 backdrop-blur-xl shadow-sm' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left Navigation */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {isHomePage && leftNavLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-base font-medium transition-colors duration-300 ${
                      isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-base font-medium transition-colors duration-300 ${
                      isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                )
              ))}
              {!isHomePage && (
                <Link
                  to="/"
                  className={`text-base font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                  }`}
                >
                  ← Home
                </Link>
              )}
            </div>

            {/* Center Logo */}
            <Link to="/" className="flex items-center justify-center group">
              <svg 
                width="44" 
                height="44" 
                viewBox="0 0 100 100" 
                className="transition-all"
                style={{ transform: 'rotate(-25deg)' }}
              >
                {/* Tilted straight lines logo */}
                <line x1="15" y1="15" x2="85" y2="15" stroke={isScrolled ? '#111827' : '#ffffff'} strokeWidth="10" strokeLinecap="round" />
                <line x1="15" y1="38" x2="85" y2="38" stroke={isScrolled ? '#111827' : '#ffffff'} strokeWidth="10" strokeLinecap="round" />
                <line x1="15" y1="61" x2="85" y2="61" stroke={isScrolled ? '#111827' : '#ffffff'} strokeWidth="10" strokeLinecap="round" />
                <line x1="15" y1="84" x2="85" y2="84" stroke={isScrolled ? '#111827' : '#ffffff'} strokeWidth="10" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
              {isHomePage && rightNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Careers Link - Only show if hiring */}
              {isHiringOpen && (
                <Link
                  to="/hiring"
                  className={`text-base font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                    isScrolled ? 'text-green-600 hover:text-green-700' : 'text-green-400 hover:text-green-300'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Careers
                </Link>
              )}

              {/* Contact Button */}
              <button
                onClick={onOpenContact}
                className={`px-5 py-2.5 text-base font-medium rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
              isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}
          >
            <div className={`p-6 rounded-2xl space-y-4 ${
              isScrolled ? 'bg-gray-50' : 'bg-white/10 backdrop-blur-xl'
            }`}>
              {isHomePage ? (
                <>
                  {[...leftNavLinks, ...rightNavLinks].map((link) => (
                    link.isRoute ? (
                      <Link
                        key={link.name}
                        to={link.href}
                        className={`block py-2 transition-colors ${
                          isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-white/80'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        className={`block py-2 transition-colors ${
                          isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-white/80'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    )
                  ))}
                </>
              ) : (
                <Link
                  to="/"
                  className={`block py-2 transition-colors ${
                    isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ← Back to Home
                </Link>
              )}
              
              {/* Mobile Hiring Link */}
              {isHiringOpen && (
                <Link
                  to="/hiring"
                  className="flex items-center gap-2 text-green-500 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Careers - View Positions
                </Link>
              )}
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenContact()
                }}
                className={`w-full py-3 mt-4 rounded-full font-medium transition-colors ${
                  isScrolled 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-900'
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
