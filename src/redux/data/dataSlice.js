
import { createSlice } from "@reduxjs/toolkit"
const initialState={
    name:"wordsApp",    
    words:[],
    favorites:[],
}
export const wordsSlice= createSlice({
    initialState:{initialState},
    name:"wordsApp",
    reducers:{
    }
});

export const {actions, reducer} = wordsSlice;