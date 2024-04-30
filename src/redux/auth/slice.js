import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiLogin, apiLogout, apiRefreshUser, apiRegister } from './operations';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () =>
  (instance.defaults.headers.common.Authorization = '');

const INITIAL_STATE = {
  isSignedIn: false,
  userData: null,
  token: null,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.userData = action.payload;
      })
      .addCase(apiLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addMatcher(
        isAnyOf(
          apiRegister.pending,
          apiLogin.pending,
          apiRefreshUser.pending,
          apiLogout.pending,
        ),
        state => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        isAnyOf(
          apiRegister.rejected,
          apiLogin.rejected,
          apiRefreshUser.rejected,
          apiLogout.rejected,
        ),
        state => {
          state.isLoading = false;
          state.isError = true;
        },
      ),
});

export const authReducer = authSlice.reducer;
