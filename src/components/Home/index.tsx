import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";

import Loading from "../Loading";
import SectionWrap from "../SectionWrap/index";
import { setMoreShow } from "../../state/movieSlice";
import { MovieType } from "../../types/SwiperComponentType";

const Home = ({ state }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const popularList = state.popularList;
  const topRated = state.topRatedList;
  const kdrama = state.kdramaList;
  const anime = state.animeList;

  const movieList = [
    { type: "Popular Movies", list: popularList, apiType: "popular" },
    { type: "Top Rated Movies", list: topRated, apiType: "top_rated" },
    { type: "Kdrama", list: kdrama, apiType: "kdrama" },
    { type: "Anime", list: anime, apiType: "anime" },
  ];

  const fetchMoreShow = (apiType: string) => {
    navigate("/moreShow");
    dispatch(setMoreShow(apiType));
  };

  return (
    <>
      {state.isLoading ? (
        <Loading />
      ) : (
        <div className="py-5 px-3  sm:p-12 flex flex-col gap-10 mt-5 sm:mt-0">
          {movieList.map(
            (
              movie: { type: string; list: MovieType; apiType: string },
              index
            ) => (
              // sectionWrap(movie.type, movie.list)
              <SectionWrap
                name={movie.type}
                dataList={movie.list}
                key={index}
                apiType={movie.apiType}
                fetchMoreShow={fetchMoreShow}
              />
            )
          )}
        </div>
      )}
    </>
  );
};
export default Home;
