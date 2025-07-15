import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import { useState } from 'react';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import Cryptocurrencies from './components/Cryptocurrencies';
import Exchanges from './components/Exchanges';
import News from './components/News';
import CryptoDetails from './components/CryptoDetails';
import ServerErrorPage from './components/ServerError';
import NotFoundPage from './components/NotFoundPage';
import Footer from './components/Footer';
import Topbar from './components/Topbar';
import CryptoGlossary from "./components/CryptoGlossary";


const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col bg-[#f5f6f9]">

        <Topbar />

        <div className="flex flex-1">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div
            className={`flex-1 overflow-auto transition-all duration-300 min-h-screen my-5 md:pl-5 md:pr-20 pr-5 mb-20 md:ml-4`}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/cryptocurrencies/:coinId" element={<CryptoDetails />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/news" element={<News />} />
              <Route path="/crypto-glossary" element={<CryptoGlossary />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/server-error" element={<ServerErrorPage />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>

  );
};

export default App;
