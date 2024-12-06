import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <section className="w-full text-center mb-0 pt-5 pb-2 bg-[#09121f] text-gray-500">
            <p>Copyright © 2024 CryptoSpace</p>
            <div className="flex justify-center gap-3">
                <Link
                    className="hover:underline hover:text-gray-300"
                    to='/'
                >
                    Home
                </Link>
                <Link
                    to='/exchanges'
                    className="hover:underline hover:text-gray-300"
                >
                    Exchanges
                </Link>
                <Link
                    to='/news'
                    className="hover:underline hover:text-gray-300"
                >
                    News
                </Link>
            </div>
        </section>
    )
};
export default Footer;