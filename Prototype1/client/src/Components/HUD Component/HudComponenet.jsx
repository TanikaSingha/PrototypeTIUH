// src/components/Hud.js
import React from "react";

const Hud = ({ score, coins, tasks, waterLevel = 20 }) => {
  return (
    <div className="absolute top-0 left-0 p-4 bg-white shadow-lg rounded-md w-full flex justify-evenly items-center">
      <h2 className="text-xl font-bold">HUD</h2>
      <p>
        <strong>Score:</strong> {score}
      </p>
      <p>
        <strong>Coins:</strong> {coins}
      </p>
      <p>
        <strong>Tasks:</strong> {tasks.join(", ")}
      </p>
      <div className="mt-2">
        <strong>Water Level:</strong>
        <div className={`bg-gray-500 h-4 mt-1 w-[180px] relative`}>
          <div
            className={`absolute inset-0 h-full ${
              waterLevel >= 50
                ? `bg-blue-500`
                : waterLevel >= 25
                ? `bg-yellow-300`
                : `bg-red-500`
            }`}
            style={{ width: `${waterLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hud;
