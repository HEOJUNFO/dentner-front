import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CookiesProvider } from 'react-cookie';

// import './index.css'
//import './common.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CookiesProvider>
    <App />
  </CookiesProvider>
  // </React.StrictMode>
);
