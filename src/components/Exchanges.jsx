import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowCircleRight } from 'react-icons/fa';
import millify from "millify";
import Spinner from "./Spinner";
import ExchangeContext from "../context/exchangeContext";

const Exchanges = ({isHome}) => {
  const { getExchangeData } = useContext(ExchangeContext);
  const [exchanges, setExchanges] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  const navigate = useNavigate();

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  useEffect(() => {
    const fetchExchangeData = async () => {
      try {
        const data = await getExchangeData();
        setExchanges(data && data);

      } catch (error) {
        console.log(error);
        navigate('/server-error');
      } finally {
        setLoading(false);
      }
    }
    fetchExchangeData();
  }, [getExchangeData]);

  if (loading) return <Spinner />;

  return (
    <section>

      <div className={`flex justify-start gap-3 stat-box pl-0 heading mt-10 ${!isHome && 'hidden'}`}>
        <h1 >Checkout Exchanges...</h1>
        <Link
          className={`heading-link`}
          to='/exchanges'
        >
          <FaArrowCircleRight className="inline mb-2" />
        </Link>
      </div>


      <div className={`overflow-x-auto text-left mt-10 md:mt-0 ${isHome && 'hidden'}`}>
        <table className="min-w-full text-slate-500 text-sm">
          <thead className="bg-gray-200 font-medium">
            <tr>
              <td className="md:px-4 px-1 py-2">Exchange</td>
              <td className="md:px-4 px-1 py-2">24th Trade Volume</td>
              <td className="md:px-4 px-1 py-2">Country</td>
            </tr>
          </thead>
          <tbody>
            {exchanges?.map((exchange, index) => (
              <React.Fragment key={index}>

                <tr
                  className="cursor-pointer hover:bg-gray-100 text-xs"
                  onClick={() => toggleRow(index)}
                >
                  <td className="md:p-4 px-1 py-4 border-b text-black flex md:gap-5 gap-1">
                    <img className="md:h-8 h-6" src={exchange.image} alt="exchange icon" />
                    <span>{exchange.trust_score_rank}. {exchange.name}</span>
                  </td>
                  <td className="md:p-4 px-1 py-4 border-b">{millify(exchange.trade_volume_24h_btc_normalized)}</td>
                  <td className="md:p-4 px-1 py-4 border-b">{exchange.country || 'N/A'}</td>
                </tr>

                {expandedRow === index && (
                  <tr>
                    <td colSpan="4" className="p-4 border-b bg-gray-50">
                      <div className="overflow-hidden transition-all duration-300">
                        <a href={exchange.url} className="text-blue-500 font-semibold underline" target="_blank" rel="noopener noreferrer">{exchange.name}</a> 
                        <p className="py-2">{exchange.description || 'No details available.'}</p>
                        <p><strong>Trust Score:</strong> {exchange.trust_score || 'N/A'}</p>
                        <p><strong>Eastablished In Year:</strong> {exchange.year_established || 'N/A'}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  )
};
export default Exchanges;