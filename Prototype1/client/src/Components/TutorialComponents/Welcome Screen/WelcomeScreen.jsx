import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <div className="text-center p-8 ">
      <h1 className="font-extrabold text-6xl text-blue-900 mb-4">AquaSavvy</h1>
      <p className="font-medium text-2xl text-gray-700">
        Welcome to AquaSavvy! Learn how to conserve groundwater and make a
        difference.
      </p>
      <button
        onClick={() => {
          dispatch(nextStep());
        }}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300 shadow-lg"
      >
        Next
      </button>
    </div>
  );
};

export default WelcomeScreen;
