import React from "react";
import currentTask from "../../assets/GameData/TutorialTasks/puzzleLevel.json";

const randomLetterGenerator = () => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
};
const PuzzleGame = () => {
  return (
    <section className="bg-yellow-500 min-h-screen w-full flex items-center justify-center">
      <div
        className="bg-white flex flex-wrap"
        style={{
          width: `${currentTask.crosswordGrid.size[0] * 50}px`,
          height: `${currentTask.crosswordGrid.size[1] * 50}px`,
        }}
      >
        {[...Array(currentTask.crosswordGrid.size[0])].map((_, i) =>
          [...Array(currentTask.crosswordGrid.size[1])].map((_, j) => (
            <div
              key={`${i}-${j}`}
              className="w-[50px] h-[50px] bg-slate-100 border border-gray-300"
            >
              <p>{randomLetterGenerator()}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PuzzleGame;
