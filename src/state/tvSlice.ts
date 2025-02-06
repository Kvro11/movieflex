import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./fectchData";

import {
  TVState,
  FetchType,
  FetchTvShowResponse,
} from "../types/fetchDataTypes";

const initialState: TVState = {
  popularShow: [],
  topRatedShow: [],
  kdramaShow: [],
  kidsShow: [],
  realityShow: [],
  anime: [],
  isLoading: false,
  error: null,
};

export const fetchTvShow = createAsyncThunk(
  "tvShow/fetchTvShow",
  async ({ apiType }: FetchType, { rejectWithValue }) => {
    //endpoints/interface
    console.log(`API`, apiType);

    const endpoints: Record<FetchType["apiType"], string> = {
      popularShow: "/tv/popular",
      topRatedShow: "/tv/top_rated",
      realityShow: "/discover/tv",
      kdrama: "/discover/tv",
      kids: "/discover/tv",
      anime: "/discover/tv",
    };

    const extraParams: Record<string, Record<string, string | number>> = {
      kdrama: { with_genres: 18, with_origin_country: "KR" }, // Drama + Korean
      kids: { with_genres: 10762 }, // Kids genre
      realityShow: { with_genres: 10764 }, // Western genre
      anime: { with_genres: 16, with_origin_country: "JP" }, // Anime (Japan)
    };

    try {
      if (!(apiType in endpoints)) {
        throw new Error("Invalid API endpoints");
      }

      const results = await fetchData(endpoints[apiType], extraParams[apiType]);
      return { apiType, results };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tvSlice = createSlice({
  name: "tvShow",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTvShow.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTvShow.fulfilled, (state, action) => {
        state.isLoading = false;

        const { apiType, results } = action.payload as FetchTvShowResponse;

        // Use dynamic property assignment
        const stateMap: Record<string, keyof typeof state> = {
          popularShow: "popularShow",
          topRatedShow: "topRatedShow",
          // search: "searchList",
          kids: "kidsShow",
          realityShow: "realityShow",
          kdrama: "kdramaShow",
          anime: "anime",
        };

        if (apiType in stateMap) {
          (state as any)[stateMap[apiType]] = results; // TypeScript-safe dynamic assignment
        }
      })
      .addCase(fetchTvShow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown Error!";
      });
  },
});

export default tvSlice.reducer;
