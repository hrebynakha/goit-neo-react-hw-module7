import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, fetchContacts, removeContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, { error }) => {
        state.error = error.message;
        state.loading = false;
      })
      .addCase(removeContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((el) => el.id !== payload.id);
        state.loading = false;
      })
      .addCase(removeContact.rejected, (state, { error }) => {
        state.error = error.message;
        state.loading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items = [...state.items, payload];
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, { error }) => {
        state.error = error.message;
        state.loading = false;
      });
  },
});

export const selectContactsItems = (state) => state.contacts.items;
export const selectContactsError = (state) => state.contacts.error;
export const selectContactsLoading = (state) => state.contacts.loading;
export const selectVisibleContacts = createSelector(
  [selectContactsItems, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const contactsReducer = slice.reducer;
