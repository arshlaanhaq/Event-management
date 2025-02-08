import Event from "../models/Event.js";
import mongoose from "mongoose";

//  Create an event

export const createEvent = async (req, res) => {
    const { name, description, date ,category} = req.body;

    try {
        const event = await Event.create({
            name,
            description,
            date,
            category,
            user: req.user.id, // Logged-in user ka ID
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//  Get all events
export const getEvents = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category && category !== "all") {
            filter.category = category;
        }

        const events = await Event.find(filter).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//  Get single event by ID

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//  Update event (only owner can update)


export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id.toString() });

        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        // ✅ Update fields including category
        event.name = req.body.name || event.name;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.category = req.body.category || event.category;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

//  Delete event (only owner can delete)

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        await event.deleteOne();
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//  Update attendees count in real-time

export const updateAttendees = async (req, res) => {
    try {
        const { count } = req.body;
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found" });

        event.attendees = count;
        await event.save();

        res.json({ message: "Attendees updated", attendees: count });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
