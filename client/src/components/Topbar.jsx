import { NavLink } from "react-router-dom";
import logo from '/logo.png';

const Topbar = () => {
    return (
        <div className="bg-blue-900 bg-[url('/bg2.png')] bg-center bg-cover bg-opacity-50 inset-0 p-5 w-full h-20 z-50"> 
            <NavLink
                className="flex flex-shrink-0 items-center"
                to="/"
            >
                <img
                    className="h-10 w-auto"
                    src={logo}
                    alt="Crypto Space"
                    loading="lazy"
                />
                <span className="md:block text-white text-2xl font-bold ml-3">
                    CryptoSpace
                </span>
            </NavLink>
        </div>
    );
};
export default Topbar;