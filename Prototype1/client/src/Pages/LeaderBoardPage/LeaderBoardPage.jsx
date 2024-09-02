import React from "react";
import { useSelector } from "react-redux";
import LeaderboardItem from "./LeaderboardItem";

const LeaderBoardPage = () => {
  const { status, data, error } = useSelector((state) => state.leaderboard);

  if (status === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
      <div className="space-y-4">
        {data?.map((item, index) => (
          <LeaderboardItem key={index} item={item} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoardPage;
