import React from 'react';

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-green-600 font-bold">{price.toFixed(2)}€</p>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
          Προσθήκη στο καλάθι
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

