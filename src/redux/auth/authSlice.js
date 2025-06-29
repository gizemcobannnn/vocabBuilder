import { createSlice } from '@reduxjs/toolkit';
import { registerUser,loginUser,getUser,logoutUser } from './authOps';

const initialState = {
    name:"auth",
    isLoggedIn: false,
    isRegistered: false,
    isLoggedOut:false,
    user:null,
    error:null,
    isLoading: false,
    token: localStorage.getItem("token") || null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setToken:(state,action)=>{
            state.token=action.payload;
            if(action.payload){
                localStorage.setItem("token",action.payload);
            }else{
                localStorage.removeItem("token");
            }
        }
    },
    extraReducers: (builder)=>builder
    .addCase(registerUser.pending, (state)=>{
        state.isLoading = true;
        state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading=false;
        state.isRegistered = true;
        state.isLoggedOut=false;
        state.user = action.payload;
        state.error = null;
}).addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    })
    .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
    }) .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isLoggedOut=false;
        state.user = action.payload;
        state.error = null;
    }).addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn=false;
        state.error = action.payload;
    }).addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    }).addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isLoggedOut=true;
        state.user = null;
        state.error = null;
    }).addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    } )
    .addCase(getUser.pending,(state)=>{
        state.user=null;
        state.isLoading=true;
    })
    .addCase(getUser.fulfilled,(state,action)=>{
        state.user=action.payload;
        state.isLoading=false;
    })
        .addCase(getUser.rejected,(state,action)=>{
        state.user=action.payload;
        state.isLoading=false;
    })
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
