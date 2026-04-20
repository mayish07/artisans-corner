import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1C1917',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
        },
        success: {
          iconTheme: {
            primary: '#059669',
            secondary: '#fff',
          },
          style: {
            background: '#059669',
          },
        },
        error: {
          iconTheme: {
            primary: '#DC2626',
            secondary: '#fff',
          },
          style: {
            background: '#DC2626',
          },
        },
      }}
    />
  );
}
