import React, { useState } from 'react';
import Button from './ui/Button';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const inputClasses = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 outline-none placeholder-gray-400";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          ></textarea>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full md:w-auto px-10 py-4 rounded-full text-lg shadow-xl shadow-green-900/20"
          >
            Αποστολή Μηνύματος
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

