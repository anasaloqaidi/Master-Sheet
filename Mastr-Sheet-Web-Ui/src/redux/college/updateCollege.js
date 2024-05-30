import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCollege = createAsyncThunk(
  "college/updateCollege",
  ({ id, updateData }) => {
    return axios
      .patch(`/api/college/${id}`, updateData)
      .then((res) => res.data);
  }
);
