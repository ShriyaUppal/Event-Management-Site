import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
const Login = () => {
  const { login, guestLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password);
      if (result === "success") {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition hover:cursor-pointer"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => {
            guestLogin(navigate);
          }}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition hover:cursor-pointer"
        >
          Continue as Guest
        </button>
        <div className="flex flex-row mt-3 text-center justify-center">
          <div className="font-semibold">Don't have an account? </div>
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:cursor-pointer hover:underline"
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
