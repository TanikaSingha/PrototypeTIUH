import React from "react";
import Lottie from "lottie-react";
import useTypingEffect from "../../../lib/Hooks/useTypingEffect";
import aquaAnimation from "../../../assets/lottieAnimations/aqua.json";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";
const GuideIntroduction = () => {
  const dispatch = useDispatch();
  const typedText = "Hi i am Aqua";
  return (
    <div className="relative flex flex-col items-center">
      <Lottie
        animationData={aquaAnimation}
        loop={true}
        className="w-[400px] h-[400px]"
      />
      ;
      <div className="w-[400px] p-6 bg-green-300/90 rounded-lg shadow-xl backdrop-blur-md absolute -top-[100px] right-[250px] text-gray-800">
        <p className="text-lg font-medium">{typedText}</p>
      </div>
      <button
        onClick={() => {
          dispatch(nextStep());
        }}
        className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-300 shadow-lg"
      >
        Continue
      </button>
    </div>
  );
};

export default GuideIntroduction;
