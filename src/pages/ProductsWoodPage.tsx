import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, AlertCircle, ChevronDown, ChevronRight, Briefcase } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  level: number;
  parentId: number | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  mainCategoryId: number;
  subCategoryId1: number;
  subCategoryId2: number | null;
  company: string | null;
  features: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
};

const ProductsWoodPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  // Filtering State
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [selectedCatLevel, setSelectedCatLevel] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('Όλες');
  const [expandedCats, setExpandedCats] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${apiUrl}/wood-products`),
          axios.get(`${apiUrl}/wood-categories`)
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching catalog data:', error);
        setLoading(false);
      }
    };
    setTimeout(fetchData, 400);
  }, []);

  const companies = ['Όλες', ...Array.from(new Set(products.map(p => p.company).filter(Boolean)))];

  const filteredAndSortedProducts = products
    .filter(product => {
      // 1. Category Filter
      let catMatch = true;
      if (selectedCatId !== null && selectedCatLevel !== null) {
        if (selectedCatLevel === 1) catMatch = product.mainCategoryId === selectedCatId;
        else if (selectedCatLevel === 2) catMatch = product.subCategoryId1 === selectedCatId;
        else if (selectedCatLevel === 3) catMatch = product.subCategoryId2 === selectedCatId;
      }
      
      // 2. Company Filter
      let compMatch = true;
      if (selectedCompany !== 'Όλες') {
        compMatch = product.company === selectedCompany;
      }

      // 3. Search Filter
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return catMatch && compMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'el');
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name, 'el');
      return 0;
    });

  const toggleExpand = (id: number) => {
    setExpandedCats(prev => prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]);
  };

  const selectCategory = (id: number, level: number) => {
    if (selectedCatId === id) {
      setSelectedCatId(null);
      setSelectedCatLevel(null);
    } else {
      setSelectedCatId(id);
      setSelectedCatLevel(level);
    }
  };

  const renderCategoryTree = (parentId: number | null, level: number) => {
    const children = categories.filter(c => c.parentId === parentId && c.level === level);
    if (children.length === 0) return null;

    return (
      <ul className={`space-y-1 ${level > 1 ? 'ml-6 mt-2 border-l-2 border-green-100 pl-4' : ''}`}>
        {children.map(cat => {
          const isExpanded = expandedCats.includes(cat.id);
          const isSelected = selectedCatId === cat.id;
          const hasChildren = categories.some(c => c.parentId === cat.id);

          return (
            <li key={cat.id} className="text-sm">
              <div className="flex items-center group">
                {hasChildren ? (
                  <button onClick={() => toggleExpand(cat.id)} className="p-1 text-gray-400 hover:text-green-600 focus:outline-none">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                ) : (
                  <span className="w-6 line-block"></span> // Spacer for alignment
                )}
                
                <button
                  onClick={() => selectCategory(cat.id, cat.level)}
                  className={`flex-1 text-left py-2 px-3 rounded-lg transition-colors font-medium border-l-2 ${
                    isSelected 
                      ? 'bg-green-50 text-green-700 border-green-500' 
                      : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-green-600'
                  }`}
                >
                  {cat.name}
                </button>
              </div>

              {/* Render subcategories if expanded */}
              {isExpanded && renderCategoryTree(cat.id, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

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
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Βιομηχανική Ξυλεία</h1>
            <p className="text-gray-500 mt-4 text-lg max-w-xl">Εξερευνήστε την πλήρη γκάμα των υλικών βιομηχανικής ξυλείας, σχεδιασμένη για τις υψηλότερες απαιτήσεις.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-6 md:mt-0">
            <div className="w-full sm:w-64">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="w-full sm:w-auto flex items-center bg-white rounded-xl border border-gray-200 px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-green-400 focus-within:border-green-400 transition-all">
              <span className="text-gray-500 text-sm whitespace-nowrap mr-2">Ταξινόμηση:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-gray-900 text-sm font-medium py-2 outline-none cursor-pointer w-full sm:w-auto"
              >
                <option value="default">Προεπιλογή</option>
                <option value="price-asc">Τιμή (Αύξουσα)</option>
                <option value="price-desc">Τιμή (Φθίνουσα)</option>
                <option value="name-asc">Όνομα (Α-Ω)</option>
                <option value="name-desc">Όνομα (Ω-Α)</option>
              </select>
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
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-8">
              
              {/* Companies Filter */}
              {companies.length > 1 && (
                <div>
                  <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
                    <Briefcase className="mr-2 w-5 h-5 text-green-500" /> Κατασκευαστής / Εταιρεία
                  </h2>
                  <select 
                    value={selectedCompany} 
                    onChange={e => setSelectedCompany(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  >
                    {companies.map(c => c ? <option key={c} value={c}>{c}</option> : null)}
                  </select>
                </div>
              )}

              {/* Categories Tree Filter */}
              <div>
                <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
                  <LayoutGrid className="mr-2 w-5 h-5 text-green-500" /> Κατηγορίες
                </h2>
                
                <button 
                  onClick={() => { setSelectedCatId(null); setSelectedCatLevel(null); }}
                  className={`w-full text-left py-3 px-4 rounded-xl font-medium mb-4 transition-colors border-2 ${selectedCatId === null ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100 hover:border-gray-200'}`}
                >
                  Όλα τα προϊόντα
                </button>

                <div className="pt-2">
                  {renderCategoryTree(null, 1)}
                </div>
              </div>
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
                {filteredAndSortedProducts.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                  >
                    <AnimatePresence>
                      {filteredAndSortedProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants} layoutId={`product-${product.id}`}>
                          <ProductCard id={product.id} name={product.name} image={product.image} price={product.price} shopType="wood" />
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
                      onClick={() => { setSearchTerm(''); setSelectedCatId(null); setSelectedCompany('Όλες'); }}
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

export default ProductsWoodPage;
