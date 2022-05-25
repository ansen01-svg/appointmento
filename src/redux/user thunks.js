import axios from "axios";
import baseUrl from '../utils/base url';


export let registerThunk = async (user, thunkApi) => {
    try {
        let { data } = await axios.post('/apis/v1/auths/register', user)
        return data.msg
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
} 


export let loginThunk = async (user, thunkApi) => {
    try {
        let { data } = await baseUrl.post('/apis/v1/auths/login', user)
        document.cookie = 'domToken=loggedIn'
        return data.msg
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
}


export let getUserThunk = async (_, thunkApi) => {
    try {
        let { data } = await axios.get('/apis/v1/auths/showUser')
        return data.user
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
}


export let updateUserThunk = async (user, thunkApi) => {
    try {
        let { data } = await axios.patch('/apis/v1/auths/updateUser', user)
        return data.msg
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
}


export let logoutThunk = async (_, thunkApi) => {
    try {
        let { data } = await axios.delete('/apis/v1/auths/logout')
        document.cookie='domToken=loggedIn;expires=Thu, 18 Dec 2013 12:00:00 UTC'
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
}