import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully!");

      localStorage.setItem('userId', res.data.user._id);
    localStorage.setItem('token', res.data.token);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
    setLoading(false)
    setForm('')
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
