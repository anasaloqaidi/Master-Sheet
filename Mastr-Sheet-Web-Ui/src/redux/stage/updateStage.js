import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateStage = createAsyncThunk("stage/updateStage" ,({Id, updateData}) => {
  return axios.patch(`/api/stage/${Id}`, updateData).then((res)=>res.data);
});