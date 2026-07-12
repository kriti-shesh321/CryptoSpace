import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore: side-effect CSS import declaration missing
import './index.css';
// @ts-ignore: side-effect CSS import declaration missing
import './theme/tokens.css';
import App from './App.js';
import { CryptoProvider } from './context/cryptoCoinContext';
import { NewsProvider } from './context/cryptoNews.jsx';
import { ExchangeProvider } from './context/exchangeContext.jsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
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
}
