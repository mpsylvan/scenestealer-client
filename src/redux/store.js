import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movies";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
