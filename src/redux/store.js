import { configureStore } from '@reduxjs/toolkit';
import { trainersReducer } from './slices/trainers';
import { authReducer } from './slices/auth';


const store = configureStore({
	reducer: {
		trainers: trainersReducer,
		auth: authReducer,
	}
});

export default store;