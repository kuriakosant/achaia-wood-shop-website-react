import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, AlertCircle } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

const CATEGORIES = ['Όλα', 'Επικαλύψεις', 'Υλικά Επιπλοποιίας', 'Ξυλεία', 'Πορτάκια'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Όλα');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Simulate slight loading for smooth entrance
    setTimeout(() => {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      fetch(`${apiUrl}/products`)
        .then(response => {
          if (!response.ok) throw new Error('API fetch failed');
          return response.json();
        })
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }, 400);
  }, []);

  const filteredProducts = products.filter(product =>
    (selectedCategory === 'Όλα' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-gray-200 pb-8"
        >
          <div>
            <span className="text-green-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Καταλογος</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Τα προϊόντα μας</h1>
            <p className="text-gray-500 mt-4 text-lg max-w-xl">Εξερευνήστε την πλήρη γκάμα των υλικών μας, σχεδιασμένη για τις υψηλότερες απαιτήσεις του επαγγελματία.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="w-full sm:w-72">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar / Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/4 shrink-0"
          >
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                <LayoutGrid className="mr-2 w-5 h-5 text-green-500" /> Κατηγορίες
              </h2>
              <ul className="space-y-2">
                {CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left py-3 px-5 rounded-xl transition duration-300 font-medium ${selectedCategory === category
                        ? 'bg-green-600 text-white shadow-md shadow-green-900/20'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {category}
                      {category === 'Όλα' && <span className="float-right bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">{products.length}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {filteredProducts.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                  >
                    <AnimatePresence>
                      {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants} layoutId={`product-${product.id}`}>
                          <ProductCard {...product} image={product.image} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-3xl p-12 text-center border border-gray-100 flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <div className="bg-orange-50 p-4 rounded-full mb-4">
                      <AlertCircle className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Δεν βρέθηκαν προϊόντα</h3>
                    <p className="text-gray-500">Δοκιμάστε να τροποποιήσετε τα κριτήρια αναζήτησης ή επιλέξτε διαφορετική κατηγορία.</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedCategory('Όλα'); }}
                      className="mt-6 text-green-600 font-semibold hover:text-green-700 underline underline-offset-4"
                    >
                      Επαναφορά Φίλτρων
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

