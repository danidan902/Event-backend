import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EventCard from "../components/EventCard.jsx";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/events");
        setEvents(res.data);
      } catch (err) {
        toast.error("Could not load events");
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = (deletedId) => {
    setEvents((prev) => prev.filter((event) => event._id !== deletedId));
  };

 return (
  <div className="max-w-4xl mx-auto mt-10">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Upcoming Event</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event._id} event={event} onDelete={handleDelete} />
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  </div>
);
}

export default Events;
