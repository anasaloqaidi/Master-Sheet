import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signOutAuth = createAsyncThunk(
  "auth/signout",
  () => {
    console.log(111)
    return axios.get("/api/auth/signout").then((res) => res.data);
  }
);