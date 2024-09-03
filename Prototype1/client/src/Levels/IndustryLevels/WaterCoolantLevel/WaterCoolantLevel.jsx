import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalClose, setModalOpen } from "../../../lib/Slices/tutorialSlice";
import { useNavigate } from "react-router-dom";
import WaterCoolantLevelImage from "../../../assets/Levels/IndustryLevel/WaterCoolant-Level.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Joyride from "react-joyride";
import {
  faArrowLeft,
  faLeaf,
  faRecycle,
  faSeedling,
  faThermometerHalf,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/recycleWater.png";
import taskicon2 from "../../../assets/Icons/thermometer.png";
import taskicon3 from "../../../assets/Icons/waterGauge.png";

const modalData = [
  {
    title: "Efficient Water Recycling",
    description:
      "Install and maintain a water recycling system in your industrial facility to reuse wastewater. This reduces the strain on groundwater resources.",
    images: [
      <FontAwesomeIcon icon={faRecycle} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Optimizing Cooling System",
    description:
      "Upgrade your facility's cooling system to a more water-efficient model. Efficient cooling systems reduce the need for excessive water usage.",
    images: [
      <FontAwesomeIcon
        icon={faThermometerHalf}
        className="text-blue-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Monitor Groundwater Usage",
    description:
      "Implement a real-time monitoring system for groundwater extraction. Monitoring groundwater usage ensures sustainable practices and prevents over-extraction.",
    images: [
      <FontAwesomeIcon icon={faWater} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Water Conservation Techniques",
    description:
      "Learn about various water conservation techniques that can be applied in industrial processes to minimize water wastage and protect groundwater.",
    images: [
      <FontAwesomeIcon icon={faLeaf} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Sustainable Practices",
    description:
      "Adopt sustainable industrial practices that focus on reducing the environmental impact of water usage and ensuring long-term groundwater availability.",
    images: [
      <FontAwesomeIcon icon={faSeedling} className="text-blue-500 w-12 h-12" />,
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
const WaterCoolantLevel = () => {
  const { modalOpen } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      dispatch(setModalOpen());
    }
  };
  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the Water Coolant Level! Let's explore how to manage water resources efficiently.",
      placement: "center",
    },
    {
      target: ".joyride-step-2",
      content:
        "Here are your tasks. Complete them to enhance your water management skills and progress in the game.",
      placement: "bottom",
    },
    {
      target: ".joyride-step-3",
      content:
        "Detailed instructions and tips will be available in a modal after this guide. Make sure to review them to successfully complete your tasks.",
      placement: "center",
    },
  ];
  return (
    <div
      style={{ backgroundImage: `url(${WaterCoolantLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/gameElements");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
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
      {modalOpen && <ModalComponent />}
      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">
            Water Coolant Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=industry&level=water-coolant&type=puzzle`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Implement Efficient Water Recycling
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Install and maintain a water recycling system in your industrial
                facility to reuse wastewater
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/50  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=industry&level=water-coolant&type=puzzle`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Optimize Cooling System Efficiency
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Upgrade the cooling system in your facility to a more
                water-efficient model
              </p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=industry&level=water-coolant&type=puzzle`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Monitor Groundwater Usage
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Implement a real-time monitoring system for groundwater
                extraction in your industrial processes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterCoolantLevel;
