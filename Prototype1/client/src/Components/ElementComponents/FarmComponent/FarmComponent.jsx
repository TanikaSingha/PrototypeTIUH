import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import FarmElement from "../../../assets/Elements/FarmElement.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";

const FarmComponent = () => {
  const [run, setRun] = useState(true);
  const { isTutorialComplete } = useSelector((state) => state.tutorial);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const steps = [
    {
      target: ".farm-heading",
      content:
        "Welcome to the Farm section! This is where you'll manage your farm.",
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".farm-image",
      content:
        "Here's a visual representation of your farm. Click to interact with it.",
      placement: "bottom",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-green-200 flex flex-col gap justify-center items-center">
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        spotlightPadding={0}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#34d399",
            backgroundColor: "#ffffff",
            textColor: "#333333",
            borderRadius: 8,
            arrowColor: "#ffffff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
          },
          buttonNext: {
            backgroundColor: "#10b981",
            color: "#ffffff",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          buttonBack: {
            backgroundColor: "#f7fafc",
            color: "#2d3748",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          buttonSkip: {
            backgroundColor: "#edf2f7",
            color: "#2d3748",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          tooltip: {
            borderRadius: 12,
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          },
        }}
      />
      <h1 className="font-bold text-4xl farm-heading">Farm</h1>
      <div className="relative">
        <div
          className="farm-land absolute w-[100px] h-[160px] rotate-[51deg] bg-white/5 bottom-[200px] left-[150px] cursor-pointer z-30 transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-green-900"
          onClick={() => {
            if (!isTutorialComplete) {
              dispatch(nextStep());
            }
            navigate("/element/farm/level/crop-level");
          }}
        ></div>
        <img
          src={FarmElement}
          alt=""
          className="w-[800px] h-[600px] farm-image"
        />
      </div>
    </div>
  );
};

export default FarmComponent;
