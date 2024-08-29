import React, { useEffect } from "react";
import currentTask from "../../assets/GameData/TutorialTasks/kitchenLevel.json";
import { useState } from "react";

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
  const [waterLevel, setWaterLevel] = useState(100);
  const [showResults, setShowResults] = useState(false);
  const [popup, setPopup] = useState("");
  const [choiceSelected, setChoiceSelected] = useState(null);
  const [result, setResult] = useState({
    option: "",
    outcome: "",
  });

  const handleOption = (index) => {
    if (choiceSelected === null) {
      const selectedChoice =
        currentTask.scenarios[currentQuestion].options[index];
      const { score: Score, coins: Coins, outcomeText } = selectedChoice;

      setChoiceSelected(index);
      setScore((prevScore) => prevScore + Score);
      setCoins((prevCoins) => prevCoins + Coins);

      setPopup(outcomeText);
      setResult({
        option: index,
        outcome: outcomeText.split("-")[0].split(" ")[0].trim().toLowerCase(),
      });
    } else if (choiceSelected !== null) {
      const selectedChoice =
        currentTask.scenarios[currentQuestion].options[index];
      const { outcomeText } = selectedChoice;

      setPopup(outcomeText);
      setResult({
        option: index,
        outcome: outcomeText.split("-")[0].split(" ")[0].trim().toLowerCase(),
      });
    }
  };

  useEffect(() => {
    if (
      currentQuestion === currentTask.scenarios.length - 1 &&
      result.outcome
    ) {
      if (score < currentTask.taskDetails.scoreThreshold) {
        setScore(
          (prevScore) => prevScore - currentTask.taskDetails.waterLevelDeduction
        );
      } else {
        const maxPoints = currentTask.taskDetails.maxPoints;
        const waterLevelIncrease = currentTask.taskDetails.waterLevelIncrease;

        let value;
        if (score === maxPoints) {
          value = Math.min(waterLevelIncrease, 100 - waterLevel);
        } else if (score >= Math.floor(maxPoints / 2)) {
          value = Math.min(waterLevelIncrease / 2, 100 - waterLevel);
        }

        setWaterLevel((prevWaterLevel) => prevWaterLevel + value);
      }
      setShowResults(true);
    }
  }, [result]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center relative">
      <div className="bg-yellow-300 flex gap-2 items-center justify-center p-4 absolute top-2 right-2 rounded-md shadow-md">
        <p>Coins: {coins}</p>
        <p>Score: {score}/100</p>
      </div>

      <div className="w-[800px] bg-yellow-500 p-4 rounded-sm relative">
        {popup && (
          <div className="absolute inset-0 bg-black/30 w-full h-full"></div>
        )}
        <div
          className={` absolute p-4 transition-all rounded-md shadow-lg left-1/2 -translate-x-1/2 ${
            colorMap[result.outcome]
          } ${popup ? `top-1/2 scale-100 -translate-y-1/2` : `-top-2 scale-0`}`}
        >
          <p>{popup}</p>
          <button
            onClick={() => setPopup("")}
            className="mt-2 bg-blue-500 text-white p-2 rounded-md"
          >
            OK
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Choice Name: {currentTask.name}
          </h1>
          <h4 className="text-xl">Description: {currentTask.description}</h4>
          <p className="mt-2 font-semibold">Information for the player:</p>
          <ul className="list-disc ml-6">
            {currentTask.solutions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Scenarios</h1>
          <p className="mt-2">
            Scenario: {currentTask.scenarios[currentQuestion].scenario}
          </p>
          <ul className="grid grid-cols-2 gap-4 mt-4">
            {currentTask.scenarios[currentQuestion].options.map(
              (item, index) => {
                const borderStyle =
                  choiceSelected === index ? "border-4 border-black" : "";
                const bgColor =
                  choiceSelected === index
                    ? `${colorMap[result.outcome]}`
                    : "bg-blue-500";
                return (
                  <li key={index} onClick={() => handleOption(index)}>
                    <div
                      className={`p-2 rounded-sm cursor-pointer ${
                        choiceSelected === index && `border-black border-4`
                      } ${
                        result.outcome && index === result.option
                          ? ` ${colorMap[result.outcome]}`
                          : `bg-blue-500`
                      }`}
                    >
                      <h4 className="font-semibold">Choice {index + 1}</h4>
                      <p>{item.choice}</p>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
        {currentQuestion < currentTask.scenarios.length - 1 &&
          result.outcome && (
            <button
              onClick={() => {
                if (!popup) {
                  setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                  setResult({ option: "", outcome: "" });
                  setChoiceSelected(null);
                }
              }}
              className="mt-4 bg-blue-500 text-white p-2 rounded-md"
            >
              Next Scenario
            </button>
          )}
      </div>
      {showResults && (
        <div className="bg-yellow-300 p-4 rounded-md shadow-md absolute bottom-2 right-2">
          <p>Final Score: {score}</p>
          <p>Coins Earned: {coins}</p>
          <p>Water Level: {waterLevel}</p>
        </div>
      )}
    </section>
  );
};

export default ChoiceGame;
