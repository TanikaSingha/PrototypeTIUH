import React from "react";
import { useSelector } from "react-redux";
import LeaderboardItem from "./LeaderboardItem";
import { Vortex } from "react-loader-spinner";

const LeaderBoardPage = () => {
  const { status, data, error } = useSelector((state) => state.leaderboard);

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["#00A9E0", "#00B2A9", "#007A7A", "#E0F7FA", "#00A859"]}
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-4xl text-red-500 font-semibold ">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-[1000px] border-4 border-cyan-200 rounded-2xl p-4 relative">
        <div
          className="border-4 border-purple-400 flex items-center justify-center  p-4 rounded-2xl w-96 absolute left-1/2 -top-[40px] -translate-x-1/2"
          style={{ backgroundColor: "#111827" }}
        >
          <h1 className="text-4xl font-bold uppercase text-center text-cyan-200 tracking-wider audiowide">
            Leaderboard
          </h1>
        </div>
        <div className="flex flex-col mt-16">
          {data?.map((item, index) => (
            <LeaderboardItem key={index} item={item} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
