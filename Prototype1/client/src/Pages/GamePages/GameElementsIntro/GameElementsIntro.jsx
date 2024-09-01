import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import aquaAnimationData from "../../../assets/lottieAnimations/aqua.json";
import Joyride, { STATUS } from "react-joyride";
import { useNavigate } from "react-router-dom";

const ElementMap = [
  { name: "Farm", bgColor: "green" },
  { name: "Home", bgColor: "yellow" },
  { name: "Industry", bgColor: "blue" },
];
const aquaAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: aquaAnimationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const GameElementsIntro = () => {
  const { isTutorialComplete } = useSelector((state) => state.tutorial);
  const [run, setRun] = useState(!isTutorialComplete);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      target: `.farm`,
      content: (
        <>
          <div className="flex items-center">
            <Lottie options={aquaAnimationOptions} height={50} width={50} />
            <p>
              This is the Farm! Farms use a significant amount of groundwater.
              Let's explore how we can conserve water here.
            </p>
          </div>
        </>
      ),
      disableBeacon: true,
      placement: "right",
    },
    {
      target: `.home`,
      content: (
        <>
          <div className="flex items-center">
            <Lottie options={aquaAnimationOptions} height={50} width={50} />
            <p>
              Welcome to your Home! Discover simple ways to save water in
              everyday activities.
            </p>
          </div>
        </>
      ),
      placement: "left",
    },
    {
      target: `.industry`,
      content: (
        <>
          <div className="flex items-center">
            <Lottie options={aquaAnimationOptions} height={50} width={50} />
            <p>
              This is the Industry! Industries consume a lot of water. Learn how
              we can make them more water-efficient.
            </p>
          </div>
        </>
      ),
      placement: "left",
    },
    {
      target: ".farm",
      content: (
        <>
          <div className="flex items-center">
            <Lottie options={aquaAnimationOptions} height={50} width={50} />
            <p>
              Let's start with the Farm! Perform tasks that help reduce water
              usage and make the farm more sustainable.
            </p>
          </div>
        </>
      ),
      placement: "right",
    },
  ];

  const handleJoyride = (data) => {
    const { status, index } = data;
    setCurrentStep(index % ElementMap.length);

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <section className="min-h-screen w-full relative">
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyride}
        spotlightPadding={1}
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
            padding: "15px",
          },
          tooltipContent: {
            display: "flex",
            alignItems: "center",
          },
        }}
      />
      <div className="absolute inset-0 flex w-full h-full">
        {ElementMap.map((item, index) => {
          const { name, bgColor } = item;
          return (
            <div
              key={index}
              className={`group flex w-1/3  items-center justify-center cursor-pointer relative p-4 transition-all duration-300 transform ${
                currentStep === index ? "scale-105 shadow-lg" : ""
              } ${name.toLowerCase()}`}
              style={{
                backgroundColor:
                  bgColor === "green"
                    ? "#34d399"
                    : bgColor === "yellow"
                    ? "#facc15"
                    : "#60a5fa",
              }}
              onClick={() => {
                navigate(`/element/${item.name.toLowerCase()}`);
              }}
            >
              <h1
                className={`font-bold text-white text-4xl transition-opacity duration-300 ${
                  currentStep === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {name}
              </h1>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GameElementsIntro;
