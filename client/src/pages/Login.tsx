import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const loginStore = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            const data = await login({ email, password });
            loginStore(data.token, data.user);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-sm mx-auto mt-20">
            <h1 className="heading text-center">Login</h1>

            <form className="stat-box mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                        className="border rounded w-full py-2 px-3"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Password</label>
                    <input
                        className="border rounded w-full py-2 px-3"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    className="w-full bg-indigo-700 hover:bg-indigo-900 text-white rounded-md py-2"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </section>
    );
};
export default Login;
