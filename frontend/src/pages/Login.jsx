import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminLogin } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      // login function
      await adminLogin(formData);
      toast.success("Login Successful!");
      navigate("/dashboard", { replace: true });
      // creates buffer entry in history and enables session
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password!"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-fuchsia-700/20 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Welcome Back
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors rounded-none"
            />
          </div>

          <div className="space-y-1">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors rounded-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
