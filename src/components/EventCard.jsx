import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EventCard({ event, onDelete }) {
  const [rsvpName, setRsvpName] = useState('');

  if (!event) return null;

  const handleRSVP = async () => {
    if (!rsvpName.trim()) {
      return toast.warning('Please enter your name to RSVP.');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://event-frontend-irtg.onrender.com/api/events/${event._id}/rsvp`, {
        attendee: rsvpName,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(' RSVP successful!');
      setRsvpName('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'RSVP failed');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://event-frontend-irtg.onrender.com/api/events/${event._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(" Event deleted!");
      if (onDelete) onDelete(event._id); // 🔥 Notify parent to remove this card from UI
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="bg-white rounded  shadow-xl max-w-md mx-auto p-6  space-y-2 border">
      <h3 className="text-xl font-bold text-blue-700">{event.title}</h3> 
      <p className="text-gray-600">{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>

      <div className="mt-4 space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={rsvpName}
          onChange={(e) => setRsvpName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleRSVP}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          RSVP
        </button>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
