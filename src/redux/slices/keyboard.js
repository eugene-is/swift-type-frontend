import { createSlice } from '@reduxjs/toolkit';

const keyboardSlice = createSlice({
	name: 'keyboard',
	initialState: false,
	reducers: {
		toggleFilledKeyboard: (state) => !state,
	},
});

export const { toggleFilledKeyboard } = keyboardSlice.actions;

export default keyboardSlice.reducer;
