import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import antoniadisBlack from '../assets/ANTONIADIS-BLACK.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isDarkHeader = isScrolled || !isHomePage;

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isDarkHeader ? "glass-panel-dark py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center outline-none group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="overflow-hidden rounded-md bg-transparent"
            >
              <img
                src={antoniadisBlack}
                alt="ΑΝΤΩΝΙΑΔΗΣ ΟΕ"
                className="h-10 md:h-16 w-auto object-contain transition-all duration-300"
              />
            </motion.div>
          </Link>

          {/* Desktop and Tablet Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "relative text-sm lg:text-base font-medium transition-colors outline-none",
                  isDarkHeader ? "text-gray-200 hover:text-white" : "text-white/90 hover:text-white",
                  location.pathname === item.href && "text-green-400 font-semibold"
                )}
              >
                {item.title}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-green-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Contact Info and Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <a href="tel:2610434377" className="flex items-center bg-green-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20">
                <Phone size={14} className="mr-2" />
                <span>2610434377</span>
              </a>
              <div
                className="relative"
                onMouseEnter={() => setIsContactOpen(true)}
                onMouseLeave={() => setIsContactOpen(false)}
              >
                <button
                  className={clsx(
                    "flex items-center text-sm font-medium transition-colors outline-none",
                    isDarkHeader ? "text-gray-200 hover:text-white" : "text-white/90 hover:text-white"
                  )}
                >
                  ΕΠΙΚΟΙΝΩΝΙΑ
                  <ChevronDown size={14} className={clsx("ml-1 transition-transform duration-300", isContactOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isContactOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-4 w-72 glass-panel-dark rounded-xl shadow-2xl overflow-hidden border border-gray-700/50"
                    >
                      <div className="p-5 space-y-4">
                        <div className="flex items-start text-sm text-gray-300">
                          <MapPin size={18} className="mr-3 text-green-400 shrink-0 mt-0.5" />
                          <span>Διοδώρου 128, Πάτρα, Τ.Κ 264 42</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Phone size={18} className="mr-3 text-green-400 shrink-0" />
                          <span>2610434377</span>
                        </div>
                        <a href="mailto:antoniades_oe@yahoo.gr" className="flex items-center text-sm text-gray-300 hover:text-green-400 transition-colors group">
                          <Mail size={18} className="mr-3 text-green-400 group-hover:text-green-300 shrink-0" />
                          <span>antoniades_oe@yahoo.gr</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center space-x-3 border-l border-white/20 pl-6">
              <button className="text-white/80 hover:text-white transition-colors p-1" aria-label="Search">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Area */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel-dark border-t border-gray-700/50"
          >
            <div className="px-4 py-6 space-y-6">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={clsx(
                      "block text-lg font-medium",
                      location.pathname === item.href ? "text-green-400" : "text-gray-200"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="pt-6 border-t border-gray-700/50 space-y-4">
                <a href="tel:2610434377" className="flex items-center text-sm text-gray-300">
                  <Phone size={18} className="mr-3 text-green-400" /> 2610434377
                </a>
                <p className="flex items-start text-sm text-gray-300">
                  <MapPin size={18} className="mr-3 text-green-400 mt-0.5" /> Διοδώρου 128, Πάτρα, Τ.Κ 264 42
                </p>
                <a href="mailto:antoniades_oe@yahoo.gr" className="flex items-center text-sm text-gray-300">
                  <Mail size={18} className="mr-3 text-green-400" /> antoniades_oe@yahoo.gr
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;

