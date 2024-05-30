import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createReFinalGrade= createAsyncThunk ("grade/createReFinalGrade",(data) => {
    return axios.post('/api/refinal-grade', data).then((res)=>res.data);
})