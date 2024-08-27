import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  prevStep,
  setSelectedElement,
} from "../../lib/Slices/tutorialSlice";

const ElementMap = [
  {
    name: "Farm",
    bgColor: "green",
    image: "",
  },
  {
    name: "Home",
    bgColor: "yellow",
    image: "",
  },
  {
    name: "Industry",
    bgColor: "blue",
    image: "",
  },
];

const GameElementsIntro = () => {
  const dispatch = useDispatch();
  const { isTutorialComplete } = useSelector((state) => state.tutorial);
  return (
    <section className="grid grid-cols-3 divide-x-4 min-h-full w-full relative">
      {ElementMap.map((item, index) => {
        const { name, bgColor } = item;
        return (
          <div
            key={index}
            className={`group bg-${bgColor}-500 flex items-center justify-center cursor-pointer `}
            onClick={() => {
              dispatch(setSelectedElement(name.toLowerCase()));
              if (!isTutorialComplete) {
                dispatch(nextStep());
              }
            }}
          >
            <h1 className="font-bold text-white text-4xl opacity-0 group-hover:opacity-100 transition-all ">
              {name}
            </h1>
          </div>
        );
      })}
    </section>
  );
};

export default GameElementsIntro;
