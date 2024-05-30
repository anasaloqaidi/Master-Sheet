import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateStudent = createAsyncThunk("student/updateStudent" ,({Id, updateData}) => {
  return axios.patch(`/api/student/${Id}`, updateData).then((res)=>res.data);
});