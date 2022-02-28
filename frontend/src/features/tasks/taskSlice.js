import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import taskService from './taskService';

const initialState = {
  tasks: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const createTask = createAsyncThunk('task/create', 
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (err) {
      const message = 
      (err.response && err.response.data && err.resposne.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
});

export const getTask = createAsyncThunk('task/get', 
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTask(token);
    } catch (err) {
      const message = 
      (err.response && err.response.data && err.resposne.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  })

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
  }
})

export const reset = taskSlice.actions;
export default taskSlice.reducer;