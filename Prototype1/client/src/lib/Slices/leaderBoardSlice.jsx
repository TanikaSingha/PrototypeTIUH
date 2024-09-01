import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: [],
  reducers: {
    updateLeaderboard: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { updateLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
