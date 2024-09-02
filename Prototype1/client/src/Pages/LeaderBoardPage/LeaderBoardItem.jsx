import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const LeaderboardItem = ({ item, rank }) => {
  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-400";
    return "text-gray-800";
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex items-center">
        <span className={`text-2xl font-bold mr-4 ${getRankColor(rank)}`}>
          #{rank}
        </span>
        <img
          src={item?.avatar}
          alt="profile-pic"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">{item?.username}</h2>
          <div className="text-gray-500">
            <FontAwesomeIcon icon={faMedal} className="mr-2" />
            Level {item?.playerLevel}
          </div>
        </div>
      </div>
      <div className="text-xl font-bold text-blue-600">{item?.score} pts</div>
    </div>
  );
};

export default LeaderboardItem;
