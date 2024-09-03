import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToxicLevel from "../../../assets/Levels/IndustryLevel/toxicwater.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faRecycle, faFlask, faTint, faIndustry, faBiohazard } from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/waterpipe.png";
import taskicon2 from "../../../assets/Icons/testtube.png";
import taskicon3 from "../../../assets/Icons/search.png"
import Joyride, { STATUS } from "react-joyride";
import { setModalClose, setModalOpen } from "../../../lib/Slices/tutorialSlice";

const modalData = [
  {
    title: "Wastewater Recycling Setup",
    description:
      "Implement a wastewater recycling system in the industry to treat and reuse toxic water. This reduces the discharge of harmful pollutants into groundwater and conserves water resources.",
    images: [
      <FontAwesomeIcon
        icon={faRecycle}
        className="text-blue-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Toxic Chemical Neutralization",
    description:
      "Develop and integrate a chemical neutralization process to detoxify harmful chemicals before they reach groundwater. This prevents contamination and protects water quality.",
    images: [
      <FontAwesomeIcon
        icon={faFlask}
        className="text-red-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Groundwater Monitoring System",
    description:
      "Install a comprehensive groundwater monitoring system that tracks water quality and quantity near the industry. Regular monitoring helps detect and address potential contamination issues early.",
    images: [
      <FontAwesomeIcon
        icon={faTint}
        className="text-green-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Effluent Treatment Plants",
    description:
      "Set up effluent treatment plants to treat industrial wastewater before it is released into the environment. Proper treatment prevents harmful substances from contaminating groundwater.",
    images: [
      <FontAwesomeIcon
        icon={faIndustry}
        className="text-gray-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Hazardous Waste Management",
    description:
      "Implement a hazardous waste management program to safely handle and dispose of toxic materials, preventing them from leaching into groundwater.",
    images: [
      <FontAwesomeIcon
        icon={faBiohazard}
        className="text-yellow-500 w-12 h-12"
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
const ToxicWaterTreatmentLevel = () => {
  const { modalOpen } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the Crop Level! Let's explore sustainable farming practices to conserve groundwater.",
      placement: "center",
    },
    {
      target: ".joyride-step-2",
      content:
        "Here are your tasks. Complete them to learn more about water-smart crop management and achieve your goals in the game.",
      placement: "bottom",
    },
    {
      target: ".joyride-step-3",
      content:
        "After this guide, you'll get more detailed information in a modal. Follow the instructions to successfully complete your tasks.",
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
      style={{ backgroundImage: `url(${ToxicLevel})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/element/industry");
        }
        }
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
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">Toxic Water Treatment Level</h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                navigate(`/game/taskPage?element=industry&level=water-coolant&type=puzzle`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 1</h2>
              <p className="text-base text-white text-center montserrat">
                Wastewater Recycling Setup
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">Implement a wastewater recycling system in the industry to treat and reuse toxic water</p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/50  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                navigate(`/game/taskPage?element=industry&level=water-coolant&type=puzzle`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 2</h2>
              <p className="text-base text-white text-center montserrat">
                Toxic Chemical Neutralization

              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">Develop and integrate a chemical neutralization process in the industrial setup to detoxify harmful chemicals before they reach the groundwater</p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                navigate(`/game/taskPage?element=industry&level=water-coolant&type=puzzle`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 3</h2>
              <p className="text-base text-white text-center montserrat">
                Groundwater Monitoring System
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">nstall a comprehensive groundwater monitoring system that tracks the quality and quantity of groundwater near the industry</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ToxicWaterTreatmentLevel;
