import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await axios.post(`${API_URL}/contact-messages`, formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Auto-hide success message after 8 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 8000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Παρουσιάστηκε σφάλμα κατά την αποστολή του μηνύματος. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας τηλεφωνικά.');
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 outline-none placeholder-gray-400";

  return (
    <div className="w-full relative min-h-[400px]">
      {isSuccess ? (
        <div className="absolute inset-0 bg-green-50 border border-green-100 rounded-[2rem] p-8 md:p-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
          <div className="bg-green-100 p-4 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Το μήνυμά σας εστάλη!</h3>
          <p className="text-gray-600 text-lg mb-8">
            Ευχαριστούμε για την επικοινωνία. Ένας εκπρόσωπός μας θα σας καλέσει σύντομα.
          </p>
          <Button 
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="px-8 py-3 rounded-full"
          >
            Αποστολή νέου μηνύματος
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-start">
              <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 ml-1">
                Ονοματεπώνυμο <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="π.χ. Ιωάννης Παπαδόπουλος"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 ml-1">
                Τηλέφωνο <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="π.χ. 69XXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 ml-1">
              Email <span className="text-gray-400 font-normal">(Προαιρετικό)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="π.χ. user@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 ml-1">
              Μήνυμα <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Πώς μπορούμε να σας βοηθήσουμε;"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClasses} resize-none`}
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-10 py-4 rounded-full text-lg shadow-xl shadow-green-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Αποστολή...
                </>
              ) : (
                'Αποστολή Μηνύματος'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
