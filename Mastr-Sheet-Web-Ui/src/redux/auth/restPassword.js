import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const restPassword = createAsyncThunk(
  "auth/restPassword",
  async  (payload,{ rejectWithValue }) => {
      try {
        const response = await axios.post(`/api/auth/rest-password/`,payload)
        return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);