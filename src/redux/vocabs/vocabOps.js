import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "https://vocab-builder-backend.p.goit.global/api";

export const fetchCategories = createAsyncThunk(
  "words/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_URL}/words/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createWord = createAsyncThunk(
  "words/createWord",
  async (data, thunkAPI) => {
    try {
      const token = useSelector(state=>state.auth.token);

      const response = await axios.post(`${API_URL}/words/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createForeignWord = createAsyncThunk(
  "words/createForeignWord",
  async ({ id, data }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.post(`${API_URL}/words/create/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editWord = createAsyncThunk(
  "words/editWord",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.patch(`${API_URL}/words/edit/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getWords = createAsyncThunk(
  "words/getWords",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_URL}/words/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOwnWord = createAsyncThunk(
  "words/getOwnWord",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_URL}/words/own`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.delete(`${API_URL}/words/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const statistics = createAsyncThunk(
  "words/statistics",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_URL}/words/statistics`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTasks = createAsyncThunk(
  "words/getTasks",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_URL}/words/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createAnswer = createAsyncThunk(
  "words/createAnswer",
  async (answerData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.post(`${API_URL}/words/answers`, answerData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
