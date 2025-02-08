import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://event-management-b6tv.onrender.com");

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [attendees, setAttendees] = useState(0);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`https://event-management-b6tv.onrender.com/api/events/${id}`);
                setEvent(res.data);
                setAttendees(res.data.attendees || 0);
                setLoading(false);
            } catch (err) {
                setError("Event not found!");
                setLoading(false);
            }
        };

        fetchEvent();
        socket.emit("joinEvent", id);

        socket.on("attendeesUpdated", (count) => {
            setAttendees(count);
        });

        return () => {
            socket.off("attendeesUpdated");
        };
    }, [id]);

    const updateAttendees = async () => {
        try {
            const res = await axios.post(
               ` https://event-management-b6tv.onrender.com/api/events/${id}/attendees`,
            { count: attendees + 1 }
        );
            socket.emit("updateAttendees", { eventId: id, count: res.data.attendees });
            window.location.reload();
        } catch (err) {
            console.error("Error updating attendees:", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading event...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => navigate("/dashboard")}
            >
                Back to Dashboard
            </button>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold">{event.name}</h2>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500">
                    Date: {new Date(event.date).toLocaleString()}
                </p>

                {/* ✅ Real-Time Attendees Section */}
                <div className="mt-4">
                    <p className="text-lg font-semibold">Attendees: {attendees}</p>
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                        onClick={updateAttendees}
                    >
                        Join Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;