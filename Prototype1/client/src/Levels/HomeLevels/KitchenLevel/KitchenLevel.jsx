import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joyride from "react-joyride";
import { setModalClose, setModalOpen } from "../../../lib/Slices/tutorialSlice";
import { useNavigate } from "react-router-dom";
import KitchenLevelImage from "../../../assets/Levels/HomeLevel/Kitchen-Level.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFaucet,
  faRecycle,
  faSnowflake,
  faTint,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/dishwasher.png";
import taskicon2 from "../../../assets/Icons/rainwaterTank.png";
import taskicon3 from "../../../assets/Icons/faucet.png";

const modalData = [
  {
    title: "Use Water-Efficient Appliances",
    description:
      "Upgrade to water-efficient appliances like dishwashers and washing machines to significantly reduce water usage in your kitchen.",
    images: [
      <FontAwesomeIcon icon={faTint} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Install Aerators on Faucets",
    description:
      "Adding aerators to your kitchen faucets can reduce water flow without sacrificing pressure, saving water with every use.",
    images: [
      <FontAwesomeIcon icon={faFaucet} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Collect and Reuse Water",
    description:
      "Collect excess water from cooking or washing produce and reuse it for other purposes, like watering plants.",
    images: [
      <FontAwesomeIcon icon={faRecycle} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Repair Leaks Promptly",
    description:
      "A leaky faucet can waste gallons of water a day. Ensure all kitchen leaks are repaired quickly to avoid water wastage.",
    images: [
      <FontAwesomeIcon icon={faWrench} className="text-red-500 w-12 h-12" />,
    ],
  },
  {
    title: "Opt for Cold Water Washing",
    description:
      "Whenever possible, use cold water for washing dishes to conserve energy and reduce water heating needs.",
    images: [
      <FontAwesomeIcon
        icon={faSnowflake}
        className="text-blue-300 w-12 h-12"
      />,
    ],
  },
];

const ModalComponent = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[600px] h-[450px] bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-lg flex flex-col p-6 relative">
        <div className="absolute top-4 right-4 text-gray-500">
          <p className="text-sm font-semibold">
            {page + 1}/{modalData.length}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {modalData[page].title}
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            {modalData[page].description}
          </p>
          <div className="mb-6">{modalData[page].images}</div>
        </div>
        <div className="flex justify-between mt-auto">
          {page > 0 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Prev
            </button>
          )}
          {page < modalData.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-auto transition-all"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next
            </button>
          )}
          {page === modalData.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-auto transition-all"
              onClick={() => {
                dispatch(setModalClose());
              }}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const KitchenLevel = () => {
  const { modalOpen } = useSelector((state) => state.tutorial);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the Kitchen Level! Let's learn how to conserve water.",
      placement: "center",
    },
    {
      target: ".joyride-step-2",
      content:
        "These are your tasks. Complete them to achieve your goals in the game.",
      placement: "bottom",
    },
    {
      target: ".joyride-step-3",
      content:
        "Important information will be provided in a modal after this guide. Make sure to follow it to complete your tasks.",
      placement: "center",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      dispatch(setModalOpen());
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${KitchenLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/gameElements");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <Joyride
        steps={steps}
        callback={handleJoyrideCallback}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#4A90E2",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#000",
            textColor: "#fff",
            width: 300,
            zIndex: 1000,
          },
        }}
      />

      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">
            Kitchen Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=kitchen&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Water-Efficient Appliances
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Upgrade to water-efficient appliances like dishwashers and
                washing machines to reduce water usage in the home
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/60  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=kitchen&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Rainwater Harvesting for Household Use
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Set up a rainwater harvesting system in your home to collect and
                store rainwater
              </p>
            </div>
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=kitchen&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Leak Detection and Repair
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Repairing leaks promptly can save a significant amount of water
              </p>
            </div>
          </div>
        </div>
      )}

      {modalOpen && <ModalComponent />}
    </div>
  );
};

export default KitchenLevel;
