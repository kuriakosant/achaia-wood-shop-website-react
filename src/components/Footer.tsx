import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Facebook, Instagram, Mail, Phone, MapPin, ChevronDown } from 'lucide-react'
import ESPAViewer from './ESPAViewer'

// Import images directly
import AntoniadisBlue from '../assets/ANTONIADIS-BLUE.png'
import EspaRightFooter from '../assets/ESPA-RIGHT-FOOTER.jpg'

export function Footer() {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const navigate = useNavigate()

  const productLinks = [
    { name: 'ΕΠΙΚΑΛΥΨΕΙΣ', href: '/products/epikalypseis' },
    { name: 'ΥΛΙΚΑ ΕΠΙΠΛΟΠΟΙΙΑΣ', href: '/products/ylika-epiplopias' },
    { name: 'ΞΥΛΕΙΑ-ΠΡΟΪΟΝΤΑ ΞΥΛΟΥ', href: '/products/xyleia' },
    { name: 'ΠΟΡΤΑΚΙΑ', href: '/products/portakia' },
  ]

  const handleButtonClick = (route: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (window.innerWidth < 768) {
      setOpen(prev => !prev)
    } else {
      navigate(route)
    }
  }

  return (
    <footer className="bg-[#1a1a1a] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Image */}
          <div className="flex-shrink-0 order-1 lg:order-1">
            <img
              src={AntoniadisBlue}
              alt="ΑΝΤΩΝΙΑΔΗΣ ΟΕ"
              className="h-auto w-48 sm:w-56 lg:w-64"
            />
          </div>

          {/* Center Content */}
          <div className="flex-grow order-3 lg:order-2 w-full lg:w-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Products Section */}
              <div className="text-center md:text-left">
                <button
                  onClick={() => handleButtonClick('/products', setIsProductsOpen)}
                  className="flex items-center justify-center md:justify-start w-full text-green-400 font-semibold mb-4 text-lg hover:text-green-500 transition-colors duration-200"
                >
                  ΠΡΟΪΟΝΤΑ
                  <ChevronDown size={20} className={`ml-2 transform transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''} md:hidden`} />
                </button>
                <ul className={`space-y-2 text-sm ${isProductsOpen ? 'block' : 'hidden md:block'}`}>
                  {productLinks.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="hover:text-green-400 transition-colors duration-200">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Section */}
              <div className="text-center md:text-left">
                <button
                  onClick={() => handleButtonClick('/contact', setIsContactOpen)}
                  className="flex items-center justify-center md:justify-start w-full text-green-400 font-semibold mb-4 text-lg hover:text-green-500 transition-colors duration-200"
                >
                  ΕΠΙΚΟΙΝΩΝΙΑ
                  <ChevronDown size={20} className={`ml-2 transform transition-transform duration-300 ${isContactOpen ? 'rotate-180' : ''} md:hidden`} />
                </button>
                <ul className={`space-y-2 text-sm ${isContactOpen ? 'block' : 'hidden md:block'}`}>
                  <li className="flex items-center justify-center md:justify-start">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span>Διοδώρου 128, Πάτρα, Τ.Κ 264 42</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start">
                    <Phone size={16} className="mr-2 flex-shrink-0" />
                    <span>2610434377</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start">
                    <Mail size={16} className="mr-2 flex-shrink-0" />
                    <a href="mailto:antoniades_oe@yahoo.gr" className="hover:text-green-400 transition-colors duration-200">
                      antoniades_oe@yahoo.gr
                    </a>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-green-400 transition-colors duration-200">
                      Επικοινωνήστε μαζί μας
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media Section */}
              <div className="text-center md:text-left">
                <h3 className="text-green-400 font-semibold mb-4 text-lg">ΑΚΟΛΟΥΘΗΣΤΕ ΜΑΣ</h3>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-200">
                    <Facebook size={24} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-200">
                    <Instagram size={24} />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0 order-2 lg:order-3">
            <button 
              onClick={() => setIsPDFViewerOpen(true)}
              className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg transition-transform duration-200 hover:scale-105"
              aria-label="Open ESPA PDF"
            >
              <img
                src={EspaRightFooter}
                alt="ESPA Logo"
                className="h-auto w-40 sm:w-48 lg:w-56"
              />
            </button>
          </div>
        </div>
      </div>

      {isPDFViewerOpen && (
        <ESPAViewer
          pdfUrl="/assets/ESPA-ACHAIA-WOOD.pdf"
          onClose={() => setIsPDFViewerOpen(false)}
        />
      )}
    </footer>
  )
}

export default Footer

