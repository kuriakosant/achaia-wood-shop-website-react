import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'
import ESPAViewer from '../components/ESPAViewer'

// Import images directly
import AntoniadisBlue from '../assets/ANTONIADIS-BLUE.png'
import EspaRightFooter from '../assets/ESPA-RIGHT-FOOTER.jpg'

export function Footer() {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false)

  return (
    <footer className="bg-[#1a1a1a] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-x-8">
          {/* Left Image */}
          <div className="mb-4 md:mb-0">
            <img
              src={AntoniadisBlue}
              alt="Footer Left"
              width={200}
              height={140}
              className="h-[160px] w-auto ml-[-50px]"
            />
          </div>

          {/* Center Content */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Products Section */}
              <div>
                <Link to="/products" className="hover:text-green-400">
                  <h3 className="text-green-400 font-semibold mb-4">ΠΡΟΪΟΝΤΑ</h3>
                </Link>
                <ul className="space-y-2 text-sm">
                  <li>ΕΠΙΚΑΛΥΨΕΙΣ</li>
                  <li>ΥΛΙΚΑ ΕΠΙΠΛΟΠΟΙΙΑΣ</li>
                  <li>ΞΥΛΕΙΑ-ΠΡΟΪΟΝΤΑ ΞΥΛΟΥ</li>
                  <li>ΠΟΡΤΑΚΙΑ</li>
                </ul>
              </div>

              {/* Contact Section */}
                <div>
                  <Link to="/contact" className="hover:text-green-400">
                  <h3 className="text-green-400 font-semibold mb-4">ΕΠΙΚΟΙΝΩΝΙΑ</h3>
                  </Link>
                  <ul className="space-y-2 text-sm">
                  <li>Διοδώρου 128,</li>
                  <li>Πάτρα, Τ.Κ 264 42</li>
                  <li>Τηλ. Κέντρο / Fax: 2610434377 </li>
                  <li>
                    <Link to="mailto:antoniadis_oe@yahoo.gr" className="hover:text-green-400">
                      antoniades_oe@yahoo.gr
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-green-400">
                      Επικοινωνήστε μαζί μας
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media Section */}
              <div>
                <h3 className="text-green-400 font-semibold mb-4">ΑΚΟΛΟΥΘΗΣΤΕ ΜΑΣ</h3>
                <div className="flex space-x-4">
                  <Link to="https://www.facebook.com" target="_blank" className="hover:text-green-400">
                    <Facebook size={24} />
                  </Link>
                  <Link to="https://www.instagram.com" target="_blank" className="hover:text-green-400">
                    <Instagram size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div>
            <button onClick={() => setIsPDFViewerOpen(true)}>
              <img
                src={EspaRightFooter}
                alt="Footer Right"
                width={165}
                height={110}
                className="h-[200px] w-auto mr-[50px]"
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

export default Footer;