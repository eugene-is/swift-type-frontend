import { configureStore } from '@reduxjs/toolkit';
import { trainersReducer } from './slices/trainers';
import { authReducer } from './slices/auth';
import themeReducer from './slices/theme';
import keyboardFill from './slices/keyboardFill';

import typewriterReducer from './slices/typewriter';



const store = configureStore({
	reducer: {
		trainers: trainersReducer,
		auth: authReducer,
		theme: themeReducer,
		typewriter: typewriterReducer,
		keyboard: keyboardFill,
	}
});

export default store;