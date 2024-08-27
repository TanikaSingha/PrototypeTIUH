import React, { useState, useEffect } from "react";

const Player = ({ position, onMove }) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        onMove({ x: position.x, y: position.y - 10 });
        break;
      case "ArrowDown":
        onMove({ x: position.x, y: position.y + 10 });
        break;
      case "ArrowLeft":
        onMove({ x: position.x - 10, y: position.y });
        break;
      case "ArrowRight":
        onMove({ x: position.x + 10, y: position.y });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position]);

  return (
    <div
      className="absolute bg-blue-500 w-10 h-10 rounded-full"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    />
  );
};

export default Player;
