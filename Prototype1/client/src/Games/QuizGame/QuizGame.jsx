import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoins,
  addScore,
  addWaterLevel,
  removeWaterLevel,
} from "../../lib/Slices/userSlice";
import "react-circular-progressbar/dist/styles.css"; 
import { setTaskComplete, setTaskRunning } from "../../lib/Slices/gameSlice";

const QuizGame = () => {
  const dispatch = useDispatch();
  const { currentTask, isTaskRunning } = useSelector((state) => state.game);

  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(currentTask.taskDetails?.timeLimit || 0);
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
      currentTask.questions[currentQuestion]?.correctAnswer === item;

    if (isCorrect) {
      setResult({ option: index, outcome: "correct" });
      setScore(
        (prevScore) =>
          prevScore + Number(currentTask.taskDetails?.pointsPerQuestion || 0)
      );
      setCoins(
        (prevCoins) =>
          prevCoins + Number(currentTask.taskDetails?.coinsPerQuestion || 0)
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
    dispatch(addCoins(coins));
    dispatch(addScore(score));
    if (timer <= 0) {
      dispatch(removeWaterLevel(20));
    } else if (score < Number(currentTask.taskDetails?.scoreThreshold || 0)) {
      dispatch(removeWaterLevel(10));
    } else {
      const timeLeft = Math.floor(timer / 1000);
      dispatch(addScore(timeLeft * 5));
      dispatch(addWaterLevel(10));
    }
    dispatch(setTaskComplete());
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
    ((currentTask.taskDetails?.timeLimit - timer) /
      (currentTask.taskDetails?.timeLimit || 1)) *
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
    <>
      <div className="w-32 h-32 absolute top-1/3 right-20">
        <CircularProgressbar
          value={percentage}
          text={getFormattedTime(timer)}
          styles={buildStyles({
            pathColor: pathColor,
            textColor: "#333",
            trailColor: "#d6d6d6",
            strokeWidth: 6,
          })}
        />
      </div>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-10">
        <div className="flex items-center justify-between mb-6">
          <button
            disabled={
              startTimer || currentQuestion === currentTask.questions.length - 1
            }
            onClick={() => {
              dispatch(setTaskRunning());
              setStartTimer(true);
            }}
            className="bg-blue-500 text-white p-3 rounded-md disabled:bg-gray-300"
          >
            Start Quiz
          </button>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Quiz Name: {currentTask.name}</h1>
          <h4 className="text-lg text-gray-600">
            Description: {currentTask.description}
          </h4>
          <p className="text-gray-700">Information for the player:</p>
          <ul className="list-disc ml-6 text-gray-700">
            {currentTask.instructions?.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-semibold">Questions</h1>
          <p className="text-lg font-medium">
            Q. {currentTask.questions[currentQuestion]?.question}
          </p>
          <div>
            <h2 className="font-medium text-gray-800">
              Choose from the given options:
            </h2>
            <ul className="grid grid-cols-2 gap-4 mt-4">
              {currentTask.questions[currentQuestion]?.options.map(
                (item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-4 rounded-md bg-gray-100 hover:bg-blue-200 transition-colors relative"
                    onClick={() => {
                      if (startTimer) {
                        handleOption(item, index);
                      }
                    }}
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
                    <span className="block text-gray-800">
                      Option {index + 1}:
                    </span>
                    <span className="block text-gray-600">{item}</span>
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
                className="mt-4 bg-blue-500 text-white p-3 rounded-md"
              >
                Next Question
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default QuizGame;
