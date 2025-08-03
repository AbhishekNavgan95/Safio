import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false}>
      {({ toast }) => (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{toast.title}</p>
                <p className="text-sm text-gray-500">{toast.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss()}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </Toaster>
    <App />
  </StrictMode>
);
