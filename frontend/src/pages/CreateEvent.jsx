import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

export default function CreateEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "https://event-management-b6tv.onrender.com/api/events",
                { name, description, date, category },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Event creation failed!");
        }
    };

    return (
        <div>
        <Navbar Islogged={true} />

        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Create Event</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleCreateEvent}>
                    <input
                        type="text"
                        placeholder="Event Name"
                        className="w-full p-2 mb-3 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 mb-3 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        className="w-full p-2 mb-3 border rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    {/* Category dropdown added */}
                    <select
                        className="w-full p-2 mb-3 border rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Meetup</option>
                        <option value="webinar">Webinar</option>
                    </select>

                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create Event
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};
