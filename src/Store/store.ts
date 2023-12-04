import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>;