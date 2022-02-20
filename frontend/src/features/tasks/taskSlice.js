import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import taskService from './taskService';

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createTask = createAsyncThunk(
  'task/create',
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (err) {
        const message = (err.response &&
          err.response.data && 
          err.response.data.message) || 
          err.message || err.toString();

        return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTask = createAsyncThunk(
  'task/getTask',
  async (thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTask(token);
    } catch (err) {
        const message = (err.response &&
          err.response.data && 
          err.response.data.message) || 
          err.message || err.toString();

        return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(id, token);
    } catch (err) {
      const message = (err.response &&
        err.response.data && 
        err.response.data.message) ||
        err.message || err.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => state = initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.tasks.push(action.payload);
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
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.tasks = state.filter(
          (task) => task._id !== action.payload.id
        )
      })
      .addCase(deleteTask.rejected,(state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
  }
})

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;