import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./lib/Slices/userSlice";
import tutorialReducer from "./lib/Slices/tutorialSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    tutorial: tutorialReducer,
  },
});

export default store;
