import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import FarmElement from "../../../assets/Elements/FarmElement.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";
import aqua from "../../../assets/aqua/aqua.png";

const FarmComponent = () => {
  const [run, setRun] = useState(true);
  const { isTutorialComplete } = useSelector((state) => state.tutorial);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const steps = [
    {
      target: ".farm-heading",
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              Welcome to the Farm section! This is where you'll manage your farm
            </p>
            <div>
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>
          </div>
        </>
      ),
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".farm-image",
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              Here's a visual representation of your farm. Hover over it to
              interact
            </p>
            <div>
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>
          </div>
        </>
      ),

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
    <div
      className={`w-full h-[calc(100vh-64px)] bg-slate-800 flex flex-col items-center`}
    >
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
        spotlightPadding={2}
        locale={{
          back: "Previous", // Custom text for the Back button
          last: "Finish", // Custom text for the Last button (usually the Finish button)
          next: "Next", // Custom text for the Next button
          skip: "Skip", // Custom text for the Skip button
        }}
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
            fontFamily: "Montserrat, sans-serif",
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
            fontFamily: "Montserrat, sans-serif",
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
            fontFamily: "Montserrat, sans-serif",
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
      <h1 className="font-bold text-4xl text-white farm-heading liu-jian mt-4">
        Farm
      </h1>
      <div className="relative bg-white/10 p-4 mt-8 rounded-3xl">
        <div
          className="group farm-land absolute w-[120px] h-[75px] bg-transparent bottom-[270px] left-[150px] cursor-pointer z-30"
          onClick={() => {
            if (!isTutorialComplete) {
              dispatch(nextStep());
            }
            navigate("/element/farm/level/crop-level");
          }}
        >
          <div className="hidden inconsolata group-hover:block absolute top-[-80px] left-[50%] transform -translate-x-1/2 w-[200px] z-30 bg-gray-800 text-white text-center p-4 rounded-lg shadow-lg">
            Click to enter the crop level!
          </div>
        </div>
        <div
          className="group irrigation-land absolute w-[150px] h-[110px] bg-transparent bottom-[150px] left-[280px] cursor-pointer z-30"
          onClick={() => {
            if (!isTutorialComplete) {
              dispatch(nextStep());
            }
            navigate("/element/farm/level/crop-level");
          }}
        >
          <div className="hidden inconsolata group-hover:block absolute top-[-80px] left-[50%] transform -translate-x-1/2 w-[200px] z-30 bg-gray-800 text-white text-center p-4 rounded-lg shadow-lg">
            Click to enter the irrigation level!
          </div>
        </div>
        <div
          className="group farm-land absolute w-[120px] h-[85px] bg-transparent bottom-[220px] left-[470px] cursor-pointer z-30"
          onClick={() => {
            if (!isTutorialComplete) {
              dispatch(nextStep());
            }
            navigate("/element/farm/level/crop-level");
          }}
        >
          <div className="hidden inconsolata group-hover:block absolute top-[-80px] left-[50%] transform -translate-x-1/2 w-[200px] z-30 bg-gray-800 text-white text-center p-4 rounded-lg shadow-lg">
            Click to enter the pesticide level!
          </div>
        </div>
        <img
          src={FarmElement}
          alt=""
          className="w-[700px] h-[500px] farm-image"
        />
      </div>
    </div>
  );
};

export default FarmComponent;
