import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCollege = createAsyncThunk(
  "college/createCollege",
  (CollegeData) => {
    return axios.post("/api/college", CollegeData).then((res) => res.data);
  }
);
