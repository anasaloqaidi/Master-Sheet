import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async  (email,{ rejectWithValue }) => {
      try {
        const response = await axios.get(`/api/auth/forget-password/${email}`)
        return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);