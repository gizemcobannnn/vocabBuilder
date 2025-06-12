import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL="https://vocab-builder-backend.p.goit.global/api"

export const fetchCategories = createAsyncThunk('words/fetchCategories',async(thunkAPI)=>{
    try{
        const response = await axios.get(`${API_URL}/words/categories`);
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createWord = createAsyncThunk("words/createWord",async(thunkAPI)=>{
    try{
        const response = await axios.post(`${API_URL}/words/create`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createForeignWord = createAsyncThunk("words/createForeignWord",async(thunkAPI)=>{
    try{
        URLSearchParams();
        const response = await axios.post(`${API_URL}/words/create/{id}`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
});

export const editWord = createAsyncThunk("words/editWord",async(thunkAPI)=>{
    try{
        URLSearchParams();
        const response = await axios.patch(`${API_URL}/words/edit/{id}`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
});


export const getWords = createAsyncThunk("words/getWords",async(thunkAPI)=>{
    try{
        const response = await axios.get(`${API_URL}/words/all`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getOwnWord = createAsyncThunk("words/getOwnWord",async(thunkAPI)=>{
    try{
        const response= await axios.get(`${API_URL}/words/own`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteWord = createAsyncThunk("words/deleteWord",async(thunkAPI)=>{
    try{
        const response= await axios.delete(`${API_URL}/words/delete/{id}`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const statistics = createAsyncThunk("words/statistics",async(thunkAPI)=>{
    try{
        const response = await axios.get(`${API_URL}/words/statistics`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getTasks = createAsyncThunk("words/getTasks",async(thunkAPI)=>{
    try{
        const response = await axios.get(`${API_URL}/words/tasks`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data)
    }
})

export const createAnswer = createAsyncThunk("words/createAnswer",async(thunkAPI)=>{
    try{
        const response = await axios.post(`${API_URL}/words/answers`);
        return response.data;
    }catch(error){
        thunkAPI.rejectWithValue(error.response.data)
    }
})