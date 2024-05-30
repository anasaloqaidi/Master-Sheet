import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  (subjectData) => {
    return axios.post("/api/subject", subjectData).then((res) => res.data);
  }
);
