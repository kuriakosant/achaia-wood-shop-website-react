import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

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

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((p: Product) => p.id === Number(id));
        setProduct(foundProduct);
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div className="text-center py-12">Το προϊόν δεν βρέθηκε.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Πίσω στα προϊόντα
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">{product.price.toFixed(2)}€</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <h2 className="text-xl font-semibold mb-2">Χαρακτηριστικά:</h2>
          <ul className="list-disc list-inside mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-600">{feature}</li>
            ))}
          </ul>
          <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center">
            <ShoppingCart className="mr-2" size={20} />
            Προσθήκη στο καλάθι
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

