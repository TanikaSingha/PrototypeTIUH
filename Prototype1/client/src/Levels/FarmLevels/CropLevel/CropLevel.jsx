import React, { useState } from "react";
import cropLevelImage from "../../../assets/Levels/FarmLevel/Crop-Level.png";
import { useDispatch, useSelector } from "react-redux";
import { setModalClose, setModalOpen } from "../../../lib/Slices/tutorialSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Joyride from "react-joyride";
import {
  faArrowLeft,
  faCloudRain,
  faLeaf,
  faLightbulb,
  faSeedling,
  faSyncAlt,
  faTint,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/waterLeaf.png";
import taskicon2 from "../../../assets/Icons/mulching.png";
import taskicon3 from "../../../assets/Icons/legumes.png";

const modalData = [
  {
    title: "Use Drip Irrigation",
    description:
      "Implement drip irrigation systems to deliver water directly to the plant roots, minimizing water loss through evaporation and runoff.",
    images: [
      <FontAwesomeIcon icon={faWater} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Mulching to Retain Moisture",
    description:
      "Apply mulch around crops to retain soil moisture, reduce weed growth, and prevent soil erosion, promoting healthy plant growth.",
    images: [
      <FontAwesomeIcon icon={faLeaf} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Rainwater Harvesting",
    description:
      "Set up rainwater harvesting systems to collect and store rainwater for irrigation purposes, reducing reliance on groundwater.",
    images: [
      <FontAwesomeIcon
        icon={faCloudRain}
        className="text-blue-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Soil Moisture Monitoring",
    description:
      "Utilize soil moisture sensors to monitor the water levels in the soil and optimize irrigation schedules, ensuring crops receive the right amount of water.",
    images: [
      <FontAwesomeIcon
        icon={faSeedling}
        className="text-green-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Crop Rotation",
    description:
      "Practice crop rotation to improve soil health and water retention, reducing the need for excessive irrigation.",
    images: [
      <FontAwesomeIcon
        icon={faSyncAlt}
        className="text-yellow-500 w-12 h-12"
      />,
    ],
  },
];

const ModalComponent = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[800px] bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg shadow-xl flex flex-col p-6 relative">
        <div className="bg-gradient-to-br from-blue-400 to-teal-300 w-24 h-24 flex items-center justify-center rounded-full ring-8 ring-teal-700 absolute -top-[66px] -left-10 z-10">
          <FontAwesomeIcon
            icon={faTint}
            className="text-blue-100 text-4xl"
          ></FontAwesomeIcon>
        </div>
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl w-80 flex items-center justify-center absolute border-4 border-teal-900 p-4 -left-2 -top-[60px] tracking-widest">
          <h1 className="text-4xl font-semibold text-teal-800 uppercase audiowide">
          Trivia
          </h1>
        </div>
        <div className="absolute top-4 right-4 text-gray-900">
          <p className="text-sm font-semibold">
            {page + 1}/{modalData.length}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-3xl font-bold text-teal-900 mb-4 ">
            {modalData[page].title}
          </h1>
          <p className="text-lg text-gray-800 mb-8 text-center">
            {modalData[page].description}
          </p>
          <div className="mb-6">{modalData[page].images}</div>
        </div>
        <div className="flex justify-between mt-auto">
          {page > 0 && (
            <button
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Prev
            </button>
          )}
          {page < modalData.length - 1 && (
            <button
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next
            </button>
          )}
          {page === modalData.length - 1 && (
            <button
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg"
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

const CropLevel = () => {
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
      style={{ backgroundImage: `url(${cropLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)] bg-cover bg-no-repeat flex items-center justify-center`}
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
            Crop Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Water-Smart Crop Management Quiz
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Test your knowledge on sustainable crop management practices
                that protect and conserve groundwater
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/50  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Mulching to Reduce Evaporation
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Apply organic mulch around crops to retain soil moisture and
                reduce evaporation
              </p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Implement Crop Rotation with Legumes
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Rotate crops by planting legumes to improve soil health and
                water retention
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropLevel;
