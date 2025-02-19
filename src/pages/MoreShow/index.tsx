import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";

import { fetchMovies } from "../../state/movieSlice";
import InfiniteScrolling from "../../components/infiniteScrolling";

const MoreShow = () => {
  const state = useSelector((state: RootState) => state.movieList);
  const dispatch = useDispatch<AppDispatch>();

  const data = {
    popular: state.popularList,
    top_rated: state.topRatedList,
    kdrama: state.kdramaList,
    anime: state.animeList,
  };

  const apiType = state.moreShow as keyof typeof data;

  const fetchMoreMovies = (nextPage: number) => {
    dispatch(
      fetchMovies({
        apiType,
        page: nextPage,
      })
    );
  };

  return (
    <div>
      <InfiniteScrolling fetchMore={fetchMoreMovies} dataList={data[apiType]} />
    </div>
  );
};

export default MoreShow;
