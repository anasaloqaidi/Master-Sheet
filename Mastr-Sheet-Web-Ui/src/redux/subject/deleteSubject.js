import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  (code) => {
    return axios.delete(`/api/subject/${code}`).then((res) => res.data);
  }
);
