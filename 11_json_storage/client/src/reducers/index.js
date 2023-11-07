import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import jsonReducer from './jsonReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    json: jsonReducer,
  },
});
