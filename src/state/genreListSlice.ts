import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./fectchData";

import { genreState, FetchType, FetchGenre } from "../types/fetchDataTypes";

const initialState: genreState = {
  tvGenreList: [],
  movieGenreList: [],
  isLoading: false,
  error: null,
};

export const fetchGenreList = createAsyncThunk(
  "genreList/fetchGenreList",
  async ({ apiType }: FetchType, { rejectWithValue }) => {
    const endpoints: Record<FetchType["apiType"], string> = {
      movieGenre: "/genre/movie/list",
      tvGenre: "/genre/tv/list",
    };

    try {
      if (!(apiType in endpoints)) {
        throw new Error("Invalid API endpoints");
      }

      const results = await fetchData(endpoints[apiType]);
      return { apiType, results };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const genreListSlice = createSlice({
  name: "genreList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGenreList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGenreList.fulfilled, (state, action) => {
        state.isLoading = false;

        const { apiType, results } = action.payload as FetchGenre;

        if (apiType === "tvGenre") {
          state.tvGenreList = results;
        } else if (apiType === "movieGenre") {
          state.movieGenreList = results;
        }

        // const stateMap: Record<string, keyof typeof state> = {
        //   movieGenre: "movieGenreList",
        //   tvGenreList: "tvGenreList",
        // };
        // if (apiType in stateMap) {
        //   (state as any)[stateMap[apiType]] = results; // TypeScript-safe dynamic assignment
        // }
      })
      .addCase(fetchGenreList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown Error!";
      });
  },
});

export default genreListSlice.reducer;
