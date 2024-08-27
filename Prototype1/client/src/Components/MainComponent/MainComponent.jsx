// src/components/Game.js
import React, { useState } from "react";
import Hud from "../HUD Component/HudComponenet";
import Player from "../PlayerComponent/PlayerComponent";
import Faucet from "../FaucetComponent/FaucetComponent";

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [tasks, setTasks] = useState(["Fix the leaky faucet"]);
  const [waterLevel, setWaterLevel] = useState(20);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleMove = (newPosition) => {
    setPlayerPosition(newPosition);
  };

  const handleInteract = () => {
    if (
      playerPosition.x < 120 &&
      playerPosition.x > 80 &&
      playerPosition.y < 120 &&
      playerPosition.y > 80
    ) {
      setTaskCompleted(true);
      setScore(score + 10);
      setCoins(coins + 5);
      setWaterLevel(Math.min(100, waterLevel + 20));
    }
  };

  return (
    <div className="relative h-screen w-screen bg-gray-100">
      <Hud score={score} coins={coins} tasks={tasks} waterLevel={waterLevel} />
      <Player position={playerPosition} onMove={handleMove} />
      <Faucet position={{ x: 200, y: 200 }} onInteract={handleInteract} />
      {taskCompleted && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg text-center">
          <p>Task Complete!</p>
          <button
            onClick={() => setTaskCompleted(false)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
