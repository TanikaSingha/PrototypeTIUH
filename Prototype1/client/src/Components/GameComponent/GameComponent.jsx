import React, { useEffect } from "react";
import Hud from "../HUD Component/HudComponenet";
import { useParams } from "react-router-dom";
import CropLevel from "../../Levels/FarmLevels/CropLevel/CropLevel";

const GameComponent = () => {
  const { levelType } = useParams();
  return (
    <section>
      <Hud score={0} tasks={["No tasks"]} coins={0} waterLevel={100}></Hud>
      {levelType === "crop-level" && <CropLevel></CropLevel>}
    </section>
  );
};

export default GameComponent;
