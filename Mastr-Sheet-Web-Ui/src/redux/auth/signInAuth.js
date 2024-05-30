import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signInAuth = createAsyncThunk(
  "auth/signin",
  async  (payload,{ rejectWithValue }) => {
    try {
        const response = await axios.post("/api/auth/signin", payload)
        return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);