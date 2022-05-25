import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, getUserThunk, logoutThunk, updateUserThunk } from './user thunks';
import { toast } from 'react-toastify';


let initialState = {
    isLoading : false,
    user : {}
}


export let register = createAsyncThunk('user/register', registerThunk)
export let login = createAsyncThunk('user/login', loginThunk)
export let getUser = createAsyncThunk('user/getUser', getUserThunk)
export let logoutUser = createAsyncThunk('user/logoutUser', logoutThunk)
export let updateUser = createAsyncThunk('user/updateUser', updateUserThunk)


let userSlice = createSlice({
    name : 'user',
    initialState,

    extraReducers : {
        [register.pending] : (state) => {
            state.isLoading = true
        },
        [register.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            toast.success(`${payload}`)
        },
        [register.rejected] : (state) => {
            state.isLoading = false;
            toast.error(`Failed to register`)
        },
        [login.pending] : (state) => {
            state.isLoading = true
        },
        [login.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            toast.success(`${payload}`)
        },
        [login.rejected] : (state) => {
            state.isLoading = false;
            toast.error(`Login failed`)
        },
        [getUser.pending] : (state) => {
            state.isLoading = true
        },
        [getUser.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            state.user = payload
        },
        [getUser.rejected] : (state) => {
            state.isLoading = false;
        },
        [updateUser.pending] : (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            toast.success(`${payload}`)
        },
        [updateUser.rejected] : (state) => {
            state.isLoading = false;
            toast.error(`Unable to update profile`)
        },
        [logoutUser.pending] : (state) => {
            state.isLoading = true
        },
        [logoutUser.fulfilled] : (state) => {
            state.isLoading = false;
            state.user = {};
        },
        [logoutUser.rejected] : (state) => {
            state.isLoading = false;
        }
    }
})


export default userSlice.reducer