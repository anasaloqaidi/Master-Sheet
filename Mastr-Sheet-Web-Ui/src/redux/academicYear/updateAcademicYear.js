import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateAcademicYear = createAsyncThunk("academicYear/updateAcademicYear" ,({Id, updateData}) => {
  return axios.patch(`/api/academic-year/${Id}`, updateData).then((res)=>res.data);
});