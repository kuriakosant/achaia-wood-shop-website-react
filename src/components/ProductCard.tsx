import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, price }) => {
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full">
      <Link to={`/products/${id}`} className="flex flex-col h-full outline-none">
        <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{name}</h3>
          <p className="text-green-600 font-extrabold text-2xl mb-6 mt-auto">{price.toFixed(2)}€</p>
          <span className="flex items-center justify-center w-full bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition duration-300">
            Περισσότερα <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

