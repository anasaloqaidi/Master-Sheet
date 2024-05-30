import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readDepartments = createAsyncThunk("department/readDepartments", () => {
    return axios.get('/api/department').then((res)=>res.data);
});