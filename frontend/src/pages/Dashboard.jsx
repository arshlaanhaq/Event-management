import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("upcoming");
    const isGuest = localStorage.getItem("isGuest") === "true";

    const token = localStorage.getItem("token");
    let userId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.id;
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("https://event-management-b6tv.onrender.com/api/events");
                setEvents(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load events!");
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    //  **Delete Event**
    const deleteEvent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            if (!token) {
                alert("You need to log in first!");
                return;
            }

            await axios.delete(`https://event-management-b6tv.onrender.com/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    //  **Filter & Sort Events**
    const filteredEvents = events
        .filter((event) => {
            const eventDate = new Date(event.date);
            const today = new Date();
            return dateFilter === "upcoming" ? eventDate > today : eventDate < today;
        })
        .filter((event) => (filter === "all" ? true : event.category === filter))
        .sort((a, b) => new Date(a.date) - new Date(b.date));  // ✅ Events sorted by date

    if (loading) return <p className="text-center mt-10">Loading events...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div>
            <Navbar Islogged={true} />

            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-4">Event Dashboard</h1>

                {/*  Filter Options */}
                <div className="flex gap-4 mb-4">
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="px-3 py-2 border rounded"
                    >
                        <option value="upcoming">Upcoming Events</option>
                        <option value="past">Past Events</option>
                    </select>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border rounded"
                    >
                        <option value="all">All Categories</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Meetup</option>
                        <option value="webinar">Webinar</option>
                    </select>
                </div>

                {!isGuest && (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                        onClick={() => navigate("/create-event")}
                    >
                        ➕ Create New Event
                    </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredEvents.map((event) => (
                        <div key={event._id} className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold">{event.name}</h2>
                            <p className="text-gray-600">{event.description}</p>
                            <p className="text-sm text-gray-500">
                                Date: {new Date(event.date).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Category: {event.category || "General"}
                            </p>

                            <div className="mt-4 flex gap-2">
                                {!isGuest && (
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                        onClick={() => navigate(`/event/${event._id}`)}
                                    >
                                        View
                                    </button>
                                )}

                                {/* Show Edit & Delete ONLY if the user is the creator */}
                                {!isGuest && event.user === userId && (
                                    <>
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => navigate(`/update-event/${event._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => deleteEvent(event._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
