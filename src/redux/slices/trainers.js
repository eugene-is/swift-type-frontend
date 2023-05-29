import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAllTrainers = createAsyncThunk(
	'/trainers/fetchAllTrainers',
	async () => {
		const { data } = await axios.get('/trainers');
		return data;
	}
);

export const fetchGetAllOneUser = createAsyncThunk(
	'/trainers/fetchGetAllOneUser',
	async () => {
		const { data } = await axios.get('/trainers/account');
		return data;
	}
);

export const fetchCreateTrainer = createAsyncThunk(
	'/trainers/fetchCreateTrainer',
	async (params) => {
		const { data } = await axios.post('/trainers', params);
		return data;
	}
);

export const fetchRemoveTrainer = createAsyncThunk(
	'/trainers/fetchRemoveTrainer',
	async (id) => {
		await axios.delete(`/trainers/${id}`);
	}
);

const initialState = {
	trainers: {
		items: [],
		status: 'loading',
	},
};

const trainersSlice = createSlice({
	name: 'trainers',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllTrainers.pending]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'loading';
		},
		[fetchAllTrainers.fulfilled]: (state, action) => {
			state.trainers.items = action.payload;
			state.trainers.status = 'loaded';
		},
		[fetchAllTrainers.rejected]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'error';
		},
		[fetchGetAllOneUser.pending]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'loading';
		},
		[fetchGetAllOneUser.fulfilled]: (state, action) => {
			state.trainers.items = action.payload;
			state.trainers.status = 'loaded';
		},
		[fetchGetAllOneUser.rejected]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'error';
		},
		[fetchCreateTrainer.pending]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'loading';
		},
		[fetchCreateTrainer.fulfilled]: (state, action) => {
			state.trainers.items.push(action.payload);
			state.trainers.status = 'loaded';
		},
		[fetchCreateTrainer.rejected]: (state) => {
			state.trainers.items = [];
			state.trainers.status = 'error';
		},
		[fetchRemoveTrainer.pending]: (state, action) => {
			state.trainers.items = state.trainers.items.filter(
				(obj) => obj._id !== action.meta.arg
			);
		},
	},
});

export const trainersReducer = trainersSlice.reducer;
