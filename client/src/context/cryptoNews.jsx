import { createContext} from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const NewsContext = createContext();

const NewsProvider = ({ children }) => {

    const axiosInstance = axios.create({
        baseURL: "https://real-time-news-data.p.rapidapi.com",
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': "real-time-news-data.p.rapidapi.com"
        },
    });

    const getNewsData = async () => {
        try {
            const { data } = await axiosInstance.get('/search',
                {
                    params: {
                        query: 'cryptocurrency',
                        limit: '100',
                        lang: 'en'
                    },
                }
            );
            return data?.data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        < NewsContext.Provider value={{ getNewsData }}>
            {children}
        </NewsContext.Provider>
    );
};

export { NewsContext as default, NewsProvider };