import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

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
    const url = `/contacts/${id}/`;
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
    const url = "/contacts/";
    try {
      const { data } = await api.post(url, {
        first_name: contact.firstName,
        last_name: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        birthday: contact.birthday,
        description: contact.description,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
