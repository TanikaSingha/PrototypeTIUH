import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joyride, { STATUS } from "react-joyride";
import { setModalOpen } from "../../lib/Slices/tutorialSlice";

const Hud = ({ score, coins, tasks, waterLevel = 20 }) => {
  const { isTutorialComplete, currentTask } = useSelector(
    (state) => state.tutorial
  );
  const [run, setRun] = useState(!isTutorialComplete);
  const dispatch = useDispatch();

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      dispatch(setModalOpen());
      setRun(false);
    }
  };

  const steps = [
    {
      target: ".hud",
      content: "This is HUD!",
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".score",
      content: "Here Score is being shown!",
      placement: "top",
    },
    {
      target: ".coins",
      content: "Here Coins you collected are being shown",
      placement: "top",
    },
    {
      target: ".tasks",
      content:
        "Here the current task you are performing or need to perform is shown!",
      placement: "top",
    },
    {
      target: ".water-level",
      content: "Here the water level stored is being shown!",
      placement: "top",
    },
  ];

  return (
    <div className="absolute top-0 left-0 p-4 bg-white shadow-lg rounded-md w-full flex justify-evenly items-center hud">
      <Joyride
        steps={steps}
        continuous
        run={run}
        showSkipButton
        showProgress
        disableOverlayClose
        callback={handleJoyrideCallback}
      />
      <h2 className="text-xl font-bold">HUD</h2>
      <p className="score">
        <strong>Score:</strong> {score}
      </p>
      <p className="coins">
        <strong>Coins:</strong> {coins}
      </p>
      <p className="tasks">
        <strong>Tasks:</strong>{" "}
        {currentTask.length > 0 ? currentTask : "No Tasks!"}
      </p>
      <div className="mt-2 water-level">
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
