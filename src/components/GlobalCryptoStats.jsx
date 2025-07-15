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

    if (loading) return (
        <div className="mb-8">
            <h1 className="heading">Global Crypto Stats</h1>
            <div className="pl-[20%] py-20">
                <Spinner />
            </div>
        </div>
    );

    return (
        <div className="md:mt-3 mt-10 mb-8">

            <h1 className="heading">Global Crypto Stats</h1>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                <div className="stat-box p-4 bg-gradient-to-br from-white to-blue-100 hover:shadow-blue-300 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                        📊 Total Cryptocurrencies
                    </p>
                    <span className="md:text-2xl text-lg font-medium text-gray-700 mt-5">{millify(stats.totalCoins)}</span>
                </div>

                <div className="stat-box p-4 bg-gradient-to-br from-white to-blue-100 hover:shadow-blue-300 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <p className="text-gray-600 text-sm">🔄 Total Exchanges</p>
                    <span className="md:text-2xl text-lg font-medium text-gray-700">{stats.totalExchanges}</span>
                </div>
                <div className="stat-box p-4 bg-gradient-to-br from-white to-blue-100 hover:shadow-blue-300 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <p className="text-gray-600 text-sm">💰 Total Market Cap</p>
                    <span className="md:text-2xl text-lg font-medium text-gray-700">{millify(stats.totalMarketCap)}</span>
                </div>
                <div className="stat-box p-4 bg-gradient-to-br from-white to-blue-100 hover:shadow-blue-300 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <p className="text-gray-600 text-sm">📈 Total 24th Volume</p>
                    <span className="md:text-2xl text-lg font-medium text-gray-700">{millify(stats.total24hVolume)}</span>
                </div>
                <div className="stat-box p-4 bg-gradient-to-br from-white to-blue-100 hover:shadow-blue-300 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <p className="text-gray-600 text-sm">💸 Total Markets</p>
                    <span className="md:text-2xl text-lg font-medium text-gray-700">{millify(stats.totalMarkets)}</span>
                </div>
            </div>
        </div>
    );
};
export default GlobalCryptoStats;