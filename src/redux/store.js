import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movies";
import userReducer from "./reducers/users/user";




export const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
});
