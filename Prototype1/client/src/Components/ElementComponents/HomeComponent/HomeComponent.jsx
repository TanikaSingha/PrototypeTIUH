import React from "react";
import HomeElement from "../../../assets/Elements/HomeElement.png";
const HomeComponent = () => {
  return (
    <div className="w-full min-h-screen bg-green-200 flex flex-col gap-5 justify-center items-center">
      <h1 className="font-bold text-4xl">Home</h1>
      <div>
        <img src={HomeElement} alt="" className="w-[800px] h-[600px]" />
      </div>
    </div>
  );
};

export default HomeComponent;
