import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/axios";
const API_URL = "https://vocab-builder-backend.p.goit.global/api";

export const fetchCategories = createAsyncThunk(
  "words/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/words/categories`);
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
      const response = await api.post(`/words/create/${id}`, data);

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
      const { keyword, category, isIrregular, page, limit } = payload;
      const response = await api.get(`/words/all`, {
        params: { keyword, category, isIrregular, page, limit },
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

      const response = await api.get(`/words/own`);

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
      const response = await api.delete(`/words/delete/${id}`);
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
      const response = await api.get(`/words/statistics`);

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

      const response = await api.get(`/words/tasks`);

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
