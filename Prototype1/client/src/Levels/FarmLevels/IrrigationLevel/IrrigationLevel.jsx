import React, { useState } from "react";
import irrigationLevelImage from "../../../assets/Levels/FarmLevel/Irrigation.png";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setTaskInfo } from "../../../lib/Slices/gameSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faWater, faCloudRain, faLeaf, faSeedling, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/waterhose.png";
import taskicon3 from "../../../assets/Icons/mulch.png";
import taskicon2 from "../../../assets/Icons/rainTank.png";
import Joyride, { STATUS } from "react-joyride";
import { setModalClose, setModalOpen } from "../../../lib/Slices/tutorialSlice";


const modalData = [
    {
        title: "Drip Irrigation Setup",
        description:
            "Install drip irrigation systems to ensure efficient water delivery directly to the plant roots. This method helps reduce water wastage through evaporation and runoff, promoting water conservation.",
        images: [
            <FontAwesomeIcon icon={faWater} className="text-blue-500 w-12 h-12" />,
        ],
    },
    {
        title: "Rainwater Harvesting Installation",
        description:
            "Set up rainwater harvesting systems to collect and store rainwater. This stored water can be used for irrigation, reducing the dependence on groundwater and conserving water resources.",
        images: [
            <FontAwesomeIcon
                icon={faCloudRain}
                className="text-blue-500 w-12 h-12"
            />,
        ],
    },
    {
        title: "Mulching Practice",
        description:
            "Apply mulch around crops to help retain soil moisture, reduce weed growth, and prevent soil erosion. This practice supports healthy plant growth and efficient water use.",
        images: [
            <FontAwesomeIcon
                icon={faLeaf}
                className="text-green-500 w-12 h-12"
            />,
        ],
    },
    {
        title: "Soil Moisture Monitoring",
        description:
            "Use soil moisture sensors to keep track of soil water levels. This helps optimize irrigation schedules and ensures crops receive the right amount of water for healthy growth.",
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
            "Implement crop rotation techniques to enhance soil health and improve water retention. This reduces the need for excessive irrigation and supports sustainable farming practices.",
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



const IrrigationLevel = () => {
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
            style={{ backgroundImage: `url(${irrigationLevelImage})` }}
            className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
        >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <button
                onClick={() => {
                    navigate("/element/farm");
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
                        Irrigation Level
                    </h1>
                    <div className="flex justify-center space-x-6">
                        {/* Task 1 */}
                        <div
                            className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => {
                                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
                            }}
                        >
                            <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 1</h2>
                            <p className="text-base text-white text-center montserrat">
                                Drip Irrigation Setup
                            </p>
                            <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
                            <p className="text-center inconsolata"> Set up a drip irrigation system on the farm to reduce water wastage and enhance efficient water use by delivering water directly to the roots of the crops</p>
                        </div>

                        {/* Task 2 */}
                        <div
                            className="w-72 h-96 bg-black/50  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => {
                                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
                            }}
                        >
                            <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 2</h2>
                            <p className="text-base text-white text-center montserrat">
                                Rainwater Harvesting Installation
                            </p>
                            <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
                            <p className="text-center inconsolata">Install a rainwater harvesting system to collect and store rainwater for irrigation purposes, reducing dependence on groundwater</p>
                        </div>

                        {/* Task 3 */}
                        <div
                            className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => {
                                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
                            }}
                        >
                            <h2 className="text-xl font-bold mb-2 montserrat text-white">Task 3</h2>
                            <p className="text-base text-white text-center montserrat">
                                Mulching Practice
                            </p>
                            <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
                            <p className="text-center inconsolata">Apply mulch around plants to retain soil moisture, reduce evaporation, and minimize the need for additional irrigation, thereby conserving groundwater</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IrrigationLevel;
