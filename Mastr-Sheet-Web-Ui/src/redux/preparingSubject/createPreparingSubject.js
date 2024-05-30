import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPreparingSubject = createAsyncThunk ("preparingSubject/createPreparingSubject",(preparingSubjectData) => {
    console.log(preparingSubjectData);
    return axios.post('/api/preparing-subject', preparingSubjectData).then((res)=>res.data);
})