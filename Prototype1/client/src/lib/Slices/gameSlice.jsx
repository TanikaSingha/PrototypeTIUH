import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTask: [],
  taskType: "",
  gameLevel: "",
  gameElement: "",
  isTaskComplete: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

export default gameSlice.reducer;
