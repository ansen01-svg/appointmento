import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user reducers';
import appointmentsSlice from './appointments reducer';

let store = configureStore({
    reducer : {
        uR : userSlice,
        aR : appointmentsSlice
    }
})


export default store;