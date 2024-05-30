import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteStudent = createAsyncThunk("student/deleteStudent", (studentId) => {
  return axios.delete(`/api/student/${studentId}`).then((res)=>res.data);

});