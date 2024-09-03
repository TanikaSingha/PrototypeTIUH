import React, { useState } from "react";
import pesticideLevelImage from "../../../assets/Levels/FarmLevel/Pesticide.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTaskInfo } from "../../../lib/Slices/gameSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBug, faLeaf, faTree, faSearch, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/pestcontrol.png";
import taskicon2 from "../../../assets/Icons/plantwithroot.png";
import taskicon3 from "../../../assets/Icons/watershield.png";
import Joyride, { STATUS } from "react-joyride";
import { setModalClose, setModalOpen } from "../../../lib/Slices/tutorialSlice";


const modalData = [
    {
        title: "Integrated Pest Management",
        description:
            "Implement Integrated Pest Management (IPM) practices to control pests using a combination of biological, cultural, and mechanical methods. This reduces reliance on chemical pesticides and minimizes environmental impact.",
        images: [
            <FontAwesomeIcon icon={faBug} className="text-red-500 w-12 h-12" />,
        ],
    },
    {
        title: "Use of Biopesticides",
        description:
            "Utilize biopesticides derived from natural organisms to manage pests. These environmentally friendly alternatives to chemical pesticides reduce harm to beneficial insects and soil health.",
        images: [
            <FontAwesomeIcon icon={faLeaf} className="text-green-500 w-12 h-12" />,
        ],
    },
    {
        title: "Buffer Zones Creation",
        description:
            "Create buffer zones around fields to prevent pesticide drift and contamination of nearby water sources. These zones help protect natural ecosystems and maintain groundwater quality.",
        images: [
            <FontAwesomeIcon icon={faTree} className="text-green-700 w-12 h-12" />,
        ],
    },
    {
        title: "Pest Monitoring Systems",
        description:
            "Set up pest monitoring systems to track pest populations and activity. This data helps in making informed decisions about pest control, reducing the need for widespread pesticide use.",
        images: [
            <FontAwesomeIcon icon={faSearch} className="text-blue-500 w-12 h-12" />,
        ],
    },
    {
        title: "Educate on Safe Pesticide Use",
        description:
            "Provide training and resources on the safe and effective use of pesticides. Proper application techniques and safety measures help prevent overuse and reduce environmental impact.",
        images: [
            <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-600 w-12 h-12" />,
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

const PesticideLevel = () => {
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
            style={{ backgroundImage: `url(${pesticideLevelImage})` }}
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
                        Pesticide Level
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
                                Integrated Pest Management
                            </p>
                            <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
                            <p className="text-center inconsolata"> Implement Integrated Pest Management (IPM) practices that combine biological methods to control pests</p>
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
                                Use of Biopesticides
                            </p>
                            <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
                            <p className="text-center inconsolata">Encourage the use of biopesticides derived from natural materials such as plants, bacteria, and minerals</p>
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
                                Buffer Zones Creation
                            </p>
                            <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
                            <p className="text-center inconsolata"> Create buffer zones of vegetation between crop fields and water sources</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PesticideLevel;
