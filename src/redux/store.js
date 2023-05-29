import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import keyboardReducer from './slices/keyboard';
import themeReducer from './slices/theme';
import { trainersReducer } from './slices/trainers';
import typewriterReducer from './slices/typewriter';

const store = configureStore({
	reducer: {
		trainers: trainersReducer,
		auth: authReducer,
		theme: themeReducer,
		typewriter: typewriterReducer,
		keyboard: keyboardReducer,
	},
});

export default store;
