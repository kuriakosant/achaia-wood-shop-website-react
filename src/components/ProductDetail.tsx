import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

// Import images
import image1 from '../assets/products/999-empotismeni-xuleia-2000x2000.jpg';
import image2 from '../assets/products/Screenshot from 2024-12-06 16-16-49.png';
import image3 from '../assets/products/Screenshot from 2024-12-06 16-17-02.png';

// Define the Product interface
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  features: string[];
}

// Product data with imported images
const products: Product[] = [
  {
    id: 1,
    name: 'Επικάλυψη Α',
    image: image1,
    price: 19.99,
    description: 'Υψηλής ποιότητας επικάλυψη για επαγγελματική χρήση.',
    features: ['Ανθεκτική', 'Εύκολη εφαρμογή', 'Διαθέσιμη σε πολλά χρώματα']
  },
  {
    id: 2,
    name: 'Υλικό Επιπλοποιίας Β',
    image: image2,
    price: 29.99,
    description: 'Κορυφαίο υλικό για κατασκευή επίπ��ων υψηλής ποιότητας.',
    features: ['Ανθεκτικό στη φθορά', 'Εύκολο στην επεξεργασία', 'Οικολογικό']
  },
  {
    id: 3,
    name: 'Ξυλεία Γ',
    image: image3,
    price: 39.99,
    description: 'Πρώτης ποιότητας ξυλεία για κάθε είδους κατασκευή.',
    features: ['Φυσικό προϊόν', 'Ποικιλία ειδών', 'Κατάλληλο για εσωτερική και εξωτερική χρήση']
  },
  {
    id: 4,
    name: 'Πορτάκι Δ',
    image: image1,
    price: 49.99,
    description: 'Πορτάκι υψηλής ποιότητας για κάθε χρήση.',
    features: ['Ανθεκτικό', 'Εύκολη εγκατάσταση', 'Διαθέσιμο σε πολλά σχέδια']
  },
  {
    id: 5,
    name: 'Επικάλυψη Ε',
    image: image2,
    price: 59.99,
    description: 'Επικάλυψη για επαγγελματική χρήση με αντοχή.',
    features: ['Ανθεκτική', 'Εύκολη εφαρμογή', 'Διαθέσιμη σε πολλά χρώματα']
  },
  {
    id: 6,
    name: 'Υλικό Επιπλοποιίας Ζ',
    image: image3,
    price: 69.99,
    description: 'Υλικό επιπλοποιίας για κατασκευή επίπλων.',
    features: ['Ανθεκτικό στη φθορά', 'Εύκολο στην επεξεργασία', 'Οικολογικό']
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));

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

