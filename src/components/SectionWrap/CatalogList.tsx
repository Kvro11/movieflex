import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import ToggleGenre from "../../components/ToggleGenre";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";

import { Show, CatalogListProps } from "../../types/CatalogTypes";

const CatalogList: React.FC<CatalogListProps> = ({
  title,
  toggleGenre,
  fetchMoreShow,
  onGenreSelect,
  isNavOpen,
  genreState,
  state,
}: any) => {
  const navigate = useNavigate();
  const posterSize = "w300"; // Choose a size=
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

  // scroll back to top
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="h-16 sm:h-20 p-5 sm:px-12 py-5 flex items-center justify-between">
        <FaArrowLeftLong
          className="text-3xl hover:text-white transition ease-in-out duration-200 hover:scale-90"
          onClick={handleBackBtn}
        />
        <h2 className="text-xl sm:text-3xl font-bold">{title}</h2>
        <button
          onClick={toggleGenre}
          className={`${
            isNavOpen ? "text-black" : "text-lightColor"
          } sm:text-2xl`}
        >
          Genre
        </button>
        <ToggleGenre
          isNavOpen={isNavOpen}
          toggleGenre={toggleGenre}
          genreList={genreState}
          onGenreSelect={onGenreSelect}
        />
      </div>
      <InfiniteScroll
        dataLength={state.length}
        next={fetchMoreShow}
        hasMore={state.length > 0}
        loader={<p className="text-center py-4">Loading more...</p>}
        endMessage={
          <p className="text-center py-4">No more TV shows to display</p>
        }
      >
        <div
          className="px-3 py-5 sm:px-12 sm:pb-12 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] 
        sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {state?.map((show: Show, index: number) => (
            <div key={index} className="rounded-md">
              {show.poster_path ? (
                <img
                  src={`${BASE_IMAGE_URL}${posterSize}${show.poster_path}`}
                  alt={show.name || "Poster Image"}
                  className="w-full h-full object-cover rounded-md"
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-full h-full object-cover rounded-md bg-white 
                    flex flex-col justify-center items-center gap-5"
                >
                  <TbMovie className="text-primaryColor text-8xl" />
                  <span className="sm:text-2xl text-primaryColor">
                    {show.name}
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

export default CatalogList;
