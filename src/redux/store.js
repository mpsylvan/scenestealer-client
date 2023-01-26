import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movies";
import userReducer from "./reducers/users/user";
import tokenReducer from "./reducers/users/token";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
    token: tokenReducer,
  },
});
