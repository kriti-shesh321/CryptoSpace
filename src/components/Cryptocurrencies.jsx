import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import millify from "millify";
import { FaArrowCircleRight } from 'react-icons/fa';
import Spinner from "./Spinner";
import CryptoContext from "../context/cryptoCoinContext";

const Cryptocurrencies = ({ isHome = false }) => {
  const { getCoinsData } = useContext(CryptoContext);
  const [loading, setLoading] = useState(true);
  const [coinList, setCoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        setLoading(true);
        const limit = isHome ? 10 : 100;
        const data = await getCoinsData(limit);
        data && setCoinList(data);
      } catch (error) {
        console.log(error);
        navigate('/server-error');
      } finally {
        setLoading(false);
      }
    };
    fetchCoinsData();
  }, [isHome]);

  useEffect(() => {
    try {

      if (!searchTerm) {
        setFilteredCoins(coinList);
      } else {
        const filtered = coinList.filter((coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCoins(filtered);
      }
    } catch (error) {
      console.log(error);
      navigate('/server-error');

    }

  }, [searchTerm, coinList]);

  if (loading) return (
    <div className="min-[30%] mb-8">
      <h1 className={`${!isHome && "hidden"} heading`}>Top 10 Cryptocurrencies Worldwide</h1>
      <div className="pl-[20%] py-20">
        <Spinner />
      </div>
    </div>
  );

  return (
    <section>
      <div className={`flex justify-start gap-3 heading mt-10 md:mt-0 ${!isHome && 'hidden'}`}>
        <h1>Top 10 Cryptocurrencies Worldwide</h1>
        <Link
          className="heading-link"
          to='/cryptocurrencies'
        >
          <FaArrowCircleRight className="inline" />
        </Link>
      </div>

      <div className={`my-5 shadow-md border md:p-3 p-1 ${isHome && 'hidden'}`}>
        <input
          className="py-1 px-3 w-full"
          type="text"
          placeholder="Search for a coin..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-2">
        {filteredCoins.map((coin) => {
          return (
            <div className="stat-box" key={coin.uuid}>
              <Link
                to={`/cryptocurrencies/${coin.uuid}`}
              >
                <div className="flex justify-between">
                  <h3 className="md:text-md text-sm font-medium mt-2">{coin.rank}. {coin.name}</h3>
                  <img
                    className="md:h-6 h-4 m-2"
                    src={coin.iconUrl}
                    alt={`Icon for ${coin.name}`}
                  >
                  </img>
                </div>
                <hr />
                <div className="md:text-sm text-xs md:mt-5 mt-2 text-gray-500">
                  <p>Price: {millify(coin.price)}</p>
                  <p>Market Cap: {millify(coin.marketCap)}</p>
                  <p>Daily Change: {millify(coin.change)}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

    </section >
  );
};

export default Cryptocurrencies;