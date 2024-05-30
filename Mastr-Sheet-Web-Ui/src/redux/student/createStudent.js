import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createStudent = createAsyncThunk ("student/createStudent",(studentData) => {
    return axios.post('/api/student', studentData).then((res)=>res.data);
})