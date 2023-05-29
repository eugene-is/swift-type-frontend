// redux/slices/theme.js

import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
	name: 'theme',
	initialState: localStorage.getItem('app-theme') || 'light', // Значение по умолчанию для темы
	reducers: {
		setTheme: (state, action) => {
			return action.payload; // Обновляем значение темы
		},
	},
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
