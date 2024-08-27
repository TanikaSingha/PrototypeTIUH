import React from "react";
import IndustryElement from "../../../assets/Elements/IndustryElement.png";
const IndustryComponent = () => {
  return (
    <div className="w-full min-h-screen bg-green-200 flex flex-col gap-5 justify-center items-center">
      <h1 className="font-bold text-4xl">Industry</h1>
      <div>
        <img src={IndustryElement} alt="" className="w-[800px] h-[600px]" />
      </div>
    </div>
  );
};

export default IndustryComponent;
