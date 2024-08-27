import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  selectedElement: "",
  isTutorialComplete: false,
};

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
    completeTutorial: (state) => {
      state.isTutorialComplete = true;
    },
    resetTutorial: (state) => {
      state.currentStep = 0;
      state.selectedElement = "";
      state.isTutorialComplete = false;
    },
  },
});

export const {
  nextStep,
  prevStep,
  setSelectedElement,
  completeTutorial,
  resetTutorial,
} = tutorialSlice.actions;
export default tutorialSlice.reducer;
