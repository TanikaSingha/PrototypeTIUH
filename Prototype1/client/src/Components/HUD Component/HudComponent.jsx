import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joyride, { STATUS } from "react-joyride";
import { setModalOpen } from "../../lib/Slices/tutorialSlice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import "./HudComponent.css"

const getScoreFromLevel = (level) => {
  if (level === 5) return 2000;
  if (level === 4) return 1000;
  if (level === 3) return 750;
  if (level === 2) return 500;
  return 250;
};

const Hud = () => {
  const { isTutorialComplete } = useSelector((state) => state.tutorial);
  const { user } = useSelector((state) => state.user);
  const { currentTask, isTaskRunning } = useSelector((state) => state.game);
  const [run, setRun] = useState(!isTutorialComplete);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const percentage = (user.score / getScoreFromLevel(user.playerLevel)) * 100;


  return (
    <div className="absolute top-0 left-0 p-4 bg-gradient-to-b from-blue-950 to-blue-900 shadow-lg w-full flex justify-between items-center hud h-16 text-white">
      {/* <Joyride
        steps={steps}
        continuous
        run={run}
        showSkipButton
        showProgress
        disableOverlayClose
        callback={handleJoyrideCallback}
      /> */}
      <h2 className="text-xl font-bold audiowide tracking-wide">AquaSavvy</h2>
      <div className="flex items-center space-x-6">
        <div className="montserrat text-base tasks">
          <strong>Tasks:</strong> {`"${currentTask?.name || `No Tasks`}"`}
        </div>
        <div className="text-sm score flex gap-4">
          <p className="montserrat text-base">
            <strong>Score:</strong> {user.score}
          </p>
          <p className="coins montserrat text-base">
            <strong>Coins:</strong> {user.coins}
          </p>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => {
            if (!isTaskRunning) {
              navigate("/profile");
            }
          }}
        >

          <div className="relative w-14 h-14">
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#00FF00",
                trailColor: "#1A1D23",
                strokeLinecap: "round",
                pathTransitionDuration: 0.5,
              })}
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <img
                src={user.avatar}
                alt="profile-pic"
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
          <div className="montserrat text-base">
            <p className="font-semibold">Level {user.playerLevel}</p>
          </div>
        </div>
        <div className="water-level flex flex-col items-center">
          <strong className="montserrat text-base">Water Level:</strong>
          <div className={`bg-gray-700 h-2 mt-1 w-32 relative rounded`}>
            <div
              className={`absolute inset-0 h-full ${user.groundWaterLevel >= 50
                ? `bg-blue-500`
                : user.groundWaterLevel >= 25
                  ? `bg-yellow-300`
                  : `bg-red-500`
                } rounded`}
              style={{ width: `${user.groundWaterLevel}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default Hud;
