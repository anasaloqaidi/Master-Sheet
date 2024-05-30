import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSubject = createAsyncThunk(
  "subject/updateSubject",
  ({ code, updateData }) => {
    console.log(code)
    return axios
      .patch(`/api/subject/${code}`, updateData)
      .then((res) => res.data);
  }
);
