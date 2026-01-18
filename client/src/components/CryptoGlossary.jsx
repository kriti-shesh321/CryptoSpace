import { useState } from "react";
import { FaBookOpen, FaBrain, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

const glossary = [
  {
    question: "What is Blockchain?",
    answer: "Blockchain is a decentralized and distributed ledger technology that records transactions across a network of computers. It ensures transparency, immutability, and security — making it foundational to all cryptocurrencies. Think of it as a digital ledger where everyone can see and verify what's written, but no one can secretly change it.",
    icon: <FaInfoCircle className="text-indigo-500 text-lg" />
  },
  {
    question: "What is a Token vs Coin?",
    answer: "A coin (like Bitcoin or Ether) is native to its own blockchain. A token, on the other hand, is built on top of an existing blockchain (like USDT on Ethereum). Coins usually serve as currency, while tokens often represent assets, utilities, or governance rights in a project.",
    icon: <FaBookOpen className="text-blue-500 text-lg" />
  },
  {
    question: "What is Market Cap?",
    answer: "Market capitalization measures the total value of a cryptocurrency. It's calculated by multiplying the price of the coin by its circulating supply. A higher market cap often indicates a more established or widely held crypto asset.",
    icon: <FaBrain className="text-emerald-500 text-lg" />
  },
  {
    question: "What is DeFi?",
    answer: "DeFi (Decentralized Finance) refers to a set of blockchain-based financial services that operate without central banks or institutions. It enables users to lend, borrow, trade, and earn interest using crypto — all governed by smart contracts.",
    icon: <FaQuestionCircle className="text-yellow-500 text-lg" />
  },
  {
    question: "What is a Crypto Exchange?",
    answer: "A crypto exchange is a digital platform where users can buy, sell, or trade cryptocurrencies. Centralized exchanges (like Binance) act as intermediaries, while decentralized exchanges (like Uniswap) let users trade peer-to-peer via smart contracts.",
    icon: <FaBookOpen className="text-pink-500 text-lg" />
  }
];

const CryptoGlossary = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mt-10 px-2 md:px-0">
      <div className="flex items-center gap-2 mb-4">
        <FaBookOpen className="text-xl text-purple-600" />
        <h1 className="heading text-xl md:text-2xl font-semibold">
          Crypto Glossary: Learn the Basics
        </h1>
      </div>

      <p className="text-gray-600 mb-6 text-sm md:text-base">
        Confused by crypto jargon? Here's a beginner-friendly glossary to help you understand key concepts and terms used in the crypto space.
      </p>

      <div className="space-y-4">
        {glossary.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow hover:shadow-md transition-all cursor-pointer"
            onClick={() => toggleIndex(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-md md:text-lg flex items-center gap-2">
                {item.icon}
                {item.question}
              </h3>
              <span className="text-sm text-gray-400">{activeIndex === index ? "▲" : "▼"}</span>
            </div>
            {activeIndex === index && (
              <p className="text-gray-700 mt-3 text-sm md:text-base leading-relaxed">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CryptoGlossary;