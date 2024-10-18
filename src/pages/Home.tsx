import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';

const featuredProducts = [
  { id: 1, name: 'Επικάλυψη Α', image: '/src/assets/product1.jpg', price: 19.99 },
  { id: 2, name: 'Υλικό Επιπλοποιίας Β', image: '/src/assets/product2.jpg', price: 29.99 },
  { id: 3, name: 'Ξυλεία Γ', image: '/src/assets/product3.jpg', price: 39.99 },
];

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Blurry Background */}
      <section className="relative bg-cover bg-center rounded-lg p-8 mb-16 overflow-hidden" style={{ backgroundImage: "url('/src/assets/hero-background.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Καλώς ήρθατε στην ΑΝΤΩΝΙΑΔΗΣ ΟΕ</h1>
          <p className="text-xl mb-8">Ο αξιόπιστος συνεργάτης σας στον κόσμο της επιπλοποιίας και των δομικών υλικών</p>
          <Link to="/products" className="inline-flex items-center bg-white text-green-700 font-semibold py-3 px-6 rounded-full hover:bg-green-100 transition duration-300">
            Δείτε τα προϊόντα μας <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <img
              src="/src/assets/icon-partnerships.svg"
              alt="Επώνυμες Συνεργασίες"
              width={32}
              height={32}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">ΕΠΩΝΥΜΕΣ ΣΥΝΕΡΓΑΣΙΕΣ</h3>
          <p className="text-gray-600">
            Διαθέτουμε μεγάλη γκάμα προϊόντων και αποκλειστικές προτάσεις για κάθε ανάγκη του σύγχρονου επαγγελματία.
          </p>
        </div>

        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <img
              src="/src/assets/icon-service.svg"
              alt="Ευέλικτη Εξυπηρέτηση"
              width={32}
              height={32}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">ΕΥΕΛΙΚΤΗ ΕΞΥΠΗΡΕΤΗΣΗ</h3>
          <p className="text-gray-600">
            Φιλική και άμεση εξυπηρέτηση από εξειδικευμένο προσωπικό. Είμαστε εδώ για να καλύψουμε κάθε σας ανάγκη.
          </p>
        </div>

        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <img
              src="/src/assets/icon-customer.svg"
              alt="Μαζί με τον Πελάτη"
              width={32}
              height={32}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">ΜΑΖΙ ΜΕ ΤΟΝ ΠΕΛΑΤΗ</h3>
          <p className="text-gray-600">
            Είμαστε δίπλα σας για κάθε ανάγκη και απορία σας. Η ικανοποίησή σας είναι η προτεραιότητά μας.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Προτεινόμενα Προϊόντα</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/products" className="inline-flex items-center text-green-600 font-semibold hover:text-green-700">
            Δείτε όλα τα προϊόντα <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Company Info Section with Multiple Images */}
      <section className="bg-gray-100 p-8 rounded-lg mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Η ΕΤΑΙΡΕΙΑ ΜΑΣ</h2>
            <p className="text-gray-600 mb-4">
              Η ΑΝΤΩΝΙΑΔΗΣ ΟΕ είναι μια δυναμική εταιρεία με μακρόχρονη παρουσία στο χώρο της επιπλοποιίας και των δομικών υλικών. Με πάνω από 30 χρόνια εμπειρίας, έχουμε καθιερωθεί ως ένας αξιόπιστος συνεργάτης για επαγγελματίες και ιδιώτες.
            </p>
            <Button variant="outline" className="mt-4">
              ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΗΝ ΕΤΑΙΡΕΙΑ
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/src/assets/company-office.jpg"
              alt="Τα γραφεία της εταιρείας μας"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="/src/assets/company-warehouse.jpg"
              alt="Η αποθήκη μας"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="/src/assets/company-showroom.jpg"
              alt="Ο εκθεσιακός μας χώρος"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="/src/assets/company-team.jpg"
              alt="Η ομάδα μας"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Τι Λένε οι Πελάτες μας</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400" />
            <Star className="text-yellow-400" />
            <Star className="text-yellow-400" />
            <Star className="text-yellow-400" />
            <Star className="text-yellow-400" />
          </div>
          <p className="text-gray-600 mb-4 italic">
            "Η ΑΝΤΩΝΙΑΔΗΣ ΟΕ είναι ο απόλυτος συνεργάτης για τις ανάγκες της επιχείρησής μου. Η ποιότητα των προϊόντων και η εξυπηρέτηση είναι πάντα άψογες."
          </p>
          <p className="font-semibold">- Γιώργος Κ., Ιδιοκτήτης Επιπλοποιείου</p>
        </div>
      </section>
    </div>
  );
}

export default Home;

