export interface ShowState {
  results: any[];
  total_results: number;
}
export interface APIState {
  popularList: ShowState;
  topRatedList: ShowState;
  searchList: ShowState;
  kdramaList: ShowState;
  animeList: ShowState;
  isLoading: boolean;
  error: string | null;
  initialSearch: boolean;
  moreShow: string;
}

export interface CatalogState {
  tvShow: ShowState;
  movieShow: ShowState;
  isLoading: boolean;
  error: string | null;
}

export interface FetchType {
  apiType: string;
  query?: string;
  page?: number;
  genreId?: number | null;
}

export interface FetchMoviesResponse {
  apiType: "popular" | "top_rated" | "search" | "kdrama" | "anime";
  results: ShowState; // Replace `any[]` with the actual shape of the movie objects if known
}

//TV Show

export interface TVState {
  tvShow: any[];
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
  apiType: "tvCatalog" | "movieCatalog";
  results: ShowState; // Replace `any[]` with the actual shape of the movie objects if known
}

//Genre Lits

export interface genreState {
  tvGenreList: any[];
  movieGenreList: any[];
  isLoading: boolean;
  error: string | null;
}

export interface FetchGenre {
  apiType: "tvGenre" | "movieGenre";
  results: any[];
}
