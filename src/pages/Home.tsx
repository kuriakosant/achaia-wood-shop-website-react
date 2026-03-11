import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import heroBackground from '../assets/hero-background.jpg';
import iconPartnerships from '../assets/icon-partnerships.jpg';
import iconService from '../assets/icon-service.png';
import iconCustomer from '../assets/icon-customer.png';
import companyOffice from '../assets/company-office.png';
import companyWarehouse from '../assets/company-warehouse.png';
import companyShowroom from '../assets/company-showroom.jpg';
import companyTeam from '../assets/company-team.jpg';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/products`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch from live API');
        return response.json();
      })
      .then((data) => {
        setFeaturedProducts(data.slice(0, 3));
      })
      .catch((error) => console.error('Error fetching live products:', error));
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-gray-50 min-h-screen pb-20"
    >
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-950/90 z-10" />

        <div className="container relative z-20 mx-auto px-4 lg:px-8 text-center mt-20">
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto space-y-6 flex flex-col items-center">
            <span className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              30 Χρόνια Εμπειρίας
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Καλώς ήρθατε στην <br />
              <span className="text-gradient">ΑΝΤΩΝΙΑΔΗΣ ΟΕ</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl">
              Ο πιο αξιόπιστος συνεργάτης σας στον κόσμο της επιπλοποιίας και των δομικών υλικών
            </p>
            <motion.div
              variants={fadeInUp}
              className="pt-8"
            >
              <Link to="/products" className="group inline-flex items-center justify-center bg-green-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-green-500 transition-all duration-300 shadow-xl shadow-green-900/40 hover:shadow-green-900/60 hover:-translate-y-1">
                Δείτε τα προϊόντα μας
                <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center text-white/50"
        >
          <span className="text-sm tracking-widest uppercase mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-30">

        {/* Features Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
        >
          {[
            { img: iconPartnerships, icon: Award, title: "ΕΠΩΝΥΜΕΣ ΣΥΝΕΡΓΑΣΙΕΣ", desc: "Διαθέτουμε μεγάλη γκάμα προϊόντων και αποκλειστικές προτάσεις για κάθε ανάγκη." },
            { img: iconService, icon: ShieldCheck, title: "ΕΥΕΛΙΚΤΗ ΕΞΥΠΗΡΕΤΗΣΗ", desc: "Φιλική και άμεση εξυπηρέτηση από εξειδικευμένο προσωπικό." },
            { img: iconCustomer, icon: HeartHandshake, title: "ΜΑΖΙ ΜΕ ΤΟΝ ΠΕΛΑΤΗ", desc: "Είμαστε δίπλα σας για κάθε ανάγκη. Η ικανοποίησή σας, προτεραιότητά μας." }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 group border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video">
                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-lg border border-white/30">
                  <feature.icon className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* Featured Products */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Featured Products</h2>
              <p className="text-gray-500 mt-2">Επιλεγμένα κομμάτια για τους πιο απαιτητικούς επαγγελματίες</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
              Δείτε όλα <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard {...product} image={product.image} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="inline-flex py-3 px-6 rounded-full bg-gray-100 items-center justify-center text-gray-900 font-semibold hover:bg-gray-200 transition-colors">
              Δείτε όλα τα προϊόντα <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.section>

        {/* Company Info Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-gray-100 mb-32 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <span className="text-green-600 font-semibold tracking-widest uppercase text-sm mb-3 block">Σχετικα με εμας</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">Η ΕΤΑΙΡΕΙΑ ΜΑΣ</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Η <strong>ΑΝΤΩΝΙΑΔΗΣ ΟΕ</strong> είναι μια δυναμική εταιρεία με μακρόχρονη παρουσία στο χώρο της επιπλοποιίας και των δομικών υλικών. Με πάνω από 30 χρόνια εμπειρίας, έχουμε καθιερωθεί ως ένας αξιόπιστος συνεργάτης για επαγγελματίες και ιδιώτες.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button variant="default" className="rounded-full px-8">
                  ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΗΝ ΕΤΑΙΡΕΙΑ
                </Button>
                <Button variant="outline" className="rounded-full px-8">
                  ΕΠΙΚΟΙΝΩΝΗΣΤΕ ΜΑΖΙ ΜΑΣ
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <img src={companyOffice} alt="Τα γραφεία της εταιρείας μας" className="w-full h-48 md:h-64 object-cover rounded-3xl shadow-lg" />
                <img src={companyShowroom} alt="Ο εκθεσιακός μας χώρος" className="w-full h-32 md:h-48 object-cover rounded-3xl shadow-lg" />
              </div>
              <div className="space-y-4">
                <img src={companyWarehouse} alt="Η αποθήκη μας" className="w-full h-32 md:h-48 object-cover rounded-3xl shadow-lg" />
                <img src={companyTeam} alt="Η ομάδα μας" className="w-full h-48 md:h-64 object-cover rounded-3xl shadow-lg" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonial Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-24 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Τι Λένε οι Πελάτες μας</h2>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full" />
          </div>

          <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 text-center relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
              <div className="bg-green-50 text-green-600 rounded-full p-3">
                <Star className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div className="flex justify-center items-center mb-8 pt-4 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />)}
            </div>
            <p className="text-2xl text-gray-700 mb-8 italic font-light leading-relaxed">
              "Η ΑΝΤΩΝΙΑΔΗΣ ΟΕ είναι ο απόλυτος συνεργάτης για τις ανάγκες της επιχείρησής μου. Η ποιότητα των προϊόντων και η εξυπηρέτηση είναι πάντα άψογες."
            </p>
            <div>
              <p className="font-bold text-gray-900 text-lg">Γιώργος Κ.</p>
              <p className="text-gray-500 text-sm">Ιδιοκτήτης Επιπλοποιείου</p>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default Home;

