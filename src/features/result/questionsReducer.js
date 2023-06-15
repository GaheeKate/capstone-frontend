import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: [],
  reducers: {
    setQuestions: (state, action) => {
      return action.payload;
    },
  },
});

export const { setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
