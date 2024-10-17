import React from 'react';
import { X } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-3xl h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X size={24} />
        </button>
        <iframe
          src={pdfUrl}
          title="PDF Document"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default PDFViewer;

