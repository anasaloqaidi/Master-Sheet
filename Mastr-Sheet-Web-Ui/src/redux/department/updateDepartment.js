import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateDepartment = createAsyncThunk("department/updateDepartment" ,({Id, updateData}) => {
  return axios.patch(`/api/department/${Id}`, updateData).then((res)=>res.data);
});