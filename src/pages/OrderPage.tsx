import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle2, Phone, FileSpreadsheet, Send, FileText, AlertTriangle, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';

const OrderPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    paymentMethod: 'Μετρητά',
    documentType: 'Απόδειξη',
    specialInstructions: '',
  });

  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiUrl}/orders`, {
        ...formData,
        fileUrl: fileBase64
      });
      setSuccess(true);
      setFormData({
        customerName: '',
        phone: '',
        paymentMethod: 'Μετρητά',
        documentType: 'Απόδειξη',
        specialInstructions: '',
      });
      setFileBase64('');
      setFileName('');
    } catch (err: any) {
      setError('Παρουσιάστηκε σφάλμα κατά την αποστολή της παραγγελίας. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Υπηρεσιες</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Στείλτε την Παραγγελία σας</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Για την ταχύτερη και πιο αξιόπιστη εξυπηρέτησή σας, παρακαλούμε ακολουθήστε τις οδηγίες μας και αποστείλετε τα μέτρα σας χρησιμοποιώντας το πρότυπο μας.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Instructions Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-5/12 space-y-8"
          >
            {/* Download Template Box */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 relative z-10 flex items-center">
                <FileSpreadsheet className="w-6 h-6 mr-3 text-green-600" /> Κατεβάστε το Πρότυπο
              </h2>
              <p className="text-gray-600 mb-6 relative z-10">
                Η χρήση του έτοιμου Excel μας εξασφαλίζει λήψη 100% σωστών στοιχείων χωρίς παρερμηνείες.
              </p>
              <a href="/assets/ΠΡΟΤΥΠΟ ΠΑΡΑΓΓΕΛΙΑΣ.xlsx" download>
                <Button className="w-full justify-center">
                  Λήψη Excel Προτύπου
                </Button>
              </a>
            </div>

            {/* AI Rules Box */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-3 text-orange-500" /> Οδηγίες Συμπλήρωσης
              </h3>
              
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Διαστάσεις & Τεμάχια:</strong> Γράψτε πάντα [Μήκος] x [Πλάτος] - [Τεμάχια] (π.χ. 121 x 59 - 1). Τα τεμάχια προτείνεται να γράφονται σε κύκλο.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Μονάδες:</strong> Οι διαστάσεις πρέπει να είναι σε εκατοστά (cm). Mη γράφετε "cm" ή "mm" δίπλα στο νούμερο. (π.χ. 80.5)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Ταινίες & PVC (1 πλευρά):</strong> Για ταινία σε ΜΙΑ πλευρά, βάλτε ΜΙΑ παύλα (-) κάτω ή δίπλα από την επιθυμητή διάσταση (π.χ. <u>59</u> ή 59-).</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Ταινίες & PVC (2 πλευρές):</strong> Για ταινία και στις ΔΥΟ πλευρές, βάλτε ΔΥΟ παύλες (=) (π.χ. 59=).</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Ταινίες Γύρω-Γύρω:</strong> Σχεδιάστε ένα τετράγωνο (□) ή έναν κύκλο (Ο) δίπλα στις διαστάσεις για PVC παντού.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Χρώμα PVC:</strong> Εάν δεν αναγράφεται ρητά κωδικός χρώματος, το αυτόματο σύστημά μας υποθέτει ότι η ταινία είναι "ΙΔΙΟ ΧΡΩΜΑ".</span>
                </li>
              </ul>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-gray-100 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-700" /> Τηλεφωνική Παραγγελία
              </h3>
              <p className="text-gray-600 mb-2">
                Αν δυσκολεύεστε με την φόρμα, καλέστε μας για να σας βοηθήσουμε ή να δώσετε την παραγγελία τηλεφωνικά.
              </p>
              <div className="text-lg font-bold text-gray-900 tracking-wider">
                2610 434377 <span className="text-base text-gray-500 font-normal">|</span> 2610 434478
              </div>
            </div>

          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-xl shadow-green-900/5">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Φόρμα Παραγγελίας</h2>

              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center mb-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Η παραγγελία εστάλη επιτυχώς!</h3>
                  <p className="text-green-700">Θα την επεξεργαστούμε άμεσα και θα επικοινωνήσουμε μαζί σας αν χρειαστεί.</p>
                  <Button onClick={() => setSuccess(false)} className="mt-6 mx-auto bg-green-600 text-white hover:bg-green-700">
                    Νέα Παραγγελία
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ονοματεπώνυμο ή Εταιρεία *</label>
                      <input required type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="Εισάγετε όνομα" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Τηλέφωνο Επικοινωνίας *</label>
                      <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="Τηλέφωνο" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Τρόπος Πληρωμής *</label>
                      <select required name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all text-gray-700">
                        <option value="Μετρητά">Μετρητά (στο κατάστημα)</option>
                        <option value="Κάρτα POS">Κάρτα (POS στο κατάστημα)</option>
                        <option value="Τραπεζική Κατάθεση">Τραπεζική Κατάθεση</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Παραστατικό *</label>
                      <select required name="documentType" value={formData.documentType} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all text-gray-700">
                        <option value="Απόδειξη">Απόδειξη Λιανικής</option>
                        <option value="Τιμολόγιο">Τιμολόγιο</option>
                      </select>
                    </div>
                  </div>

                  {/* File Upload Area */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ανέβασμα Παραγγελίας (Excel, Φωτογραφία, Σκίτσο)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50 hover:bg-green-50 hover:border-green-300 transition-colors cursor-pointer relative group">
                      <div className="space-y-1 text-center">
                        {fileName ? (
                          <div className="flex flex-col items-center">
                            <FileText className="mx-auto h-12 w-12 text-green-500 mb-2" />
                            <span className="text-gray-900 font-medium">{fileName}</span>
                            <span className="text-green-600 text-sm mt-2 font-medium">Επιτυχής προσθήκη αρχείου. Αλλάξτε το κάνοντας κλικ.</span>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400 group-hover:text-green-500 transition-colors" />
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 px-2 py-1">
                                <span>Αναζήτηση Αρχείου</span>
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">.xlsx, .pdf, .png, .jpg (Μεγ. 5MB)</p>
                          </>
                        )}
                        <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ιδιαίτερες Οδηγίες / Συμπληρωματικά</label>
                    <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="Γράψτε εδώ τυχόν διευκρινίσεις ή οδηγίες για εμάς..."></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-lg justify-center shadow-lg shadow-green-900/10 rounded-xl">
                      {isSubmitting ? (
                        <span className="flex items-center"><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Αποστολή...</span>
                      ) : (
                        <span className="flex items-center"><Send className="w-5 h-5 mr-3" /> Καταχώρηση Παραγγελίας</span>
                      )}
                    </Button>
                  </div>

                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default OrderPage;
