import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readReFinalGrades = createAsyncThunk("grade/readReFinalGrades", () => {
    return axios.get('/api/refinal-grade').then((res)=>res.data);
});