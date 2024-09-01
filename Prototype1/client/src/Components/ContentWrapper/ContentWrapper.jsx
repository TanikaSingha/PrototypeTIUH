import React from "react";
import Hud from "../HUD Component/HudComponent";

const ContentWrapper = ({ children }) => {
  return (
    <section className="w-full min-h-screen relative bg-gray-100 flex flex-col items-center justify-center">
      <Hud></Hud>
      {children}
    </section>
  );
};

export default ContentWrapper;
