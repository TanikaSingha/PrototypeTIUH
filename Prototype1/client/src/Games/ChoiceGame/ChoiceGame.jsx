import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoins,
  addScore,
  addWaterLevel,
  removeWaterLevel,
  updateScore,
} from "../../lib/Slices/userSlice";
import { setTaskComplete, setTaskRunning } from "../../lib/Slices/gameSlice";

const colorMap = {
  best: "bg-green-500",
  good: "bg-yellow-300",
  bad: "bg-orange-500",
  worst: "bg-red-500",
};

const ChoiceGame = () => {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [popup, setPopup] = useState("");
  const [choiceSelected, setChoiceSelected] = useState(null);
  const [result, setResult] = useState({
    option: "",
    outcome: "",
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { currentTask, isTaskRunning } = useSelector((state) => state.game);

  const handleOption = (index) => {
    if (!currentTask) return;

    if (choiceSelected === null) {
      const selectedChoice =
        currentTask?.scenarios?.[currentQuestion]?.options?.[index];
      const { score: Score, coins: Coins, outcomeText } = selectedChoice || {};

      setChoiceSelected(index);
      setScore((prevScore) => prevScore + (Score || 0));
      setCoins((prevCoins) => prevCoins + (Coins || 0));

      setPopup(outcomeText || "");
      setResult({
        option: index,
        outcome: outcomeText?.split("-")[0].split(" ")[0].trim().toLowerCase(),
      });
    } else if (choiceSelected !== null) {
      const selectedChoice =
        currentTask?.scenarios?.[currentQuestion]?.options?.[index];
      const { outcomeText } = selectedChoice || {};

      setPopup(outcomeText || "");
      setResult({
        option: index,
        outcome: outcomeText?.split("-")[0].split(" ")[0].trim().toLowerCase(),
      });
    }
  };

  useEffect(() => {
    if (
      currentQuestion === currentTask?.scenarios?.length - 1 &&
      result.outcome
    ) {
      dispatch(addScore(score));
      dispatch(addCoins(coins));
      if (score < currentTask?.taskDetails?.scoreThreshold) {
        dispatch(
          removeWaterLevel(currentTask?.taskDetails?.waterLevelDeduction)
        );
      } else {
        const maxPoints = currentTask?.taskDetails?.maxPoints;
        const waterLevelIncrease = currentTask?.taskDetails?.waterLevelIncrease;

        let value;
        if (score === maxPoints) {
          value = Math.min(waterLevelIncrease, 100 - user?.groundWaterLevel);
        } else if (score >= Math.floor(maxPoints / 2)) {
          value = Math.min(
            waterLevelIncrease / 2,
            100 - user?.groundWaterLevel
          );
        }
        dispatch(addWaterLevel(value));
      }
      dispatch(updateScore());
      dispatch(setTaskComplete());
    }
  }, [result]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <button
        className={`absolute bottom-4 left-4 bg-blue-200 cursor-pointer p-2 ${
          isTaskRunning ? `bg-green-500` : `bg-blue-500`
        }`}
        onClick={() => {
          dispatch(setTaskRunning());
        }}
        disabled={isTaskRunning}
      >
        {isTaskRunning ? `Playing...` : `Start Game`}
      </button>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md relative">
        {popup && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div
              className={`p-6 text-white rounded-lg shadow-lg transition-all ${
                colorMap[result.outcome]
              }`}
            >
              <p className="text-lg">{popup}</p>
              <button
                onClick={() => setPopup("")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentTask?.name}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {currentTask?.description}
          </p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-700">
              Information for the player:
            </h4>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {currentTask?.instructions?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Scenarios</h2>
          <p className="mt-4 text-gray-700">
            {currentTask?.scenarios?.[currentQuestion]?.scenario}
          </p>
          <ul className="grid grid-cols-2 gap-4 mt-6">
            {currentTask?.scenarios?.[currentQuestion]?.options?.map(
              (item, index) => (
                <li
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    isTaskRunning && handleOption(index);
                  }}
                >
                  <div
                    className={`p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                      choiceSelected === index
                        ? `border-black border-4 ${
                            result.outcome && index === result.option
                              ? `${colorMap[result.outcome]}`
                              : `bg-blue-500`
                          }`
                        : "bg-blue-500"
                    }`}
                  >
                    <h4 className="font-semibold text-white">
                      Choice {index + 1}
                    </h4>
                    <p className="text-white">{item?.choice}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
        {currentQuestion < currentTask?.scenarios?.length - 1 &&
          result.outcome && (
            <button
              onClick={() => {
                if (!popup) {
                  setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                  setResult({ option: "", outcome: "" });
                  setChoiceSelected(null);
                }
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
            >
              Next Scenario
            </button>
          )}
      </div>
    </section>
  );
};

export default ChoiceGame;
