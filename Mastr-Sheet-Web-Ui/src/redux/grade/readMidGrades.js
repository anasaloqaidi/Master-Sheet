import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readMidGrades = createAsyncThunk("grade/readMidGrades", () => {
    return axios.get('/api/mid-grade').then((res)=>res.data);
});








