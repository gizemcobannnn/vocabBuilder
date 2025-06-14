import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setToken from "../auth/authSlice";
const API_URL = "https://vocab-builder-backend.p.goit.global/api";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });
      const token = response.data.token;

      dispatch(setToken(token));
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
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      const token = response.data.token;

      dispatch(setToken(token));
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
      const response = await axios.post(`${API_URL}/auth/signout`);

      dispatch(setToken(null));
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/users/current`);
    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
});
