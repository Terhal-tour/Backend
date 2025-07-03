
import Event from "../models/EventModel.js";

export const getEarlyEvents = async () => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const events = await Event.find()
            .sort({ createdAt: -1 }) // earliest events first
            .skip(skip)
            .limit(limit);

        const total = await Event.countDocuments();

        return ({
            page,
            totalPages: Math.ceil(total / limit),
            totalEvents: total,
            events
        });
    } catch (error) {
        return ({ "message": error.message });
    }
}

export const getEvent = async (id) => {
    try {
        const event = id ? await Event.findOne(id) : { "message": "not valid event id" };
        return event
    } catch (error) {
        return ({ "message": error.message });

    }
}