import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../components/utils/api";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const url = "/contacts";
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeContact = createAsyncThunk(
  "contacts/addContact",
  async (id, thunkAPI) => {
    const url = `/contacts/${id}`;
    try {
      const { data } = await api.delete(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contact, thunkAPI) => {
    const url = "/contacts";
    try {
      const { data } = await api.post(url, contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
