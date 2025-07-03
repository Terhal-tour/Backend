import { getEarlyEvents,getEvent } from "../services/eventService.js";
export const getAllEvents = async (req, res) => {
    try {
        // if the user is logedin
        const userId = req.user.id;
        const events = userId ? await getEarlyEvents() : { "message": "You need to login first" };
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}

export const getEventById = async (req, res) => {
    try {
        const userId = req.user.id;

        const eventId = req.params.id;
        const  event= userId ? await getEvent(eventId) : { "message": "You need to login first" };
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ "message": error.message });

    }

}