import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./fectchData";

import {
  CatalogState,
  FetchType,
  FetchTvShowResponse,
} from "../types/fetchDataTypes";

const initialState: CatalogState = {
  tvShow: [],
  movieShow: [],
  isLoading: false,
  error: null,
};

export const fetchShowList = createAsyncThunk(
  "catalog/fetchShowList",
  async ({ apiType, page, genreId }: FetchType, { rejectWithValue }) => {
    const endpoints: Record<FetchType["apiType"], string> = {
      tvCatalog: "/discover/tv",
      movieCatalog: "/discover/movie",
    };

    const extraParams = {
      with_genres: genreId,
    };

    try {
      if (!(apiType in endpoints)) {
        throw new Error("Invalid API endpoints");
      }

      const results = await fetchData(
        endpoints[apiType],
        page,
        extraParams || {}
      );
      return { apiType, results };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const CatalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchShowList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShowList.fulfilled, (state, action) => {
        state.isLoading = false;

        const { apiType, results } = action.payload as FetchTvShowResponse;

        if (apiType === "tvCatalog") {
          state.tvShow =
            action.meta.arg.page === 1
              ? results
              : [...state.tvShow, ...results];
        } else if (apiType === "movieCatalog") {
          state.movieShow =
            action.meta.arg.page === 1
              ? results
              : [...state.movieShow, ...results];
        }
      })
      .addCase(fetchShowList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown Error!";
      });
  },
});

export default CatalogSlice.reducer;
