import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/axios";
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
  async ({ data, selectedWordType, selectedIsRegular }, thunkAPI) => {
    try {
      let payload = {
        ua: data.word1,
        en: data.word2,
        category: selectedWordType,
      };

      // Eğer kategori 'noun' değilse, isIrregular ekle
      if (selectedWordType !== "noun") {
        payload.isIrregular = selectedIsRegular === "irregular";
      }

      const response = await api.post(`/words/create`, payload);
      return response.data;

    } catch (error) {
      const message = error.response?.data?.message || "Bir hata oluştu.";
      return thunkAPI.rejectWithValue(message);
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
      const response = await api.patch(
        `${API_URL}/words/edit/${id}`,
        updatedData
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;

      if (
        status === 403 &&
        message === "You don't have right to edit this word"
      ) {
        return thunkAPI.rejectWithValue(message);
      }

      return thunkAPI.rejectWithValue(
        message || "An error occurred while editing the word."
      );
    }
  }
);

export const getWords = createAsyncThunk(
  "words/getWords",
  async (payload, thunkAPI) => {
    try {
      const { keyword, category, isRegular, page, limit } = payload;
      const response = await api.get(`/words/all`, {
        params: { keyword, category, isRegular, page, limit },
      });

      return response.data;
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
      const response = await api.post(
        `/words/answers`,
        [answerData],
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
