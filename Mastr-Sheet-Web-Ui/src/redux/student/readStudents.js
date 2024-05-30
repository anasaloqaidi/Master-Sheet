import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readStudents = createAsyncThunk("student/readStudents", () => {
    return axios.get('/api/student').then((res)=>res.data);
});