import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: "",
  coins: "",
  level: "",
  waterLevel: "",
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {},
});

export default scoreSlice.reducer;
