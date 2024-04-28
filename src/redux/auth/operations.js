import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, instance, setToken } from "./slice";

export const apiRegister = createAsyncThunk(
    "auth/register",
    async (formData, thunkApi) => {
      try {
        const { data } = await instance.post("/users/signup", formData);
        setToken(data.token);
        return data;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    }
  );
  
  export const apiLogin = createAsyncThunk(
    "auth/login",
    async (formData, thunkApi) => {
      try {
        const { data } = await instance.post("/users/login", formData);
        setToken(data.token);
  
        return data;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    }
  );
  
  export const apiRefreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkApi) => {
      try {
        const state = thunkApi.getState();
        const token = state.auth.token;
        setToken(token);
        const { data } = await instance.get("/users/current");
        return data;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    }
  );
  
  export const apiLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {
      try {
        await instance.post("/users/logout");
        clearToken();
  
        return;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    }
  );
  