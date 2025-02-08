import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://event-management-b6tv.onrender.com");

const AttendeeCounter = ({ eventId }) => {
    const [attendees, setAttendees] = useState(0);

    useEffect(() => {
        socket.emit("joinEvent", eventId);

        socket.on("attendeesUpdated", (count) => {
            setAttendees(count);
        });

        return () => {
            socket.off("attendeesUpdated");
        };
    }, [eventId]);

    const updateAttendees = async () => {
        try {
            const res = await axios.post(
                `https://event-management-b6tv.onrender.com/api/events/${eventId}/attendees`,
                { count: attendees + 1 }
            );
            socket.emit("updateAttendees", { eventId, count: res.data.attendees });
        } catch (err) {
            console.error("Error updating attendees:", err);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold">Attendees: {attendees}</p>
            <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={updateAttendees}
            >
                Join Event
            </button>
        </div>
    );
};

export default AttendeeCounter;
