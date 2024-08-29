import React, { useState } from "react";
import Lottie from "lottie-react";
import aquaAnimation from "../../../assets/lottieAnimations/aqua.json";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";
import Joyride, { STATUS } from "react-joyride";
const GuideIntroduction = () => {
  const dispatch = useDispatch();
  const [run, setRun] = useState(true);
  const steps = [
    {
      target: ".aqua-animation",
      content: "Hi,There i am Aqua your personal guide",
      disableBeacon: true,
      placement: "left",
    },
    {
      target: ".continue-button",
      content: "Click here to continue to the next step!",
      placement: "right",
    },
  ];

  const handleJoyride = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };
  return (
    <div className="relative flex flex-col items-center">
      <Lottie
        animationData={aquaAnimation}
        loop={true}
        className="w-[400px] h-[400px] aqua-animation"
      />
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyride}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#34d399", // Tailwind green-400
            backgroundColor: "#ffffff",
            textColor: "#333333",
          },
          buttonNext: {
            backgroundColor: "#10b981", // Tailwind green-500
          },
        }}
      ></Joyride>
      <button
        onClick={() => {
          if (!run) {
            dispatch(nextStep());
          }
        }}
        className="continue-button mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-300 shadow-lg"
      >
        Continue
      </button>
    </div>
  );
};

export default GuideIntroduction;
