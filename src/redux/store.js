import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";

const persistConfig = {
  key: "contacts",
  storage,
};

const contactsPersistedReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    contacts: contactsPersistedReducer,
    filters: filtersReducer,
  },
});

export const persistor = persistStore(store);
