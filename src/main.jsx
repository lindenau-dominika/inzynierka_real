import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './components/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider>
    </AuthProvider> */}
    <App />
  </React.StrictMode>
)
