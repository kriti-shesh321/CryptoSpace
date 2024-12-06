import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CryptoProvider } from './context/cryptoCoinContext';
import { NewsProvider } from './context/cryptoNews.jsx';
import { ExchangeProvider } from './context/exchangeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoProvider>
      <NewsProvider >
        <ExchangeProvider>
          <App />
        </ExchangeProvider>
      </NewsProvider>
    </CryptoProvider>
  </StrictMode>,
);
