export interface ResultsType {
  poster_path: string;
  title?: string;
  name?: string;
}
interface DataListType {
  results: ResultsType[];
  total_results: number;
}

export interface InfiniteScrollingType {
  fetchMore: (nextPage: number) => void;
  dataList: DataListType;
}
