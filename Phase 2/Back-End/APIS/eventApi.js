//create router to handle user api reqs
const exp = require("express");
const eventApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
eventApp.use(exp.json());
eventApp.use(exp.urlencoded());
const { ObjectId } = require('mongodb');


eventApp.post(
    "/new-event",
    expressAsyncHandler(async (request, response) => {
        //get eventCollectionObject
        let eventCollectionObject = request.app.get("eventCollectionObject");
        
        //get newEventObj as string from client and convert into object
        let newEventObj;
        console.log("Received eventObj data:", request.body.eventObj);
        try {
            // Try to parse the JSON string
            newEventObj = JSON.parse(request.body.eventObj);
        } catch (error) {
            // If parsing fails, handle the error (e.g., log it)
            console.error("Error parsing JSON:", error);
            response.status(400).send({ message: "Invalid JSON data" });
            return;
        }

        // Insert the new event object into the database
        await eventCollectionObject.insertOne(newEventObj);
        response.send({ message: "New Event created" });
    })
);

const ITEMS_PER_PAGE = 10;

eventApp.get(
    "/events",
    expressAsyncHandler(async (request, response) => {
        let eventCollectionObject = request.app.get("eventCollectionObject");

        // Parse query parameters
        const page = parseInt(request.query.page) || 1; // Current page, default to 1

        // Calculate skip value for pagination
        const skip = (page - 1) * ITEMS_PER_PAGE;

        // Query to retrieve events based on visibility and pagination

        let totalevents = await eventCollectionObject.countDocuments();
        let totalPages = Math.ceil(totalevents / ITEMS_PER_PAGE);

        // Fetch events for the current page
        let events = await eventCollectionObject.find()
            .sort({ createdAt: -1 }) // Sort by creation date, latest first
            .skip(skip) // Skip events for pagination
            .limit(ITEMS_PER_PAGE) // Limit number of events per page
            .toArray();

        response.send({ message: "Events list", payload: { events, totalPages } });
    })
);

eventApp.delete(
    '/events/:eventId',
    expressAsyncHandler(async (request, response) => {
      // Extract the event ID from the request parameters
      const eventId = request.params.eventId;
  
      try {
        let eventCollectionObject = request.app.get("eventCollectionObject");
        // Delete the event from the database
        const result = await eventCollectionObject.deleteOne({ _id: new ObjectId(eventId) });
  
        if (result.deletedCount === 1) {
          // If event was deleted successfully
          response.status(200).send({ message: 'Event deleted successfully' });
        } else {
          // If event with the provided ID was not found
          response.status(404).send({ message: 'Event not found' });
        }
      } catch (error) {
        // If an error occurs during deletion
        console.error('Error deleting event:', error);
        response.status(500).send({ message: 'Internal Server Error' });
      }
    })
  );
module.exports = eventApp;