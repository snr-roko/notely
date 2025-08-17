import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import type { 
  NotificationProps, 
  NotificationTypeProps, 
} from '@/interfaces';

const Notification: React.FC<NotificationProps> = ({
  showing,
  message,
  type = 'error',
  onClose
}) => {
  if (!showing) return null;

  const typeConfig: NotificationTypeProps = {
    error: {
      bgColor: 'bg-red-500',
      icon: AlertCircle,
      shadowColor: 'shadow-red-500/20'
    },
    success: {
      bgColor: 'bg-green-500',
      icon: CheckCircle,
      shadowColor: 'shadow-green-500/20'
    }
  };

  const { bgColor, icon: IconComponent, shadowColor } = typeConfig[type];

  return (
    <>
      {/* Desktop notification - positioned in top-right corner */}
      <div className="hidden md:block fixed top-4 right-4 z-50 max-w-sm">
        <div 
          className={`${bgColor} ${shadowColor} text-white rounded-lg shadow-lg p-4 flex items-center gap-3`} 
          role="alert"
        >
          <IconComponent className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm flex-1">{message}</p>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded transition-colors duration-200"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile notification - full-width banner at top of screen */}
      <div className="block md:hidden fixed top-0 left-0 right-0 z-50">
        <div className={`${bgColor} text-white p-4 flex items-center gap-3`} role="alert">
          <IconComponent className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm flex-1">{message}</p>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded transition-colors duration-200"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;