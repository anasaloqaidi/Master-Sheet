import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createMidGrade= createAsyncThunk ("grade/createMidGrade",(data) => {
    return axios.post('/api/mid-grade', data).then((res)=>res.data);
})





