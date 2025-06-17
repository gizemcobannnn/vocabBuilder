import { createAsyncThunk } from "@reduxjs/toolkit";
import {setToken} from "./authSlice";
import api,{setAuthToken} from '../../api/axios'
const API_URL = "https://vocab-builder-backend.p.goit.global/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/users/signin`, {
        email,
        password,
      });
      const token = response.data.token;
      await dispatch(setToken(token));
      setAuthToken(token);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/users/signup`, {
        name,
        email,
        password,
      });
      const token = response.data.token;
      await dispatch(setToken(token));
      setAuthToken(token);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/users/signout");
      dispatch(setToken(null));
      setAuthToken(null);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/users/current`);
    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
});
