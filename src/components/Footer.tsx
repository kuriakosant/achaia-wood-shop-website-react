import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import ESPAViewer from './ESPAViewer'

// Import images directly
import AntoniadisBlue from '../assets/ANTONIADIS-BLUE.png'
import EspaRightFooter from '../assets/ESPA-RIGHT-FOOTER.jpg'

export function Footer() {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false)

  const productLinks = [
    { name: 'ΕΠΙΚΑΛΥΨΕΙΣ', href: '/products/epikalypseis' },
    { name: 'ΥΛΙΚΑ ΕΠΙΠΛΟΠΟΙΙΑΣ', href: '/products/ylika-epiplopias' },
    { name: 'ΞΥΛΕΙΑ-ΠΡΟΪΟΝΤΑ ΞΥΛΟΥ', href: '/products/xyleia' },
    { name: 'ΠΟΡΤΑΚΙΑ', href: '/products/portakia' },
  ]

  return (
    <footer className="bg-[#1a1a1a] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Image */}
          <div className="flex-shrink-0">
            <img
              src={AntoniadisBlue}
              alt="ΑΝΤΩΝΙΑΔΗΣ ΟΕ"
              width={200}
              height={140}
              className="h-auto w-48 sm:w-56 lg:w-64"
            />
          </div>

          {/* Center Content */}
          <div className="flex-grow text-center lg:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Products Section */}
              <div>
                <Link to="/products" className="inline-block hover:text-green-400 transition-colors duration-200">
                  <h3 className="text-green-400 font-semibold mb-4 text-lg">ΠΡΟΪΟΝΤΑ</h3>
                </Link>
                <ul className="space-y-2 text-sm">
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
              <div>
                <Link to="/contact" className="inline-block hover:text-green-400 transition-colors duration-200">
                  <h3 className="text-green-400 font-semibold mb-4 text-lg">ΕΠΙΚΟΙΝΩΝΙΑ</h3>
                </Link>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>Διοδώρου 128, Πάτρα, Τ.Κ 264 42</span>
                  </li>
                  <li className="flex items-center">
                    <Phone size={16} className="mr-2" />
                    <span>2610434377</span>
                  </li>
                  <li className="flex items-center">
                    <Mail size={16} className="mr-2" />
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
              <div>
                <h3 className="text-green-400 font-semibold mb-4 text-lg">ΑΚΟΛΟΥΘΗΣΤΕ ΜΑΣ</h3>
                <div className="flex space-x-4">
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
          <div className="flex-shrink-0">
            <button 
              onClick={() => setIsPDFViewerOpen(true)}
              className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg transition-transform duration-200 hover:scale-105"
              aria-label="Open ESPA PDF"
            >
              <img
                src={EspaRightFooter}
                alt="ESPA Logo"
                width={165}
                height={110}
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

