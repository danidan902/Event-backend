import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  CalendarPlus,
  CalendarCheck,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          <CalendarPlus className="w-6 h-6 text-blue-600" />
          Event Planner
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

       
        <nav
          className={`flex-col md:flex md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none transition-all duration-300 ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            <CalendarPlus size={18} />
            Create Event
          </Link>
          <Link
            to="/createEvent"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            <CalendarCheck size={18} />
            View Events
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex text-center gap-2 text-red-600 hover:text-red-800 font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <LogIn size={18} />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <UserPlus size={18} />
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
