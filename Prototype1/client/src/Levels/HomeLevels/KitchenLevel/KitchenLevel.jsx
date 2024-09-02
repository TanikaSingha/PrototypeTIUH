import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalClose } from "../../../lib/Slices/tutorialSlice";
import { useNavigate } from "react-router-dom";
import KitchenLevelImage from "../../../assets/Levels/HomeLevel/Kitchen-Level.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/dishwasher.png";
import taskicon2 from "../../../assets/Icons/rainwaterTank.png"
import taskicon3 from "../../../assets/Icons/faucet.png"

const modalData = [
  { title: "Title 1", description: "Description 1", images: [] },
  { title: "Title 2", description: "Description 2", images: [] },
  { title: "Title 3", description: "Description 3", images: [] },
  { title: "Title 4", description: "Description 4", images: [] },
  { title: "Title 5", description: "Description 5", images: [] },
];

const ModalComponent = () => {
  const [page, setPage] = useState(0);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[600px] h-[400px] bg-white rounded-lg shadow-lg flex flex-col p-6 relative">
        <div className="absolute top-4 right-4 text-gray-500">
          <p className="text-sm font-semibold">
            {page + 1}/{modalData.length}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {modalData[page].title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {modalData[page].description}
          </p>
        </div>
        <div className="flex justify-between mt-auto">
          {page > 0 && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Prev
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ml-auto"
            onClick={() => {
              dispatch(setModalClose());
            }}
          >
            Skip Tutorial
          </button>
          {page < modalData.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const KitchenLevel = () => {
  const { modalOpen } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    {
      target: "crops",
      content: "These are crops!",
      bearerDown: true,
      placement: "top",
    },
    {
      target: "soil",
      content: "This is Soil",
      placement: "top",
    },
    {
      target: "water-channel",
      content: "This is water channel!",
      placement: "top",
    },
  ];
  return (
    // <div
    //   style={{ backgroundImage: `url(${KitchenLevelImage})` }}
    //   className="w-full min-h-screen bg-cover bg-no-repeat flex items-center justify-center"
    // >
    //   {modalOpen && <ModalComponent />}
    //   {!modalOpen && (
    //     <div>
    //       <h1 className="text-white text-4xl font-bold">Kitchen Level</h1>
    //       <div
    //         className="w-20 h-20 bg-black"
    //         onClick={() => {
    //           navigate(`/game/taskPage?element=home&level=kitchen&type=choice`);
    //         }}
    //       >
    //         <p className="text-white">Task 1</p>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div
      style={{ backgroundImage: `url(${KitchenLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/gameElements");
        }
        }
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      {modalOpen && <ModalComponent />}
      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">Kitchen Level</h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                navigate(`/game/taskPage?element=home&level=kitchen&type=choice`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 1</h2>
              <p className="text-base text-white text-center montserrat">
              Water-Efficient Appliances
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">Upgrade to water-efficient appliances like dishwashers and washing machines to reduce water usage in the home</p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/60  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                navigate(`/game/taskPage?element=home&level=kitchen&type=choice`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 2</h2>
              <p className="text-base text-white text-center montserrat">
              Rainwater Harvesting for Household Use
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">Set up a rainwater harvesting system in your home to collect and store rainwater</p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                navigate(`/game/taskPage?element=home&level=kitchen&type=choice`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 3</h2>
              <p className="text-base text-white text-center montserrat">
              Leak Detection and Repair
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">Repairing leaks promptly can save a significant amount of water</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default KitchenLevel;
