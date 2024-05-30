import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readPreparingSubjects = createAsyncThunk("preparingSubject/readPreparingSubjects", () => {
    return axios.get('/api/preparing-subject').then((res)=>res.data);
});