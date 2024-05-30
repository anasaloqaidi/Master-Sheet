import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteDepartment = createAsyncThunk("department/deleteDepartment", (departmentId) => {
  return axios.delete(`/api/department/${departmentId}`).then((res)=>res.data);

});