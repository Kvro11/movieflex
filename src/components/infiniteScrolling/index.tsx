import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { FaArrowAltCircleUp } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";

interface DataListType {
  poster_path: string;
  title: string;
}

interface InfiniteScrollingType {
  fetchMore: (nextPage: number) => void;
  dataList: DataListType[];
}

const InfiniteScrolling = ({ fetchMore, dataList }: InfiniteScrollingType) => {
  const [page, setPage] = useState<number>(1);
  const posterSize = "w300"; // Choose a size=
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

  const fetchMoreShow = () => {
    const nextPage = page + 1;
    fetchMore(nextPage);
    setPage(nextPage);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadingMore = (
    <p className="text-center py-4 text-lightColor">Loading more...</p>
  );

  const endMessage = (
    <p className="text-center py-4 text-lightColor">
      No more TV shows to display
    </p>
  );

  return (
    <>
      <InfiniteScroll
        dataLength={dataList?.length}
        hasMore={dataList.length > 0}
        next={fetchMoreShow}
        loader={loadingMore}
        endMessage={endMessage}
      >
        <div
          className="px-3 py-5 sm:px-12 sm:pb-12 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] 
            sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {dataList?.map(({ poster_path, title }, index) => (
            <div className="rounded-md" key={index}>
              {poster_path ? (
                <img
                  src={`${BASE_IMAGE_URL}${posterSize}${poster_path}`}
                  alt={title || "Poster Image"}
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
                    {title}
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
  );
};

export default InfiniteScrolling;
