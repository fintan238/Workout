import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';
import userReducer from '../features/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});