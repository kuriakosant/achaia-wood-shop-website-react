import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

 function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-[#1a1a1a] text-white">
      <nav className="container mx-auto px-4 py-4 flex flex-col items-center lg:flex-row lg:justify-between">
        {/* Logo */}
        <div className="flex justify-center w-full lg:w-1/3 mb-4 lg:mb-0">
          <img
            src="/src/assets/header-logo.png"
            alt="ΑΝΤΩΝΙΑΔΗΣ ΟΕ"
            width={200}
            height={60}
            className="h-15 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:w-2/3 justify-end space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm hover:text-green-400 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 absolute top-4 right-4"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block py-2 text-sm hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;