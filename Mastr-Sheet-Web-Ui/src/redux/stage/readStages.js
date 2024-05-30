import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readStages = createAsyncThunk("stage/readStages", () => {
    return axios.get('/api/stage').then((res)=>res.data);
});