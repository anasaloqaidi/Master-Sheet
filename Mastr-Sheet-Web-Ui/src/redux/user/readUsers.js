import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readUsers = createAsyncThunk("user/readUsers", () => {
    return axios.get('/api/user').then((res)=>res.data);
});