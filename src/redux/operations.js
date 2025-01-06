import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../components/utils/api";

export const fetchContacts = createAsyncThunk("contacts/get", async () => {
  const url = "/contacts";
  const { data } = await api.get(url);
  return data;
});

export const removeContact = createAsyncThunk("contacts/remove", async (id) => {
  const url = `/contacts/${id}`;
  const { data } = await api.delete(url);
  return data;
});

export const addContact = createAsyncThunk("contacts/add", async (contact) => {
  const url = "/contacts";
  const { data } = await api.post(url, contact);
  console.log(data);
  return data;
});
