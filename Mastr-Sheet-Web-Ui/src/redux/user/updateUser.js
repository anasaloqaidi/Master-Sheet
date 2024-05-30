import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk("user/updateUser" ,({Id, updateData}) => {
  return axios.patch(`/api/user/${Id}`, updateData).then((res)=>res.data);
});