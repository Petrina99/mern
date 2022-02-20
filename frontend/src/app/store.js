import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from '../features/auth/authSlice';
import TaskReducer from '../features/tasks/taskSlice';
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
