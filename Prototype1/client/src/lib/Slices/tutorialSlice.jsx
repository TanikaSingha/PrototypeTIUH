import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  selectedElement: "",
  currentTask: "",
  isTutorialComplete: false,
  modalOpen: false,
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
    setModalOpen: (state) => {
      state.modalOpen = true;
    },
    setModalClose: (state) => {
      state.modalOpen = false;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
  },
});

export const {
  nextStep,
  prevStep,
  setSelectedElement,
  completeTutorial,
  resetTutorial,
  setModalOpen,
  setModalClose,
  setCurrentTask,
} = tutorialSlice.actions;
export default tutorialSlice.reducer;
