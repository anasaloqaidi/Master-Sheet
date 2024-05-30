import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const readCollege = createAsyncThunk("college/readCollege", () => {
  return axios.get("/api/college").then((res) => res.data);
});
