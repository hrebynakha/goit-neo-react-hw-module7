import { createSlice } from "@reduxjs/toolkit";
import { addContact, fetchContacts, removeContact } from "./operations";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    error: false,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(removeContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((el) => el.id !== payload.id);
        state.loading = false;
      })
      .addCase(removeContact.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items = [...state.items, payload];
        state.loading = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectContacts = (state) => state.contacts.items;
export const contactsReducer = slice.reducer;
