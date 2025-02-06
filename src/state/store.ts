import { configureStore } from "@reduxjs/toolkit";
import movies from "./movieSlice";
import tvShow from "./tvSlice";

export const store = configureStore({
  reducer: {
    movieList: movies,
    tvShow: tvShow,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
