import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchTrainers = createAsyncThunk('/trainers/fetchTrainers', async () => {
	const { data } = await axios.get('/trainers');
	return data;
})

const initialState = {
	trainers: {
		items: [],
		status: 'loading',
	},
}

const trainersSlice = createSlice({
	name: 'trainers',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTrainers.pending]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'loading';
		},
		[fetchTrainers.fulfilled]: (state, action) => {
			state.trainers.items = action.payload;
			state.trainers.status = 'loaded';
		},
		[fetchTrainers.rejected]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'error';
		}
	},
})

export const trainersReducer = trainersSlice.reducer
