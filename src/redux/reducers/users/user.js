import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../../localStorage";

const persistedState = loadState();

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: persistedState ? persistedState.user : null,
    token: persistedState ? persistedState.token : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
