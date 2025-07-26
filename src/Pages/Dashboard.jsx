import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('User ID not found. Please login first.');
          return;
        }

        // Call backend with userId in query string (no token header)
        const res = await axios.get(`http://localhost:5001/api/events/profile?id=${userId}`);
        setUser(res.data.user);
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Welcome to your dashboard</h2>
      {user ? (
        <div>
          <p className="text-lg">👤 <strong>Username:</strong> {user.username}</p>
          <p className="text-lg">📧 <strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

