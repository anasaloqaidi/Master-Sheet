import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readFinalGrades = createAsyncThunk("grade/readFinalGrades", () => {
    return axios.get('/api/final-grade').then((res)=>res.data);
});