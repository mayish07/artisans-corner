import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      <Toast toasts={toasts} />
    </ToastContext.Provider>
  );
}

function Toast({ toasts }) {
  if (!toasts.length) return null;
  
  const typeStyles = {
    info: 'bg-blue-500',
    success: 'bg-green-500', 
    error: 'bg-red-500',
    warning: 'bg-amber-500'
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div key={toast.id} className={`${typeStyles[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-64 animate-slide-in`}>
          {toast.type === 'success' && <span>✓</span>}
          {toast.type === 'error' && <span>✕</span>}
          {toast.type === 'warning' && <span>⚠</span>}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export const useToast = () => useContext(ToastContext);