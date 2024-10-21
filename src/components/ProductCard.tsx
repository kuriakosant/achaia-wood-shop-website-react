import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/products/${id}`}>
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-green-600 font-bold mb-4">{price.toFixed(2)}€</p>
          <span className="block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
            Περισσότερα
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

