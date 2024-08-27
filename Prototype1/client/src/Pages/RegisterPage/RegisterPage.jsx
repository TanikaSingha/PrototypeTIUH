import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, registerUser } from "../../lib/Slices/userSlice.jsx";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { status, error, otpVerification } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (otpVerification === false) {
      navigate("/verify-otp", {
        state: { email: form.email, username: form.username },
      });
    }
  }, [otpVerification, navigate, form.email, form.username]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <section className="flex flex-col items-center p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Register
      </h1>
      <form
        className="flex flex-col w-full max-w-md bg-gray-800 p-6 shadow-lg rounded-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          {["username", "email", "password"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-300 capitalize"
              >
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "password"
                    ? "password"
                    : "text"
                }
                name={field}
                id={field}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
        >
          Register
        </button>
      </form>
      <div className="mt-6 flex flex-col items-center space-y-4 w-full max-w-md">
        <div className="flex justify-between w-full">
          <div>
            <h4 className="text-sm font-medium text-gray-400">Back to Login</h4>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-500 font-medium"
            >
              Go back
            </button>
          </div>
        </div>
        {status === "loading" && (
          <span className="text-blue-400">Loading...</span>
        )}
        {error && <span className="text-red-500">{error.message}</span>}
      </div>
    </section>
  );
};

export default RegisterPage;
