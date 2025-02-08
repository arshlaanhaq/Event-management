import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            })
            localStorage.setItem("token", response.data.token)
            navigate("/")
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-grey-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl  font-bold mb-4 flex justify-center">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        className="w-full p-2 mb-3 border rounded"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="w-full p-2 mb-3 border rounded"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="w-full p-2 mb-3 border rounded"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="w-full bg-fuchsia-500 text-white p-2 rounded hover:bg-fuchsia-600 cursor-pointer hover:rounded-2xl">
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600 ">Already have an account?</p>
                    <button
                        onClick={() => navigate("/")}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>

    )
}