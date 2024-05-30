import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createStage = createAsyncThunk ("stage/createStage",(stageData) => {
    return axios.post('/api/stage', stageData).then((res)=>res.data);
})