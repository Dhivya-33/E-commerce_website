import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-indigo-500',
    warning: 'from-yellow-500 to-orange-500'
  };

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in">
      <div className={`glass-card bg-gradient-to-r ${colors[type]} p-4 rounded-2xl shadow-2xl min-w-[300px] bounce-in`}>
        <div className="flex items-center space-x-3">
          <div className="text-3xl text-white floating">
            {icons[type]}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold transition-transform hover:scale-110"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
