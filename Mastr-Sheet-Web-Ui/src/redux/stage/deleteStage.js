import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteStage = createAsyncThunk("stage/deleteStage", (stageId) => {
  return axios.delete(`/api/stage/${stageId}`).then((res)=>res.data);

});