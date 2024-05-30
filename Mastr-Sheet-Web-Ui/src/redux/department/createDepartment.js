import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createDepartment = createAsyncThunk ("department/createDepartment",(departmentData) => {
    return axios.post('/api/department', departmentData).then((res)=>res.data);
})