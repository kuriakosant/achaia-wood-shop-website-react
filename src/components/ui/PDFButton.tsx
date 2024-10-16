import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import PDFViewer from '../../components/PDFViewer';

interface PDFButtonProps {
  pdfUrl: string;
  buttonText: string;
}

const PDFButton: React.FC<PDFButtonProps> = ({ pdfUrl, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition duration-300"
      >
        <FileText size={20} />
        <span>{buttonText}</span>
      </button>
      {isOpen && <PDFViewer pdfUrl={pdfUrl} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default PDFButton;

