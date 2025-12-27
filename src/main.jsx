import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import './index.css'
import App from './App.jsx'
import './api/interceptors.js'
import { AuthProvider } from './hooks/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)
