import { createContext } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const ExchangeContext = createContext();

const ExchangeProvider = ({ children }) => {

    const axiosInstance = axios.create({
        baseURL: "https://coingecko.p.rapidapi.com",
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': "coingecko.p.rapidapi.com"
        },
    });

    const getExchangeData = async () => {
        try {
            const { data } = await axiosInstance.get('/exchanges');
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        < ExchangeContext.Provider
            value={{
                getExchangeData,
            }}
        >
            {children}
        </ExchangeContext.Provider>
    );
};

export { ExchangeContext as default, ExchangeProvider };