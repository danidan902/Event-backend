import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post("https://event-frontend-irtg.onrender.com/api/auth/register", form);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
    setLoading(false)
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
