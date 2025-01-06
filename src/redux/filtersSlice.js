import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
  },
});

export const selectNameFilter = (state) => state.filters.name;
export const { changeFilter } = slice.actions;
export const filtersReducer = slice.reducer;
