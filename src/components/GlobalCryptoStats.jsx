import millify from "millify";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../context/cryptoCoinContext";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const GlobalCryptoStats = () => {
    const { getGlobalStats } = useContext(CryptoContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const getStats = async () => {
            try {
              const data = await getGlobalStats();
              data && setStats(data);
            } catch (err) {
              console.log(err.message);
              navigate('/server-error');
            } finally {
              setLoading(false);
            }
          };
          getStats();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="md:mt-3 mt-10 mb-8">

            <h1 className="heading">Global Crypto Stats</h1>

            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-1">
                <div className="stat-box">
                    <p className="text-gray-500 text-sm">Total Cryptocurrencies</p>
                    <span className="md:text-xl text-lg">{millify(stats.totalCoins)}</span>
                </div>
                <div className="stat-box">
                    <p className="text-gray-500 text-sm">Total Exchanges</p>
                    <span className="md:text-xl text-lg">{stats.totalExchanges}</span>
                </div>
                <div className="stat-box">
                    <p className="text-gray-500 text-sm">Total Market Cap</p>
                    <span className="md:text-xl text-lg">{millify(stats.totalMarketCap)}</span>
                </div>
                <div className="stat-box">
                    <p className="text-gray-500 text-sm">Total 24th Volume</p>
                    <span className="md:text-xl text-lg">{millify(stats.total24hVolume)}</span>
                </div>
                <div className="stat-box">
                    <p className="text-gray-500 text-sm">Total Markets</p>
                    <span className="md:text-xl text-lg">{millify(stats.totalMarkets)}</span>
                </div>
            </div>
        </div>
    )
}
export default GlobalCryptoStats;