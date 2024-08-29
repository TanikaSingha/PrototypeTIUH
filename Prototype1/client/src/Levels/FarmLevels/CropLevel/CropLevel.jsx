import React, { useEffect, useState } from "react";
import cropLevelImage from "../../../assets/Levels/FarmLevel/Crop-Level.png";
import { useDispatch, useSelector } from "react-redux";
import { setModalClose } from "../../../lib/Slices/tutorialSlice";


const modalData = [
  { title: "Title 1", description: "Description 1", images: [] },
  { title: "Title 2", description: "Description 2", images: [] },
  { title: "Title 3", description: "Description 3", images: [] },
  { title: "Title 4", description: "Description 4", images: [] },
  { title: "Title 5", description: "Description 5", images: [] },
];

const ModalComponent = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
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

const CropLevel = () => {
  const { modalOpen } = useSelector((state) => state.tutorial);
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
    <div
      style={{ backgroundImage: `url(${cropLevelImage})` }}
      className="w-full min-h-screen bg-cover bg-no-repeat flex items-center justify-center"
    >
      {modalOpen && <ModalComponent />}
      {!modalOpen && (
        <div>
          <h1 className="text-white text-4xl font-bold">Crop Level</h1>
        </div>
      )}
    </div>
  );
};

export default CropLevel;
