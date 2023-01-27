import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: "",
  },
  reducers: {
    // set movies action to store movie api payload
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setMovies, setFilter } = movieSlice.actions;

export default movieSlice.reducer;
