import React, { useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ProductCard';

// Mock data for products
const products = [
  { id: 1, name: 'Επικάλυψη Α', image: '/src/assets/product1.jpg', price: 19.99, category: 'Επικαλύψεις' },
  { id: 2, name: 'Υλικό Επιπλοποιίας Β', image: '/src/assets/product2.jpg', price: 29.99, category: 'Υλικά Επιπλοποιίας' },
  { id: 3, name: 'Ξυλεία Γ', image: '/src/assets/product3.jpg', price: 39.99, category: 'Ξυλεία' },
  { id: 4, name: 'Πορτάκι Δ', image: '/src/assets/product4.jpg', price: 49.99, category: 'Πορτάκια' },
  { id: 5, name: 'Επικάλυψη Ε', image: '/src/assets/product5.jpg', price: 59.99, category: 'Επικαλύψεις' },
  { id: 6, name: 'Υλικό Επιπλοποιίας Ζ', image: '/src/assets/product6.jpg', price: 69.99, category: 'Υλικά Επιπλοποιίας' },
];

const categories = ['Όλα', 'Επικαλύψεις', 'Υλικά Επιπλοποιίας', 'Ξυλεία', 'Πορτάκια'];

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Όλα');

  const filteredProducts = selectedCategory === 'Όλα'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Τα προϊόντα μας</h1>
        <div className="w-full sm:w-64">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold mb-4">Κατηγορίες</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left py-2 px-4 rounded-md transition duration-300 ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Product grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

