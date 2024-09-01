import React from "react";
import { useParams } from "react-router-dom";
import CropLevel from "../../../Levels/FarmLevels/CropLevel/CropLevel";
import KitchenLevel from "../../../Levels/HomeLevels/KitchenLevel/KitchenLevel";
import WaterCoolantLevel from "../../../Levels/IndustryLevels/WaterCoolantLevel/WaterCoolantLevel";
const levelMap = {
  farm: {
    "crop-level": <CropLevel />,
  },
  home: {
    "kitchen-level": <KitchenLevel />,
  },
  industry: {
    "water-coolant-level": <WaterCoolantLevel />,
  },
};

const GameLevel = () => {
  const { levelId, elementId } = useParams();
  const elementLevels = levelMap[elementId];
  if (!elementLevels) {
    return <div>Invalid element!</div>;
  }
  const levelComponent = elementLevels[levelId];
  if (!levelComponent) {
    return <div>Invalid level!</div>;
  }
  return <div className="w-full min-h-screen">{levelComponent}</div>;
};

export default GameLevel;
