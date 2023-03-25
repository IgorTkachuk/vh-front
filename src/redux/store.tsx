import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authAPI/authApi';
import AuthReducer from './slices/auth/auth';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
