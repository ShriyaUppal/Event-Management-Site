import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Events from Backend
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before making a request
      const { data } = await axios.get(
        "https://event-management-backend-mf6a.onrender.com/api/events",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: { search: searchQuery, sort: sortOption },
        }
      );

      setTimeout(() => {
        const formattedEvents = data.map((event) => ({
          ...event,
          category: event.category
            ? event.category.charAt(0).toUpperCase() + event.category.slice(1)
            : "Uncategorized",
          tags: Array.isArray(event.tags) ? event.tags : [],
          dateObj: event.date ? new Date(event.date) : null,
        }));

        if (sortOption === "newest") {
          formattedEvents.sort((a, b) => (b.dateObj || 0) - (a.dateObj || 0));
        } else if (sortOption === "oldest") {
          formattedEvents.sort((a, b) => (a.dateObj || 0) - (b.dateObj || 0));
        } else if (sortOption === "attendees") {
          formattedEvents.sort(
            (a, b) =>
              (Array.isArray(b.attendees) ? b.attendees.length : 0) -
              (Array.isArray(a.attendees) ? a.attendees.length : 0)
          );
        }

        setEvents(
          formattedEvents.map((event) => ({
            ...event,
            date: event.dateObj
              ? event.dateObj.toLocaleDateString()
              : "No Date",
          }))
        );
        setLoading(false);
      }, 500); // 500ms buffer time for smooth loading effect
    } catch (error) {
      setError("Failed to load events. Please try again.");
      setLoading(false);
    }
  }, [token, searchQuery, sortOption]);

  useEffect(() => {
    fetchEvents();
  }, [token]);

  // Handle Delete Event
  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(
        `https://event-management-backend-mf6a.onrender.com/api/events/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(events.filter((event) => event._id !== eventId));
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event", error);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center p-6">
      {user?.role === "guest" && (
        <div className="bg-yellow-100 text-yellow-800 p-3 text-center w-full">
          ⚡ You are browsing as a guest. <h2>Welcome, {user.name}!</h2>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 underline"
          >
            Sign up
          </button>{" "}
          to create and manage events!
        </div>
      )}

      <h2 className="text-3xl font-extrabold text-indigo-800 mb-6">
        🎉 Upcoming Events 🎉
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded ml-8"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="attendees">Most Attendees</option>
        </select>

        <button
          onClick={() => {
            setSearchQuery("");
            setSortOption("newest");
            fetchEvents();
          }}
          className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition ml-8 cursor-pointer"
        >
          🔄 Reset Filters
        </button>
      </div>

      {/* ✅ Fixed Loading State */}
      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-blue-700 font-semibold">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <p className="text-lg text-gray-700 font-medium">
          No events available at the moment.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow border-l-8 border-indigo-600"
            >
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                {event.name}
              </h3>
              <p className="text-gray-800">
                <span className="font-bold text-gray-900">📌 Description:</span>{" "}
                {event.description}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-bold text-gray-900">📅 Date:</span>{" "}
                {event.date}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-bold text-gray-900">🏷️ Category:</span>{" "}
                {event.category}
              </p>

              {user?.role !== "guest" && token && (
                <div className="mt-4 flex gap-3">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                    onClick={() =>
                      navigate(`/edit-event/${event._id}`, { state: { event } })
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleDelete(event._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
