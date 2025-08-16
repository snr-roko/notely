import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import type { ErrorProps } from '@/interfaces';

const ErrorNotification: React.FC<ErrorProps> = ({ showing, message, onClose }) => {
  if (!showing) return null;

  return (
    <>
      {/* Desktop - slides from top right */}
      <div className="hidden md:block fixed top-4 right-4 z-50 max-w-sm">
        <div className="bg-red-500 text-white rounded-lg shadow-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm flex-1">{message}</p>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile - banner at top */}
      <div className="block md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="bg-red-500 text-white p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm flex-1">{message}</p>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ErrorNotification;