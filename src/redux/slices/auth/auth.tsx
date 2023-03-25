import { createSlice } from '@reduxjs/toolkit';

export interface authState {
  user: string | null;
  token: string | null;
}

const initalState: authState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initalState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
