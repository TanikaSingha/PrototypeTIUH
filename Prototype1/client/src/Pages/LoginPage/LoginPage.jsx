import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearError, loginUser } from "../../lib/Slices/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const { error } = useSelector((state) => state.user);
  const location = useLocation();
  const path = location.state?.path || "/";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const resultAction = dispatch(loginUser(form));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate(path, { replace: true });
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login to AquaSavvy
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-400">New to AquaSavvy?</span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="ml-2 text-blue-400 hover:text-blue-500 font-medium"
          >
            Create Account
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-500 text-center">
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
