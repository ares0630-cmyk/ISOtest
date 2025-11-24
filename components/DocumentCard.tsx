import React from 'react';
import { FileText, Download, ShoppingCart, Lock } from 'lucide-react';
import { IsoDocument } from '../types';
import { Button } from './Button';

interface DocumentCardProps {
  doc: IsoDocument;
  isPurchased: boolean;
  isDownloading?: boolean;
  onAction: (doc: IsoDocument) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc, isPurchased, isDownloading, onAction }) => {
  const isFree = doc.price === 0;
  const canDownload = isFree || isPurchased;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            doc.category === 'Security' ? 'bg-red-100 text-red-800' :
            doc.category === 'Quality' ? 'bg-blue-100 text-blue-800' :
            doc.category === 'Environment' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {doc.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{doc.code}</h3>
        <h4 className="text-sm font-medium text-gray-600 mb-3 line-clamp-2">{doc.title}</h4>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">
          {doc.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <span className="uppercase border px-1 rounded">{doc.fileType}</span>
            <span>•</span>
            <span>Instant Download</span>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
        <div>
           {isFree ? (
             <span className="text-green-600 font-bold text-lg">FREE</span>
           ) : (
             <div className="flex flex-col">
               {isPurchased ? (
                  <span className="text-green-600 font-bold text-sm">Purchased</span>
               ) : (
                 <span className="text-gray-900 font-bold text-lg">${doc.price.toFixed(2)}</span>
               )}
             </div>
           )}
        </div>
        
        <Button 
          variant={canDownload ? 'outline' : 'primary'} 
          size="sm"
          isLoading={isDownloading}
          onClick={() => onAction(doc)}
          className="flex items-center gap-2"
        >
          {canDownload ? (
            <>
              <Download className="h-4 w-4" />
              Download
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Buy Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};