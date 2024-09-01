import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoins,
  addScore,
  addWaterLevel,
  removeCoins,
  removeWaterLevel,
} from "../../lib/Slices/userSlice";
import { setTaskComplete, setTaskRunning } from "../../lib/Slices/gameSlice";

const randomLetterGenerator = () => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
};
let interval;
const colorMap = {
  correct: "bg-green-500",
  incorrect: "bg-red-500",
  completion: "bg-blue-500",
};
const PuzzleGame = () => {
  const { currentTask } = useSelector((state) => state.game);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [feedBack, setFeedBack] = useState({ status: "", statement: "" });
  const [startDrag, setStartDrag] = useState(false);
  const [dragString, setDragString] = useState("");
  const [visitedPositions, setVisitedPositions] = useState(new Set());
  const [linePath, setLinePath] = useState("");
  const [lastValidPosition, setLastValidPosition] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(
    currentTask?.taskDetails?.maxAttempts || 0
  );
  const [storeAnswers, setStoreAnswers] = useState(new Set());
  const [answeredLetters, setAnsweredLetters] = useState({});
  const [hint, setHint] = useState("");
  const [hintsLeft, setHintsLeft] = useState(2);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isTaskRunning } = useSelector((state) => state.game);
  useEffect(() => {
    const initAnsweredLetters = {};
    currentTask?.crosswordGrid?.clues?.forEach((clue) => {
      const { position, direction, answer } = clue;
      for (let i = 0; i < answer.length; i++) {
        const key =
          direction === "across"
            ? `${position[0]},${Number(position[1]) + i}`
            : `${Number(position[0]) + i},${position[1]}`;
        if (!initAnsweredLetters[key]) {
          initAnsweredLetters[key] = {
            wordsFound: 0,
            totalWords: 1,
            foundAll: false,
          };
        } else {
          initAnsweredLetters[key].totalWords += 1;
        }
      }
    });
    setAnsweredLetters(initAnsweredLetters);
  }, []);

  const gridLetters = useMemo(() => {
    const grid = [];
    const { size, clues } = currentTask?.crosswordGrid;

    for (let i = 0; i < size[0]; i++) {
      const row = [];
      for (let j = 0; j < size[1]; j++) {
        const clue = clues.find((item) => {
          const [rowPos, colPos] = item.position;
          const isAcross = item.direction === "across";
          const isDown = item.direction === "down";
          return (
            (isAcross &&
              Number(rowPos) === i &&
              j >= Number(colPos) &&
              j < Number(colPos) + item.answer.length) ||
            (isDown &&
              Number(colPos) === j &&
              i >= Number(rowPos) &&
              i < Number(rowPos) + item.answer.length)
          );
        });

        if (clue) {
          const letterIndex =
            clue.direction === "across"
              ? j - Number(clue.position[1])
              : i - Number(clue.position[0]);
          row.push(clue.answer[letterIndex]);
        } else {
          row.push(randomLetterGenerator());
        }
      }
      grid.push(row);
    }
    return grid;
  }, [currentTask?.crosswordGrid]);

  const handleHint = useCallback(() => {
    const find = currentTask?.crosswordGrid?.clues?.find((item) => {
      return !storeAnswers.has(item);
    });
    if (!find || hintsLeft <= 0 || user.coins < 400 / hintsLeft) {
      return;
    }
    const hintCost = 400 / hintsLeft;
    setHint(find.clue);
    dispatch(removeCoins(hintCost));
    setHintsLeft((prevNum) => prevNum - 1);
  }, [storeAnswers, hintsLeft, user.coins]);

  const handleMouseDown = useCallback(
    (e) => {
      if (showResults || maxAttempts === 0) return;

      e.preventDefault();
      const [i, j] = e.currentTarget.dataset.position.split(",").map(Number);
      const positionKey = `${i},${j}`;
      if (answeredLetters[positionKey]?.foundAll) {
        return;
      }

      setStartDrag(true);
      setDragString(e.currentTarget.dataset.value);
      setVisitedPositions(new Set([positionKey]));
      setLinePath(`M${j * 50 + 25},${i * 50 + 25}`);
      setLastValidPosition({ i, j });
    },
    [answeredLetters, showResults, maxAttempts]
  );

  const handleMouseOver = useCallback(
    (e) => {
      if (!startDrag || showResults || maxAttempts === 0) return;

      const [i, j] = e.currentTarget.dataset.position.split(",").map(Number);
      const positionKey = `${i},${j}`;
      if (
        !visitedPositions.has(positionKey) &&
        !answeredLetters[positionKey]?.foundAll
      ) {
        const { i: lastI, j: lastJ } = lastValidPosition || {};
        const isValidMove =
          lastI !== undefined &&
          lastJ !== undefined &&
          (lastI === i || lastJ === j);

        if (isValidMove) {
          setDragString((prev) => prev + e.target.dataset.value);
          setVisitedPositions((prev) => new Set(prev).add(positionKey));
          setLinePath((prev) => prev + ` L${j * 50 + 25},${i * 50 + 25}`);
          setLastValidPosition({ i, j });
        }
      }
    },
    [
      startDrag,
      visitedPositions,
      lastValidPosition,
      answeredLetters,
      showResults,
      maxAttempts,
    ]
  );

  const handleAnswer = useCallback(() => {
    const isPresent = currentTask?.crosswordGrid?.clues?.find(
      (item) => item.answer === dragString
    );
    clearInterval(interval);
    setFeedBack({
      status: "correct",
      statement: currentTask?.feedback?.correct,
    });
    interval = setTimeout(() => {
      setFeedBack({ status: "", statement: "" });
    }, 1000);
    if (isPresent && !storeAnswers.has(isPresent)) {
      setStoreAnswers((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(isPresent);
        return newSet;
      });
      const { position, direction, answer } = isPresent;
      const [startRow, startCol] = position.map(Number);
      const newAnsweredLetters = { ...answeredLetters };

      for (let k = 0; k < answer.length; k++) {
        const posKey =
          direction === "across"
            ? `${startRow},${startCol + k}`
            : `${startRow + k},${startCol}`;

        if (!newAnsweredLetters[posKey]) {
          newAnsweredLetters[posKey] = { wordsFound: 0, totalWords: 1 };
        }
        newAnsweredLetters[posKey].wordsFound += 1;
        const isFullyAnswered =
          newAnsweredLetters[posKey].wordsFound ===
          newAnsweredLetters[posKey].totalWords;

        newAnsweredLetters[posKey].foundAll = isFullyAnswered;
      }

      setAnsweredLetters(newAnsweredLetters);

      setScore(
        (prevScore) =>
          prevScore + currentTask?.taskDetails?.pointsPerCorrectAnswer
      );
      setCoins(
        (prevCoins) =>
          prevCoins + currentTask?.taskDetails?.coinsPerCorrectAnswer
      );
    } else if (maxAttempts > 0) {
      clearInterval(interval);
      setFeedBack({
        status: "incorrect",
        statement: currentTask?.feedback?.incorrect,
      });
      interval = setTimeout(() => {
        setFeedBack({ status: "", statement: "" });
      }, 1000);
      setMaxAttempts((prevAttempts) => prevAttempts - 1);
    }
  }, [dragString, storeAnswers, answeredLetters, maxAttempts]);

  const handleMouseUp = useCallback(() => {
    if (showResults) return;

    setStartDrag(false);
    setVisitedPositions(new Set());
    setLinePath("");
    setLastValidPosition(null);
    if (dragString.length > 1) {
      handleAnswer();
    }
    setDragString("");
  }, [dragString, handleAnswer, showResults, setShowResults]);

  useEffect(() => {
    if (
      storeAnswers.size === currentTask?.crosswordGrid?.clues?.length ||
      maxAttempts === 0
    ) {
      dispatch(addScore(score));
      dispatch(addCoins(coins));
      if (maxAttempts !== 0) {
        clearInterval(interval);
        setFeedBack({
          status: "completion",
          statement: currentTask?.feedback?.completion,
        });
        interval = setTimeout(() => {
          setFeedBack({ status: "", statement: "" });
        }, 1000);
      }
      if (score < currentTask?.taskDetails?.scoreThreshold) {
        dispatch(
          removeWaterLevel(currentTask?.taskDetails?.waterLevelDeduction)
        );
      } else {
        if (maxAttempts === currentTask?.taskDetails?.maxAttempts) {
          dispatch(addScore(currentTask?.taskDetails?.bonusForCompletion));
          dispatch(addWaterLevel(20));
        } else {
          dispatch(addWaterLevel(10));
        }
      }
      dispatch(setTaskComplete());
      setShowResults(true);
    }
  }, [storeAnswers, maxAttempts]);
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center bg-gray-100"
      onMouseUp={handleMouseUp}
    >
      {hint && (
        <div className="absolute top-2 p-2 bg-white text-black left-2">
          <p>{hint}</p>
          <button
            onClick={() => {
              setHint("");
            }}
          >
            Done
          </button>
        </div>
      )}
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
      {feedBack.statement && (
        <div
          className={`absolute bottom-2 right-2 ${colorMap[feedBack.status]}`}
        >
          <p className="text-xl font-bold text-white">{feedBack.statement}</p>
        </div>
      )}
      <div className="absolute top-1/2 right-4 p-2 bg-gray-200">
        <p className="text-red-700">
          Attempts: {maxAttempts}/{currentTask?.taskDetails?.maxAttempts}
        </p>
      </div>
      <div className="bg-orange-400 w-5/12">
        <h1>Puzzle: {currentTask?.name}</h1>
        <h4>Description: {currentTask?.description}</h4>
        <p>Information for the Player</p>
        <ul className="text-sm">
          {currentTask?.instructions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div
        className="bg-white flex flex-wrap relative shadow-lg "
        style={{
          width: `${currentTask?.crosswordGrid?.size[1] * 50}px`,
        }}
      >
        {gridLetters.map((row, i) =>
          row.map((letter, j) => {
            const positionKey = `${i},${j}`;
            const cellClass = answeredLetters[positionKey]?.foundAll
              ? "bg-green-200"
              : answeredLetters[positionKey]?.wordsFound >= 1
              ? "bg-blue-200"
              : "bg-white";
            return (
              <div
                key={`${i}-${j}`}
                data-value={letter}
                data-position={`${i},${j}`}
                className={`w-[50px] h-[50px] border flex items-center justify-center select-none ${cellClass} border-gray-900 ${
                  answeredLetters[positionKey]?.foundAll
                    ? `cursor-not-allowed`
                    : startDrag
                    ? `cursor-grab`
                    : `cursor-pointer`
                }`}
                onMouseDown={isTaskRunning && handleMouseDown}
                onMouseOver={isTaskRunning && handleMouseOver}
              >
                {letter}
              </div>
            );
          })
        )}
        <svg
          className="absolute top-0 left-0"
          style={{
            width: `${currentTask?.crosswordGrid?.size[1] * 50}px`,
            height: `${currentTask?.crosswordGrid?.size[0] * 50}px`,
            pointerEvents: "none",
          }}
        >
          <path d={linePath} stroke="red" strokeWidth="3" fill="none" />
        </svg>
      </div>
      <div>
        <h1>Hints:</h1>
        <ol>
          {currentTask?.crosswordGrid?.hints?.map((item, index) => {
            return <li key={index}>{item.hint}</li>;
          })}
        </ol>
      </div>
      <div
        className={`p-2 bg-white text-black absolute left-5 top-10 ${
          user.coins < 400 / hintsLeft
            ? `opacity-80 cursor-not-allowed`
            : `opacity-100 cursor-pointer`
        }`}
      >
        <p>{hintsLeft}/2</p>
        <button
          onClick={handleHint}
          disabled={isTaskRunning && user.coins < 400 / hintsLeft}
        >
          Use Hint
        </button>
      </div>
    </section>
  );
};

export default PuzzleGame;
