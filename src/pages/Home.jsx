import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import your context

const Home = () => {
  const { user } = useContext(AuthContext); // Check if user is logged in

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-100 px-6">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          Welcome to Event Manager
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-md">
          Plan, organize, and manage your events seamlessly with real-time
          updates.
        </p>
        <div className="flex space-x-4">
          <Link
            to={user ? "/dashboard" : "/login"}
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700 shadow-md"
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </Link>
          {!user && (
            <Link
              to="/register"
              className="px-6 py-3 bg-green-500 text-white text-lg rounded-md hover:bg-green-700 shadow-md"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
