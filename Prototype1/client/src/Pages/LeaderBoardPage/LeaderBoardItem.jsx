import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const LeaderboardItem = ({ item, rank }) => {
  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-500";
    return "text-gray-800";
  };

  return (
    <div className="flex items-center gap-2 p-4 rounded-lg shadow-sm">
      <span className={`text-2xl font-bold mr-4 ${getRankColor(rank)}`}>
        #{rank}
      </span>
      <img
        src={item?.avatar}
        alt="profile-pic"
        className="w-16 h-16 rounded-full mr-4 ring-4 ring-cyan-600"
      />
      <div className="flex items-center justify-between bg-gradient-to-r from-cyan-50 to-cyan-500 py-2 px-4 rounded-lg w-[800px]">
        <div>
          <div className="text-emerald-900">
            <FontAwesomeIcon
              icon={faMedal}
              className={`mr-2 ${getRankColor(rank)} text-xl font-bold`}
            />
            Level {item?.playerLevel}
          </div>
        </div>
        <h2
          className="text-xl font-semibold text-green-900
        "
        >
          {item?.username}
        </h2>
        <div className="text-xl font-bold text-emerald-100">
          {item?.score} pts
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
