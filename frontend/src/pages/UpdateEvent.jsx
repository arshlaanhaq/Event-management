import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEventData(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load event!");
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/events/${id}`,
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/dashboard");
        } catch (err) {
            console.error("Error updating event:", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading event...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div>
            <Navbar Islogged={true} />

        <div className="h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Update Event</h1>
            <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Event Name</label>
                    <input
                        type="text"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold">Date</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Event
                </button>
            </form>
        </div>
        </div>
    );
};

export default UpdateEvent;
