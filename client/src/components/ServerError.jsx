import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ServerErrorPage = () => {
    return (
        <>
            <section className="text-center flex flex-col justify-center items-center h-96">
                <FaExclamationTriangle className="text-red-400 text-6xl mb-4"></FaExclamationTriangle>
                <h1 className="text-6xl font-bold mb-4">500 Server Error.</h1>
                <p className="text-xl mb-5">Please try again.</p>
                <Link
                    to="/"
                    className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
                >
                    Go Back
                </Link>
            </section>
        </>
    )
}

export default ServerErrorPage;