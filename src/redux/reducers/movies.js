import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    // set movies action to store movie api payload
    setMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;
