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
import Watchlist from "./pages/Watchlist";
import Alert from "./pages/Alert";
import PublicRoute from "./components/routes/PublicRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AlertToast from "./components/AlertToast";

import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from './services/socket';
import { useAuthStore } from './store/authStore';
import { useNotificationStore } from './store/notificationStore';
import { AlertTriggeredPayload } from './types/alert.types';


const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const socket = connectSocket(token);

    socket.on('alert-triggered', (data: AlertTriggeredPayload) => {
      addNotification(data);
    });

    return () => {
      socket.off('alert-triggered');
      disconnectSocket();
    };

  }, [isAuthenticated, token, addNotification]);

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
              <Route element={<ProtectedRoute />}>
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/alerts" element={<Alert />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/server-error" element={<ServerErrorPage />} />
            </Routes>
          </div>
        </div>

        <Footer />
        <AlertToast />
      </div>
    </Router>

  );
};

export default App;
