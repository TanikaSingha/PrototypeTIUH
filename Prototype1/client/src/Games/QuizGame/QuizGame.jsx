import React, { useEffect, useState } from "react";
import currentTask from "../../assets/GameData/TutorialTasks/cropLevel.json";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const QuizGame = () => {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [waterLevel, setWaterLevel] = useState(100);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(currentTask.taskDetails.timeLimit);
  const [startTimer, setStartTimer] = useState(false);
  const [result, setResult] = useState({
    option: "",
    outcome: "",
  });

  const getFormattedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleOption = (item, index) => {
    if (timer <= 0 || result.outcome) return;

    const isCorrect =
      currentTask.questions[currentQuestion].correctAnswer === item;

    if (isCorrect) {
      setResult({ option: index, outcome: "correct" });
      setScore(
        (prevScore) =>
          prevScore + Number(currentTask.taskDetails.pointsPerQuestion)
      );
      setCoins(
        (prevCoins) =>
          prevCoins + Number(currentTask.taskDetails.coinsPerQuestion)
      );
    } else {
      setResult({ option: index, outcome: "incorrect" });
    }

    if (currentQuestion === currentTask.questions.length - 1) {
      setStartTimer(false);
      handleGameCompletion();
    }
  };

  const handleGameCompletion = () => {
    if (timer <= 0) {
      setWaterLevel((prevWaterLevel) => prevWaterLevel - 20);
    } else if (
      score < Number(currentTask.taskDetails.scoreThreshold) &&
      waterLevel > 10
    ) {
      setWaterLevel((prevWaterLevel) => prevWaterLevel - 10);
    } else {
      const timeLeft = Math.floor(timer / 1000);
      setScore((prevScore) => prevScore + timeLeft * 5);
      if (waterLevel < 100) {
        setWaterLevel((prevWaterLevel) => prevWaterLevel + 10);
      }
    }
    setShowResults(true);
  };

  useEffect(() => {
    if (startTimer && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(interval);
            handleGameCompletion();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTimer, timer]);

  const percentage =
    ((currentTask.taskDetails.timeLimit - timer) /
      currentTask.taskDetails.timeLimit) *
    100;

  let pathColor;

  if (percentage > 60) {
    pathColor = "#ef4444";
  } else if (percentage > 30) {
    pathColor = "#f59e0b";
  } else {
    pathColor = "#10b981";
  }

  return (
    <section className="min-h-screen flex items-center justify-center w-full relative">
      <div className="bg-yellow-300 flex gap-2 items-center justify-center p-4 absolute top-2 right-2 rounded-md shadow-md">
        <p>Coins: {coins}</p>
        <p>Score: {score}/100</p>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={percentage}
            text={getFormattedTime(timer)}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: pathColor,
              trailColor: "#d6d6d6",
              strokeLinecap: "round",
              pathTransitionDuration: 0.5,
              textSize: "22px",
            })}
          />
        </div>
      </div>
      <div>
        <button
          disabled={
            startTimer || currentQuestion === currentTask.questions.length - 1
          }
          onClick={() => setStartTimer(true)}
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300"
        >
          Start Quiz
        </button>
      </div>
      <div className="bg-green-100 w-[800px] h-[400px] rounded-sm p-2 shadow-lg">
        <div>
          <h1 className="text-lg font-bold">Quiz Name: {currentTask.name}</h1>
          <h4 className="text-sm">Description: {currentTask.description}</h4>
          <p>Information for the player:</p>
          <ul className="list-disc ml-6">
            {currentTask.solutions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h1 className="text-lg">Questions</h1>
          <p>Q. {currentTask.questions[currentQuestion].question}</p>
          <div>
            <h2 className="font-medium">Choose from the given options:</h2>
            <ul className="grid grid-cols-2 gap-4 mt-5">
              {currentTask.questions[currentQuestion].options.map(
                (item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-2 rounded-md bg-gray-100 hover:bg-blue-200 transition-colors relative"
                    onClick={() => handleOption(item, index)}
                  >
                    <div
                      className={`absolute inset-0 w-full h-full rounded-md ${
                        result.option === index
                          ? result.outcome === "correct"
                            ? "bg-green-500/50"
                            : "bg-red-600/50"
                          : ""
                      }`}
                    ></div>
                    <span>Option {index + 1}:</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          {result.outcome &&
            currentQuestion < currentTask.questions.length - 1 && (
              <button
                onClick={() => {
                  setCurrentQuestion((prev) => prev + 1);
                  setResult({ option: "", outcome: "" });
                }}
                className="mt-4 bg-blue-500 text-white p-2 rounded-md"
              >
                Next Question
              </button>
            )}
        </div>
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

export default QuizGame;
