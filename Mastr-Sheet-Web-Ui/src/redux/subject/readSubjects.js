import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const readSubjects = createAsyncThunk("subject/readSubjects", () => {
  return axios.get("/api/subject").then((res) => res.data);
});
