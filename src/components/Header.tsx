import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, ShoppingCart, Phone, Mail, MapPin } from 'lucide-react';
import antoniadisBlack from '../assets/ANTONIADIS-BLACK.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Αρχική', href: '/' },
    { title: 'Προϊόντα', href: '/products' },
    { title: 'Επικοινωνία', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsContactOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900 text-white shadow-lg' : 'bg-black bg-opacity-75 text-white'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={antoniadisBlack}
              alt="ΑΝΤΩΝΙΑΔΗΣ ΟΕ"
              className={`h-8 md:h-10 lg:h-12 w-auto transition-all duration-300 ${
                isScrolled ? 'brightness-0 invert' : 'brightness-100'
              } group-hover:scale-105`}
            />
          </Link>

          {/* Desktop and Tablet Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm lg:text-base font-medium hover:text-green-400 transition-colors relative group"
              >
                {item.title}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Contact Info and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <a href="tel:2610434377" className="flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition-colors duration-300">
                <Phone size={16} className="mr-2" />
                <span>2610434377</span>
              </a>
              <div className="relative">
                <button
                  onClick={() => setIsContactOpen(!isContactOpen)}
                  className="text-sm lg:text-base font-medium hover:text-green-400 transition-colors flex items-center"
                  aria-expanded={isContactOpen}
                  aria-haspopup="true"
                >
                  ΕΠΙΚΟΙΝΩΝΙΑ
                  <ChevronDown size={16} className={`ml-1 transform transition-transform duration-300 ${isContactOpen ? 'rotate-180' : ''}`} />
                </button>
                {isContactOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg overflow-hidden transition-all duration-300">
                    <div className="p-4 space-y-2">
                      <p className="flex items-center text-sm"><MapPin size={16} className="mr-2" /> Διοδώρου 128, Πάτρα, Τ.Κ 264 42</p>
                      <p className="flex items-center text-sm"><Phone size={16} className="mr-2" /> 2610434377</p>
                      <a href="mailto:antoniades_oe@yahoo.gr" className="flex items-center text-sm hover:text-green-400 transition-colors">
                        <Mail size={16} className="mr-2" /> antoniades_oe@yahoo.gr
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button className="text-2xl hover:text-green-400 transition-colors transform hover:scale-110" aria-label="Search">
              <Search size={24} />
            </button>
            <button className="text-2xl hover:text-green-400 transition-colors transform hover:scale-110" aria-label="Shopping Cart">
              <ShoppingCart size={24} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 focus:outline-none hover:text-green-400 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`absolute top-0 right-0 w-64 h-full bg-gray-900 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              {menuItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    className="block text-white hover:text-green-400 transition-colors text-lg py-2"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <a href="tel:2610434377" className="flex items-center text-sm text-white hover:text-green-400 transition-colors">
                  <Phone size={16} className="mr-2" /> 2610434377
                </a>
                <p className="flex items-center text-sm text-white"><MapPin size={16} className="mr-2" /> Διοδώρου 128, Πάτρα, Τ.Κ 264 42</p>
                <a href="mailto:antoniades_oe@yahoo.gr" className="flex items-center text-sm text-white hover:text-green-400 transition-colors">
                  <Mail size={16} className="mr-2" /> antoniades_oe@yahoo.gr
                </a>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button className="text-2xl text-white hover:text-green-400 transition-colors" aria-label="Search">
                  <Search size={24} />
                </button>
                <button className="text-2xl text-white hover:text-green-400 transition-colors" aria-label="Shopping Cart">
                  <ShoppingCart size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

