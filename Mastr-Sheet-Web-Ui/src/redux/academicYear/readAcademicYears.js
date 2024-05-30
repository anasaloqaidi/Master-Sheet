import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readAcademicYears = createAsyncThunk("academicYear/readAcademicYears", () => {
    return axios.get('/api/academic-year').then((res)=>res.data);
});