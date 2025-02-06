export interface APIState {
  popularList: any[];
  topRatedList: any[];
  searchList: any[];
  kdramaList: any[];
  animeList: any[];
  isLoading: boolean;
  error: string | null;
}

export interface FetchType {
  apiType: string;
  query?: string;
}

export interface FetchMoviesResponse {
  apiType: "popular" | "top_rated" | "search" | "kdrama" | "anime";
  results: any[]; // Replace `any[]` with the actual shape of the movie objects if known
}

//TV Show

export interface TVState {
  popularShow: any[];
  topRatedShow: any[];
  kdramaShow: any[];
  kidsShow: any[];
  realityShow: any[];
  anime: any[];
  isLoading: boolean;
  error: string | null;
}

export interface FetchTvShowResponse {
  apiType:
    | "popularShow"
    | "topRatedShow"
    | "search"
    | "kdrama"
    | "anime"
    | "western"
    | "kids";
  results: any[]; // Replace `any[]` with the actual shape of the movie objects if known
}
