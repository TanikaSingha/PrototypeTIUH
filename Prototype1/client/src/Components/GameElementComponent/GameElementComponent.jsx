import React from "react";
import FarmComponent from "../ElementComponents/FarmComponent/FarmComponent";
import HomeComponent from "../ElementComponents/HomeComponent/HomeComponent";
import IndustryComponent from "../ElementComponents/IndustryComponent/IndustryComponent";
import { useDispatch, useSelector } from "react-redux";
import { prevStep } from "../../lib/Slices/tutorialSlice";

const GameElementComponent = () => {
  const { selectedElement, isTutorialComplete } = useSelector(
    (state) => state.tutorial
  );
  const dispatch = useDispatch();
  return (
    <section className="w-full relative">
      <button
        onClick={() => {
          if (!isTutorialComplete) {
            dispatch(prevStep());
          }
        }}
        className="w-[200px] bg-red-500 p-2 cursor-pointer absolute top-3 left-3"
      >
        Go Back
      </button>
      <div>
        {selectedElement === "farm" && <FarmComponent></FarmComponent>}
        {selectedElement === "home" && <HomeComponent></HomeComponent>}
        {selectedElement === "industry" && (
          <IndustryComponent></IndustryComponent>
        )}
      </div>
    </section>
  );
};

export default GameElementComponent;
