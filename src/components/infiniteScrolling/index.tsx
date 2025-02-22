import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import NoImage from "../Placeholder/NoImage";
import {
  InfiniteScrollingType,
  ResultsType,
} from "../../types/InfiniteScrollType";

import { FaArrowAltCircleUp } from "react-icons/fa";

const InfiniteScrolling = ({ fetchMore, dataList }: InfiniteScrollingType) => {
  const [page, setPage] = useState<number>(1);

  const posterSize = "w300"; // Choose a size=
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
  const movieItem = dataList?.results;
  const movieTotalItem = dataList?.total_results;

  const fetchMoreShow = () => {
    const nextPage = page + 1;
    fetchMore(nextPage);
    setPage(nextPage);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasMoreItems = (movieItem?.length || 0) < (movieTotalItem || 0);

  const loadingMore = (
    <p className="text-center py-4 text-lightColor">Loading more...</p>
  );

  const endMessage = (
    <p className="text-center py-4 text-lightColor">
      No more content to display
    </p>
  );

  return (
    <>
      <InfiniteScroll
        dataLength={movieItem?.length}
        hasMore={hasMoreItems}
        next={fetchMoreShow}
        loader={loadingMore}
        endMessage={endMessage}
      >
        <div
          className="px-3 py-5 sm:px-12 sm:pb-12 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] 
            sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {movieItem?.map(
            ({ poster_path, title, name }: ResultsType, index: number) => (
              <div className="rounded-md h-full  min-h-[250px]" key={index}>
                {poster_path ? (
                  <img
                    src={`${BASE_IMAGE_URL}${posterSize}${poster_path}`}
                    alt={title || "Poster Image"}
                    className="aspect-[2/3] w-full h-full object-cover rounded-md"
                    loading="lazy"
                  />
                ) : (
                  <NoImage title={title || name} />
                )}
              </div>
            )
          )}
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
  );
};

export default InfiniteScrolling;
