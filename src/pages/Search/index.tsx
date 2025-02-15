import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { AppDispatch, RootState } from "../../state/store";
import { fetchMovies } from "../../state/movieSlice";

import Loading from "../../components/Loading";

import { TbMovie } from "react-icons/tb";
import { FaArrowAltCircleUp } from "react-icons/fa";

const Search = ({ query }: any) => {
  const { searchList, isLoading, loading } = useSelector(
    (state: RootState) => state.movieList
  );
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const posterSize = "w300"; // Choose a size=
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  console.log("load", loading);

  const fetchMoreShow = () => {
    const nextPage = page + 1;
    dispatch(
      fetchMovies({
        apiType: "search",
        page: nextPage,
        query: query,
      })
    );
    setPage(nextPage);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <InfiniteScroll
            dataLength={searchList.length}
            next={fetchMoreShow}
            hasMore={searchList.length > 0}
            loader={
              <p className="text-center py-4 text-lightColor">
                Loading more...
              </p>
            }
            endMessage={
              <p className="text-center py-4 text-lightColor">
                No more TV shows to display
              </p>
            }
          >
            <div
              className="px-3 py-5 sm:px-12 sm:pb-12 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] 
             sm:grid-cols-2 lg:grid-cols-6 gap-4"
            >
              {searchList?.map((show: any, index: number) => (
                <div key={index} className="rounded-md">
                  {show.poster_path ? (
                    <img
                      src={`${BASE_IMAGE_URL}${posterSize}${show.poster_path}`}
                      alt={show.title || "Poster Image"}
                      className="w-full h-full object-cover rounded-md"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full object-cover rounded-md bg-white 
                         flex flex-col justify-center items-center gap-5 px-2"
                    >
                      <TbMovie className="text-primaryColor text-8xl" />
                      <span className="sm:text-xl text-primaryColor text-center">
                        {show.title}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </InfiniteScroll>
          <button
            className="text-5xl fixed bottom-10 right-5 text-red-300
              transition ease-in-out duration-200 hover:scale-90"
            onClick={handleScrollTop}
          >
            <FaArrowAltCircleUp />
          </button>
        </>
      )}
    </div>
  );
};
export default Search;

// const [hasMoreShows, setHasMoreShows] = useState(true);

// const fetchMoreShow = async () => {
//   const newShows = await fetchMoreData(); // Fetch more data from API

//   if (newShows.length === 0) {
//     setHasMoreShows(false); // ✅ No more shows to load
//   } else {
//     setSearchList((prev) => [...prev, ...newShows]);
//   }
// };
