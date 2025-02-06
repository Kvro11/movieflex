import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./fectchData";

import {
  APIState,
  FetchType,
  FetchMoviesResponse,
} from "../types/fetchDataTypes";

const initialState: APIState = {
  popularList: [],
  topRatedList: [],
  searchList: [],
  kdramaList: [],
  animeList: [],
  isLoading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ apiType }: FetchType, { rejectWithValue }) => {
    const endPoint: Record<FetchType["apiType"], string> = {
      popular: "/movie/popular",
      top_rated: "/movie/top_rated",
      search: "/search/movie",
      kdrama: "/discover/tv",
      anime: "/discover/tv",
    };

    const extraParams: Record<string, Record<string, string | number>> = {
      anime: { with_genres: 16, with_origin_country: "JP" },
      kdrama: { with_genres: 18, with_origin_country: "KR" },
    };

    try {
      if (!(apiType in endPoint)) {
        throw new Error("Invalid API endpoint");
      }

      const results = await fetchData(
        endPoint[apiType],
        extraParams[apiType] || {}
      );
      return { apiType, results };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;

        const { apiType, results } = action.payload as FetchMoviesResponse;

        const stateMap: Record<string, keyof typeof state> = {
          popular: "popularList",
          top_rated: "topRatedList",
          // search: "searchList",
          kdrama: "kdramaList",
          anime: "animeList",
        };
        if (apiType in stateMap) {
          (state as any)[stateMap[apiType]] = results; // TypeScript-safe dynamic assignment
        }
      })
      // Use dynamic property assignment

      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown Error!";
      });
  },
});

export default movieSlice.reducer;
