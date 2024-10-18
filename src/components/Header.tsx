import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, ShoppingCart } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Αρχική', href: '/' },
    {
      title: 'Προϊόντα',
      href: '/products',
      subItems: [
        { title: 'Επικαλύψεις', href: '/products/epikalypseis' },
        { title: 'Υλικά Επιπλοποιίας', href: '/products/ylika-epiplopias' },
        { title: 'Ξυλεία', href: '/products/xyleia' },
        { title: 'Πορτάκια', href: '/products/portakia' },
      ],
    },
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
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-white'}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/src/assets/header-logo.png"
              alt="ΑΝΤΩΝΙΑΔΗΣ ΟΕ"
              className={`h-12 w-auto transition-all duration-300 ${isScrolled ? 'brightness-0' : 'brightness-100'}`}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.subItems ? (
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="flex items-center space-x-1 text-sm font-medium hover:text-green-400 transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="text-sm font-medium hover:text-green-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search and Cart Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-2xl hover:text-green-400 transition-colors">
              <Search size={24} />
            </button>
            <button className="text-2xl hover:text-green-400 transition-colors">
              <ShoppingCart size={24} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`absolute top-0 right-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              {menuItems.map((item) => (
                <div key={item.href}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className="flex items-center justify-between w-full text-left text-gray-800 hover:text-green-600 transition-colors"
                      >
                        <span>{item.title}</span>
                        <ChevronDown size={16} className={`transform transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isProductsOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block text-gray-800 hover:text-green-600 transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex items-center space-x-4">
                <button className="text-2xl text-gray-800 hover:text-green-600 transition-colors">
                  <Search size={24} />
                </button>
                <button className="text-2xl text-gray-800 hover:text-green-600 transition-colors">
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

