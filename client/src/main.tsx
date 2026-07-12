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

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CryptoProvider>
          <NewsProvider >
            <ExchangeProvider>
              <App />
            </ExchangeProvider>
          </NewsProvider>
        </CryptoProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
