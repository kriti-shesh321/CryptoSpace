import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Sidebar from './components/layout/Sidebar';
import Cryptocurrencies from './pages/Cryptocurrencies';
import Exchanges from './pages/Exchanges';
import News from './pages/News';
import CryptoDetails from './pages/CryptoDetails';
import ServerErrorPage from './components/ServerError';
import NotFoundPage from './components/NotFoundPage';
import Footer from './components/layout/Footer';
import Topbar from './components/layout/Topbar';
import CryptoGlossary from "./pages/CryptoGlossary";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRoute from "./components/routes/PublicRoute";

import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from './services/socket';
import { useAuthStore } from './store/authStore';


const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const socket = connectSocket(token);

    socket.on('alert-triggered', (data) => {
      console.log('ALERT', data);
    });

    return () => {
      socket.off('alert-triggered');
      disconnectSocket();
    };

  }, [isAuthenticated, token]);

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
              <Route path="/exchanges" element={<Exchanges isHome={false} />} />
              {/* <Route path="/news" element={<News />} /> */}
              <Route path="/crypto-glossary" element={<CryptoGlossary />} />
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
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
