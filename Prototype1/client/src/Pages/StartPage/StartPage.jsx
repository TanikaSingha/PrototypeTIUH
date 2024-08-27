import React from "react";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-bold mb-4 animate-bounce">AquaSavvy</h1>
        <p className="text-lg md:text-2xl mb-8">
          Conserve Groundwater, Save the Future!
        </p>

        <Link to="/tutorial">
          <button className="px-8 py-4 bg-green-500 text-white text-2xl font-semibold rounded shadow-lg hover:bg-green-600 transform transition duration-300 hover:scale-110">
            Tutorial
          </button>
        </Link>

        <p className="mt-6 text-gray-200 max-w-xl mx-auto">
          AquaSavvy is an educational game that teaches you about groundwater
          conservation. Complete challenges, collect coins, and save the
          environment!
        </p>
      </div>

      <div className="absolute top-4 right-4">
        <button className="text-white hover:text-green-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 1v2M4.22 4.22l1.42 1.42M1 12h2m0 0a9 9 0 0018 0m0 0h2M18.36 18.36l-1.42 1.42M12 21v2m5.66-5.66l1.42 1.42M12 9a3 3 0 100 6 3 3 0 000-6z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StartPage;
