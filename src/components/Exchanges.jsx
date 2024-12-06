import React from "react";
import { useContext, useEffect, useState } from "react";
import millify from "millify";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import ExchangeContext from "../context/exchangeContext";

const Exchanges = () => {
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
      <div className="overflow-x-auto text-left">
        <table className="min-w-full text-slate-500 text-sm">
          <thead className="bg-gray-200 font-medium">
            <tr>
              <td className="px-4 py-2">Exchange</td>
              <td className="px-4 py-2">24th Trade Volume</td>
              <td className="px-4 py-2">Country</td>
            </tr>
          </thead>
          <tbody>
            {exchanges?.map((exchange, index) => (
              <React.Fragment key={index}>
               
                <tr
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleRow(index)}
                >
                  <td className="p-4 border-b text-black flex gap-5">
                    <img className="h-8" src={exchange.image} alt="exchange icon"/>
                    <span>{exchange.trust_score_rank}. {exchange.name}</span>
                    </td>
                  <td className="p-4 border-b">{millify(exchange.trade_volume_24h_btc_normalized)}</td>
                  <td className="p-4 border-b">{exchange.country || 'N/A'}</td>
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