import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CreateEvent = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get event ID from URL

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(""); // ✅ Category state
  const [tags, setTags] = useState(""); // ✅ Tags as comma-separated values
  const [loading, setLoading] = useState(true);

  const categories = ["Conference", "Workshop", "Webinar", "Meetup"]; // ✅ Example categories

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://event-management-backend-mf6a.onrender.com/api/events/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setEventName(res.data.name || "");
          setDescription(res.data.description || "");
          setDate(res.data.date ? res.data.date.split("T")[0] : ""); // ✅ Fix date format
          setCategory(res.data.category || "");
          setTags(res.data.tags ? res.data.tags.join(", ") : ""); // Convert tags array to string
        })
        .catch((error) => console.error("Error fetching event details", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!eventName.trim() || !description.trim() || !date || !category) {
        alert("⚠️ Please fill in all required fields!");
        return;
      }

      const eventData = {
        name: eventName,
        description,
        date,
        category,
        tags: tags.split(",").map((tag) => tag.trim()), // ✅ Convert comma-separated tags to array
      };

      if (id) {
        await axios.put(
          `https://event-management-backend-mf6a.onrender.com/api/events/${id}`,
          eventData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("✅ Event Updated Successfully!");
      } else {
        await axios.post(
          "https://event-management-backend-mf6a.onrender.com/api/events/create",
          eventData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("✅ Event Created Successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving event", error);
      alert(
        `❌ Failed to save event: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  if (loading) {
    return <div className="text-center">⏳ Loading event...</div>;
  }

  if (user.role === "guest") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          {id ? "✏️ Edit Event" : "📅 Create a New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Event details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ✅ Category Dropdown */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Category
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Tags Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              placeholder="E.g. React, JavaScript, Meetup"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 hover:cursor-pointer transition duration-300"
          >
            {id ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
