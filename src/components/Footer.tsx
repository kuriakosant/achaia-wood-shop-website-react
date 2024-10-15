import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Image */}
          <div className="mb-4 md:mb-0">
            <img
              src="/src/assets/footer-left.png"
              alt="Footer Left"
              width={150}
              height={100}
              className="h-20 w-auto"
            />
          </div>

          {/* Center Content */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Products Section */}
              <div>
                <h3 className="text-green-400 font-semibold mb-4">ΠΡΟΪΟΝΤΑ</h3>
                <ul className="space-y-2 text-sm">
                  <li>ΕΠΙΚΑΛΥΨΕΙΣ</li>
                  <li>ΥΛΙΚΑ ΕΠΙΠΛΟΠΟΙΙΑΣ</li>
                  <li>ΞΥΛΕΙΑ-ΠΡΟΪΟΝΤΑ ΞΥΛΟΥ</li>
                  <li>ΠΟΡΤΑΚΙΑ</li>
                </ul>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-green-400 font-semibold mb-4">ΕΠΙΚΟΙΝΩΝΙΑ</h3>
                <ul className="space-y-2 text-sm">
                  <li>Διοδώρου 128,</li>
                  <li>Πάτρα, Τ.Κ 264 42</li>
                  <li>Τηλ. Κέντρο / Fax: 2610434377 </li>
                  <li>
                    <Link to="mailto:antoniadis_oe@yahoo.gr" className="hover:text-green-400">
                      antoniades_oe@yahoo.gr
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media Section */}
              <div>
                <h3 className="text-green-400 font-semibold mb-4">ΑΚΟΛΟΥΘΗΣΤΕ ΜΑΣ</h3>
                <div className="flex space-x-4">
                  <Link to="#" className="hover:text-green-400">
                    <Facebook size={24} />
                  </Link>
                  <Link to="#" className="hover:text-green-400">
                    <Instagram size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div>
            <img
              src="/src/assets/footer-right.png"
              alt="Footer Right"
              width={150}
              height={100}
              className="h-20 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;