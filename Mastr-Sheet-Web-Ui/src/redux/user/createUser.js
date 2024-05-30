import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk ("user/createUser",(userData) => {
    return axios.post('/api/user', userData).then((res)=>res.data);
})