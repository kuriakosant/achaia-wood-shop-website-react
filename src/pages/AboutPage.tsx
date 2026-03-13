import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import heroBackground from '../assets/hero-background.jpg';
import companyTeam from '../assets/company-team.jpg';
import companyWarehouse from '../assets/company-warehouse.png';
import companyOffice from '../assets/company-office.png';
import companyShowroom from '../assets/company-showroom.jpg';

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

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-950/90 z-10" />

        <div className="container relative z-20 mx-auto px-4 lg:px-8 text-center pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-6 flex flex-col items-center"
          >
            <motion.span variants={fadeInUp} className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              30 Χρόνια Εμπειρίας
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Η Ιστορία & Το Όραμα <br />της <span className="text-gradient">ΑΝΤΩΝΙΑΔΗΣ ΕΠΕ</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 font-light max-w-2xl">
              Ανακαλύψτε πώς ξεκινήσαμε και τι μας κάνει να ξεχωρίζουμε στον χώρο των υλικών επιπλοποιίας.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-8 py-20">

        {/* Timeline Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Η Πορεία μας στον χρόνο</h2>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="relative border-l-2 border-green-200 ml-4 md:ml-1/2 space-y-12">
            {/* 1990 */}
            <motion.div variants={fadeInUp} className="relative pl-8 md:w-1/2 md:ml-auto md:pl-12">
              <div className="absolute w-6 h-6 bg-green-500 rounded-full border-4 border-white left-[-13px] md:left-[-13px] top-1 shadow-sm" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1994 - Το Ξεκίνημα</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Η ΑΝΤΩΝΙΑΔΗΣ ΟΕ ιδρύεται με όραμα να προσφέρει ποιοτικά υλικά επιπλοποιίας σε επαγγελματίες της περιοχής. Τα πρώτα βήματα γίνονται με μια μικρή αποθήκη και πάθος για εξυπηρέτηση.</p>
            </motion.div>

            {/* 2005 */}
            <motion.div variants={fadeInUp} className="relative pl-8 md:w-1/2 md:-ml-[2px] md:pr-12 md:pl-0 md:text-right">
              <div className="absolute w-6 h-6 bg-green-500 rounded-full border-4 border-white left-[-13px] md:right-[-11px] md:left-auto top-1 shadow-sm" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2005 - Επέκταση Εγκαταστάσεων</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Η αυξημένη ζήτηση και η εμπιστοσύνη των πελατών μας οδηγεί σε δημιουργία νέων, σύγχρονων αποθηκευτικών χώρων και εκθετηρίου, διευρύνοντας αφάνταστα την γκάμα μας.</p>
            </motion.div>

            {/* Today */}
            <motion.div variants={fadeInUp} className="relative pl-8 md:w-1/2 md:ml-auto md:pl-12">
              <div className="absolute w-6 h-6 bg-green-500 rounded-full border-4 border-white left-[-13px] md:left-[-13px] top-1 shadow-sm" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Σήμερα - Πρωταγωνιστές στον Χώρο</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Συνεργαζόμαστε με τα μεγαλύτερα εργοστάσια της Ευρώπης. Είμαστε δίπλα σε κάθε αρχιτέκτονα, σχεδιαστή και κατασκευαστή, παρέχοντας καινοτόμες λύσεις για κάθε project.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Facilities Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Οι Εγκαταστάσεις & Η Ομάδα μας</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Διαθέτουμε σύγχρονους χώρους σχεδιασμένους για να σας εμπνέουν και να εξυπηρετούν κάθε σας ανάγκη άμεσα.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="group overflow-hidden rounded-[2rem] shadow-lg relative aspect-[4/3]">
              <img src={companyShowroom} alt="Showroom" className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Ο Εκθεσιακός μας Χώρος</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Ένας χώρος γεμάτος έμπνευση και υλικά τελευταίας τεχνολογίας.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="group overflow-hidden rounded-[2rem] shadow-lg relative aspect-[4/3]">
              <img src={companyWarehouse} alt="Warehouse" className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Αποθήκευση & Logistics</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Τεράστιο στοκ ετοιμοπαράδοτων προϊόντων για άμεση εξυπηρέτηση.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="group overflow-hidden rounded-[2rem] shadow-lg relative aspect-[4/3]">
              <img src={companyOffice} alt="Offices" className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Τα Γραφεία μας</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Το κέντρο λήψης αποφάσεων και υποστήριξης των συνεργατών μας.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="group overflow-hidden rounded-[2rem] shadow-lg relative aspect-[4/3]">
              <img src={companyTeam} alt="Team" className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Η Ομάδα μας</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Εξειδικευμένοι επαγγελματίες πάντα πρόθυμοι να βοηθήσουν.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Οι Αξίες μας</h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Η φιλοσοφία πίσω από κάθε συνεργασία και κάθε πώληση.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div variants={fadeInUp} className="text-center space-y-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-sm border border-green-100">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Κορυφαία Ποιότητα</h3>
                <p className="text-gray-600 leading-relaxed">Επιλέγουμε αυστηρά τα υλικά μας για να εγγυηθούμε την αντοχή και το άψογο αισθητικό αποτέλεσμα στις κατασκευές σας.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center space-y-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-sm border border-blue-100">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Σταθερές Συνεργασίες</h3>
                <p className="text-gray-600 leading-relaxed">Χτίζουμε σχέσεις εμπιστοσύνης που αντέχουν στον χρόνο, τόσο με τους προμηθευτές όσο και με τους πελάτες μας.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center space-y-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-sm border border-emerald-100">
                  <HeartHandshake className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Άμεση Εξυπηρέτηση</h3>
                <p className="text-gray-600 leading-relaxed">Ακούμε τις ανάγκες σας και προσφέρουμε γρήγορες, ευέλικτες λύσεις για να μην καθυστερεί κανένα σας έργο.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
