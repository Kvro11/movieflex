import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface APIState {
  popularList: any[];
  topRatedList: any[];
  searchList: any[];
  kdramaList: any[];
  animeList: any[];
  isLoading: boolean;
  error: null;
}

interface FetchType {
  apiType: string;
  query?: string;
}

interface FetchMoviesResponse {
  apiType: "popular" | "top_rated" | "search";
  result: any[]; // Replace `any[]` with the actual shape of the movie objects if known
}
const initialState: APIState = {
  popularList: [],
  topRatedList: [],
  searchList: [],
  kdramaList: [],
  animeList: [],
  isLoading: false,
  error: null,
};

const API_KEY = "c123661e7cffc8d169fb2486c2601473";
const API_BASE_URL = "https://api.themoviedb.org/3";

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

    const params: Record<string, any> = {
      api_key: API_KEY,
      language: "en",
      page: 1,
    };

    if (apiType === "anime") {
      params["with_genres"] = 16; // Animation genre
      params["with_origin_country"] = "JP"; // Japanese only
    } else if (apiType === "kdrama") {
      params["with_genres"] = 18; // Drama genre
      params["with_origin_country"] = "KR"; // Korean only
    }

    try {
      if (!(apiType in endPoint)) {
        throw new Error("Invalid API endpoint");
      }

      const response = await axios.get(`${API_BASE_URL}${endPoint[apiType]}`, {
        params,
      });
      const data = response.data?.results;
      return { apiType, result: data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
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

        const { apiType, result } = action.payload as FetchMoviesResponse;

        if (apiType === "popular") {
          state.popularList = result;
        } else if (apiType === "top_rated") {
          state.topRatedList = result;
        } else if (apiType === "search") {
          state.searchList = result;
        } else if (apiType === "kdrama") {
          state.kdramaList = result;
        } else if (apiType === "anime") {
          state.animeList = result;
        }
      });
  },
});

export default movieSlice.reducer;
