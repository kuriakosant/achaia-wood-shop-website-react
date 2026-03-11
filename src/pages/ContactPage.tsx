import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-24">
      {/* Header Background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gray-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-400 font-bold tracking-widest uppercase text-sm mb-3 block drop-shadow-sm">Χρειάζεστε Βοήθεια;</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">Επικοινωνία</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Η ομάδα μας είναι πάντα διαθέσιμη να απαντήσει στις ερωτήσεις σας και να σας βοηθήσει να βρείτε ακριβώς τα υλικά που χρειάζεστε για τις κατασκευές σας.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Contact Info Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-shadow duration-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                <MapPin size={100} />
              </div>
              <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Επισκεφθείτε μας</h3>
              <p className="text-gray-600 leading-relaxed">Διοδώρου 128,<br />Πάτρα, Τ.Κ 264 42</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-shadow duration-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                <Phone size={100} />
              </div>
              <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Τηλεφωνικό Κέντρο</h3>
              <a href="tel:2610434377" className="text-gray-600 hover:text-green-600 transition-colors block text-lg font-medium">2610 434 377</a>
              <p className="text-gray-500 text-sm mt-1">Από Δευτέρα έως Σάββατο</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-xl relative overflow-hidden group text-white"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500">
                <Clock size={100} />
              </div>
              <div className="bg-gray-800 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="text-green-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Ωράριο Λειτουργίας</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="font-medium text-gray-400">Δευ - Παρ</span>
                  <span>9:00 - 17:00</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="font-medium text-gray-400">Σάββατο</span>
                  <span>9:00 - 14:00</span>
                </li>
                <li className="flex justify-between items-center pb-1">
                  <span className="font-medium text-gray-400">Κυριακή</span>
                  <span className="text-green-400">Κλειστά</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100/50"
          >
            <div className="flex items-center mb-8">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Στείλτε μας μήνυμα</h2>
                <p className="text-gray-500 mt-1">Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε άμεσα.</p>
              </div>
            </div>

            <ContactForm />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;

