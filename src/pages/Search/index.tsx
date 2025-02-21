import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../state/store";
import { fetchMovies } from "../../state/movieSlice";

import Loading from "../../components/Loading";
import InfiniteScrolling from "../../components/infiniteScrolling";

const Search = ({ query }: { query: string }) => {
  const { searchList, initialSearch } = useSelector(
    (state: RootState) => state.movieList
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchMoreMovie = (nextPage: number) => {
    dispatch(
      fetchMovies({
        apiType: "search",
        page: nextPage,
        query: query,
      })
    );
  };

  return (
    <div>
      {initialSearch ? (
        <Loading />
      ) : (
        <InfiniteScrolling fetchMore={fetchMoreMovie} dataList={searchList} />
      )}
    </div>
  );
};
export default Search;
