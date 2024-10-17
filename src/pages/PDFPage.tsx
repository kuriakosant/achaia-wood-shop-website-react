import React from 'react';
import PDFButton from '../components/ui/PDFButton';

const PDFPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">ESPA</h1>
      <PDFButton pdfUrl="/src/assets/ESPA-ACHAIA-WOOD.pdf" buttonText="View Document" />
      {/* Other content */}
    </div>
  );
};

export default PDFPage;

