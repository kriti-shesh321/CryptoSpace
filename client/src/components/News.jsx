import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from 'react-icons/fa';
import Spinner from "./Spinner";
import NewsContext from "../context/cryptoNews";
import moment from "moment";
import CryptoContext from "../context/cryptoCoinContext";

const News = ({ isHome = false }) => {
  const { getNewsData } = useContext(NewsContext);
  const { getCoinsData } = useContext(CryptoContext);

  const [newsList, setNewsList] = useState([]);
  const [filteredNewsList, setFilteredNewsList] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [newsCategory, setNewsCategory] = useState('cryptocurrency');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchedNews = async () => {
      try {
        const data = await getNewsData(100);
        data && setNewsList(isHome ? data.slice(0, 6) : data);

      } catch (error) {
        console.log(error);
        navigate('/server-error');
      } finally {
        setLoading(false);
      }

    };
    fetchedNews();
  }, [getNewsData]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const coins = await getCoinsData(10);
        setCoinList(coins && coins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoins();

  }, [getCoinsData]);

  useEffect(() => {
    if (newsCategory === 'cryptocurrency') { setFilteredNewsList(newsList); }
    else {
      const filteredData = newsList.filter((element) =>
        element.title.toLowerCase().includes(newsCategory.toLowerCase()));
      setFilteredNewsList(filteredData);
    }
  }, [newsCategory, newsList, loading]);

  if (loading) return (
    <div className="mb-8">
      <div className={`flex justify-start gap-3 heading mt-10 ${!isHome && 'hidden'}`}>
        <h1>Latest News</h1>
      </div>
      <div className="pl-[20%] py-20">
        <Spinner />
      </div>
    </div>
  );

  return (
    <section>
      <div className={`flex justify-start gap-3 heading mt-10 ${!isHome && 'hidden'}`}>
        <h1>Latest News</h1>
        <Link
          className={`heading-link`}
          to='/news'
        >
          <FaArrowCircleRight className="inline mb-2" />
        </Link>
      </div>

      <div className={`my-5 shadow-md p-3 ${isHome && 'hidden'}`}>
        <select
          id="newsCategory"
          name="newsCategory"
          className="border rounded w-1/2 py-2 px-3"
          value={newsCategory}
          onChange={(e) => setNewsCategory(e.target.value)}
        >
          <option value='cryptocurrency'>Cryptocurrency</option>
          {coinList &&
            coinList.map((coin) => (
              <option key={coin.uuid} value={coin.name}>{coin.name}</option>
            ))
          }
        </select>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-2">
        {filteredNewsList.map((singleNews, index) => {
          return (
            <div
              className="stat-box border-none rounded-none mt-2"
              key={index}
            >
              <a
                href={singleNews.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex-col items-between">

                  <div className="flex mb-3 gap-2">

                    <p className="text-md md:text-lg">{singleNews.title}</p>

                    <img
                      className="md:h-36 h-24 md:w-36 w-24 rounded-sm"
                      src={singleNews.photo_url}
                    />

                  </div>

                  <p className="text-gray-500 text-xs md:text-md">{singleNews.snippet}</p>

                  <div className="flex justify-between text-sm mt-3">
                    {
                      singleNews.source_logo_url
                        ?
                        <div className="flex gap-2">
                          <img
                            className="h-4 w-4 rounded-full"
                            src={singleNews.source_logo_url}
                            alt="news source"
                          />
                          <p>{singleNews.source_name}</p>
                        </div>
                        :
                        <p>{singleNews.source_name}</p>
                    }
                    <p>{moment(singleNews.published_datetime_utc).startOf('ss').fromNow()}</p>
                  </div>

                </div>

              </a>

            </div>
          );
        })}

      </div>
    </section>
  );
};
export default News;