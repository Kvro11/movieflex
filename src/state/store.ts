import { configureStore } from "@reduxjs/toolkit";
import movies from "./movieSlice";

export const store = configureStore({
  reducer: {
    movieList: movies,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
