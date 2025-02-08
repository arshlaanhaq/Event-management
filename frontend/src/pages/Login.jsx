import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed!");
        }
    };
    const handleGuestLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/guest-login");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data._id);
            localStorage.setItem("isGuest", "true");
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Guest login failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-3 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-3 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-fuchsia-500 text-white p-2 rounded hover:bg-fuchsia-600 cursor-pointer hover:rounded-2xl">
                        Login
                    </button>
                </form>
                <div className="mt-4 flex flex-col  justify-center items-center text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                        onClick={() => navigate("/register")}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Register
                    </button>
                    <button
                        className="bg-fuchsia-500 text-white px-4 py-2 w-50  rounded mt-4 cursor-pointer hover:rounded-2xl"
                        onClick={handleGuestLogin}
                    >
                        Guest Login
                    </button>
                </div>
            </div>
        </div>
    );
};

