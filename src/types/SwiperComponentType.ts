interface MovieType {
  results: any[];
  total_results: number;
}

export interface SwiperComponentType {
  movies: MovieType;
  apiType: string;
  fetchMoreShow: (apiType: string) => void;
}

export interface DataListType {
  poster_path: string;
  id: number;
  name?: string;
  title?: string;
}
