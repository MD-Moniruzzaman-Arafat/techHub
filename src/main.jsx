import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CartProvider from './provider/CartProvider.jsx';
import ProductsProvider from './provider/ProductsProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
);
