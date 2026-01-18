import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaDollarSign,
  FaHashtag,
  FaStrikethrough,
  FaTrophy,
  FaChartLine,
  FaExchangeAlt,
  FaExclamationCircle,
} from 'react-icons/fa';
import millify from "millify";
import CoinContext from "../context/cryptoCoinContext";
import Spinner from "./Spinner";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { getCoinDetails } = useContext(CoinContext);
  const [loading, setLoading] = useState(null);
  const [coin, setCoin] = useState(null);
  const [timePeriod, setTimePeriod] = useState('7d');

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        const data = await getCoinDetails(coinId, timePeriod);
        setCoin(data?.coin && data.coin);
      } catch (error) {
        navigate('/server-error');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetails();

  }, [coinId, timePeriod]);

  if (loading) return (
    <div className="mb-8">
      <div className="pl-[20%] py-32">
        <Spinner />
      </div>
    </div>
  );

  return (
    coin &&
    <section>

      <div className="flex-col text-center mt-10 pb-5 border-b border-gray-300">
        <h1 className="text-3xl md:font-extrabold font-bold mb-5 text-green-700">
          {coin?.name && coin?.symbol
            ? `${coin.name} (${coin.name}-${coin.symbol}) Price`
            : "Loading.."}
        </h1>
        <p className="text-gray-400 mb-5">{coin.name} live price in US dollars. View value statistics, market cap and supply.</p>
      </div>

      {/* chart */}
      <div>

        <div className="mt-5 text-gray-500">
          <select
            id="timePeriod"
            name="timePeriod"
            className="border rounded py-1 px-10"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {time.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <span className="md:heading md:font-bold font-medium text-sm text-blue-500 md:p-5 py-5">{coin.name} Price Chart</span>
          <span className="md:p-5 py-5 md:font-bold md:text-lg text-sm font-medium">Current {coin.name} Price: $ {millify(coin.price)}</span>
        </div>

        <LineChart coinId={coinId} timePeriod={timePeriod} />

      </div>

      {/* statistics */}
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-24 gap-10 mt-10">

        <div className="stat-box md:py-10 md:px-20">
          <h1 className="text-md md:text-xl font-medium">{coin && coin.name} Value Statistics</h1>
          <p className="text-gray-500 text-xs md:text-sm my-3">An overview of {coin.name} statistics.</p>
          <div className="flex-col text-gray-400 md:mt-10 mt-5 md:space-y-5 space-y-2">

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaDollarSign className="inline mr-3" />
                <span>Price</span>
              </div>
              <span>{millify(coin.price)}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaHashtag className="inline mr-3" />
                <span>Rank</span>
              </div>
              <span>{millify(coin.rank)}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaStrikethrough className="inline mr-3" />
                <span>24h Volume</span>
              </div>
              <span>{millify(coin["24hVolume"])}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaDollarSign className="inline mr-3" />
                <span>Market Cap</span>
              </div>
              <span>{millify(coin.marketCap)}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaTrophy className="inline mr-3" />
                <span>All time High</span>
              </div>
              <span>{millify(coin?.allTimeHigh?.price)}</span>
            </div>

          </div>
        </div>

        <div className="stat-box md:py-10 md:px-20">
          <h1 className="text-md md:text-xl font-medium">Other Coin's Value Statistics</h1>
          <p className="text-gray-500 text-xs md:text-sm my-3">An overview of all cryptocurrency stats.</p>
          <div className="flex-col text-gray-400 mt-10 md:space-y-5 space-y-2">

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaChartLine className="inline mr-3" />
                <span>Number Of Markets</span>
              </div>
              <span>{millify(coin.numberOfMarkets)}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaExchangeAlt className="inline mr-3" />
                <span>Number of Exchanges</span>
              </div>
              <span>{millify(coin.numberOfExchanges)}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaExclamationCircle className="inline mr-3" />
                <span>Approved Supply</span>
              </div>
              <span>{coin?.supply?.confirmed ? (coin.supply.confirmed ? '✔️' : '❌') : "Loading..."}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaExclamationCircle className="inline mr-3" />
                <span>Total Supply</span>
              </div>
              <span>{coin?.supply?.total ? millify(coin.supply.total) : "Loading..."}</span>
            </div>

            <div className="flex justify-between border-b text-sm">
              <div>
                <FaExclamationCircle className="inline mr-3" />
                <span>Circulating Supply</span>
              </div>
              <span>{coin?.supply?.circulating ? millify(coin.supply.circulating) : "Loading..."}</span>
            </div>

          </div>
        </div>

      </div>

      {/* links section */}
      <div className="grid md:grid-cols-2 gap-5 font-semibold text-lg mt-10">
        <div className="md:px-20 pr-14">
          <h2
            className="heading md:font-extrabold font-bold md:mt-20 pt-5 mt-10 border-t md:mb-10"
          >
            What is <span className="text-green-500">{coin.name}?</span>
          </h2>
          <p
            className="font-medium text-blue-500"
          >
            {coin.description}
          </p>
        </div>
        <div>
          <h2 className="heading md:font-extrabold font-bold md:mt-20 mt-5 md:mb-10 md:mx-20">{coin.name} Links</h2>
          {coin.links.map((link, index) => (
            <div
              className="flex gap-5 justify-between md:mx-20 mr-10 md:py-5 py-1 border-b"
              key={index}
            >
              <p
                className="text-gray-500"
              >
                {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
              </p>
              <a
                className="text-blue-500"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            </div>
          )
          )}
        </div>
      </div>

    </section>

  );
};
export default CryptoDetails;