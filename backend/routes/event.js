import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  updateAttendees,  
} from  '../controllers/eventController.js'
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router()

router.route("/").post( protect, createEvent).get(getEvents)
router
    .route("/:id")
    .get(getEventById)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);
router.put("/:id/attendees", updateAttendees);
router.post("/:id/attendees", updateAttendees);


export default  router
