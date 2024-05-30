import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteAcademicYear = createAsyncThunk("academicYear/deleteAcademicYear", (id) => {
  return axios.delete(`/api/academic-year/${id}`).then((res)=>res.data);

});