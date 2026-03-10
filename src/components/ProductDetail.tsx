import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  features: string[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Το προϊόν δεν βρέθηκε</h2>
        <Link to="/products" className="text-green-600 hover:text-green-700 underline underline-offset-4">Επιστροφή στα προϊόντα</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 pt-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-green-600 font-medium mb-8 group transition-colors">
          <ArrowLeft className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Επιστροφή στον κατάλογο
        </Link>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square lg:aspect-auto h-full"
            >
              <div className="absolute inset-0 bg-gray-100/50 mix-blend-multiply rounded-t-[2.5rem] lg:rounded-tr-none lg:rounded-l-[2.5rem]" />
              <img src={product.image} alt={product.name} className="object-cover w-full h-full lg:min-h-[600px]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium tracking-wide">Κωδικός: {product.id}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">{product.name}</h1>
              <p className="text-3xl font-extrabold text-green-600 mb-8">{product.price.toFixed(2)}€</p>

              <div className="prose prose-lg text-gray-600 mb-10">
                <p className="leading-relaxed">{product.description}</p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
                <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                  Χαρακτηριστικά Προϊόντος
                </h2>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg shadow-lg shadow-green-900/20">
                  Εκδήλωση Ενδιαφέροντος
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-4 rounded-full text-lg justify-center">
                    Επικοινωνήστε μαζί μας
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

