import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (form, thunkAPI) => {
    const url = "/auth/login";
    try {
      const { data } = await api.post(url, {
        username: form.username,
        password: form.password,
      }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};