import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteUser = createAsyncThunk("user/deleteUser", (userId) => {
  return axios.delete(`/api/user/${userId}`).then((res)=>res.data);

});