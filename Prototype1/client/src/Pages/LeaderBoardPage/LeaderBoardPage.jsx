import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../lib/utils/socket";
import { updateLeaderboard } from "../../lib/Slices/leaderBoardSlice";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);

  useEffect(() => {
    socket.on("leaderboardUpdate", (updatedLeaderboard) => {
      console.log("Leaderboard update received:", updatedLeaderboard); 
      dispatch(updateLeaderboard(updatedLeaderboard));
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, [dispatch]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index}>
            {user.userId}: {user.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
