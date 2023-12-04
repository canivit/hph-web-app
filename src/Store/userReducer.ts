import { createSlice } from "@reduxjs/toolkit";
import { User } from "../User/types";

const initialState: {
  currentUser: User | false;
} = {
  currentUser: false,
};

type SetAction = {
  payload: User | false;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: SetAction) => {
      state.currentUser = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setCurrentUser } = userSlice.actions;
