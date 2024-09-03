import React from "react";
import { useSelector } from "react-redux";
import LeaderboardItem from "./LeaderboardItem";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const LeaderBoardPage = () => {
  const { status, data, error } = useSelector((state) => state.leaderboard);
  const navigate = useNavigate();

  if (status === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-b from-sky-500 to-blue-700 rounded-lg shadow-lg">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <h1 className="text-3xl font-bold audiowide text-center mb-6">Leaderboard</h1>
      <div className="space-y-4">
        {data?.map((item, index) => (
          <LeaderboardItem key={index} item={item} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoardPage;
