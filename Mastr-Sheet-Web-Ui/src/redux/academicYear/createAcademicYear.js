import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createAcademicYear = createAsyncThunk ("academicYear/createAcademicYear",(AcademicYearData) => {
    return axios.post('/api/academic-year', AcademicYearData).then((res)=>res.data);
})