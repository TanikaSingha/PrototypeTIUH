import React from "react";
import FarmElement from "../../../assets/Elements/FarmElement.png";
const FarmComponent = () => {
  return (
    <div className="w-full min-h-screen bg-green-200 flex flex-col gap-5 justify-center items-center">
      <h1 className="font-bold text-4xl">Farm</h1>
      <div>
        <img src={FarmElement} alt="" className="w-[800px] h-[600px]" />
      </div>
    </div>
  );
};

export default FarmComponent;
