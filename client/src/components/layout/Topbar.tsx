import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Topbar = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    return (
        <div className="bg-blue-900 bg-[url('/bg2.png')] bg-center bg-cover bg-opacity-50 inset-0 p-5 w-full h-20 z-50 flex items-center justify-between">
            <NavLink
                className="flex flex-shrink-0 items-center"
                to="/"
            >
                <img
                    className="h-10 w-auto"
                    src="/logo.png"
                    alt="Crypto Space"
                    loading="lazy"
                />
                <span className="md:block text-white text-2xl font-bold ml-3">
                    CryptoSpace
                </span>
            </NavLink>

            {isAuthenticated ? (
                <button
                    className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2"
                    onClick={logout}
                >
                    Logout
                </button>
            ) : (
                <NavLink
                    className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2"
                    to="/login"
                >
                    Login
                </NavLink>
            )}
        </div>
    );
};
export default Topbar;