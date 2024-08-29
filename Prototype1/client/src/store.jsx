import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./lib/Slices/userSlice";
import tutorialReducer from "./lib/Slices/tutorialSlice";
import scoreReducer from "./lib/Slices/scoreSlice";
import gameReducer from "./lib/Slices/gameSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    tutorial: tutorialReducer,
    score: scoreReducer,
    game: gameReducer,
  },
});

export default store;
