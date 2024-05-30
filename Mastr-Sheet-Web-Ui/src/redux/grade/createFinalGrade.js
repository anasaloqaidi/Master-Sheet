import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createFinalGrade= createAsyncThunk ("grade/createFinalGrade",(data) => {
    return axios.post('/api/final-grade', data).then((res)=>res.data);
})