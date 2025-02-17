import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-indigo-600 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="text-lg font-bold">
          Event Management
        </Link>
      </div>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/create-event" className="hover:underline">
              Create Event
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="ml-4 bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 hover:cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
