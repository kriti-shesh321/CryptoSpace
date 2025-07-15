import { NavLink } from 'react-router-dom';
import {
    FaWindowClose,
    FaBars,
    FaHome,
    FaChartLine,
    FaCoins,
    FaLightbulb,
    FaQuestionCircle
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {

    const linkClass = ({ isActive }) =>
        isActive
            ? 'bg-gray-700 text-white flex items-center hover:bg-blue-500 hover:text-gray-200 rounded-md p-2'
            : 'flex items-center text-gray-300 hover:bg-blue-500 hover:text-gray-200 rounded-md p-2';

    return (
        <>
            <div className='mr-12 md:m-0 bg-[#09121f]'>

                <button
                    className={`block lg:hidden bg-[#04080e] text-gray-300 rounded-md p-2 m-2 md:m-1 z-50 absolute transition-all duration-300`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaWindowClose className="text-md" /> : <FaBars className="text-md" />}
                </button>

                <div
                    className={
                        `bg-[#09121f] text-white absolute top-0 lg:static inset-y-0 left-0 mt-20 lg:mt-0 
                        ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 transition-transform duration-300 ease-in-out z-40 lg:translate-x-0`}
                >
                    <div className="mt-10 py-4 text-md font-bold">
                        <nav className="flex flex-col space-y-4 px-2">
                            <NavLink to="/" className={linkClass}>
                                <FaHome className="mr-3" />
                                Home
                            </NavLink>
                            <NavLink to="/cryptocurrencies" className={linkClass}>
                                <FaCoins className="mr-3" />
                                Cryptocurrencies
                            </NavLink>
                            <NavLink to="/exchanges" className={linkClass}>
                                <FaChartLine className="mr-3" />
                                Exchanges
                            </NavLink>
                            <NavLink to="/news" className={linkClass}>
                                <FaLightbulb className="mr-3" />
                                News
                            </NavLink>
                            <NavLink to="/crypto-glossary" className={linkClass}>
                                <FaQuestionCircle className="mr-3" />
                                Crypto Glossary ✨
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Sidebar;