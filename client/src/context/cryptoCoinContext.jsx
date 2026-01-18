import { createContext } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_COIN_API_KEY;

const CryptoContext = createContext();

const CryptoProvider = ({ children }) => {

    const axiosInstance = axios.create({
        baseURL: "https://coinranking1.p.rapidapi.com",
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': "coinranking1.p.rapidapi.com"
        },
    });

    const getGlobalStats = async () => {
        try {
            const { data } = await axiosInstance.get('/stats');
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getCoinsData = async (limit) => {
        try {
            const { data } = await axiosInstance.get('/coins',
                {
                    params: {
                        timePeriod: '24h',
                        orderBy: 'marketCap',
                        orderDirection: 'desc',
                        offset: '0',
                        limit: limit,
                    },
                },
            );
            return data.data.coins;
        } catch (error) {
            console.log(error);
        }
    };

    const getCoinDetails = async (id, timePeriod) => {
        try {
            const { data } = await axiosInstance.get(`/coin/${id}`,
                {
                    params: { timePeriod: timePeriod },
                }
            );
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getPriceHistory = async (coinId, timePeriod) => {
        try {
            const { data } = await axiosInstance.get(`/coin/${coinId}/history`,
                {
                    params: { timePeriod: timePeriod },
                }
            );
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        < CryptoContext.Provider
            value={{
                getGlobalStats,
                getCoinsData,
                getCoinDetails,
                getPriceHistory,
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
};

export { CryptoContext as default, CryptoProvider };