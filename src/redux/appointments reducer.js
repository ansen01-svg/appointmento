import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAppointmentsThunk, addAppointmentThunk, editAppointmentThunk,
getSingleAppointmentThunk, deleteAppointmentThunk } from './appointments thunks';
import { toast } from 'react-toastify';

let initialState = {
    isLoading : false,
    appointments : [],
    singleAppointment : null,
    showSmallSidebar : false,
    isEditing : false
}


export let getAllAppointments = createAsyncThunk('appointmentsSlice/getAllAppointments', getAllAppointmentsThunk);
export let addAppointment = createAsyncThunk('appointmentsSlice/addAppointment', addAppointmentThunk);
export let getSingleAppointment = createAsyncThunk('appointmentsSlice/getSingleAppointment', getSingleAppointmentThunk);
export let editAppointment = createAsyncThunk('appointmentsSlice/editAppointment', editAppointmentThunk);
export let deleteAppointment = createAsyncThunk('appointmentsSlice/deleteAppointment', deleteAppointmentThunk);


let appointmentsSlice = createSlice({
    name : 'appointmentsSlice',
    initialState,

    reducers : {
        toggleSidebar : (state, { payload }) => {
            state.showSmallSidebar = payload
        },
        edit : (state, { payload }) => {
            state.isEditing = payload
        }
    },

    extraReducers : {
        [getAllAppointments.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllAppointments.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            state.appointments = payload;
        },
        [getAllAppointments.rejected] : (state) => {
            state.isLoading = false;
        },
        [addAppointment.pending] : (state) => {
            state.isLoading = true;
        },
        [addAppointment.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            toast.success(`${payload}`)
        },
        [addAppointment.rejected] : (state) => {
            state.isLoading = false;
            toast.error(`Unable to add appointment`)
        },
        [getSingleAppointment.pending] : (state) => {
            state.isLoading = true;
        },
        [getSingleAppointment.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            state.singleAppointment = payload;
        },
        [getSingleAppointment.rejected] : (state) => {
            state.isLoading = false;
        },
        [editAppointment.pending] : (state) => {
            state.isLoading = true;
        },
        [editAppointment.fulfilled] : (state, { payload }) => {
            state.isLoading = false;
            toast.success(`${payload}`)
        },
        [editAppointment.rejected] : (state) => {
            state.isLoading = false;
            toast.error(`Unable to edit appointment`)
        },
        [deleteAppointment.pending] : (state) => {
            state.isLoading = true;
        },
        [deleteAppointment.fulfilled] : (state,  { payload }) => {
            state.isLoading = false;
            toast.success(`${payload}`)
        },
        [deleteAppointment.rejected] : (state) => {
            state.isLoading = false;
        }
    }
})


export let { toggleSidebar, edit } = appointmentsSlice.actions;


export default appointmentsSlice.reducer;