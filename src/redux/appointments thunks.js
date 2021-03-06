import baseUrl from '../utils/base url';


export let getAllAppointmentsThunk = async (query, thunkApi) => {
    try {
        let { data } = await baseUrl.get(`${query ? `/apis/v1/appointments?status=${query}` : '/apis/v1/appointments'}`)
        return data.appointments
    } catch (error) {
        thunkApi.rejectWithValue(error.response.data.msg)
   }
}


export let addAppointmentThunk = async (payload, thunkApi) => {
    try {
        let { data } = await baseUrl.post(`/apis/v1/appointments`, payload)
        return data.msg
    } catch (error) {
        thunkApi.rejectWithValue(error.response.data.msg)
    }
}


export let getSingleAppointmentThunk = async (id, thunkApi) => {
    try {
        let { data } = await baseUrl.get(`/apis/v1/appointments/${id}`)
        return data.appointment
    } catch (error) {
        thunkApi.rejectWithValue(error.response.data.msg)
    }
}


export let editAppointmentThunk = async (payload, thunkApi) => {
    try {
        let { data } = await baseUrl.patch(`/apis/v1/appointments/edit`, payload)
        return data.msg
    } catch (error) {
        thunkApi.rejectWithValue(error.response.data.msg)
    }
}


export let deleteAppointmentThunk = async (id, thunkApi) => {
    try {
        let { data } = await baseUrl.delete(`/apis/v1/appointments/delete/${id}`)
        return data.msg
    } catch (error) {
        thunkApi.rejectWithValue(error.response.data.msg)
    }
}