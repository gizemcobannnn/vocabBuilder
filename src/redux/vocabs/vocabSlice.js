import { createSlice } from '@reduxjs/toolkit';
import {createAnswer,getTasks,statistics,deleteWord,getOwnWord ,getWords,editWord,createForeignWord , createWord,fetchCategories} from './vocabOps.js';
const initialState ={
    name: 'vocabBuilder',
    words: [],
    recommendedWords:[],
    tasks:[],
    totalTasks:1,
    category: "",
    ownWords: [],
    foreignWords: [],
    favorites: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    totalPages:1,
    page:1,
    perPage:1,
}

export const wordsSlice = createSlice({
    name:"wordsApp",
    initialState: initialState,
    reducers:{
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        setCategory: (state,action) => {
          state.category = action.payload;
        }
  
    },
    extraReducers: (builder)=>builder
      .addCase(createAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.words = action.payload;
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // getTasks
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalTasks = action.payload.tasks.length;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // getWords
      .addCase(getWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.totalPages=action.totalPages;
        state.page= action.page;
        state.perPage=action.perPage;
      })
      .addCase(getWords.rejected,(state,action)=>{
        state.words=action.payload.results;
        state.error=action.payload;
      })
      .addCase(getWords.pending,(state)=>{
        state.isLoading=true;
      })

      // getOwnWord
      .addCase(getOwnWord.fulfilled, (state, action) => {
        state.ownWords = action.payload;
      })

      // createWord
      .addCase(createWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
      })

      // deleteWord
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.words = state.words.filter((word) => word.id !== action.payload);
      })

      // editWord
      .addCase(editWord.fulfilled, (state, action) => {
        const index = state.words.findIndex((word) => word.id === action.payload.id);
        if (index !== -1) {
          state.words[index] = action.payload;
        }
      })
      .addCase(editWord.pending, (state, action) => {
        state.status = 'loading';
        state.error = action.payload;
      })
      .addCase(editWord.rejected, (state,action)=>{
        state.status = 'failed';
        state.error = action.error.message;
      })

      // createForeignWord
      .addCase(createForeignWord.fulfilled, (state, action) => {
        state.foreignWords.push(action.payload);
      })
        .addCase(createForeignWord.pending, (state, action) => {
        state.foreignWords.push(action.payload);
      })
        .addCase(createForeignWord.rejected, (state, action) => {
        state.foreignWords.push(action.payload);
      })

      // fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.pending, (state,action)=>{
        state.status = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // statistics
      .addCase(statistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(statistics.pending, (state,action)=>{
        state.status = action.payload;
      })
      .addCase(statistics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

})

export const { setFavorites, setCategory } = wordsSlice.actions;
export default wordsSlice.reducer;
