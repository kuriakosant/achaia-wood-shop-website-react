import React from 'react';
import { X, Download } from 'lucide-react';

interface ESPAViewerProps {
  imageUrl: string;
  pdfUrl: string;
  onClose: () => void;
}

const ESPAViewer: React.FC<ESPAViewerProps> = ({ imageUrl, pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">ESPA Viewer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-hidden flex justify-center items-center">
          <img src={imageUrl} alt="ESPA Image" className="max-w-full max-h-full" />
        </div>
        <div className="flex justify-between items-center p-4 border-t">
          <a
            href={pdfUrl}
            download
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition duration-300"
          >
            <Download size={20} />
            <span>Download PDF</span>
          </a>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESPAViewer;