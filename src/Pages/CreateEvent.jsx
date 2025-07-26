import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CreateEvent() {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/events", event, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Event created!");

      // ✅ Clear the form
      setEvent({
        title: "",
        description: "",
        location: "",
        date: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create event");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={event.title}
          onChange={handleChange}
          type="text"
          placeholder="Event Title"
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="location"
          value={event.location}
          onChange={handleChange}
          type="text"
          placeholder="Location"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="date"
          value={event.date}
          onChange={handleChange}
          type="datetime-local"
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
