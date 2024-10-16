import React from 'react';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Επικοινωνία</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Στοιχεία Επικοινωνίας</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-green-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold">Διεύθυνση</h3>
                <p>Διοδώρου 128, Πάτρα, Τ.Κ 264 42</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-green-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold">Τηλέφωνο</h3>
                <p>Τηλ. Κέντρο / Fax: 2610434377</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-green-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:antoniades_oe@yahoo.gr" className="text-green-600 hover:underline">
                  antoniades_oe@yahoo.gr
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Ωράριο Λειτουργίας</h2>
            <ul className="space-y-2">
              <li><span className="font-semibold">Δευτέρα - Παρασκευή:</span> 9:00 - 17:00</li>
              <li><span className="font-semibold">Σάββατο:</span> 9:00 - 14:00</li>
              <li><span className="font-semibold">Κυριακή:</span> Κλειστά</li>
            </ul>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

