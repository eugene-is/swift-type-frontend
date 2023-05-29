import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyboardHighlight: false, // Изначальное состояние чекбокса подсветки клавиатуры
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setKeyboardHighlight(state, action) {
      state.keyboardHighlight = action.payload;
    },
  },
});

export const { setKeyboardHighlight } = trainingSlice.actions;

export default trainingSlice.reducer;
