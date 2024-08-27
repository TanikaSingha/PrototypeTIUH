import React, { useState, useEffect } from "react";
import Game from "../../Components/MainComponent/MainComponent";
import GuideIntroduction from "../../Components/TutorialComponents/GuideIntroduction/GuideIntroduction";
import WelcomeScreen from "../../Components/TutorialComponents/Welcome Screen/WelcomeScreen";
import GameElementsIntro from "../../Components/GameElementsIntro/GameElementsIntro";
import GameElementComponent from "../../Components/GameElementComponent/GameElementComponent";
import { useDispatch, useSelector } from "react-redux";
import { prevStep } from "../../lib/Slices/tutorialSlice";

const TutorialPage = () => {
  const { currentStep, isTutorialComplete } = useSelector(
    (state) => state.tutorial
  );
  const dispatch = useDispatch();
  return (
    <section className="relative flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-green-200 overflow-hidden ">
      {currentStep > 0 && (
        <button
          onClick={() => {
            if (!isTutorialComplete) {
              dispatch(prevStep());
            }
          }}
          className="w-[200px] bg-red-500 p-2 cursor-pointer absolute top-3 left-3 z-50"
        >
          Go Back
        </button>
      )}
      {currentStep === 0 && <WelcomeScreen></WelcomeScreen>}
      {currentStep === 1 && <GuideIntroduction></GuideIntroduction>}
      {currentStep === 2 && <GameElementsIntro></GameElementsIntro>}
      {currentStep === 3 && <GameElementComponent></GameElementComponent>}
    </section>
  );
};

export default TutorialPage;
