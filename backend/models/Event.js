import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String, required: true},
        date: {type: Date, required: true},
        attendees: {type: Number, default: 0,},
        category: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    },
    {timestamps: true});

const Event = mongoose.model('Event', EventSchema);
export default Event
