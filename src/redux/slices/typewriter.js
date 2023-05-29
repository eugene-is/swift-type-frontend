// redux/slices/typewriter.js

import { createSlice } from '@reduxjs/toolkit';

const typewriterSlice = createSlice({
  name: 'typewriter',
  initialState: {
    displayText: '',
    currentIndex: 0,
    showCursor: true,
  },
  reducers: {
    setText: (state, action) => {
      state.displayText = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setShowCursor: (state, action) => {
      state.showCursor = action.payload;
    },
  },
});

export const { setText, setCurrentIndex, setShowCursor } = typewriterSlice.actions;

export default typewriterSlice.reducer;
